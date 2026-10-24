// Psikotes BCA Finance dari "Jawaban BCA Finance Update.pdf". Ubah durasi cukup di sini.
export const PSIKOTES = {
  // TIU 5: 30 soal asli, urutan sesuai PDF
  tiu5: { detik: 10 * 60 },
  // TIU 5 soal baru: 30 soal buatan sendiri bergaya TIU 5 (bukan dari PDF)
  tiu5Baru: { detik: 10 * 60 },
  // PAPI Kostik: batas waktu opsional yang bisa dinyalakan peserta (PDF tidak menyebut durasi)
  papi: { detikOpsional: 30 * 60 },
} as const;
