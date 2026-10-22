# Latihan Soal TPA

Aplikasi latihan Tes Potensi Akademik (TPA), dibangun dengan Vite + React +
TypeScript dan di-deploy sebagai situs statis (tanpa backend).

Bank soal berisi **96 soal** dari tiga bagian tes:

| Bagian | Kategori | Jumlah | File data |
| --- | --- | --- | --- |
| GMA Verbal | Analogi, Sinonim, Antonim | 55 | `src/data/gma-verbal.ts` |
| GMA Numerical | Numerik | 24 | `src/data/gma-numerical.ts` |
| Smart Ability to Learn | Penalaran Gambar (bergambar) | 17 | `src/data/smart-ability.ts` |

Ditambah section **BCA Finance**: 30 soal esai studi kasus dari 24 kasus
(`src/bca/data/`), 18 di antaranya punya contoh jawaban dari PDF.

## Menjalankan

```bash
npm install
npm run dev       # server pengembangan
npm run build     # validasi data + cek tipe + build ke dist/
npm run preview   # sajikan hasil build secara lokal
npm run validate  # validasi data saja
```

## Fitur

- **Mode Latihan**: semua soal berurutan tanpa batas waktu. Benar/salah dan
  penjelasan langsung muncul begitu jawaban dipilih.
- **Mode Ujian**: simulasi bertimer per bagian. Soal diambil acak dari pool
  section, tidak ada umpan balik sampai selesai, ada navigator nomor soal dan
  konfirmasi bila masih ada yang kosong. Ujian ditutup otomatis saat waktu
  habis. Halaman hasil menampilkan rincian per kategori dan pembahasan semua
  soal.
- **BCA Finance** (esai, tidak dinilai otomatis):
  - Mode Latihan: semua soal berurutan, teks kasus di atas pertanyaan, satu
    kotak esai bebas, contoh jawaban bisa dibuka (versi Singkat/Lengkap bergantian).
  - Mode Ujian: *Latihan cepat* (1 kasus acak, 30 menit) dan *Simulasi penuh*
    (4 kasus acak, 150 menit). Jawaban per kasus mengikuti template 5 slide.
  - Rangkuman: jawaban berdampingan dengan contoh jawaban, checklist penilaian
    diri, tombol salin/unduh .txt. Tidak ada skor.
  - Panel Panduan bisa dibuka kapan saja; sesi (termasuk teks yang sedang
    diketik dan timer) tersimpan di localStorage.
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
└── src/
    ├── types.ts                # tipe Soal & PaketUjian
    ├── config/paket.ts         # paket Mode Ujian (section, jumlah soal, durasi)
    ├── config/paket-bca.ts     # paket ujian BCA Finance + format 5 slide
    ├── bca/                    # tipe, data kasus/esai, panduan, sesi, ekspor BCA Finance
    ├── data/                   # bank soal per section + index.ts
    ├── sesi.ts                 # state & reducer sesi latihan/ujian
    ├── hooks/useShortcut.ts    # shortcut keyboard
    ├── components/             # Kop, Menu, LembarSoal, Navigator, Hasil, bca/...
    ├── lib/util.ts
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
