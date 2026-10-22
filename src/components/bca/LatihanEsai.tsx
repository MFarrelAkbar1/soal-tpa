import type { SesiBca } from "../../bca/sesi";
import { cariKasus, soalBca } from "../../bca/data";
import { pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { TeksKasus } from "./TeksKasus";
import { ContohJawaban } from "./ContohJawaban";
import { KotakJawaban } from "./KotakJawaban";

interface Props {
  sesi: SesiBca;
  tersimpan: boolean;
  onKetik: (kunci: string, teks: string) => void;
  onKe: (i: number) => void;
  onSelesai: () => void;
}

export function LatihanEsai({ sesi, tersimpan, onKetik, onKe, onSelesai }: Props) {
  const { unit, indeks, jawaban } = sesi;
  const soal = soalBca.find((s) => s.id === unit[indeks])!;
  const kasus = cariKasus(soal.caseId);

  return (
    <div>
      <div className="progres">
        <div className="progres-teks">
          <span>Soal {indeks + 1} dari {unit.length}</span>
          <span className="chip madu">{soal.category}</span>
        </div>
        <div className="progres-rel" role="progressbar" aria-label="Posisi soal" aria-valuemin={1} aria-valuemax={unit.length} aria-valuenow={indeks + 1}>
          <div className="progres-isi" style={{ width: ((indeks + 1) / unit.length) * 100 + "%" }}></div>
        </div>
      </div>

      <div className="transisi-soal" key={soal.id}>
        <div className="bca-dua-kolom">
          <div className="bca-kolom-kasus">
            <TeksKasus kasus={kasus} />
          </div>
          <section className="kartu kartu-soal" aria-labelledby={"q-" + soal.id}>
            <div className="soal-kepala"><span className="soal-nomor">Soal {pad(indeks + 1)}</span></div>
            <h2 className="soal-teks" id={"q-" + soal.id}>{soal.question}</h2>
            <KotakJawaban
              id={"jawab-" + soal.id}
              label="Jawabanmu"
              petunjuk="Tulis jawabanmu di sini. Jawaban tersimpan otomatis."
              nilai={jawaban[soal.id] ?? ""}
              baris={9}
              tersimpan={tersimpan}
              onUbah={(t) => onKetik(soal.id, t)}
            />
            <ContohJawaban key={soal.id} contoh={soal.answer} />
          </section>
        </div>
      </div>

      <div className="bilah-aksi">
        <div className="bilah-isi">
          <button className="tombol sekunder" disabled={indeks === 0} onClick={() => onKe(indeks - 1)} aria-label="Soal sebelumnya">
            <Ikon nama="kiri" ukuran={18} /><span className="teks-lebar">Sebelumnya</span>
          </button>
          <button className="tombol sekunder tumbuh" disabled={indeks === unit.length - 1} onClick={() => onKe(indeks + 1)} aria-label="Soal berikutnya">
            Berikutnya<Ikon nama="kanan" ukuran={18} />
          </button>
          <button className="tombol" onClick={onSelesai}>Rangkuman</button>
        </div>
      </div>
    </div>
  );
}
