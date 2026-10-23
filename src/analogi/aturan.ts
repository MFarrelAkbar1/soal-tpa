import type { Bentuk, Gambar, Isi } from "./gambar";
import { BENTUK_LUAR, sah } from "./gambar";
import type { Acak } from "./acak";
import { pilih } from "./acak";

// Aturan transformasi A→B. Satu soal memakai paling banyak satu aturan per kategori.
// terapkan() mengembalikan null bila aturan tidak berlaku pada gambar itu
// (mis. memperkecil bangun yang sudah kecil).

export type Kategori = "ukuran" | "orientasi" | "isi" | "jumlah" | "sisi" | "titik" | "garis" | "susunan";

export interface Aturan {
  id: string;
  kategori: Kategori;
  kata: (g: Gambar) => string; // frasa pasif, mis. "diperkecil"
  terapkan: (g: Gambar) => Gambar | null;
  siapkan?: (g: Gambar, acak: Acak) => Gambar; // ubah gambar awal supaya aturan berlaku
}

// Pasangan kategori yang hasilnya bergantung urutan penerapan; tidak dipakai bersamaan.
const POJOK = [45, 135, 225, 315];

export const KATEGORI_BENTROK: [Kategori, Kategori][] = [["orientasi", "titik"], ["susunan", "sisi"]];

function mod360(d: number): number {
  return ((d % 360) + 360) % 360;
}

function jika(g: Gambar | null): Gambar | null {
  return g && sah(g) ? g : null;
}

function putar(deg: number): (g: Gambar) => Gambar | null {
  return (g) => jika({ ...g, rotasi: mod360(g.rotasi + deg), titik: g.titik === null ? null : mod360(g.titik + deg) });
}

// Pilih bangun yang tidak simetris supaya putaran/cerminan terlihat. Bangun yang simetris cermin
// selalu bisa ditafsirkan sebagai putaran juga, jadi kadang diberi titik di pojok untuk memecah simetrinya.
function bangunBerarah(g: Gambar, acak: Acak, peluang: number, peluangTitik: number): Gambar {
  let h = g;
  if (!h.dalam && (h.bentuk === "lingkaran" || acak() < peluang)) {
    h = { ...h, bentuk: pilih(acak, ["panah", "segitiga", "bintang", "segi-lima", "persegi-panjang"] as Bentuk[]) };
  }
  if (h.titik === null && acak() < peluangTitik) h = { ...h, jumlah: 1, titik: pilih(acak, POJOK) };
  return h;
}

function setIsi(target: Isi, kata: string, asal: Isi[]): Pick<Aturan, "kata" | "terapkan" | "siapkan"> {
  return {
    kata: (g) => (g.dalam ? "bangun dalamnya " : "") + kata,
    terapkan: (g) => (g.isi === target ? null : jika({ ...g, isi: target })),
    siapkan: (g, acak) => (asal.includes(g.isi) ? g : { ...g, isi: pilih(acak, asal) }),
  };
}

const SISI_BERIKUTNYA: Partial<Record<Bentuk, Bentuk>> = {
  segitiga: "persegi",
  persegi: "segi-lima",
  "segi-lima": "segi-enam",
};

function geserTitik(deg: number): (g: Gambar) => Gambar | null {
  return (g) => (g.titik === null ? null : jika({ ...g, titik: mod360(g.titik + deg) }));
}

function siapkanTitik(g: Gambar, acak: Acak): Gambar {
  return { ...g, jumlah: 1, titik: pilih(acak, POJOK) };
}

export const ATURAN: Aturan[] = [
  {
    id: "perkecil", kategori: "ukuran", kata: () => "diperkecil",
    terapkan: (g) => (g.ukuran === "besar" ? jika({ ...g, ukuran: "kecil" }) : null),
    siapkan: (g) => ({ ...g, ukuran: "besar" }),
  },
  {
    id: "perbesar", kategori: "ukuran", kata: () => "diperbesar",
    terapkan: (g) => (g.ukuran === "kecil" ? jika({ ...g, ukuran: "besar" }) : null),
    siapkan: (g) => ({ ...g, ukuran: "kecil" }),
  },
  { id: "putar-45", kategori: "orientasi", kata: () => "diputar 45° searah jarum jam", terapkan: putar(45), siapkan: (g, a) => bangunBerarah(g, a, 0.3, 0.3) },
  { id: "putar-45-balik", kategori: "orientasi", kata: () => "diputar 45° berlawanan arah jarum jam", terapkan: putar(-45), siapkan: (g, a) => bangunBerarah(g, a, 0.3, 0.3) },
  { id: "putar-90", kategori: "orientasi", kata: () => "diputar 90° searah jarum jam", terapkan: putar(90), siapkan: (g, a) => bangunBerarah(g, a, 0.5, 0.3) },
  { id: "putar-90-balik", kategori: "orientasi", kata: () => "diputar 90° berlawanan arah jarum jam", terapkan: putar(-90), siapkan: (g, a) => bangunBerarah(g, a, 0.5, 0.3) },
  { id: "putar-180", kategori: "orientasi", kata: () => "diputar 180°", terapkan: putar(180), siapkan: (g, a) => bangunBerarah(g, a, 0.5, 0.3) },
  {
    id: "cermin-h", kategori: "orientasi", kata: () => "dicerminkan secara horizontal (kiri–kanan)",
    terapkan: (g) => jika({ ...g, rotasi: mod360(-g.rotasi), cermin: !g.cermin, titik: g.titik === null ? null : mod360(-g.titik) }),
    siapkan: (g, a) => bangunBerarah(g, a, 0.8, 0.7),
  },
  {
    id: "cermin-v", kategori: "orientasi", kata: () => "dicerminkan secara vertikal (atas–bawah)",
    terapkan: (g) => jika({ ...g, rotasi: mod360(180 - g.rotasi), cermin: !g.cermin, titik: g.titik === null ? null : mod360(180 - g.titik) }),
    siapkan: (g, a) => bangunBerarah(g, a, 0.8, 0.7),
  },
  { id: "isi-hitam", kategori: "isi", ...setIsi("hitam", "diisi hitam", ["kosong", "kosong", "arsir"]) },
  { id: "kosongkan", kategori: "isi", ...setIsi("kosong", "dikosongkan (menjadi putih)", ["hitam", "hitam", "arsir"]) },
  { id: "arsir", kategori: "isi", ...setIsi("arsir", "diarsir", ["kosong", "kosong", "hitam"]) },
  {
    id: "tambah", kategori: "jumlah", kata: () => "jumlahnya ditambah satu",
    terapkan: (g) => jika({ ...g, jumlah: g.jumlah + 1 }),
    siapkan: (g, a) => ({ ...g, jumlah: pilih(a, [1, 2, 2, 3]), titik: null, dalam: null }),
  },
  {
    id: "kurangi", kategori: "jumlah", kata: () => "jumlahnya dikurangi satu",
    terapkan: (g) => jika({ ...g, jumlah: g.jumlah - 1 }),
    siapkan: (g, a) => ({ ...g, jumlah: pilih(a, [2, 3, 3, 4]), titik: null, dalam: null }),
  },
  {
    id: "gandakan", kategori: "jumlah", kata: () => "jumlahnya digandakan (dikali dua)",
    terapkan: (g) => jika({ ...g, jumlah: g.jumlah * 2 }),
    siapkan: (g, a) => ({ ...g, jumlah: pilih(a, [1, 2]), titik: null, dalam: null }),
  },
  {
    id: "tambah-sisi", kategori: "sisi", kata: () => "ditambah satu sisi",
    terapkan: (g) => {
      const baru = SISI_BERIKUTNYA[g.bentuk];
      return baru ? jika({ ...g, bentuk: baru }) : null;
    },
    siapkan: (g, a) => (SISI_BERIKUTNYA[g.bentuk] ? g : { ...g, bentuk: pilih(a, g.dalam ? ["persegi", "segi-lima"] as Bentuk[] : ["segitiga", "persegi", "segi-lima"] as Bentuk[]) }),
  },
  { id: "titik-searah", kategori: "titik", kata: () => "titiknya pindah satu sudut searah jarum jam", terapkan: geserTitik(90), siapkan: siapkanTitik },
  { id: "titik-balik", kategori: "titik", kata: () => "titiknya pindah satu sudut berlawanan arah jarum jam", terapkan: geserTitik(-90), siapkan: siapkanTitik },
  { id: "titik-seberang", kategori: "titik", kata: () => "titiknya pindah ke sudut seberang", terapkan: geserTitik(180), siapkan: siapkanTitik },
  {
    id: "tebalkan", kategori: "garis", kata: () => "garisnya ditebalkan",
    terapkan: (g) => (g.garis === "tipis" ? jika({ ...g, garis: "tebal" }) : null),
    siapkan: (g) => ({ ...g, garis: "tipis", isi: g.isi === "hitam" && !g.dalam ? "kosong" : g.isi }),
  },
  {
    id: "tipiskan", kategori: "garis", kata: () => "garisnya ditipiskan",
    terapkan: (g) => (g.garis === "tebal" ? jika({ ...g, garis: "tipis" }) : null),
    siapkan: (g) => ({ ...g, garis: "tebal", isi: g.isi === "hitam" && !g.dalam ? "kosong" : g.isi }),
  },
  {
    id: "tukar", kategori: "susunan", kata: () => "bangun luar dan bangun dalamnya bertukar tempat",
    terapkan: (g) => (g.dalam ? jika({ ...g, bentuk: g.dalam, dalam: g.bentuk }) : null),
    siapkan: (g, a) => {
      if (!g.dalam) return g;
      const dalam = BENTUK_LUAR.includes(g.dalam) ? g.dalam : pilih(a, BENTUK_LUAR.filter((b) => b !== g.bentuk));
      return { ...g, dalam };
    },
  },
];

const URUTAN: Kategori[] = ["ukuran", "orientasi", "isi", "jumlah", "sisi", "titik", "garis", "susunan"];

export function cariAturan(id: string): Aturan {
  const a = ATURAN.find((x) => x.id === id);
  if (!a) throw new Error("aturan tidak dikenal: " + id);
  return a;
}

export function urutkan(aturan: Aturan[]): Aturan[] {
  return aturan.slice().sort((x, y) => URUTAN.indexOf(x.kategori) - URUTAN.indexOf(y.kategori));
}

// terapkan beberapa aturan dengan urutan kategori yang tetap
export function terapkanSemua(aturan: Aturan[], g: Gambar): Gambar | null {
  let h: Gambar | null = g;
  for (const a of urutkan(aturan)) {
    h = a.terapkan(h);
    if (!h) return null;
  }
  return h;
}

export function bolehBersama(kategori: Kategori[]): boolean {
  if (new Set(kategori).size !== kategori.length) return false;
  return !KATEGORI_BENTROK.some(([x, y]) => kategori.includes(x) && kategori.includes(y));
}

// Semua kombinasi 1–3 aturan yang sah; dipakai validator untuk mencari tafsiran lain dari A→B.
export const SEMUA_KOMBINASI: Aturan[][] = (() => {
  const hasil: Aturan[][] = [];
  const jalan = (mulai: number, isi: Aturan[]) => {
    if (isi.length) hasil.push(isi);
    if (isi.length === 3) return;
    for (let i = mulai; i < ATURAN.length; i++) {
      const baru = [...isi, ATURAN[i]];
      if (bolehBersama(baru.map((a) => a.kategori))) jalan(i + 1, baru);
    }
  };
  jalan(0, []);
  return hasil;
})();

export function gabungKata(frasa: string[]): string {
  if (frasa.length <= 1) return frasa.join("");
  return frasa.slice(0, -1).join(", ") + (frasa.length > 2 ? "," : "") + " dan " + frasa[frasa.length - 1];
}
