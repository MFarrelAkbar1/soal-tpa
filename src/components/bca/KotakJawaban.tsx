import { Ikon } from "../Ikon";

interface Props {
  id: string;
  label: string;
  petunjuk: string;
  nilai: string;
  baris: number;
  tersimpan: boolean; // false bila localStorage gagal ditulis
  onUbah: (teks: string) => void;
  sembunyikanLabel?: boolean;
  tampilStatus?: boolean; // false bila penanda tersimpan sudah ada di kepala kartu
}

function hitungKata(t: string): number {
  const s = t.trim();
  return s ? s.split(/\s+/).length : 0;
}

export function KotakJawaban({ id, label, petunjuk, nilai, baris, tersimpan, onUbah, sembunyikanLabel = false, tampilStatus = true }: Props) {
  const kata = hitungKata(nilai);
  return (
    <div className="isian">
      <label className={sembunyikanLabel ? "sr-only" : "isian-label"} htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="textarea"
        rows={baris}
        value={nilai}
        placeholder={petunjuk}
        spellCheck
        onChange={(e) => onUbah(e.target.value)}
      />
      <div className="isian-meta">
        <span className="mono">{kata} kata</span>
        {tampilStatus && kata > 0 && (
          tersimpan
            ? <span className="status-simpan"><Ikon nama="cek" ukuran={15} />Tersimpan otomatis</span>
            : <span className="status-simpan gagal"><Ikon nama="awas" ukuran={15} />Belum tersimpan di browser</span>
        )}
      </div>
    </div>
  );
}
