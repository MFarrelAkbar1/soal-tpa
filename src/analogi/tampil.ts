import type { Gambar } from "./gambar";
import type { SoalAnalogi } from "./generator";
import { NAMA_TINGKAT } from "./generator";
import type { SoalTiu5 } from "../bca/types";
import { BAGIAN_GAMBAR, LABEL_PEMBAHASAN_TIU5, gambarTiu5 } from "../bca/data/tiu5";

// Bentuk soal yang ditampilkan UI Analogi Gambar: gambar SVG dari generator, atau
// potongan gambar PNG dari PDF (soal asli TIU 5).

export type Visual = Gambar | { src: string };

export interface SoalTampil {
  id: string;
  chip: string; // label kecil di kepala soal, mis. "Mudah" atau "Soal asli TIU 5"
  kelompok: string; // kunci rekap di halaman hasil
  a: Visual;
  b: Visual;
  c: Visual;
  opsi: Visual[];
  kunci: number; // indeks opsi (0 = gambar 1)
  penjelasan: string;
  labelPenjelasan: string | null; // mis. penanda pembahasan buatan sendiri
  catatanOpsi: string[] | null; // alasan tiap pilihan salah, bila ada
}

export function dariGenerator(s: SoalAnalogi): SoalTampil {
  return {
    id: s.id,
    chip: NAMA_TINGKAT[s.tingkat],
    kelompok: NAMA_TINGKAT[s.tingkat],
    a: s.a, b: s.b, c: s.c,
    opsi: s.opsi,
    kunci: s.kunci,
    penjelasan: s.penjelasan,
    labelPenjelasan: null,
    catatanOpsi: s.catatanOpsi,
  };
}

export function dariTiu5(s: SoalTiu5): SoalTampil {
  const [a, b, c, ...opsi] = BAGIAN_GAMBAR.map((x) => ({ src: gambarTiu5(s.nomor, x) }));
  return {
    id: s.id,
    chip: "TIU 5 · No. " + s.nomor,
    kelompok: s.aturanJelas ? "Aturan terlihat jelas" : "Aturan kurang jelas",
    a, b, c, opsi,
    kunci: s.kunci - 1,
    penjelasan: s.pembahasan,
    labelPenjelasan: LABEL_PEMBAHASAN_TIU5,
    catatanOpsi: null,
  };
}
