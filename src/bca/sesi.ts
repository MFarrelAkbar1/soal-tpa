import type { PaketBca } from "./types";
import { kasusBca, soalBca } from "./data";
import { PAKET_BCA } from "../config/paket-bca";
import { acakSalinan } from "../lib/util";

// Sesi BCA Finance. Mode latihan berjalan per soal; mode ujian per kasus (format 5 slide).
// Seluruh sesi disimpan ke localStorage setiap kali berubah, termasuk jawaban yang sedang diketik.

export type ModeBca = "latihan" | PaketBca["id"];

export interface SesiBca {
  versi: 1;
  mode: ModeBca;
  unit: string[]; // latihan: id soal; ujian: id kasus
  indeks: number;
  jawaban: Record<string, string>; // latihan: id soal; ujian: "<id kasus>:<bagian slide>"
  cek: Record<string, boolean>; // "<id unit>:<grup>:<item>"
  mulai: number; // epoch ms
  berakhir: number | null; // epoch ms; null = tanpa batas waktu
  selesai: { pada: number; habisWaktu: boolean } | null;
}

const KUNCI = "soal-tpa:bca-sesi:v1";

export function paketDariMode(mode: ModeBca): PaketBca | null {
  return PAKET_BCA.find((p) => p.id === mode) ?? null;
}

export function sesiBaru(mode: ModeBca): SesiBca {
  const paket = paketDariMode(mode);
  const sekarang = Date.now();
  const unit = paket
    ? acakSalinan(kasusBca.filter((k) => k.ujian)).slice(0, paket.jumlahKasus).map((k) => k.id)
    : soalBca.map((s) => s.id);
  return {
    versi: 1,
    mode,
    unit,
    indeks: 0,
    jawaban: {},
    cek: {},
    mulai: sekarang,
    berakhir: paket ? sekarang + paket.detik * 1000 : null,
    selesai: null,
  };
}

export function selesaikan(s: SesiBca, habisWaktu: boolean): SesiBca {
  if (s.selesai) return s;
  const pada = habisWaktu && s.berakhir ? s.berakhir : Date.now();
  return { ...s, selesai: { pada, habisWaktu } };
}

export function kunciSlide(caseId: string, bagian: string): string {
  return caseId + ":" + bagian;
}

export function muatSesi(): SesiBca | null {
  let mentah: string | null = null;
  try {
    mentah = window.localStorage.getItem(KUNCI);
  } catch {
    return null;
  }
  if (!mentah) return null;
  try {
    const s = JSON.parse(mentah) as SesiBca;
    if (s.versi !== 1 || !Array.isArray(s.unit) || s.unit.length === 0) return null;
    if (s.mode !== "latihan" && !paketDariMode(s.mode)) return null;
    // buang sesi lama bila bank soal berubah dan id-nya sudah tidak ada
    const ada = s.mode === "latihan"
      ? (id: string) => soalBca.some((x) => x.id === id)
      : (id: string) => kasusBca.some((x) => x.id === id);
    if (!s.unit.every(ada)) return null;
    return {
      ...s,
      indeks: Math.min(Math.max(0, s.indeks | 0), s.unit.length - 1),
      jawaban: s.jawaban ?? {},
      cek: s.cek ?? {},
    };
  } catch {
    return null;
  }
}

// true bila berhasil ditulis; false bila penyimpanan tidak tersedia (sesi tetap jalan di memori)
export function simpanSesi(s: SesiBca | null): boolean {
  try {
    if (s) window.localStorage.setItem(KUNCI, JSON.stringify(s));
    else window.localStorage.removeItem(KUNCI);
    return true;
  } catch {
    return false;
  }
}

export function sisaDetik(s: SesiBca, sekarang: number): number | null {
  if (s.berakhir === null) return null;
  const akhir = s.selesai ? Math.min(s.selesai.pada, s.berakhir) : sekarang;
  return Math.max(0, Math.ceil((s.berakhir - akhir) / 1000));
}

export function namaMode(mode: ModeBca): string {
  return mode === "latihan" ? "Mode Latihan" : paketDariMode(mode)!.nama;
}
