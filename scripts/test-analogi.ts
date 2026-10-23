// Tes generator Analogi Gambar; dijalankan oleh `npm test` dan `npm run build`.
// Men-generate 1000 soal berbenih (campuran tingkat kesulitan) dan memastikan semuanya lolos
// validasiSoal: tidak ada pilihan kembar, tepat satu pilihan cocok dengan aturan, setiap aturan
// terlihat, dan tidak ada tafsiran lain dari A→B yang menunjuk pengecoh.
// Juga memeriksa contoh di layar petunjuk, komposisi paket ujian, dan determinisme benih.
import { buatAcak } from "../src/analogi/acak.ts";
import { CONTOH, SEMUA_TINGKAT, buatPaket, buatSoal, validasiSoal } from "../src/analogi/generator.ts";
import type { SoalAnalogi, Tingkat } from "../src/analogi/generator.ts";
import { kunciVisual } from "../src/analogi/gambar.ts";
import { ANALOGI } from "../src/config/analogi.ts";

const JUMLAH = 1000;
const galat: string[] = [];
const mulai = performance.now();
const perAturan = new Map<string, number>();
const perTingkat: Record<Tingkat, number> = { mudah: 0, sedang: 0, sulit: 0 };
let gabungan = 0;

for (let i = 0; i < JUMLAH; i++) {
  const tingkat = SEMUA_TINGKAT[i % 3];
  let s: SoalAnalogi;
  try {
    s = buatSoal(tingkat, buatAcak(i + 1), "tes-" + i);
  } catch (e) {
    galat.push(`benih ${i + 1} (${tingkat}): ${(e as Error).message}`);
    continue;
  }
  const masalah = validasiSoal(s);
  if (masalah.length) galat.push(`benih ${i + 1} (${tingkat}): ${masalah.join("; ")}`);

  const harusAturan = tingkat === "mudah" ? 1 : tingkat === "sedang" ? 2 : s.a.dalam ? 2 : 3;
  if (s.aturan.length !== harusAturan) galat.push(`benih ${i + 1}: ${tingkat} memakai ${s.aturan.length} aturan`);
  if (tingkat !== "sulit" && s.a.dalam) galat.push(`benih ${i + 1}: bangun gabungan di tingkat ${tingkat}`);
  // pemeriksaan bebas validator: tidak ada dua pilihan identik
  const kunci = s.opsi.map(kunciVisual);
  if (new Set(kunci).size !== 5) galat.push(`benih ${i + 1}: ada pilihan kembar`);

  perTingkat[tingkat]++;
  if (s.a.dalam) gabungan++;
  for (const a of s.aturan) perAturan.set(a, (perAturan.get(a) ?? 0) + 1);
}

const masalahContoh = validasiSoal(CONTOH);
if (masalahContoh.length) galat.push("contoh petunjuk: " + masalahContoh.join("; "));

const paket = buatPaket(ANALOGI.ujian.komposisi, buatAcak(42), "paket", true);
const total = SEMUA_TINGKAT.reduce((n, t) => n + ANALOGI.ujian.komposisi[t], 0);
if (paket.length !== total) galat.push(`paket ujian berisi ${paket.length} soal, harus ${total}`);
for (const t of SEMUA_TINGKAT) {
  const n = paket.filter((s) => s.tingkat === t).length;
  if (n !== ANALOGI.ujian.komposisi[t]) galat.push(`paket ujian: ${n} soal ${t}, harus ${ANALOGI.ujian.komposisi[t]}`);
}
if (new Set(paket.map((s) => s.id)).size !== paket.length) galat.push("paket ujian: id soal kembar");

const x = JSON.stringify(buatSoal("sulit", buatAcak(7), "d"));
const y = JSON.stringify(buatSoal("sulit", buatAcak(7), "d"));
if (x !== y) galat.push("benih yang sama menghasilkan soal berbeda");

const detik = ((performance.now() - mulai) / 1000).toFixed(1);
if (galat.length) {
  console.error(`Tes Analogi Gambar gagal (${galat.length} masalah):`);
  for (const g of galat.slice(0, 40)) console.error("  - " + g);
  process.exit(1);
}
console.log(`Tes Analogi Gambar OK: ${JUMLAH} soal lolos validasi dalam ${detik} dtk ` +
  `(mudah ${perTingkat.mudah}, sedang ${perTingkat.sedang}, sulit ${perTingkat.sulit}; ${gabungan} bangun gabungan).`);
console.log("  Sebaran aturan: " + [...perAturan.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => k + " " + v).join(", "));
