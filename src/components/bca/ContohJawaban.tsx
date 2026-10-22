import { useState } from "react";
import type { ContohJawaban as Contoh } from "../../bca/types";
import { Ikon } from "../Ikon";
import { Daftar } from "./TeksKasus";

interface Props {
  contoh: Contoh[] | null;
  terbuka?: boolean; // langsung tampil tanpa tombol buka (halaman rangkuman)
}

// Contoh jawaban dari PDF. Bila ada lebih dari satu versi (mis. Singkat dan Lengkap), bisa dibuka bergantian.
export function ContohJawaban({ contoh, terbuka = false }: Props) {
  const [buka, setBuka] = useState(terbuka);
  const [aktif, setAktif] = useState(0);

  if (!contoh) {
    return <p className="bca-tanpa-contoh">Belum ada contoh jawaban di PDF untuk soal ini.</p>;
  }

  if (!buka) {
    return (
      <button type="button" className="tombol sekunder penuh" onClick={() => setBuka(true)} aria-expanded="false">
        <Ikon nama="buku" ukuran={18} />
        Buka contoh jawaban{contoh.length > 1 ? " (" + contoh.map((c) => c.label).join(" / ") + ")" : ""}
      </button>
    );
  }

  const c = contoh[Math.min(aktif, contoh.length - 1)];
  return (
    <div className="bca-contoh">
      <div className="bca-contoh-kepala">
        {contoh.length > 1 ? (
          <div className="segmen" role="tablist" aria-label="Versi contoh jawaban">
            {contoh.map((x, i) => (
              <button
                key={x.label}
                type="button"
                role="tab"
                aria-selected={i === aktif}
                className={"segmen-tombol" + (i === aktif ? " aktif" : "")}
                onClick={() => setAktif(i)}
              >
                {x.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="bca-contoh-label">Contoh jawaban · {c.label}</span>
        )}
        {!terbuka && (
          <button type="button" className="tautan" onClick={() => setBuka(false)} aria-expanded="true">Tutup</button>
        )}
      </div>
      <div role="tabpanel" aria-label={c.label}>
        {c.poin?.map((d) => <Daftar key={d.judul} d={d} />)}
        {c.paragraf.map((p, i) => <p className="bca-paragraf" key={i}>{p}</p>)}
        <p className="bca-sumber">Sumber: {c.sumber}</p>
      </div>
    </div>
  );
}
