import type { Rekap } from "../types";
import { JUMLAH_OPSI, NAMA_TINGKAT, SEMUA_TINGKAT, buatPaket } from "./generator";
import { benihAcak, buatAcak } from "./acak";
import type { SoalTampil } from "./tampil";
import { dariGenerator, dariTiu5, dariTiu5Baru } from "./tampil";
import { ANALOGI } from "../config/analogi";
import { PSIKOTES } from "../config/psikotes";
import { SOAL_TIU5 } from "../bca/data/tiu5";
import { SOAL_TIU5_BARU } from "../bca/data/tiu5-baru";
import { tambahRekap } from "../lib/util";

// Sesi Analogi Gambar. Soal generator dibuat baru setiap sesi dimulai; soal asli TIU 5
// selalu 30 soal sesuai urutan PDF, soal baru TIU 5 selalu 30 soal buatan sendiri. Seluruh sesi (soal, jawaban, waktu akhir) disimpan
// ke localStorage supaya tahan refresh.

export type ModeAnalogi = "latihan" | "ujian" | "tiu5-latihan" | "tiu5-ujian" | "tiu5baru-latihan" | "tiu5baru-ujian";

const SEMUA_MODE: ModeAnalogi[] = ["latihan", "ujian", "tiu5-latihan", "tiu5-ujian", "tiu5baru-latihan", "tiu5baru-ujian"];

// soal TIU 5, baik soal asli PDF maupun soal baru
export function modeTiu5(mode: ModeAnalogi): boolean {
  return mode !== "latihan" && mode !== "ujian";
}

export function modeTiu5Baru(mode: ModeAnalogi): boolean {
  return mode === "tiu5baru-latihan" || mode === "tiu5baru-ujian";
}

export function modeLatihan(mode: ModeAnalogi): boolean {
  return mode === "latihan" || mode === "tiu5-latihan" || mode === "tiu5baru-latihan";
}

export function durasiDetik(mode: ModeAnalogi): number | null {
  if (mode === "ujian") return ANALOGI.ujian.detik;
  if (mode === "tiu5-ujian") return PSIKOTES.tiu5.detik;
  if (mode === "tiu5baru-ujian") return PSIKOTES.tiu5Baru.detik;
  return null;
}

export interface SesiAnalogi {
  versi: 2;
  mode: ModeAnalogi;
  soal: SoalTampil[];
  indeks: number;
  pilihan: (number | null)[];
  mulai: number; // epoch ms
  berakhir: number | null; // epoch ms; null = tanpa batas waktu
  selesai: { pada: number; habisWaktu: boolean } | null;
}

const KUNCI = "soal-tpa:analogi-sesi:v2";

function buatSoal(mode: ModeAnalogi): SoalTampil[] {
  if (modeTiu5Baru(mode)) return SOAL_TIU5_BARU.map(dariTiu5Baru);
  if (modeTiu5(mode)) return SOAL_TIU5.map(dariTiu5);
  const benih = benihAcak();
  const komposisi = mode === "ujian" ? ANALOGI.ujian.komposisi : ANALOGI.latihan.komposisi;
  return buatPaket(komposisi, buatAcak(benih), "ag-" + benih.toString(36), mode === "ujian").map(dariGenerator);
}

export function sesiBaru(mode: ModeAnalogi): SesiAnalogi {
  const soal = buatSoal(mode);
  const sekarang = Date.now();
  const detik = durasiDetik(mode);
  return {
    versi: 2,
    mode,
    soal,
    indeks: 0,
    pilihan: soal.map(() => null),
    mulai: sekarang,
    berakhir: detik === null ? null : sekarang + detik * 1000,
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
  if (modeLatihan(s.mode) && s.pilihan[s.indeks] !== null) return s;
  const pilihan = s.pilihan.slice();
  pilihan[s.indeks] = i;
  return { ...s, pilihan };
}

export function keSoal(s: SesiAnalogi, i: number): SesiAnalogi {
  return i < 0 || i >= s.soal.length || i === s.indeks ? s : { ...s, indeks: i };
}

export function hitung(s: SesiAnalogi): { benar: number; dijawab: number; rekap: Rekap } {
  let benar = 0, dijawab = 0;
  // rekap diisi berurutan Mudah → Sedang → Sulit (lalu kelompok lain) agar grafik tampil urut
  const urutan = [...SEMUA_TINGKAT.map((t) => NAMA_TINGKAT[t]), ...new Set(s.soal.map((x) => x.kelompok))];
  let rekap: Rekap = {};
  for (const k of new Set(urutan)) {
    s.soal.forEach((soal, i) => {
      if (soal.kelompok !== k) return;
      const p = s.pilihan[i];
      const tepat = p === soal.kunci;
      if (p !== null) dijawab++;
      if (tepat) benar++;
      rekap = tambahRekap(rekap, k, tepat);
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
    if (s.versi !== 2 || !SEMUA_MODE.includes(s.mode)) return null;
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
  switch (mode) {
    case "latihan": return "Mode Latihan";
    case "ujian": return "Mode Ujian";
    case "tiu5-latihan": return "Soal asli TIU 5 · Latihan";
    case "tiu5-ujian": return "Soal asli TIU 5 · Ujian";
    case "tiu5baru-latihan": return "Soal baru TIU 5 · Latihan";
    case "tiu5baru-ujian": return "Soal baru TIU 5 · Ujian";
  }
}
