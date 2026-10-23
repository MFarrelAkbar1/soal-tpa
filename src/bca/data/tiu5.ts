import type { SoalTiu5 } from "../types";

// Psikotes 1 – TIU 5 dari "Jawaban BCA Finance Update.pdf". Soal di halaman 2–3, kunci dari
// lingkaran di halaman 4–5. PDF tidak memuat pembahasan, jadi pembahasan di bawah dibuat sendiri;
// bila aturan A→B tidak bisa dipastikan dari gambar, itu ditulis apa adanya (aturanJelas: false).

export const LABEL_PEMBAHASAN_TIU5 = "Pembahasan dibuat sendiri, bukan dari sumber";

export const BAGIAN_GAMBAR = ["a", "b", "c", "1", "2", "3", "4", "5"] as const;
export type BagianGambar = (typeof BAGIAN_GAMBAR)[number];

export function gambarTiu5(nomor: number, bagian: BagianGambar): string {
  return "bca-tiu5/tiu5-" + String(nomor).padStart(2, "0") + "-" + bagian + ".png";
}

type Baris = [kunci: number, pembahasan: string, aturanJelas?: boolean];

const DATA: Baris[] = [
  /* 1 */ [2, "B terdiri dari garis A ditambah salinannya yang dicerminkan atas–bawah, sehingga membentuk sudut \"<\". C (garis miring bertanda kecil) diberi perlakuan yang sama: gambar 2 berisi dua salinan C yang membuka seperti B. Catatan: arah tanda kecil pada garis bawah gambar 2 tidak persis cerminan."],
  /* 2 */ [5, "Pada B, dari A ditarik garis diagonal ke kanan atas yang ujungnya diberi tanda silang kecil. C (tanda +) diberi garis yang sama, jadi jawabannya gambar 5: tanda + di kiri bawah, garis diagonal, dan silang kecil di ujung atas."],
  /* 3 */ [4, "B adalah A (persegi) yang dicoret garis diagonal dari kanan atas, menembus keluar di kiri bawah. C (lingkaran) dicoret dengan cara yang sama, jadi jawabannya gambar 4."],
  /* 4 */ [4, "B adalah A tanpa garis tegak di sisi kirinya. C (persegi) tanpa sisi kiri menjadi bentuk \"⊐\", yaitu gambar 4."],
  /* 5 */ [5, "Panah A (ke bawah) diputar 90° menjadi panah ke kanan pada B; jenis mata panahnya tetap. C adalah panah ke bawah bermata panah kosong, jadi jawabannya panah ke kanan bermata panah kosong: gambar 5 (gambar 4 mata panahnya hitam)."],
  /* 6 */ [4, "Aturannya tidak jelas dari gambar. B tampak seperti potongan A: garis atas tetap, dan hanya kotak bagian kanan yang tersisa. Gambar 4 (garis mendatar dengan seperempat lingkaran di kanan) adalah kunci PDF, tetapi bagian C yang dipertahankan tidak persis sepadan dengan bagian A yang dipertahankan di B.", false],
  /* 7 */ [5, "A (huruf I) diputar 90° menjadi B (huruf H). C (tiga titik: satu di atas, dua di bawah) diputar 90° searah jarum jam menjadi dua titik di kiri dan satu di kanan, yaitu gambar 5."],
  /* 8 */ [1, "B adalah A (elips tegak) yang direntangkan ke samping sehingga lebih lebar. C (segitiga) yang direntangkan ke samping menjadi segitiga yang lebih lebar dan pendek, yaitu gambar 1."],
  /* 9 */ [5, "A (dua garis tegak) menjadi B (tiga garis mendatar): arahnya diputar 90° dan jumlahnya ditambah satu. C (dua titik berjajar mendatar) menjadi tiga titik berjajar tegak, yaitu gambar 5 (gambar 4 berisi empat titik)."],
  /* 10 */ [3, "Jumlah kotak A digandakan pada B (2 menjadi 4). C berisi 3 titik, jadi jawabannya pilihan dengan 6 titik: gambar 3. Pilihan lain berisi 4, 5, atau 3 titik."],
  /* 11 */ [5, "Aturannya tidak jelas dari gambar. Dari A ke B, setengah bagian atas kedua lingkaran dihilangkan. Kalau aturan itu diterapkan pada C, yang tersisa adalah bagian bawah C, sedangkan kunci PDF (gambar 5) justru tampak seperti bagian atas C. Kunci dicantumkan sesuai PDF.", false],
  /* 12 */ [4, "B hanya berisi kedua diagonal A (persegi panjang), sisi-sisinya dihapus. Diagonal trapesium C bersilangan dengan lengan atas yang lebih panjang daripada lengan bawah, yaitu gambar 4."],
  /* 13 */ [5, "B adalah A (\"∧\") ditambah salinannya yang dibalik di bawahnya, sehingga membentuk belah ketupat. C (\"×\") ditambah salinannya di bawah menjadi dua tanda silang bersusun, yaitu gambar 5 (gambar 1 berisi tiga)."],
  /* 14 */ [3, "B adalah A (segitiga siku-siku) yang dicerminkan atas–bawah. C (huruf W) dicerminkan atas–bawah menjadi huruf M, yaitu gambar 3."],
  /* 15 */ [2, "Aturannya tidak jelas dari gambar. B tampak seperti bagian kiri A yang dipisah lalu disusun bertumpuk, dan gambar 2 (dua lengkung bertumpuk dengan garis kecil di tengah) adalah kunci PDF, tetapi hubungan pastinya antara A dan B tidak bisa dipastikan.", false],
  /* 16 */ [3, "A yang tegak direbahkan menjadi B yang mendatar. Dengan perlakuan yang sama, C yang mendatar menjadi tegak; menurut kunci PDF hasilnya gambar 3. Arah kait-kait kecil di ujungnya sulit dipastikan dari gambar, jadi aturan persisnya tidak jelas.", false],
  /* 17 */ [2, "B adalah A (garis mendatar) yang diberi dua segitiga: di kiri atas dan di kanan bawah garis. C adalah garis yang sama dalam posisi tegak, jadi jawabannya B yang diputar 90°. Catatan: garis mendatar bisa menjadi tegak lewat putaran ke kanan maupun ke kiri. Kunci PDF (gambar 2) sesuai putaran searah jarum jam, sedangkan gambar 5 sesuai putaran berlawanan arah, jadi soal ini ambigu.", false],
  /* 18 */ [3, "Pada B, sisi-sisi persegi A dihapus dan sudut-sudutnya menjadi titik. C (garis) menjadi dua titik di kedua ujungnya. Gambar 1 dan 3 sama-sama berisi dua titik dan hanya berbeda pada jarak dan ukuran titiknya; kunci PDF adalah gambar 3.", false],
  /* 19 */ [4, "Bangun luar A (lingkaran) dihapus sehingga hanya garis lengkung di dalamnya yang tersisa (B). Pada C, persegi luarnya dihapus; alas segitiga berimpit dengan sisi bawah persegi sehingga ikut hilang, jadi yang tersisa adalah \"^\", yaitu gambar 4 (gambar 1 masih punya alas)."],
  /* 20 */ [4, "B adalah A (persegi) yang dipotong diagonal menjadi setengahnya (segitiga siku-siku). C (lingkaran) dipotong diagonal menjadi setengah lingkaran yang miring, yaitu gambar 4 (gambar 3 dan 5 dipotong tegak dan mendatar). Catatan: ada noda samar di dekat segitiga B pada scan PDF."],
  /* 21 */ [3, "Sisi-sisi A dihapus; diagonal di dalamnya tetap dan ditambah diagonal satunya sehingga keduanya bersilangan (B). Pada C, garis di dalam jajargenjang tetap dan ditambah diagonal jajargenjang, sehingga hasilnya dua garis bersilangan seperti gambar 3."],
  /* 22 */ [3, "Titik tengah sisi-sisi segitiga A dihubungkan; segitiga di sudut-sudutnya dihitamkan dan segitiga di tengah tetap putih (B). Pada persegi panjang C, titik tengah sisinya membentuk belah ketupat putih di tengah dengan sudut-sudut hitam, yaitu gambar 3 (gambar 2 kebalikannya)."],
  /* 23 */ [4, "Bangun luar dan bangun dalam A bertukar tempat: persegi berisi lingkaran menjadi lingkaran berisi persegi (B). C (lingkaran berisi segitiga) menjadi segitiga berisi lingkaran, yaitu gambar 4."],
  /* 24 */ [4, "B adalah A ditambah salinannya yang digeser ke kanan bawah sehingga saling bertumpuk. C (persegi) ditambah salinan yang digeser ke kanan bawah dan bertumpuk, yaitu gambar 4."],
  /* 25 */ [5, "Ujung A yang berupa garis datar diganti mata panah, lalu kedua ujung bertukar tempat (B). Pada C, garis datar di atas menjadi mata panah dan pindah ke bawah, sedangkan kotak di bawah pindah ke atas, yaitu gambar 5."],
  /* 26 */ [1, "Jumlah sisi bertambah satu: segitiga (3) menjadi persegi (4). C (segi lima) menjadi segi enam, yaitu gambar 1."],
  /* 27 */ [2, "Tonjolan kecil di atas dan bawah A berubah menjadi satu garis mendatar yang memotong bangun dan menjulur keluar di kiri dan kanan (B). C (lingkaran dengan tonjolan atas–bawah) menjadi lingkaran dengan garis mendatar yang menjulur keluar, yaitu gambar 2."],
  /* 28 */ [5, "B adalah tiga salinan A: dua berdampingan di atas dan satu di bawah tengah yang dibalik (tonjolannya di bawah). C (segitiga) disusun dengan cara yang sama: dua segitiga di atas dan satu segitiga terbalik di bawah. Gambar 2 dan 5 sama-sama berpola itu; yang ukuran tiap segitiganya sama dengan C adalah gambar 5 (kunci PDF).", false],
  /* 29 */ [3, "A (lingkaran) dibelah tegak lalu kedua belahannya ditukar sehingga saling membelakangi (B). Segitiga C yang dibelah tegak lalu belahannya ditukar membuat sisi miringnya membentuk huruf V di atas alas, yaitu gambar 3."],
  /* 30 */ [5, "Aturannya tidak jelas dari gambar. A garis tegak, B garis tegak dengan garis miring di kirinya, dan C tampak hampir sama dengan B. Kunci PDF adalah gambar 5 (bentuk L), tetapi aturan yang menghubungkan A→B dengan C→5 tidak bisa dipastikan.", false],
];

export const SOAL_TIU5: SoalTiu5[] = DATA.map(([kunci, pembahasan, aturanJelas = true], i) => ({
  id: "tiu5-" + String(i + 1).padStart(2, "0"),
  nomor: i + 1,
  kunci,
  pembahasan,
  aturanJelas,
}));
