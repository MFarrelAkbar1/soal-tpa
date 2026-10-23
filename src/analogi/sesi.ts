import type { Rekap } from "../types";
import type { SoalAnalogi } from "./generator";
import { JUMLAH_OPSI, NAMA_TINGKAT, SEMUA_TINGKAT, buatPaket } from "./generator";
import { benihAcak, buatAcak } from "./acak";
import { ANALOGI } from "../config/analogi";
import { tambahRekap } from "../lib/util";

// Sesi Analogi Gambar. Soal dibuat baru setiap sesi dimulai, lalu seluruh sesi
// (soal, jawaban, waktu akhir) disimpan ke localStorage supaya tahan refresh.

export type ModeAnalogi = "latihan" | "ujian";

export interface SesiAnalogi {
  versi: 1;
  mode: ModeAnalogi;
  soal: SoalAnalogi[];
  indeks: number;
  pilihan: (number | null)[];
  mulai: number; // epoch ms
  berakhir: number | null; // epoch ms; null = tanpa batas waktu
  selesai: { pada: number; habisWaktu: boolean } | null;
}

const KUNCI = "soal-tpa:analogi-sesi:v1";

export function sesiBaru(mode: ModeAnalogi): SesiAnalogi {
  const benih = benihAcak();
  const komposisi = mode === "ujian" ? ANALOGI.ujian.komposisi : ANALOGI.latihan.komposisi;
  const soal = buatPaket(komposisi, buatAcak(benih), "ag-" + benih.toString(36), mode === "ujian");
  const sekarang = Date.now();
  return {
    versi: 1,
    mode,
    soal,
    indeks: 0,
    pilihan: soal.map(() => null),
    mulai: sekarang,
    berakhir: mode === "ujian" ? sekarang + ANALOGI.ujian.detik * 1000 : null,
    selesai: null,
  };
}

export function selesaikan(s: SesiAnalogi, habisWaktu: boolean): SesiAnalogi {
  if (s.selesai) return s;
  const pada = habisWaktu && s.berakhir ? s.berakhir : Date.now();
  return { ...s, selesai: { pada, habisWaktu } };
}

export function jawab(s: SesiAnalogi, i: number): SesiAnalogi {
  if (s.selesai || i < 0 || i >= JUMLAH_OPSI) return s;
  // mode latihan: jawaban pertama langsung dikunci karena kunci & pembahasan sudah tampil
  if (s.mode === "latihan" && s.pilihan[s.indeks] !== null) return s;
  const pilihan = s.pilihan.slice();
  pilihan[s.indeks] = i;
  return { ...s, pilihan };
}

export function keSoal(s: SesiAnalogi, i: number): SesiAnalogi {
  return i < 0 || i >= s.soal.length || i === s.indeks ? s : { ...s, indeks: i };
}

export function hitung(s: SesiAnalogi): { benar: number; dijawab: number; rekap: Rekap } {
  let benar = 0, dijawab = 0;
  // rekap diisi berurutan Mudah → Sedang → Sulit agar grafik tampil urut
  let rekap: Rekap = {};
  for (const t of SEMUA_TINGKAT) {
    s.soal.forEach((soal, i) => {
      if (soal.tingkat !== t) return;
      const p = s.pilihan[i];
      const tepat = p === soal.kunci;
      if (p !== null) dijawab++;
      if (tepat) benar++;
      rekap = tambahRekap(rekap, NAMA_TINGKAT[t], tepat);
    });
  }
  return { benar, dijawab, rekap };
}

export function muatSesi(): SesiAnalogi | null {
  let mentah: string | null = null;
  try {
    mentah = window.localStorage.getItem(KUNCI);
  } catch {
    return null;
  }
  if (!mentah) return null;
  try {
    const s = JSON.parse(mentah) as SesiAnalogi;
    if (s.versi !== 1 || (s.mode !== "latihan" && s.mode !== "ujian")) return null;
    if (!Array.isArray(s.soal) || s.soal.length === 0 || !Array.isArray(s.pilihan)) return null;
    if (s.pilihan.length !== s.soal.length) return null;
    if (!s.soal.every((x) => Array.isArray(x.opsi) && x.opsi.length === JUMLAH_OPSI && x.a && x.b && x.c)) return null;
    return { ...s, indeks: Math.min(Math.max(0, s.indeks | 0), s.soal.length - 1) };
  } catch {
    return null;
  }
}

// true bila berhasil ditulis; false bila penyimpanan tidak tersedia (sesi tetap jalan di memori)
export function simpanSesi(s: SesiAnalogi | null): boolean {
  try {
    if (s) window.localStorage.setItem(KUNCI, JSON.stringify(s));
    else window.localStorage.removeItem(KUNCI);
    return true;
  } catch {
    return false;
  }
}

export function sisaDetik(s: SesiAnalogi, sekarang: number): number | null {
  if (s.berakhir === null) return null;
  const akhir = s.selesai ? Math.min(s.selesai.pada, s.berakhir) : sekarang;
  return Math.max(0, Math.ceil((s.berakhir - akhir) / 1000));
}

export function namaMode(mode: ModeAnalogi): string {
  return mode === "latihan" ? "Mode Latihan" : "Mode Ujian";
}
