import type { Soal } from "../types";
import { HURUF, altGambar, pad, srcGambar } from "../lib/util";

interface Props {
  soal: Soal;
  indeks: number;
  total: number;
  pilihan: number | null;
  latihan: boolean; // true = umpan balik langsung, false = mode ujian
  onJawab: (i: number) => void;
}

function kelasOpsi(soal: Soal, n: number, pilihan: number | null, latihan: boolean): string {
  if (!latihan || pilihan === null) return n === pilihan ? " dipilih" : "";
  const kunci = soal.answer;
  if (kunci !== null && n === kunci) return " benar";
  if (n === pilihan) return kunci === null ? " dipilih" : " salah";
  return "";
}

function Kabar({ soal, pilihan }: { soal: Soal; pilihan: number }) {
  const kunci = soal.answer;
  let kelas: string, label: string, tanda: string;
  if (kunci === null) {
    kelas = "abu"; label = "Belum ada kunci"; tanda = "?";
  } else if (pilihan === kunci) {
    kelas = "ok"; label = "Benar"; tanda = "✓";
  } else {
    kelas = "no"; label = "Salah · kunci " + HURUF[kunci]; tanda = "✕";
  }
  return (
    <div className="kabar">
      <div className={"vonis " + kelas}>
        <span className="tanda">{tanda}</span>
        <span className="vonis-teks">{label}</span>
      </div>
      <p className="penjelasan">{soal.explanation}</p>
    </div>
  );
}

export function LembarSoal({ soal, indeks, total, pilihan, latihan, onJawab }: Props) {
  const terkunci = latihan && pilihan !== null;

  return (
    <>
      <div className="progress-baris">
        <span className="posisi">Soal {indeks + 1} dari {total}</span>
        <span className="chip">{soal.category}</span>
      </div>
      <div className="rel"><div className="rel-isi" style={{ width: (indeks / total) * 100 + "%" }}></div></div>

      <section className="lembar">
        <div className="isi">
          <div className="nomor">{pad(indeks + 1)}</div>
          <h2 className="soal">{soal.question}</h2>
          {soal.image && (
            <img className="gambar-soal" src={srcGambar(soal.image)} alt={altGambar(soal, indeks + 1)} />
          )}
          {/* key per soal: tombol opsi dibuat ulang tiap ganti soal, seperti versi lama */}
          <ul className="opsi-list" key={soal.id + "-" + indeks}>
            {soal.options.map((teks, n) => (
              <li key={n}>
                <button
                  type="button"
                  className={"opsi" + kelasOpsi(soal, n, pilihan, latihan)}
                  disabled={terkunci}
                  onClick={() => onJawab(n)}
                >
                  <span className="bulat">{HURUF[n]}</span>
                  <span className="teks-opsi">{teks}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {terkunci && <Kabar soal={soal} pilihan={pilihan} />}
      </section>
    </>
  );
}
