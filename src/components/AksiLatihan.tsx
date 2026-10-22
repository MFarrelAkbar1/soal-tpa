import { useEffect, useRef } from "react";
import { HURUF } from "../lib/util";
import { Ikon } from "./Ikon";

interface Props {
  terjawab: boolean;
  terakhir: boolean;
  jumlahOpsi: number;
  onLanjut: () => void;
}

export function AksiLatihan({ terjawab, terakhir, jumlahOpsi, onLanjut }: Props) {
  const tombol = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (terjawab) tombol.current?.focus({ preventScroll: true });
  }, [terjawab]);

  return (
    <div className="bilah-aksi">
      <div className="bilah-isi">
        <span className="petunjuk tumbuh">
          {terjawab ? "Tekan Enter untuk lanjut" : "Tekan A–" + HURUF[jumlahOpsi - 1] + " atau 1–" + jumlahOpsi + " untuk menjawab"}
        </span>
        <button className="tombol penuh md:w-auto md:min-w-48" ref={tombol} disabled={!terjawab} onClick={onLanjut}>
          {terjawab ? (terakhir ? "Lihat hasil" : "Lanjut") : "Pilih satu jawaban"}
          {terjawab && <Ikon nama="panah" ukuran={18} />}
        </button>
      </div>
    </div>
  );
}
