import type { SesiBca } from "../../bca/sesi";
import { kunciSlide } from "../../bca/sesi";
import { cariKasus, soalDariKasus } from "../../bca/data";
import { BAGIAN_SLIDE } from "../../config/paket-bca";
import { Ikon } from "../Ikon";
import { TeksKasus } from "./TeksKasus";
import { KotakJawaban } from "./KotakJawaban";

interface Props {
  sesi: SesiBca;
  tersimpan: boolean;
  onKetik: (kunci: string, teks: string) => void;
}

export function adaIsian(sesi: SesiBca, caseId: string): boolean {
  return BAGIAN_SLIDE.some((b) => (sesi.jawaban[kunciSlide(caseId, b.id)] ?? "").trim() !== "");
}

function idSlide(caseId: string, bagian: string): string {
  return "slide-" + caseId + "-" + bagian;
}

// lompat ke kartu slide tertentu lalu fokus ke kotak isiannya (tanpa animasi gulir: mode ujian tenang)
function lompat(caseId: string, bagian: string) {
  document.getElementById("kartu-" + idSlide(caseId, bagian))?.scrollIntoView({ block: "start" });
  document.getElementById(idSlide(caseId, bagian))?.focus({ preventScroll: true });
}

// Mode ujian: satu layar per kasus, lima kartu slide tersusun vertikal dengan titik progres 1–5.
export function UjianEsai({ sesi, tersimpan, onKetik }: Props) {
  const { unit, indeks } = sesi;
  const kasus = cariKasus(unit[indeks]);
  const soal = soalDariKasus(kasus.id);
  const isi = (b: string) => (sesi.jawaban[kunciSlide(kasus.id, b)] ?? "").trim() !== "";
  const terisi = BAGIAN_SLIDE.filter((b) => isi(b.id)).length;

  return (
    <div className="transisi-soal" key={kasus.id}>
      <div className="progres">
        <div className="progres-teks">
          <span>Kasus {indeks + 1} dari {unit.length}</span>
          <span className="chip madu">{kasus.kelompok}</span>
        </div>
      </div>

      <div className="bca-dua-kolom">
        <div className="bca-kolom-kasus">
          <TeksKasus kasus={kasus} />
        </div>

        <div>
          <section className="kartu kartu-soal bca-pertanyaan" aria-label="Pertanyaan">
            <p className="bca-daftar-judul">Pertanyaan</p>
            {soal.map((s) => <h2 className="soal-teks" key={s.id}>{s.question}</h2>)}
            <p className="bca-catatan-slide">
              Susun jawabanmu seperti presentasi 5 slide. Contoh jawaban bisa dibuka setelah ujian selesai.
            </p>
          </section>

          <nav className="titik-slide" aria-label="Lompat ke slide">
            <span className="titik-label"><span className="mono">{terisi}/5</span><span className="teks-lebar"> slide terisi</span></span>
            {BAGIAN_SLIDE.map((b, i) => (
              <button
                key={b.id}
                type="button"
                className={"titik" + (isi(b.id) ? " terisi" : "")}
                onClick={() => lompat(kasus.id, b.id)}
                aria-label={b.label + (isi(b.id) ? ", terisi" : ", kosong")}
                title={b.label}
              >
                {i + 1}
              </button>
            ))}
          </nav>

          {BAGIAN_SLIDE.map((b, i) => {
            const nama = b.label.replace(/^Slide \d+ · /, "");
            return (
              <section
                key={b.id}
                id={"kartu-" + idSlide(kasus.id, b.id)}
                className={"kartu kartu-slide" + (isi(b.id) ? " terisi" : "")}
                aria-labelledby={"judul-" + idSlide(kasus.id, b.id)}
              >
                <div className="slide-kepala">
                  <span className="slide-nomor" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3 className="slide-judul" id={"judul-" + idSlide(kasus.id, b.id)}>{nama}</h3>
                    <p className="slide-petunjuk">{b.petunjuk}</p>
                  </div>
                  {isi(b.id) && tersimpan && <span className="slide-status"><Ikon nama="cek" ukuran={15} />Tersimpan</span>}
                </div>
                <KotakJawaban
                  id={idSlide(kasus.id, b.id)}
                  label={b.label}
                  sembunyikanLabel
                  tampilStatus={!tersimpan} /* bila tersimpan, penandanya di kepala kartu */
                  petunjuk={b.petunjuk}
                  nilai={sesi.jawaban[kunciSlide(kasus.id, b.id)] ?? ""}
                  baris={b.id === "judul" ? 2 : 6}
                  tersimpan={tersimpan}
                  onUbah={(t) => onKetik(kunciSlide(kasus.id, b.id), t)}
                />
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
