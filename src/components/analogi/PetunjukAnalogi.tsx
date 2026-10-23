import type { ModeAnalogi } from "../../analogi/sesi";
import { durasiDetik, modeLatihan, modeTiu5 } from "../../analogi/sesi";
import { CONTOH, SEMUA_TINGKAT } from "../../analogi/generator";
import { dariGenerator } from "../../analogi/tampil";
import { ANALOGI } from "../../config/analogi";
import { SOAL_TIU5, LABEL_PEMBAHASAN_TIU5 } from "../../bca/data/tiu5";
import { Ikon } from "../Ikon";
import { BarisSoal, OpsiGambar, PERTANYAAN } from "./LembarAnalogi";

interface Props {
  mode: ModeAnalogi;
  onMulai: () => void;
  onMenu: () => void;
}

const ATURAN_UMUM = [
  "Ukuran: diperbesar atau diperkecil",
  "Putar 45°, 90°, atau 180°, dan cermin horizontal/vertikal",
  "Isi: putih, hitam, atau arsir",
  "Jumlah bangun ditambah, dikurangi, atau digandakan",
  "Jumlah sisi ditambah satu (segitiga → persegi → segi lima → segi enam)",
  "Titik kecil pindah sudut, atau garis ditebalkan/ditipiskan",
  "Bangun di dalam bangun yang bertukar tempat",
];

const CONTOH_TAMPIL = dariGenerator(CONTOH);

export function PetunjukAnalogi({ mode, onMulai, onMenu }: Props) {
  const tiu5 = modeTiu5(mode);
  const komposisi = mode === "ujian" ? ANALOGI.ujian.komposisi : ANALOGI.latihan.komposisi;
  const total = tiu5 ? SOAL_TIU5.length : SEMUA_TINGKAT.reduce((n, t) => n + komposisi[t], 0);
  const detik = durasiDetik(mode);
  return (
    <div className="ag-petunjuk">
      <section className="kartu kartu-soal" aria-labelledby="judul-petunjuk">
        <p className="kop-eyebrow">Harap dibaca baik-baik sebelum mulai</p>
        <h2 className="soal-teks" id="judul-petunjuk">{PERTANYAAN}</h2>
        <p className="ag-label-contoh">Contoh 1</p>
        <BarisSoal soal={CONTOH_TAMPIL} />
        <OpsiGambar soal={CONTOH_TAMPIL} pilihan={null} tampilKunci kecil />
        <div className="kabar ok">
          <div className="kabar-kepala">
            <span className="kabar-ikon"><Ikon nama="cek" ukuran={16} /></span>
            <span>Jawaban dari contoh di atas: gambar 2</span>
          </div>
          <p className="kabar-teks">
            Bila A (lingkaran besar) diperkecil, maka diperoleh B (lingkaran kecil). Bila C (persegi besar) diberi
            perlakuan yang sama, yaitu diperkecil, maka dari gambar 1 sampai 5 yang sesuai adalah gambar 2. Jadi
            jawaban yang benar adalah gambar 2 (persegi kecil).
          </p>
        </div>
      </section>

      <section className="kartu ag-info">
        {tiu5 ? (
          <>
            <h3 className="grafik-judul">Soal asli TIU 5</h3>
            <p className="ag-ket">
              {total} soal asli dari PDF Psikotes BCA Finance, urutan sesuai PDF. Gambar dipotong dari scan PDF dan
              watermarknya dibersihkan. Kunci jawaban diambil dari PDF.
            </p>
            <p className="ag-ket">
              PDF tidak memuat pembahasan. Pembahasan di aplikasi ini ditandai <strong>“{LABEL_PEMBAHASAN_TIU5}”</strong>;
              bila aturan A→B tidak bisa dipastikan dari gambar, pembahasannya menyebut itu apa adanya.
            </p>
          </>
        ) : (
          <>
            <h3 className="grafik-judul">Perubahan yang bisa muncul</h3>
            <ul className="ag-daftar">
              {ATURAN_UMUM.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <p className="ag-ket">
              Soal mudah memakai 1 perubahan, sedang 2 perubahan sekaligus, sulit 3 perubahan atau bangun gabungan.
              Terapkan <strong>semua</strong> perubahan dari A ke B pada C.
            </p>
          </>
        )}
        <ul className="ks-stat" aria-label="Ringkasan sesi">
          <li>
            <Ikon nama="grid" />
            {tiu5 ? total + " soal asli" : total + " soal baru (" + komposisi.mudah + " mudah, " + komposisi.sedang + " sedang, " + komposisi.sulit + " sulit)"}
          </li>
          {detik !== null
            ? <li><Ikon nama="jam" />{Math.round(detik / 60)} menit, tertutup otomatis</li>
            : <li><Ikon nama="buku" />Bebas waktu, pembahasan langsung</li>}
          <li><Ikon nama="simpan" />Tersimpan otomatis</li>
        </ul>
        <p className="ag-ket">Tekan tombol <span className="mono">1</span>–<span className="mono">5</span> untuk menjawab.</p>
        <div className="hasil-aksi">
          <button className="tombol" type="button" onClick={onMulai}>
            Mulai {modeLatihan(mode) ? "latihan" : "ujian"}
            <Ikon nama="panah" ukuran={18} />
          </button>
          <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
        </div>
      </section>
    </div>
  );
}
