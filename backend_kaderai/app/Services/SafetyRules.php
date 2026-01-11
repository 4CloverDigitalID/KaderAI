<?php

namespace App\Services;

use Illuminate\Support\Str;

class SafetyRules
{
    public function detectRedFlags(?string $symptoms): array
    {
        if (! $symptoms) {
            return [];
        }

        $text = Str::lower($symptoms);
        $flags = [
            'sesak napas' => 'Sesak napas',
            'kejang' => 'Kejang',
            'muntah hijau' => 'Muntah hijau',
            'bab berdarah' => 'BAB berdarah',
            'tidak bak' => 'Tidak BAK',
            'mulut kering sekali' => 'Mulut sangat kering',
            'sangat lemas' => 'Sangat lemas',
            'demam tinggi' => 'Demam tinggi lama',
        ];

        $found = [];

        foreach ($flags as $needle => $label) {
            if (Str::contains($text, $needle)) {
                $found[] = $label;
            }
        }

        return array_values(array_unique($found));
    }

    public function enforceSafety(array $triage, array $redFlags): array
    {
        if (! $redFlags) {
            return $this->ensureDisclaimer($triage);
        }

        $triage['risk_level'] = 'high';
        $triage['red_flags'] = array_values(array_unique(array_merge($triage['red_flags'] ?? [], $redFlags)));
        $triage['recommended_next_step'] = array_values(array_unique(array_merge(
            $triage['recommended_next_step'] ?? [],
            ['Rujuk ke Puskesmas/IGD untuk pemeriksaan segera.']
        )));

        return $this->ensureDisclaimer($triage);
    }

    private function ensureDisclaimer(array $triage): array
    {
        $triage['disclaimer'] ??= 'Informasi ini bersifat edukasi dan tidak menggantikan konsultasi tenaga medis.';

        return $triage;
    }
}
