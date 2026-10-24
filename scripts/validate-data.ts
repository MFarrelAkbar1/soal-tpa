// Validasi bank soal; dijalankan otomatis oleh `npm run build`.
// Gagal (exit 1) bila: id duplikat, answer di luar rentang options,
// jumlah options di luar 2–6, file image tidak ada di public/,
// atau paket ujian yang section-nya tidak punya soal.
// Section BCA Finance (esai): caseId harus ada, tiap kasus punya soal dan teks,
// answer null atau berisi contoh jawaban yang tidak kosong, baris tabel selebar kolomnya,
// dan paket ujian tidak meminta kasus lebih banyak dari yang tersedia.
// Analogi Gambar: komposisi soal per tingkat dan durasi ujian di src/config/analogi.ts.
// Psikotes BCA: TIU 5 tepat 30 soal bernomor 1–30 dengan kunci 1–5 dan 8 file gambar per soal,
// PAPI Kostik 90 pasang (a dan b terisi), CBI 140 pernyataan; semua id unik dan nomor berurutan.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { bankSoal } from "../src/data/index.ts";
import { PAKET } from "../src/config/paket.ts";
import { kasusBca, soalBca } from "../src/bca/data/index.ts";
import { PAKET_BCA } from "../src/config/paket-bca.ts";
import { ANALOGI } from "../src/config/analogi.ts";
import { PSIKOTES } from "../src/config/psikotes.ts";
import { BAGIAN_GAMBAR, SOAL_TIU5, gambarTiu5 } from "../src/bca/data/tiu5.ts";
import { SOAL_TIU5_BARU } from "../src/bca/data/tiu5-baru.ts";
import { PERNYATAAN_PAPI } from "../src/bca/data/papi.ts";
import { PERNYATAAN_CBI } from "../src/bca/data/cbi.ts";

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const galat: string[] = [];
const idTerpakai = new Set<string>();

for (const s of bankSoal) {
  const label = s.id || "(tanpa id)";
  if (!s.id) galat.push(`${label}: id kosong`);
  else if (idTerpakai.has(s.id)) galat.push(`${label}: id duplikat`);
  idTerpakai.add(s.id);

  if (s.options.length < 2 || s.options.length > 6) {
    galat.push(`${label}: jumlah options ${s.options.length}, harus 2–6`);
  }
  if (s.answer !== null && (!Number.isInteger(s.answer) || s.answer < 0 || s.answer >= s.options.length)) {
    galat.push(`${label}: answer ${s.answer} di luar rentang 0–${s.options.length - 1}`);
  }
  if (s.image !== undefined && !existsSync(path.join(publicDir, s.image))) {
    galat.push(`${label}: image tidak ditemukan: public/${s.image}`);
  }
}

for (const p of PAKET) {
  if (!bankSoal.some((s) => s.section === p.section)) {
    galat.push(`paket ${p.id}: tidak ada soal untuk section "${p.section}"`);
  }
}

const idKasus = new Set<string>();
for (const k of kasusBca) {
  if (idKasus.has(k.id)) galat.push(`kasus ${k.id}: id duplikat`);
  idKasus.add(k.id);
  if (!k.passage.length || k.passage.some((p) => !p.trim())) galat.push(`kasus ${k.id}: passage kosong`);
  if (!k.sumber.length) galat.push(`kasus ${k.id}: sumber PDF kosong`);
  if (!soalBca.some((s) => s.caseId === k.id)) galat.push(`kasus ${k.id}: tidak punya soal`);
  for (const t of k.tabel ?? []) {
    t.baris.forEach((b, i) => {
      if (b.length !== t.kolom.length) galat.push(`kasus ${k.id}: tabel "${t.judul}" baris ${i + 1} berisi ${b.length} sel, kolom ${t.kolom.length}`);
    });
  }
}

for (const s of soalBca) {
  const label = s.id || "(tanpa id)";
  if (!s.id) galat.push(`${label}: id kosong`);
  else if (idTerpakai.has(s.id)) galat.push(`${label}: id duplikat`);
  idTerpakai.add(s.id);
  if (s.type !== "essay") galat.push(`${label}: type harus "essay"`);
  if (!s.question.trim()) galat.push(`${label}: question kosong`);
  if (!idKasus.has(s.caseId)) galat.push(`${label}: caseId "${s.caseId}" tidak ada`);
  if (s.answer !== null) {
    if (!s.answer.length) galat.push(`${label}: answer berupa daftar kosong; pakai null bila PDF tidak memuat contoh jawaban`);
    for (const c of s.answer) {
      const isi = c.paragraf.some((p) => p.trim()) || (c.poin ?? []).some((d) => d.butir.length);
      if (!isi) galat.push(`${label}: contoh jawaban "${c.label}" kosong`);
      if (!c.sumber.trim()) galat.push(`${label}: contoh jawaban "${c.label}" tanpa sumber`);
    }
  }
}

const kolamUjian = kasusBca.filter((k) => k.ujian).length;
for (const p of PAKET_BCA) {
  if (p.jumlahKasus < 1 || p.jumlahKasus > kolamUjian) {
    galat.push(`paket BCA ${p.id}: jumlahKasus ${p.jumlahKasus}, tersedia ${kolamUjian}`);
  }
}

// Analogi Gambar: soal dibuat generator (diuji di scripts/test-analogi.ts); di sini cukup konfigurasinya.
for (const [mode, { komposisi }] of Object.entries(ANALOGI)) {
  const n = Object.values(komposisi);
  if (n.some((x) => !Number.isInteger(x) || x < 0) || n.reduce((a, b) => a + b, 0) < 1) {
    galat.push(`analogi ${mode}: komposisi soal tidak sah (${JSON.stringify(komposisi)})`);
  }
}
if (!Number.isInteger(ANALOGI.ujian.detik) || ANALOGI.ujian.detik < 60) {
  galat.push(`analogi ujian: durasi ${ANALOGI.ujian.detik} detik, minimal 60`);
}

// Psikotes BCA Finance
function cekDaftar(nama: string, daftar: { id: string; nomor: number }[], harus: number) {
  if (daftar.length !== harus) galat.push(`${nama}: ${daftar.length} butir, harus ${harus}`);
  daftar.forEach((x, i) => {
    if (!x.id) galat.push(`${nama} no. ${i + 1}: id kosong`);
    else if (idTerpakai.has(x.id)) galat.push(`${nama} ${x.id}: id duplikat`);
    idTerpakai.add(x.id);
    if (x.nomor !== i + 1) galat.push(`${nama} ${x.id}: nomor ${x.nomor}, seharusnya ${i + 1} (urutan PDF)`);
  });
}

cekDaftar("TIU 5", SOAL_TIU5, 30);
for (const s of SOAL_TIU5) {
  if (!Number.isInteger(s.kunci) || s.kunci < 1 || s.kunci > 5) galat.push(`TIU 5 ${s.id}: kunci ${s.kunci} di luar 1–5`);
  if (!s.pembahasan.trim()) galat.push(`TIU 5 ${s.id}: pembahasan kosong`);
  for (const b of BAGIAN_GAMBAR) {
    const f = gambarTiu5(s.nomor, b);
    if (!existsSync(path.join(publicDir, f))) galat.push(`TIU 5 ${s.id}: gambar tidak ditemukan: public/${f}`);
  }
}
// soal baru TIU 5 (gambarnya diuji di scripts/test-analogi.ts)
cekDaftar("TIU 5 baru", SOAL_TIU5_BARU, 30);
for (const s of SOAL_TIU5_BARU) {
  if (!Number.isInteger(s.kunci) || s.kunci < 1 || s.kunci > 5) galat.push(`TIU 5 baru ${s.id}: kunci ${s.kunci} di luar 1–5`);
  if (!s.pembahasan.trim() || s.pembahasan.includes("#")) galat.push(`TIU 5 baru ${s.id}: pembahasan kosong atau belum bernomor`);
}
if (!Number.isInteger(PSIKOTES.tiu5Baru.detik) || PSIKOTES.tiu5Baru.detik < 60) galat.push(`TIU 5 baru: durasi ${PSIKOTES.tiu5Baru.detik} detik, minimal 60`);
if (!Number.isInteger(PSIKOTES.tiu5.detik) || PSIKOTES.tiu5.detik < 60) galat.push(`TIU 5: durasi ${PSIKOTES.tiu5.detik} detik, minimal 60`);

cekDaftar("PAPI", PERNYATAAN_PAPI, 90);
for (const p of PERNYATAAN_PAPI) {
  if (!p.a.trim() || !p.b.trim()) galat.push(`PAPI ${p.id}: pernyataan a/b kosong`);
}
cekDaftar("CBI", PERNYATAAN_CBI, 140);
for (const p of PERNYATAAN_CBI) {
  if (!p.teks.trim()) galat.push(`CBI ${p.id}: pernyataan kosong`);
}

if (galat.length) {
  console.error(`Validasi data GAGAL (${galat.length} masalah):`);
  for (const g of galat) console.error("  - " + g);
  process.exit(1);
}
console.log(`Validasi data OK: ${bankSoal.length} soal, ${PAKET.length} paket ujian.`);
console.log(`BCA Finance OK: ${soalBca.length} soal esai dari ${kasusBca.length} kasus, ` +
  `${soalBca.filter((s) => s.answer).length} dengan contoh jawaban, ${PAKET_BCA.length} paket ujian.`);
console.log(`Psikotes BCA OK: TIU 5 ${SOAL_TIU5.length} soal (${SOAL_TIU5.length * BAGIAN_GAMBAR.length} gambar) + ${SOAL_TIU5_BARU.length} soal baru, ` +
  `PAPI ${PERNYATAAN_PAPI.length} pasang, CBI ${PERNYATAAN_CBI.length} pernyataan.`);
