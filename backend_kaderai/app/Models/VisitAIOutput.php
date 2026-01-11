<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VisitAIOutput extends Model
{
    /** @use HasFactory<\Database\Factories\VisitAIOutputFactory> */
    use HasFactory;

    protected $table = 'visit_ai_outputs';

    protected $fillable = [
        'visit_id',
        'risk_level',
        'reasons',
        'red_flags',
        'recommended_next_step',
        'plan_7_days',
        'report_text',
    ];

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class);
    }

    protected function casts(): array
    {
        return [
            'reasons' => 'array',
            'red_flags' => 'array',
            'recommended_next_step' => 'array',
            'plan_7_days' => 'array',
        ];
    }
}
