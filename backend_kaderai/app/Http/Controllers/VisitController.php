<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitRequest;
use App\Http\Resources\VisitResource;
use App\Models\Visit;
use Illuminate\Http\JsonResponse;

class VisitController extends Controller
{
    public function index(): JsonResponse
    {
        $visits = Visit::query()
            ->with('aiOutput')
            ->latest('visited_at')
            ->get();

        return response()->json(VisitResource::collection($visits));
    }

    public function store(StoreVisitRequest $request): JsonResponse
    {
        $visit = Visit::create($request->validated());

        return response()->json(
            VisitResource::make($visit),
            201
        );
    }

    public function show(Visit $visit): JsonResponse
    {
        $visit->load('aiOutput');

        return response()->json(VisitResource::make($visit));
    }
}
