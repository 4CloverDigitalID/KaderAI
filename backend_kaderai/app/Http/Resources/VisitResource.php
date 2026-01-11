<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'visited_at' => $this->visited_at?->toDateTimeString(),
            'city' => $this->city,
            'district' => $this->district,
            'street' => $this->street,
            'rt_rw' => $this->rt_rw,
            'description' => $this->description,
            'child_name' => $this->child_name,
            'child_age_months' => $this->child_age_months,
            'weight_kg' => $this->weight_kg,
            'height_cm' => $this->height_cm,
            'symptoms' => $this->symptoms,
            'eating_pattern' => $this->eating_pattern,
            'immunization_status' => $this->immunization_status,
            'ai_output' => VisitAIOutputResource::make($this->whenLoaded('aiOutput')),
        ];
    }
}
