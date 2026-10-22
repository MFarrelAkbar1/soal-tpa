import type { PaketBca } from "../bca/types";

// Paket Mode Ujian BCA Finance: kasus diambil acak dari kasus yang ujian: true.
// Durasi simulasi penuh mengikuti tes asli (±2,5 jam).
export const PAKET_BCA: PaketBca[] = [
  { id: "cepat", nama: "Latihan cepat", jumlahKasus: 1, detik: 30 * 60 },
  { id: "penuh", nama: "Simulasi penuh", jumlahKasus: 4, detik: 150 * 60 },
];

// Format jawaban Mode Ujian mengikuti template 5 slide di PDF.
export const BAGIAN_SLIDE = [
  { id: "judul", label: "Slide 1 · Judul", petunjuk: "Nama peserta dan judul kasus" },
  { id: "analisis", label: "Slide 2 · Analisis Masalah", petunjuk: "Masalah, penyebab, dan risiko" },
  { id: "solusi", label: "Slide 3 · Solusi yang Diusulkan", petunjuk: "Prioritas dan langkah solusi" },
  { id: "alasan", label: "Slide 4 · Alasan dan Pertimbangan", petunjuk: "Mengapa solusi ini dipilih" },
  { id: "kesimpulan", label: "Slide 5 · Penutup / Kesimpulan", petunjuk: "Kesimpulan dan tindak lanjut" },
] as const;
