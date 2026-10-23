# Latihan Soal TPA

Aplikasi latihan Tes Potensi Akademik (TPA), dibangun dengan Vite + React +
TypeScript dan di-deploy sebagai situs statis (tanpa backend).

Bank soal berisi **96 soal** dari tiga bagian tes:

| Bagian | Kategori | Jumlah | File data |
| --- | --- | --- | --- |
| GMA Verbal | Analogi, Sinonim, Antonim | 55 | `src/data/gma-verbal.ts` |
| GMA Numerical | Numerik | 24 | `src/data/gma-numerical.ts` |
| Smart Ability to Learn | Penalaran Gambar (bergambar) | 17 | `src/data/smart-ability.ts` |

Ditambah section **Analogi Gambar** (soal bergambar dibuat generator, baru setiap
attempt) dan section **BCA Finance**: 30 soal esai studi kasus dari 24 kasus
(`src/bca/data/`), 18 di antaranya punya contoh jawaban dari PDF.

## Menjalankan

```bash
npm install
npm run dev       # server pengembangan
npm run build     # validasi data + cek tipe + build ke dist/
npm run preview   # sajikan hasil build secara lokal
npm run validate  # validasi data saja
npm test          # tes generator Analogi Gambar (1000 soal harus lolos validasi)
```

## Fitur

- **Mode Latihan**: semua soal berurutan tanpa batas waktu. Benar/salah dan
  penjelasan langsung muncul begitu jawaban dipilih.
- **Mode Ujian**: simulasi bertimer per bagian. Soal diambil acak dari pool
  section, tidak ada umpan balik sampai selesai, ada navigator nomor soal dan
  konfirmasi bila masih ada yang kosong. Ujian ditutup otomatis saat waktu
  habis. Halaman hasil menampilkan rincian per kategori dan pembahasan semua
  soal.
- **Analogi Gambar**: format "A diubah menjadi B, maka C diubah menjadi salah
  satu dari gambar 1–5". Bangun digambar sebagai SVG inline oleh generator
  (`src/analogi/`), jadi setiap attempt berisi soal baru.
  - Layar petunjuk dengan contoh resmi (lingkaran besar → kecil) sebelum mulai.
  - Mode Ujian: 20 soal (8 mudah, 8 sedang, 4 sulit, urutan acak), 10 menit,
    ditutup otomatis saat waktu habis. Mode Latihan: tanpa timer, pembahasan
    langsung. Komposisi & durasi di `src/config/analogi.ts`.
  - Mudah = 1 aturan, sedang = 2 aturan, sulit = 3 aturan atau bangun di dalam
    bangun. Aturan: ukuran, putar 45°/90°/180°, cermin, isi (putih/hitam/arsir),
    jumlah bangun, jumlah sisi, posisi titik, tebal garis, tukar bangun dalam/luar.
  - Setiap soal divalidasi saat dibuat: pilihan tidak ada yang kembar, setiap
    aturan terlihat, dan tidak ada tafsiran lain dari A→B (kombinasi 1–3 aturan
    mana pun) yang menunjuk pengecoh. Soal yang ambigu dibuang lalu dibuat ulang.
  - Penjelasan dan alasan tiap pengecoh dibuat otomatis dari aturannya.
  - Sesi (soal, jawaban, timer) tersimpan di localStorage; shortcut 1–5.
- **BCA Finance · psikotes** (dari "Jawaban BCA Finance Update.pdf", ditampilkan
  sebagai sub-bagian grup BCA Finance di menu):
  - **TIU 5**: 30 soal analogi gambar asli, urutan sesuai PDF. Gambar dipotong
    dari scan PDF ke `public/bca-tiu5/` (8 PNG per soal, watermark dibersihkan)
    oleh `scripts/potong-tiu5.py`. Kunci dari PDF; pembahasan ditulis sendiri dan
    diberi label "Pembahasan dibuat sendiri, bukan dari sumber". Mode Latihan
    (pembahasan langsung) dan Mode Ujian (10 menit, `src/config/psikotes.ts`).
    Juga tersedia sebagai pilihan "Soal asli TIU 5" di section Analogi Gambar.
  - **PAPI Kostik**: 90 pasang pernyataan a/b, disalin persis dari PDF.
  - **CBI**: 140 pernyataan Benar/Salah, disalin persis dari PDF; kata "tidak"
    disorot sesuai tips PDF.
  - PAPI dan CBI tidak punya kunci maupun skor (PDF tidak memuat aturan
    penilaiannya). Petunjuk dan tips dari PDF tampil sebelum mulai; satu
    pernyataan per layar, shortcut A/B atau B/S, autosave, batas waktu opsional
    untuk PAPI, dan ringkasan akhir dengan tombol salin/unduh daftar jawaban.
- **BCA Finance · studi kasus** (esai, tidak dinilai otomatis):
  - Mode Latihan: semua soal berurutan, teks kasus di atas pertanyaan, satu
    kotak esai bebas, contoh jawaban bisa dibuka (versi Singkat/Lengkap bergantian).
  - Mode Ujian: *Latihan cepat* (1 kasus acak, 30 menit) dan *Simulasi penuh*
    (4 kasus acak, 150 menit). Jawaban per kasus mengikuti template 5 slide.
  - Rangkuman: jawaban berdampingan dengan contoh jawaban, checklist penilaian
    diri, tombol salin/unduh .txt. Tidak ada skor.
  - Panel Panduan bisa dibuka kapan saja; sesi (termasuk teks yang sedang
    diketik dan timer) tersimpan di localStorage.
- **Tampilan**: Tailwind CSS v4 dengan design token (warna, radius, spacing) di
  `src/styles.css`; mode terang/gelap ikut sistem plus toggle Terang/Gelap/Sistem
  (disimpan di localStorage, dipasang sebelum render agar tidak berkedip).
  Mobile-first dengan target sentuh ≥48px; navigator ujian dan Panduan tampil
  sebagai bottom sheet di HP dan drawer di desktop. Animasi dimatikan di Mode
  Ujian (kecuali transisi pindah soal) dan bila prefers-reduced-motion aktif.
- **Shortcut keyboard**: A–F / 1–6 untuk menjawab, Enter untuk lanjut, dan
  panah kiri/kanan untuk pindah soal di mode ujian.

## Struktur

```
.
├── index.html                  # entry Vite
├── vercel.json                 # preset Vite, build command, output dir
├── public/
│   ├── smart-ability-to-learn/ # gambar soal penalaran gambar
│   ├── legacy.html             # versi satu-file lama (sementara, untuk pembanding)
│   └── robots.txt              # melarang semua crawler mengindeks situs
├── scripts/validate-data.ts    # dijalankan otomatis saat build
├── scripts/test-analogi.ts     # tes generator Analogi Gambar, juga dijalankan saat build
├── scripts/potong-tiu5.py      # potong gambar soal TIU 5 dari PDF ke public/bca-tiu5/
└── src/
    ├── types.ts                # tipe Soal & PaketUjian
    ├── config/paket.ts         # paket Mode Ujian (section, jumlah soal, durasi)
    ├── config/paket-bca.ts     # paket ujian BCA Finance + format 5 slide
    ├── config/analogi.ts       # komposisi soal & durasi Analogi Gambar
    ├── config/psikotes.ts      # durasi TIU 5 & batas waktu opsional PAPI
    ├── analogi/                # model gambar, aturan, generator + validator, sesi
    ├── bca/                    # tipe, data kasus/esai & psikotes (tiu5/papi/cbi), sesi, ekspor BCA Finance
    ├── data/                   # bank soal per section + index.ts
    ├── sesi.ts                 # state & reducer sesi latihan/ujian
    ├── hooks/useShortcut.ts    # shortcut keyboard
    ├── components/             # Kop, Menu, LembarSoal, Navigator, Hasil, analogi/, bca/...
    ├── lib/util.ts, lib/tema.ts
    └── styles.css
```

## Menambah soal

Tambahkan objek ke file data section yang sesuai:

```ts
{
  id: "gma-verbal-056",          // unik, lanjutkan nomor terakhir
  section: "GMA Verbal",
  category: "Analogi",
  question: "Buaya : Kadal",
  options: ["Kecil : Besar", "Zebra : Kuda", "Ayam : Kelinci", "Laki-Laki : Anak", "Roti : Rembulan"],
  answer: 1,                     // 0 = A, 1 = B, ...; null bila kunci belum ada
  explanation: "…",
  image: "smart-ability-to-learn/soal-18.png", // opsional, relatif ke public/
},
```

Nama file gambar sebaiknya **huruf kecil semua tanpa spasi**. Server Linux
membedakan huruf besar-kecil, jadi gambar yang tampil normal di Windows bisa
404 setelah deploy.

`npm run build` akan gagal bila:

- ada `id` duplikat;
- `answer` berada di luar rentang `options`;
- jumlah `options` tidak 2–6;
- file `image` tidak ada di `public/`;
- ada paket ujian yang section-nya tidak punya soal.

Soal BCA Finance (`src/bca/data/*.ts`) memakai `type: "essay"` dan `caseId`
yang merujuk ke satu kasus (`passage`, opsional `tabel`). `answer` berisi daftar
contoh jawaban dari PDF, atau `null` bila PDF tidak memuatnya. Build juga gagal
bila `caseId` tidak ada, kasus tanpa soal, contoh jawaban kosong, atau baris
tabel tidak selebar kolomnya.

## Menambah paket ujian

Tambahkan satu objek di `src/config/paket.ts`:

```ts
{ id: "gma-verbal", section: "GMA Verbal", jumlah: 17, detik: 480 }
```

File dokumen sumber (`*.pdf`, `soal.txt`, `jawaban.txt`) sengaja tidak ikut
ke repo; lihat `.gitignore`.
