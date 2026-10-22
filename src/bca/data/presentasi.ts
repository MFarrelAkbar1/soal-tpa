import type { Kasus, SoalEsai, TabelData } from "../types";

// Kasus presentasi PDP (Contoh Soal Tes Tulis 1–4) dan kasus data dealer
// (Contoh Soal dan Jawaban Tes Tulis 1). Tidak satu pun PDF ini memuat contoh jawaban.

const C1 = "Contoh Soal Tes Tulis 1.pdf";
const C2 = "Contoh Soal Tes Tulis 2.pdf";
const C3 = "Contoh Soal Tes Tulis 3.pdf";
const C4 = "Contoh Soal Tes Tulis 4.pdf";
const CJ = "Contoh Soal dan Jawaban Tes Tulis 1.pdf";

const PPT_BEBAS = "Materi presentasi harus Anda siapkan dalam bentuk file Powerpoint dengan format presentasi bebas.";
const PPT_EMAIL = "Materi presentasi harus Anda siapkan dalam bentuk file Powerpoint dengan format presentasi sesuai dengan informasi pada email (perhatikan ketentuannya).";

const BULAN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const DEALER = ["A", "B", "C", "D", "E", "F", "G", "H"];

// kolom per dealer (A–H) → baris per bulan
function perDealer(judul: string, data: (string | number)[][], total?: (string | number)[], satuan = ""): TabelData {
  const kolom = ["Bulan", ...DEALER.map((d) => "Dealer " + d)];
  if (total) kolom.push("Total BCAF");
  return {
    judul,
    kolom,
    baris: BULAN.map((b, i) => [
      b,
      ...data.map((d) => d[i] + satuan),
      ...(total ? [total[i] + satuan] : []),
    ]),
  };
}

const PENJUALAN = [
  [105, 125, 130, 150, 130, 140],
  [150, 200, 200, 220, 180, 175],
  [80, 100, 120, 160, 140, 130],
  [50, 60, 70, 65, 50, 40],
  [25, 25, 18, 40, 16, 14],
  [12, 15, 11, 30, 14, 12],
  [18, 22, 15, 18, 12, 10],
  [15, 9, 9, 11, 8, 7],
];
const KONTRIBUSI = [
  [25, 45, 35, 50, 20, 21],
  [10, 15, 12, 19, 14, 15],
  [8, 10, 11, 14, 5, 5],
  [12, 15, 13, 16, 4, 4],
  [5, 7, 4, 9, 1, 1],
  [3, 4, 2, 8, 1, 2],
  [2, 3, 1, 3, 1, 1],
  [2, 1, 0, 1, 0, 1],
];
const TMA = [
  [200, 200, 180, 200, 190, 210],
  [100, 100, 105, 135, 150, 170],
  [50, 60, 65, 64, 60, 80],
  [60, 60, 62, 70, 85, 85],
  [45, 40, 42, 48, 60, 60],
  [60, 60, 62, 60, 70, 70],
  [50, 50, 52, 60, 65, 75],
  [35, 30, 32, 30, 50, 50],
];
const MACET = [
  [1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 1],
  [0, 1, 1, 1, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1],
];
const NPL = [
  ["0.50", "0.50", "0.56", "0.50", "0.53", "0.48"],
  ["0.00", "1.00", "0.00", "0.00", "0.00", "0.59"],
  ["0.00", "1.67", "1.54", "1.56", "1.67", "0.00"],
  ["1.67", "0.00", "1.61", "0.00", "1.18", "0.00"],
  ["2.22", "0.00", "2.38", "0.00", "1.67", "0.00"],
  ["0.00", "0.00", "0.00", "1.67", "0.00", "0.00"],
  ["0.00", "0.00", "0.00", "0.00", "0.00", "1.33"],
  ["0.00", "0.00", "0.00", "3.33", "0.00", "2.00"],
];

const TABEL_DEALER: TabelData[] = [
  {
    judul: "Kinerja cabang (NPL BCA Finance keseluruhan 1,5 %)",
    kolom: ["Bulan", "Target Cabang", "Achv%", "Achv (dlm rupiah)", "NPL Cabang", "Jml Staf Marketing"],
    baris: [
      ["Jan", "10,000,000,000", "80%", "8,000,000,000", "0,50%", "8"],
      ["Feb", "15,000,000,000", "80%", "12,000,000,000", "0,50%", "8"],
      ["Mar", "12,500,000,000", "75%", "9,375,000,000", "0,67%", "8"],
      ["Apr", "17,000,000,000", "85%", "14,450,000,000", "0,60%", "8"],
      ["May", "11,000,000,000", "50%", "5,500,000,000", "0,55%", "6"],
      ["Jun", "12,000,000,000", "50%", "6,000,000,000", "0,50%", "6"],
    ],
  },
  {
    judul: "Pokok Hutang (PH) per bulan",
    kolom: ["Bulan", "PH"],
    baris: [
      ["Jan", "8.000.000.000"],
      ["Feb", "12.000.000.000"],
      ["Mar", "9.375.000.000"],
      ["Apr", "14.450.000.000"],
      ["May", "5.500.000.000"],
      ["Jun", "6.000.000.000"],
    ],
  },
  perDealer("Total penjualan dealer (unit)", PENJUALAN),
  perDealer("Kontribusi dealer (unit melalui BCA Finance)", KONTRIBUSI),
  perDealer("Total Unit (TMA)", TMA, [600, 600, 600, 667, 730, 800]),
  perDealer("Jumlah unit yang macet", MACET, [3, 3, 4, 4, 4, 4]),
  perDealer("NPL", NPL, ["0.50", "0.50", "0.67", "0.60", "0.55", "0.50"], "%"),
];

export const kasusPresentasi: Kasus[] = [
  {
    id: "bca-ppt-data-analytics",
    judul: "Data Analytics · Cabang Baru Indonesia Timur",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "Sebuah perusahaan pembiayaan yang sedang berkembang berencana mengembangkan bisnisnya pada beberapa kota di Indonesia bagian timur. Sampai dengan saat ini, cabang yang beroperasi di wilayah tersebut berada di kota Manado, Kendari, Makassar, Cakranegara, Palu, Gorontalo, Kupang dan Denpasar. Manajemen berencana mengembangkan jangkauan bisnisnya pada beberapa Daerah Tingkat II Ibukota Kabupaten/Kota di luar kota-kota yang sudah ada agar lebih memaksimalkan service kepada konsumennya.",
      PPT_BEBAS,
    ],
    keterangan: "Case 1 Soal PDP – Data Analytics.",
    sumber: [C1],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-ppt-kepuasan",
    judul: "Customer Engagement · Kepuasan Customer",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "BCA Finance merupakan perusahaan pembiayaan yang melakukan kegiatan pembiayaan khususnya kendaraan roda empat kepada customer. Customer merupakan aspek yang sangat penting dalam perusahaan pembiayaan, sehingga kepuasan customer merupakan hal yang perlu untuk dijaga.",
    ],
    keterangan: "Case 2 Soal PDP – Customer Engagement (Contoh Soal Tes Tulis 1). Nomor \"Case 2\" juga dipakai untuk kasus Digital Marketing di Contoh Soal Tes Tulis 2.",
    sumber: [C1],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-ppt-internal-eksternal",
    judul: "Customer Engagement · Internal vs External Customer",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "Subdirektorat Operation merupakan salah satu Core Function di BCA Finance. Tugas dari Subdirektorat Operation ini adalah mengelola akun konsumen yang mengajukan kredit mulai dari pengecekan dokumen pengajuan kredit, mengelola dokumen jaminan, menghandle layanan after sales service, hingga menyerahkan dokumen jaminan kembali kepada konsumen ketika lunas.",
      "Untuk dapat menjalankan aktivitas tersebut, Subdirektorat ini akan berhubungan dengan Unit Kerja Internal lain di BCA Finance atau yang akan disebut sebagai Internal Customer & konsumen yang telah mengajukan kredit akan disebut sebagai External Customer.",
      "Materi presentasi harus Anda siapkan dalam bentuk file Power Point dengan format presentasi bebas.",
    ],
    keterangan: "Case 3 Soal PDP – Customer Engagement (Contoh Soal Tes Tulis 1). Nomor \"Case 3\" juga dipakai untuk kasus Good Relationship di Contoh Soal Tes Tulis 3.",
    sumber: [C1],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-ppt-digital",
    judul: "Digital Marketing · Digital Branding & Alur Bisnis",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "Era digital telah hadir di tengah-tengah kehidupan masyarakat. Cenderung sama dengan jenis bisnis lainnya, perkembangan di era digital saat ini sedikit banyak juga akan mempengaruhi bisnis model yang dijalankan oleh sebuah perusahaan pembiayaan. Digital branding, kecepatan proses dan perhatian terhadap Customer Experience menjadi sebuah topik yang mulai lebih diperhatikan saat ini.",
      "Anda diperkenankan mengubah alur bisnis yang terjadi saat ini, yaitu (1) konsumen datang ke dealer untuk memilih unit dan menyampaikan pembelian dilakukan secara kredit, (2) dealer atau showroom menghubungi perusahaan pembiayaan, dan akhirnya (3) aplikasi kredit dikelola oleh perusahaan pembiayaan tersebut dari konsumen.",
      PPT_EMAIL,
    ],
    keterangan: "Case 2 Soal PDP – Digital Marketing (Contoh Soal Tes Tulis 2).",
    sumber: [C2],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-ppt-relationship",
    judul: "Good Relationship · Hubungan dengan Dealer",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "Dalam beberapa dekade terakhir, sebuah bisnis pembiayaan sangat mengandalkan hubungan baik dengan rekan distribusi penyedia unit mobil untuk dapat memperoleh aplikasi dari konsumen yang ingin melakukan pembelian mobil secara kredit. Selain produk yang dianggap cukup menarik oleh konsumen, model bisnis perusahaan pembiayaan tersebut juga mengharuskan sebuah perusahaan pembiayaan memiliki hubungan yang baik dengan showroom atau dealer rekanan dengan cara dan strategi masing-masing perusahaan. Melalui model bisnis seperti diatas, maka mayoritas aplikasi diperoleh perusahaan pembiayaan berasal dari dealer atau showroom rekanan.",
      "Anda boleh menyampaikan cara yang dimaksud dalam bentuk apapun yang Anda yakini mampu meningkatkan kualitas hubungan antara perusahaan pembiayaan dengan dealer atau showroom.",
      PPT_EMAIL,
    ],
    keterangan: "Case 3 Soal PDP – Good Relationship (Contoh Soal Tes Tulis 3).",
    sumber: [C3],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-ppt-hukum",
    judul: "Hukum · Risiko Kasus Hukum Konsumen",
    kelompok: "Kasus Presentasi PDP",
    passage: [
      "Sebuah perusahaan pembiayaan yang sedang berkembang yang membiayai pembelian kendaraan bermotor menghadapi kasus-kasus antara lain konsumen yang menunggak, pengalihan kendaraan objek jaminan, konsumen menjadi tersangka korupsi dan money laundering.",
      PPT_EMAIL,
    ],
    keterangan: "Case 4 Soal PDP – Hukum (Contoh Soal Tes Tulis 4). Satu teks kasus untuk tiga pertanyaan.",
    sumber: [C4],
    ujian: true,
    checklist: "pdp",
  },
  {
    id: "bca-data-dealer",
    judul: "Kepala Cabang · Analisis Data Dealer",
    kelompok: "Analisis Data Cabang",
    passage: [
      "Anda adalah seorang kepala cabang di sebuah perusahaan pembiayaan mobil. Berdasarkan data dibawah ini, tentukanlah jawaban atas pertanyaan a, b, dan c.",
      "(Anda diperbolehkan untuk open book/mencari referensi tambahan di internet)",
      "* Kontribusi dealer adalah banyaknya unit kendaraan yang pembeliannya melalui BCA Finance\n* TMA adalah Total Manage Aset, jumlah booking yang dikelola oleh BCA Finance\n* NPL adalah Non Perfoming Loan, jumlah kredit macet over 30 hari.\n* PH adalah Pokok Hutang, plafon kredit konsumen",
    ],
    tabel: TABEL_DEALER,
    keterangan: "Meski nama filenya \"Contoh Soal dan Jawaban\", PDF ini hanya berisi soal dan tabel data, tanpa jawaban. Tabel di PDF tertutup banner cookie; angka dipulihkan dari lapisan teks PDF dan disusun per metrik. Jumlah TMA dan unit macet semua dealer per bulan cocok dengan kolom Total BCAF.",
    sumber: [CJ],
    ujian: true,
    checklist: "pdp",
  },
];

export const soalPresentasi: SoalEsai[] = [
  {
    id: "bca-ppt-001",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-data-analytics",
    question: "Atas kondisi tersebut, cobalah melakukan feasibility study dan berikan usulan kepada manajemen perusahaan pembiayaan tersebut, 3 (tiga) kota yang menurut Anda layak untuk dibuka sebagai cabang baru di wilayah Indonesia Timur, dengan mempertimbangkan aspek kependudukan, potensi bisnis, jangkauan atas cabang eksisting, dan beberapa pertimbangan lain yang menurut Anda perlu diperhatikan. Apabila diperlukan, tampilkan juga data yang mendukung analisa Anda tersebut.",
    answer: null,
  },
  {
    id: "bca-ppt-002",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-kepuasan",
    question: "Anda diberikan tugas untuk membuat materi presentasi dalam bentuk power point, bagaimana cara yang dapat dilakukan oleh BCA Finance untuk meningkatkan kepuasan customer yang berdampak positif terhadap level engagement konsumen di BCA Finance?",
    answer: null,
  },
  {
    id: "bca-ppt-003",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-internal-eksternal",
    question: "Menurut pendapat Anda, sebagai Perusahaan terkemuka aktivitas apa yang harus dipenuhi terlebih dahulu, pemenuhan kepuasan Internal Customer atau External Customer? Dan berikan penjelasan bagaimana caranya.",
    answer: null,
  },
  {
    id: "bca-ppt-004",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-digital",
    question: "Berdasarkan gambaran singkat tersebut, cobalah merancang konsep digital branding dan alur bisnis baru bagi sebuah perusahaan pembiayaan yang relevan terhadap perkembangan era digital saat ini.",
    answer: null,
  },
  {
    id: "bca-ppt-005",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-relationship",
    question: "Berdasarkan gambaran singkat di atas, coba sampaikan pendapat Anda mengenai bagaimana cara mengelola hubungan yang baik dengan dealer atau showroom rekanan di tengah gempuran beragam jenis perusahaan pembiayaan, baik perusahaan pembiayaan konvensional maupun perusahaan pembiayaan online yang mulai banyak bermunculan di tengah era digital saat ini.",
    answer: null,
  },
  {
    id: "bca-ppt-006",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-hukum",
    question: "1. Coba sampaikan pendapat Anda mengenai bagaimana caranya memitigasi risiko dan meminimalisir kerugian bagi perusahaan atas risiko terjadinya kasus-kasus hukum seperti yang disampaikan di atas!",
    answer: null,
  },
  {
    id: "bca-ppt-007",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-hukum",
    question: "2. Hal-hal apa saja yang menurut pendapat Anda perlu diatur dalam perjanjian antara perusahaan dengan para konsumennya?",
    answer: null,
  },
  {
    id: "bca-ppt-008",
    type: "essay",
    section: "BCA Finance",
    category: "Kasus Presentasi PDP",
    caseId: "bca-ppt-hukum",
    question: "3. Bagaimana menurut pendapat Anda cara pengamanan kendaraan yang benar menurut hukum yang berlaku apabila terjadi kasus-kasus hukum seperti yang disampaikan di atas?",
    answer: null,
  },
  {
    id: "bca-data-001",
    type: "essay",
    section: "BCA Finance",
    category: "Analisis Data Cabang",
    caseId: "bca-data-dealer",
    question: "a. Dealer manakah yang memiliki kontribusi terbaik dan terburuk bagi perusahaan? Apa yang akan Anda lakukan terhadap kondisi tersebut?",
    answer: null,
  },
  {
    id: "bca-data-002",
    type: "essay",
    section: "BCA Finance",
    category: "Analisis Data Cabang",
    caseId: "bca-data-dealer",
    question: "b. Dealer manakah yang memiliki NPL tertinggi dan terendah? Apa yang akan Anda lakukan terhadap kondisi tersebut?",
    answer: null,
  },
  {
    id: "bca-data-003",
    type: "essay",
    section: "BCA Finance",
    category: "Analisis Data Cabang",
    caseId: "bca-data-dealer",
    question: "c. Strategi apa yang akan Anda lakukan untuk meningkatkan produktifitas cabang Anda?",
    answer: null,
  },
];
