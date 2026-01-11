<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChatSessionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:150'],
            'schedule_id' => ['nullable', 'integer', 'exists:schedules,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'schedule_id.exists' => 'Jadwal tidak ditemukan.',
        ];
    }
}
