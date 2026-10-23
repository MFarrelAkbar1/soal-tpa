import type { Bentuk, Gambar } from "./gambar";
import { BENTUK_LUAR, NAMA_BENTUK, SEMUA_BENTUK, deskripsi, gambarDasar, kunciVisual, sah } from "./gambar";
import type { Aturan, Kategori } from "./aturan";
import { ATURAN, SEMUA_KOMBINASI, bolehBersama, cariAturan, gabungKata, terapkanSemua, urutkan } from "./aturan";
import type { Acak } from "./acak";
import { kocok, pilih } from "./acak";

export type Tingkat = "mudah" | "sedang" | "sulit";
export const SEMUA_TINGKAT: Tingkat[] = ["mudah", "sedang", "sulit"];
export const NAMA_TINGKAT: Record<Tingkat, string> = { mudah: "Mudah", sedang: "Sedang", sulit: "Sulit" };

export interface SoalAnalogi {
  id: string;
  tingkat: Tingkat;
  a: Gambar;
  b: Gambar;
  c: Gambar;
  opsi: Gambar[]; // 5 pilihan, ditampilkan bernomor 1–5
  kunci: number; // indeks opsi (0 = gambar 1)
  aturan: string[]; // id aturan yang mengubah A→B
  penjelasan: string;
  catatanOpsi: string[]; // alasan tiap opsi benar/salah, untuk pembahasan
}

export const JUMLAH_OPSI = 5;

// ---------- gambar awal acak ----------

function acakGambar(acak: Acak, tingkat: Tingkat, gabungan: boolean): Gambar {
  const mudah = tingkat === "mudah";
  const bentuk = pilih(acak, gabungan ? BENTUK_LUAR : SEMUA_BENTUK);
  const g = gambarDasar(bentuk, {
    ukuran: acak() < 0.7 ? "besar" : "kecil",
    isi: mudah ? (acak() < 0.85 ? "kosong" : "hitam") : pilih(acak, ["kosong", "kosong", "kosong", "hitam", "arsir"] as const),
    garis: !mudah && acak() < 0.15 ? "tebal" : "tipis",
    rotasi: mudah ? 0 : pilih(acak, [0, 0, 0, 90, 180, 270]),
  });
  if (gabungan) g.dalam = pilih(acak, SEMUA_BENTUK.filter((b) => b !== bentuk && b !== "persegi-panjang"));
  else if (!mudah && acak() < 0.15) g.jumlah = pilih(acak, [2, 3]);
  else if (!mudah && acak() < 0.15) g.titik = pilih(acak, [45, 135, 225, 315]);
  if (g.isi === "hitam" && !g.dalam) g.garis = "tipis";
  return g;
}

// bobot kategori: orientasi punya banyak variasi, tapi jangan sampai mendominasi
const BOBOT: Record<Kategori, number> = { ukuran: 3, orientasi: 3, isi: 3, jumlah: 2, sisi: 1.5, titik: 1.5, garis: 1.5, susunan: 2 };

function pilihKategori(acak: Acak, n: number, gabungan: boolean): Kategori[] {
  const hasil: Kategori[] = [];
  let calon = (Object.keys(BOBOT) as Kategori[]).filter((k) => (gabungan ? k !== "jumlah" : k !== "susunan"));
  while (hasil.length < n && calon.length) {
    const total = calon.reduce((s, k) => s + BOBOT[k], 0);
    let x = acak() * total;
    const k = calon.find((c) => (x -= BOBOT[c]) < 0) ?? calon[calon.length - 1];
    hasil.push(k);
    calon = calon.filter((c) => c !== k && bolehBersama([...hasil, c]));
  }
  return hasil;
}

// ---------- pengecoh ----------

interface Calon {
  g: Gambar;
  jenis: "sebagian" | "salah" | "bangun-lain";
  alasan: string;
}

function frasa(aturan: Aturan[], g: Gambar): string {
  return gabungKata(urutkan(aturan).map((a) => a.kata(g)));
}

function calonPengecoh(acak: Acak, aturan: Aturan[], a: Gambar, c: Gambar): Calon[] {
  const hasil: Calon[] = [];
  const tambah = (g: Gambar | null, jenis: Calon["jenis"], alasan: string) => {
    if (g) hasil.push({ g, jenis, alasan });
  };

  // aturan hanya diterapkan sebagian (termasuk C tanpa perubahan)
  const n = aturan.length;
  for (let mask = 0; mask < (1 << n) - 1; mask++) {
    const dipakai = aturan.filter((_, i) => mask & (1 << i));
    const terlewat = aturan.filter((_, i) => !(mask & (1 << i)));
    const alasan = dipakai.length
      ? "Hanya " + frasa(dipakai, c) + "; aturan " + frasa(terlewat, c) + " terlewat."
      : "Ini gambar C tanpa perubahan apa pun.";
    tambah(terapkanSemua(dipakai, c), "sebagian", alasan);
  }

  // satu aturan diganti aturan lain, atau ada aturan tambahan yang tidak ada di A→B
  const kategori = aturan.map((x) => x.kategori);
  for (let i = 0; i < n; i++) {
    for (const lain of ATURAN) {
      if (lain === aturan[i]) continue;
      const baru = aturan.map((x, j) => (j === i ? lain : x));
      if (!bolehBersama(baru.map((x) => x.kategori))) continue;
      tambah(terapkanSemua(baru, c), "salah",
        "Aturannya salah: C " + lain.kata(c) + ", padahal seharusnya " + aturan[i].kata(c) + ".");
    }
  }
  for (const lain of ATURAN) {
    if (!bolehBersama([...kategori, lain.kategori])) continue;
    tambah(terapkanSemua([...aturan, lain], c), "salah",
      "Ada perubahan yang tidak terjadi dari A ke B: C juga " + lain.kata(c) + ".");
  }

  // aturan benar, tapi pada bangun lain
  const bangunLain: Bentuk[] = kocok(acak, SEMUA_BENTUK.filter((b) => b !== c.bentuk));
  const daftar = [a.bentuk, ...bangunLain.slice(0, 3)];
  for (const b of daftar) {
    const g = terapkanSemua(aturan, { ...c, bentuk: b });
    if (g && sah(g)) tambah(g, "bangun-lain", "Aturannya benar, tapi bangunnya " + NAMA_BENTUK[b] + ", bukan " + NAMA_BENTUK[c.bentuk] + " seperti C.");
  }
  if (c.dalam) {
    for (const b of kocok(acak, SEMUA_BENTUK.filter((x) => x !== c.dalam && x !== c.bentuk)).slice(0, 2)) {
      const g = terapkanSemua(aturan, { ...c, dalam: b });
      if (g) tambah(g, "bangun-lain", "Aturannya benar, tapi bangun dalamnya " + NAMA_BENTUK[b] + ", bukan " + NAMA_BENTUK[c.dalam] + " seperti C.");
    }
  }
  return hasil;
}

function pilihPengecoh(acak: Acak, calon: Calon[], kunci: string): Calon[] {
  const terpakai = new Set([kunci]);
  const unik: Calon[] = [];
  for (const x of kocok(acak, calon)) {
    const k = kunciVisual(x.g);
    if (terpakai.has(k)) continue;
    terpakai.add(k);
    unik.push(x);
  }
  // usahakan ketiga jenis pengecoh muncul, sisanya diisi acak
  const hasil: Calon[] = [];
  for (const jenis of ["sebagian", "salah", "bangun-lain"] as const) {
    const x = unik.find((u) => u.jenis === jenis && !hasil.includes(u));
    if (x) hasil.push(x);
  }
  for (const u of unik) {
    if (hasil.length >= JUMLAH_OPSI - 1) break;
    if (!hasil.includes(u)) hasil.push(u);
  }
  return hasil.slice(0, JUMLAH_OPSI - 1);
}

// ---------- penjelasan ----------

export function buatPenjelasan(aturan: Aturan[], a: Gambar, c: Gambar, jawaban: Gambar, kunci: number): string {
  return "A (" + deskripsi(a) + ") " + frasa(aturan, a) + " menjadi B. Dengan aturan yang sama, C (" +
    deskripsi(c) + ") " + frasa(aturan, c) + ", jadi jawabannya gambar " + (kunci + 1) +
    " (" + deskripsi(jawaban) + ").";
}

// ---------- validasi ----------

// Mengembalikan daftar masalah; soal sah bila daftar kosong.
export function validasiSoal(s: SoalAnalogi): string[] {
  const galat: string[] = [];
  if (s.opsi.length !== JUMLAH_OPSI) galat.push("jumlah opsi " + s.opsi.length);
  if (!Number.isInteger(s.kunci) || s.kunci < 0 || s.kunci >= s.opsi.length) {
    galat.push("kunci di luar rentang");
    return galat;
  }
  let aturan: Aturan[];
  try {
    aturan = s.aturan.map(cariAturan);
  } catch (e) {
    return [String(e)];
  }
  if (!aturan.length || !bolehBersama(aturan.map((x) => x.kategori))) galat.push("kombinasi aturan tidak sah");

  for (const g of [s.a, s.b, s.c, ...s.opsi]) if (!sah(g)) galat.push("gambar tidak sah: " + deskripsi(g));

  const kOpsi = s.opsi.map(kunciVisual);
  if (new Set(kOpsi).size !== kOpsi.length) galat.push("ada dua pilihan yang identik");

  const kA = kunciVisual(s.a), kB = kunciVisual(s.b), kC = kunciVisual(s.c);
  const kJawab = kOpsi[s.kunci];
  const b = terapkanSemua(aturan, s.a);
  const d = terapkanSemua(aturan, s.c);
  if (!b || kunciVisual(b) !== kB) galat.push("B bukan hasil aturan pada A");
  if (!d || kunciVisual(d) !== kJawab) galat.push("kunci bukan hasil aturan pada C");
  if (kA === kB) galat.push("A dan B tampak sama");
  if (kC === kJawab) galat.push("C dan jawaban tampak sama");
  if (s.a.bentuk === s.c.bentuk && s.a.dalam === s.c.dalam) galat.push("A dan C memakai bangun yang sama");

  // setiap aturan harus terlihat: tanpa aturan itu hasilnya harus berbeda, di A→B maupun di C
  for (const x of aturan) {
    const sisa = aturan.filter((y) => y !== x);
    const tanpaB = terapkanSemua(sisa, s.a);
    const tanpaD = terapkanSemua(sisa, s.c);
    if (tanpaB && kunciVisual(tanpaB) === kB) galat.push("aturan " + x.id + " tidak terlihat pada A→B");
    if (tanpaD && kunciVisual(tanpaD) === kJawab) galat.push("aturan " + x.id + " tidak terlihat pada C");
    const sendiriA = x.terapkan(s.a), sendiriC = x.terapkan(s.c);
    if (!sendiriA || kunciVisual(sendiriA) === kA) galat.push("aturan " + x.id + " tidak mengubah A");
    if (!sendiriC || kunciVisual(sendiriC) === kC) galat.push("aturan " + x.id + " tidak mengubah C");
  }

  // tafsiran lain dari A→B tidak boleh menunjuk pengecoh, dan tafsiran yang sama sederhananya
  // tidak boleh menghasilkan gambar lain
  const kPengecoh = new Set(kOpsi.filter((_, i) => i !== s.kunci));
  for (const lain of SEMUA_KOMBINASI) {
    const hb = terapkanSemua(lain, s.a);
    if (!hb || kunciVisual(hb) !== kB) continue;
    const hd = terapkanSemua(lain, s.c);
    if (!hd) continue;
    const k = kunciVisual(hd);
    const nama = lain.map((x) => x.id).join("+");
    if (kPengecoh.has(k)) galat.push("ambigu: tafsiran " + nama + " juga cocok dengan pengecoh");
    else if (lain.length <= aturan.length && k !== kJawab) galat.push("ambigu: tafsiran " + nama + " memberi jawaban lain");
  }

  if (!s.penjelasan.includes("gambar " + (s.kunci + 1))) galat.push("penjelasan tidak menyebut nomor kunci");
  if (s.catatanOpsi.length !== s.opsi.length) galat.push("catatan opsi tidak lengkap");
  return galat;
}

// ---------- pembuat soal ----------

const BATAS_PERCOBAAN = 3000;

export function buatSoal(tingkat: Tingkat, acak: Acak, id: string): SoalAnalogi {
  for (let coba = 0; coba < BATAS_PERCOBAAN; coba++) {
    const gabungan = tingkat === "sulit" && acak() < 0.5;
    const n = tingkat === "mudah" ? 1 : tingkat === "sedang" || gabungan ? 2 : 3;
    const kategori = pilihKategori(acak, n, gabungan);
    if (kategori.length !== n) continue;
    const aturan = urutkan(kategori.map((k) => pilih(acak, ATURAN.filter((x) => x.kategori === k))));
    if (gabungan && !aturan.some((x) => x.kategori === "susunan") && acak() < 0.3) continue;

    let a = acakGambar(acak, tingkat, gabungan);
    let c = acakGambar(acak, tingkat, gabungan);
    for (const x of aturan) {
      if (x.siapkan) {
        a = x.siapkan(a, acak);
        c = x.siapkan(c, acak);
      }
    }
    if (a.bentuk === c.bentuk) continue;
    if (!sah(a) || !sah(c)) continue;

    const b = terapkanSemua(aturan, a);
    const d = terapkanSemua(aturan, c);
    if (!b || !d) continue;

    const pengecoh = pilihPengecoh(acak, calonPengecoh(acak, aturan, a, c), kunciVisual(d));
    if (pengecoh.length !== JUMLAH_OPSI - 1) continue;

    const kunci = Math.floor(acak() * JUMLAH_OPSI);
    const urut: Calon[] = kocok(acak, pengecoh);
    urut.splice(kunci, 0, { g: d, jenis: "sebagian", alasan: "" });
    const penjelasan = buatPenjelasan(aturan, a, c, d, kunci);
    const soal: SoalAnalogi = {
      id,
      tingkat,
      a, b, c,
      opsi: urut.map((x) => x.g),
      kunci,
      aturan: aturan.map((x) => x.id),
      penjelasan,
      catatanOpsi: urut.map((x, i) => (i === kunci ? "Jawaban benar: C " + frasa(aturan, c) + "." : x.alasan)),
    };
    if (validasiSoal(soal).length === 0) return soal;
  }
  throw new Error("gagal membuat soal " + tingkat + " yang sah setelah " + BATAS_PERCOBAAN + " percobaan");
}

export type Komposisi = Record<Tingkat, number>;

// acakUrutan = false: urut dari mudah ke sulit (mode latihan)
export function buatPaket(komposisi: Komposisi, acak: Acak, awalanId: string, acakUrutan: boolean): SoalAnalogi[] {
  const hasil: SoalAnalogi[] = [];
  const terpakai = new Set<string>();
  for (const t of SEMUA_TINGKAT) {
    for (let i = 0; i < komposisi[t]; i++) {
      let s: SoalAnalogi;
      let ulang = 0;
      // hindari dua soal kembar dalam satu paket
      do {
        s = buatSoal(t, acak, awalanId + "-" + (hasil.length + 1));
        ulang++;
      } while (terpakai.has(kunciVisual(s.a) + "#" + kunciVisual(s.c)) && ulang < 20);
      terpakai.add(kunciVisual(s.a) + "#" + kunciVisual(s.c));
      hasil.push(s);
    }
  }
  return acakUrutan ? kocok(acak, hasil) : hasil;
}

// Contoh di layar petunjuk, digambar ulang dari contoh soal resmi (image.png):
// lingkaran besar → lingkaran kecil; persegi besar → ? ; jawabannya gambar 2.
export const CONTOH: SoalAnalogi = (() => {
  const a = gambarDasar("lingkaran");
  const c = gambarDasar("persegi");
  const opsi = [
    gambarDasar("persegi", { ukuran: "kecil", isi: "hitam" }),
    gambarDasar("persegi", { ukuran: "kecil" }),
    gambarDasar("persegi"),
    gambarDasar("lingkaran", { ukuran: "kecil" }),
    gambarDasar("lingkaran"),
  ];
  return {
    id: "contoh-1",
    tingkat: "mudah",
    a,
    b: gambarDasar("lingkaran", { ukuran: "kecil" }),
    c,
    opsi,
    kunci: 1,
    aturan: ["perkecil"],
    penjelasan: "A (lingkaran besar) diperkecil menjadi B (lingkaran kecil). Dengan aturan yang sama, C (persegi besar) " +
      "diperkecil, jadi dari gambar 1 sampai 5 yang sesuai adalah gambar 2 (persegi kecil).",
    catatanOpsi: [
      "Persegi kecil, tapi diisi hitam; perubahan itu tidak terjadi dari A ke B.",
      "Jawaban benar: C diperkecil.",
      "Ini gambar C tanpa perubahan apa pun.",
      "Ukurannya benar, tapi bangunnya lingkaran, bukan persegi seperti C.",
      "Ini lingkaran besar seperti A; bangun dan ukurannya tidak sesuai.",
    ],
  };
})();
