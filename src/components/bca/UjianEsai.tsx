import type { SesiBca } from "../../bca/sesi";
import { kunciSlide } from "../../bca/sesi";
import { cariKasus, soalDariKasus } from "../../bca/data";
import { BAGIAN_SLIDE } from "../../config/paket-bca";
import { pad } from "../../lib/util";
import { Navigator } from "../Navigator";
import { TeksKasus } from "./TeksKasus";
import { KotakJawaban } from "./KotakJawaban";

interface Props {
  sesi: SesiBca;
  onKetik: (kunci: string, teks: string) => void;
  onKe: (i: number) => void;
  onSelesai: () => void;
}

export function adaIsian(sesi: SesiBca, caseId: string): boolean {
  return BAGIAN_SLIDE.some((b) => (sesi.jawaban[kunciSlide(caseId, b.id)] ?? "").trim() !== "");
}

// Mode ujian: satu layar per kasus, jawaban mengikuti template 5 slide tes asli.
export function UjianEsai({ sesi, onKetik, onKe, onSelesai }: Props) {
  const { unit, indeks } = sesi;
  const kasus = cariKasus(unit[indeks]);
  const soal = soalDariKasus(kasus.id);
  const terisi = unit.map((id) => (adaIsian(sesi, id) ? 0 : null));

  return (
    <div>
      <div className="progress-baris">
        <span className="posisi">Kasus {indeks + 1} dari {unit.length}</span>
        <span className="chip">{kasus.kelompok}</span>
      </div>
      <div className="rel"><div className="rel-isi" style={{ width: (indeks / unit.length) * 100 + "%" }}></div></div>

      <section className="lembar">
        <div className="isi">
          <div className="nomor">{pad(indeks + 1)}</div>
          <TeksKasus kasus={kasus} />
          <div className="bca-pertanyaan">
            <p className="bca-daftar-judul">Pertanyaan</p>
            {soal.map((s) => <h2 className="soal" key={s.id}>{s.question}</h2>)}
          </div>
          <p className="bca-catatan-slide">
            Susun jawabanmu seperti presentasi 5 slide. Contoh jawaban baru bisa dibuka setelah ujian selesai.
          </p>
          {BAGIAN_SLIDE.map((b) => (
            <KotakJawaban
              key={kasus.id + b.id}
              id={"slide-" + kasus.id + "-" + b.id}
              label={b.label}
              petunjuk={b.petunjuk}
              nilai={sesi.jawaban[kunciSlide(kasus.id, b.id)] ?? ""}
              baris={b.id === "judul" ? 2 : 6}
              onUbah={(t) => onKetik(kunciSlide(kasus.id, b.id), t)}
            />
          ))}
        </div>
      </section>

      <div className="aksi-ujian">
        <button className="tombol hantu" disabled={indeks === 0} onClick={() => onKe(indeks - 1)}>&larr; Kasus sebelumnya</button>
        <button className="tombol hantu" disabled={indeks === unit.length - 1} onClick={() => onKe(indeks + 1)}>Kasus berikutnya &rarr;</button>
        <button className="tombol kanan" onClick={onSelesai}>Selesaikan sekarang</button>
      </div>
      {unit.length > 1 && <Navigator pilihan={terisi} indeks={indeks} onPilih={onKe} />}
    </div>
  );
}
