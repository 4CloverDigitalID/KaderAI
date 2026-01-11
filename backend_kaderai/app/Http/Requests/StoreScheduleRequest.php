<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreScheduleRequest extends FormRequest
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
            'scheduled_at' => ['required', 'date'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'street' => ['required', 'string', 'max:150'],
            'rt_rw' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'scheduled_at.required' => 'Tanggal jadwal wajib diisi.',
            'scheduled_at.date' => 'Tanggal jadwal tidak valid.',
            'city.required' => 'Kota wajib diisi.',
            'district.required' => 'Kecamatan wajib diisi.',
            'street.required' => 'Jalan wajib diisi.',
            'rt_rw.required' => 'RT/RW wajib diisi.',
        ];
    }
}
