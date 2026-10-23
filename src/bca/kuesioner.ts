import { PERNYATAAN_PAPI } from "./data/papi";
import { PERNYATAAN_CBI } from "./data/cbi";
import { PSIKOTES } from "../config/psikotes";
import { pad } from "../lib/util";

// Sesi PAPI Kostik dan CBI: kuesioner kepribadian tanpa kunci dan tanpa skor.
// Jawaban disimpan ke localStorage setiap kali berubah; hasil akhirnya hanya ringkasan dan
// daftar jawaban yang bisa disalin/diunduh.

export type TesKuesioner = "papi" | "cbi";

export interface InfoTes {
  nama: string;
  pilihan: { kode: string; label: string }[]; // kode = jawaban yang disimpan & tombol shortcut
  jumlah: number;
}

export const INFO_TES: Record<TesKuesioner, InfoTes> = {
  papi: { nama: "PAPI Kostik", pilihan: [{ kode: "a", label: "A" }, { kode: "b", label: "B" }], jumlah: PERNYATAAN_PAPI.length },
  cbi: { nama: "CBI", pilihan: [{ kode: "B", label: "Benar" }, { kode: "S", label: "Salah" }], jumlah: PERNYATAAN_CBI.length },
};

export interface SesiKuesioner {
  versi: 1;
  tes: TesKuesioner;
  indeks: number;
  jawaban: (string | null)[];
  mulai: number; // epoch ms
  berakhir: number | null; // epoch ms; null = tanpa batas waktu
  selesai: { pada: number; habisWaktu: boolean } | null;
}

const KUNCI: Record<TesKuesioner, string> = {
  papi: "soal-tpa:papi-sesi:v1",
  cbi: "soal-tpa:cbi-sesi:v1",
};

export function sesiBaru(tes: TesKuesioner, pakaiBatasWaktu: boolean): SesiKuesioner {
  const sekarang = Date.now();
  return {
    versi: 1,
    tes,
    indeks: 0,
    jawaban: Array.from({ length: INFO_TES[tes].jumlah }, () => null),
    mulai: sekarang,
    berakhir: tes === "papi" && pakaiBatasWaktu ? sekarang + PSIKOTES.papi.detikOpsional * 1000 : null,
    selesai: null,
  };
}

export function jawab(s: SesiKuesioner, kode: string): SesiKuesioner {
  if (s.selesai || !INFO_TES[s.tes].pilihan.some((p) => p.kode === kode)) return s;
  const jawaban = s.jawaban.slice();
  jawaban[s.indeks] = kode;
  // lanjut otomatis ke pernyataan berikutnya; pernyataan terakhir tetap di tempat
  const indeks = Math.min(s.indeks + 1, jawaban.length - 1);
  return { ...s, jawaban, indeks };
}

export function ke(s: SesiKuesioner, i: number): SesiKuesioner {
  return i < 0 || i >= s.jawaban.length || i === s.indeks ? s : { ...s, indeks: i };
}

export function selesaikan(s: SesiKuesioner, habisWaktu: boolean): SesiKuesioner {
  if (s.selesai) return s;
  const pada = habisWaktu && s.berakhir ? s.berakhir : Date.now();
  return { ...s, selesai: { pada, habisWaktu } };
}

export function sisaDetik(s: SesiKuesioner, sekarang: number): number | null {
  if (s.berakhir === null) return null;
  const akhir = s.selesai ? Math.min(s.selesai.pada, s.berakhir) : sekarang;
  return Math.max(0, Math.ceil((s.berakhir - akhir) / 1000));
}

export function muatSesi(tes: TesKuesioner): SesiKuesioner | null {
  let mentah: string | null = null;
  try {
    mentah = window.localStorage.getItem(KUNCI[tes]);
  } catch {
    return null;
  }
  if (!mentah) return null;
  try {
    const s = JSON.parse(mentah) as SesiKuesioner;
    if (s.versi !== 1 || s.tes !== tes || !Array.isArray(s.jawaban)) return null;
    if (s.jawaban.length !== INFO_TES[tes].jumlah) return null;
    return { ...s, indeks: Math.min(Math.max(0, s.indeks | 0), s.jawaban.length - 1) };
  } catch {
    return null;
  }
}

// true bila berhasil ditulis; false bila penyimpanan tidak tersedia (sesi tetap jalan di memori)
export function simpanSesi(tes: TesKuesioner, s: SesiKuesioner | null): boolean {
  try {
    if (s) window.localStorage.setItem(KUNCI[tes], JSON.stringify(s));
    else window.localStorage.removeItem(KUNCI[tes]);
    return true;
  } catch {
    return false;
  }
}

function tanggal(ms: number): string {
  const d = new Date(ms);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
    " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

export function teksJawaban(s: SesiKuesioner): string {
  const info = INFO_TES[s.tes];
  const dijawab = s.jawaban.filter((j) => j !== null).length;
  const out = [
    "BCA Finance · " + info.nama,
    "Dimulai: " + tanggal(s.mulai) + (s.selesai ? " · Selesai: " + tanggal(s.selesai.pada) : ""),
    "Dijawab: " + dijawab + " dari " + info.jumlah + " (tidak ada skor; PDF tidak memuat aturan penilaian)",
    "=".repeat(60),
    "",
  ];
  s.jawaban.forEach((j, i) => {
    if (s.tes === "papi") {
      const p = PERNYATAAN_PAPI[i];
      const teks = j === "a" ? p.a : j === "b" ? p.b : "";
      out.push(p.nomor + ". " + (j ? j + " · " + teks : "(tidak dijawab)"));
    } else {
      const p = PERNYATAAN_CBI[i];
      out.push(p.nomor + ". " + (j ?? "-") + " · " + p.teks);
    }
  });
  return out.join("\n");
}

export function namaFile(s: SesiKuesioner): string {
  const d = new Date(s.selesai?.pada ?? s.mulai);
  return "jawaban-" + s.tes + "-" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
    "-" + pad(d.getHours()) + pad(d.getMinutes()) + ".txt";
}
