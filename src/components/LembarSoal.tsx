import type { Soal } from "../types";
import { HURUF, altGambar, pad, srcGambar } from "../lib/util";
import { Ikon } from "./Ikon";

interface Props {
  soal: Soal;
  indeks: number;
  total: number;
  pilihan: number | null;
  latihan: boolean; // true = umpan balik langsung, false = mode ujian
  onJawab: (i: number) => void;
}

type Keadaan = "" | "dipilih" | "benar" | "salah" | "redup";

function keadaanOpsi(soal: Soal, n: number, pilihan: number | null, latihan: boolean): Keadaan {
  if (!latihan || pilihan === null) return n === pilihan ? "dipilih" : "";
  const kunci = soal.answer;
  if (kunci !== null && n === kunci) return "benar";
  if (n === pilihan) return kunci === null ? "dipilih" : "salah";
  return "redup";
}

// teks status untuk pembaca layar; tampilan memakai ikon ✓ / ✕ / ●
const KETERANGAN: Record<Keadaan, string> = {
  "": "",
  dipilih: ", dipilih",
  benar: ", jawaban benar",
  salah: ", jawabanmu, salah",
  redup: "",
};

function IkonOpsi({ k }: { k: Keadaan }) {
  if (k === "benar") return <span className="opsi-ikon"><Ikon nama="cek" ukuran={18} /></span>;
  if (k === "salah") return <span className="opsi-ikon"><Ikon nama="silang" ukuran={18} /></span>;
  if (k === "dipilih") {
    return (
      <span className="opsi-ikon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="12" r="7" fill="currentColor" /></svg>
      </span>
    );
  }
  return null;
}

function Kabar({ soal, pilihan }: { soal: Soal; pilihan: number }) {
  const kunci = soal.answer;
  let kelas: string, label: string, ikon: "cek" | "silang" | "tanya";
  if (kunci === null) {
    kelas = "abu"; label = "Belum ada kunci jawaban"; ikon = "tanya";
  } else if (pilihan === kunci) {
    kelas = "ok"; label = "Benar!"; ikon = "cek";
  } else {
    kelas = "no"; label = "Belum tepat · kunci " + HURUF[kunci]; ikon = "silang";
  }
  return (
    <div className={"kabar " + kelas} role="status">
      <div className="kabar-kepala">
        <span className="kabar-ikon"><Ikon nama={ikon} ukuran={16} /></span>
        <span>{label}</span>
      </div>
      <p className="kabar-teks">{soal.explanation}</p>
    </div>
  );
}

export function LembarSoal({ soal, indeks, total, pilihan, latihan, onJawab }: Props) {
  const terkunci = latihan && pilihan !== null;

  return (
    <>
      <div className="progres">
        <div className="progres-teks">
          <span>Soal {indeks + 1} dari {total}</span>
          <span className="chip">{soal.category}</span>
        </div>
        <div
          className="progres-rel"
          role="progressbar"
          aria-label="Posisi soal"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={indeks + 1}
        >
          <div className="progres-isi" style={{ width: ((indeks + 1) / total) * 100 + "%" }}></div>
        </div>
      </div>

      <section className="kartu kartu-soal" aria-labelledby={"teks-soal-" + soal.id}>
        <div className="soal-kepala">
          <span className="soal-nomor">Soal {pad(indeks + 1)}</span>
        </div>
        <h2 className="soal-teks" id={"teks-soal-" + soal.id}>{soal.question}</h2>
        {soal.image && (
          <div className="plate-gambar">
            <img src={srcGambar(soal.image)} alt={altGambar(soal, indeks + 1)} />
          </div>
        )}
        {/* key per soal: tombol opsi dibuat ulang tiap ganti soal, seperti versi lama */}
        <ul className="opsi-list" key={soal.id + "-" + indeks} aria-label="Pilihan jawaban">
          {soal.options.map((teks, n) => {
            const k = keadaanOpsi(soal, n, pilihan, latihan);
            return (
              <li key={n}>
                <button
                  type="button"
                  className={"opsi" + (k ? " " + k : "")}
                  disabled={terkunci}
                  aria-pressed={n === pilihan}
                  onClick={() => onJawab(n)}
                >
                  <span className="opsi-huruf" aria-hidden="true">{HURUF[n]}</span>
                  <span className="opsi-teks">
                    <span className="sr-only">Pilihan {HURUF[n]}: </span>
                    {teks === HURUF[n] ? <span aria-hidden="true">Pilihan {HURUF[n]}</span> : teks}
                    <span className="sr-only">{KETERANGAN[k]}</span>
                  </span>
                  <IkonOpsi k={k} />
                </button>
              </li>
            );
          })}
        </ul>
        {terkunci && <Kabar soal={soal} pilihan={pilihan} />}
      </section>
    </>
  );
}
