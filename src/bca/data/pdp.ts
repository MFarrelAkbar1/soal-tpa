import type { Kasus, SoalEsai } from "../types";

// Studi kasus PDP umum (6) dan studi kasus sulit (5).
// Teks kasus utama diambil dari PDF "STUDI KASUS" bila ada; versi singkat di PDF "LATIHAN"
// dicatat di keterangan. Contoh jawaban disalin apa adanya dari kedua PDF.

const S = "TES TERTULIS PDP BCA Finance berbentuk STUDI KASUS.pdf";
const L = "LATIHAN TES TERTULIS PDP BCA Finance.pdf";

const TANPA_PERTANYAAN = "Tuliskan langkah dan sikap Anda dalam menghadapi kasus ini (format jawaban ±5–7 baris).";

export const kasusPdp: Kasus[] = [
  {
    id: "bca-pdp-target",
    judul: "Target Tidak Tercapai",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Anda adalah peserta PDP BCA Finance yang ditempatkan di cabang baru. Pada bulan pertama, target pembiayaan kendaraan tidak tercapai. Tim marketing merasa strategi sudah maksimal, sementara tim kredit menilai banyak pengajuan tidak layak.",
    ],
    keterangan: "Versi di PDF LATIHAN: \"Pada bulan berjalan, target pembiayaan cabang tidak tercapai. Tim marketing dan tim kredit saling menyalahkan terkait banyaknya pengajuan yang ditolak.\"",
    sumber: [S, L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-pdp-kesalahan-rekan",
    judul: "Kesalahan Rekan Kerja",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Seorang rekan kerja melakukan kesalahan input data nasabah yang berpotensi menunda pencairan kredit. Rekan tersebut meminta Anda tidak melaporkan kesalahan agar tidak mendapat teguran atasan.",
    ],
    keterangan: "Versi di PDF LATIHAN: \"Rekan kerja melakukan kesalahan input data yang dapat menghambat pencairan kredit dan meminta Anda untuk tidak melaporkannya.\"",
    sumber: [S, L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-pdp-komplain",
    judul: "Komplain Nasabah",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Nasabah komplain karena proses pembiayaan dianggap terlalu lama, padahal keterlambatan terjadi karena dokumen nasabah belum lengkap.",
    ],
    keterangan: "Versi di PDF LATIHAN: \"Nasabah mengeluh karena proses pembiayaan lama, padahal keterlambatan disebabkan dokumen yang belum lengkap.\"",
    sumber: [S, L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-pdp-memimpin",
    judul: "Memimpin Tim Senior",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Anda diberi tanggung jawab memimpin tim kecil meskipun Anda adalah peserta PDP dan usia kerja paling baru. Beberapa anggota tim kurang kooperatif.",
    ],
    keterangan: "Versi di PDF LATIHAN: \"Anda ditunjuk memimpin tim kecil meskipun Anda masih peserta PDP dan anggota tim lebih senior.\"",
    sumber: [S, L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-pdp-tekanan-target",
    judul: "Tekanan Target",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Target cabang tinggi, sementara kondisi pasar sedang lesu. Atasan meminta ide cepat untuk meningkatkan pencairan pembiayaan.",
    ],
    keterangan: "Versi di PDF LATIHAN: \"Target cabang tinggi, sementara kondisi pasar sedang lesu.\"",
    sumber: [S, L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-pdp-deadline",
    judul: "Deadline & Data Belum Lengkap",
    kelompok: "Studi Kasus PDP",
    passage: [
      "Anda diminta menyelesaikan laporan penting, namun data belum lengkap dan waktu terbatas.",
    ],
    keterangan: "Hanya ada di PDF LATIHAN, tanpa kalimat pertanyaan.",
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-sulit-target-risiko",
    judul: "Konflik Target vs Risiko",
    kelompok: "Studi Kasus Sulit",
    passage: [
      "Menjelang akhir bulan, target cabang belum tercapai. Atasan memberi sinyal agar Anda lebih fleksibel dalam menyetujui pengajuan pembiayaan yang sebenarnya berada di batas minimum kelayakan.",
    ],
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-sulit-fraud",
    judul: "Indikasi Fraud Ringan",
    kelompok: "Studi Kasus Sulit",
    passage: [
      "Anda menemukan pola pengajuan dari satu dealer yang selalu lolos secara administratif, tetapi memiliki tingkat keterlambatan pembayaran lebih tinggi dari dealer lain.",
    ],
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-sulit-etika",
    judul: "Tekanan Etika",
    kelompok: "Studi Kasus Sulit",
    passage: [
      "Seorang nasabah penting menawarkan \"imbalan\" agar proses pembiayaannya dipercepat dan diprioritaskan.",
    ],
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-sulit-minim-info",
    judul: "Keputusan Minim Informasi",
    kelompok: "Studi Kasus Sulit",
    passage: [
      "Anda diminta memberikan rekomendasi cepat terkait pembiayaan korporat, namun data pendukung belum sepenuhnya lengkap.",
    ],
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-sulit-tim",
    judul: "Tim Tidak Sejalan",
    kelompok: "Studi Kasus Sulit",
    passage: [
      "Tim Anda terpecah antara fokus mengejar target jangka pendek dan menjaga kualitas pembiayaan jangka panjang.",
    ],
    sumber: [L],
    ujian: true,
    checklist: "pdp",
  },
];

export const soalPdp: SoalEsai[] = [
  {
    id: "bca-pdp-001",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-target",
    question: "Apa langkah paling tepat yang Anda lakukan sebagai peserta PDP?",
    answer: [
      {
        label: "Singkat",
        sumber: S,
        paragraf: [
          "Saya akan melakukan analisis data pengajuan yang ditolak dan yang disetujui untuk menemukan pola permasalahan. Selanjutnya, saya memfasilitasi diskusi antara tim marketing dan tim kredit untuk menyamakan persepsi kriteria pembiayaan serta menyusun strategi perbaikan bersama.",
        ],
      },
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Sebagai peserta PDP, saya akan mengumpulkan dan menganalisis data pengajuan yang ditolak dan disetujui untuk melihat pola permasalahan. Setelah itu, saya memfasilitasi diskusi antara tim marketing dan kredit agar terdapat kesamaan pemahaman terkait kriteria pembiayaan. Dengan pendekatan kolaboratif, diharapkan strategi pemasaran dapat disesuaikan tanpa mengabaikan prinsip manajemen risiko perusahaan.",
        ],
      },
    ],
  },
  {
    id: "bca-pdp-002",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-kesalahan-rekan",
    question: "Apa yang Anda lakukan?",
    answer: [
      {
        label: "Singkat",
        sumber: S,
        paragraf: [
          "Saya akan mengajak rekan tersebut memperbaiki data secepatnya dan melaporkan kesalahan kepada atasan secara profesional. Hal ini penting untuk menjaga integritas data dan kepercayaan nasabah.",
        ],
      },
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan mengajak rekan kerja tersebut untuk segera memperbaiki kesalahan yang terjadi dan tetap melaporkannya kepada atasan secara profesional. Hal ini penting untuk menjaga integritas data dan kepercayaan nasabah. Saya juga akan membantu rekan tersebut agar kesalahan tidak terulang kembali di kemudian hari.",
        ],
      },
    ],
  },
  {
    id: "bca-pdp-003",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-komplain",
    question: "Bagaimana sikap Anda?",
    answer: [
      {
        label: "Singkat",
        sumber: S,
        paragraf: [
          "Saya akan menjelaskan prosedur dengan sopan dan transparan, sekaligus membantu nasabah melengkapi dokumen yang diperlukan agar proses dapat segera dilanjutkan.",
        ],
      },
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan menjelaskan prosedur pembiayaan secara jelas dan sopan kepada nasabah, termasuk pentingnya kelengkapan dokumen. Selain itu, saya akan membantu nasabah untuk segera melengkapi dokumen yang dibutuhkan agar proses dapat berjalan lebih cepat dan tetap sesuai dengan SOP perusahaan.",
        ],
      },
    ],
  },
  {
    id: "bca-pdp-004",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-memimpin",
    question: "Apa pendekatan yang Anda lakukan?",
    answer: [
      {
        label: "Singkat",
        sumber: S,
        paragraf: [
          "Saya akan membangun komunikasi terbuka, menghargai pengalaman anggota tim, serta menunjukkan komitmen melalui kinerja agar kepercayaan tim dapat terbentuk.",
        ],
      },
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan membangun komunikasi terbuka dengan menghargai pengalaman anggota tim. Saya berusaha menunjukkan komitmen melalui sikap profesional dan kinerja yang konsisten. Dengan pendekatan kolaboratif, saya yakin kepercayaan tim dapat terbentuk secara bertahap.",
        ],
      },
    ],
  },
  {
    id: "bca-pdp-005",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-tekanan-target",
    question: "Apa solusi yang Anda ajukan?",
    answer: [
      {
        label: "Singkat",
        sumber: S,
        paragraf: [
          "Mengusulkan evaluasi segmen pasar potensial, memperkuat kerja sama dengan dealer strategis, serta melakukan promosi yang tetap sesuai dengan kebijakan risiko perusahaan.",
        ],
      },
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan mengusulkan evaluasi strategi berdasarkan data pasar dan performa sebelumnya. Fokus diarahkan pada segmen potensial serta penguatan kerja sama dengan dealer strategis. Upaya peningkatan target tetap dilakukan dengan mematuhi kebijakan risiko perusahaan.",
        ],
      },
    ],
  },
  {
    id: "bca-pdp-006",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus PDP",
    caseId: "bca-pdp-deadline",
    question: TANPA_PERTANYAAN,
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan menghubungi pihak terkait untuk memastikan data yang dibutuhkan dan menyampaikan kondisi deadline kepada atasan. Sambil menunggu kelengkapan data, saya mengerjakan bagian laporan yang sudah tersedia agar pekerjaan tetap efisien dan tepat waktu.",
        ],
      },
    ],
  },
  {
    id: "bca-sulit-001",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus Sulit",
    caseId: "bca-sulit-target-risiko",
    question: "Apa yang Anda lakukan?",
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan tetap berpegang pada kebijakan manajemen risiko perusahaan dan tidak menyetujui pembiayaan yang tidak memenuhi standar. Namun, saya akan mengusulkan alternatif solusi seperti memprioritaskan nasabah dengan profil risiko lebih baik atau memperkuat kerja sama dengan dealer untuk meningkatkan kualitas pengajuan. Dengan demikian, target tetap diupayakan tanpa mengorbankan prinsip kehati-hatian.",
        ],
      },
    ],
  },
  {
    id: "bca-sulit-002",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus Sulit",
    caseId: "bca-sulit-fraud",
    question: "Langkah apa yang Anda ambil?",
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan mengumpulkan dan menganalisis data performa pembiayaan dealer tersebut untuk memastikan adanya indikasi risiko atau penyimpangan. Selanjutnya, saya melaporkan temuan tersebut kepada atasan dan unit terkait agar dapat dilakukan evaluasi lebih lanjut. Langkah ini penting untuk menjaga kualitas portofolio dan mencegah potensi fraud sejak dini.",
        ],
      },
    ],
  },
  {
    id: "bca-sulit-003",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus Sulit",
    caseId: "bca-sulit-etika",
    question: "Bagaimana sikap Anda?",
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan menolak tawaran tersebut secara profesional dan menjelaskan bahwa seluruh proses pembiayaan harus mengikuti prosedur yang berlaku. Saya tetap memberikan pelayanan terbaik dengan memastikan proses berjalan sesuai SOP dan transparan. Sikap ini penting untuk menjaga integritas pribadi dan reputasi perusahaan.",
        ],
      },
    ],
  },
  {
    id: "bca-sulit-004",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus Sulit",
    caseId: "bca-sulit-minim-info",
    question: "Apa keputusan Anda?",
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan menyampaikan kepada atasan bahwa keputusan tanpa data lengkap berpotensi menimbulkan risiko. Saya mengusulkan opsi penundaan singkat sambil melengkapi data penting, serta memberikan rekomendasi sementara berbasis informasi yang tersedia dengan catatan risiko yang jelas. Pendekatan ini menjaga kualitas keputusan dan akuntabilitas.",
        ],
      },
    ],
  },
  {
    id: "bca-sulit-005",
    type: "essay",
    section: "BCA Finance",
    category: "Studi Kasus Sulit",
    caseId: "bca-sulit-tim",
    question: "Bagaimana Anda menyikapinya?",
    answer: [
      {
        label: "Lengkap",
        sumber: L,
        paragraf: [
          "Saya akan menyelaraskan tujuan tim dengan menekankan bahwa pencapaian target dan kualitas pembiayaan bukanlah hal yang saling bertentangan. Melalui diskusi berbasis data, saya mengajak tim menyusun strategi yang realistis dan berkelanjutan agar kinerja cabang tetap sehat dalam jangka panjang.",
        ],
      },
    ],
  },
];
