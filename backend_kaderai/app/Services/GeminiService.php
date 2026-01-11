<?php

namespace App\Services;

use App\Models\Visit;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GeminiService
{
    private ?string $lastRawText = null;

    private ?array $lastMeta = null;

    public function generateTriage(Visit $visit, array $redFlags): array
    {
        $prompt = $this->triagePrompt($visit, $redFlags);

        $text = $this->requestText($prompt, 'application/json');
        $parsed = $this->parseJson($text);

        if (! is_array($parsed)) {
            return $this->fallbackTriage($redFlags);
        }

        return $parsed;
    }

    public function generatePlan(Visit $visit, array $triage): array
    {
        $prompt = $this->planPrompt($visit, $triage);

        $text = $this->requestText($prompt, 'application/json');
        $parsed = $this->parseJson($text);

        if (! is_array($parsed)) {
            return $this->fallbackPlan();
        }

        return $parsed;
    }

    public function generateReport(Visit $visit, array $triage, array $plan): string
    {
        $prompt = $this->reportPrompt($visit, $triage, $plan);

        return $this->requestText($prompt) ?? $this->fallbackReport($triage);
    }

    public function generateChatReply(array $history, ?string $scheduleContext = null): string
    {
        $systemInstruction = $this->chatSystemInstruction($scheduleContext);
        $contents = collect($history)->map(function (array $message): array {
            return [
                'role' => $message['role'],
                'parts' => [
                    ['text' => $message['content']],
                ],
            ];
        })->values()->all();

        $text = $this->requestTextFromContents($systemInstruction, $contents);

        return $text ?? 'Maaf, saya belum bisa menjawab sekarang. Silakan coba lagi.';
    }

    public function getLastRawText(): ?string
    {
        return $this->lastRawText;
    }

    public function getLastMeta(): ?array
    {
        return $this->lastMeta;
    }

    private function requestText(string $prompt, ?string $responseMimeType = null): ?string
    {
        $contents = [
            [
                'role' => 'user',
                'parts' => [
                    ['text' => $prompt],
                ],
            ],
        ];

        return $this->requestTextFromContents($this->defaultSystemInstruction(), $contents, $responseMimeType);
    }

    private function requestTextFromContents(
        string $systemInstruction,
        array $contents,
        ?string $responseMimeType = null
    ): ?string {
        $apiKey = config('gemini.api_key');

        if (! $apiKey) {
            $this->lastRawText = null;
            $this->lastMeta = [
                'error' => 'missing_api_key',
            ];

            return null;
        }

        $generationConfig = [
            'temperature' => (float) config('gemini.temperature'),
            'maxOutputTokens' => (int) config('gemini.max_output_tokens'),
        ];

        if ($responseMimeType) {
            $generationConfig['responseMimeType'] = $responseMimeType;
        }

        $response = Http::timeout(20)
            ->withHeaders([
                'x-goog-api-key' => $apiKey,
                'Content-Type' => 'application/json',
            ])
            ->post($this->endpoint(), [
                'systemInstruction' => [
                    'parts' => [
                        ['text' => $systemInstruction],
                    ],
                ],
                'contents' => $contents,
                'generationConfig' => $generationConfig,
            ]);

        if (! $response->successful()) {
            Log::warning('Gemini request failed.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            $this->lastRawText = null;
            $this->lastMeta = [
                'status' => $response->status(),
                'body' => $response->body(),
            ];

            return null;
        }

        $responseJson = $response->json();
        $parts = data_get($responseJson, 'candidates.0.content.parts', []);
        $text = null;

        if (is_array($parts)) {
            $text = collect($parts)
                ->pluck('text')
                ->filter()
                ->implode('');
        }

        if (! $text) {
            $text = data_get($responseJson, 'candidates.0.content.parts.0.text');
        }

        $this->lastRawText = is_string($text) ? trim($text) : null;
        $this->lastMeta = [
            'finish_reason' => data_get($responseJson, 'candidates.0.finishReason'),
            'safety_ratings' => data_get($responseJson, 'candidates.0.safetyRatings'),
            'prompt_feedback' => data_get($responseJson, 'promptFeedback'),
        ];

        return $this->lastRawText;
    }

    private function endpoint(): string
    {
        $base = rtrim(config('gemini.base_url'), '/');
        $model = config('gemini.model');

        return "{$base}/models/{$model}:generateContent";
    }

    private function parseJson(?string $text): ?array
    {
        if (! $text) {
            return null;
        }

        $trimmed = trim($text);

        if (preg_match('/```(?:json)?\s*(\{.*?\})\s*```/s', $trimmed, $matches) === 1) {
            $decoded = json_decode($matches[1], true);

            return is_array($decoded) ? $decoded : null;
        }

        if (Str::startsWith($trimmed, '{')) {
            $decoded = json_decode($trimmed, true);

            return is_array($decoded) ? $decoded : null;
        }

        $start = strpos($trimmed, '{');
        $end = strrpos($trimmed, '}');

        if ($start === false || $end === false || $end <= $start) {
            return null;
        }

        $decoded = json_decode(substr($trimmed, $start, $end - $start + 1), true);

        return is_array($decoded) ? $decoded : null;
    }

    private function triagePrompt(Visit $visit, array $redFlags): string
    {
        $redFlagText = $redFlags ? implode(', ', $redFlags) : '-';

        return <<<PROMPT
Buatkan output triage format JSON persis seperti skema berikut (tanpa teks lain):
{
  "risk_level": "low|medium|high",
  "reasons": ["..."],
  "red_flags": ["..."],
  "recommended_next_step": ["..."],
  "disclaimer": "..."
}

Data kunjungan:
- Usia (bulan): {$visit->child_age_months}
- Berat (kg): {$visit->weight_kg}
- Tinggi (cm): {$visit->height_cm}
- Gejala: {$visit->symptoms}
- Pola makan: {$visit->eating_pattern}
- Status imunisasi: {$visit->immunization_status}

Red flags terdeteksi: {$redFlagText}
Fokus: edukasi & triage, tanpa diagnosis pasti.
PROMPT;
    }

    private function planPrompt(Visit $visit, array $triage): string
    {
        $triageSummary = json_encode($triage, JSON_UNESCAPED_UNICODE);

        return <<<PROMPT
Buatkan rencana 7 hari format JSON persis seperti skema berikut (tanpa teks lain):
{
  "goal": "...",
  "daily_plan": [
    {
      "day": 1,
      "meals": ["..."],
      "habit": "...",
      "note_for_parent": "..."
    }
  ],
  "budget_tips": ["..."],
  "follow_up": "..."
}

Data kunjungan:
- Usia (bulan): {$visit->child_age_months}
- Berat (kg): {$visit->weight_kg}
- Tinggi (cm): {$visit->height_cm}
- Gejala: {$visit->symptoms}
- Pola makan: {$visit->eating_pattern}

Ringkasan triage: {$triageSummary}
PROMPT;
    }

    private function reportPrompt(Visit $visit, array $triage, array $plan): string
    {
        $triageSummary = json_encode($triage, JSON_UNESCAPED_UNICODE);
        $planSummary = json_encode($plan, JSON_UNESCAPED_UNICODE);

        return <<<PROMPT
Buat laporan singkat kunjungan dalam Bahasa Indonesia. Format teks biasa dengan bagian:
1) Identitas singkat kunjungan
2) Ringkasan triage
3) Checklist tindakan
4) Kapan kontrol lagi
5) Disclaimer singkat

Data kunjungan:
- Tanggal: {$visit->visited_at}
- Lokasi: {$visit->street}, {$visit->rt_rw}, {$visit->district}, {$visit->city}
- Usia (bulan): {$visit->child_age_months}
- Berat (kg): {$visit->weight_kg}
- Tinggi (cm): {$visit->height_cm}
- Gejala: {$visit->symptoms}

Ringkasan triage: {$triageSummary}
Ringkasan rencana 7 hari: {$planSummary}
PROMPT;
    }

    private function defaultSystemInstruction(): string
    {
        return 'Kamu adalah asisten kesehatan anak untuk kader posyandu. Fokus edukasi dan triage aman.';
    }

    private function chatSystemInstruction(?string $scheduleContext): string
    {
        $base = <<<'TEXT'
Kamu adalah asisten dokter anak (pediatrics) untuk membantu kader/ortu.
Aturan:
- Kamu TIDAK boleh mendiagnosis pasti. Fokus pada edukasi, triage risiko, dan langkah aman.
- Selalu gunakan Bahasa Indonesia sederhana.
- Jika info kurang, tanyakan 2–4 pertanyaan klarifikasi (umur anak, durasi, suhu, asupan minum/BAK, tanda sesak).
- Jika ada tanda bahaya (sesak, kejang, dehidrasi berat, anak sangat lemas, demam tinggi lama, ruam berbahaya, muntah hijau, BAB berdarah), sarankan segera ke IGD/dokter.
- Di akhir jawaban: ringkasan “Langkah sekarang” (bullet) + disclaimer singkat.
TEXT;

        if (! $scheduleContext) {
            return $base;
        }

        return $base."\n\nContext Jadwal Posyandu:\n".$scheduleContext;
    }

    private function fallbackTriage(array $redFlags): array
    {
        $risk = $redFlags ? 'high' : 'medium';

        return [
            'risk_level' => $risk,
            'reasons' => $redFlags ? ['Terdapat tanda bahaya yang perlu evaluasi segera.'] : ['Perlu pemantauan lanjutan.'],
            'red_flags' => $redFlags,
            'recommended_next_step' => $redFlags
                ? ['Rujuk ke Puskesmas/IGD untuk pemeriksaan segera.']
                : ['Pantau gejala dan lakukan perawatan dasar sesuai anjuran.'],
            'disclaimer' => 'Informasi ini bersifat edukasi dan tidak menggantikan konsultasi tenaga medis.',
        ];
    }

    private function fallbackPlan(): array
    {
        return [
            'goal' => 'Mendukung pemulihan dan menjaga asupan nutrisi harian.',
            'daily_plan' => [
                [
                    'day' => 1,
                    'meals' => ['Nasi tim lembut', 'Sup sayur sederhana', 'Buah potong'],
                    'habit' => 'Minum air putih sedikit tapi sering.',
                    'note_for_parent' => 'Catat perubahan gejala anak setiap hari.',
                ],
            ],
            'budget_tips' => ['Gunakan bahan lokal seperti tempe, telur, dan sayur pasar.'],
            'follow_up' => 'Jika gejala memburuk atau ada tanda bahaya, segera periksa.',
        ];
    }

    private function fallbackReport(array $triage): string
    {
        $risk = $triage['risk_level'] ?? 'medium';

        return "Identitas singkat kunjungan\n".
            "Ringkasan triage: Risiko {$risk}.\n".
            "Checklist tindakan: pantau gejala, jaga hidrasi, perbaiki pola makan.\n".
            "Kapan kontrol lagi: 2-3 hari atau lebih cepat jika memburuk.\n".
            'Disclaimer: Informasi ini bersifat edukasi dan tidak menggantikan dokter.';
    }
}
