<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\VisitAIOutput;
use App\Services\GeminiService;
use App\Services\SafetyRules;
use Illuminate\Http\JsonResponse;

class VisitAIController extends Controller
{
    public function analyze(Visit $visit, GeminiService $geminiService, SafetyRules $safetyRules): JsonResponse
    {
        $redFlags = $safetyRules->detectRedFlags($visit->symptoms);
        $triage = $geminiService->generateTriage($visit, $redFlags);
        $triage = $safetyRules->enforceSafety($triage, $redFlags);

        $output = VisitAIOutput::updateOrCreate(
            ['visit_id' => $visit->id],
            [
                'risk_level' => $triage['risk_level'] ?? 'medium',
                'reasons' => $triage['reasons'] ?? [],
                'red_flags' => $triage['red_flags'] ?? $redFlags,
                'recommended_next_step' => $triage['recommended_next_step'] ?? [],
            ]
        );

        $payload = [
            'risk_level' => $output->risk_level,
            'reasons' => $output->reasons,
            'red_flags' => $output->red_flags,
            'recommended_next_step' => $output->recommended_next_step,
            'disclaimer' => $triage['disclaimer'] ?? 'Informasi ini bersifat edukasi dan tidak menggantikan konsultasi tenaga medis.',
        ];

        if (config('gemini.debug')) {
            $payload['_debug'] = [
                'raw_text' => $geminiService->getLastRawText(),
                'meta' => $geminiService->getLastMeta(),
            ];
        }

        return response()->json($payload);
    }

    public function plan(Visit $visit, GeminiService $geminiService, SafetyRules $safetyRules): JsonResponse
    {
        $output = $visit->aiOutput;

        if (! $output) {
            $redFlags = $safetyRules->detectRedFlags($visit->symptoms);
            $triage = $safetyRules->enforceSafety(
                $geminiService->generateTriage($visit, $redFlags),
                $redFlags
            );
            $output = VisitAIOutput::create([
                'visit_id' => $visit->id,
                'risk_level' => $triage['risk_level'] ?? 'medium',
                'reasons' => $triage['reasons'] ?? [],
                'red_flags' => $triage['red_flags'] ?? $redFlags,
                'recommended_next_step' => $triage['recommended_next_step'] ?? [],
            ]);
        }

        $triage = [
            'risk_level' => $output->risk_level,
            'reasons' => $output->reasons,
            'red_flags' => $output->red_flags,
            'recommended_next_step' => $output->recommended_next_step,
        ];

        $plan = $geminiService->generatePlan($visit, $triage);
        $output->update(['plan_7_days' => $plan]);

        if (config('gemini.debug')) {
            $plan['_debug'] = [
                'raw_text' => $geminiService->getLastRawText(),
                'meta' => $geminiService->getLastMeta(),
            ];
        }

        return response()->json($plan);
    }

    public function report(Visit $visit, GeminiService $geminiService, SafetyRules $safetyRules): JsonResponse
    {
        $output = $visit->aiOutput;

        if (! $output) {
            $redFlags = $safetyRules->detectRedFlags($visit->symptoms);
            $triage = $safetyRules->enforceSafety(
                $geminiService->generateTriage($visit, $redFlags),
                $redFlags
            );
            $output = VisitAIOutput::create([
                'visit_id' => $visit->id,
                'risk_level' => $triage['risk_level'] ?? 'medium',
                'reasons' => $triage['reasons'] ?? [],
                'red_flags' => $triage['red_flags'] ?? $redFlags,
                'recommended_next_step' => $triage['recommended_next_step'] ?? [],
            ]);
        }

        $triage = [
            'risk_level' => $output->risk_level,
            'reasons' => $output->reasons,
            'red_flags' => $output->red_flags,
            'recommended_next_step' => $output->recommended_next_step,
        ];

        $plan = $output->plan_7_days ?? $geminiService->generatePlan($visit, $triage);

        if (! $output->plan_7_days) {
            $output->update(['plan_7_days' => $plan]);
        }

        $reportText = $geminiService->generateReport($visit, $triage, $plan);
        $output->update(['report_text' => $reportText]);

        $payload = ['report_text' => $reportText];

        if (config('gemini.debug')) {
            $payload['_debug'] = [
                'raw_text' => $geminiService->getLastRawText(),
                'meta' => $geminiService->getLastMeta(),
            ];
        }

        return response()->json($payload);
    }
}
