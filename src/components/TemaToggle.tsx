import { createContext, useContext, type ReactNode } from "react";
import type { PilihanTema } from "../lib/tema";
import { useTema } from "../hooks/useTema";
import { Ikon, type NamaIkon } from "./Ikon";

const TemaKonteks = createContext<[PilihanTema, (p: PilihanTema) => void]>(["sistem", () => {}]);

export function PenyediaTema({ children }: { children: ReactNode }) {
  const nilai = useTema();
  return <TemaKonteks.Provider value={nilai}>{children}</TemaKonteks.Provider>;
}

const OPSI: { id: PilihanTema; label: string; ikon: NamaIkon }[] = [
  { id: "terang", label: "Terang", ikon: "matahari" },
  { id: "gelap", label: "Gelap", ikon: "bulan" },
  { id: "sistem", label: "Sistem", ikon: "layar" },
];

// ringkas = satu tombol yang berputar Terang → Gelap → Sistem (untuk header ujian yang sempit)
export function TemaToggle({ ringkas = false }: { ringkas?: boolean }) {
  const [pilihan, pilih] = useContext(TemaKonteks);

  if (ringkas) {
    const i = OPSI.findIndex((o) => o.id === pilihan);
    const sekarang = OPSI[i];
    const berikut = OPSI[(i + 1) % OPSI.length];
    return (
      <button
        type="button"
        className="tombol-ikon"
        onClick={() => pilih(berikut.id)}
        aria-label={"Tema: " + sekarang.label + ". Ganti ke " + berikut.label}
        title={"Tema: " + sekarang.label}
      >
        <Ikon nama={sekarang.ikon} />
      </button>
    );
  }

  return (
    <div className="segmen segmen-tema" role="radiogroup" aria-label="Tema tampilan">
      {OPSI.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={pilihan === o.id}
          aria-label={o.label}
          className={"segmen-tombol" + (pilihan === o.id ? " aktif" : "")}
          onClick={() => pilih(o.id)}
        >
          <Ikon nama={o.ikon} ukuran={18} />
          <span className="segmen-teks">{o.label}</span>
        </button>
      ))}
    </div>
  );
}
