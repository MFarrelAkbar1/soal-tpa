import { formatWaktu } from "../lib/util";

interface Props {
  eyebrow: string;
  judul: string;
  lengket: boolean;
  skor: string | null; // null = kotak skor disembunyikan
  sisaDetik: number | null; // null = timer disembunyikan
}

export function Kop({ eyebrow, judul, lengket, skor, sisaDetik }: Props) {
  return (
    <header className={"kop" + (lengket ? " lengket" : "")}>
      <div className="kop-kiri">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="judul">{judul}</h1>
      </div>
      {skor !== null && (
        <div className="skor-kop">
          <div className="angka">{skor}</div>
          <div className="ket">Benar</div>
        </div>
      )}
      {sisaDetik !== null && (
        <div className={"waktu" + (sisaDetik < 60 ? " kritis" : "")}>
          <div className="angka">{formatWaktu(sisaDetik)}</div>
          <div className="ket">Sisa waktu</div>
        </div>
      )}
    </header>
  );
}
