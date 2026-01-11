<?php

namespace App\Http\Controllers;

use App\Http\Requests\SendChatMessageRequest;
use App\Http\Requests\StoreChatSessionRequest;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Services\GeminiService;
use Illuminate\Http\JsonResponse;

class ChatController extends Controller
{
    public function storeSession(StoreChatSessionRequest $request): JsonResponse
    {
        $session = ChatSession::create($request->validated());

        return response()->json($session, 201);
    }

    public function sendMessage(
        SendChatMessageRequest $request,
        ChatSession $session,
        GeminiService $geminiService
    ): JsonResponse {
        $session->messages()->create([
            'role' => 'user',
            'content' => $request->validated()['message'],
        ]);

        $history = $session->messages()
            ->latest()
            ->take(12)
            ->get()
            ->reverse()
            ->map(fn (ChatMessage $message) => [
                'role' => $message->role,
                'content' => $message->content,
            ])
            ->values()
            ->all();

        $session->loadMissing('schedule');

        $scheduleContext = null;
        if ($session->schedule) {
            $scheduleContext = "Tanggal: {$session->schedule->scheduled_at?->toDateTimeString()}\n".
                "Lokasi: {$session->schedule->street} | {$session->schedule->rt_rw} | {$session->schedule->district}, {$session->schedule->city}";
        }

        $answer = $geminiService->generateChatReply($history, $scheduleContext);

        $session->messages()->create([
            'role' => 'model',
            'content' => $answer,
        ]);

        return response()->json(['answer' => $answer]);
    }
}
