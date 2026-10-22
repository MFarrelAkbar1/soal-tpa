import type { Soal } from "../types";

// GMA Numerical — 24 soal, dipindah apa adanya dari index.html lama.
// answer = indeks opsi (0 = A, 1 = B, ...) atau null bila belum ada kunci.
// image  = path relatif terhadap folder public/.

export const gmaNumerical: Soal[] = [
  {
    id: "gma-numerical-001",
    section: "GMA Numerical",
    category: "Numerik",
    question: "2, 4, 6, 8, 10, 12, ... Angka apa yang selanjutnya?",
    options: ["13", "14", "15", "16", "17", "18"],
    answer: 1,
    explanation: "Deret bertambah 2 pada setiap suku, sehingga setelah 12 adalah 14."
  },
  {
    id: "gma-numerical-002",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Sebuah mobil berjalan dengan kecepatan konstan 60 km/jam. Mobil tersebut berjalan selama 1,5 jam. Berapa jarak yang ditempuh?",
    options: ["60 km", "45 km", "90 km", "120 km", "70 km", "80 km"],
    answer: 2,
    explanation: "Jarak = kecepatan x waktu = 60 x 1,5 = 90 km."
  },
  {
    id: "gma-numerical-003",
    section: "GMA Numerical",
    category: "Numerik",
    question: "1.09, 1.20, 1.31, 1.42, ... Angka berapa yang berikutnya?",
    options: ["1.52", "1.54", "1.53", "1.48", "1.51", "1.62"],
    answer: 2,
    explanation: "Setiap suku bertambah 0,11 sehingga 1,42 + 0,11 = 1,53."
  },
  {
    id: "gma-numerical-004",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["14", "15", "8", "12", "10", "16"],
    answer: 1,
    explanation: "Hanya 15 yang merupakan bilangan ganjil, sedangkan lainnya genap."
  },
  {
    id: "gma-numerical-005",
    section: "GMA Numerical",
    category: "Numerik",
    question: "1, 2, 4, 7, 11, 16, ... Angka berapa yang berikutnya?",
    options: ["20", "21", "22", "19", "18", "23"],
    answer: 2,
    explanation: "Selisihnya bertambah satu setiap langkah (+1, +2, +3, +4, +5), sehingga 16 + 6 = 22."
  },
  {
    id: "gma-numerical-006",
    section: "GMA Numerical",
    category: "Numerik",
    question: "21 pada 7 seperti 18 pada...?",
    options: ["5", "4", "7", "8", "6", "3"],
    answer: 4,
    explanation: "Polanya adalah dibagi 3, sehingga 18 : 3 = 6."
  },
  {
    id: "gma-numerical-007",
    section: "GMA Numerical",
    category: "Numerik",
    question: "2.06, 3.12, 4.18, 5.24, ... Angka berapa yang berikutnya?",
    options: ["6.12", "5.81", "6.42", "6.3", "6.28", "6.4"],
    answer: 3,
    explanation: "Setiap suku bertambah 1,06 sehingga 5,24 + 1,06 = 6,30."
  },
  {
    id: "gma-numerical-008",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Mana dari hal-hal berikut ini yang tidak memiliki kesamaan?",
    options: ["2.4", "2.8", "1.3", "1.6", "1.2", "1.8"],
    answer: 2,
    explanation: "Hanya 1,3 yang bukan kelipatan 0,2 dan berdesimal ganjil, sedangkan lainnya berdesimal genap."
  },
  {
    id: "gma-numerical-009",
    section: "GMA Numerical",
    category: "Numerik",
    question: "12 pada 144 seperti 11 pada...?",
    options: ["110", "121", "128", "122", "124", "111"],
    answer: 1,
    explanation: "Polanya adalah bilangan dikuadratkan, sehingga 11 x 11 = 121."
  },
  {
    id: "gma-numerical-010",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Terdapat 526.000 di dalam kas kecil. Jika seorang sekretaris membeli 2 buah pulpen seharga Rp. 1.800 per buah dan 2 buah buku notes seharga Rp. 5.200 per buah. Berapakah sisa uang di dalam kas kecil?",
    options: ["450.000", "230.000", "512.000", "520.000", "510.000", "423.000"],
    answer: 2,
    explanation: "Total belanja = (2 x 1.800) + (2 x 5.200) = 14.000, sehingga sisa = 526.000 - 14.000 = 512.000."
  },
  {
    id: "gma-numerical-011",
    section: "GMA Numerical",
    category: "Numerik",
    question: "3, 3, 3, 3, 6, 6, 6, 9, 9, ... Angka berapa berikutnya?",
    options: ["21", "27", "12", "11", "15", "18"],
    answer: 2,
    explanation: "Angkanya naik kelipatan 3 dengan jumlah pengulangan yang berkurang (4 kali, 3 kali, 2 kali), sehingga berikutnya adalah 12 sebanyak satu kali."
  },
  {
    id: "gma-numerical-012",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Jika New York lima jam lebih lambat dari London dan Los Angeles tiga jam lebih lambat dari New York, pukul berapakah di Los Angeles jika di London pukul 4 siang?",
    options: ["6 Pagi", "7 Pagi", "4 Pagi", "5 Pagi", "10 Pagi", "8 Pagi"],
    answer: 5,
    explanation: "London pukul 16.00 berarti New York pukul 11.00, lalu dikurangi 3 jam menjadi pukul 08.00 pagi di Los Angeles."
  },
  {
    id: "gma-numerical-013",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Jika New York lima jam lebih lambat dari London dan pesawat meninggalkan London pukul 1.12 siang (waktu setempat) dan tiba di New York pada pukul 1.18 siang (waktu setempat). Berapa lamakah perjalanan yang ditempuh?",
    options: ["5 jam 42 menit", "5 jam 6 menit", "5 jam 8 menit", "5 jam 2 menit", "5 jam 15 menit", "5 jam 30 menit"],
    answer: 1,
    explanation: "Pukul 13.12 di London sama dengan pukul 08.12 di New York, sehingga sampai pukul 13.18 lamanya 5 jam 6 menit."
  },
  {
    id: "gma-numerical-014",
    section: "GMA Numerical",
    category: "Numerik",
    question: "15.000, 3.000, 600, 120, ... Angka berapa yang berikutnya?",
    options: ["15", "20", "24", "35", "45", "41"],
    answer: 2,
    explanation: "Setiap suku dibagi 5, sehingga 120 : 5 = 24."
  },
  {
    id: "gma-numerical-015",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Sebuah mobil melaju pada kecepatan rata-rata 40 km/jam pada 3 jam pertama selama 4 jam perjalanan. Jarak yang ditempuh 150 km. Berapakah kecepatan rata-rata mobil tersebut pada jam yang terakhir?",
    options: ["30 km/jam", "55 km/jam", "35 km/jam", "40 km/jam", "45 km/jam", "50 km/jam"],
    answer: 0,
    explanation: "Tiga jam pertama menempuh 3 x 40 = 120 km, sehingga sisa 30 km ditempuh dalam 1 jam terakhir."
  },
  {
    id: "gma-numerical-016",
    section: "GMA Numerical",
    category: "Numerik",
    question: "1, 1, 2, 3, 5, 8, 13, ... Angka berapa yang berikutnya?",
    options: ["21", "15", "18", "19", "23", "25"],
    answer: 0,
    explanation: "Deret Fibonacci, setiap suku adalah jumlah dua suku sebelumnya, sehingga 8 + 13 = 21."
  },
  {
    id: "gma-numerical-017",
    section: "GMA Numerical",
    category: "Numerik",
    question: "1.08 pada 0.54 seperti 0.54 pada...?",
    options: ["2.7", "0.18", "0.27", "0.26", "0.32", "0.23"],
    answer: 2,
    explanation: "Polanya adalah dibagi 2, sehingga 0,54 : 2 = 0,27."
  },
  {
    id: "gma-numerical-018",
    section: "GMA Numerical",
    category: "Numerik",
    question: "1/10 pada 0,1 seperti 3/5 pada ...?",
    options: ["0,3", "0,8", "0,4", "0,5", "0,6", "0,1"],
    answer: 4,
    explanation: "Pecahan diubah ke bentuk desimal, dan 3/5 sama dengan 0,6."
  },
  {
    id: "gma-numerical-019",
    section: "GMA Numerical",
    category: "Numerik",
    question: "7 pada 0 seperti 17 pada ...?",
    options: ["10", "1", "7", "11", "5", "3"],
    answer: 0,
    explanation: "Polanya adalah dikurangi 7, sehingga 17 - 7 = 10."
  },
  {
    id: "gma-numerical-020",
    section: "GMA Numerical",
    category: "Numerik",
    question: "5/3 pada 1/3 seperti 5 pada ...?",
    options: ["2/3", "2/5", "1", "1/3", "2", "3/5"],
    answer: 2,
    explanation: "Polanya adalah dibagi 5, sehingga 5 : 5 = 1."
  },
  {
    id: "gma-numerical-021",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Jika sebuah mesin memerlukan waktu 20 detik untuk mengisi 3 botol susu. Berapa banyak botol susu yang akan terisi dalam waktu 2 menit?",
    options: ["16", "12", "18", "9", "21", "15"],
    answer: 2,
    explanation: "2 menit = 120 detik, artinya ada 6 siklus 20 detik, sehingga 6 x 3 = 18 botol."
  },
  {
    id: "gma-numerical-022",
    section: "GMA Numerical",
    category: "Numerik",
    question: "Sebuah jam lebih cepat 3 detik setiap 24 jam. Jika jam tersebut benar pada pukul 8 malam hari sabtu, berapa detik lebih cepat pada jam 8 malam pada rabu selanjutnya?",
    options: ["12", "13.5", "10", "8", "16", "10.5"],
    answer: 0,
    explanation: "Dari Sabtu malam ke Rabu malam ada 4 hari, sehingga 4 x 3 detik = 12 detik."
  },
  {
    id: "gma-numerical-023",
    section: "GMA Numerical",
    category: "Numerik",
    question: "3, 6, 12, 24, ...",
    options: ["36", "48", "52", "60"],
    answer: 1,
    explanation: "Setiap suku dikalikan 2, sehingga 24 x 2 = 48."
  },
  {
    id: "gma-numerical-024",
    section: "GMA Numerical",
    category: "Numerik",
    question: "100, 95, 85, 70, ...",
    options: ["50", "55", "45", "60"],
    answer: 0,
    explanation: "Pengurangannya bertingkat (-5, -10, -15, -20), sehingga 70 - 20 = 50."
  }
];
