<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVisitRequest extends FormRequest
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
            'visited_at' => ['required', 'date'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'street' => ['required', 'string', 'max:150'],
            'rt_rw' => ['required', 'string', 'max:50'],
            'description' => ['nullable', 'string'],
            'child_name' => ['nullable', 'string', 'max:100'],
            'child_age_months' => ['required', 'integer', 'min:0', 'max:240'],
            'weight_kg' => ['required', 'numeric', 'min:0', 'max:50'],
            'height_cm' => ['required', 'numeric', 'min:30', 'max:150'],
            'symptoms' => ['nullable', 'string'],
            'eating_pattern' => ['nullable', 'string'],
            'immunization_status' => ['nullable', 'in:lengkap,belum_lengkap,tidak_tahu'],
        ];
    }

    public function messages(): array
    {
        return [
            'visited_at.required' => 'Tanggal kunjungan wajib diisi.',
            'visited_at.date' => 'Tanggal kunjungan tidak valid.',
            'city.required' => 'Kota wajib diisi.',
            'district.required' => 'Kecamatan wajib diisi.',
            'street.required' => 'Jalan wajib diisi.',
            'rt_rw.required' => 'RT/RW wajib diisi.',
            'child_age_months.required' => 'Usia anak (bulan) wajib diisi.',
            'weight_kg.required' => 'Berat badan wajib diisi.',
            'height_cm.required' => 'Tinggi badan wajib diisi.',
            'immunization_status.in' => 'Status imunisasi tidak valid.',
        ];
    }
}
