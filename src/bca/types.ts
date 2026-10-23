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

// ---------- Psikotes dari "Jawaban BCA Finance Update.pdf" ----------

// TIU 5: analogi gambar asli. Gambar dipotong dari PDF ke public/bca-tiu5/.
export interface SoalTiu5 {
  id: string;
  nomor: number; // 1–30, urutan sesuai PDF
  kunci: number; // 1–5, dibaca dari lingkaran di halaman 4–5
  pembahasan: string; // dibuat sendiri; PDF tidak memuat pembahasan
  aturanJelas: boolean; // false bila aturan A→B tidak bisa dipastikan dari gambar
}

// PAPI Kostik: pilih pernyataan a atau b. Tidak ada jawaban benar/salah.
export interface PernyataanPapi {
  id: string;
  nomor: number;
  a: string;
  b: string;
}

// CBI: jawab B (Benar) atau S (Salah). Tidak ada kunci.
export interface PernyataanCbi {
  id: string;
  nomor: number;
  teks: string;
}
