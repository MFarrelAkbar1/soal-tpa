import type { PaketUjian, Rekap, Soal } from "./types";
import { tambahRekap } from "./lib/util";

export type Layar = "menu" | "latihan" | "ujian" | "hasil-latihan" | "hasil-ujian";

export interface Sesi {
  layar: Layar;
  soal: Soal[];
  indeks: number;
  pilihan: (number | null)[]; // jawaban peserta per soal (null = belum dijawab)
  benar: number;
  dijawab: number;
  rekap: Rekap;
  paket: PaketUjian | null;
  sisaDetik: number;
  habisWaktu: boolean;
  terpakai: number;
  nomorSesi: number; // naik tiap sesi dimulai, untuk memicu scroll ke atas
}

export type Aksi =
  | { type: "menu" }
  | { type: "mulai-latihan"; soal: Soal[] }
  | { type: "mulai-ujian"; paket: PaketUjian; soal: Soal[] }
  | { type: "jawab"; i: number }
  | { type: "lanjut" }
  | { type: "ke-soal"; i: number }
  | { type: "detik" }
  | { type: "selesai"; karenaWaktuHabis: boolean };

export const sesiAwal: Sesi = {
  layar: "menu",
  soal: [],
  indeks: 0,
  pilihan: [],
  benar: 0,
  dijawab: 0,
  rekap: {},
  paket: null,
  sisaDetik: 0,
  habisWaktu: false,
  terpakai: 0,
  nomorSesi: 0,
};

function sesiBaru(s: Sesi, layar: Layar, soal: Soal[], paket: PaketUjian | null): Sesi {
  return {
    ...sesiAwal,
    layar,
    soal,
    paket,
    pilihan: soal.map(() => null),
    sisaDetik: paket ? paket.detik : 0,
    nomorSesi: s.nomorSesi + 1,
  };
}

function selesaikanUjian(s: Sesi, karenaWaktuHabis: boolean): Sesi {
  if (!s.paket) return s;
  let benar = 0, dijawab = 0, rekap: Rekap = {};
  s.soal.forEach((soal, i) => {
    const p = s.pilihan[i];
    const tepat = p !== null && soal.answer !== null && p === soal.answer;
    if (p !== null) dijawab++;
    if (tepat) benar++;
    rekap = tambahRekap(rekap, soal.category, tepat);
  });
  return {
    ...s,
    layar: "hasil-ujian",
    benar,
    dijawab,
    rekap,
    habisWaktu: karenaWaktuHabis,
    terpakai: s.paket.detik - s.sisaDetik,
  };
}

export function sesiReducer(s: Sesi, a: Aksi): Sesi {
  switch (a.type) {
    case "menu":
      return { ...sesiAwal, nomorSesi: s.nomorSesi + 1 };

    case "mulai-latihan":
      return sesiBaru(s, "latihan", a.soal, null);

    case "mulai-ujian":
      return sesiBaru(s, "ujian", a.soal, a.paket);

    case "jawab": {
      const pilihan = s.pilihan.slice();
      pilihan[s.indeks] = a.i;
      if (s.layar === "ujian") return { ...s, pilihan };
      if (s.layar !== "latihan" || s.pilihan[s.indeks] !== null) return s;
      const soal = s.soal[s.indeks];
      const tepat = soal.answer !== null && a.i === soal.answer;
      return {
        ...s,
        pilihan,
        dijawab: s.dijawab + 1,
        benar: s.benar + (tepat ? 1 : 0),
        rekap: tambahRekap(s.rekap, soal.category, tepat),
      };
    }

    case "lanjut":
      if (s.layar !== "latihan" || s.pilihan[s.indeks] === null) return s;
      if (s.indeks === s.soal.length - 1) return { ...s, layar: "hasil-latihan" };
      return { ...s, indeks: s.indeks + 1 };

    case "ke-soal":
      if (s.layar !== "ujian" || a.i < 0 || a.i >= s.soal.length || a.i === s.indeks) return s;
      return { ...s, indeks: a.i };

    case "detik":
      if (s.layar !== "ujian") return s;
      if (s.sisaDetik - 1 <= 0) return selesaikanUjian({ ...s, sisaDetik: 0 }, true);
      return { ...s, sisaDetik: s.sisaDetik - 1 };

    case "selesai":
      if (s.layar !== "ujian") return s;
      return selesaikanUjian(s, a.karenaWaktuHabis);
  }
}
