import type { Komposisi } from "../analogi/generator";

// Analogi Gambar: soal dibuat ulang oleh generator setiap attempt.
// Ubah jumlah soal per tingkat atau durasi ujian cukup di sini.
export const ANALOGI: {
  ujian: { komposisi: Komposisi; detik: number };
  latihan: { komposisi: Komposisi };
} = {
  ujian: { komposisi: { mudah: 8, sedang: 8, sulit: 4 }, detik: 10 * 60 },
  latihan: { komposisi: { mudah: 8, sedang: 8, sulit: 4 } },
};
