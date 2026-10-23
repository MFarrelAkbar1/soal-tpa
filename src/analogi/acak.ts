// Pembangkit bilangan acak berbenih (mulberry32) supaya soal bisa direproduksi di tes.
export type Acak = () => number;

export function buatAcak(benih: number): Acak {
  let a = benih >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function benihAcak(): number {
  return Math.floor(Math.random() * 4294967296);
}

export function pilih<T>(acak: Acak, daftar: readonly T[]): T {
  return daftar[Math.floor(acak() * daftar.length)];
}

export function kocok<T>(acak: Acak, daftar: readonly T[]): T[] {
  const hasil = daftar.slice();
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}
