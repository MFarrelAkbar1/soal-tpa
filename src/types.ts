export type Section = "GMA Verbal" | "GMA Numerical" | "Smart Ability to Learn";

export interface Soal {
  id: string;
  section: Section;
  category: string;
  question: string;
  options: string[];
  answer: number | null; // indeks opsi (0 = A); null bila belum ada kunci
  explanation: string;
  image?: string; // path relatif terhadap public/
}

export interface PaketUjian {
  id: string;
  section: Section;
  jumlah: number; // soal yang diambil acak dari pool section
  detik: number;
}

export interface Rekap {
  [kategori: string]: { benar: number; total: number };
}
