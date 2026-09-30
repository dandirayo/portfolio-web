# Portfolio Dandi — arah desain dan alur pengunjung

## Tujuan

Dalam beberapa detik pertama, pengunjung harus dapat menjawab tiga hal:

1. **Siapa Dandi?** Seorang praktisi desain pengalaman, technical support L2, dan creative technology.
2. **Karya seperti apa yang tersedia?** UI/UX, technical support & data, serta creative tech & media.
3. **Apa langkah berikutnya?** Pilih bidang, buka case study, baca profil, atau hubungi Dandi.

Desain visual memakai referensi kartu editorial bernuansa music app: latar cream, outline gelap, cobalt blue, coral, mint, lavender, stiker miring, dan ilustrasi. Bahasa visual itu dipakai untuk membantu pemindaian konten; label antarmuka harus menjelaskan tujuan setiap kartu.

## Masalah yang diperbaiki

- Sebelumnya tiga kartu muncul sebelum perkenalan utama. Pengunjung melihat dekorasi dan nama bidang sebelum mengetahui identitas, nilai kerja, atau tindakan yang diharapkan.
- Label seperti “Expertise Card” dan “Small Notification Card” menjelaskan komponen desain, bukan kebutuhan pengunjung.
- Daftar bidang tampak seperti informasi statis, padahal seharusnya menjadi jalan menuju proyek terkait.
- “Video & Game” sebagai label tampilan kurang mencakup proyek video sosial dan produksi cetak.
- Project pilihan tidak mewakili tiga bidang secara seimbang.

## Alur utama

```text
Home
  ├─ 01 Kenali Dandi + nilai kerjanya
  │    ├─ Explore Case Studies → Portfolio
  │    └─ Choose a Field → bagian kategori di Home
  ├─ 02 Pilih bidang
  │    ├─ UI/UX Design → Portfolio terfilter
  │    ├─ Technical Support & Data → Portfolio terfilter
  │    └─ Creative Tech & Media → Portfolio terfilter
  ├─ Featured Case Study → Project Detail
  ├─ About Dandi → About
  ├─ 03 Satu contoh karya per bidang → Project Detail
  ├─ 04 Recent Experience → About
  └─ 05 Get in Touch → Contact
```

Urutan di Home adalah **identitas → pilihan bidang → bukti karya → pengalaman → kontak**. CTA primer “Explore Case Studies” langsung menuju daftar proyek. CTA sekunder “Choose a Field” menggulir ke kategori, sehingga pengunjung yang belum tahu proyek tertentu bisa menentukan arah.

## Struktur konten dan kategori

| Label untuk pengunjung | Nilai data yang dipertahankan | Isi yang dijanjikan |
| --- | --- | --- |
| UI/UX Design | `UI/UX Design` | Riset, alur pengguna, wireframe, dan prototipe |
| Technical Support & Data | `IT & Data` | Operasional L2, troubleshooting, dan analisis |
| Creative Tech & Media | `Video & Game` | Prototipe game, video, dan produksi visual/cetak |

Label baru hanya mengubah penyajian. Nilai kategori dalam API, database, dan fallback lokal tidak diubah. Halaman Portfolio membaca parameter `category` dan `q` dari URL, sehingga tautan kategori dari Home dapat dibagikan dan tombol Back browser bekerja.

Pada Home, bagian “Start with these” memilih satu proyek `featured` dari masing-masing kategori yang tersedia. Jika kategori belum punya proyek unggulan, kategori itu tidak dibuatkan karya fiktif.

Saat pindah ke halaman lain, posisi scroll kembali ke atas agar judul dan konteks halaman baru terlihat. Mengubah filter di halaman Portfolio tidak memindahkan posisi scroll pengguna.

## Hierarki visual per halaman

### Home

1. **Hero utama:** nama Dandi, pernyataan nilai “Clear experiences. Reliable systems.”, deskripsi singkat, CTA primer dan sekunder, tautan CV.
2. **Explore by field:** tiga bidang sebagai tautan yang terlihat dapat diklik, jumlah proyek, featured case study, serta kartu profil.
3. **Start with these:** tiga case study lintas bidang. Setiap kartu menampilkan judul, peran, ringkasan, dan tautan yang jelas.
4. **Experience dan Contact:** informasi pendukung setelah pengunjung melihat bukti karya.

### Portfolio

- Pengunjung dapat mencari istilah spesifik seperti Figma atau Unity.
- Empat pilihan filter tampil sebagai kartu dengan judul, deskripsi, dan jumlah proyek: All projects serta tiga bidang.
- Judul hasil berubah sesuai filter aktif. Keadaan kosong memberi tindakan “Show all projects”.
- Judul dan label kategori yang terlihat memakai bahasa yang sama seperti Home.

### Project Detail

Isi case study tetap mengikuti data aktual: context, problem, solution, role, responsibilities, results, lessons learned, dan evidence links. Visual placeholder tetap ditandai sebagai konsep, bukan dokumentasi proyek final.

## Aturan UI

- Latar `#f7f4e9`, kartu `#fffefa`, teks `#202730`.
- Aksen: cobalt `#3c59c8`, coral `#ff7d6c`, mint `#a9ead8`, lavender `#beb5eb`, lemon `#f8ed50`.
- Garis tepi gelap sekitar 1.5 px, radius kartu sekitar 16 px. Warna aksen menandai kelompok konten atau status aktif.
- Headline besar dan tebal. Teks pendukung perlu cukup besar untuk dibaca; jangan mengandalkan label 9–10 px untuk informasi penting.
- CTA utama harus menyebut hasil tindakannya: “Explore Case Studies”, “Open Case Study”, “About Dandi”, “Contact”.
- Ikon dan stiker adalah pendukung. Tautan penting tidak boleh mengandalkan ikon tanpa teks.
- Kartu kategori aktif memiliki perubahan warna dan `aria-pressed`; hover dan keyboard focus tetap terlihat.

## Responsif dan aksesibilitas

- Desktop: hero dua kolom, tiga kartu eksplorasi, tiga kartu karya.
- Tablet: kartu eksplorasi dua kolom; bagian profil memenuhi baris berikutnya.
- Mobile: satu kolom dengan urutan yang sama seperti alur utama. Hero dan CTA muncul sebelum kategori.
- Tidak ada horizontal overflow. Tombol dan tautan penting tetap mudah disentuh, dan teks tidak terpotong saat layar sempit.
- Gunakan heading berurutan, landmark section, label form, teks alternatif gambar, dan status hasil yang diumumkan kepada pembaca layar.
- Hormati `prefers-reduced-motion`. Ilustrasi profil konseptual diberi penanda sampai foto asli tersedia.

## Data dan batasan

Sumber informasi: `frontend-react/src/data/portfolioData.js`, `usePortfolioData.js`, dan `PROJECT_TECHNICAL_OVERVIEW.txt`. API tetap menjadi sumber utama saat tersedia, sedangkan mode demo/fallback memakai data lokal. Perubahan desain tidak membuat hasil kerja, metrik, tautan bukti, atau foto asli yang belum tersedia.

## Kriteria selesai

- Identitas dan CTA primer terlihat sebelum daftar kategori pada desktop maupun mobile.
- Ketiga kategori di Home membuka Portfolio dengan filter yang benar.
- Pencarian dan filter bisa dipakai bersama; URL mempertahankan pilihan itu.
- Tiga proyek pilihan mewakili tiga bidang bila datanya tersedia.
- Pengunjung bisa mengikuti Home → Portfolio → Project Detail dan Home → Contact tanpa menemui tautan dekoratif yang menyesatkan.
- Build dan lint frontend lolos, serta pemeriksaan visual pada desktop dan mobile tidak menunjukkan overflow.
