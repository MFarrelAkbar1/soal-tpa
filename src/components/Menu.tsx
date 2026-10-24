import type { PaketUjian, Section, Soal } from "../types";
import type { ModeBca, SesiBca } from "../bca/sesi";
import { namaMode } from "../bca/sesi";
import { kasusBca, soalBca } from "../bca/data";
import { PAKET_BCA } from "../config/paket-bca";
import type { ModeAnalogi, SesiAnalogi } from "../analogi/sesi";
import { namaMode as namaModeAnalogi } from "../analogi/sesi";
import { ANALOGI } from "../config/analogi";
import { SEMUA_TINGKAT } from "../analogi/generator";
import { modeTiu5 } from "../analogi/sesi";
import { SOAL_TIU5 } from "../bca/data/tiu5";
import { SOAL_TIU5_BARU } from "../bca/data/tiu5-baru";
import type { SesiKuesioner, TesKuesioner } from "../bca/kuesioner";
import { INFO_TES } from "../bca/kuesioner";
import { PSIKOTES } from "../config/psikotes";
import { Ikon } from "./Ikon";

interface Props {
  bank: Soal[];
  paket: PaketUjian[];
  onLatihan: () => void;
  onUjian: (p: PaketUjian) => void;
  bcaTersimpan: SesiBca | null;
  onBca: (mode: ModeBca) => void;
  onLanjutBca: () => void;
  analogiTersimpan: SesiAnalogi | null;
  onAnalogi: (mode: ModeAnalogi) => void;
  onLanjutAnalogi: () => void;
  kuesionerTersimpan: Record<TesKuesioner, SesiKuesioner | null>;
  onKuesioner: (tes: TesKuesioner) => void;
  onLanjutKuesioner: (tes: TesKuesioner) => void;
}

function Pilihan({ nama, ket, onKlik }: { nama: string; ket: string; onKlik: () => void }) {
  return (
    <button type="button" className="pilihan-mode" onClick={onKlik}>
      <span className="pm-teks">
        <span className="pm-nama">{nama}</span>
        <span className="pm-ket">{ket}</span>
      </span>
      <Ikon nama="panah" />
    </button>
  );
}

function Lanjut({ judul, ket, onKlik }: { judul: string; ket: string; onKlik: () => void }) {
  return (
    <button type="button" className="pilihan-mode lanjut" onClick={onKlik}>
      <span className="pm-teks">
        <span className="pm-nama">{judul}</span>
        <span className="pm-ket">{ket}</span>
      </span>
      <Ikon nama="panah" />
    </button>
  );
}

function LanjutAnalogi({ sesi, onKlik }: { sesi: SesiAnalogi; onKlik: () => void }) {
  const dijawab = sesi.pilihan.filter((p) => p !== null).length;
  return (
    <Lanjut
      judul={sesi.selesai ? "Buka hasil terakhir" : "Lanjutkan sesi tersimpan"}
      ket={namaModeAnalogi(sesi.mode) + " · " + dijawab + "/" + sesi.soal.length + " terjawab"}
      onKlik={onKlik}
    />
  );
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

function KartuAnalogi({ tersimpan, onMulai, onLanjut }: { tersimpan: SesiAnalogi | null; onMulai: (m: ModeAnalogi) => void; onLanjut: () => void }) {
  const { komposisi, detik } = ANALOGI.ujian;
  const jumlahUjian = SEMUA_TINGKAT.reduce((n, t) => n + komposisi[t], 0);
  const jumlahLatihan = SEMUA_TINGKAT.reduce((n, t) => n + ANALOGI.latihan.komposisi[t], 0);
  return (
    <article className="kartu kartu-section analogi">
      <div className="ks-kepala">
        <span className="ks-ikon" aria-hidden="true">AG</span>
        <div>
          <h3 className="ks-nama">Analogi Gambar</h3>
          <p className="ks-ket">A diubah menjadi B, maka C diubah menjadi apa? Soal bergambar dibuat baru setiap attempt.</p>
        </div>
      </div>
      <ul className="ks-stat" aria-label="Ringkasan">
        <li><Ikon nama="ulang" />Soal baru tiap attempt</li>
        <li><Ikon nama="grid" />Ujian {jumlahUjian} soal</li>
        <li><Ikon nama="jam" />{menit(detik)}</li>
      </ul>
      <div className="ks-aksi">
        {tersimpan && <LanjutAnalogi sesi={tersimpan} onKlik={onLanjut} />}
        <div className="grid-mode dua">
          <button type="button" className="pilihan-mode" onClick={() => onMulai("latihan")}>
            <span className="pm-teks">
              <span className="pm-nama">Mode Latihan</span>
              <span className="pm-ket">{jumlahLatihan} soal · bebas waktu · pembahasan langsung</span>
            </span>
            <Ikon nama="panah" />
          </button>
          <button type="button" className="pilihan-mode" onClick={() => onMulai("ujian")}>
            <span className="pm-teks">
              <span className="pm-nama">Mode Ujian</span>
              <span className="pm-ket">
                {komposisi.mudah} mudah, {komposisi.sedang} sedang, {komposisi.sulit} sulit · {menit(detik)}
              </span>
            </span>
            <Ikon nama="panah" />
          </button>
          <Pilihan nama="Soal asli TIU 5 · Latihan" ket={SOAL_TIU5.length + " soal dari PDF BCA Finance · pembahasan langsung"} onKlik={() => onMulai("tiu5-latihan")} />
          <Pilihan nama="Soal asli TIU 5 · Ujian" ket={SOAL_TIU5.length + " soal · urutan PDF · " + menit(PSIKOTES.tiu5.detik)} onKlik={() => onMulai("tiu5-ujian")} />
          <Pilihan nama="Soal baru TIU 5 · Latihan" ket={SOAL_TIU5_BARU.length + " soal buatan sendiri bergaya TIU 5 · pembahasan langsung"} onKlik={() => onMulai("tiu5baru-latihan")} />
          <Pilihan nama="Soal baru TIU 5 · Ujian" ket={SOAL_TIU5_BARU.length + " soal · " + menit(PSIKOTES.tiu5Baru.detik)} onKlik={() => onMulai("tiu5baru-ujian")} />
        </div>
      </div>
    </article>
  );
}

export function Menu({
  bank, paket, onLatihan, onUjian, bcaTersimpan, onBca, onLanjutBca, analogiTersimpan, onAnalogi, onLanjutAnalogi,
  kuesionerTersimpan, onKuesioner, onLanjutKuesioner,
}: Props) {
  const kolamKasus = kasusBca.filter((k) => k.ujian).length;
  return (
    <div>
      <section className="hero">
        <h2 className="hero-judul">Mau latihan apa hari ini?</h2>
        <p className="hero-sub">
          {bank.length} soal pilihan ganda dari tiga bagian TPA, soal Analogi Gambar yang dibuat baru tiap attempt, dan grup BCA Finance: {soalBca.length} studi kasus esai plus psikotes TIU 5, PAPI Kostik, dan CBI.
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

        <KartuAnalogi tersimpan={analogiTersimpan} onMulai={onAnalogi} onLanjut={onLanjutAnalogi} />

        <article className="kartu kartu-section bca">
          <div className="ks-kepala">
            <span className="ks-ikon" aria-hidden="true">BCA</span>
            <div>
              <h3 className="ks-nama">BCA Finance</h3>
              <p className="ks-ket">Tes tertulis studi kasus dan tiga psikotes: TIU 5, PAPI Kostik, CBI</p>
            </div>
          </div>

          <section className="bca-sub" aria-labelledby="bca-esai">
            <div className="bca-sub-kepala">
              <h4 className="bca-sub-nama" id="bca-esai">Tes tertulis studi kasus</h4>
              <p className="bca-sub-ket">{soalBca.length} soal esai · {kasusBca.length} kasus · PDP, ASR, presentasi, data cabang</p>
            </div>
            {bcaTersimpan && (
              <Lanjut
                judul={bcaTersimpan.selesai ? "Buka rangkuman terakhir" : "Lanjutkan sesi tersimpan"}
                ket={namaMode(bcaTersimpan.mode) + " · jawabanmu masih ada di browser ini"}
                onKlik={onLanjutBca}
              />
            )}
            <div className="grid-mode">
              <Pilihan nama="Mode Latihan" ket={soalBca.length + " soal · bebas waktu · ada contoh jawaban"} onKlik={() => onBca("latihan")} />
              {PAKET_BCA.map((p) => (
                <Pilihan
                  key={p.id}
                  nama={"Ujian · " + p.nama}
                  ket={p.jumlahKasus + " kasus acak dari " + kolamKasus + " · " + menit(p.detik) + " · format 5 slide"}
                  onKlik={() => onBca(p.id)}
                />
              ))}
            </div>
          </section>

          <section className="bca-sub" aria-labelledby="bca-tiu5">
            <div className="bca-sub-kepala">
              <h4 className="bca-sub-nama" id="bca-tiu5">Psikotes 1 · TIU 5 (analogi gambar)</h4>
              <p className="bca-sub-ket">{SOAL_TIU5.length} soal asli dari PDF · kunci dari PDF · pembahasan dibuat sendiri · plus {SOAL_TIU5_BARU.length} soal latihan baru</p>
            </div>
            {analogiTersimpan && modeTiu5(analogiTersimpan.mode) && <LanjutAnalogi sesi={analogiTersimpan} onKlik={onLanjutAnalogi} />}
            <div className="grid-mode dua">
              <Pilihan nama="Mode Latihan" ket="Urutan PDF · bebas waktu · pembahasan langsung" onKlik={() => onAnalogi("tiu5-latihan")} />
              <Pilihan nama="Mode Ujian" ket={SOAL_TIU5.length + " soal · urutan PDF · " + menit(PSIKOTES.tiu5.detik)} onKlik={() => onAnalogi("tiu5-ujian")} />
              <Pilihan nama="Soal baru · Latihan" ket={SOAL_TIU5_BARU.length + " soal buatan sendiri · bebas waktu · pembahasan langsung"} onKlik={() => onAnalogi("tiu5baru-latihan")} />
              <Pilihan nama="Soal baru · Ujian" ket={SOAL_TIU5_BARU.length + " soal buatan sendiri · " + menit(PSIKOTES.tiu5Baru.detik)} onKlik={() => onAnalogi("tiu5baru-ujian")} />
            </div>
          </section>

          <div className="grid-mode dua">
            {(["papi", "cbi"] as const).map((tes) => {
              const t = kuesionerTersimpan[tes];
              const info = INFO_TES[tes];
              return (
                <section className="bca-sub" key={tes} aria-labelledby={"bca-" + tes}>
                  <div className="bca-sub-kepala">
                    <h4 className="bca-sub-nama" id={"bca-" + tes}>Psikotes {tes === "papi" ? "2" : "3"} · {info.nama}</h4>
                    <p className="bca-sub-ket">
                      {tes === "papi" ? info.jumlah + " pasang pernyataan a/b" : info.jumlah + " pernyataan Benar/Salah"} · tanpa skor
                    </p>
                  </div>
                  {t && (
                    <Lanjut
                      judul={t.selesai ? "Buka ringkasan terakhir" : "Lanjutkan sesi tersimpan"}
                      ket={t.jawaban.filter((j) => j !== null).length + "/" + info.jumlah + " terjawab"}
                      onKlik={() => onLanjutKuesioner(tes)}
                    />
                  )}
                  <Pilihan nama={"Mulai " + info.nama} ket="Petunjuk & tips dari PDF · tersimpan otomatis" onKlik={() => onKuesioner(tes)} />
                </section>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
