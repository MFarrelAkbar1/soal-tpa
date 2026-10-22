// Tipe data section BCA Finance: studi kasus esai, tidak dinilai otomatis.

export type KelompokBca =
  | "Studi Kasus PDP"
  | "Studi Kasus Sulit"
  | "Account Solution & Recovery"
  | "Pertanyaan Lanjutan ASR"
  | "Kasus Presentasi PDP"
  | "Analisis Data Cabang";

export interface TabelData {
  judul: string;
  kolom: string[];
  baris: string[][];
}

export interface DaftarButir {
  judul: string;
  butir: string[];
}

// Satu teks bacaan (passage) yang dipakai oleh satu atau beberapa soal (caseId).
export interface Kasus {
  id: string;
  judul: string;
  kelompok: KelompokBca;
  passage: string[]; // paragraf teks kasus
  tabel?: TabelData[];
  tugas?: DaftarButir[]; // mis. "Peserta diminta untuk"
  keterangan?: string; // sumber dan variasi teks antar-PDF
  sumber: string[]; // nama file PDF
  ujian: boolean; // ikut diacak di Mode Ujian
  checklist: "pdp" | "asr"; // set poin penilaian diri yang dipakai di halaman hasil
}

export interface ContohJawaban {
  label: string; // mis. "Singkat", "Lengkap"
  sumber: string;
  paragraf: string[];
  poin?: DaftarButir[];
}

export interface SoalEsai {
  id: string;
  type: "essay";
  section: "BCA Finance";
  category: KelompokBca;
  caseId: string;
  question: string;
  answer: ContohJawaban[] | null; // null = PDF tidak memuat contoh jawaban
}

export interface PaketBca {
  id: "cepat" | "penuh";
  nama: string;
  jumlahKasus: number;
  detik: number;
}
