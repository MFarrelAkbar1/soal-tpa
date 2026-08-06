# Latihan Soal TPA

Aplikasi latihan Tes Potensi Akademik (TPA) berbentuk satu halaman HTML statis.
Tidak butuh server, tidak butuh instalasi, tidak ada dependensi eksternal —
seluruh soal, kunci jawaban, penjelasan, tampilan, dan logikanya tertanam di
dalam `index.html`.

Bank soal berisi **96 soal** dari tiga bagian tes:

| Bagian | Kategori | Jumlah |
| --- | --- | --- |
| GMA Verbal | Analogi, Sinonim, Antonim | 55 |
| GMA Numerical | Numerik | 24 |
| Smart Ability to Learn | Penalaran Gambar (bergambar) | 17 |

## Cara pakai

Ada dua cara:

- **Lokal** — klik dua kali `index.html`, atau buka lewat browser. Gambar soal
  dimuat lewat path relatif, jadi folder `smart-ability-to-learn/` harus tetap
  bersebelahan dengan `index.html`.
- **Online** — kunjungi URL hasil deploy (Vercel/GitHub Pages). Karena file
  bernama `index.html`, halaman langsung terbuka dari root URL tanpa perlu
  menyebut nama file.

Di layar awal tersedia dua mode:

- **Mode Latihan** — semua 96 soal berurutan, tanpa batas waktu. Benar/salah
  beserta penjelasannya langsung muncul begitu jawaban dipilih. Bisa dijawab
  lewat keyboard dengan menekan tombol A–F.
- **Mode Ujian** — simulasi bertimer per bagian, soal diambil acak dan diacak
  ulang tiap kali mulai, tanpa umpan balik sampai waktu habis. Ada navigator
  soal untuk melompat antar nomor dan tombol "Selesaikan sekarang".
  Paketnya: GMA Verbal 17 soal / 4 menit, GMA Numerical 15 soal / 5 menit,
  Smart Ability to Learn 15 soal / 5 menit.

Setelah selesai, halaman hasil menampilkan skor dan review tiap soal.

## Struktur file

```
.
├── index.html                  # seluruh aplikasi: UI, logika, dan bank soal
├── smart-ability-to-learn/     # gambar soal penalaran gambar
│   ├── soal-1.png
│   ├── ...
│   └── soal-17.png
├── robots.txt                  # melarang semua crawler mengindeks situs
├── .gitignore
└── README.md
```

Nama folder dan file gambar sengaja **huruf kecil semua tanpa spasi**. Windows
tidak membedakan huruf besar-kecil, tetapi server Linux (tempat situs ini
di-deploy) membedakannya — salah satu huruf kapital saja membuat gambar 404
setelah deploy.

File dokumen sumber (`*.pdf`, `soal.txt`, `jawaban.txt`) sengaja tidak ikut ke
repo karena isinya sudah tertanam di `index.html`; lihat `.gitignore`.

## Menambah soal baru

Semua soal ada di array `bankSoalTPA` di dalam `index.html` (cari
`const bankSoalTPA = [`, sekitar baris 388). Tambahkan objek baru ke array
tersebut — jumlah soal di menu, navigator, dan hitungan skor menyesuaikan
sendiri.

Field yang dipakai:

| Field | Wajib | Keterangan |
| --- | --- | --- |
| `section` | ya | `"GMA Verbal"`, `"GMA Numerical"`, atau `"Smart Ability to Learn"`. Menentukan paket Mode Ujian, jadi tulis persis. |
| `category` | ya | Label yang tampil sebagai chip, mis. `"Analogi"`, `"Numerik"`. |
| `question` | ya | Teks pertanyaan. |
| `options` | ya | Array pilihan jawaban (2–6 item). |
| `answer` | ya | Indeks jawaban benar: `0` = a, `1` = b, dst. Pakai `null` bila kuncinya belum ada. |
| `explanation` | ya | Penjelasan yang muncul setelah dijawab. |
| `image` | opsional | Path gambar soal, relatif terhadap `index.html`. |

### Contoh soal teks

```js
{
  section: "GMA Verbal",
  category: "Analogi",
  question: "Buaya : Kadal",
  options: ["Kecil : Besar", "Zebra : Kuda", "Ayam : Kelinci", "Laki-Laki : Anak", "Roti : Rembulan"],
  answer: 1,
  explanation: "Buaya dan kadal adalah hewan sejenis (reptil) yang berbeda ukuran, sebagaimana zebra dan kuda sama-sama satu keluarga dengan bentuk mirip."
},
```

### Contoh soal bergambar

Taruh dulu file gambarnya di `smart-ability-to-learn/` dengan nama huruf kecil
semua, lalu tambahkan field `image`:

```js
{
  section: "Smart Ability to Learn",
  category: "Penalaran Gambar",
  image: "smart-ability-to-learn/soal-18.png",
  question: "Apa yang berikutnya?",
  options: ["A", "B", "C", "D", "E"],
  answer: 1,
  explanation: "Panah tebal berputar dengan irama tetap sementara garis tipis membalik arah tiap langkah, sehingga kelanjutannya adalah pilihan B."
},
```

Untuk soal bergambar, `options` biasanya cukup berisi huruf pilihan (`"A"`–`"E"`)
karena pilihan gambarnya sudah tercetak di dalam PNG.

**Ingat:** nilai `image` harus sama persis huruf besar-kecilnya dengan nama file
di disk, jika tidak gambarnya akan 404 di server Linux meski tampil normal saat
dibuka dari Windows.
