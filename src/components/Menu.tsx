import type { PaketUjian, Soal } from "../types";

interface Props {
  bank: Soal[];
  paket: PaketUjian[];
  onLatihan: () => void;
  onUjian: (p: PaketUjian) => void;
}

export function Menu({ bank, paket, onLatihan, onUjian }: Props) {
  return (
    <div className="hasil">
      <p className="eyebrow">Pilih mode</p>
      <p className="hasil-sub" style={{ margin: "8px 0 24px" }}>
        Bank soal berisi {bank.length} soal dari tiga bagian tes. Pilih latihan santai atau simulasi ujian bertimer.
      </p>

      <div className="menu-blok">
        <p className="menu-label">Tanpa batas waktu</p>
        <button className="kartu-mode" type="button" onClick={onLatihan}>
          <span className="kartu-nama">Mode Latihan</span>
          <span className="kartu-ket">
            Semua soal berurutan. Benar/salah dan penjelasannya langsung muncul begitu kamu memilih jawaban.
          </span>
          <span className="kartu-meta">{bank.length} soal {"·"} bebas waktu</span>
        </button>
      </div>

      <div className="menu-blok">
        <p className="menu-label">Mode Ujian {"·"} bertimer</p>
        {paket.map((p) => {
          const kolam = bank.filter((s) => s.section === p.section).length;
          const dipakai = Math.min(p.jumlah, kolam);
          return (
            <button key={p.id} className="kartu-mode" type="button" onClick={() => onUjian(p)}>
              <span className="kartu-nama">{p.section}</span>
              <span className="kartu-ket">
                Soal diambil acak dari {kolam} soal yang tersedia dan diacak ulang setiap kali mulai. Tanpa umpan balik sampai waktu berakhir.
              </span>
              <span className="kartu-meta">
                {dipakai} soal {"·"} {Math.round(p.detik / 60)} menit
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
