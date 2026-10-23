import type { ReactNode } from "react";
import type { SoalTampil } from "../../analogi/tampil";
import { pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { Figur } from "./Figur";

export const PERTANYAAN = "Seperti halnya A diubah menjadi B, demikian pula C diubah menjadi salah satu dari kelima gambar berikutnya. Pilih gambar tersebut.";

function Sel({ huruf, children }: { huruf: string; children: ReactNode }) {
  return (
    <figure className="ag-sel">
      <figcaption className="ag-huruf">{huruf}</figcaption>
      <div className="ag-plate">{children}</div>
    </figure>
  );
}

// Baris "A → B   C → ?"
export function BarisSoal({ soal }: { soal: SoalTampil }) {
  return (
    <div className="ag-baris">
      <div className="ag-pasang">
        <Sel huruf="A"><Figur g={soal.a} label="Gambar A" /></Sel>
        <span className="ag-panah" aria-hidden="true"><Ikon nama="panah" ukuran={18} /></span>
        <Sel huruf="B"><Figur g={soal.b} label="Gambar B" /></Sel>
      </div>
      <div className="ag-pasang">
        <Sel huruf="C"><Figur g={soal.c} label="Gambar C" /></Sel>
        <span className="ag-panah" aria-hidden="true"><Ikon nama="panah" ukuran={18} /></span>
        <Sel huruf="?"><span className="ag-tanya" aria-label="Gambar yang dicari">?</span></Sel>
      </div>
    </div>
  );
}

type Keadaan = "" | "dipilih" | "benar" | "salah" | "redup";

export function keadaanOpsi(kunci: number, n: number, pilihan: number | null, tampilKunci: boolean): Keadaan {
  if (!tampilKunci) return n === pilihan ? "dipilih" : "";
  if (n === kunci) return "benar";
  if (n === pilihan) return "salah";
  return "redup";
}

const KETERANGAN: Record<Keadaan, string> = {
  "": "",
  dipilih: ", dipilih",
  benar: ", jawaban benar",
  salah: ", jawabanmu, salah",
  redup: "",
};

interface OpsiProps {
  soal: SoalTampil;
  pilihan: number | null;
  tampilKunci: boolean; // true = tandai kunci dan kunci pilihan (latihan setelah menjawab, pembahasan)
  onJawab?: (i: number) => void; // tanpa handler = hanya tampilan
  kecil?: boolean;
}

export function OpsiGambar({ soal, pilihan, tampilKunci, onJawab, kecil = false }: OpsiProps) {
  const terkunci = !onJawab || tampilKunci;
  return (
    <ul className={"ag-opsi" + (kecil ? " kecil" : "")} aria-label="Pilihan jawaban">
      {soal.opsi.map((g, n) => {
        const k = keadaanOpsi(soal.kunci, n, pilihan, tampilKunci);
        return (
          <li key={n}>
            <button
              type="button"
              className={"ag-pilih" + (k ? " " + k : "")}
              disabled={terkunci}
              aria-pressed={n === pilihan}
              onClick={() => onJawab?.(n)}
            >
              <span className="ag-nomor" aria-hidden="true">
                {n + 1}
                {k === "benar" && <Ikon nama="cek" ukuran={14} />}
                {k === "salah" && <Ikon nama="silang" ukuran={14} />}
              </span>
              <span className="ag-plate"><Figur g={g} label={"Gambar " + (n + 1)} /></span>
              <span className="sr-only">{KETERANGAN[k]}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Penjelasan({ soal, kelas }: { soal: SoalTampil; kelas: string }) {
  return (
    <>
      {soal.labelPenjelasan && <p className="ag-label-sendiri"><Ikon nama="awas" ukuran={14} />{soal.labelPenjelasan}</p>}
      <p className={kelas}>{soal.penjelasan}</p>
    </>
  );
}

function Kabar({ soal, pilihan }: { soal: SoalTampil; pilihan: number }) {
  const tepat = pilihan === soal.kunci;
  return (
    <div className={"kabar " + (tepat ? "ok" : "no")} role="status">
      <div className="kabar-kepala">
        <span className="kabar-ikon"><Ikon nama={tepat ? "cek" : "silang"} ukuran={16} /></span>
        <span>{tepat ? "Benar!" : "Belum tepat · kunci gambar " + (soal.kunci + 1)}</span>
      </div>
      <Penjelasan soal={soal} kelas="kabar-teks" />
      {!tepat && soal.catatanOpsi && <p className="kabar-teks ag-catatan">Gambar {pilihan + 1}: {soal.catatanOpsi[pilihan]}</p>}
    </div>
  );
}

interface Props {
  soal: SoalTampil;
  indeks: number;
  total: number;
  pilihan: number | null;
  latihan: boolean;
  onJawab: (i: number) => void;
}

export function LembarAnalogi({ soal, indeks, total, pilihan, latihan, onJawab }: Props) {
  const terjawabLatihan = latihan && pilihan !== null;
  return (
    <>
      <div className="progres">
        <div className="progres-teks">
          <span>Soal {indeks + 1} dari {total}</span>
          <span className="chip">{soal.chip}</span>
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
        <h2 className="soal-teks" id={"teks-soal-" + soal.id}>{PERTANYAAN}</h2>
        <BarisSoal soal={soal} />
        <OpsiGambar key={soal.id} soal={soal} pilihan={pilihan} tampilKunci={terjawabLatihan} onJawab={onJawab} />
        {terjawabLatihan && <Kabar soal={soal} pilihan={pilihan} />}
      </section>
    </>
  );
}
