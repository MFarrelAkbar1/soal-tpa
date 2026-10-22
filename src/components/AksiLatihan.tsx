import { useEffect, useRef } from "react";
import { HURUF } from "../lib/util";

interface Props {
  terjawab: boolean;
  terakhir: boolean;
  jumlahOpsi: number;
  onLanjut: () => void;
}

export function AksiLatihan({ terjawab, terakhir, jumlahOpsi, onLanjut }: Props) {
  const tombol = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (terjawab) tombol.current?.focus();
  }, [terjawab]);

  return (
    <div className="aksi">
      <span className="petunjuk">
        {terjawab ? "Tekan Enter untuk lanjut" : "Tekan A–" + HURUF[jumlahOpsi - 1] + " untuk menjawab"}
      </span>
      <button className="tombol" ref={tombol} disabled={!terjawab} onClick={onLanjut}>
        {terakhir ? "Lihat hasil" : "Lanjut"}
      </button>
    </div>
  );
}
