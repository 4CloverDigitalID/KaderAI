<?php

namespace Database\Seeders;

use App\Models\VisitAIOutput;
use Illuminate\Database\Seeder;

class VisitAIOutputSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VisitAIOutput::factory()->count(5)->create();
    }
}
