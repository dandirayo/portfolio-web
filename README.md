# Portfolio Web — Dokumentasi Terpadu

Website portofolio full-stack modern untuk **Dandi Prayogatama**, dibangun dengan frontend **React 19 + Vite 6** dan backend **ASP.NET Core 8 Web API**, didukung basis data **MariaDB / MySQL**.

Dokumen ini menggabungkan seluruh panduan arsitektur, arah desain, panduan menjalankan lokal, konfigurasi data/media, hingga petunjuk deployment produksi (static demo maupun full-stack).

---

## Daftar Isi

1. [Gambaran Arsitektur & Tech Stack](#1-gambaran-arsitektur--tech-stack)
2. [Arah Desain & Alur Pengunjung (UX/UI)](#2-arah-desain--alur-pengunjung-uxui)
3. [Panduan Menjalankan di Lokal (Run Local)](#3-panduan-menjalankan-di-lokal-run-local)
4. [Pengaturan Database & Data Fallback](#4-pengaturan-database--data-fallback)
5. [CMS Admin Lokal & Form Kontak](#5-cms-admin-lokal--form-kontak)
6. [Struktur Folder & Konvensi Media](#6-struktur-folder--konvensi-media)
7. [Panduan Deploy ke Server / Production (Coolify/VPS)](#7-panduan-deploy-ke-server--production-coolifyvps)
8. [Status Kesiapan & Hal yang Perlu Dilengkapi](#8-status-kesiapan--hal-yang-perlu-dilengkapi)

---

## 1. Gambaran Arsitektur & Tech Stack

```text
portfolio-web/
├── frontend-react/   # React 19, Vite 6, Bootstrap 5, React Router DOM, Axios
└── backend-dotnet/   # ASP.NET Core 8 Web API, EF Core Pomelo MySQL, MailKit, Swagger
```

- **Frontend:**
  - **Framework:** React 19.1 + Vite 6.3
  - **Styling:** Bootstrap 5.3 + Custom Editorial Styling (bukan Tailwind)
  - **Routing:** React Router DOM 6.30 (mendukung query string filter & dynamic slug)
  - **Data Fetching:** Axios dengan fallback otomatis ke data lokal jika backend offline
- **Backend:**
  - **Framework:** ASP.NET Core 8 Web API (`net8.0`)
  - **ORM / Database Provider:** Entity Framework Core + Pomelo MySQL Provider
  - **Email Service:** MailKit (SMTP delivery)
  - **Security & Reliability:** Fixed-window rate limiter per IP, spam honeypot, token/header-based admin auth
  - **Dokumentasi API:** Swagger / OpenAPI UI
- **Database:**
  - MariaDB 10.4+ atau MySQL 8.0+ (didukung via XAMPP lokal maupun container VPS)

---

## 2. Arah Desain & Alur Pengunjung (UX/UI)

### Persona & Nilai Utama
Pengunjung (khususnya perekrut, klien, atau hiring manager) dalam hitungan detik pertama harus dapat menjawab:
1. **Siapa Dandi?** Praktisi desain pengalaman (*UI/UX Designer*), *Technical Support L2*, dan *Creative Technologist*.
2. **Karya apa yang tersedia?** 3 pilar: UI/UX Design, IT Systems & Data, serta Creative Tech & Media.
3. **Apa langkah berikutnya?** Pilih bidang, buka case study terperinci, unduh CV, atau hubungi langsung.

### Alur Halaman (User Journey)
```text
Home
  ├── 01 Hero (Identitas & Nilai Kerja Dandi + Unduh CV)
  ├── 02 Explore by Field (Pilihan 3 Bidang → link terfilter ke Portfolio)
  │     ├── UI/UX Design (Data category: "UI/UX Design")
  │     ├── Technical Support & Data (Data category: "IT & Data")
  │     └── Creative Tech & Media (Data category: "Video & Game")
  ├── 03 Start with These (1 Featured Case Study pilihan per bidang)
  ├── 04 Experience & Skills Summary (Tautan ke About)
  └── 05 Get in Touch (Form Kontak)
```

### Karakteristik Visual
- **Palet Warna:** Latar cream `#f7f4e9`, kartu `#fffefa`, teks gelap `#202730`.
- **Warna Aksen:** Cobalt `#3c59c8`, coral `#ff7d6c`, mint `#a9ead8`, lavender `#beb5eb`, lemon `#f8ed50`.
- **Gaya:** Kartu editorial bernuansa *music app*, border tegas ~1.5px, sudut membulat ~16px, badge miring, dan tipografi jelas.
- **Aksesibilitas:** Bebas horizontal overflow pada layar mobile, kontras warna terbaca, mendukung `prefers-reduced-motion`, dan state filter terikat pada URL browser (`?category=...`).

---

## 3. Panduan Menjalankan di Lokal (Run Local)

### Prasyarat
- **Node.js** (v18+ atau v20+) dan **npm**
- **.NET 8 SDK**
- **XAMPP** (Apache & MySQL) *— opsional jika hanya ingin menjalankan frontend demo*

### Langkah 1: Setup Frontend
Buka terminal PowerShell:
```powershell
cd frontend-react
npm.cmd install
Copy-Item .env.example .env
```
Isi default file `.env`:
```env
VITE_API_BASE_URL=http://localhost:5050
VITE_DEMO_MODE=false
```

Jalankan server dev frontend:
```powershell
npm.cmd run dev
```
Akses di browser: `http://localhost:5173`

### Langkah 2: Setup Backend (Jika Menggunakan Database)
1. Buka XAMPP Control Panel, klik **Start** pada MySQL dan Apache.
2. Buka phpMyAdmin di `http://localhost/phpmyadmin`.
3. Buat database baru bernama `portfolio_web` dan import:
   ```text
   backend-dotnet/database/portfolio_web.sql
   ```
   *(Catatan: Backend juga memiliki fitur auto-initialize yang otomatis membuat tabel & data awal saat MySQL aktif).*
4. Di terminal PowerShell baru, jalankan backend:
   ```powershell
   cd backend-dotnet
   dotnet run
   ```
   Backend berjalan di: `http://localhost:5050`
   Swagger API docs: `http://localhost:5050/swagger`
   Health check: `http://localhost:5050/health/live`

### Perintah Pengecekan Kualitas (Lint & Build)
- Lint frontend: `cd frontend-react; npm.cmd run lint`
- Build frontend: `cd frontend-react; npm.cmd run build`
- Build backend: `cd backend-dotnet; dotnet build`

---

## 4. Pengaturan Database & Data Fallback

### Resiliensi Data (Fallback Mode)
Website dirancang agar **tidak pernah blank** meskipun database atau backend sedang mati:
- Sumber data utama: API `http://localhost:5050/api/portfolio`.
- Sumber data cadangan: [`frontend-react/src/data/portfolioData.js`](frontend-react/src/data/portfolioData.js).
- Hook [`usePortfolioData.js`](frontend-react/src/hooks/usePortfolioData.js) otomatis mengalihkan ke data lokal jika API tidak merespons dalam 4 detik atau jika `VITE_DEMO_MODE=true`.

### Tabel Database Utama
1. `portfolio_profiles` : Data diri, headline, link medsos, file CV, foto.
2. `expertise_items`    : Bidang keahlian utama.
3. `portfolio_projects`  : Daftar case study terstruktur (Slug, Context, Problem, Solution, Role, ResponsibilitiesJson, ToolsJson, GalleryJson, ResultsJson, LessonsLearnedJson, GithubUrl, LiveDemoUrl).
4. `skill_groups`       : Kelompok skill teknis dan tingkat kemahiran.
5. `timeline_items`     : Riwayat karier dan pendidikan.
6. `contact_submissions`: Kotak masuk pesan dari form kontak.

---

## 5. CMS Admin Lokal & Form Kontak

### CMS Admin (`/admin`)
Tersedia antarmuka admin lokal di:
```text
http://localhost:5173/admin
```
- **Fungsi:** Mengubah profile, projects, keahlian, skill, timeline, serta membaca pesan yang masuk langsung ke database.
- **Kredensial Default Lokal:**
  - Username: `admin`
  - Password: `admin`
- **Keamanan:** Sebelum backend dipublish ke publik, ganti kredensial atau gunakan API Key melalui environment variable:
  ```powershell
  $env:Admin__Username = "admin-pribadi"
  $env:Admin__Password = "password-sangat-kuat"
  $env:Admin__ApiKey = "kunci-rahasia-acak-panjang"
  $env:Admin__AllowLocalWithoutApiKey = "false"
  ```

### Form Kontak & Notifikasi Email
Endpoint backend: `POST /api/contact`
- Dilengkapi **honeypot spam** dan **rate limit** (default: 5 kiriman per IP per 10 menit).
- Pesan otomatis tersimpan di tabel `contact_submissions`.
- Untuk meneruskan pesan langsung ke inbox email (Gmail SMTP), atur environment variables berikut:
  ```powershell
  $env:ContactEmail__SmtpHost = "smtp.gmail.com"
  $env:ContactEmail__SmtpPort = "587"
  $env:ContactEmail__UseStartTls = "true"
  $env:ContactEmail__Username = "email-kamu@gmail.com"
  $env:ContactEmail__Password = "app-password-gmail"
  $env:ContactEmail__FromEmail = "email-kamu@gmail.com"
  $env:ContactEmail__ToEmail = "email-kamu@gmail.com"
  ```

---

## 6. Struktur Folder & Konvensi Media

```text
frontend-react/public/
├── cv-dandi-prayogatama.pdf              # File CV yang dapat diunduh
├── vite.svg
└── media/
    ├── editorial-portrait.png            # Ilustrasi potret editorial
    ├── placeholders/                     # Gambar placeholder netral
    │   ├── profile-placeholder.webp
    │   ├── project-uiux.webp
    │   ├── project-it-data.webp
    │   └── project-creative.webp
    └── projects/                         # (Rekomendasi untuk aset nyata)
        └── <slug-proyek>/
            ├── cover.webp
            ├── demo.mp4
            └── case-study.pdf
```

> **Tips:** Gunakan path relatif publik (misal `/media/projects/peduli-donasi/cover.webp`) baik di dalam database maupun di `portfolioData.js` agar URL browser dan media selalu sinkron.

---

## 7. Panduan Deploy ke Server / Production (Coolify/VPS)

### Strategi Rekomendasi: Deploy 2 Tahap

#### Tahap 1: Deploy Frontend Static (Live Instan dalam Hitungan Menit)
Deploy frontend terlebih dahulu menggunakan mode static demo:
- **Platform:** Coolify (Nixpacks / Static), Vercel, Netlify, atau GitHub Pages.
- **Base Directory:** `frontend-react`
- **Build Command:** `npm ci && npm run build`
- **Publish Directory:** `dist`
- **Environment Variables:**
  ```env
  VITE_DEMO_MODE=true
  ```
- **Kelebihan:** Website portofolio langsung live online, cepat, stabil, tidak butuh server database, dan pengunjung tetap bisa membaca semua case study serta menghubungi via email langsung.

#### Tahap 2: Deploy Backend & Database (Full-Stack)
Jika ingin fitur pengiriman form kontak dan CMS admin aktif online:
1. **Service MariaDB (Coolify):**
   - Buat MariaDB service terisolasi (port 3306 jangan diekspos ke publik).
   - Pastikan persistent volume terpasang agar data tidak hilang saat restart.
   - Import `backend-dotnet/database/portfolio_web.sql`.
2. **Service Backend .NET (Coolify):**
   - **Base Directory:** `backend-dotnet`
   - **Build Command:** `dotnet publish -c Release -o /app/publish`
   - **Start Command:** `dotnet /app/publish/backend-dotnet.dll`
   - **Port:** `5050`
   - **Health Check:** `/health/live` (atau `/health` jika DB wajib sehat)
   - **Environment Variables Wajib Disiapkan di Server:**
     ```env
     ASPNETCORE_ENVIRONMENT=Production
     ConnectionStrings__PortfolioDatabase="Server=mariadb;Port=3306;Database=portfolio_web;User=...;Password=...;"
     PortfolioDatabase__AutoInitialize=false
     FrontendCors__AllowedOrigins__0=https://domain-frontend-kamu.com
     Admin__Enabled=true
     Admin__ApiKey=ganti_dengan_token_rahasia_acak
     Admin__Username=ganti_username_admin
     Admin__Password=ganti_password_admin_kuat
     Admin__AllowLocalWithoutApiKey=false
     ContactEmail__SmtpHost=smtp.gmail.com
     ContactEmail__SmtpPort=587
     ContactEmail__UseStartTls=true
     ContactEmail__Username=email@gmail.com
     ContactEmail__Password=app_password_gmail
     ContactEmail__FromEmail=email@gmail.com
     ContactEmail__ToEmail=email@gmail.com
     ```
3. **Hubungkan Frontend ke Backend:**
   Ubah environment variable di frontend menjadi:
   ```env
   VITE_DEMO_MODE=false
   VITE_API_BASE_URL=https://api.domain-kamu.com
   ```

---

## 8. Status Kesiapan & Hal yang Perlu Dilengkapi

### Apakah sudah bisa di-run?
**YA, 100% BISA.** Kode telah diuji dan terverifikasi bersih dari error lint maupun build.

### Apakah perlu develop kodingan lagi?
Secara arsitektur teknis dan fungsionalitas aplikasi, **TIDAK PERLU develop kodingan dari nol lagi**. Fitur routing, filter dinamis, halaman detail, fallback data, form handler, hingga rate limiting sudah lengkap.

### Apa saja yang masih kurang / perlu dilengkapi sebelum dipamerkan ke publik?
Yang perlu dilengkapi adalah **konten nyata dan aset pribadi**:
1. **Ganti Gambar Dummy:**
   - Saat ini thumbnail proyek masih menggunakan gambar placeholder di `/media/placeholders/`.
   - Siapkan screenshot desain Figma, cover aplikasi, atau dokumentasi visual asli untuk setiap proyek.
2. **Isi Tautan Bukti Karya Nyata:**
   - Di [`portfolioData.js`](frontend-react/src/data/portfolioData.js), field `githubUrl`, `liveDemoUrl`, atau tautan eksternal (Figma/Drive/YouTube) pada beberapa proyek masih kosong (`""`).
3. **Perbarui Data Kontak Pribadi:**
   - Pastikan alamat email, nomor telepon, link LinkedIn, dan link GitHub pada profil sudah sesuai dengan data pribadi kamu yang aktif.
4. **Keamanan Production (Bila mengaktifkan Backend):**
   - Jangan gunakan username/password bawaan `admin`/`admin`. Pastikan mengatur API Key dan password yang aman di environment hosting.
