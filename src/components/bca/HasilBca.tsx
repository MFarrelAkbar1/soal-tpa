import { useState } from "react";
import type { SesiBca } from "../../bca/sesi";
import { kunciSlide, namaMode, paketDariMode } from "../../bca/sesi";
import type { Kasus, SoalEsai } from "../../bca/types";
import { cariKasus, soalBca, soalDariKasus } from "../../bca/data";
import { grupChecklist } from "../../bca/panduan";
import { namaFile, salinTeks, teksJawaban, unduhTeks } from "../../bca/ekspor";
import { BAGIAN_SLIDE } from "../../config/paket-bca";
import { formatWaktu, pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { TeksKasus } from "./TeksKasus";
import { ContohJawaban } from "./ContohJawaban";
import { adaIsian } from "./UjianEsai";

interface Props {
  sesi: SesiBca;
  onCek: (kunci: string, nilai: boolean) => void;
  onUlangi: () => void;
  onMenu: () => void;
}

function Checklist({ unitId, kasus, sesi, onCek }: { unitId: string; kasus: Kasus; sesi: SesiBca; onCek: Props["onCek"] }) {
  const grup = grupChecklist(kasus.checklist);
  const total = grup.reduce((n, g) => n + g.item.length, 0);
  const dicentang = grup.reduce((n, g) => n + g.item.filter((it) => sesi.cek[unitId + ":" + g.id + ":" + it.id]).length, 0);
  return (
    <details className="cek">
      <summary>Checklist penilaian diri <span className="cek-hitung">{dicentang}/{total}</span></summary>
      {grup.map((g) => (
        <fieldset key={g.id} className={"cek-grup" + (g.jenis === "hindari" ? " hindari" : "")}>
          <legend>{g.judul}</legend>
          {g.item.map((it) => {
            const k = unitId + ":" + g.id + ":" + it.id;
            return (
              <label key={it.id} className="cek-item">
                <input type="checkbox" checked={!!sesi.cek[k]} onChange={(e) => onCek(k, e.target.checked)} />
                <span>{it.teks}</span>
              </label>
            );
          })}
        </fieldset>
      ))}
    </details>
  );
}

function TeksSaya({ teks }: { teks: string | undefined }) {
  const t = (teks ?? "").trim();
  return t ? <p className="jawaban-saya">{t}</p> : <p className="bca-tanpa-contoh">Tidak dijawab.</p>;
}

function ContohPerSoal({ soal }: { soal: SoalEsai[] }) {
  return (
    <>
      {soal.map((s) => (
        <div key={s.id} className="bca-contoh-soal">
          {soal.length > 1 && <p className="bca-daftar-judul">{s.question}</p>}
          <ContohJawaban contoh={s.answer} terbuka />
        </div>
      ))}
    </>
  );
}

function KartuLatihan({ soal, i, sesi, onCek }: { soal: SoalEsai; i: number; sesi: SesiBca; onCek: Props["onCek"] }) {
  const kasus = cariKasus(soal.caseId);
  return (
    <article className="kartu bca-kartu">
      <div className="review-atas">
        <span className="review-no">{pad(i + 1)}</span>
        <span className="chip madu">{soal.category}</span>
      </div>
      <details className="kasus-lipat">
        <summary>{kasus.judul}</summary>
        <TeksKasus kasus={kasus} />
      </details>
      <p className="review-soal">{soal.question}</p>
      <div className="bca-banding">
        <div>
          <p className="bca-kolom-judul">Jawabanmu</p>
          <TeksSaya teks={sesi.jawaban[soal.id]} />
        </div>
        <div>
          <p className="bca-kolom-judul">Contoh jawaban</p>
          <ContohPerSoal soal={[soal]} />
        </div>
      </div>
      <Checklist unitId={soal.id} kasus={kasus} sesi={sesi} onCek={onCek} />
    </article>
  );
}

function KartuUjian({ kasus, i, sesi, onCek }: { kasus: Kasus; i: number; sesi: SesiBca; onCek: Props["onCek"] }) {
  const soal = soalDariKasus(kasus.id);
  return (
    <article className="kartu bca-kartu">
      <div className="review-atas">
        <span className="review-no">{pad(i + 1)}</span>
        <span className="chip madu">{kasus.kelompok}</span>
      </div>
      <details className="kasus-lipat">
        <summary>{kasus.judul}</summary>
        <TeksKasus kasus={kasus} />
      </details>
      {soal.map((s) => <p className="review-soal" key={s.id}>{s.question}</p>)}
      <div className="bca-banding">
        <div>
          <p className="bca-kolom-judul">Jawabanmu (5 slide)</p>
          {BAGIAN_SLIDE.map((b) => (
            <div key={b.id} className="bca-slide">
              <p className="bca-daftar-judul">{b.label}</p>
              <TeksSaya teks={sesi.jawaban[kunciSlide(kasus.id, b.id)]} />
            </div>
          ))}
        </div>
        <div>
          <p className="bca-kolom-judul">Contoh jawaban</p>
          <ContohPerSoal soal={soal} />
        </div>
      </div>
      <Checklist unitId={kasus.id} kasus={kasus} sesi={sesi} onCek={onCek} />
    </article>
  );
}

export function HasilBca({ sesi, onCek, onUlangi, onMenu }: Props) {
  const [kabar, setKabar] = useState("");
  const paket = paketDariMode(sesi.mode);
  const latihan = sesi.mode === "latihan";
  const dijawab = latihan
    ? sesi.unit.filter((id) => (sesi.jawaban[id] ?? "").trim()).length
    : sesi.unit.filter((id) => adaIsian(sesi, id)).length;
  const terpakaiMentah = Math.round(((sesi.selesai?.pada ?? Date.now()) - sesi.mulai) / 1000);
  const terpakai = paket ? Math.min(terpakaiMentah, paket.detik) : terpakaiMentah;

  const salin = async () => {
    const ok = await salinTeks(teksJawaban(sesi));
    setKabar(ok ? "Semua jawaban tersalin ke clipboard." : "Gagal menyalin. Pakai tombol unduh.");
  };
  const unduh = () => {
    unduhTeks(teksJawaban(sesi), namaFile(sesi));
    setKabar("File " + namaFile(sesi) + " diunduh.");
  };

  return (
    <div>
      <div className="kartu hasil">
        <p className="kop-eyebrow">Rangkuman · {namaMode(sesi.mode)}</p>
        <p className="skor-catatan" style={{ marginTop: 6 }}>
          Esai tidak dinilai otomatis dan tidak ada skor. Bandingkan jawabanmu dengan contoh dari PDF,
          lalu centang checklist penilaian diri di tiap kartu.
        </p>
        <dl className="fakta-grid">
          {paket && (
            <div className="fakta">
              <dt>Status</dt>
              <dd className={sesi.selesai?.habisWaktu ? "tegas" : undefined}>
                {sesi.selesai?.habisWaktu ? "Waktu habis, ditutup otomatis" : "Diselesaikan sendiri"}
              </dd>
            </div>
          )}
          <div className="fakta">
            <dt>Waktu terpakai</dt>
            <dd className="mono">{formatWaktu(terpakai)}{paket ? " / " + formatWaktu(paket.detik) : ""}</dd>
          </div>
          <div className="fakta">
            <dt>{latihan ? "Soal dijawab" : "Kasus dijawab"}</dt>
            <dd>{dijawab} dari {sesi.unit.length}</dd>
          </div>
        </dl>
        <div className="hasil-aksi">
          <button className="tombol" type="button" onClick={salin}><Ikon nama="salin" ukuran={18} />Salin semua jawaban</button>
          <button className="tombol sekunder" type="button" onClick={unduh}><Ikon nama="unduh" ukuran={18} />Unduh .txt</button>
        </div>
        <p className="bca-kabar" role="status" aria-live="polite">{kabar}</p>
      </div>

      <section className="review" aria-labelledby="judul-banding">
        <h2 className="review-judul" id="judul-banding" style={{ marginBottom: 12 }}>Jawabanmu dan contoh jawaban</h2>
        <div className="review-list">
        {latihan
          ? sesi.unit.map((id, i) => (
              <KartuLatihan key={id} soal={soalBca.find((s) => s.id === id)!} i={i} sesi={sesi} onCek={onCek} />
            ))
          : sesi.unit.map((id, i) => <KartuUjian key={id} kasus={cariKasus(id)} i={i} sesi={sesi} onCek={onCek} />)}
        </div>
      </section>

      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={onUlangi}>
          <Ikon nama="ulang" ukuran={18} />
          {latihan ? "Mulai latihan baru" : "Ulangi dengan kasus acak lain"}
        </button>
        <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
      </div>
    </div>
  );
}
