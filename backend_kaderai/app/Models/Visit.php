<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Visit extends Model
{
    /** @use HasFactory<\Database\Factories\VisitFactory> */
    use HasFactory;

    protected $fillable = [
        'visited_at',
        'city',
        'district',
        'street',
        'rt_rw',
        'description',
        'child_name',
        'child_age_months',
        'weight_kg',
        'height_cm',
        'symptoms',
        'eating_pattern',
        'immunization_status',
    ];

    public function aiOutput(): HasOne
    {
        return $this->hasOne(VisitAIOutput::class);
    }

    protected function casts(): array
    {
        return [
            'visited_at' => 'datetime',
            'child_age_months' => 'integer',
            'weight_kg' => 'decimal:2',
            'height_cm' => 'decimal:2',
        ];
    }
}
