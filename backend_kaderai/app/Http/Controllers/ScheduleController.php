<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreScheduleRequest;
use App\Http\Resources\ScheduleResource;
use App\Models\Schedule;
use Illuminate\Http\JsonResponse;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $schedules = Schedule::query()
            ->latest('scheduled_at')
            ->get();

        return response()->json([
            'total' => $schedules->count(),
            'items' => ScheduleResource::collection($schedules)->resolve(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScheduleRequest $request): JsonResponse
    {
        $schedule = Schedule::create($request->validated());

        return response()->json(ScheduleResource::make($schedule), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule): JsonResponse
    {
        return response()->json(ScheduleResource::make($schedule));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreScheduleRequest $request, Schedule $schedule): JsonResponse
    {
        $schedule->update($request->validated());

        return response()->json(ScheduleResource::make($schedule));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule): JsonResponse
    {
        $schedule->delete();

        return response()->json(null, 204);
    }
}
