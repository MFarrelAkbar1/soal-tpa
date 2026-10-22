import { useCallback, useEffect, useState } from "react";
import type { PilihanTema } from "../lib/tema";
import { bacaPilihan, simpanPilihan, terapkan } from "../lib/tema";

export function useTema(): [PilihanTema, (p: PilihanTema) => void] {
  const [pilihan, setPilihan] = useState<PilihanTema>(bacaPilihan);

  useEffect(() => {
    terapkan(pilihan);
    if (pilihan !== "sistem" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const ubah = () => terapkan("sistem");
    mq.addEventListener("change", ubah);
    return () => mq.removeEventListener("change", ubah);
  }, [pilihan]);

  const pilih = useCallback((p: PilihanTema) => {
    simpanPilihan(p);
    setPilihan(p);
  }, []);

  return [pilihan, pilih];
}
