import { formatWaktu } from "../lib/util";
import { Ikon } from "./Ikon";
import { TemaToggle } from "./TemaToggle";

interface KopProps {
  eyebrow: string;
  judul: string;
  skor: string | null; // null = pil skor disembunyikan
}

export function Kop({ eyebrow, judul, skor }: KopProps) {
  return (
    <header className="kop">
      <div className="kop-kiri">
        <p className="kop-eyebrow">{eyebrow}</p>
        <h1 className="kop-judul">{judul}</h1>
      </div>
      <div className="kop-kanan">
        {skor !== null && (
          <span className="pil-skor" aria-label={"Skor " + skor + " benar"}>
            <span className="mono">{skor}</span> benar
          </span>
        )}
        <TemaToggle ringkas={skor !== null} />
      </div>
    </header>
  );
}

interface KopUjianProps {
  label: string; // mis. "Soal 3/17"
  sub: string; // nama section
  sisaDetik: number;
  navigator: { terisi: number; total: number; onBuka: () => void } | null;
  lebar?: boolean;
}

function pengumumanWaktu(detik: number): string {
  if (detik <= 0) return "Waktu habis";
  if (detik <= 60) return "Sisa waktu kurang dari 1 menit";
  if (detik <= 300) return "Sisa waktu kurang dari 5 menit";
  return "";
}

// Header ujian: nomor di kiri, timer besar di tengah, navigator di kanan. Lengket di atas.
export function KopUjian({ label, sub, sisaDetik, navigator, lebar = false }: KopUjianProps) {
  const kritis = sisaDetik < 60;
  return (
    <header className={"kop-ujian" + (lebar ? " lebar" : "")}>
      <div className="kop-ujian-isi">
        <div className="ku-kiri">
          <p className="ku-label">{label}</p>
          <p className="ku-sub">{sub}</p>
        </div>
        <div className={"timer" + (kritis ? " kritis" : "")} role="timer" aria-label={"Sisa waktu " + formatWaktu(sisaDetik)}>
          <Ikon nama={kritis ? "awas" : "jam"} />
          <span className="timer-angka" aria-hidden="true">{formatWaktu(sisaDetik)}</span>
          {kritis && <span className="sr-only">kurang dari 1 menit</span>}
        </div>
        <div className="ku-kanan">
          <TemaToggle ringkas />
          {navigator && (
            <button
              type="button"
              className="tombol-nav"
              onClick={navigator.onBuka}
              aria-haspopup="dialog"
              aria-label={"Buka navigator, " + navigator.terisi + " dari " + navigator.total + " terjawab"}
            >
              <Ikon nama="grid" ukuran={18} />
              <span>{navigator.terisi}/{navigator.total}</span>
              <span className="nav-teks">· Nomor</span>
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{pengumumanWaktu(sisaDetik)}</p>
    </header>
  );
}
