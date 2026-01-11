<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitAIOutputResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'risk_level' => $this->risk_level,
            'reasons' => $this->reasons,
            'red_flags' => $this->red_flags,
            'recommended_next_step' => $this->recommended_next_step,
            'plan_7_days' => $this->plan_7_days,
            'report_text' => $this->report_text,
        ];
    }
}
