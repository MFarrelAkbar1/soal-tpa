import { useEffect, useRef, type ReactNode } from "react";
import { Ikon } from "./Ikon";

interface Props {
  buka: boolean;
  judul: string;
  onTutup: () => void;
  children: ReactNode;
}

const FOKUS = 'button:not([disabled]), [href], input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

// Bottom sheet di HP, drawer samping di layar lebar (diatur CSS). Fokus dikunci di dalam,
// Esc dan klik latar menutup, fokus kembali ke tombol pembuka.
export function Sheet({ buka, judul, onTutup, children }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const tutup = useRef<HTMLButtonElement>(null);
  const onTutupRef = useRef(onTutup);
  onTutupRef.current = onTutup;

  useEffect(() => {
    if (!buka) return;
    const sebelumnya = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    tutup.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onTutupRef.current(); return; }
      if (e.key !== "Tab" || !panel.current) return;
      const el = Array.from(panel.current.querySelectorAll<HTMLElement>(FOKUS));
      if (!el.length) return;
      const pertama = el[0], terakhir = el[el.length - 1];
      if (e.shiftKey && document.activeElement === pertama) { e.preventDefault(); terakhir.focus(); }
      else if (!e.shiftKey && document.activeElement === terakhir) { e.preventDefault(); pertama.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      sebelumnya?.focus?.();
    };
  }, [buka]);

  if (!buka) return null;

  return (
    <div className="sheet-lapis" onClick={onTutup}>
      <div
        ref={panel}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={judul}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-pegangan" aria-hidden="true" />
        <div className="sheet-kepala">
          <h2 className="sheet-judul">{judul}</h2>
          <button ref={tutup} type="button" className="tombol-ikon" onClick={onTutup} aria-label={"Tutup " + judul}>
            <Ikon nama="silang" />
          </button>
        </div>
        <div className="sheet-isi">{children}</div>
      </div>
    </div>
  );
}
