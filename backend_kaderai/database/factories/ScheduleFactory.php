<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'scheduled_at' => $this->faker->dateTimeBetween('-1 week', '+1 month'),
            'city' => $this->faker->city(),
            'district' => $this->faker->word(),
            'street' => $this->faker->streetAddress(),
            'rt_rw' => 'RT '.$this->faker->numberBetween(1, 10).' RW '.$this->faker->numberBetween(1, 10),
            'description' => $this->faker->optional()->sentence(),
        ];
    }
}
