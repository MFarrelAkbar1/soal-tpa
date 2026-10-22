import type { Kasus, SoalEsai } from "../types";

// Studi kasus Account Solution & Recovery (ASR).
// Teks kasus utama dari PDF ASR; versi "Tes tulis.pdf" dicatat di keterangan.
// Contoh jawaban dari "Tes tulis.pdf" (hlm. 1–3) dan "Tes Tulis Bca.pdf" (hlm. 2–3, khusus kasus 1).

const A = "Contoh Soal Tes Tertulis PDP BCA Finance ASR.pdf";
const T = "Tes tulis.pdf";
const B = "Tes Tulis Bca.pdf";
const P = "Petunjuk Tes Tulis.pdf";

export const kasusAsr: Kasus[] = [
  {
    id: "bca-asr-1",
    judul: "ASR 1 · Tunggakan 2 Bulan & Pendapatan Menurun",
    kelompok: "Account Solution & Recovery",
    passage: [
      "Seorang nasabah memiliki tunggakan cicilan selama 2 bulan. Nasabah masih dapat dihubungi, namun menyampaikan bahwa saat ini mengalami penurunan pendapatan dan meminta keringanan pembayaran. Riwayat pembayaran sebelumnya tergolong lancar.",
    ],
    tugas: [
      {
        judul: "Peserta diminta untuk",
        butir: [
          "Mengidentifikasi kondisi dan risiko kredit nasabah",
          "Menentukan pendekatan komunikasi yang tepat",
          "Mengusulkan solusi pembayaran yang realistis",
          "Menjaga kepatuhan terhadap kebijakan perusahaan",
        ],
      },
      {
        judul: "Yang perlu dianalisis (Tes tulis.pdf)",
        butir: [
          "Bagaimana kondisi dan risiko kredit nasabah?",
          "Bagaimana cara melakukan pendekatan kepada nasabah?",
          "Solusi pembayaran seperti apa yang realistis?",
          "Bagaimana memastikan solusi tetap sesuai dengan kebijakan perusahaan?",
        ],
      },
    ],
    keterangan: "Teks di Tes Tulis Bca.pdf sama dengan PDF ASR. Versi Tes tulis.pdf: \"Seorang nasabah mengalami tunggakan cicilan selama 2 bulan. Nasabah sulit dihubungi dan menyampaikan bahwa saat ini mengalami penurunan pendapatan karena kondisi usahanya. Sebelumnya, riwayat pembayaran nasabah tergolong lancar.\"",
    sumber: [A, T, B],
    ujian: true,
    checklist: "asr",
  },
  {
    id: "bca-asr-2",
    judul: "ASR 2 · Kendaraan Berpindah-pindah & Alamat Tidak Sesuai",
    kelompok: "Account Solution & Recovery",
    passage: [
      "Seorang nasabah menunggak cicilan selama 4 bulan. Kendaraan masih dikuasai oleh nasabah, namun lokasi sering berpindah dan alamat yang tercatat sudah tidak sesuai. Nasabah sesekali merespons, tetapi tidak kooperatif dalam memberikan informasi.",
    ],
    tugas: [
      {
        judul: "Peserta diminta untuk",
        butir: [
          "Menyusun prioritas penanganan",
          "Menentukan langkah penelusuran data dan validasi informasi",
          "Mengatur koordinasi internal (collection, recovery, legal jika diperlukan)",
          "Menjelaskan mitigasi risiko yang dilakukan",
        ],
      },
      {
        judul: "Yang perlu dianalisis (Tes tulis.pdf)",
        butir: [
          "Apa yang menjadi prioritas penanganan?",
          "Bagaimana cara melakukan penelusuran kendaraan?",
          "Bagaimana melakukan validasi informasi?",
          "Siapa saja yang perlu dikoordinasikan?",
          "Apakah diperlukan tindakan recovery atau legal?",
          "Bagaimana cara meminimalkan risiko kerugian perusahaan?",
        ],
      },
      {
        judul: "Fokus jawaban (Tes tulis.pdf)",
        butir: ["Prioritas → Penelusuran → Validasi → Koordinasi → Recovery → Mitigasi Risiko"],
      },
    ],
    keterangan: "Di Tes tulis.pdf berjudul \"Risiko Kerugian Kendaraan\" dengan teks: \"Seorang nasabah mengalami kecelakaan selama beberapa bulan. Kendaraan masih dikuasai oleh nasabah, tetapi lokasinya sering berpindah dan alamat yang tercatat sudah tidak sesuai. Nasabah juga mengalami masalah ekonomi.\"",
    sumber: [A, T],
    ujian: true,
    checklist: "asr",
  },
  {
    id: "bca-asr-3",
    judul: "ASR 3 · Tunggakan 3 Bulan & Janji Pembayaran Tidak Dipenuhi",
    kelompok: "Account Solution & Recovery",
    passage: [
      "Nasabah memiliki tunggakan 3 bulan dan mengajukan janji pembayaran, namun dua kali tidak ditepati. Alasan yang disampaikan selalu berubah dan tidak didukung bukti yang jelas.",
    ],
    tugas: [
      {
        judul: "Peserta diminta untuk",
        butir: [
          "Menganalisis perilaku dan komitmen nasabah",
          "Menentukan batas toleransi dan eskalasi penanganan",
          "Menjelaskan keputusan yang diambil secara profesional dan objektif",
        ],
      },
      {
        judul: "Yang perlu dianalisis (Tes tulis.pdf)",
        butir: [
          "Bagaimana menilai kredibilitas nasabah?",
          "Bagaimana menganalisis perilaku pembayaran?",
          "Apakah janji pembayaran masih dapat dipercaya?",
          "Apa tindakan selanjutnya?",
          "Bagaimana tetap menjaga hubungan profesional dengan nasabah?",
        ],
      },
      {
        judul: "Hal yang perlu diperhatikan (Tes tulis.pdf)",
        butir: [
          "Jangan langsung berfokus pada penagihan. Tunjukkan bahwa kamu mampu memahami kondisi nasabah, menganalisis risiko, menentukan langkah yang tepat, membuat keputusan berdasarkan informasi, dan tetap menjaga kepentingan perusahaan.",
        ],
      },
    ],
    keterangan: "Di Tes tulis.pdf berjudul \"Tunggakan Pembayaran\" dengan teks: \"Nasabah memiliki tunggakan selama 3 bulan. Nasabah sebelumnya telah memberikan janji pembayaran, tetapi janji tersebut belum dipenuhi. Nasabah memberikan alasan bahwa kondisi keuangannya sedang mengalami masalah.\"",
    sumber: [A, T],
    ujian: true,
    checklist: "asr",
  },
  {
    id: "bca-asr-4",
    judul: "ASR 4 · Nasabah Emosional",
    kelompok: "Account Solution & Recovery",
    passage: [
      "Nasabah mengalami tunggakan 1 bulan, namun saat dilakukan pengingat pembayaran, nasabah menunjukkan sikap emosional dan menyampaikan keluhan terhadap pelayanan sebelumnya.",
    ],
    tugas: [
      {
        judul: "Peserta diminta untuk",
        butir: [
          "Menjelaskan teknik komunikasi yang digunakan",
          "Menjaga profesionalisme dan citra perusahaan",
          "Menyusun solusi yang saling menguntungkan",
        ],
      },
      {
        judul: "Peserta perlu menjelaskan (Tes tulis.pdf)",
        butir: [
          "Teknik komunikasi yang akan digunakan.",
          "Bagaimana menghadapi nasabah yang emosional.",
          "Bagaimana menjaga profesionalisme.",
          "Bagaimana menjaga citra perusahaan.",
          "Solusi apa yang dapat ditawarkan.",
          "Bagaimana membuat penyelesaian yang realistis dan saling menguntungkan.",
        ],
      },
      {
        judul: "Prinsip komunikasi (Tes tulis.pdf)",
        butir: ["Dengarkan → Pahami → Tenangkan → Analisis → Tawarkan Solusi → Tentukan Tindak Lanjut"],
      },
    ],
    keterangan: "Di Tes tulis.pdf berjudul \"Penyelesaian Tunggakan\" dengan teks: \"Nasabah mengalami tunggakan selama 1 bulan. Saat dilakukan pengingat pembayaran, nasabah menunjukkan sikap emosional dan menyampaikan bahwa dirinya belum mampu melakukan pembayaran.\"",
    sumber: [A, T],
    ujian: true,
    checklist: "asr",
  },
  {
    id: "bca-asr-petunjuk",
    judul: "ASR · Tunggakan 3 Bulan & Tidak Bisa Dihubungi",
    kelompok: "Account Solution & Recovery",
    passage: [
      "Seorang nasabah menunggak pembayaran 3 bulan berturut-turut dan tidak bisa dihubungi.",
    ],
    tugas: [
      {
        judul: "Kamu mungkin diminta",
        butir: [
          "Menganalisis masalahnya",
          "Menuliskan langkah-langkah solusinya",
          "Membuat slide PowerPoint singkat (3–5 slide) yang menjelaskan solusi kamu",
        ],
      },
    ],
    keterangan: "Contoh kasus singkat di Petunjuk Tes Tulis.pdf (bagian \"Kemungkinan Isi Tes Tertulis\"). PDF tidak memuat contoh jawaban.",
    sumber: [P],
    ujian: true,
    checklist: "asr",
  },
  {
    id: "bca-asr-lanjutan",
    judul: "Pertanyaan Tambahan yang Sering Ditanyakan",
    kelompok: "Pertanyaan Lanjutan ASR",
    passage: [
      "Pertanyaan tambahan yang sering ditanyakan setelah peserta memaparkan jawaban studi kasus Account Solution & Recovery.",
    ],
    sumber: [T, B],
    ujian: false,
    checklist: "asr",
  },
];

export const soalAsr: SoalEsai[] = [
  {
    id: "bca-asr-001",
    type: "essay",
    section: "BCA Finance",
    category: "Account Solution & Recovery",
    caseId: "bca-asr-1",
    question: "Sebagai bagian dari tim Account Solution & Recovery, langkah apa yang akan kamu lakukan untuk menangani kasus ini?",
    answer: [
      {
        label: "Singkat",
        sumber: T + " hlm. 1–2",
        paragraf: [],
        poin: [
          {
            judul: "Analisis jawaban",
            butir: [
              "Identifikasi Masalah: Tunggakan 2 bulan, sulit dihubungi, pendapatan menurun.",
              "Analisis Risiko: Risiko kredit meningkat, potensi wanprestasi, kendaraan berisiko.",
              "Prioritas: Hubungi nasabah, pahami kondisi keuangan, evaluasi kemampuan bayar.",
              "Solusi: Komunikasi persuasif, buat rencana pembayaran sesuai kemampuan, tawarkan restrukturisasi jika perlu.",
              "Alasan: Solusi realistis, jaga hubungan, kurangi risiko, sesuai kebijakan.",
              "Tindak Lanjut: Monitoring pembayaran, follow up rutin, evaluasi jika kondisi berubah.",
            ],
          },
          {
            judul: "Poin jawaban",
            butir: [
              "Identifikasi penyebab terjadinya tunggakan.",
              "Lakukan komunikasi secara profesional dan persuasif.",
              "Pahami kemampuan pembayaran nasabah.",
              "Cari alternatif penyelesaian yang realistis.",
              "Tetap mempertimbangkan kepentingan dan kebijakan perusahaan.",
            ],
          },
        ],
      },
      {
        label: "Lengkap",
        sumber: T + " hlm. 3 (sama dengan " + B + " hlm. 3)",
        paragraf: [
          "Menurut saya, masalah utama dalam kasus ini adalah adanya tunggakan selama dua bulan yang disebabkan oleh penurunan pendapatan nasabah. Namun, karena sebelumnya riwayat pembayaran nasabah tergolong lancar, saya tidak akan langsung menganggap nasabah tidak kooperatif. Saya akan terlebih dahulu menggali penyebab dan kondisi keuangan nasabah saat ini.",
          "Risikonya adalah semakin meningkatnya tunggakan dan kemungkinan terjadinya gagal bayar. Oleh karena itu, prioritas saya adalah melakukan komunikasi dengan nasabah, memastikan keberadaan dan kondisi kendaraan, kemudian mengetahui kemampuan pembayaran nasabah secara aktual.",
          "Setelah mendapatkan informasi yang cukup, saya akan menawarkan solusi pembayaran yang realistis dan sesuai dengan kebijakan perusahaan. Jika memang terdapat program atau alternatif penyelesaian yang diperbolehkan perusahaan, saya akan mengarahkan nasabah pada opsi tersebut.",
          "Setelah ada kesepakatan, saya akan melakukan monitoring dan follow-up terhadap komitmen pembayaran nasabah. Jadi, pendekatan saya bukan hanya melakukan penagihan, tetapi juga mencari solusi yang tetap melindungi kepentingan perusahaan.",
        ],
      },
      {
        label: "Analisis per poin",
        sumber: B + " hlm. 2",
        paragraf: [
          "Kesimpulan tindakan: Fokus utama adalah membantu nasabah yang masih memiliki itikad baik agar dapat kembali membayar sesuai kemampuannya, sekaligus meminimalkan risiko kerugian perusahaan dan menjaga kualitas portofolio kredit.",
          "Tips: Utamakan komunikasi yang baik, solusi yang realistis, dan selalu patuhi kebijakan perusahaan. Tujuannya adalah solusi win-win: nasabah terbantu, perusahaan terlindungi.",
        ],
        poin: [
          {
            judul: "1. Identifikasi kondisi dan risiko kredit nasabah",
            butir: [
              "Kondisi Nasabah: Tunggakan 2 bulan, masih dapat dihubungi, mengalami penurunan pendapatan, meminta keringanan, riwayat pembayaran sebelumnya lancar.",
              "Risiko Kredit: Risiko meningkat jika penurunan pendapatan berlanjut dan tidak ada pembayaran. Potensi tunggakan bertambah, denda, dan akhirnya risiko gagal bayar.",
              "Kesimpulan: Nasabah masih kooperatif dan memiliki itikad baik (masih komunikatif dan meminta solusi). Perlu pendekatan persuasif dan solusi yang realistis agar dapat kembali lancar.",
            ],
          },
          {
            judul: "2. Pendekatan komunikasi yang tepat",
            butir: [
              "Lakukan komunikasi secara empatik, profesional, dan persuasif.",
              "Dengarkan dan pahami kondisi serta penyebab penurunan pendapatan secara detail.",
              "Tanyakan kemampuan pembayaran saat ini secara terbuka.",
              "Jelaskan konsekuensi jika tunggakan tidak segera ditangani.",
              "Bangun kepercayaan dengan menunjukkan bahwa perusahaan ingin membantu, bukan hanya menagih.",
            ],
          },
          {
            judul: "3. Usulan solusi pembayaran yang realistis",
            butir: [
              "Analisis kemampuan bayar nasabah berdasarkan informasi yang diberikan.",
              "Tawarkan beberapa alternatif solusi sesuai kebijakan perusahaan, misalnya: penjadwalan ulang pembayaran (reschedule) sesuai kemampuan; perpanjangan tenor untuk meringankan cicilan bulanan; pembayaran sebagian (partial payment) sebagai komitmen awal; program keringanan atau restrukturisasi jika memenuhi ketentuan.",
              "Pastikan solusi yang dipilih sesuai kemampuan nyata nasabah agar tidak menimbulkan gagal bayar kembali.",
            ],
          },
          {
            judul: "4. Menjaga kepatuhan terhadap kebijakan perusahaan",
            butir: [
              "Pastikan setiap solusi mengikuti ketentuan dan kebijakan BCA Finance.",
              "Verifikasi data dan dokumen pendukung jika diperlukan (bukti penurunan pendapatan).",
              "Ajukan persetujuan sesuai prosedur apabila solusi memerlukan approval.",
              "Dokumentasikan seluruh komunikasi dan kesepakatan.",
              "Lakukan monitoring pembayaran dan follow up sesuai jadwal.",
            ],
          },
          {
            judul: "Alur langkah",
            butir: ["Komunikasi & Gali Informasi → Analisis Kemampuan → Tawarkan Solusi → Kesepakatan & Dokumentasi → Monitoring & Follow Up"],
          },
        ],
      },
      {
        label: "Jawaban per poin",
        sumber: B + " hlm. 3",
        paragraf: [],
        poin: [
          {
            judul: "1. Identifikasi kondisi dan risiko kredit nasabah",
            butir: [
              "\"Menurut saya, masalah utama dalam kasus ini adalah adanya tunggakan selama dua bulan yang disebabkan oleh penurunan pendapatan nasabah. Namun, karena sebelumnya riwayat pembayaran nasabah tergolong lancar, saya tidak akan langsung menganggap nasabah tidak kooperatif. Saya akan terlebih dahulu menggali penyebab dan kondisi keuangan nasabah saat ini.\"",
              "\"Risikonya adalah semakin meningkatnya tunggakan dan kemungkinan terjadinya gagal bayar. Oleh karena itu, prioritas saya adalah melakukan komunikasi dengan nasabah, memastikan keberadaan dan kondisi kendaraan, kemudian mengetahui kemampuan pembayaran nasabah secara aktual.\"",
            ],
          },
          {
            judul: "2. Pendekatan komunikasi yang tepat",
            butir: [
              "\"Saya akan melakukan komunikasi secara profesional, empatik, dan persuasif. Tujuannya adalah untuk membangun kepercayaan agar nasabah terbuka menyampaikan kondisi sebenarnya.\"",
              "\"Saya akan mendengarkan terlebih dahulu penjelasan nasabah, menggali penyebab penurunan pendapatan, serta memahami kondisi keuangannya secara detail.\"",
              "\"Saya akan menjelaskan konsekuensi jika tunggakan tidak segera ditangani, namun tetap dengan pendekatan yang sopan dan tidak memojokkan nasabah.\"",
              "\"Dengan komunikasi yang baik, saya harap nasabah merasa dibantu, bukan hanya ditagih.\"",
            ],
          },
          {
            judul: "3. Usulan solusi pembayaran yang realistis",
            butir: [
              "\"Setelah mendapatkan informasi yang cukup, saya akan menawarkan solusi pembayaran yang realistis dan sesuai dengan kebijakan perusahaan.\"",
              "\"Jika memang terdapat program atau alternatif penyelesaian yang diperbolehkan perusahaan, saya akan mengarahkan nasabah pada opsi tersebut.\"",
              "\"Contoh solusi yang dapat ditawarkan antara lain penjadwalan ulang pembayaran (reschedule), perpanjangan tenor, pembayaran sebagian (partial payment), atau program keringanan/restrukturisasi yang sesuai dengan ketentuan.\"",
              "\"Saya akan membantu nasabah memilih solusi terbaik sesuai dengan kemampuan dan kondisi keuangannya.\"",
            ],
          },
          {
            judul: "4. Kepatuhan terhadap kebijakan perusahaan",
            butir: [
              "\"Setelah ada kesepakatan, saya akan memastikan solusi yang diberikan tetap mengikuti ketentuan dan kebijakan BCA Finance.\"",
              "\"Semua keputusan dan tindakan akan didokumentasikan dengan baik sebagai bentuk kepatuhan terhadap prosedur perusahaan.\"",
              "\"Saya akan melakukan monitoring dan follow-up terhadap komitmen pembayaran nasabah sesuai jadwal yang disepakati.\"",
              "\"Jadi, pendekatan saya bukan hanya melakukan penagihan, tetapi juga mencari solusi yang tetap melindungi kepentingan perusahaan dan membantu nasabah menyelesaikan kewajibannya.\"",
            ],
          },
          {
            judul: "Alur penanganan (ringkasan langkah)",
            butir: [
              "Identifikasi Masalah: Pahami tunggakan, penyebab, dan kondisi nasabah.",
              "Analisis Risiko: Nilai potensi gagal bayar dan dampaknya bagi perusahaan.",
              "Tentukan Prioritas: Prioritaskan komunikasi, verifikasi, dan penilaian kemampuan bayar.",
              "Tentukan Solusi: Berikan alternatif solusi yang realistis dan sesuai kebijakan.",
              "Jelaskan Alasan: Sampaikan alasan solusi dipilih dan manfaatnya bagi nasabah & perusahaan.",
              "Tindak Lanjut: Monitoring, follow-up, dan evaluasi sesuai komitmen.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "bca-asr-002",
    type: "essay",
    section: "BCA Finance",
    category: "Account Solution & Recovery",
    caseId: "bca-asr-2",
    question: "Apa strategi penanganan yang akan kamu lakukan agar risiko kerugian perusahaan dapat diminimalkan?",
    answer: [
      {
        label: "Singkat",
        sumber: T + " hlm. 2",
        paragraf: [],
        poin: [
          {
            judul: "Analisis jawaban",
            butir: [
              "Identifikasi Masalah: Kendaraan berpindah-pindah, alamat tidak sesuai, nasabah bermasalah ekonomi.",
              "Analisis Risiko: Risiko kehilangan aset, nilai kendaraan turun, potensi fraud.",
              "Prioritas: Lakukan penelusuran kendaraan, validasi informasi, koordinasi pihak terkait.",
              "Solusi: Penelusuran lokasi, validasi data, koordinasi dengan pihak terkait, siapkan tindakan recovery jika perlu.",
              "Alasan: Melindungi aset perusahaan, meminimalkan kerugian, sesuai prosedur hukum.",
              "Tindak Lanjut: Recovery jika perlu, laporan berkala, monitoring risiko.",
            ],
          },
        ],
      },
      {
        label: "Lengkap",
        sumber: T + " hlm. 3",
        paragraf: [
          "Dalam kasus ini, menurut saya prioritas pertama adalah meminimalkan risiko kehilangan aset perusahaan. Karena kendaraan berpindah-pindah dan alamat nasabah sudah tidak sesuai, saya akan melakukan penelusuran dan validasi informasi terlebih dahulu.",
          "Saya akan memastikan kembali data nasabah, alamat, nomor kontak, serta informasi terkait keberadaan kendaraan. Informasi tersebut kemudian saya validasi melalui sumber dan pihak yang diperbolehkan sesuai prosedur perusahaan.",
          "Selanjutnya, saya akan berkoordinasi dengan pihak terkait untuk menentukan langkah yang tepat. Apabila kondisi menunjukkan risiko yang semakin tinggi dan penyelesaian secara persuasif tidak berhasil, maka saya akan mempertimbangkan tindakan recovery atau langkah lain sesuai SOP dan ketentuan perusahaan.",
          "Tujuan akhirnya adalah memastikan aset dapat terlindungi dan potensi kerugian perusahaan dapat diminimalkan, tanpa mengabaikan prosedur dan aspek legal.",
        ],
      },
    ],
  },
  {
    id: "bca-asr-003",
    type: "essay",
    section: "BCA Finance",
    category: "Account Solution & Recovery",
    caseId: "bca-asr-3",
    question: "Bagaimana cara kamu menilai kredibilitas nasabah dan menentukan keputusan lanjutan?",
    answer: [
      {
        label: "Singkat",
        sumber: T + " hlm. 2",
        paragraf: [],
        poin: [
          {
            judul: "Analisis jawaban",
            butir: [
              "Identifikasi Masalah: Tunggakan 3 bulan, janji tidak dipenuhi, alasan masalah keuangan.",
              "Analisis Risiko: Kredibilitas rendah, risiko gagal bayar tinggi, potensi kerugian.",
              "Prioritas: Nilai kredibilitas nasabah, analisis perilaku pembayaran, tentukan langkah tepat.",
              "Solusi: Komunikasi terbuka, evaluasi kemampuan, buat rencana pembayaran bertahap, tindakan tegas jika perlu.",
              "Alasan: Menjaga hubungan, namun lindungi kepentingan perusahaan.",
              "Tindak Lanjut: Monitoring ketat, evaluasi janji, tindakan lanjutan jika wanprestasi.",
            ],
          },
        ],
      },
      {
        label: "Lengkap",
        sumber: T + " hlm. 3",
        paragraf: [
          "Dengan tunggakan selama tiga bulan dan adanya janji pembayaran yang belum dipenuhi, saya akan menilai kembali kredibilitas dan kemampuan bayar nasabah. Saya tidak hanya melihat alasan yang disampaikan, tetapi juga melihat pola pembayaran dan konsistensi nasabah dalam memenuhi komitmennya.",
          "Risikonya adalah tingkat kemungkinan gagal bayar menjadi semakin tinggi. Oleh karena itu, saya akan melakukan komunikasi untuk mengetahui apakah masalah keuangan nasabah bersifat sementara atau sudah menjadi masalah yang lebih permanen.",
          "Apabila nasabah masih memiliki kemampuan membayar, saya akan mencoba membuat komitmen pembayaran yang lebih realistis dan terukur. Namun apabila kembali tidak memenuhi komitmen, saya akan melakukan eskalasi sesuai prosedur perusahaan.",
          "Menurut saya, menjaga hubungan dengan nasabah tetap penting, tetapi keputusan tetap harus berdasarkan data, tingkat risiko, dan kebijakan perusahaan.",
        ],
      },
    ],
  },
  {
    id: "bca-asr-004",
    type: "essay",
    section: "BCA Finance",
    category: "Account Solution & Recovery",
    caseId: "bca-asr-4",
    question: "Bagaimana pendekatan yang akan kamu lakukan agar masalah pembayaran dapat diselesaikan tanpa memperburuk hubungan dengan nasabah?",
    answer: [
      {
        label: "Singkat",
        sumber: T + " hlm. 2",
        paragraf: [],
        poin: [
          {
            judul: "Analisis jawaban",
            butir: [
              "Identifikasi Masalah: Tunggakan 1 bulan, nasabah emosional, belum mampu bayar.",
              "Analisis Risiko: Risiko keterlambatan, hubungan memburuk, potensi gagal bayar.",
              "Prioritas: Dengarkan nasabah, tenangkan emosi, pahami kondisi, tawarkan solusi.",
              "Solusi: Komunikasi empati, buat rencana pembayaran, tawarkan alternatif sesuai kemampuan.",
              "Alasan: Meredakan emosi, jaga profesionalisme, solusi win-win.",
              "Tindak Lanjut: Konfirmasi kesepakatan, monitoring, follow up rutin.",
            ],
          },
        ],
      },
      {
        label: "Lengkap",
        sumber: T + " hlm. 3",
        paragraf: [
          "Jika nasabah menunjukkan sikap emosional, saya akan menjaga komunikasi tetap tenang dan tidak membalas dengan emosi. Saya akan memberikan kesempatan kepada nasabah untuk menyampaikan masalahnya terlebih dahulu agar saya dapat memahami kondisi yang sebenarnya.",
          "Setelah kondisi lebih tenang, saya akan menggali penyebab nasabah belum mampu melakukan pembayaran dan melihat kemampuan finansialnya. Dari informasi tersebut, saya akan mencari alternatif penyelesaian yang realistis dan sesuai dengan kebijakan perusahaan.",
          "Saya akan menghindari memberikan janji atau solusi di luar kewenangan saya. Jika terdapat alternatif penyelesaian yang dapat diberikan, saya akan menjelaskannya secara transparan kepada nasabah.",
          "Setelah tercapai kesepakatan, saya akan memastikan nasabah memahami komitmennya dan melakukan follow-up sesuai jadwal. Dengan begitu, hubungan dengan nasabah tetap profesional, citra perusahaan terjaga, dan kepentingan perusahaan tetap terlindungi.",
        ],
      },
    ],
  },
  {
    id: "bca-asr-005",
    type: "essay",
    section: "BCA Finance",
    category: "Account Solution & Recovery",
    caseId: "bca-asr-petunjuk",
    question: "Apa langkah penangananmu sebagai bagian dari tim Account Solution & Recovery?",
    answer: null,
  },
  {
    id: "bca-lanjutan-001",
    type: "essay",
    section: "BCA Finance",
    category: "Pertanyaan Lanjutan ASR",
    caseId: "bca-asr-lanjutan",
    question: "Kenapa memilih solusi tersebut?",
    answer: [
      {
        label: "Contoh jawaban",
        sumber: T + " hlm. 3 dan " + B + " hlm. 3",
        paragraf: [
          "Saya memilih solusi tersebut karena menurut saya merupakan pilihan yang paling realistis berdasarkan kondisi nasabah saat ini, tetapi tetap mempertimbangkan risiko dan kepentingan perusahaan. Saya juga tidak ingin mengambil keputusan hanya berdasarkan asumsi, sehingga informasi dari nasabah perlu divalidasi terlebih dahulu.",
        ],
      },
    ],
  },
  {
    id: "bca-lanjutan-002",
    type: "essay",
    section: "BCA Finance",
    category: "Pertanyaan Lanjutan ASR",
    caseId: "bca-asr-lanjutan",
    question: "Bagaimana kalau nasabah tetap tidak membayar?",
    answer: [
      {
        label: "Contoh jawaban",
        sumber: T + " hlm. 3 dan " + B + " hlm. 3",
        paragraf: [
          "Jika setelah dilakukan komunikasi dan diberikan alternatif penyelesaian nasabah tetap tidak memenuhi komitmennya, saya akan melakukan evaluasi kembali dan melakukan eskalasi sesuai SOP perusahaan. Jadi, pendekatan persuasif tetap dilakukan, tetapi apabila risiko meningkat, tindakan penanganan juga harus disesuaikan.",
        ],
      },
    ],
  },
  {
    id: "bca-lanjutan-003",
    type: "essay",
    section: "BCA Finance",
    category: "Pertanyaan Lanjutan ASR",
    caseId: "bca-asr-lanjutan",
    question: "Apa yang paling penting dalam posisi Account Solution & Recovery?",
    answer: [
      {
        label: "Contoh jawaban",
        sumber: T + " hlm. 3 dan " + B + " hlm. 3",
        paragraf: [
          "Menurut saya, yang paling penting adalah kemampuan menyeimbangkan kepentingan nasabah dan perusahaan. Kita perlu memahami kondisi nasabah dan mencari solusi, tetapi di sisi lain tetap harus menjaga aset, meminimalkan risiko kerugian, mengikuti kebijakan perusahaan, dan memastikan setiap tindakan dapat dipertanggungjawabkan.",
        ],
      },
    ],
  },
];
