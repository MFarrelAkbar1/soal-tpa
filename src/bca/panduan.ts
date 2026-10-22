import type { DaftarButir } from "./types";

// Materi panduan dari PDF (bukan soal). Dipakai panel "Panduan" dan checklist penilaian diri.

export interface BagianPanduan {
  judul: string;
  sumber: string;
  daftar: DaftarButir[];
  kutipan?: string[];
}

export const PANDUAN: BagianPanduan[] = [
  {
    judul: "Kunci menjawab studi kasus",
    sumber: "Tes tulis.pdf, Tes Tulis Bca.pdf",
    daftar: [
      {
        judul: "Masalah → Penyebab → Risiko → Prioritas → Solusi → Alasan → Follow-up",
        butir: [
          "Masalah: Apa masalah utama yang terjadi?",
          "Penyebab: Apa penyebab dari masalah tersebut?",
          "Risiko: Apa risiko bagi nasabah dan perusahaan?",
          "Prioritas: Masalah mana yang harus diutamakan?",
          "Solusi: Apa solusi yang paling realistis dan sesuai kebijakan?",
          "Alasan: Mengapa solusi tersebut yang dipilih?",
          "Follow-up: Apa tindak lanjut setelah solusi diberikan?",
        ],
      },
      {
        judul: "Pola jawaban aman (rumus cepat)",
        butir: ["Analisis → Komunikasi → Solusi → Patuh SOP"],
      },
    ],
    kutipan: [
      "INGAT: Jawaban yang baik bukan hanya soal hasil, tetapi tentang proses berpikir, analisis risiko, komunikasi, pengambilan keputusan, dan kemampuan memberikan solusi yang realistis serta sesuai kebijakan perusahaan.",
      "Jangan hanya memberikan jawaban seperti \"Nasabah harus segera membayar tunggakan.\" Jawaban sebaiknya menunjukkan proses berpikir yang jelas.",
    ],
  },
  {
    judul: "Poin penilaian studi kasus PDP",
    sumber: "TES TERTULIS PDP BCA Finance berbentuk STUDI KASUS.pdf",
    daftar: [
      {
        judul: "Penilai mencari",
        butir: [
          "Analitis (berbasis data & logika)",
          "Leadership mindset",
          "Integritas & kepatuhan",
          "Komunikasi efektif",
          "Solusi realistis",
        ],
      },
      {
        judul: "Hindari jawaban",
        butir: ["Menyalahkan pihak lain", "Pasif / menunggu atasan", "Mengabaikan SOP", "Emosional"],
      },
    ],
  },
  {
    judul: "Kata kunci jawaban yang dicari HR",
    sumber: "LATIHAN TES TERTULIS PDP BCA Finance.pdf",
    daftar: [
      {
        judul: "Wajib muncul (implisit)",
        butir: [
          "Manajemen risiko",
          "Integritas",
          "Data-driven",
          "Komunikasi ke atasan",
          "Solusi alternatif",
          "Tidak melanggar SOP",
        ],
      },
      {
        judul: "Hindari",
        butir: [
          "\"Mengikuti arahan atasan tanpa pertimbangan\"",
          "\"Demi target, risiko bisa ditoleransi\"",
          "\"Menutup mata\"",
        ],
      },
    ],
  },
  {
    judul: "Strategi jawaban Account Solution & Recovery",
    sumber: "Contoh Soal Tes Tertulis PDP BCA Finance ASR.pdf, Tes tulis.pdf",
    daftar: [
      {
        judul: "Selalu tekankan",
        butir: [
          "Analisis risiko",
          "Pendekatan komunikasi yang persuasif dan profesional",
          "Solusi bertahap (win–win solution)",
          "Kepatuhan terhadap kebijakan perusahaan",
          "Perlindungan aset Perusahaan",
        ],
      },
      {
        judul: "Poin yang perlu ditonjolkan",
        butir: [
          "Analisis Risiko: Tunjukkan bahwa kamu mampu melihat kemungkinan risiko dan dampaknya terhadap perusahaan.",
          "Komunikasi: Gunakan komunikasi yang persuasif, tenang, profesional, sopan, dan tidak memojokkan nasabah.",
          "Solusi Bertahap: Jangan hanya memberikan satu solusi. Pertimbangkan beberapa alternatif berdasarkan kondisi nasabah.",
          "Kepatuhan: Solusi yang diberikan harus tetap mengikuti kebijakan dan prosedur perusahaan.",
          "Perlindungan Aset: Pertimbangkan langkah yang dapat dilakukan untuk meminimalkan potensi kerugian perusahaan.",
          "Profesionalisme: Tetap objektif dalam mengambil keputusan dan tidak terbawa emosi ketika menghadapi nasabah.",
        ],
      },
      {
        judul: "Poin yang dinilai",
        butir: [
          "Analisis Risiko",
          "Komunikasi Persuasif",
          "Solusi Bertahap",
          "Kepatuhan Kebijakan",
          "Perlindungan Aset",
          "Profesionalisme",
          "Problem Solving",
          "Pengambilan Keputusan",
          "Negosiasi",
          "Kerja Sama Tim",
        ],
      },
      {
        judul: "Tips menjawab",
        butir: [
          "Jangan hanya fokus pada penagihan.",
          "Tunjukkan proses berpikir logis.",
          "Pahami kondisi nasabah.",
          "Analisis risiko dengan objektif.",
          "Berikan solusi realistis & bertahap.",
          "Jelaskan alasan solusi dipilih.",
          "Tentukan tindak lanjut yang jelas.",
          "Gunakan komunikasi sopan, tenang, dan profesional.",
          "Selalu pertimbangkan kebijakan dan kepentingan perusahaan.",
        ],
      },
      {
        judul: "Prinsip komunikasi",
        butir: ["Dengarkan → Pahami → Tenangkan → Analisis → Tawarkan Solusi → Tentukan Tindak Lanjut"],
      },
    ],
  },
  {
    judul: "Kalimat pembuka yang aman saat presentasi",
    sumber: "Tes tulis.pdf, Tes Tulis Bca.pdf",
    daftar: [],
    kutipan: [
      "\"Baik, berdasarkan kasus yang diberikan, saya akan menganalisis permasalahan ini dari beberapa aspek, yaitu kondisi nasabah, risiko bagi perusahaan, prioritas penanganan, alternatif solusi, serta tindak lanjut yang perlu dilakukan.\"",
      "\"Pertama, saya akan mengidentifikasi masalah utama dan mencari tahu penyebabnya. Kedua, saya akan melakukan analisis risiko berdasarkan informasi yang tersedia. Ketiga, saya menentukan prioritas penanganan. Setelah itu saya akan menentukan solusi yang realistis, tentunya tetap sesuai dengan kebijakan dan prosedur perusahaan.\"",
    ],
  },
  {
    judul: "Template presentasi 5 slide",
    sumber: "Petunjuk Tes Tulis.pdf, PDF ASR, Tes tulis.pdf",
    daftar: [
      {
        judul: "Siapkan template polos tapi rapi",
        butir: [
          "Slide 1: Judul (nama peserta dan judul kasus)",
          "Slide 2: Analisis Masalah",
          "Slide 3: Solusi yang Diusulkan",
          "Slide 4: Alasan dan pertimbangan solusi",
          "Slide 5: Penutup / Kesimpulan",
        ],
      },
    ],
  },
  {
    judul: "Info tes & persiapan",
    sumber: "Petunjuk Tes Tulis.pdf, PDF ASR, Tes tulis.pdf",
    daftar: [
      {
        judul: "Pelaksanaan",
        butir: [
          "Durasi ±2,5 jam (contoh undangan: 14.00–16.30 WIB).",
          "Lewat Zoom: kamera wajib aktif, audio dimatikan; nama Zoom mengikuti format dari panitia.",
          "Open book: boleh membuka catatan atau sumber lain.",
          "Wajib laptop/komputer (bukan HP), Microsoft PowerPoint, dan internet stabil plus cadangan hotspot.",
          "Bentuk tes: Studi Kasus + Analisis + Presentasi (PowerPoint ±3–5 slide).",
          "Yang dinilai bukan hanya jawaban akhirnya, tetapi juga cara berpikir, kemampuan menganalisis masalah, komunikasi, pengambilan keputusan, dan kemampuan memberikan solusi yang realistis.",
        ],
      },
      {
        judul: "Topik yang berpotensi muncul",
        butir: [
          "Profil BCA Finance (produk, layanan, dan nilai perusahaan)",
          "Tugas dan peran divisi Account Solution & Recovery",
          "Pengetahuan dasar mengenai kredit macet, collection, dan strategi negosiasi",
          "Etika dalam menghadapi nasabah",
          "Cara bekerja dalam tim, logika berpikir, serta kemampuan memberikan solusi yang realistis",
        ],
      },
      {
        judul: "Pelajari BCA Finance",
        butir: [
          "Produk utama: Pembiayaan kendaraan (mobil baru dan bekas)",
          "Layanan: Kredit, simulasi cicilan, dan layanan digital",
          "Nilai perusahaan: Profesional, Cepat, Ramah, dan Terpercaya",
        ],
      },
      {
        judul: "Pahami posisi ASR (Account Solution & Recovery)",
        butir: [
          "Fokus pada penanganan kredit bermasalah",
          "Berinteraksi langsung dengan nasabah",
          "Menganalisis penyebab gagal bayar",
          "Menentukan solusi seperti penjadwalan ulang, negosiasi, atau tindakan lapangan",
        ],
      },
    ],
  },
];

// Checklist penilaian diri di halaman hasil. "positif" dicentang bila ada di jawaban,
// "hindari" dicentang bila jawaban BEBAS dari hal tersebut.
export interface ItemCek {
  id: string;
  teks: string;
}

export interface GrupCek {
  id: string;
  judul: string;
  jenis: "positif" | "hindari";
  item: ItemCek[];
}

const POIN_PDP: GrupCek = {
  id: "poin-pdp",
  judul: "Poin penilaian PDP: jawabanku sudah menunjukkan…",
  jenis: "positif",
  item: [
    { id: "analitis", teks: "Analitis (berbasis data & logika)" },
    { id: "leadership", teks: "Leadership mindset" },
    { id: "integritas-kepatuhan", teks: "Integritas & kepatuhan" },
    { id: "komunikasi-efektif", teks: "Komunikasi efektif" },
    { id: "solusi-realistis", teks: "Solusi realistis" },
  ],
};

const KATA_KUNCI: GrupCek = {
  id: "kata-kunci",
  judul: "Kata kunci HR: muncul (minimal implisit) di jawabanku",
  jenis: "positif",
  item: [
    { id: "manajemen-risiko", teks: "Manajemen risiko" },
    { id: "integritas", teks: "Integritas" },
    { id: "data-driven", teks: "Data-driven" },
    { id: "komunikasi-atasan", teks: "Komunikasi ke atasan" },
    { id: "solusi-alternatif", teks: "Solusi alternatif" },
    { id: "patuh-sop", teks: "Tidak melanggar SOP" },
  ],
};

const POIN_ASR: GrupCek = {
  id: "poin-asr",
  judul: "Strategi ASR: jawabanku sudah menekankan…",
  jenis: "positif",
  item: [
    { id: "analisis-risiko", teks: "Analisis risiko" },
    { id: "komunikasi-persuasif", teks: "Pendekatan komunikasi yang persuasif dan profesional" },
    { id: "solusi-bertahap", teks: "Solusi bertahap (win–win solution)" },
    { id: "kepatuhan-kebijakan", teks: "Kepatuhan terhadap kebijakan perusahaan" },
    { id: "perlindungan-aset", teks: "Perlindungan aset perusahaan" },
  ],
};

const POLA: GrupCek = {
  id: "pola",
  judul: "Alur jawaban lengkap",
  jenis: "positif",
  item: [
    { id: "masalah", teks: "Masalah" },
    { id: "penyebab", teks: "Penyebab" },
    { id: "risiko", teks: "Risiko" },
    { id: "prioritas", teks: "Prioritas" },
    { id: "solusi", teks: "Solusi" },
    { id: "alasan", teks: "Alasan" },
    { id: "follow-up", teks: "Follow-up" },
  ],
};

const HINDARI: GrupCek = {
  id: "hindari",
  judul: "Jawabanku BEBAS dari…",
  jenis: "hindari",
  item: [
    { id: "menyalahkan", teks: "Menyalahkan pihak lain" },
    { id: "pasif", teks: "Pasif / menunggu atasan" },
    { id: "abaikan-sop", teks: "Mengabaikan SOP" },
    { id: "emosional", teks: "Emosional" },
    { id: "ikut-atasan", teks: "\"Mengikuti arahan atasan tanpa pertimbangan\"" },
    { id: "toleransi-risiko", teks: "\"Demi target, risiko bisa ditoleransi\"" },
    { id: "tutup-mata", teks: "\"Menutup mata\"" },
  ],
};

export function grupChecklist(jenis: "pdp" | "asr"): GrupCek[] {
  return jenis === "asr"
    ? [POIN_ASR, POLA, KATA_KUNCI, HINDARI]
    : [POIN_PDP, KATA_KUNCI, POLA, HINDARI];
}
