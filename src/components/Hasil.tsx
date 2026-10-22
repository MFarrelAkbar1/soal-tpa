import type { PaketUjian, Rekap, Soal } from "../types";
import { altGambar, catatan, formatWaktu, labelOpsi, pad, srcGambar } from "../lib/util";

function Rincian({ rekap }: { rekap: Rekap }) {
  return (
    <div className="rincian">
      {Object.keys(rekap).map((kat) => {
        const r = rekap[kat];
        const p = r.total ? Math.round((r.benar / r.total) * 100) : 0;
        return (
          <div className="baris-kat" key={kat}>
            <span className="nama-kat">{kat}</span>
            <span className="nilai-kat">{r.benar}/{r.total} {"·"} {p}%</span>
            <span className="bar-kat"><span style={{ width: p + "%" }}></span></span>
          </div>
        );
      })}
    </div>
  );
}

function Review({ soal, pilihan }: { soal: Soal[]; pilihan: (number | null)[] }) {
  return (
    <div className="review">
      <p className="review-label">Pembahasan seluruh soal</p>
      {soal.map((s, i) => {
        const jawabMu = pilihan[i];
        const kunci = s.answer;
        const tepat = kunci !== null && jawabMu !== null && jawabMu === kunci;
        const kelas = jawabMu === null ? "" : tepat ? " tepat" : " meleset";
        return (
          <div className={"review-item" + kelas} key={s.id}>
            <div className="review-atas">
              <span className="review-no">{pad(i + 1)}</span>
              <span className="review-kat">{s.category}</span>
            </div>
            <p className="review-soal">{s.question}</p>
            {s.image && <img className="review-gambar" src={srcGambar(s.image)} alt={altGambar(s, i + 1)} />}
            <p className="review-jawab">
              Jawabanmu:{" "}
              <span className={jawabMu === null ? "abu" : tepat ? "ok" : "no"}>
                {jawabMu === null ? "Tidak dijawab" : labelOpsi(s, jawabMu)}
              </span>
              <br />
              Kunci:{" "}
              {kunci === null
                ? <span className="abu">Belum ada kunci</span>
                : <span className="ok">{labelOpsi(s, kunci)}</span>}
            </p>
            <p className="review-penjelasan">{s.explanation}</p>
          </div>
        );
      })}
    </div>
  );
}

function Skor({ benar, total }: { benar: number; total: number }) {
  const persen = total ? Math.round((benar / total) * 100) : 0;
  return (
    <>
      <div className="hasil-angka">
        {benar}<span style={{ color: "var(--ink-faint)" }}>/{total}</span>
      </div>
      <p className="hasil-sub">{persen}% benar. {catatan(persen)}</p>
    </>
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
    <div className="hasil">
      <p className="eyebrow">Hasil latihan</p>
      <Skor benar={benar} total={total} />
      <Rincian rekap={rekap} />
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={onUlangi}>Ulangi dari awal</button>
        <button className="tombol hantu" type="button" onClick={onMenu}>Kembali ke menu</button>
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
    <div className="hasil">
      <p className="eyebrow">Hasil ujian {"·"} {p.paket.section}</p>
      <Skor benar={p.benar} total={p.soal.length} />
      <dl className="hasil-fakta">
        <div className="fakta">
          <dt>Status</dt>
          <dd className={p.habisWaktu ? "tegas" : undefined}>
            {p.habisWaktu
              ? "Waktu habis · ujian ditutup otomatis"
              : "Diselesaikan sendiri sebelum waktu habis"}
          </dd>
        </div>
        <div className="fakta">
          <dt>Waktu terpakai</dt>
          <dd>{formatWaktu(p.terpakai)} dari {formatWaktu(p.paket.detik)}</dd>
        </div>
        <div className="fakta">
          <dt>Soal tidak dijawab</dt>
          <dd className={kosong > 0 ? "tegas" : undefined}>{kosong} dari {p.soal.length} soal</dd>
        </div>
      </dl>
      <Rincian rekap={p.rekap} />
      <Review soal={p.soal} pilihan={p.pilihan} />
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={p.onUlangi}>Ulangi paket ini</button>
        <button className="tombol hantu" type="button" onClick={p.onMenu}>Kembali ke menu</button>
      </div>
    </div>
  );
}
