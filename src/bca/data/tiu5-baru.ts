import type { Fig } from "../../analogi/vektor";
import {
  cerminH, cerminV, elips, gabung, garis, geser, lingkaran, panah, persegi, poli, putar, segiN,
  skala, titik, titikBusur, warnai,
} from "../../analogi/vektor";

// Soal latihan TIU 5 buatan sendiri, BUKAN dari PDF: 30 soal analogi gambar bergaya soal asli
// (garis tipis, bangun putih/hitam), digambar sebagai SVG lewat src/analogi/vektor.ts.
// Kunci dihitung dari aturan yang sama dengan A→B, jadi B dan jawaban selalu konsisten.
// scripts/test-analogi.ts memeriksa tidak ada pilihan kembar dan tidak ada putaran/cerminan lain
// dari A→B yang menunjuk ke pengecoh.

export const LABEL_SOAL_BARU = "Soal & pembahasan dibuat sendiri, bukan dari PDF";

export type KelompokTiu5Baru =
  | "Putar & cermin"
  | "Tambah atau hapus bagian"
  | "Jumlah & ukuran"
  | "Warna"
  | "Posisi & susunan"
  | "Dua perubahan";

export interface SoalTiu5Baru {
  id: string;
  nomor: number;
  kelompok: KelompokTiu5Baru;
  a: Fig;
  b: Fig;
  c: Fig;
  opsi: Fig[]; // 5 pilihan, gambar 1–5
  kunci: number; // 1–5
  pembahasan: string;
}

interface Spek {
  kelompok: KelompokTiu5Baru;
  a: Fig;
  b: Fig;
  c: Fig;
  jawab: Fig;
  pengecoh: [Fig, Fig, Fig, Fig];
  posisi: 1 | 2 | 3 | 4 | 5; // letak jawaban di antara pilihan
  pembahasan: string; // "#" diganti nomor gambar jawaban
}

// ---------- bangun pembantu ----------

const hurufP = garis([38, 80], [38, 20], ...titikBusur(55, 32, 12, 12, -90, 90), [38, 44]);

const bendera = gabung(garis([38, 20], [38, 82]), poli([[38, 20], [66, 30], [38, 40]]));

function silang(x: number, y: number, r = 5): Fig {
  return gabung(garis([x - r, y - r], [x + r, y + r]), garis([x + r, y - r], [x - r, y + r]));
}

// n bangun tersusun rapi di tengah: satu baris bila ≤ 4, selebihnya dua baris
function deret(n: number, buat: (x: number, y: number) => Fig, jx = 20, jy = 24): Fig {
  const kolom = n <= 4 ? n : Math.ceil(n / 2);
  const baris = Math.ceil(n / kolom);
  const hasil: Fig[] = [];
  for (let b = 0; b < baris; b++) {
    const isi = Math.min(kolom, n - b * kolom);
    for (let k = 0; k < isi; k++) {
      hasil.push(buat(50 + (k - (isi - 1) / 2) * jx, 50 + (b - (baris - 1) / 2) * jy));
    }
  }
  return gabung(...hasil);
}

function balikWarna(f: Fig): Fig {
  return f.map((j) => ({ ...j, isi: j.isi === "hitam" ? "putih" : j.isi === "putih" ? "hitam" : j.isi }));
}

function denganTitikSudut(f: Fig): Fig {
  return gabung(f, ...f[0].t.map(([x, y]) => titik(x, y)));
}

// tali busur mendatar pada lingkaran (50,50) berjari-jari r
function tali(r: number, y: number): Fig {
  const s = Math.sqrt(r * r - (y - 50) * (y - 50));
  return garis([50 - s, y], [50 + s, y]);
}

function setengah(cx: number, cy: number, r: number, a0: number, isi: "tanpa" | "hitam" = "tanpa"): Fig {
  return poli(titikBusur(cx, cy, r, r, a0, a0 + 180), isi);
}

// ---------- soal ----------

const SPEK: Spek[] = [
  /* 1 */ {
    kelompok: "Tambah atau hapus bagian",
    a: gabung(lingkaran(50, 50, 30), garis([50, 36], [50, 64]), garis([36, 50], [64, 50])),
    b: gabung(garis([50, 36], [50, 64]), garis([36, 50], [64, 50])),
    c: gabung(segiN(6, 50, 50, 32), segiN(3, 50, 50, 14)),
    jawab: segiN(3, 50, 50, 14),
    pengecoh: [segiN(6, 50, 50, 32), segiN(3, 50, 50, 14, "hitam"), segiN(3, 50, 50, 14, "tanpa", 90), segiN(3, 50, 50, 32)],
    posisi: 3,
    pembahasan: "Pada B, lingkaran luar A dihapus sehingga yang tersisa hanya tanda + di dalamnya. Dengan perlakuan yang sama, segi enam C dihapus dan yang tersisa hanya segitiga kecil di dalamnya, tetap putih, tetap kecil, dan tetap menghadap atas: gambar #.",
  },
  /* 2 */ {
    kelompok: "Putar & cermin",
    a: bendera,
    b: putar(bendera, 90),
    c: gabung(garis([35, 25], [35, 72], [68, 72]), titik(68, 72)),
    jawab: putar(gabung(garis([35, 25], [35, 72], [68, 72]), titik(68, 72)), 90),
    pengecoh: (() => {
      const c = gabung(garis([35, 25], [35, 72], [68, 72]), titik(68, 72));
      return [putar(c, -90), putar(c, 180), cerminH(c), cerminV(c)] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 2,
    pembahasan: "B adalah bendera A yang diputar 90° searah jarum jam: tiangnya menjadi mendatar dan benderanya menggantung ke bawah di ujung kanan. Siku C (huruf L dengan titik di ujung kanan bawah) diputar 90° searah jarum jam menjadi garis mendatar di atas dan garis tegak di kiri, dengan titik di ujung kiri bawah: gambar #.",
  },
  /* 3 */ {
    kelompok: "Jumlah & ukuran",
    a: deret(2, (x) => garis([x, 28], [x, 72]), 18),
    b: deret(3, (x) => garis([x, 28], [x, 72]), 18),
    c: deret(3, (x, y) => lingkaran(x, y, 6)),
    jawab: deret(4, (x, y) => lingkaran(x, y, 6)),
    pengecoh: [
      deret(3, (x, y) => lingkaran(x, y, 6)),
      deret(5, (x, y) => lingkaran(x, y, 6)),
      deret(6, (x, y) => lingkaran(x, y, 6)),
      deret(4, (x, y) => lingkaran(x, y, 6, "hitam")),
    ],
    posisi: 1,
    pembahasan: "Jumlah garis bertambah satu (2 menjadi 3); bentuk dan warnanya tetap. C berisi 3 lingkaran putih, jadi jawabannya 4 lingkaran putih: gambar #. Pilihan 4 lingkaran hitam salah karena warnanya ikut berubah.",
  },
  /* 4 */ {
    kelompok: "Warna",
    a: gabung(persegi(50, 50, 56), lingkaran(50, 50, 12, "putih")),
    b: gabung(persegi(50, 50, 56), lingkaran(50, 50, 12, "hitam")),
    c: gabung(segiN(3, 50, 56, 36), persegi(50, 62, 16, 16, "putih")),
    jawab: gabung(segiN(3, 50, 56, 36), persegi(50, 62, 16, 16, "hitam")),
    pengecoh: [
      gabung(segiN(3, 50, 56, 36, "hitam"), persegi(50, 62, 16, 16, "putih")),
      gabung(segiN(3, 50, 56, 36), persegi(50, 62, 16, 16, "putih")),
      persegi(50, 62, 16, 16, "hitam"),
      gabung(segiN(3, 50, 56, 36), lingkaran(50, 62, 8, "hitam")),
    ],
    posisi: 2,
    pembahasan: "Bangun luar A (persegi) tetap putih, sedangkan bangun di dalamnya (lingkaran) diisi hitam. Pada C, segitiga luarnya tetap putih dan persegi kecil di dalamnya diisi hitam: gambar #. Pilihan yang segitiganya hitam membalik bagian yang salah.",
  },
  /* 5 */ {
    kelompok: "Tambah atau hapus bagian",
    a: lingkaran(50, 50, 28),
    b: gabung(lingkaran(50, 50, 28), garis([22, 50], [78, 50])),
    c: persegi(50, 50, 52),
    jawab: gabung(persegi(50, 50, 52), garis([24, 50], [76, 50])),
    pengecoh: [
      gabung(persegi(50, 50, 52), garis([50, 24], [50, 76])),
      gabung(persegi(50, 50, 52), garis([24, 24], [76, 76])),
      gabung(persegi(50, 50, 52), garis([24, 50], [76, 50]), garis([50, 24], [50, 76])),
      gabung(persegi(50, 50, 52), garis([24, 37], [76, 37])),
    ],
    posisi: 5,
    pembahasan: "Pada B, A diberi satu garis mendatar tepat di tengah yang membelahnya menjadi bagian atas dan bawah. C (persegi) diberi garis yang sama, mendatar dan tepat di tengah: gambar #. Garis tegak, diagonal, atau garis yang tidak di tengah bukan perlakuan yang sama.",
  },
  /* 6 */ {
    kelompok: "Putar & cermin",
    a: poli([[30, 25], [30, 75], [72, 75]]),
    b: cerminH(poli([[30, 25], [30, 75], [72, 75]])),
    c: gabung(garis([66, 22], [40, 22], [40, 78]), garis([40, 48], [60, 48])),
    jawab: cerminH(gabung(garis([66, 22], [40, 22], [40, 78]), garis([40, 48], [60, 48]))),
    pengecoh: (() => {
      const c = gabung(garis([66, 22], [40, 22], [40, 78]), garis([40, 48], [60, 48]));
      return [cerminV(c), putar(c, 180), putar(c, 90), c] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 4,
    pembahasan: "B adalah A yang dicerminkan kiri–kanan: sudut siku pindah dari kiri bawah ke kanan bawah. C (huruf F) dicerminkan kiri–kanan menjadi F terbalik dengan lengan menghadap ke kiri dan tetap di bagian atas: gambar #. F yang diputar 180° lengannya juga ke kiri, tetapi letaknya di bawah.",
  },
  /* 7 */ {
    kelompok: "Jumlah & ukuran",
    a: lingkaran(50, 50, 12),
    b: lingkaran(50, 50, 30),
    c: panah(50, 50, 14),
    jawab: panah(50, 50, 36),
    pengecoh: [panah(50, 50, 36, 180), panah(50, 50, 36, 0, "hitam"), panah(50, 50, 14, 180), panah(50, 50, 36, -90)],
    posisi: 3,
    pembahasan: "Lingkaran A diperbesar menjadi B; bentuk dan warnanya tetap. Panah kecil C diperbesar dengan tetap menunjuk ke kanan dan tetap putih: gambar #.",
  },
  /* 8 */ {
    kelompok: "Tambah atau hapus bagian",
    a: segiN(3, 50, 54, 34),
    b: denganTitikSudut(segiN(3, 50, 54, 34)),
    c: persegi(50, 50, 48),
    jawab: denganTitikSudut(persegi(50, 50, 48)),
    pengecoh: [
      gabung(persegi(50, 50, 48), titik(50, 26), titik(74, 50), titik(50, 74), titik(26, 50)),
      gabung(persegi(50, 50, 48), titik(26, 26), titik(74, 26), titik(74, 74)),
      gabung(titik(26, 26), titik(74, 26), titik(74, 74), titik(26, 74)),
      gabung(persegi(50, 50, 48), titik(50, 50)),
    ],
    posisi: 1,
    pembahasan: "Setiap titik sudut segitiga A diberi titik hitam (3 titik). Persegi C punya 4 sudut, jadi keempat sudutnya diberi titik hitam dan garis perseginya tetap ada: gambar #.",
  },
  /* 9 */ {
    kelompok: "Putar & cermin",
    a: gabung(garis([50, 25], [50, 80]), lingkaran(50, 19, 6)),
    b: putar(gabung(garis([50, 25], [50, 80]), lingkaran(50, 19, 6)), 45),
    c: gabung(garis([28, 28], [72, 28]), garis([50, 28], [50, 76])),
    jawab: putar(gabung(garis([28, 28], [72, 28]), garis([50, 28], [50, 76])), 45),
    pengecoh: (() => {
      const c = gabung(garis([28, 28], [72, 28]), garis([50, 28], [50, 76]));
      return [putar(c, -45), putar(c, 90), putar(c, 180), c] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 2,
    pembahasan: "A (jarum tegak dengan bulatan di atas) diputar 45° searah jarum jam sehingga bulatannya menunjuk ke kanan atas (B). Huruf T pada C diputar 45° searah jarum jam, sehingga palang atasnya miring dan bagian atasnya menunjuk ke kanan atas: gambar #.",
  },
  /* 10 */ {
    kelompok: "Warna",
    a: gabung(lingkaran(24, 50, 10, "hitam"), lingkaran(50, 50, 10, "hitam"), lingkaran(76, 50, 10, "putih")),
    b: balikWarna(gabung(lingkaran(24, 50, 10, "hitam"), lingkaran(50, 50, 10, "hitam"), lingkaran(76, 50, 10, "putih"))),
    c: gabung(segiN(3, 24, 53, 12, "hitam"), segiN(3, 50, 53, 12, "putih"), segiN(3, 76, 53, 12, "putih")),
    jawab: gabung(segiN(3, 24, 53, 12, "putih"), segiN(3, 50, 53, 12, "hitam"), segiN(3, 76, 53, 12, "hitam")),
    pengecoh: [
      gabung(segiN(3, 24, 53, 12, "hitam"), segiN(3, 50, 53, 12, "hitam"), segiN(3, 76, 53, 12, "hitam")),
      gabung(segiN(3, 24, 53, 12, "putih"), segiN(3, 50, 53, 12, "putih"), segiN(3, 76, 53, 12, "hitam")),
      gabung(segiN(3, 24, 53, 12, "putih"), segiN(3, 50, 53, 12, "putih"), segiN(3, 76, 53, 12, "putih")),
      gabung(segiN(3, 24, 53, 12, "hitam"), segiN(3, 50, 53, 12, "putih"), segiN(3, 76, 53, 12, "putih")),
    ],
    posisi: 4,
    pembahasan: "Warna setiap lingkaran dibalik: yang hitam menjadi putih dan yang putih menjadi hitam, letaknya tidak berubah. C berurutan hitam–putih–putih, jadi hasilnya putih–hitam–hitam: gambar #. Urutan putih–putih–hitam adalah C yang dicerminkan, bukan dibalik warnanya.",
  },
  /* 11 */ {
    kelompok: "Tambah atau hapus bagian",
    a: segiN(6, 50, 50, 32),
    b: segiN(5, 50, 50, 32),
    c: segiN(4, 50, 50, 32, "tanpa", -135),
    jawab: segiN(3, 50, 54, 32),
    pengecoh: [segiN(5, 50, 50, 32), lingkaran(50, 50, 28), segiN(4, 50, 50, 32), segiN(6, 50, 50, 32)],
    posisi: 5,
    pembahasan: "Jumlah sisi berkurang satu: segi enam (6 sisi) menjadi segi lima (5 sisi). C adalah persegi (4 sisi), jadi hasilnya bangun bersisi 3, yaitu segitiga: gambar #. Belah ketupat tetap bersisi 4.",
  },
  /* 12 */ {
    kelompok: "Posisi & susunan",
    a: garis([50, 25], [30, 25], [30, 75]),
    b: gabung(garis([50, 25], [30, 25], [30, 75]), cerminH(garis([50, 25], [30, 25], [30, 75]))),
    c: garis([30, 25], [30, 75], [50, 75]),
    jawab: gabung(garis([30, 25], [30, 75], [50, 75]), cerminH(garis([30, 25], [30, 75], [50, 75]))),
    pengecoh: (() => {
      const c = garis([30, 25], [30, 75], [50, 75]);
      return [gabung(c, cerminV(c)), gabung(c, putar(c, 180)), cerminV(gabung(c, cerminH(c))), c] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 1,
    pembahasan: "B adalah A ditambah cerminannya di sebelah kanan, sehingga kedua bagian bertemu di tengah dan membentuk \"Π\". C (huruf L) ditambah cerminannya di sebelah kanan sehingga membentuk \"⊔\" (huruf U bersudut): gambar #. Bentuk \"Π\" sama dengan B, bukan hasil perlakuan pada C.",
  },
  /* 13 */ {
    kelompok: "Jumlah & ukuran",
    a: persegi(50, 50, 40),
    b: persegi(50, 50, 64, 40),
    c: lingkaran(50, 50, 20),
    jawab: elips(50, 50, 32, 20),
    pengecoh: [elips(50, 50, 20, 32), lingkaran(50, 50, 32), elips(50, 50, 32, 12), elips(50, 50, 32, 20, "hitam")],
    posisi: 3,
    pembahasan: "A (persegi) direntangkan ke samping menjadi persegi panjang mendatar; tingginya tetap. C (lingkaran) direntangkan ke samping dengan tinggi tetap sehingga menjadi elips mendatar: gambar #. Lingkaran yang lebih besar ikut bertambah tinggi, jadi bukan perlakuan yang sama.",
  },
  /* 14 */ {
    kelompok: "Putar & cermin",
    a: gabung(garis([20, 50], [78, 50]), garis([68, 40], [78, 50], [68, 60]), garis([34, 50], [34, 41]), lingkaran(20, 50, 5, "putih")),
    b: putar(gabung(garis([20, 50], [78, 50]), garis([68, 40], [78, 50], [68, 60]), garis([34, 50], [34, 41]), lingkaran(20, 50, 5, "putih")), 180),
    c: gabung(garis([50, 22], [50, 80]), garis([40, 32], [50, 22], [60, 32]), persegi(50, 80, 10, 10, "putih")),
    jawab: putar(gabung(garis([50, 22], [50, 80]), garis([40, 32], [50, 22], [60, 32]), persegi(50, 80, 10, 10, "putih")), 180),
    pengecoh: (() => {
      const c = gabung(garis([50, 22], [50, 80]), garis([40, 32], [50, 22], [60, 32]), persegi(50, 80, 10, 10, "putih"));
      return [
        putar(c, 90), putar(c, -90), c,
        gabung(garis([50, 22], [50, 78]), garis([40, 32], [50, 22], [60, 32]), garis([40, 68], [50, 78], [60, 68])),
      ] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 4,
    pembahasan: "A diputar 180°: mata panah pindah dari kanan ke kiri, bulatan kecil pindah ke kanan, dan garis kecil yang semula di atas kini di bawah (jadi bukan sekadar dicerminkan). C diputar 180° dengan cara yang sama: mata panah pindah ke bawah dan kotak kecil pindah ke atas: gambar #.",
  },
  /* 15 */ {
    kelompok: "Tambah atau hapus bagian",
    a: gabung(persegi(50, 50, 48), garis([50, 26], [50, 74])),
    b: gabung(persegi(50, 50, 48), garis([42, 26], [42, 74]), garis([58, 26], [58, 74])),
    c: gabung(lingkaran(50, 50, 24), tali(24, 50)),
    jawab: gabung(lingkaran(50, 50, 24), tali(24, 42), tali(24, 58)),
    pengecoh: [
      gabung(lingkaran(50, 50, 24), tali(24, 38), tali(24, 50), tali(24, 62)),
      gabung(lingkaran(50, 50, 24), tali(24, 50), garis([50, 26], [50, 74])),
      putar(gabung(lingkaran(50, 50, 24), tali(24, 42), tali(24, 58)), 90),
      gabung(lingkaran(50, 50, 24), tali(24, 50)),
    ],
    posisi: 1,
    pembahasan: "A terbagi 2 oleh satu garis tegak; pada B garisnya menjadi dua sehingga persegi terbagi 3, dan arah garisnya tetap tegak. C terbagi 2 oleh satu garis mendatar, jadi hasilnya lingkaran dengan dua garis mendatar (terbagi 3): gambar #. Dua garis tegak mengubah arah garis C.",
  },
  /* 16 */ {
    kelompok: "Putar & cermin",
    a: gabung(setengah(50, 52, 26, 180), garis([50, 52], [50, 80], [42, 80])),
    b: cerminV(gabung(setengah(50, 52, 26, 180), garis([50, 52], [50, 80], [42, 80]))),
    c: gabung(garis([35, 20], [35, 80]), garis([35, 55], [65, 55], [65, 80])),
    jawab: cerminV(gabung(garis([35, 20], [35, 80]), garis([35, 55], [65, 55], [65, 80]))),
    pengecoh: (() => {
      const c = gabung(garis([35, 20], [35, 80]), garis([35, 55], [65, 55], [65, 80]));
      return [cerminH(c), putar(c, 180), putar(c, 90), c] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 3,
    pembahasan: "B adalah payung A yang dicerminkan atas–bawah: kubahnya pindah ke bawah, gagangnya ke atas, dan kait gagangnya tetap di kiri. Kursi C dicerminkan atas–bawah sehingga dudukan dan kakinya di atas, sedangkan sandarannya tetap di kiri: gambar #. Kursi yang diputar 180° sandarannya pindah ke kanan.",
  },
  /* 17 */ {
    kelompok: "Warna",
    a: lingkaran(50, 50, 28),
    b: gabung(setengah(50, 50, 28, 90, "hitam"), lingkaran(50, 50, 28)),
    c: persegi(50, 50, 52),
    jawab: gabung(persegi(37, 50, 26, 52, "hitam"), persegi(50, 50, 52)),
    pengecoh: [
      gabung(persegi(63, 50, 26, 52, "hitam"), persegi(50, 50, 52)),
      gabung(persegi(50, 37, 52, 26, "hitam"), persegi(50, 50, 52)),
      persegi(50, 50, 52, 52, "hitam"),
      gabung(poli([[24, 24], [24, 76], [76, 76]], "hitam"), persegi(50, 50, 52)),
    ],
    posisi: 2,
    pembahasan: "Setengah bagian kiri A dihitamkan, setengah kanannya tetap putih. Pada C (persegi), setengah bagian kirinya dihitamkan: gambar #. Segitiga hitam di kiri bawah juga setengah luas persegi, tetapi pembaginya diagonal, bukan garis tegak di tengah.",
  },
  /* 18 */ {
    kelompok: "Jumlah & ukuran",
    a: deret(3, (x, y) => segiN(3, x, y, 9)),
    b: deret(6, (x, y) => segiN(3, x, y, 9)),
    c: deret(2, (x, y) => persegi(x, y, 14)),
    jawab: deret(4, (x, y) => persegi(x, y, 14)),
    pengecoh: [
      deret(3, (x, y) => persegi(x, y, 14)),
      deret(6, (x, y) => persegi(x, y, 14)),
      deret(8, (x, y) => persegi(x, y, 14)),
      deret(4, (x, y) => lingkaran(x, y, 7)),
    ],
    posisi: 5,
    pembahasan: "Jumlah bangun dikali dua: 3 segitiga menjadi 6 segitiga. C berisi 2 persegi, jadi hasilnya 4 persegi: gambar #. (A→B juga bisa dibaca \"ditambah 3\", tetapi 5 persegi tidak ada di pilihan, jadi jawabannya tetap satu.)",
  },
  /* 19 */ {
    kelompok: "Posisi & susunan",
    a: gabung(persegi(50, 50, 52), titik(33, 33)),
    b: gabung(persegi(50, 50, 52), titik(67, 67)),
    c: gabung(persegi(50, 50, 64, 40), silang(29, 39)),
    jawab: gabung(persegi(50, 50, 64, 40), silang(71, 61)),
    pengecoh: [
      gabung(persegi(50, 50, 64, 40), silang(71, 39)),
      gabung(persegi(50, 50, 64, 40), silang(29, 61)),
      gabung(persegi(50, 50, 64, 40), silang(50, 50)),
      gabung(persegi(50, 50, 64, 40), silang(29, 39)),
    ],
    posisi: 4,
    pembahasan: "Titik pindah ke sudut seberangnya (dari kiri atas ke kanan bawah), sedangkan bingkainya tetap. Tanda silang C ada di sudut kiri atas, jadi pindah ke sudut kanan bawah: gambar #.",
  },
  /* 20 */ {
    kelompok: "Posisi & susunan",
    a: lingkaran(50, 50, 30),
    b: gabung(lingkaran(50, 50, 30), lingkaran(50, 50, 15)),
    c: segiN(3, 50, 55, 34),
    jawab: gabung(segiN(3, 50, 55, 34), segiN(3, 50, 55, 17)),
    pengecoh: [
      gabung(segiN(3, 50, 55, 34), segiN(3, 50, 55, 17, "tanpa", 90)),
      gabung(segiN(3, 50, 55, 34), lingkaran(50, 55, 10)),
      gabung(segiN(3, 50, 55, 34), segiN(3, 50, 55, 17, "hitam")),
      deret(2, (x, y) => segiN(3, x, y + 4, 17), 36),
    ],
    posisi: 1,
    pembahasan: "B adalah A ditambah salinan kecilnya tepat di tengah (lingkaran di dalam lingkaran). C (segitiga) ditambah segitiga kecil yang arahnya sama di tengahnya: gambar #. Segitiga kecil yang terbalik atau hitam bukan salinan C.",
  },
  /* 21 */ {
    kelompok: "Putar & cermin",
    a: gabung(garis([50, 80], [50, 22]), garis([38, 34], [50, 22], [62, 34]), garis([50, 80], [62, 80])),
    b: putar(gabung(garis([50, 80], [50, 22]), garis([38, 34], [50, 22], [62, 34]), garis([50, 80], [62, 80])), 180),
    c: gabung(lingkaran(50, 30, 12), garis([50, 42], [50, 80]), garis([50, 68], [60, 68]), garis([50, 78], [58, 78])),
    jawab: putar(gabung(lingkaran(50, 30, 12), garis([50, 42], [50, 80]), garis([50, 68], [60, 68]), garis([50, 78], [58, 78])), 180),
    pengecoh: (() => {
      const c = gabung(lingkaran(50, 30, 12), garis([50, 42], [50, 80]), garis([50, 68], [60, 68]), garis([50, 78], [58, 78]));
      return [cerminV(c), c, putar(c, 90), putar(c, -90)] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 5,
    pembahasan: "A diputar 180°: panah menunjuk ke bawah dan kaki kecil di ekornya pindah dari kanan ke kiri (B). Kunci C diputar 180°: bulatannya pindah ke bawah dan geriginya pindah ke atas sambil menghadap ke kiri: gambar #. Kunci yang hanya dicerminkan atas–bawah geriginya tetap menghadap ke kanan.",
  },
  /* 22 */ {
    kelompok: "Posisi & susunan",
    a: lingkaran(50, 50, 26),
    b: gabung(geser(setengah(50, 50, 26, 90), -6, 0), geser(setengah(50, 50, 26, -90), 6, 0)),
    c: persegi(50, 50, 44),
    jawab: gabung(persegi(33, 50, 22, 44), persegi(67, 50, 22, 44)),
    pengecoh: [
      gabung(persegi(50, 33, 44, 22), persegi(50, 67, 44, 22)),
      gabung(geser(poli([[28, 28], [72, 28], [28, 72]]), -4, -4), geser(poli([[72, 28], [72, 72], [28, 72]]), 4, 4)),
      persegi(39, 50, 22, 44),
      persegi(50, 50, 44),
    ],
    posisi: 2,
    pembahasan: "A dibelah tegak menjadi dua, lalu kedua belahannya digeser saling menjauh ke kiri dan ke kanan. C dibelah tegak dan digeser dengan cara yang sama sehingga menjadi dua persegi panjang tegak yang berjarak: gambar #. Belahan atas–bawah atau diagonal memakai garis belah yang berbeda.",
  },
  /* 23 */ {
    kelompok: "Tambah atau hapus bagian",
    a: garis([50, 22], [50, 78]),
    b: gabung(garis([50, 22], [50, 78]), lingkaran(50, 22, 5, "putih"), lingkaran(50, 78, 5, "putih")),
    c: garis([24, 64], [41, 36], [59, 64], [76, 36]),
    jawab: gabung(garis([24, 64], [41, 36], [59, 64], [76, 36]), lingkaran(24, 64, 5, "putih"), lingkaran(76, 36, 5, "putih")),
    pengecoh: [
      gabung(garis([24, 64], [41, 36], [59, 64], [76, 36]), lingkaran(24, 64, 5, "putih")),
      gabung(garis([24, 64], [41, 36], [59, 64], [76, 36]), persegi(24, 64, 10, 10, "putih"), persegi(76, 36, 10, 10, "putih")),
      gabung(garis([24, 64], [41, 36], [59, 64], [76, 36]), ...([[24, 64], [41, 36], [59, 64], [76, 36]] as const).map(([x, y]) => lingkaran(x, y, 5, "putih"))),
      garis([24, 64], [41, 36], [59, 64], [76, 36]),
    ],
    posisi: 4,
    pembahasan: "Kedua ujung garis A diberi bulatan kecil. Garis zig-zag C juga punya dua ujung, jadi hanya kedua ujung itu yang diberi bulatan (bukan setiap tikungan): gambar #.",
  },
  /* 24 */ {
    kelompok: "Tambah atau hapus bagian",
    a: gabung(lingkaran(40, 50, 20), lingkaran(60, 50, 20)),
    b: poli([...titikBusur(40, 50, 20, 20, -60, 60), ...titikBusur(60, 50, 20, 20, 120, 240)]),
    c: gabung(persegi(42.5, 42.5, 35), persegi(57.5, 57.5, 35)),
    jawab: persegi(50, 50, 20),
    pengecoh: [
      poli([[25, 25], [60, 25], [60, 40], [75, 40], [75, 75], [40, 75], [40, 60], [25, 60]]),
      gabung(persegi(42.5, 42.5, 35), persegi(57.5, 57.5, 35), persegi(50, 50, 20, 20, "hitam")),
      persegi(42.5, 42.5, 35),
      persegi(50, 50, 20, 20, "hitam"),
    ],
    posisi: 3,
    pembahasan: "Dari dua lingkaran yang bertumpuk pada A, yang tersisa di B hanya bagian yang bertumpuk (irisannya), berbentuk seperti biji. Irisan dua persegi C adalah persegi kecil di tengah, tetap putih: gambar #. Garis luar gabungan kedua persegi adalah kebalikannya.",
  },
  /* 25 */ {
    kelompok: "Putar & cermin",
    a: bendera,
    b: putar(bendera, -90),
    c: gabung(garis([30, 72], [30, 35], [70, 35]), garis([62, 27], [70, 35], [62, 43])),
    jawab: putar(gabung(garis([30, 72], [30, 35], [70, 35]), garis([62, 27], [70, 35], [62, 43])), -90),
    pengecoh: (() => {
      const c = gabung(garis([30, 72], [30, 35], [70, 35]), garis([62, 27], [70, 35], [62, 43]));
      return [putar(c, 90), putar(c, 180), cerminH(c), cerminV(c)] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 1,
    pembahasan: "B adalah bendera A yang diputar 90° berlawanan arah jarum jam: tiangnya mendatar dan benderanya menunjuk ke atas di ujung kiri. Panah siku C diputar 90° berlawanan arah jarum jam sehingga mata panahnya menunjuk ke atas dan kakinya mendatar di bawah ke arah kanan: gambar #.",
  },
  /* 26 */ {
    kelompok: "Dua perubahan",
    a: segiN(3, 50, 50, 32),
    b: warnai(putar(segiN(3, 50, 50, 32), 90), "hitam"),
    c: panah(50, 50, 32, -90),
    jawab: panah(50, 50, 32, 0, "hitam"),
    pengecoh: [panah(50, 50, 32, 0), panah(50, 50, 32, -90, "hitam"), panah(50, 50, 32, 180, "hitam"), panah(50, 50, 32, 90, "hitam")],
    posisi: 5,
    pembahasan: "Dua perubahan sekaligus: A diputar 90° searah jarum jam (segitiga yang menghadap atas menjadi menghadap kanan) dan diisi hitam. Panah C yang menunjuk ke atas diputar 90° searah jarum jam menjadi menunjuk ke kanan, lalu diisi hitam: gambar #.",
  },
  /* 27 */ {
    kelompok: "Posisi & susunan",
    a: gabung(segiN(3, 50, 55, 38), panah(50, 62, 11, -90)),
    b: gabung(segiN(3, 50, 55, 38), panah(50, 62, 11, 0)),
    c: gabung(persegi(50, 50, 64, 40), panah(50, 50, 13, 180)),
    jawab: gabung(persegi(50, 50, 64, 40), panah(50, 50, 13, -90)),
    pengecoh: [
      gabung(persegi(50, 50, 40, 64), panah(50, 50, 13, -90)),
      gabung(persegi(50, 50, 64, 40), panah(50, 50, 13, 90)),
      gabung(persegi(50, 50, 64, 40), panah(50, 50, 13, 180)),
      gabung(persegi(50, 50, 64, 40), panah(50, 50, 13, 0)),
    ],
    posisi: 2,
    pembahasan: "Hanya panah di dalam yang diputar 90° searah jarum jam (dari menunjuk ke atas menjadi ke kanan); segitiga luarnya tidak ikut berputar. Pada C, panah yang menunjuk ke kiri diputar 90° searah jarum jam menjadi menunjuk ke atas, dan persegi panjangnya tetap mendatar: gambar #.",
  },
  /* 28 */ {
    kelompok: "Dua perubahan",
    a: gabung(persegi(50, 50, 56), lingkaran(50, 50, 14, "putih")),
    b: lingkaran(50, 50, 14, "hitam"),
    c: gabung(segiN(5, 50, 52, 34), persegi(50, 54, 22, 22, "putih")),
    jawab: persegi(50, 54, 22, 22, "hitam"),
    pengecoh: [
      persegi(50, 54, 22, 22, "putih"),
      segiN(5, 50, 54, 16, "hitam"),
      gabung(segiN(5, 50, 52, 34), persegi(50, 54, 22, 22, "hitam")),
      segiN(4, 50, 54, 15.6, "hitam"),
    ],
    posisi: 4,
    pembahasan: "Dua perubahan sekaligus: bangun luar A dihapus dan bangun di dalamnya diisi hitam. Pada C, segi lima dihapus dan persegi kecil di dalamnya menjadi hitam tanpa berputar: gambar #.",
  },
  /* 29 */ {
    kelompok: "Dua perubahan",
    a: hurufP,
    b: skala(cerminH(hurufP), 0.55),
    c: garis([30, 25], [30, 75], [70, 75], [70, 55]),
    jawab: skala(cerminH(garis([30, 25], [30, 75], [70, 75], [70, 55])), 0.55),
    pengecoh: (() => {
      const c = garis([30, 25], [30, 75], [70, 75], [70, 55]);
      return [cerminH(c), skala(c, 0.55), skala(cerminV(c), 0.55), skala(putar(c, 180), 0.55)] as [Fig, Fig, Fig, Fig];
    })(),
    posisi: 3,
    pembahasan: "Dua perubahan sekaligus: A (huruf P) dicerminkan kiri–kanan dan diperkecil. C dicerminkan kiri–kanan (sisi panjang pindah ke kanan, sisi pendek ke kiri) lalu diperkecil: gambar #.",
  },
  /* 30 */ {
    kelompok: "Posisi & susunan",
    a: gabung(panah(30, 50, 16, 0, "hitam"), lingkaran(70, 50, 14)),
    b: gabung(lingkaran(30, 50, 14), panah(70, 50, 16, 0, "hitam")),
    c: gabung(segiN(3, 50, 30, 16), persegi(50, 70, 26, 26, "hitam")),
    jawab: gabung(persegi(50, 30, 26, 26, "hitam"), segiN(3, 50, 70, 16)),
    pengecoh: [
      putar(gabung(segiN(3, 50, 30, 16), persegi(50, 70, 26, 26, "hitam")), 180),
      gabung(segiN(3, 50, 30, 16), persegi(50, 70, 26, 26, "hitam")),
      gabung(persegi(50, 30, 26, 26), segiN(3, 50, 70, 16, "hitam")),
      gabung(persegi(30, 50, 26, 26, "hitam"), segiN(3, 70, 50, 16)),
    ],
    posisi: 5,
    pembahasan: "Kedua bangun A bertukar tempat, tetapi bentuk, arah, dan warnanya tetap: panah hitam tetap menunjuk ke kanan. Pada C, persegi hitam pindah ke atas dan segitiga putih pindah ke bawah dengan tetap menghadap atas: gambar #. Kalau C diputar 180°, segitiganya ikut terbalik.",
  },
];

export const SOAL_TIU5_BARU: SoalTiu5Baru[] = SPEK.map((s, i) => {
  const opsi = s.pengecoh.slice();
  opsi.splice(s.posisi - 1, 0, s.jawab);
  return {
    id: "tiu5b-" + String(i + 1).padStart(2, "0"),
    nomor: i + 1,
    kelompok: s.kelompok,
    a: s.a,
    b: s.b,
    c: s.c,
    opsi,
    kunci: s.posisi,
    pembahasan: s.pembahasan.replace("#", String(s.posisi)),
  };
});

