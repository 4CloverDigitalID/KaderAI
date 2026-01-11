<?php

namespace Database\Seeders;

use App\Models\ChatSession;
use Illuminate\Database\Seeder;

class ChatSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ChatSession::factory()->count(3)->create();
    }
}
