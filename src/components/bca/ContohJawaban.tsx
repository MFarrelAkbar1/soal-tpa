import { useState } from "react";
import type { ContohJawaban as Contoh } from "../../bca/types";
import { Daftar } from "./TeksKasus";

interface Props {
  contoh: Contoh[] | null;
  terbuka?: boolean; // langsung tampil tanpa tombol buka (halaman hasil)
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
      <button type="button" className="tombol hantu" onClick={() => setBuka(true)}>
        Buka contoh jawaban
      </button>
    );
  }

  const c = contoh[Math.min(aktif, contoh.length - 1)];
  return (
    <div className="bca-contoh">
      <div className="bca-contoh-kepala">
        {contoh.length > 1 ? (
          <div className="bca-tab" role="tablist" aria-label="Versi contoh jawaban">
            {contoh.map((x, i) => (
              <button
                key={x.label}
                type="button"
                role="tab"
                aria-selected={i === aktif}
                className={"bca-tab-tombol" + (i === aktif ? " aktif" : "")}
                onClick={() => setAktif(i)}
              >
                {x.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="bca-contoh-label">{c.label}</span>
        )}
        {!terbuka && (
          <button type="button" className="bca-tautan" onClick={() => setBuka(false)}>Tutup</button>
        )}
      </div>
      <div role="tabpanel">
        {c.poin?.map((d) => <Daftar key={d.judul} d={d} />)}
        {c.paragraf.map((p, i) => <p className="bca-paragraf" key={i}>{p}</p>)}
        <p className="bca-sumber">Sumber: {c.sumber}</p>
      </div>
    </div>
  );
}
