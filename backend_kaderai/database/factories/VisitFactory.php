<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'visited_at' => $this->faker->dateTimeBetween('-2 weeks', '+2 weeks'),
            'city' => $this->faker->city(),
            'district' => $this->faker->word(),
            'street' => $this->faker->streetAddress(),
            'rt_rw' => 'RT '.$this->faker->numberBetween(1, 10).' RW '.$this->faker->numberBetween(1, 10),
            'description' => $this->faker->optional()->sentence(),
            'child_name' => $this->faker->optional()->firstName(),
            'child_age_months' => $this->faker->numberBetween(1, 60),
            'weight_kg' => $this->faker->randomFloat(2, 3, 20),
            'height_cm' => $this->faker->randomFloat(2, 50, 110),
            'symptoms' => $this->faker->optional()->sentence(),
            'eating_pattern' => $this->faker->optional()->sentence(),
            'immunization_status' => $this->faker->optional()->randomElement(['lengkap', 'belum_lengkap', 'tidak_tahu']),
        ];
    }
}
