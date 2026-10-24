import { useState } from "react";
import type { SesiAnalogi } from "../../analogi/sesi";
import { durasiDetik, hitung, modeTiu5, modeTiu5Baru } from "../../analogi/sesi";
import { formatWaktu, pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { Grafik, Skor } from "../Hasil";
import { BarisSoal, OpsiGambar, Penjelasan } from "./LembarAnalogi";

type Filter = "semua" | "salah" | "kosong";

function Pembahasan({ sesi }: { sesi: SesiAnalogi }) {
  const [filter, setFilter] = useState<Filter>("semua");
  const item = sesi.soal.map((s, i) => {
    const jawabMu = sesi.pilihan[i];
    const status: "tepat" | "meleset" | "kosong" = jawabMu === null ? "kosong" : jawabMu === s.kunci ? "tepat" : "meleset";
    return { s, i, jawabMu, status };
  });
  const jumlah = {
    semua: item.length,
    salah: item.filter((x) => x.status === "meleset").length,
    kosong: item.filter((x) => x.status === "kosong").length,
  };
  const tampil = item.filter((x) =>
    filter === "semua" ? true : filter === "salah" ? x.status === "meleset" : x.status === "kosong");
  const FILTER: { id: Filter; label: string }[] = [
    { id: "semua", label: "Semua" },
    { id: "salah", label: "Salah saja" },
    { id: "kosong", label: "Tidak dijawab" },
  ];

  return (
    <section className="review" aria-labelledby="judul-review">
      <div className="review-kepala">
        <h3 className="review-judul" id="judul-review">Pembahasan</h3>
        <div className="segmen" role="tablist" aria-label="Saring pembahasan">
          {FILTER.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={"segmen-tombol" + (filter === f.id ? " aktif" : "")}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span className="segmen-hitung">{jumlah[f.id]}</span>
            </button>
          ))}
        </div>
      </div>
      {tampil.length === 0 ? (
        <p className="review-kosong-pesan">
          {filter === "salah" ? "Tidak ada jawaban yang salah." : "Semua soal sudah dijawab."}
        </p>
      ) : (
        <ul className="review-list">
          {tampil.map(({ s, i, jawabMu, status }) => (
            <li className={"review-item " + status} key={s.id}>
              <div className="review-atas">
                <span className="review-no">{pad(i + 1)}</span>
                <span className="chip netral">{s.chip}</span>
                {status === "tepat" && <span className="review-status ok"><Ikon nama="cek" ukuran={16} />Benar</span>}
                {status === "meleset" && <span className="review-status no"><Ikon nama="silang" ukuran={16} />Salah</span>}
                {status === "kosong" && <span className="review-status abu">Tidak dijawab</span>}
              </div>
              <BarisSoal soal={s} />
              <OpsiGambar soal={s} pilihan={jawabMu} tampilKunci kecil />
              <dl className="review-jawab">
                <dt>Jawabanmu</dt>
                <dd className={status === "kosong" ? "abu" : status === "tepat" ? "ok" : "no"}>
                  {jawabMu === null ? "Tidak dijawab" : "Gambar " + (jawabMu + 1)}
                </dd>
                <dt>Kunci</dt>
                <dd className="ok">Gambar {s.kunci + 1}</dd>
              </dl>
              <Penjelasan soal={s} kelas="review-penjelasan" />
              {status === "meleset" && jawabMu !== null && s.catatanOpsi && (
                <p className="review-penjelasan ag-catatan">Gambar {jawabMu + 1}: {s.catatanOpsi[jawabMu]}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

interface Props {
  sesi: SesiAnalogi;
  onUlangi: () => void;
  onMenu: () => void;
}

export function HasilAnalogi({ sesi, onUlangi, onMenu }: Props) {
  const { benar, rekap } = hitung(sesi);
  const total = sesi.soal.length;
  const kosong = sesi.pilihan.filter((x) => x === null).length;
  const terpakai = Math.round(((sesi.selesai?.pada ?? Date.now()) - sesi.mulai) / 1000);
  const batas = durasiDetik(sesi.mode);
  return (
    <div className="kartu hasil">
      <Skor benar={benar} total={total} />
      <dl className="fakta-grid">
        <div className="fakta">
          <dt>Status</dt>
          <dd className={sesi.selesai?.habisWaktu ? "tegas" : undefined}>
            {sesi.selesai?.habisWaktu ? "Waktu habis, ditutup otomatis" : "Diselesaikan sendiri"}
          </dd>
        </div>
        <div className="fakta">
          <dt>Waktu terpakai</dt>
          <dd className="mono">{formatWaktu(batas !== null ? Math.min(terpakai, batas) : terpakai)}{batas !== null && " / " + formatWaktu(batas)}</dd>
        </div>
        <div className="fakta">
          <dt>Tidak dijawab</dt>
          <dd className={kosong > 0 ? "tegas" : undefined}>{kosong} dari {total} soal</dd>
        </div>
      </dl>
      <Grafik rekap={rekap} judul={modeTiu5Baru(sesi.mode) ? "Per jenis aturan" : modeTiu5(sesi.mode) ? "Per kejelasan aturan (menurut pembahasan buatan sendiri)" : "Per tingkat kesulitan"} />
      <Pembahasan sesi={sesi} />
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={onUlangi}><Ikon nama="ulang" ukuran={18} />{modeTiu5(sesi.mode) ? "Ulangi dari awal" : "Ulangi dengan soal baru"}</button>
        <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
      </div>
    </div>
  );
}
