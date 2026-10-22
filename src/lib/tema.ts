// Tema terang/gelap. "sistem" mengikuti prefers-color-scheme dan ikut berubah saat pengaturan OS berubah.
// Skrip anti-kedip di index.html memakai kunci dan aturan yang sama.

export type PilihanTema = "terang" | "gelap" | "sistem";

const KUNCI = "soal-tpa:tema";

export function bacaPilihan(): PilihanTema {
  try {
    const v = window.localStorage.getItem(KUNCI);
    if (v === "terang" || v === "gelap" || v === "sistem") return v;
  } catch {
    // localStorage tidak tersedia: pakai default
  }
  return "sistem";
}

export function simpanPilihan(p: PilihanTema): void {
  try {
    window.localStorage.setItem(KUNCI, p);
  } catch {
    // abaikan; tema tetap berlaku untuk sesi ini
  }
}

function sistemGelap(): boolean {
  return !!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function terapkan(p: PilihanTema): void {
  const gelap = p === "gelap" || (p === "sistem" && sistemGelap());
  document.documentElement.setAttribute("data-theme", gelap ? "dark" : "light");
}
