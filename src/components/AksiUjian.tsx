import { Ikon } from "./Ikon";

interface Props {
  pertama: boolean;
  terakhir: boolean;
  onMundur: () => void;
  onMaju: () => void;
  onSelesai: () => void;
  satuan?: string; // "soal" atau "kasus"
}

export function AksiUjian({ pertama, terakhir, onMundur, onMaju, onSelesai, satuan = "soal" }: Props) {
  return (
    <div className="bilah-aksi">
      <div className="bilah-isi">
        <button className="tombol sekunder" disabled={pertama} onClick={onMundur} aria-label={satuan + " sebelumnya"}>
          <Ikon nama="kiri" ukuran={18} />
          <span className="teks-lebar">Sebelumnya</span>
        </button>
        <button className="tombol sekunder tumbuh" disabled={terakhir} onClick={onMaju} aria-label={satuan + " berikutnya"}>
          <span>Berikutnya</span>
          <Ikon nama="kanan" ukuran={18} />
        </button>
        <button className="tombol" onClick={onSelesai}>Selesai</button>
      </div>
    </div>
  );
}
