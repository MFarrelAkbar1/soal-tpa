import type { SesiBca } from "../../bca/sesi";
import { cariKasus, soalBca } from "../../bca/data";
import { pad } from "../../lib/util";
import { Navigator } from "../Navigator";
import { TeksKasus } from "./TeksKasus";
import { ContohJawaban } from "./ContohJawaban";
import { KotakJawaban } from "./KotakJawaban";

interface Props {
  sesi: SesiBca;
  onKetik: (kunci: string, teks: string) => void;
  onKe: (i: number) => void;
  onSelesai: () => void;
}

export function LatihanEsai({ sesi, onKetik, onKe, onSelesai }: Props) {
  const { unit, indeks, jawaban } = sesi;
  const soal = soalBca.find((s) => s.id === unit[indeks])!;
  const kasus = cariKasus(soal.caseId);
  const terisi = unit.map((id) => ((jawaban[id] ?? "").trim() ? 0 : null));

  return (
    <div>
      <div className="progress-baris">
        <span className="posisi">Soal {indeks + 1} dari {unit.length}</span>
        <span className="chip">{soal.category}</span>
      </div>
      <div className="rel"><div className="rel-isi" style={{ width: (indeks / unit.length) * 100 + "%" }}></div></div>

      <section className="lembar">
        <div className="isi">
          <div className="nomor">{pad(indeks + 1)}</div>
          <TeksKasus kasus={kasus} />
          <h2 className="soal">{soal.question}</h2>
          <KotakJawaban
            id={"jawab-" + soal.id}
            label="Jawabanmu"
            petunjuk="Tulis bebas. Tersimpan otomatis di perangkat ini."
            nilai={jawaban[soal.id] ?? ""}
            baris={9}
            onUbah={(t) => onKetik(soal.id, t)}
          />
          <div className="bca-blok-contoh">
            <ContohJawaban key={soal.id} contoh={soal.answer} />
          </div>
        </div>
      </section>

      <div className="aksi-ujian">
        <button className="tombol hantu" disabled={indeks === 0} onClick={() => onKe(indeks - 1)}>&larr; Sebelumnya</button>
        <button className="tombol hantu" disabled={indeks === unit.length - 1} onClick={() => onKe(indeks + 1)}>Berikutnya &rarr;</button>
        <button className="tombol kanan" onClick={onSelesai}>Selesai &amp; lihat rangkuman</button>
      </div>
      <Navigator pilihan={terisi} indeks={indeks} onPilih={onKe} />
    </div>
  );
}
