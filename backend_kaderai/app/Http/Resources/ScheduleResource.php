<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $daysLeft = now()->startOfDay()->diffInDays($this->scheduled_at?->startOfDay(), false);
        $status = $daysLeft < 0 ? 'Terlewat' : ($daysLeft <= 7 ? 'Hampir' : 'Aman');
        $daysLeftLabel = $daysLeft >= 0 ? "{$daysLeft} Hari Lagi" : 'Terlewat';

        return [
            'id' => $this->id,
            'scheduled_at' => $this->scheduled_at?->toDateTimeString(),
            'date_label' => $this->scheduled_at?->format('d-m-Y'),
            'full_address' => "{$this->street} | {$this->rt_rw} | {$this->district}, {$this->city}",
            'status' => $status,
            'days_left' => $daysLeft,
            'days_left_label' => $daysLeftLabel,
        ];
    }
}
