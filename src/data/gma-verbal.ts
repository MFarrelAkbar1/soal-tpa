import type { Soal } from "../types";

// GMA Verbal — 55 soal, dipindah apa adanya dari index.html lama.
// answer = indeks opsi (0 = A, 1 = B, ...) atau null bila belum ada kunci.
// image  = path relatif terhadap folder public/.

export const gmaVerbal: Soal[] = [
  {
    id: "gma-verbal-001",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Buaya : Kadal",
    options: ["Kecil : Besar", "Zebra : Kuda", "Ayam : Kelinci", "Laki-Laki : Anak", "Roti : Rembulan"],
    answer: 1,
    explanation: "Buaya dan kadal adalah hewan sejenis (reptil) yang berbeda ukuran, sebagaimana zebra dan kuda sama-sama satu keluarga dengan bentuk mirip."
  },
  {
    id: "gma-verbal-002",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Kering : Air",
    options: ["Manusia : Norma", "Lapar : Kosong", "Hidung : Bau", "Ngantuk : Tidur", "Kuping : Tulang"],
    answer: 3,
    explanation: "Kering terjadi karena ketiadaan air, sebagaimana ngantuk terjadi karena kurangnya tidur."
  },
  {
    id: "gma-verbal-003",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Siswa : Belajar",
    options: ["Ilmuwan : Meneliti", "Santri : Garam", "Guru : Murid", "Karyawan : Mesin", "Nenek : Kakek"],
    answer: 0,
    explanation: "Hubungan pelaku dan aktivitas utamanya: siswa belajar, ilmuwan meneliti."
  },
  {
    id: "gma-verbal-004",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Air : Menguap",
    options: ["Es : Mencair", "Panas : Memuai", "Jatuh : Pecah", "Uap : Hujan", "Laut : Mendung"],
    answer: 0,
    explanation: "Air menguap adalah perubahan wujud zat, sebagaimana es mencair juga perubahan wujud zat."
  },
  {
    id: "gma-verbal-005",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Apoteker : Obat",
    options: ["Pesawat : Penyakit", "Koki : Masakan", "Montir : Rusak", "Meteor : Pohon", "Psikiater : Ide"],
    answer: 1,
    explanation: "Apoteker meracik obat, sebagaimana koki meracik masakan."
  },
  {
    id: "gma-verbal-006",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Pilot pada pesawat seperti supir pada...?",
    options: ["Terbang", "Setir", "Kemudi", "Mobil", "Masinis", "Penumpang"],
    answer: 3,
    explanation: "Pilot mengemudikan pesawat sebagaimana supir mengemudikan mobil."
  },
  {
    id: "gma-verbal-007",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Khianat pada percaya seperti permanen pada...?",
    options: ["Kekal", "Tetap", "Mapan", "Langgeng", "Fana", "Terpana"],
    answer: 4,
    explanation: "Hubungannya adalah lawan kata. Khianat lawan dari percaya, permanen lawan dari fana (sementara)."
  },
  {
    id: "gma-verbal-008",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Serigala", "Kucing hutan", "Kijang", "Badak", "Buaya", "Jerapah"],
    answer: 4,
    explanation: "Buaya satu-satunya reptil, sedangkan serigala, kucing hutan, kijang, badak, dan jerapah semuanya mamalia."
  },
  {
    id: "gma-verbal-009",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana diantara hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Kemeja", "Kaos", "Celana", "Rok", "Cincin", "Gaun"],
    answer: 4,
    explanation: "Cincin adalah perhiasan, sedangkan pilihan lainnya adalah pakaian."
  },
  {
    id: "gma-verbal-010",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Memohon", "Menginstruksikan", "Mengomandokan", "Menitahkan", "Menyuruh", "Memerintahkan"],
    answer: 0,
    explanation: "Memohon adalah permintaan dari bawah ke atas, sedangkan lainnya adalah perintah dari atas ke bawah."
  },
  {
    id: "gma-verbal-011",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Kabupaten pada provinsi seperti negara pada...?",
    options: ["Kota", "Zona", "Kawasan", "Benua", "Distrik", "Geografi"],
    answer: 3,
    explanation: "Kabupaten adalah bagian dari provinsi, sebagaimana negara adalah bagian dari benua."
  },
  {
    id: "gma-verbal-012",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Bayam", "Sawi", "Selada", "Kangkung", "Tomat", "Daun singkong"],
    answer: 4,
    explanation: "Tomat adalah buah yang dimakan sebagai sayur, sedangkan lainnya adalah sayuran daun."
  },
  {
    id: "gma-verbal-013",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Lingkaran pada bola seperti bujur sangkar pada...?",
    options: ["Kubik", "Kubus", "Sama sisi", "Jajaran genjang", "Lonjong", "Bulat"],
    answer: 1,
    explanation: "Lingkaran adalah bentuk dua dimensi dari bola, sebagaimana bujur sangkar adalah bentuk dua dimensi dari kubus."
  },
  {
    id: "gma-verbal-014",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Anjing pada menggonggong seperti kuda pada...?",
    options: ["Pohon", "Kijang", "Berderap", "Berpacu", "Meringkik", "Berlari"],
    answer: 4,
    explanation: "Hubungan hewan dengan suara khasnya: anjing menggonggong, kuda meringkik."
  },
  {
    id: "gma-verbal-015",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Dasawarsa", "Waktu", "Bulan", "Menit", "Seperseribu detik", "Abad"],
    answer: 1,
    explanation: "Waktu adalah konsep umum, sedangkan lainnya adalah satuan waktu yang spesifik."
  },
  {
    id: "gma-verbal-016",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Tempat pada waktu seperti dimana pada...?",
    options: ["Mengapa", "Sekarang", "Kapan", "Di sini", "Kemudian", "Lokasi"],
    answer: 2,
    explanation: "Kata tanya untuk tempat adalah 'dimana', sedangkan kata tanya untuk waktu adalah 'kapan'."
  },
  {
    id: "gma-verbal-017",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Warna, hijau, bunga, mawar, burung,... apa kata yang berikutnya?",
    options: ["Hewan", "Ikan", "Bulu", "Bebek", "Merak", "Sayap"],
    answer: 4,
    explanation: "Polanya adalah kategori diikuti contohnya: warna–hijau, bunga–mawar, burung–merak."
  },
  {
    id: "gma-verbal-018",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Itu pada ini seperti disana pada...?",
    options: ["Sekarang", "Kapan", "Bagaimana", "Waktu itu", "Dimana", "Disini"],
    answer: 5,
    explanation: "Hubungannya jauh–dekat. 'Itu' berpasangan dengan 'ini', 'disana' berpasangan dengan 'disini'."
  },
  {
    id: "gma-verbal-019",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Mengutarakan", "Menceritakan", "Memberitahukan", "Mengabarkan", "Menginformasikan", "Memohonkan"],
    answer: 5,
    explanation: "Memohonkan berarti meminta, sedangkan lainnya berarti menyampaikan informasi."
  },
  {
    id: "gma-verbal-020",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Puisi", "Drama", "Patung", "Lelucon", "Gambar", "Novel"],
    answer: 2,
    explanation: "Patung adalah karya seni tiga dimensi, sedangkan lainnya karya berbasis kata atau bidang datar."
  },
  {
    id: "gma-verbal-021",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Sepersejuta detik, seperseribu detik, detik, menit, jam,... apa kata berikutnya?",
    options: ["Waktu", "Minggu", "Hari", "Tanggal", "Bulan", "Tahun"],
    answer: 2,
    explanation: "Urutan satuan waktu dari yang terkecil ke terbesar secara berurutan, sehingga setelah jam adalah hari."
  },
  {
    id: "gma-verbal-022",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Seng pada anggrek seperti logam pada?",
    options: ["Bunga", "Pohon", "Botani", "Baja", "Mawar", "Logam campuran"],
    answer: 0,
    explanation: "Seng adalah contoh logam dan anggrek adalah contoh bunga, sehingga pasangan kategorinya adalah logam–bunga."
  },
  {
    id: "gma-verbal-023",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Mengukus", "Merebus", "Menggoreng", "Memanaskan", "Mengasap", "Memanggang"],
    answer: 3,
    explanation: "Memanaskan adalah istilah umum, sedangkan lainnya adalah teknik memasak yang spesifik."
  },
  {
    id: "gma-verbal-024",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Zoologi pada hewan seperti antropologi pada...?",
    options: ["Serangga", "Pengetahuan", "Semut", "Politik", "Orang", "Bahasa"],
    answer: 4,
    explanation: "Zoologi mempelajari hewan, sedangkan antropologi mempelajari manusia (orang)."
  },
  {
    id: "gma-verbal-025",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Piano pada alat musik seperti palu pada...?",
    options: ["Gergaji", "Paku", "Pertukangan", "Memalu", "Tukang kayu", "Perkakas"],
    answer: 5,
    explanation: "Piano termasuk kategori alat musik, sebagaimana palu termasuk kategori perkakas."
  },
  {
    id: "gma-verbal-026",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Negara, Thailand, logam, perak, hewan,... apa kata yang berikutnya?",
    options: ["Reptil", "Burung", "Ikan", "Unta", "Mamalia", "Serangga"],
    answer: 3,
    explanation: "Polanya kategori diikuti contoh spesifik. Setelah 'hewan' dibutuhkan nama hewan tertentu, yaitu unta."
  },
  {
    id: "gma-verbal-027",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Ulat pada kupu-kupu seperti berudu pada?",
    options: ["Lalat", "Katak", "Nyamuk", "Kadal", "Ular", "Lebah"],
    answer: 1,
    explanation: "Ulat adalah fase larva kupu-kupu, sebagaimana berudu adalah fase larva katak."
  },
  {
    id: "gma-verbal-028",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Negara, makanan, spanyol, nasi, pakaian, warna,... apa kata yang berikutnya?",
    options: ["Hijau", "Turki", "Tas", "Ikan goreng", "Kemeja", "Merah"],
    answer: 4,
    explanation: "Dua kategori disebut lalu contohnya berurutan: (negara, makanan) → (spanyol, nasi), maka (pakaian, warna) → kemeja terlebih dahulu."
  },
  {
    id: "gma-verbal-029",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Banyak ikan", "Para kambing", "Anak anjing", "Sekumpulan orang", "Anak-anak", "Sekelompok burung"],
    answer: 2,
    explanation: "Anak anjing menunjuk satu individu, sedangkan lainnya menunjukkan kelompok atau bentuk jamak."
  },
  {
    id: "gma-verbal-030",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Nenek, kakek, ibu, bapak,... apa kata yang berikutnya?",
    options: ["Cucu laki-laki", "Putra", "Keponakan", "Sepupu", "Cucu perempuan", "Putri"],
    answer: 5,
    explanation: "Urutannya turun satu generasi dengan pola perempuan lebih dulu, sehingga setelah ibu–bapak adalah putri."
  },
  {
    id: "gma-verbal-031",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Toko pada perdagangan seperti lumbung pada?",
    options: ["Batu bara", "Kuda", "Hewan", "Padi", "Peternakan", "Pertanian"],
    answer: 5,
    explanation: "Toko adalah tempat yang berkaitan dengan sektor perdagangan, sebagaimana lumbung berkaitan dengan sektor pertanian."
  },
  {
    id: "gma-verbal-032",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Beringin pada kakap seperti pohon pada?",
    options: ["Dahan", "Daun", "Plankton", "Tanaman", "Mamalia", "Ikan"],
    answer: 5,
    explanation: "Beringin adalah jenis pohon dan kakap adalah jenis ikan, sehingga pasangan kategorinya pohon–ikan."
  },
  {
    id: "gma-verbal-033",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Arsitek, bangunan, penggubah lagu, musik, koreografer,... apa kata yang berikutnya?",
    options: ["Opera", "Film", "Tarian", "Potret", "Seni", "Gambar"],
    answer: 2,
    explanation: "Polanya pelaku dan karyanya: arsitek–bangunan, penggubah lagu–musik, koreografer–tarian."
  },
  {
    id: "gma-verbal-034",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Kuda, kapal layar, kereta uap, mobil, pesawat terbang,... apa kata yang berikutnya?",
    options: ["Kapal pesiar", "Balon udara", "Trem", "Motor", "Pesawat ruang angkasa", "Perahu motor"],
    answer: 4,
    explanation: "Urutan alat transportasi dari yang paling kuno ke paling modern, sehingga setelah pesawat terbang adalah pesawat ruang angkasa."
  },
  {
    id: "gma-verbal-035",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Marah", "Berang", "Geram", "Kaget", "Naik pitam", "Murka"],
    answer: 3,
    explanation: "Kaget adalah reaksi terkejut, sedangkan lainnya merupakan ungkapan kemarahan."
  },
  {
    id: "gma-verbal-036",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Di belakang", "Di sebrang", "Bawah", "Di luar", "Di dalam", "Di bawah"],
    answer: 2,
    explanation: "Hanya 'bawah' yang tidak didahului kata depan 'di', sedangkan lainnya berbentuk keterangan tempat lengkap."
  },
  {
    id: "gma-verbal-037",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Amerika utara, eropa, asia, afrika,... apa kata yang berikutnya?",
    options: ["Afrika selatan", "Numbu", "Perancis", "Amerika selatan", "Selandia baru", "Karibia"],
    answer: 3,
    explanation: "Semuanya nama benua, dan satu-satunya pilihan yang juga benua adalah Amerika Selatan."
  },
  {
    id: "gma-verbal-038",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Ramai pada tersepi seperti buruk pada...?",
    options: ["Lebih jelek", "Terbaik", "Baik", "Terburuk", "Lebih baik", "Jelek"],
    answer: 1,
    explanation: "Ramai berlawanan dengan sepi, lalu diberi imbuhan ter- sehingga menjadi tersepi. Dengan pola yang sama, lawan kata buruk adalah baik dan bentuk ter- nya adalah terbaik."
  },
  {
    id: "gma-verbal-039",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["Melambung", "Tertinggi", "Membumbung", "Memuncak", "Mengangkasa", "Melangit"],
    answer: 1,
    explanation: "Melambung, membumbung, memuncak, mengangkasa, dan melangit semuanya kata kerja yang berarti naik atau meninggi. Tertinggi adalah kata sifat bentuk paling, bukan kata kerja, sehingga tidak sejenis."
  },
  {
    id: "gma-verbal-040",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Kecil, terang, besar, gelap, berisik, keras,... apa kata yang berikutnya?",
    options: ["Kecil", "Lunak", "Besar", "Tenang", "Raksasa", "Ringan"],
    answer: 3,
    explanation: "Polanya adalah dua kata lalu lawan katanya masing-masing: kecil dan terang dilanjutkan besar dan gelap. Setelah berisik dan keras, kata berikutnya adalah lawan dari berisik, yaitu tenang."
  },
  {
    id: "gma-verbal-041",
    section: "GMA Verbal",
    category: "Analogi",
    question: "Kimia, sejarah, ahli kimia, sejarawan, kedokteran, astronomi,... apa kata yang berikutnya?",
    options: ["Ahli fisika", "Ahli bedah", "Dokter", "Astronot", "Ahli astrologi", "Ahli anatomi"],
    answer: 2,
    explanation: "Polanya adalah dua bidang ilmu lalu ahlinya secara berurutan: kimia dan sejarah dilanjutkan ahli kimia dan sejarawan. Setelah kedokteran dan astronomi, kata berikutnya adalah ahli di bidang kedokteran, yaitu dokter."
  },
  {
    id: "gma-verbal-042",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Krusial =",
    options: ["Kesialan", "Kudus", "Tidak mendesak", "Penting", "Keadaan"],
    answer: 3,
    explanation: "Krusial berarti gawat atau sangat penting dan menentukan."
  },
  {
    id: "gma-verbal-043",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Referensi =",
    options: ["Sosialisasi", "Konjungsi", "Demabrasi", "Relokasi keras", "Rujukan"],
    answer: 4,
    explanation: "Referensi berarti acuan atau rujukan."
  },
  {
    id: "gma-verbal-044",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Ciri =",
    options: ["Tabiat", "Watak", "Akhlak", "Tanda Khas", "Jiwa"],
    answer: 3,
    explanation: "Ciri berarti tanda khas yang membedakan sesuatu dari yang lain."
  },
  {
    id: "gma-verbal-045",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Rapuh =",
    options: ["Tulang", "Ringkih", "Galau", "Sedih", "Risih"],
    answer: 1,
    explanation: "Rapuh berarti mudah patah atau tidak kuat, sama artinya dengan ringkih."
  },
  {
    id: "gma-verbal-046",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Plagiator =",
    options: ["Penjahat", "Penjiplak", "Peserta Ujian", "Pekerja Keras", "Pemalas"],
    answer: 1,
    explanation: "Plagiator adalah orang yang menjiplak karya orang lain."
  },
  {
    id: "gma-verbal-047",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Prominen =",
    options: ["Terkemuka", "Pendukung", "Pelopor", "Setuju", "Biasa"],
    answer: 0,
    explanation: "Prominen berarti menonjol atau terkemuka."
  },
  {
    id: "gma-verbal-048",
    section: "GMA Verbal",
    category: "Sinonim",
    question: "Iterasi =",
    options: ["Interaksi", "Hubungan", "Perulangan", "Jalur", "Pemilihan"],
    answer: 2,
    explanation: "Iterasi berarti proses pengulangan suatu langkah."
  },
  {
    id: "gma-verbal-049",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Pemupukan ><",
    options: ["Rehabilitasi", "Reboisasi", "Penggundulan", "Defertilisasi", "Renovasi"],
    answer: 3,
    explanation: "Pemupukan adalah fertilisasi untuk menyuburkan tanah, sehingga lawannya adalah defertilisasi."
  },
  {
    id: "gma-verbal-050",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Hirau ><",
    options: ["Lupa", "Ingat", "Lalai", "Kolase", "Acuh"],
    answer: 2,
    explanation: "Hirau berarti peduli atau memperhatikan, sehingga lawannya adalah lalai."
  },
  {
    id: "gma-verbal-051",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Tesis ><",
    options: ["Hipotesis", "Epitesis", "Sintetis", "Antithesis", "Sintaksis"],
    answer: 3,
    explanation: "Dalam logika dialektika, tesis berlawanan dengan antitesis."
  },
  {
    id: "gma-verbal-052",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Ultima ><",
    options: ["Kesan", "Akhir", "Final", "Awal", "Biasa"],
    answer: 3,
    explanation: "Ultima berarti terakhir atau penghabisan, sehingga lawannya adalah awal."
  },
  {
    id: "gma-verbal-053",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Gugur ><",
    options: ["Rontok", "Tunas", "Salju", "Jatuh", "Tumbuh"],
    answer: 4,
    explanation: "Gugur berarti jatuh atau rontok, sehingga lawannya adalah tumbuh."
  },
  {
    id: "gma-verbal-054",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Kohesi ><",
    options: ["Adhesi", "Swasembada", "Agresi", "Penarikan", "Pemisahan"],
    answer: 0,
    explanation: "Kohesi adalah gaya tarik antarmolekul sejenis, lawannya adhesi yaitu gaya tarik antarmolekul tidak sejenis."
  },
  {
    id: "gma-verbal-055",
    section: "GMA Verbal",
    category: "Antonim",
    question: "Aktual ><",
    options: ["Kadaluwarsa", "Nyata", "Baru", "Penting", "Fiktif"],
    answer: 0,
    explanation: "Aktual berarti masih hangat atau terbaru, sehingga lawannya adalah kadaluwarsa."
  }
];
