import type { Soal } from "../types";

// Smart Ability to Learn — 17 soal, dipindah apa adanya dari index.html lama.
// answer = indeks opsi (0 = A, 1 = B, ...) atau null bila belum ada kunci.
// image  = path relatif terhadap folder public/.

export const smartAbility: Soal[] = [
  {
    id: "smart-ability-001",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-1.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 1,
    explanation: "Panah tebal terus berputar mengikuti irama yang tetap, sedangkan garis tipis di sudut kotak membalik arah setiap satu langkah. Kelanjutan putaran itu menghasilkan panah tebal yang miring ke kanan-bawah dengan garis tipis menunjuk ke kanan, seperti pilihan B."
  },
  {
    id: "smart-ability-002",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-2.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 1,
    explanation: "Keempat simbol pada batang (persegi, T, Y, dan segitiga) bergeser satu posisi ke arah ujung batang pada setiap langkah, sehingga polanya berulang setiap empat gambar. Gambar kelima sudah sama dengan gambar pertama, maka gambar keenam harus sama dengan gambar kedua, yaitu pilihan B."
  },
  {
    id: "smart-ability-003",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-3.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 2,
    explanation: "Simbol besar pada setiap kotak adalah simbol kecil dari kotak sebelumnya yang diperbesar dan diputar: S menjadi S besar, N menjadi N besar, L menjadi L besar, dan seterusnya. Simbol kecil pada kotak kelima berbentuk zigzag, sehingga gambar berikutnya menampilkan zigzag itu dalam ukuran besar, yaitu pilihan C."
  },
  {
    id: "smart-ability-004",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-4.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 2,
    explanation: "Simbol besar pada tiap kotak adalah simbol kecil dari kotak sebelumnya yang diperbesar dan diputar. Karena simbol kecil pada kotak kelima berupa zigzag, gambar berikutnya harus memuat zigzag berukuran besar, yaitu pilihan C."
  },
  {
    id: "smart-ability-005",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-5.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 4,
    explanation: "Jumlah sisi bangun dan jumlah bagian di dalamnya bertambah satu setiap langkah: segitiga 3 bagian, persegi 4 bagian, segi lima 5 bagian, segi enam 6 bagian, segi tujuh 7 bagian. Gambar berikutnya harus berupa segi delapan yang terbagi menjadi 8 bagian, yaitu pilihan E."
  },
  {
    id: "smart-ability-006",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-6.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 3,
    explanation: "Polanya berselang-seling: satu bangun kecil, lalu bangun besar yang memuat bangun berikutnya, dengan jumlah sisi terus bertambah (lingkaran, segitiga, segi empat, segi lima). Setelah persegi kecil, gambar berikutnya adalah persegi besar yang memuat segi lima, yaitu pilihan D."
  },
  {
    id: "smart-ability-007",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-7.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 1,
    explanation: "Cabang di sisi kanan pohon menghilang bertahap: cabang teratas mula-mula menyusut menjadi garis lurus, lalu hilang sama sekali, kemudian giliran cabang di bawahnya. Pada gambar keenam cabang kanan ketiga berubah menjadi garis dan hanya dua cabang segitiga terbawah yang tersisa, yaitu pilihan B."
  },
  {
    id: "smart-ability-008",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-8.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 0,
    explanation: "Anak panah dan titik hitam sama-sama berputar mengelilingi pusat elips, dan panah bergerak lebih cepat sehingga jaraknya dengan titik makin dekat pada setiap langkah. Kelanjutan putaran itu menempatkan panah di kuadran kanan-bawah sambil menunjuk ke kiri-atas dengan titik tepat di depannya, yaitu pilihan A."
  },
  {
    id: "smart-ability-009",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-9.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 2,
    explanation: "Rantai busur itu berubah satu busur pada tiap langkah, sehingga posisi lingkaran tertutup dan titik silang bergeser di sepanjang rantai. Pada gambar keenam lingkaran tertutup berada di tengah dan titik silang muncul di ujung kanan-atas, yaitu pilihan C."
  },
  {
    id: "smart-ability-010",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-10.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 4,
    explanation: "Ketiga simbol berpindah bergantian mengelilingi tepi kotak, dan pada setiap langkah hanya sebagian simbol yang bergerak sementara sisanya tetap. Setelah tanda sama dengan menempati sudut kanan-bawah, giliran huruf X menyusul ke sana sedangkan bintang bertahan di tepi kiri, yaitu pilihan E."
  },
  {
    id: "smart-ability-011",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-11.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 1,
    explanation: "Ketiga garis patah pada kotak berganti bentuk mengikuti siklusnya masing-masing, sehingga tidak semuanya berubah pada langkah yang sama. Kelanjutan ketiga siklus itu menghasilkan garis atas menyiku ke kanan-atas, garis tengah menyiku ke kanan-atas, dan garis bawah berbentuk L, yaitu pilihan B."
  },
  {
    id: "smart-ability-012",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-12.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E", "F"],
    answer: 1,
    explanation: "Polanya berselang-seling antara dua kotak hitam pada satu diagonal dan empat kotak hitam di keempat sudut, sedangkan arah diagonalnya bergantian. Setelah gambar berisi empat kotak, giliran dua kotak pada diagonal kiri-atas ke kanan-bawah, yaitu pilihan B."
  },
  {
    id: "smart-ability-013",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-13.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E", "F"],
    answer: 3,
    explanation: "Jumlah garis yang keluar dari titik pusat bertambah satu setiap langkah (3, 4, 5, 6), sementara satu-satunya anak panah berpindah seperempat putaran searah jarum jam: bawah, kiri, atas, lalu kanan. Gambar berikutnya karena itu memiliki tujuh garis dengan anak panah kembali menunjuk ke bawah, yaitu pilihan D."
  },
  {
    id: "smart-ability-014",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-14.png",
    question: "Apa yang berikutnya?",
    options: ["A", "B", "C", "D", "E", "F"],
    answer: 5,
    explanation: "Setiap langkah jumlah anak panah dan titik bertambah satu, dan seluruh kipas panah berputar 45 derajat searah jarum jam: atas; kanan-atas dan kanan; kanan sampai bawah; bawah sampai kiri. Gambar kelima harus memuat lima panah yang menyapu dari bawah, kiri-bawah, kiri, kiri-atas, sampai atas, yaitu pilihan F."
  },
  {
    id: "smart-ability-015",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-15.png",
    question: "Lengkapi analogi gambar berikut: gambar mana yang tepat menggantikan tanda tanya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 2,
    explanation: "Pada pasangan pembanding, bangun luar bertambah satu sisi (segitiga menjadi persegi), bangun yang semula di dalam pindah ke luar, dan bangun yang semula di luar masuk ke dalam. Belah ketupat berisi segi lima dengan persegi di sampingnya karena itu menjadi segi lima hitam berisi persegi putih dengan segi lima kecil di sampingnya, yaitu pilihan C."
  },
  {
    id: "smart-ability-016",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-16.png",
    question: "Lengkapi analogi gambar berikut: gambar mana yang tepat menggantikan tanda tanya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 2,
    explanation: "Pada pasangan pembanding, separuh bidang yang semula kosong berubah menjadi bagian yang diarsir, dan ketiga bangun kecil di sampingnya berubah bentuk dari persegi panjang menjadi segitiga dengan pola putih, arsir, putih. Aturan yang sama membuat setengah oval menjadi oval dengan separuh kanan terarsir dan tiga segitiga kecil di sampingnya, yaitu pilihan C."
  },
  {
    id: "smart-ability-017",
    section: "Smart Ability to Learn",
    category: "Penalaran Gambar",
    image: "smart-ability-to-learn/soal-17.png",
    question: "Lengkapi analogi gambar berikut: gambar mana yang tepat menggantikan tanda tanya?",
    options: ["A", "B", "C", "D", "E"],
    answer: 0,
    explanation: "Pada pasangan pembanding, bangun kecil di sisi atas dan di sisi bawah bertukar tempat, sementara bangun di sisi kiri dan bangun putih di dalam badan hitam tetap di tempatnya. Karena itu lingkaran naik ke atas, panah turun ke bawah, persegi panjang tetap di kiri, dan segi lima putih tetap di dalam, yaitu pilihan A."
  }
];
