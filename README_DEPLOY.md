# Deploy Awal Coolify

Dokumen ini untuk deploy awal `portfolio-web` ke VPS Ubuntu 24.04 via Coolify dan GitHub. Target tahap ini adalah UI/halaman depan tampil online dulu memakai mode demo/static. Database production, admin production, storage, dan backup disiapkan tahap berikutnya.

## Audit Project

- Jenis project: full-stack web portfolio.
- Frontend: React 19 + Vite 6.
- Backend: ASP.NET Core 8 Web API.
- Database: MariaDB/MySQL via EF Core Pomelo.
- Package manager frontend: npm.
- Runtime frontend build: Node.js.
- Runtime backend: .NET 8.
- Frontend base directory: `frontend-react`.
- Backend base directory: `backend-dotnet`.
- Database schema/seed manual: `backend-dotnet/database/portfolio_web.sql`.
- Frontend build command: `npm ci && npm run build`.
- Frontend publish directory: `dist`.
- Backend build command: `dotnet publish -c Release -o /app/publish`.
- Backend start command: `dotnet /app/publish/backend-dotnet.dll`.
- Frontend dev port: `5173`.
- Backend internal port: `5050`.
- Health check backend: `/health`.

## Mode Deploy Awal Tanpa Database

Frontend bisa tampil tanpa database karena memiliki fallback data lokal di `frontend-react/src/data/portfolioData.js`.

Untuk deploy awal UI/static di Coolify, gunakan:

```txt
VITE_DEMO_MODE=true
```

Dengan mode ini:

- Home, About, Portfolio, dan Project Detail tampil dari data lokal.
- Frontend tidak memanggil backend production.
- Contact form tidak mengirim ke backend, tetapi menampilkan arahan kontak email langsung.
- Admin CMS tetap ada di `/admin`, tetapi tidak dipakai untuk production demo tanpa backend/database.

Mode asli tetap ada. Nanti setelah backend dan database production siap, ubah:

```txt
VITE_DEMO_MODE=false
VITE_API_BASE_URL=
```

Isi `VITE_API_BASE_URL` dengan URL backend production.

## Coolify: Rekomendasi Tahap Ini

Deploy hanya frontend static terlebih dahulu.

- Build Pack: Static atau Nixpacks.
- Base Directory: `frontend-react`.
- Build Command: `npm ci && npm run build`.
- Publish Directory: `dist`.
- Start Command: tidak perlu untuk static hosting.
- Port internal: tidak perlu untuk static hosting.
- Health Check Path: `/`.
- Database sekarang: TIDAK.
- Persistent Volume: tidak perlu.

Environment variables frontend:

```txt
VITE_DEMO_MODE
VITE_API_BASE_URL
```

Untuk tahap demo awal:

```txt
VITE_DEMO_MODE=true
```

Kosongkan `VITE_API_BASE_URL` atau isi nanti saat backend production sudah ada.

## Coolify: Backend Nanti

Saat backend sudah akan dipublish:

- Build Pack: Nixpacks .NET atau Dockerfile jika nanti dibuat.
- Base Directory: `backend-dotnet`.
- Build Command: `dotnet publish -c Release -o /app/publish`.
- Start Command: `dotnet /app/publish/backend-dotnet.dll`.
- Port: `5050`.
- Health Check Path: `/health`.
- Database: YA, MariaDB/MySQL.
- Persistent Volume: pada service MariaDB.

Environment variables backend yang perlu disiapkan:

```txt
ASPNETCORE_ENVIRONMENT
ConnectionStrings__PortfolioDatabase
PortfolioDatabase__AutoInitialize
PortfolioDatabase__ServerVersion
PortfolioDatabase__ServerType
FrontendCors__AllowedOrigins__0
ContactRateLimit__PermitLimit
ContactRateLimit__WindowMinutes
Admin__Enabled
Admin__ApiKey
Admin__Username
Admin__Password
Admin__AllowLocalWithoutApiKey
ContactEmail__SmtpHost
ContactEmail__SmtpPort
ContactEmail__UseStartTls
ContactEmail__Username
ContactEmail__Password
ContactEmail__FromEmail
ContactEmail__FromName
ContactEmail__ToEmail
ContactEmail__ToName
```

Jangan commit nilai secret, password, token, atau connection string production.

## Database Nanti

Database yang dibutuhkan nanti:

- MariaDB atau MySQL.
- Port database hanya internal Coolify, jangan expose publik.
- Persistent volume wajib.
- Backup otomatis wajib sebelum admin CMS dipakai serius.

Yang perlu disiapkan:

- Buat MariaDB service di Coolify.
- Import atau seed schema dari `backend-dotnet/database/portfolio_web.sql`.
- Set `ConnectionStrings__PortfolioDatabase` dari koneksi internal Coolify.
- Set `PortfolioDatabase__AutoInitialize` sesuai strategi deploy.
- Nanti idealnya tambah EF Core migration agar perubahan schema lebih rapi.

## Fitur Yang Belum Production Saat Mode Demo

- Contact form belum menyimpan pesan dan belum mengirim email.
- Admin CMS belum dipakai karena database/backend belum production.
- Data portfolio online masih read-only dari fallback lokal.
- Database, backup, storage upload media, dan SMTP belum aktif.
- Domain dan CORS production belum final.

## Langkah Deploy Awal

1. Push repo ke GitHub.
2. Buka Coolify.
3. Buat project/app baru dari GitHub repository.
4. Pilih base directory `frontend-react`.
5. Pilih Static/Nixpacks.
6. Set build command `npm ci && npm run build`.
7. Set publish directory `dist`.
8. Tambahkan environment variable `VITE_DEMO_MODE`.
9. Deploy.
10. Buka URL IP/subdomain sementara dari Coolify.
11. Test Home, About, Portfolio, dan Project Detail.

## Setelah UI Online

Tahap berikutnya:

- Deploy backend `.NET`.
- Tambah MariaDB service Coolify.
- Setup CORS domain frontend.
- Ganti admin credential.
- Setup SMTP contact form.
- Setup backup database.
- Baru arahkan domain final.
