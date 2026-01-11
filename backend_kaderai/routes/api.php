<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\VisitAIController;
use App\Http\Controllers\VisitController;
use Illuminate\Support\Facades\Route;

Route::prefix('visits')->group(function (): void {
    Route::post('/', [VisitController::class, 'store']);
    Route::get('/', [VisitController::class, 'index']);
    Route::get('/{visit}', [VisitController::class, 'show']);
    Route::post('/{visit}/analyze', [VisitAIController::class, 'analyze']);
    Route::post('/{visit}/plan', [VisitAIController::class, 'plan']);
    Route::post('/{visit}/report', [VisitAIController::class, 'report']);
});

Route::apiResource('schedules', ScheduleController::class);

Route::prefix('chat')->group(function (): void {
    Route::post('/sessions', [ChatController::class, 'storeSession']);
    Route::post('/sessions/{session}/messages', [ChatController::class, 'sendMessage']);
});
