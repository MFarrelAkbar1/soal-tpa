// Validasi bank soal; dijalankan otomatis oleh `npm run build`.
// Gagal (exit 1) bila: id duplikat, answer di luar rentang options,
// jumlah options di luar 2–6, file image tidak ada di public/,
// atau paket ujian yang section-nya tidak punya soal.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { bankSoal } from "../src/data/index.ts";
import { PAKET } from "../src/config/paket.ts";

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

if (galat.length) {
  console.error(`Validasi data GAGAL (${galat.length} masalah):`);
  for (const g of galat) console.error("  - " + g);
  process.exit(1);
}
console.log(`Validasi data OK: ${bankSoal.length} soal, ${PAKET.length} paket ujian.`);
