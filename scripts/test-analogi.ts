// Tes generator Analogi Gambar; dijalankan oleh `npm test` dan `npm run build`.
// Men-generate 1000 soal berbenih (campuran tingkat kesulitan) dan memastikan semuanya lolos
// validasiSoal: tidak ada pilihan kembar, tepat satu pilihan cocok dengan aturan, setiap aturan
// terlihat, dan tidak ada tafsiran lain dari A→B yang menunjuk pengecoh.
// Juga memeriksa contoh di layar petunjuk, komposisi paket ujian, dan determinisme benih,
// serta 30 soal baru TIU 5 (src/bca/data/tiu5-baru.ts).
import { buatAcak } from "../src/analogi/acak.ts";
import { CONTOH, SEMUA_TINGKAT, buatPaket, buatSoal, validasiSoal } from "../src/analogi/generator.ts";
import type { SoalAnalogi, Tingkat } from "../src/analogi/generator.ts";
import { kunciVisual } from "../src/analogi/gambar.ts";
import { ANALOGI } from "../src/config/analogi.ts";
import { SOAL_TIU5_BARU } from "../src/bca/data/tiu5-baru.ts";
import { cerminH, kunciFig, putar } from "../src/analogi/vektor.ts";
import type { Fig } from "../src/analogi/vektor.ts";

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

// Soal baru TIU 5: pilihan tidak kembar, jawaban beda dari C, gambar di dalam kanvas, dan tidak ada
// putaran/cerminan lain yang juga mengubah A menjadi B tetapi menunjuk ke salah satu pengecoh.
const SIMETRI: ((f: Fig) => Fig)[] = [];
for (let k = 0; k < 8; k++) {
  SIMETRI.push((f) => putar(f, k * 45));
  SIMETRI.push((f) => putar(cerminH(f), k * 45));
}
if (SOAL_TIU5_BARU.length !== 30) galat.push(`TIU 5 baru: ${SOAL_TIU5_BARU.length} soal, harus 30`);
for (const s of SOAL_TIU5_BARU) {
  const label = "TIU 5 baru " + s.id;
  if (s.opsi.length !== 5) { galat.push(`${label}: ${s.opsi.length} pilihan`); continue; }
  const kunciOpsi = s.opsi.map(kunciFig);
  if (new Set(kunciOpsi).size !== 5) galat.push(`${label}: ada pilihan kembar`);
  const benar = kunciOpsi[s.kunci - 1];
  if (kunciFig(s.a) === kunciFig(s.b)) galat.push(`${label}: A sama dengan B`);
  if (kunciFig(s.c) === benar) galat.push(`${label}: jawaban sama dengan C`);
  for (const f of [s.a, s.b, s.c, ...s.opsi]) {
    if (f.some((j) => j.t.some(([x, y]) => x < 2 || x > 98 || y < 2 || y > 98))) galat.push(`${label}: gambar keluar kanvas`);
  }
  const kunciB = kunciFig(s.b);
  SIMETRI.forEach((T, i) => {
    if (kunciFig(T(s.a)) !== kunciB) return;
    const hasil = kunciFig(T(s.c));
    const j = kunciOpsi.indexOf(hasil);
    if (j >= 0 && j !== s.kunci - 1) galat.push(`${label}: tafsiran simetri #${i} menunjuk gambar ${j + 1}`);
  });
}

const detik = ((performance.now() - mulai) / 1000).toFixed(1);
if (galat.length) {
  console.error(`Tes Analogi Gambar gagal (${galat.length} masalah):`);
  for (const g of galat.slice(0, 40)) console.error("  - " + g);
  process.exit(1);
}
console.log(`Tes Analogi Gambar OK: ${JUMLAH} soal lolos validasi dalam ${detik} dtk, ` +
  `${SOAL_TIU5_BARU.length} soal baru TIU 5 lolos ` +
  `(mudah ${perTingkat.mudah}, sedang ${perTingkat.sedang}, sulit ${perTingkat.sulit}; ${gabungan} bangun gabungan).`);
console.log("  Sebaran aturan: " + [...perAturan.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => k + " " + v).join(", "));
