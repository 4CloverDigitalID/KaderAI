<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Schedule extends Model
{
    /** @use HasFactory<\Database\Factories\ScheduleFactory> */
    use HasFactory;

    protected $fillable = [
        'scheduled_at',
        'city',
        'district',
        'street',
        'rt_rw',
        'description',
    ];

    public function chatSessions(): HasMany
    {
        return $this->hasMany(ChatSession::class);
    }

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
        ];
    }
}
