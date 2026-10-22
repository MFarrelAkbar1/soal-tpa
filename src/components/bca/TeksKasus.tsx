import type { DaftarButir, Kasus, TabelData } from "../../bca/types";

function Tabel({ t }: { t: TabelData }) {
  return (
    <figure className="bca-tabel">
      <figcaption>{t.judul}</figcaption>
      <div className="bca-tabel-gulir" tabIndex={0} role="region" aria-label={t.judul + " (bisa digeser)"}>
        <table>
          <thead>
            <tr>{t.kolom.map((k) => <th key={k} scope="col">{k}</th>)}</tr>
          </thead>
          <tbody>
            {t.baris.map((b, i) => (
              <tr key={i}>
                {b.map((sel, j) => j === 0 ? <th key={j} scope="row">{sel}</th> : <td key={j}>{sel}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.kolom.length > 4 && <p className="bca-tabel-petunjuk" aria-hidden="true">Geser tabel ke samping untuk melihat semua kolom →</p>}
    </figure>
  );
}

export function Daftar({ d }: { d: DaftarButir }) {
  return (
    <div className="bca-daftar">
      {d.judul && <p className="bca-daftar-judul">{d.judul}</p>}
      <ul>{d.butir.map((b, i) => <li key={i}>{b}</li>)}</ul>
    </div>
  );
}

// Teks bacaan kasus: tampil di atas pertanyaan, dipakai bersama oleh semua soal dengan caseId sama.
export function TeksKasus({ kasus }: { kasus: Kasus }) {
  return (
    <section className="bca-kasus" aria-label={"Teks kasus: " + kasus.judul}>
      <h2 className="bca-kasus-judul">{kasus.judul}</h2>
      {kasus.passage.map((p, i) => <p className="bca-paragraf" key={i}>{p}</p>)}
      {kasus.tabel?.map((t) => <Tabel key={t.judul} t={t} />)}
      {kasus.tugas?.map((d) => <Daftar key={d.judul} d={d} />)}
      {kasus.keterangan && (
        <details className="bca-keterangan">
          <summary>Sumber &amp; catatan</summary>
          <p>{kasus.keterangan}</p>
          <p>PDF: {kasus.sumber.join(" · ")}</p>
        </details>
      )}
    </section>
  );
}
