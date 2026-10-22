import { pad } from "../lib/util";

interface Props {
  pilihan: (number | null)[];
  indeks: number;
  onPilih: (i: number) => void;
}

export function Navigator({ pilihan, indeks, onPilih }: Props) {
  const terisi = pilihan.filter((p) => p !== null).length;
  return (
    <div className="navigator">
      <div className="nav-kepala">
        <span className="nav-label">Navigator soal</span>
        <span className="nav-hitung">{terisi} dari {pilihan.length} terjawab</span>
      </div>
      <div className="nav-grid">
        {pilihan.map((p, i) => (
          <button
            key={i}
            type="button"
            className={"nav-nomor" + (p !== null ? " terisi" : "") + (i === indeks ? " aktif" : "")}
            aria-label={"Ke soal " + (i + 1)}
            aria-current={i === indeks ? "true" : undefined}
            onClick={() => onPilih(i)}
          >
            {pad(i + 1)}
          </button>
        ))}
      </div>
    </div>
  );
}
