import type { Rekap, Soal } from "../types";

export const HURUF = "ABCDEF".split("");

export function pad(n: number): string {
  return n < 10 ? "0" + n : String(n);
}

export function formatWaktu(detik: number): string {
  if (detik < 0) detik = 0;
  return pad(Math.floor(detik / 60)) + ":" + pad(detik % 60);
}

export function keAtas(): void {
  const halus = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior: halus });
}

export function acakSalinan<T>(daftar: T[]): T[] {
  const hasil = daftar.slice();
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

export function labelOpsi(s: Soal, i: number | null): string {
  if (i === null || !s.options[i]) return "—";
  const teks = s.options[i];
  return teks === HURUF[i] ? HURUF[i] : HURUF[i] + " · " + teks;
}

export function altGambar(s: Soal, nomor: number): string {
  return "Soal penalaran gambar nomor " + nomor + ". " + s.question +
    " Deret gambar beserta pilihan jawaban A sampai " + HURUF[s.options.length - 1] +
    " ditampilkan di dalam gambar ini.";
}

export function srcGambar(path: string): string {
  return import.meta.env.BASE_URL + path;
}

export function catatan(persen: number): string {
  if (persen >= 85) return "Penguasaan sudah kuat. Tinggal jaga kecepatan.";
  if (persen >= 70) return "Sudah solid. Ulang bagian yang skornya paling rendah.";
  if (persen >= 50) return "Pondasinya ada. Fokus latih kategori terlemah dulu.";
  return "Baca lagi penjelasan tiap soal, lalu ulangi dari awal.";
}

export function tambahRekap(rekap: Rekap, kategori: string, tepat: boolean): Rekap {
  const lama = rekap[kategori] ?? { benar: 0, total: 0 };
  return { ...rekap, [kategori]: { benar: lama.benar + (tepat ? 1 : 0), total: lama.total + 1 } };
}
