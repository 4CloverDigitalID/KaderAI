# 🤖 KaderAI

**KaderAI** adalah platform berbasis AI untuk mendukung kader kesehatan masyarakat dalam melakukan kunjungan rumah, triase risiko, perencanaan tindak lanjut, dan pelaporan — didukung oleh Google Gemini AI.

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Struktur Proyek](#-struktur-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
  - [Backend](#backend-laravel)
  - [Frontend](#frontend-react--vite)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [API Endpoints](#-api-endpoints)
- [Lisensi](#-lisensi)

---

## 🧠 Tentang Proyek

KaderAI dirancang untuk membantu **kader kesehatan** di tingkat kelurahan/desa dalam:

- Mencatat dan mengelola data **kunjungan rumah** warga
- Mendapatkan **analisis risiko kesehatan berbasis AI** (triase)
- Membuat **rencana tindak lanjut 7 hari** secara otomatis
- Menghasilkan **laporan kunjungan** yang siap digunakan
- Berkonsultasi melalui **chatbot AI** yang konteks-aware terhadap jadwal kunjungan

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🏠 **Manajemen Kunjungan** | Catat data kunjungan warga lengkap dengan gejala |
| 🚨 **Triase AI** | Deteksi red flag & klasifikasi risiko (low / medium / high) otomatis |
| 📅 **Rencana 7 Hari** | AI menghasilkan rencana tindak lanjut terstruktur |
| 📄 **Laporan Otomatis** | Generate laporan kunjungan naratif siap kirim |
| 💬 **Chat AI** | Chatbot kontekstual berbasis sesi & jadwal kunjungan |
| 🗓️ **Jadwal Kunjungan** | Kelola jadwal posyandu & kunjungan terencana |

---

## 🛠️ Teknologi

### Backend
- **PHP 8.2+** — Runtime
- **Laravel 12** — Framework utama
- **MySQL** — Database
- **Google Gemini API** (`gemini-2.0-flash`) — AI engine
- **Pest** — Testing framework

### Frontend
- **React 19** — UI framework
- **Vite 7** — Build tool & dev server
- **Tailwind CSS 4** — Styling
- **React Router 7** — Routing
- **GSAP 3** — Animasi
- **Plus Jakarta Sans** — Tipografi

---

## 📁 Struktur Proyek

```
KaderAI/
├── backend_kaderai/          # Laravel API backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── ChatController.php
│   │   │   │   ├── ScheduleController.php
│   │   │   │   ├── VisitController.php
│   │   │   │   └── VisitAIController.php
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Services/
│   │   │   ├── GeminiService.php   # Integrasi Gemini AI
│   │   │   └── SafetyRules.php     # Deteksi red flag & safety enforcement
│   │   └── Providers/
│   ├── database/
│   ├── routes/
│   │   └── api.php
│   └── .env.example
│
└── frontend_kaderai/         # React + Vite frontend
    └── src/
        ├── pages/
        │   ├── LandingPage.jsx
        │   ├── Chat/
        │   ├── Schedules/
        │   └── Visits/
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── Kelebihan.jsx
            ├── Steps.jsx
            ├── Impact.jsx
            ├── Trust.jsx
            ├── Tujuan.jsx
            ├── Chat/
            ├── Schedules/
            └── Visits/
```

---

## ✅ Prasyarat

Pastikan sudah terinstall:

- **PHP** >= 8.2
- **Composer** >= 2.x
- **Node.js** >= 18.x & **npm**
- **MySQL** >= 8.0
- **Google Gemini API Key** (dari [Google AI Studio](https://aistudio.google.com))

---

## 🚀 Instalasi

### Backend (Laravel)

```bash
# Masuk ke direktori backend
cd backend_kaderai

# Install dependensi PHP
composer install

# Salin file environment
cp .env.example .env

# Generate application key
php artisan key:generate

# Buat database MySQL dan sesuaikan konfigurasi di .env
# lalu jalankan migrasi
php artisan migrate

# Jalankan server pengembangan
composer run dev
```

### Frontend (React + Vite)

```bash
# Masuk ke direktori frontend
cd frontend_kaderai

# Install dependensi Node
npm install

# Jalankan dev server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`  
Backend API akan berjalan di `http://localhost:8000`

---

## 🔧 Konfigurasi Environment

Salin `.env.example` ke `.env` di folder `backend_kaderai` dan isi nilai berikut:

```env
# Aplikasi
APP_NAME=KaderAI
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=backend_kaderai
DB_USERNAME=root
DB_PASSWORD=

# Frontend URL (untuk CORS)
FRONTEND_URL=http://localhost:5173

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.0-flash
GEMINI_BASE_URL=https://generativelanguage.googleapis.com/v1beta
GEMINI_TEMPERATURE=0.4
GEMINI_MAX_OUTPUT_TOKENS=1024
GEMINI_DEBUG=false
```

---

## 📡 API Endpoints

### Kunjungan (Visits)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/visits` | Daftar semua kunjungan |
| `POST` | `/api/visits` | Tambah kunjungan baru |
| `GET` | `/api/visits/{id}` | Detail kunjungan |
| `POST` | `/api/visits/{id}/analyze` | Analisis risiko AI (triase) |
| `POST` | `/api/visits/{id}/plan` | Generate rencana 7 hari |
| `POST` | `/api/visits/{id}/report` | Generate laporan kunjungan |

### Jadwal (Schedules)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/schedules` | Daftar jadwal |
| `POST` | `/api/schedules` | Tambah jadwal |
| `GET` | `/api/schedules/{id}` | Detail jadwal |
| `PUT` | `/api/schedules/{id}` | Update jadwal |
| `DELETE` | `/api/schedules/{id}` | Hapus jadwal |

### Chat AI

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/chat/sessions` | Buat sesi chat baru |
| `POST` | `/api/chat/sessions/{id}/messages` | Kirim pesan ke AI |

---

## 🧪 Testing

```bash
# Jalankan test suite (dari direktori backend)
cd backend_kaderai
composer run test
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---

> **Catatan:** Informasi dan analisis yang dihasilkan AI bersifat edukatif dan **tidak menggantikan konsultasi tenaga medis profesional**.
