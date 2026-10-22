import type { SesiBca } from "./sesi";
import { kunciSlide, namaMode } from "./sesi";
import { cariKasus, soalBca, soalDariKasus } from "./data";
import { BAGIAN_SLIDE } from "../config/paket-bca";
import { pad } from "../lib/util";

// Teks polos seluruh jawaban peserta, untuk tombol salin dan unduh di halaman hasil.

function tanggal(ms: number): string {
  const d = new Date(ms);
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
    " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
}

function isiAtauKosong(teks: string | undefined): string {
  const t = (teks ?? "").trim();
  return t ? t : "(tidak dijawab)";
}

export function teksJawaban(s: SesiBca): string {
  const garis = "=".repeat(60);
  const out: string[] = [
    "BCA Finance · " + namaMode(s.mode),
    "Dimulai: " + tanggal(s.mulai) + (s.selesai ? " · Selesai: " + tanggal(s.selesai.pada) : ""),
    garis,
  ];

  s.unit.forEach((id, i) => {
    out.push("");
    if (s.mode === "latihan") {
      const soal = soalBca.find((x) => x.id === id)!;
      const kasus = cariKasus(soal.caseId);
      out.push(pad(i + 1) + ". [" + soal.category + "] " + kasus.judul);
      out.push("Pertanyaan: " + soal.question);
      out.push("");
      out.push("Jawaban saya:");
      out.push(isiAtauKosong(s.jawaban[id]));
    } else {
      const kasus = cariKasus(id);
      out.push("Kasus " + (i + 1) + ". [" + kasus.kelompok + "] " + kasus.judul);
      for (const soal of soalDariKasus(id)) out.push("Pertanyaan: " + soal.question);
      for (const b of BAGIAN_SLIDE) {
        out.push("");
        out.push(b.label);
        out.push(isiAtauKosong(s.jawaban[kunciSlide(id, b.id)]));
      }
    }
    out.push("");
    out.push("-".repeat(60));
  });

  return out.join("\n");
}

export function namaFile(s: SesiBca): string {
  const d = new Date(s.selesai?.pada ?? s.mulai);
  return "jawaban-bca-finance-" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
    "-" + pad(d.getHours()) + pad(d.getMinutes()) + ".txt";
}

export async function salinTeks(teks: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // writeText bisa menggantung tanpa batas bila dokumen tidak fokus; batasi lalu pakai cara lama
      const ok = await Promise.race([
        navigator.clipboard.writeText(teks).then(() => true),
        new Promise<boolean>((r) => window.setTimeout(() => r(false), 1500)),
      ]);
      if (ok) return true;
    }
  } catch {
    // jatuh ke cara lama di bawah
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = teks;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function unduhTeks(teks: string, nama: string): void {
  const url = URL.createObjectURL(new Blob([teks], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nama;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
