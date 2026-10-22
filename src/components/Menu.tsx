import type { PaketUjian, Soal } from "../types";
import type { ModeBca, SesiBca } from "../bca/sesi";
import { namaMode } from "../bca/sesi";
import { kasusBca, soalBca } from "../bca/data";
import { PAKET_BCA } from "../config/paket-bca";

interface Props {
  bank: Soal[];
  paket: PaketUjian[];
  onLatihan: () => void;
  onUjian: (p: PaketUjian) => void;
  bcaTersimpan: SesiBca | null;
  onBca: (mode: ModeBca) => void;
  onLanjutBca: () => void;
}

export function Menu({ bank, paket, onLatihan, onUjian, bcaTersimpan, onBca, onLanjutBca }: Props) {
  const kolamKasus = kasusBca.filter((k) => k.ujian).length;
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

      <div className="menu-blok">
        <p className="menu-label">BCA Finance {"·"} studi kasus esai</p>
        {bcaTersimpan && (
          <button className="kartu-mode bca-kartu-lanjut" type="button" onClick={onLanjutBca}>
            <span className="kartu-nama">
              {bcaTersimpan.selesai ? "Buka rangkuman terakhir" : "Lanjutkan sesi tersimpan"}
            </span>
            <span className="kartu-ket">
              {namaMode(bcaTersimpan.mode)} {"·"} jawabanmu masih tersimpan di browser ini.
            </span>
          </button>
        )}
        <button className="kartu-mode" type="button" onClick={() => onBca("latihan")}>
          <span className="kartu-nama">Mode Latihan</span>
          <span className="kartu-ket">
            Semua studi kasus berurutan. Tulis jawaban bebas, lalu buka contoh jawaban dari PDF. Tidak dinilai otomatis.
          </span>
          <span className="kartu-meta">{soalBca.length} soal {"·"} {kasusBca.length} kasus {"·"} bebas waktu</span>
        </button>
        {PAKET_BCA.map((p) => (
          <button key={p.id} className="kartu-mode" type="button" onClick={() => onBca(p.id)}>
            <span className="kartu-nama">Mode Ujian {"·"} {p.nama}</span>
            <span className="kartu-ket">
              {p.jumlahKasus === 1 ? "1 kasus" : p.jumlahKasus + " kasus"} acak dari {kolamKasus} kasus. Jawaban per kasus
              mengikuti format 5 slide tes asli; contoh jawaban dan checklist muncul setelah selesai.
            </span>
            <span className="kartu-meta">
              {p.jumlahKasus} kasus {"·"} {Math.round(p.detik / 60)} menit
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
