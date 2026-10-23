// Model satu gambar Analogi Gambar beserta geometrinya. Semua gambar digambar programatis
// di kanvas 100×100; fungsi yang sama dipakai untuk render SVG dan untuk membandingkan
// dua gambar secara visual (kunciVisual), jadi "tampak sama" berarti geometrinya sama.

export type Bentuk =
  | "lingkaran" | "persegi" | "persegi-panjang" | "segitiga" | "belah-ketupat"
  | "segi-lima" | "segi-enam" | "bintang" | "panah";
export type Isi = "kosong" | "hitam" | "arsir";
export type Ukuran = "kecil" | "besar";
export type Garis = "tipis" | "tebal";

export interface Gambar {
  bentuk: Bentuk;
  ukuran: Ukuran;
  isi: Isi; // pada bangun gabungan: isi bangun dalam (bangun luar selalu kosong)
  garis: Garis;
  rotasi: number; // derajat searah jarum jam, kelipatan 45
  cermin: boolean; // dicerminkan kiri–kanan sebelum diputar
  jumlah: number; // 1–4 salinan bangun yang sama
  titik: number | null; // posisi titik kecil: sudut dari atas searah jarum jam (45 = kanan atas)
  dalam: Bentuk | null; // bangun di dalam bangun (gabungan)
}

export const SEMUA_BENTUK: Bentuk[] = [
  "lingkaran", "persegi", "persegi-panjang", "segitiga", "belah-ketupat",
  "segi-lima", "segi-enam", "bintang", "panah",
];

// bangun yang cukup lapang untuk menampung bangun lain di tengahnya
export const BENTUK_LUAR: Bentuk[] = ["lingkaran", "persegi", "segi-lima", "segi-enam"];

export const NAMA_BENTUK: Record<Bentuk, string> = {
  lingkaran: "lingkaran",
  persegi: "persegi",
  "persegi-panjang": "persegi panjang",
  segitiga: "segitiga",
  "belah-ketupat": "belah ketupat",
  "segi-lima": "segi lima",
  "segi-enam": "segi enam",
  bintang: "bintang",
  panah: "panah",
};

type Titik2 = [number, number];

function beraturan(n: number, r: number): Titik2[] {
  return Array.from({ length: n }, (_, i) => {
    const t = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)] as Titik2;
  });
}

function bintang(n: number, luar: number, dalam: number): Titik2[] {
  return Array.from({ length: n * 2 }, (_, i) => {
    const r = i % 2 === 0 ? luar : dalam;
    const t = ((-90 + (i * 180) / n) * Math.PI) / 180;
    return [r * Math.cos(t), r * Math.sin(t)] as Titik2;
  });
}

// koordinat lokal berjari-jari ±1, sumbu y ke bawah; panah menghadap kanan, segitiga ke atas
const POLIGON: Record<Exclude<Bentuk, "lingkaran">, Titik2[]> = {
  persegi: [[-0.72, -0.72], [0.72, -0.72], [0.72, 0.72], [-0.72, 0.72]],
  "persegi-panjang": [[-0.92, -0.52], [0.92, -0.52], [0.92, 0.52], [-0.92, 0.52]],
  segitiga: [[0, -0.8], [0.88, 0.8], [-0.88, 0.8]],
  "belah-ketupat": [[0, -1], [0.62, 0], [0, 1], [-0.62, 0]],
  "segi-lima": beraturan(5, 0.95),
  "segi-enam": beraturan(6, 0.95),
  bintang: bintang(5, 1, 0.42),
  panah: [[-0.95, -0.24], [0.15, -0.24], [0.15, -0.62], [0.95, 0], [0.15, 0.62], [0.15, 0.24], [-0.95, 0.24]],
};

const JARI = 36; // jari-jari bangun besar tunggal
const FAKTOR_UKURAN: Record<Ukuran, number> = { besar: 1, kecil: 0.55 };
const SKALA_DALAM = 0.42;
const JARI_TITIK = 45; // jarak titik kecil dari pusat kanvas
export const TEBAL_GARIS: Record<Garis, number> = { tipis: 2.2, tebal: 5 };

// letak salinan bila jumlah > 1: [pusat x, pusat y] dan skala tiap salinan
const SUSUNAN: Record<number, { pusat: Titik2[]; skala: number }> = {
  1: { pusat: [[50, 50]], skala: 1 },
  2: { pusat: [[27, 50], [73, 50]], skala: 0.5 },
  3: { pusat: [[27, 29], [73, 29], [50, 72]], skala: 0.46 },
  4: { pusat: [[28, 28], [72, 28], [28, 72], [72, 72]], skala: 0.46 },
};

export function sah(g: Gambar): boolean {
  if (!Number.isInteger(g.jumlah) || g.jumlah < 1 || g.jumlah > 4) return false;
  if (g.titik !== null && g.jumlah !== 1) return false;
  if (g.dalam !== null && (g.jumlah !== 1 || !BENTUK_LUAR.includes(g.bentuk) || g.dalam === g.bentuk)) return false;
  return true;
}

export type Primitif =
  | { jenis: "lingkaran"; cx: number; cy: number; r: number; isi: Isi; garis: number }
  | { jenis: "poligon"; titik: Titik2[]; isi: Isi; garis: number }
  | { jenis: "titik"; cx: number; cy: number };

function mod360(d: number): number {
  return ((d % 360) + 360) % 360;
}

function ubahTitik(p: Titik2, g: Gambar, pusat: Titik2, r: number): Titik2 {
  const x0 = g.cermin ? -p[0] : p[0];
  const y0 = p[1];
  const t = (mod360(g.rotasi) * Math.PI) / 180;
  // sumbu y ke bawah: sudut positif tampak searah jarum jam
  const x = x0 * Math.cos(t) - y0 * Math.sin(t);
  const y = x0 * Math.sin(t) + y0 * Math.cos(t);
  return [pusat[0] + x * r, pusat[1] + y * r];
}

function satuBangun(bentuk: Bentuk, g: Gambar, pusat: Titik2, r: number, isi: Isi, garis: number): Primitif {
  if (bentuk === "lingkaran") return { jenis: "lingkaran", cx: pusat[0], cy: pusat[1], r, isi, garis };
  return { jenis: "poligon", titik: POLIGON[bentuk].map((p) => ubahTitik(p, g, pusat, r)), isi, garis };
}

export function primitif(g: Gambar): Primitif[] {
  const garis = TEBAL_GARIS[g.garis];
  const { pusat, skala } = SUSUNAN[g.jumlah];
  const r = JARI * FAKTOR_UKURAN[g.ukuran] * skala;
  const hasil: Primitif[] = [];
  for (const p of pusat) {
    if (g.dalam) {
      hasil.push(satuBangun(g.bentuk, g, p, r, "kosong", garis));
      hasil.push(satuBangun(g.dalam, g, p, r * SKALA_DALAM, g.isi, garis));
    } else {
      hasil.push(satuBangun(g.bentuk, g, p, r, g.isi, garis));
    }
  }
  if (g.titik !== null) {
    const t = (mod360(g.titik) * Math.PI) / 180;
    hasil.push({ jenis: "titik", cx: 50 + JARI_TITIK * Math.sin(t), cy: 50 - JARI_TITIK * Math.cos(t) });
  }
  return hasil;
}

function bulat(v: number): string {
  const n = Math.round(v * 10) / 10;
  return (n === 0 ? 0 : n).toFixed(1);
}

function kunciPrimitif(p: Primitif): string {
  // garis pada bangun hitam tidak terlihat (warnanya sama dengan isinya), jadi tidak ikut dibandingkan
  const gaya = (isi: Isi, garis: number) => isi + (isi === "hitam" ? "" : "/" + garis);
  if (p.jenis === "titik") return "t:" + bulat(p.cx) + "," + bulat(p.cy);
  if (p.jenis === "lingkaran") return "o:" + bulat(p.cx) + "," + bulat(p.cy) + "," + bulat(p.r) + ":" + gaya(p.isi, p.garis);
  // poligon dibandingkan sebagai himpunan titik sudut, jadi simetri putar/cermin otomatis terdeteksi
  const sudut = p.titik.map(([x, y]) => bulat(x) + "," + bulat(y)).sort();
  return "p:" + sudut.join(" ") + ":" + gaya(p.isi, p.garis);
}

const cache = new Map<string, string>();

// Dua gambar dengan kunci visual sama tampak identik di layar.
export function kunciVisual(g: Gambar): string {
  const id = [g.bentuk, g.ukuran, g.isi, g.garis, mod360(g.rotasi), g.cermin, g.jumlah, g.titik === null ? "-" : mod360(g.titik), g.dalam].join("|");
  let k = cache.get(id);
  if (k === undefined) {
    k = primitif(g).map(kunciPrimitif).sort().join(";");
    if (cache.size > 50000) cache.clear();
    cache.set(id, k);
  }
  return k;
}

const ARAH: Record<number, string> = {
  0: "atas", 45: "kanan atas", 90: "kanan", 135: "kanan bawah",
  180: "bawah", 225: "kiri bawah", 270: "kiri", 315: "kiri atas",
};

export function namaArah(sudut: number): string {
  return ARAH[mod360(Math.round(sudut / 45) * 45)];
}

// arah hadap panah dan segitiga setelah dicerminkan lalu diputar
function arahHadap(g: Gambar): string | null {
  const dasar = g.bentuk === "panah" ? 90 : g.bentuk === "segitiga" ? 0 : null;
  if (dasar === null || g.dalam) return null;
  const awal = g.cermin ? -dasar : dasar;
  return namaArah(awal + g.rotasi);
}

const ANGKA = ["", "", "dua", "tiga", "empat"];

export function deskripsi(g: Gambar): string {
  let s = (g.jumlah > 1 ? ANGKA[g.jumlah] + " " : "") + NAMA_BENTUK[g.bentuk];
  s += " " + g.ukuran;
  const hadap = arahHadap(g);
  if (hadap) s += (g.bentuk === "panah" ? " ke " : " menghadap ") + hadap;
  const kataIsi = g.isi === "hitam" ? "hitam" : g.isi === "arsir" ? "berarsir" : "";
  if (g.dalam) s += " berisi " + NAMA_BENTUK[g.dalam] + (kataIsi ? " " + kataIsi : "");
  else if (kataIsi) s += " " + kataIsi;
  if (g.garis === "tebal") s += " bergaris tebal";
  if (g.titik !== null) s += " dengan titik di " + namaArah(g.titik);
  return s;
}

export function gambarDasar(bentuk: Bentuk, ubah: Partial<Gambar> = {}): Gambar {
  return {
    bentuk, ukuran: "besar", isi: "kosong", garis: "tipis", rotasi: 0, cermin: false,
    jumlah: 1, titik: null, dalam: null, ...ubah,
  };
}
