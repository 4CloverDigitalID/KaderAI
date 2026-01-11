<?php

namespace Database\Factories;

use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VisitAIOutput>
 */
class VisitAIOutputFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visit_id' => Visit::factory(),
            'risk_level' => $this->faker->randomElement(['low', 'medium', 'high']),
            'reasons' => ['Pantau gejala dan asupan makan.'],
            'red_flags' => [],
            'recommended_next_step' => ['Lanjutkan pemantauan harian.'],
            'plan_7_days' => null,
            'report_text' => null,
        ];
    }
}
