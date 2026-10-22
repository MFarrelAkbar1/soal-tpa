import { PANDUAN } from "../../bca/panduan";
import { Sheet } from "../Sheet";
import { Daftar } from "./TeksKasus";

interface Props {
  buka: boolean;
  onTutup: () => void;
}

// Materi panduan dari PDF: drawer samping di desktop, bottom sheet di HP. Jawaban tidak terganggu saat dibuka.
export function PanelPanduan({ buka, onTutup }: Props) {
  return (
    <Sheet buka={buka} judul="Panduan" onTutup={onTutup}>
      {PANDUAN.map((b) => (
        <section className="panduan-bagian" key={b.judul}>
          <h3>{b.judul}</h3>
          {b.daftar.map((d) => <Daftar key={d.judul} d={d} />)}
          {b.kutipan?.map((k, i) => <p className="bca-kutipan" key={i}>{k}</p>)}
          <p className="bca-sumber">Sumber: {b.sumber}</p>
        </section>
      ))}
    </Sheet>
  );
}
