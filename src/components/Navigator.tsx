import { pad } from "../lib/util";

interface Props {
  pilihan: (number | null)[];
  indeks: number;
  onPilih: (i: number) => void;
  label?: string;
}

// Grid nomor soal. Terisi = garis tegas + latar; kosong = garis putus-putus; aktif = cincin madu.
export function Navigator({ pilihan, indeks, onPilih, label = "Soal" }: Props) {
  const terisi = pilihan.filter((p) => p !== null).length;
  return (
    <div>
      <div className="nav-kepala">
        <p className="nav-label">Navigator {label.toLowerCase()}</p>
        <span className="nav-hitung">{terisi} dari {pilihan.length} terisi</span>
      </div>
      <div className="nav-grid">
        {pilihan.map((p, i) => (
          <button
            key={i}
            type="button"
            className={"nav-nomor" + (p !== null ? " terisi" : "") + (i === indeks ? " aktif" : "")}
            aria-label={label + " " + (i + 1) + (p !== null ? ", terisi" : ", kosong")}
            aria-current={i === indeks ? "true" : undefined}
            onClick={() => onPilih(i)}
          >
            {pad(i + 1)}
          </button>
        ))}
      </div>
      <p className="nav-legenda" aria-hidden="true">
        <span><i className="lg-terisi" />Terisi</span>
        <span><i className="lg-kosong" />Kosong</span>
        <span><i className="lg-aktif" />Sedang dibuka</span>
      </p>
    </div>
  );
}
