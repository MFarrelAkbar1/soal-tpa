import { useState } from "react";
import type { PaketUjian, Rekap, Soal } from "../types";
import { altGambar, catatan, formatWaktu, labelOpsi, pad, srcGambar } from "../lib/util";
import { Ikon } from "./Ikon";

function CincinSkor({ benar, total }: { benar: number; total: number }) {
  const persen = total ? Math.round((benar / total) * 100) : 0;
  const r = 52, keliling = 2 * Math.PI * r;
  return (
    <svg className="cincin" viewBox="0 0 132 132" role="img" aria-label={"Skor " + persen + " persen"}>
      <circle className="cincin-latar" cx="66" cy="66" r={r} fill="none" strokeWidth="14" />
      <circle
        className="cincin-isi"
        cx="66" cy="66" r={r} fill="none" strokeWidth="14" strokeLinecap="round"
        strokeDasharray={keliling}
        strokeDashoffset={keliling * (1 - persen / 100)}
        transform="rotate(-90 66 66)"
      />
      <text className="cincin-angka" x="66" y="70" textAnchor="middle">{persen}%</text>
      <text className="cincin-sub" x="66" y="90" textAnchor="middle">benar</text>
    </svg>
  );
}

function Skor({ benar, total }: { benar: number; total: number }) {
  const persen = total ? Math.round((benar / total) * 100) : 0;
  return (
    <div className="skor-blok">
      <CincinSkor benar={benar} total={total} />
      <div className="skor-teks">
        <p className="skor-besar mono">{benar}<span>/{total}</span></p>
        <p className="skor-catatan">{catatan(persen)}</p>
      </div>
    </div>
  );
}

function Grafik({ rekap }: { rekap: Rekap }) {
  return (
    <section className="grafik" aria-labelledby="judul-grafik">
      <h3 className="grafik-judul" id="judul-grafik">Per kategori</h3>
      <ul className="grafik-list">
        {Object.keys(rekap).map((kat) => {
          const r = rekap[kat];
          const p = r.total ? Math.round((r.benar / r.total) * 100) : 0;
          return (
            <li className="grafik-baris" key={kat}>
              <span className="grafik-label">{kat}</span>
              <span className="grafik-nilai">{r.benar}/{r.total} · {p}%</span>
              <span className="grafik-rel" aria-hidden="true">
                <span className={"grafik-isi block" + (p < 50 ? " lemah" : "")} style={{ width: Math.max(p, 2) + "%" }}></span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

type Filter = "semua" | "salah" | "kosong";

function Review({ soal, pilihan }: { soal: Soal[]; pilihan: (number | null)[] }) {
  const [filter, setFilter] = useState<Filter>("semua");
  const item = soal.map((s, i) => {
    const jawabMu = pilihan[i];
    const status: "tepat" | "meleset" | "kosong" | "tanpa-kunci" =
      jawabMu === null ? "kosong" : s.answer === null ? "tanpa-kunci" : jawabMu === s.answer ? "tepat" : "meleset";
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
          {tampil.map(({ s, i, jawabMu, status }) => {
            const kunci = s.answer;
            const kelas = status === "tepat" ? "tepat" : status === "meleset" ? "meleset" : "kosong";
            return (
              <li className={"review-item " + kelas} key={s.id}>
                <div className="review-atas">
                  <span className="review-no">{pad(i + 1)}</span>
                  <span className="chip netral">{s.category}</span>
                  {status === "tepat" && <span className="review-status ok"><Ikon nama="cek" ukuran={16} />Benar</span>}
                  {status === "meleset" && <span className="review-status no"><Ikon nama="silang" ukuran={16} />Salah</span>}
                  {status === "kosong" && <span className="review-status abu">Tidak dijawab</span>}
                  {status === "tanpa-kunci" && <span className="review-status abu">Belum ada kunci</span>}
                </div>
                <p className="review-soal">{s.question}</p>
                {s.image && (
                  <div className="plate-gambar">
                    <img src={srcGambar(s.image)} alt={altGambar(s, i + 1)} loading="lazy" />
                  </div>
                )}
                <dl className="review-jawab">
                  <dt>Jawabanmu</dt>
                  <dd className={jawabMu === null ? "abu" : status === "tepat" ? "ok" : status === "meleset" ? "no" : ""}>
                    {jawabMu === null ? "Tidak dijawab" : labelOpsi(s, jawabMu)}
                  </dd>
                  <dt>Kunci</dt>
                  <dd className={kunci === null ? "abu" : "ok"}>{kunci === null ? "Belum ada kunci" : labelOpsi(s, kunci)}</dd>
                </dl>
                <p className="review-penjelasan">{s.explanation}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

interface HasilLatihanProps {
  benar: number;
  total: number;
  rekap: Rekap;
  onUlangi: () => void;
  onMenu: () => void;
}

export function HasilLatihan({ benar, total, rekap, onUlangi, onMenu }: HasilLatihanProps) {
  return (
    <div className="kartu hasil">
      <Skor benar={benar} total={total} />
      <Grafik rekap={rekap} />
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={onUlangi}><Ikon nama="ulang" ukuran={18} />Ulangi dari awal</button>
        <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
      </div>
    </div>
  );
}

interface HasilUjianProps {
  paket: PaketUjian;
  soal: Soal[];
  pilihan: (number | null)[];
  benar: number;
  rekap: Rekap;
  habisWaktu: boolean;
  terpakai: number;
  onUlangi: () => void;
  onMenu: () => void;
}

export function HasilUjian(p: HasilUjianProps) {
  const kosong = p.pilihan.filter((x) => x === null).length;
  return (
    <div className="kartu hasil">
      <Skor benar={p.benar} total={p.soal.length} />
      <dl className="fakta-grid">
        <div className="fakta">
          <dt>Status</dt>
          <dd className={p.habisWaktu ? "tegas" : undefined}>
            {p.habisWaktu ? "Waktu habis, ditutup otomatis" : "Diselesaikan sendiri"}
          </dd>
        </div>
        <div className="fakta">
          <dt>Waktu terpakai</dt>
          <dd className="mono">{formatWaktu(p.terpakai)} / {formatWaktu(p.paket.detik)}</dd>
        </div>
        <div className="fakta">
          <dt>Tidak dijawab</dt>
          <dd className={kosong > 0 ? "tegas" : undefined}>{kosong} dari {p.soal.length} soal</dd>
        </div>
      </dl>
      <Grafik rekap={p.rekap} />
      <Review soal={p.soal} pilihan={p.pilihan} />
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={p.onUlangi}><Ikon nama="ulang" ukuran={18} />Ulangi paket ini</button>
        <button className="tombol sekunder" type="button" onClick={p.onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
      </div>
    </div>
  );
}
