// Gambar garis bebas untuk soal TIU 5 buatan sendiri (gaya soal asli: garis tipis, bangun hitam/putih).
// Satu gambar = daftar jalur (polyline/poligon) di kanvas 100×100, sumbu y ke bawah. Lingkaran dan busur
// didekati poligon bertitik banyak, jadi semua transformasi (putar, cermin, skala) cukup mengubah titik.
// kunciFig dipakai untuk membandingkan dua gambar secara visual.

export type Titik = [number, number];
export type IsiJalur = "tanpa" | "hitam" | "putih";
export interface Jalur { t: Titik[]; tutup: boolean; isi: IsiJalur }
export type Fig = Jalur[];

// bentuk yang disimpan ke sesi & dirender: path SVG siap pakai
export interface JalurSvg { d: string; isi: IsiJalur }

const PUSAT: Titik = [50, 50];
const LANGKAH_BUSUR = 9; // derajat; 45 habis dibagi 9, jadi lingkaran yang diputar 45° tetap bertitik sama

function rad(d: number): number {
  return (d * Math.PI) / 180;
}

// sudut dalam derajat: 0 = kanan, 90 = bawah (searah jarum jam di layar)
export function titikBusur(cx: number, cy: number, rx: number, ry: number, a0: number, a1: number, ujung = true): Titik[] {
  const n = Math.max(2, Math.round(Math.abs(a1 - a0) / LANGKAH_BUSUR));
  const hasil: Titik[] = [];
  for (let i = 0; i < (ujung ? n + 1 : n); i++) {
    const a = rad(a0 + ((a1 - a0) * i) / n);
    hasil.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]);
  }
  return hasil;
}

export function garis(...t: Titik[]): Fig {
  return [{ t, tutup: false, isi: "tanpa" }];
}

export function poli(t: Titik[], isi: IsiJalur = "tanpa"): Fig {
  return [{ t, tutup: true, isi }];
}

export function busur(cx: number, cy: number, r: number, a0: number, a1: number): Fig {
  return garis(...titikBusur(cx, cy, r, r, a0, a1));
}

export function elips(cx: number, cy: number, rx: number, ry: number, isi: IsiJalur = "tanpa"): Fig {
  return poli(titikBusur(cx, cy, rx, ry, 0, 360, false), isi);
}

export function lingkaran(cx: number, cy: number, r: number, isi: IsiJalur = "tanpa"): Fig {
  return elips(cx, cy, r, r, isi);
}

export function titik(cx: number, cy: number): Fig {
  return lingkaran(cx, cy, 3.2, "hitam");
}

// segi-n beraturan; sudut = arah titik sudut pertama (-90 = ke atas)
export function segiN(n: number, cx: number, cy: number, r: number, isi: IsiJalur = "tanpa", sudut = -90): Fig {
  return poli(Array.from({ length: n }, (_, i) => {
    const a = rad(sudut + (i * 360) / n);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Titik;
  }), isi);
}

export function persegi(cx: number, cy: number, w: number, h = w, isi: IsiJalur = "tanpa"): Fig {
  const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
  return poli([[x0, y0], [x1, y0], [x1, y1], [x0, y1]], isi);
}

const PANAH: Titik[] = [[-0.95, -0.24], [0.15, -0.24], [0.15, -0.62], [0.95, 0], [0.15, 0.62], [0.15, 0.24], [-0.95, 0.24]];

// panah blok; arah dalam derajat (0 = ke kanan, -90 = ke atas)
export function panah(cx: number, cy: number, s: number, arah = 0, isi: IsiJalur = "tanpa"): Fig {
  return putar(poli(PANAH.map(([x, y]) => [cx + x * s, cy + y * s] as Titik), isi), arah, [cx, cy]);
}

export function gabung(...f: Fig[]): Fig {
  return f.flat();
}

function ubah(f: Fig, fn: (p: Titik) => Titik): Fig {
  return f.map((j) => ({ ...j, t: j.t.map(fn) }));
}

// derajat searah jarum jam
export function putar(f: Fig, deg: number, p: Titik = PUSAT): Fig {
  const c = Math.cos(rad(deg)), s = Math.sin(rad(deg));
  return ubah(f, ([x, y]) => {
    const dx = x - p[0], dy = y - p[1];
    return [p[0] + dx * c - dy * s, p[1] + dx * s + dy * c];
  });
}

// cermin kiri–kanan terhadap garis tegak x
export function cerminH(f: Fig, x = 50): Fig {
  return ubah(f, ([px, py]) => [2 * x - px, py]);
}

// cermin atas–bawah terhadap garis mendatar y
export function cerminV(f: Fig, y = 50): Fig {
  return ubah(f, ([px, py]) => [px, 2 * y - py]);
}

export function skala(f: Fig, sx: number, sy = sx, p: Titik = PUSAT): Fig {
  return ubah(f, ([x, y]) => [p[0] + (x - p[0]) * sx, p[1] + (y - p[1]) * sy]);
}

export function geser(f: Fig, dx: number, dy: number): Fig {
  return ubah(f, ([x, y]) => [x + dx, y + dy]);
}

export function warnai(f: Fig, isi: IsiJalur): Fig {
  return f.map((j) => ({ ...j, isi: j.tutup ? isi : j.isi }));
}

function angka(v: number): string {
  const n = Math.round(v * 10) / 10;
  return String(n === 0 ? 0 : n);
}

export function keSvg(f: Fig): JalurSvg[] {
  return f.map((j) => ({
    d: "M" + j.t.map(([x, y]) => angka(x) + " " + angka(y)).join("L") + (j.tutup ? "Z" : ""),
    isi: j.isi,
  }));
}

// Dua gambar dengan kunci sama tampak identik: tiap jalur dibandingkan sebagai himpunan titik,
// jadi titik awal dan arah gambar jalur tidak berpengaruh.
export function kunciFig(f: Fig): string {
  return f
    .map((j) => j.isi + (j.tutup ? "z" : "") + ":" + j.t.map(([x, y]) => angka(x) + "," + angka(y)).sort().join(" "))
    .sort()
    .join(";");
}
