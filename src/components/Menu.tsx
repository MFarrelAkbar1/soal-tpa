import type { PaketUjian, Section, Soal } from "../types";
import type { ModeBca, SesiBca } from "../bca/sesi";
import { namaMode } from "../bca/sesi";
import { kasusBca, soalBca } from "../bca/data";
import { PAKET_BCA } from "../config/paket-bca";
import { Ikon } from "./Ikon";

interface Props {
  bank: Soal[];
  paket: PaketUjian[];
  onLatihan: () => void;
  onUjian: (p: PaketUjian) => void;
  bcaTersimpan: SesiBca | null;
  onBca: (mode: ModeBca) => void;
  onLanjutBca: () => void;
}

const SINGKATAN: Record<Section, string> = {
  "GMA Verbal": "Ve",
  "GMA Numerical": "Nu",
  "Smart Ability to Learn": "SA",
};

function menit(detik: number): string {
  return Math.round(detik / 60) + " menit";
}

function KartuSection({ p, bank, onUjian }: { p: PaketUjian; bank: Soal[]; onUjian: (p: PaketUjian) => void }) {
  const kolam = bank.filter((s) => s.section === p.section);
  const kategori = [...new Set(kolam.map((s) => s.category))].join(", ");
  const dipakai = Math.min(p.jumlah, kolam.length);
  return (
    <article className="kartu kartu-section">
      <div className="ks-kepala">
        <span className="ks-ikon" aria-hidden="true">{SINGKATAN[p.section]}</span>
        <div>
          <h3 className="ks-nama">{p.section}</h3>
          <p className="ks-ket">{kategori}</p>
        </div>
      </div>
      <ul className="ks-stat" aria-label="Ringkasan">
        <li><Ikon nama="buku" />{kolam.length} soal di bank</li>
        <li><Ikon nama="grid" />Ujian {dipakai} soal</li>
        <li><Ikon nama="jam" />{menit(p.detik)}</li>
      </ul>
      <div className="ks-aksi">
        <button type="button" className="tombol penuh" onClick={() => onUjian(p)} aria-label={"Mulai ujian " + p.section}>
          Mulai ujian
          <Ikon nama="panah" ukuran={18} />
        </button>
      </div>
    </article>
  );
}

export function Menu({ bank, paket, onLatihan, onUjian, bcaTersimpan, onBca, onLanjutBca }: Props) {
  const kolamKasus = kasusBca.filter((k) => k.ujian).length;
  return (
    <div>
      <section className="hero">
        <h2 className="hero-judul">Mau latihan apa hari ini?</h2>
        <p className="hero-sub">
          {bank.length} soal pilihan ganda dari tiga bagian TPA, ditambah {soalBca.length} studi kasus esai BCA Finance.
        </p>
      </section>

      <button type="button" className="kartu-utama" onClick={onLatihan}>
        <span className="ku-ikon"><Ikon nama="buku" ukuran={26} /></span>
        <span className="ku-teks">
          <span className="ku-nama">Mode Latihan · semua soal TPA</span>
          <span className="ku-ket">
            {bank.length} soal berurutan, bebas waktu. Benar/salah dan pembahasan langsung muncul.
          </span>
        </span>
        <Ikon nama="panah" />
      </button>

      <h2 className="judul-bagian">Mode Ujian per section</h2>
      <div className="grid-section">
        {paket.map((p) => <KartuSection key={p.id} p={p} bank={bank} onUjian={onUjian} />)}

        <article className="kartu kartu-section bca">
          <div className="ks-kepala">
            <span className="ks-ikon" aria-hidden="true">BCA</span>
            <div>
              <h3 className="ks-nama">BCA Finance · studi kasus esai</h3>
              <p className="ks-ket">Studi kasus PDP, Account Solution &amp; Recovery, presentasi, analisis data cabang</p>
            </div>
          </div>
          <ul className="ks-stat" aria-label="Ringkasan">
            <li><Ikon nama="buku" />{soalBca.length} soal</li>
            <li><Ikon nama="grid" />{kasusBca.length} kasus</li>
            <li><Ikon nama="simpan" />Tersimpan otomatis</li>
          </ul>
          <div className="ks-aksi">
            {bcaTersimpan && (
              <button type="button" className="pilihan-mode lanjut" onClick={onLanjutBca}>
                <span className="pm-teks">
                  <span className="pm-nama">
                    {bcaTersimpan.selesai ? "Buka rangkuman terakhir" : "Lanjutkan sesi tersimpan"}
                  </span>
                  <span className="pm-ket">{namaMode(bcaTersimpan.mode)} · jawabanmu masih ada di browser ini</span>
                </span>
                <Ikon nama="panah" />
              </button>
            )}
            <div className="grid-mode">
              <button type="button" className="pilihan-mode" onClick={() => onBca("latihan")}>
                <span className="pm-teks">
                  <span className="pm-nama">Mode Latihan</span>
                  <span className="pm-ket">{soalBca.length} soal · bebas waktu · ada contoh jawaban</span>
                </span>
                <Ikon nama="panah" />
              </button>
              {PAKET_BCA.map((p) => (
                <button key={p.id} type="button" className="pilihan-mode" onClick={() => onBca(p.id)}>
                  <span className="pm-teks">
                    <span className="pm-nama">Ujian · {p.nama}</span>
                    <span className="pm-ket">
                      {p.jumlahKasus} kasus acak dari {kolamKasus} · {menit(p.detik)} · format 5 slide
                    </span>
                  </span>
                  <Ikon nama="panah" />
                </button>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
