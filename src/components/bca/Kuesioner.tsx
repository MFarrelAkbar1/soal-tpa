import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import type { SesiKuesioner, TesKuesioner } from "../../bca/kuesioner";
import { INFO_TES, jawab, ke, namaFile, selesaikan, sisaDetik, teksJawaban } from "../../bca/kuesioner";
import { CONTOH_PAPI, PERNYATAAN_PAPI, PETUNJUK_PAPI, TIPS_PAPI } from "../../bca/data/papi";
import { CONTOH_CBI, PERNYATAAN_CBI, PETUNJUK_CBI, TIPS_CBI } from "../../bca/data/cbi";
import { salinTeks, unduhTeks } from "../../bca/ekspor";
import { PSIKOTES } from "../../config/psikotes";
import { formatWaktu, keAtas, pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { Kop, KopUjian } from "../Kop";
import { Navigator } from "../Navigator";
import { AksiUjian } from "../AksiUjian";
import { Sheet } from "../Sheet";
import { TemaToggle } from "../TemaToggle";

// Sorot kata "tidak" di pernyataan CBI, sesuai tips PDF.
export function SorotTidak({ teks }: { teks: string }) {
  const bagian = teks.split(/(\btidak\b)/i);
  return (
    <>
      {bagian.map((b, i) => (i % 2 === 1 ? <mark key={i} className="sorot-tidak">{b}</mark> : <Fragment key={i}>{b}</Fragment>))}
    </>
  );
}

// ---------- layar petunjuk ----------

interface PetunjukProps {
  tes: TesKuesioner;
  onMulai: (pakaiBatasWaktu: boolean) => void;
  onMenu: () => void;
}

export function PetunjukKuesioner({ tes, onMulai, onMenu }: PetunjukProps) {
  const [batas, setBatas] = useState(false);
  const info = INFO_TES[tes];
  const papi = tes === "papi";
  return (
    <div className="ag-petunjuk">
      <section className="kartu kartu-soal" aria-labelledby="judul-petunjuk">
        <p className="kop-eyebrow">Petunjuk dari PDF</p>
        <h2 className="soal-teks" id="judul-petunjuk">{info.nama}</h2>
        {(papi ? PETUNJUK_PAPI : PETUNJUK_CBI).map((p) => <p className="ag-ket" key={p}>{p}</p>)}
        <p className="ag-label-contoh">Contoh soal</p>
        {papi ? (
          <ul className="opsi-list" aria-label="Contoh pilihan">
            <li><div className="opsi kq-contoh"><span className="opsi-huruf">A</span><span className="opsi-teks">{CONTOH_PAPI.a}</span></div></li>
            <li><div className="opsi kq-contoh"><span className="opsi-huruf">B</span><span className="opsi-teks">{CONTOH_PAPI.b}</span></div></li>
          </ul>
        ) : (
          <p className="kq-pernyataan kecil"><SorotTidak teks={CONTOH_CBI.teks} /></p>
        )}
        <p className="ag-ket kq-jarak">{papi ? CONTOH_PAPI.keterangan : CONTOH_CBI.keterangan}</p>
      </section>

      <section className="kartu ag-info">
        <h3 className="grafik-judul">Tips menjawab {info.nama} (dari PDF)</h3>
        <ul className="ag-daftar">
          {(papi ? TIPS_PAPI : TIPS_CBI).map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="ag-ket">
          Tidak ada jawaban benar atau salah dan <strong>tidak ada skor</strong>, karena PDF tidak memuat aturan penilaiannya.
          Di akhir kamu mendapat ringkasan dan daftar jawaban yang bisa disalin atau diunduh.
        </p>
        <ul className="ks-stat" aria-label="Ringkasan sesi">
          <li><Ikon nama="grid" />{info.jumlah} {papi ? "pasang pernyataan" : "pernyataan"}</li>
          <li><Ikon nama="simpan" />Tersimpan otomatis</li>
        </ul>
        <p className="ag-ket">
          Tekan <span className="mono">{info.pilihan[0].kode.toUpperCase()}</span> atau <span className="mono">{info.pilihan[1].kode.toUpperCase()}</span> untuk
          menjawab ({info.pilihan.map((p) => p.label).join(" / ")}); setelah menjawab, pernyataan berikutnya langsung muncul.
        </p>
        {papi && (
          <label className="kq-opsi-timer">
            <input type="checkbox" checked={batas} onChange={(e) => setBatas(e.target.checked)} />
            <span>
              Pakai batas waktu {Math.round(PSIKOTES.papi.detikOpsional / 60)} menit
              <span className="pm-ket">Opsional. PDF tidak menyebut durasi; sesi ditutup otomatis saat waktu habis.</span>
            </span>
          </label>
        )}
        <div className="hasil-aksi">
          <button className="tombol" type="button" onClick={() => onMulai(papi && batas)}>
            Mulai {info.nama}
            <Ikon nama="panah" ukuran={18} />
          </button>
          <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
        </div>
      </section>
    </div>
  );
}

// ---------- ringkasan akhir ----------

function Ringkasan({ sesi, onUlangi, onMenu }: { sesi: SesiKuesioner; onUlangi: () => void; onMenu: () => void }) {
  const [kabar, setKabar] = useState("");
  const info = INFO_TES[sesi.tes];
  const dijawab = sesi.jawaban.filter((j) => j !== null).length;
  const terpakai = Math.round(((sesi.selesai?.pada ?? Date.now()) - sesi.mulai) / 1000);
  const batas = sesi.berakhir === null ? null : Math.round((sesi.berakhir - sesi.mulai) / 1000);

  const salin = async () => {
    const ok = await salinTeks(teksJawaban(sesi));
    setKabar(ok ? "Semua jawaban tersalin ke clipboard." : "Gagal menyalin. Pakai tombol unduh.");
  };
  const unduh = () => {
    unduhTeks(teksJawaban(sesi), namaFile(sesi));
    setKabar("File " + namaFile(sesi) + " diunduh.");
  };

  return (
    <div className="kartu hasil">
      <p className="skor-besar mono">{dijawab}<span>/{info.jumlah}</span></p>
      <p className="skor-catatan">
        {sesi.tes === "papi" ? "pasang pernyataan dijawab" : "pernyataan dijawab"}. Tidak ada skor: PDF tidak memuat aturan penilaian {info.nama}.
      </p>
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
          <dd className={dijawab < info.jumlah ? "tegas" : undefined}>{info.jumlah - dijawab} dari {info.jumlah}</dd>
        </div>
      </dl>
      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={salin}><Ikon nama="salin" ukuran={18} />Salin daftar jawaban</button>
        <button className="tombol sekunder" type="button" onClick={unduh}><Ikon nama="unduh" ukuran={18} />Unduh .txt</button>
      </div>
      {kabar && <p className="status-simpan kq-kabar" role="status">{kabar}</p>}

      <section className="review" aria-labelledby="judul-daftar">
        <h3 className="review-judul" id="judul-daftar">Daftar jawaban</h3>
        <ol className="kq-daftar">
          {sesi.jawaban.map((j, i) => {
            const kosong = j === null;
            if (sesi.tes === "papi") {
              const p = PERNYATAAN_PAPI[i];
              return (
                <li key={p.id} className={kosong ? "kosong" : undefined}>
                  <span className="kq-no mono">{pad(p.nomor)}</span>
                  <span className="kq-jawab mono">{kosong ? "–" : j!.toUpperCase()}</span>
                  <span>{kosong ? "Tidak dijawab" : j === "a" ? p.a : p.b}</span>
                </li>
              );
            }
            const p = PERNYATAAN_CBI[i];
            return (
              <li key={p.id} className={kosong ? "kosong" : undefined}>
                <span className="kq-no mono">{pad(p.nomor)}</span>
                <span className="kq-jawab mono">{j ?? "–"}</span>
                <span><SorotTidak teks={p.teks} /></span>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="hasil-aksi">
        <button className="tombol" type="button" onClick={onUlangi}><Ikon nama="ulang" ukuran={18} />Ulangi dari awal</button>
        <button className="tombol sekunder" type="button" onClick={onMenu}><Ikon nama="rumah" ukuran={18} />Kembali ke menu</button>
      </div>
    </div>
  );
}

// ---------- sesi ----------

interface Props {
  sesi: SesiKuesioner;
  onUbah: (f: (s: SesiKuesioner) => SesiKuesioner) => void;
  onUlangi: () => void;
  onMenu: () => void;
  statusSimpan: { ok: boolean; pada: number } | null;
}

function jam(ms: number): string {
  const d = new Date(ms);
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}

export function Kuesioner({ sesi, onUbah, onUlangi, onMenu, statusSimpan }: Props) {
  const [sekarang, setSekarang] = useState(() => Date.now());
  const [navBuka, setNavBuka] = useState(false);
  const info = INFO_TES[sesi.tes];
  const selesai = sesi.selesai !== null;
  const tersimpan = statusSimpan?.ok !== false;

  // timer opsional dihitung dari waktu akhir yang tersimpan, jadi tetap benar setelah refresh
  useEffect(() => {
    if (sesi.berakhir === null || selesai) return;
    const tik = () => {
      const t = Date.now();
      setSekarang(t);
      if (t >= sesi.berakhir!) onUbah((s) => selesaikan(s, true));
    };
    tik();
    const id = window.setInterval(tik, 1000);
    return () => window.clearInterval(id);
  }, [sesi.berakhir, selesai, onUbah]);

  useEffect(keAtas, [selesai, sesi.mulai]);

  const pilih = useCallback((kode: string) => onUbah((s) => jawab(s, kode)), [onUbah]);
  const pindah = useCallback((i: number) => onUbah((s) => ke(s, i)), [onUbah]);

  const mintaSelesai = () => {
    const kosong = sesi.jawaban.filter((j) => j === null).length;
    const pesan = (kosong > 0 ? "Masih ada " + kosong + " pernyataan yang belum dijawab.\n\n" : "") +
      "Selesaikan " + info.nama + " sekarang? Jawaban tidak bisa diubah lagi setelah ini.";
    if (!window.confirm(pesan)) return;
    onUbah((s) => selesaikan(s, false));
  };

  // Shortcut: A/B (PAPI) atau B/S (CBI) menjawab, ←/→/Enter pindah pernyataan.
  const ref = useRef({ sesi, pilih, pindah });
  ref.current = { sesi, pilih, pindah };
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const { sesi: s, pilih, pindah } = ref.current;
      if (s.selesai) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      const diTombol = e.target instanceof HTMLElement && e.target.tagName === "BUTTON";
      if (diTombol && (e.key === "Enter" || e.key === " ")) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); pindah(s.indeks - 1); return; }
      if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); pindah(s.indeks + 1); return; }
      if (e.key.length !== 1) return;
      const p = INFO_TES[s.tes].pilihan.find((x) => x.kode.toLowerCase() === e.key.toLowerCase());
      if (p) { e.preventDefault(); pilih(p.kode); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const sisa = sisaDetik(sesi, sekarang);
  const terisi = sesi.jawaban.map((j) => (j === null ? null : 0));
  const dijawab = terisi.filter((x) => x !== null).length;
  const i = sesi.indeks;
  const pilihan = sesi.jawaban[i];

  return (
    <div className={"app" + (!selesai && sisa !== null ? " tenang" : " mode-latihan")}>
      {!selesai && sisa !== null && (
        <KopUjian
          label={"No. " + pad(i + 1) + "/" + pad(info.jumlah)}
          sub={"BCA Finance · " + info.nama}
          sisaDetik={sisa}
          navigator={{ terisi: dijawab, total: info.jumlah, onBuka: () => setNavBuka(true) }}
        />
      )}

      <main className="halaman">
        {(selesai || sisa === null) && (
          <Kop eyebrow={"BCA Finance · " + (selesai ? "Ringkasan" : "Psikotes")} judul={info.nama} skor={null} />
        )}

        {!selesai && (
          <div className="bar-sesi">
            {statusSimpan && (
              tersimpan
                ? <span className="status-simpan" role="status"><Ikon nama="simpan" ukuran={16} />Tersimpan otomatis · <span className="mono">{jam(statusSimpan.pada)}</span></span>
                : <span className="status-simpan gagal" role="status"><Ikon nama="awas" ukuran={16} />Browser ini tidak bisa menyimpan; jangan tutup tab</span>
            )}
            <button type="button" className="tautan" onClick={onMenu}>
              <Ikon nama="rumah" ukuran={16} />Ke menu (sesi tetap tersimpan)
            </button>
          </div>
        )}

        {selesai ? (
          <Ringkasan sesi={sesi} onUlangi={onUlangi} onMenu={onMenu} />
        ) : (
          <div>
            <div className="progres">
              <div className="progres-teks">
                <span>{sesi.tes === "papi" ? "Pasang" : "Pernyataan"} {i + 1} dari {info.jumlah}</span>
                <span className="chip">{dijawab} terjawab</span>
              </div>
              <div className="progres-rel" role="progressbar" aria-label="Posisi pernyataan" aria-valuemin={1} aria-valuemax={info.jumlah} aria-valuenow={i + 1}>
                <div className="progres-isi" style={{ width: ((i + 1) / info.jumlah) * 100 + "%" }}></div>
              </div>
            </div>

            <div className="transisi-soal" key={sesi.mulai + "-" + i}>
              <section className="kartu kartu-soal" aria-labelledby={"kq-" + i}>
                <div className="soal-kepala">
                  <span className="soal-nomor">No. {pad(i + 1)}</span>
                </div>
                {sesi.tes === "papi" ? (
                  <h2 className="soal-teks" id={"kq-" + i}>Pilih pernyataan yang paling menggambarkan diri Anda.</h2>
                ) : (
                  <h2 className="kq-pernyataan" id={"kq-" + i}><SorotTidak teks={PERNYATAAN_CBI[i].teks} /></h2>
                )}
                <ul className={"opsi-list" + (sesi.tes === "cbi" ? " kq-bs" : "")} aria-label="Pilihan jawaban">
                  {info.pilihan.map((p) => {
                    const dipilih = pilihan === p.kode;
                    const teks = sesi.tes === "papi" ? (p.kode === "a" ? PERNYATAAN_PAPI[i].a : PERNYATAAN_PAPI[i].b) : p.label;
                    return (
                      <li key={p.kode}>
                        <button type="button" className={"opsi" + (dipilih ? " dipilih" : "")} aria-pressed={dipilih} onClick={() => pilih(p.kode)}>
                          <span className="opsi-huruf" aria-hidden="true">{p.kode.toUpperCase()}</span>
                          <span className="opsi-teks">{teks}<span className="sr-only">{dipilih ? ", dipilih" : ""}</span></span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>

            <AksiUjian
              satuan="pernyataan"
              pertama={i === 0}
              terakhir={i === info.jumlah - 1}
              onMundur={() => pindah(i - 1)}
              onMaju={() => pindah(i + 1)}
              onSelesai={mintaSelesai}
            />
            <div className="kartu nav-inline">
              <Navigator label="Nomor" pilihan={terisi} indeks={i} onPilih={pindah} />
            </div>
            <Sheet buka={navBuka} judul="Navigator nomor" onTutup={() => setNavBuka(false)}>
              <Navigator label="Nomor" pilihan={terisi} indeks={i} onPilih={(n) => { pindah(n); setNavBuka(false); }} />
              <div className="tema-di-sheet"><span>Tema</span><TemaToggle /></div>
            </Sheet>
            {sisa === null && (
              <button type="button" className="tombol sekunder kq-nav-hp" onClick={() => setNavBuka(true)} aria-haspopup="dialog">
                <Ikon nama="grid" ukuran={18} />Navigator nomor · {dijawab}/{info.jumlah}
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
