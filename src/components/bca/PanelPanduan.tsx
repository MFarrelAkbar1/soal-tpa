import { useEffect, useRef } from "react";
import { PANDUAN } from "../../bca/panduan";
import { Daftar } from "./TeksKasus";

interface Props {
  buka: boolean;
  onTutup: () => void;
}

// Panel samping berisi materi panduan dari PDF; bisa dibuka kapan saja tanpa kehilangan jawaban.
export function PanelPanduan({ buka, onTutup }: Props) {
  const tutup = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buka) return;
    tutup.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onTutup(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [buka, onTutup]);

  if (!buka) return null;

  return (
    <div className="bca-lapis" onClick={onTutup}>
      <aside
        className="bca-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-panduan"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bca-panel-kepala">
          <h2 id="judul-panduan">Panduan</h2>
          <button ref={tutup} type="button" className="tombol hantu" onClick={onTutup}>Tutup</button>
        </div>
        {PANDUAN.map((b) => (
          <section className="bca-panel-bagian" key={b.judul}>
            <h3>{b.judul}</h3>
            {b.daftar.map((d) => <Daftar key={d.judul} d={d} />)}
            {b.kutipan?.map((k, i) => <p className="bca-kutipan" key={i}>{k}</p>)}
            <p className="bca-sumber">Sumber: {b.sumber}</p>
          </section>
        ))}
      </aside>
    </div>
  );
}
