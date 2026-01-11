<?php

return [
    'api_key' => env('GEMINI_API_KEY'),
    'model' => env('GEMINI_MODEL', 'gemini-2.0-flash'),
    'base_url' => env('GEMINI_BASE_URL', 'https://generativelanguage.googleapis.com/v1beta'),
    'temperature' => env('GEMINI_TEMPERATURE', 0.4),
    'max_output_tokens' => env('GEMINI_MAX_OUTPUT_TOKENS', 1024),
    'debug' => env('GEMINI_DEBUG', false),
];
