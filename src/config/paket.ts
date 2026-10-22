import type { PaketUjian } from "../types";

// Paket Mode Ujian: jumlah soal yang diambil acak dari pool section + batas waktunya.
// Tambah paket baru cukup dengan menambah satu objek di sini.
export const PAKET: PaketUjian[] = [
  { id: "gma-verbal", section: "GMA Verbal", jumlah: 17, detik: 480 },
  { id: "gma-numerical", section: "GMA Numerical", jumlah: 15, detik: 600 },
  { id: "smart-ability", section: "Smart Ability to Learn", jumlah: 15, detik: 480 },
];
