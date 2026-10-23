import { useCallback, useEffect, useRef, useState } from "react";
import type { SesiAnalogi } from "../../analogi/sesi";
import { hitung, jawab, keSoal, modeLatihan, modeTiu5, namaMode, selesaikan, sesiBaru, sisaDetik } from "../../analogi/sesi";
import { JUMLAH_OPSI } from "../../analogi/generator";
import { keAtas, pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { Kop, KopUjian } from "../Kop";
import { Navigator } from "../Navigator";
import { AksiLatihan } from "../AksiLatihan";
import { AksiUjian } from "../AksiUjian";
import { Sheet } from "../Sheet";
import { TemaToggle } from "../TemaToggle";
import { LembarAnalogi } from "./LembarAnalogi";
import { HasilAnalogi } from "./HasilAnalogi";

interface Props {
  sesi: SesiAnalogi;
  onUbah: (f: (s: SesiAnalogi) => SesiAnalogi) => void;
  onGanti: (s: SesiAnalogi) => void;
  onMenu: () => void;
  statusSimpan: { ok: boolean; pada: number } | null;
}

function jam(ms: number): string {
  const d = new Date(ms);
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}

export function AnalogiGambar({ sesi, onUbah, onGanti, onMenu, statusSimpan }: Props) {
  const [sekarang, setSekarang] = useState(() => Date.now());
  const [navBuka, setNavBuka] = useState(false);
  const latihan = modeLatihan(sesi.mode);
  const judul = modeTiu5(sesi.mode) ? "TIU 5 · Analogi Gambar" : "Analogi Gambar";
  const selesai = sesi.selesai !== null;
  const ujian = !latihan && !selesai;
  const tersimpan = statusSimpan?.ok !== false;

  // timer dihitung dari waktu akhir yang tersimpan, jadi tetap benar setelah halaman di-refresh
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

  useEffect(keAtas, [sesi.indeks, selesai, sesi.mulai]);

  const pilih = useCallback((i: number) => onUbah((s) => jawab(s, i)), [onUbah]);
  const ke = useCallback((i: number) => onUbah((s) => keSoal(s, i)), [onUbah]);
  const lanjut = useCallback(() => {
    onUbah((s) => {
      if (!modeLatihan(s.mode) || s.pilihan[s.indeks] === null) return s;
      return s.indeks === s.soal.length - 1 ? selesaikan(s, false) : { ...s, indeks: s.indeks + 1 };
    });
  }, [onUbah]);

  const mintaSelesai = () => {
    const kosong = sesi.pilihan.filter((p) => p === null).length;
    if (kosong > 0) {
      const pesan = "Masih ada " + kosong + " soal yang belum dijawab dan akan dihitung salah.\n\n" +
        "Selesaikan ujian sekarang?";
      if (!window.confirm(pesan)) return;
    }
    onUbah((s) => selesaikan(s, false));
  };

  // Shortcut: 1–5 menjawab, Enter lanjut (latihan), ←/→/Enter pindah soal (ujian).
  const ref = useRef({ sesi, pilih, ke, lanjut });
  ref.current = { sesi, pilih, ke, lanjut };
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const { sesi: s, pilih, ke, lanjut } = ref.current;
      if (s.selesai) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      const diTombol = e.target instanceof HTMLElement && e.target.tagName === "BUTTON";
      if (diTombol && (e.key === "Enter" || e.key === " ")) return;

      const terjawab = s.pilihan[s.indeks] !== null;
      if (!modeLatihan(s.mode)) {
        if (e.key === "ArrowLeft") { e.preventDefault(); ke(s.indeks - 1); return; }
        if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); ke(s.indeks + 1); return; }
      } else {
        if (e.key === "Enter" && terjawab) { e.preventDefault(); lanjut(); return; }
        if (terjawab) return;
      }
      const i = "12345".indexOf(e.key);
      if (e.key.length === 1 && i > -1 && i < JUMLAH_OPSI) { e.preventDefault(); pilih(i); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const sisa = sisaDetik(sesi, sekarang);
  const soal = sesi.soal[sesi.indeks];
  const { benar, dijawab } = hitung(sesi);

  return (
    <div className={"app" + (ujian ? " tenang" : " mode-latihan")}>
      {ujian && sisa !== null && (
        <KopUjian
          label={"Soal " + pad(sesi.indeks + 1) + "/" + pad(sesi.soal.length)}
          sub={judul + " · " + soal.chip}
          sisaDetik={sisa}
          navigator={{ terisi: dijawab, total: sesi.soal.length, onBuka: () => setNavBuka(true) }}
        />
      )}

      <main className="halaman">
        {!ujian && (
          <Kop
            eyebrow={(selesai ? "Hasil · " : "") + namaMode(sesi.mode)}
            judul={judul}
            skor={selesai ? benar + "/" + sesi.soal.length : benar + "/" + dijawab}
          />
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
          <HasilAnalogi sesi={sesi} onUlangi={() => onGanti(sesiBaru(sesi.mode))} onMenu={onMenu} />
        ) : (
          <div>
            <div className="transisi-soal" key={sesi.mulai + "-" + sesi.indeks}>
              <LembarAnalogi
                soal={soal}
                indeks={sesi.indeks}
                total={sesi.soal.length}
                pilihan={sesi.pilihan[sesi.indeks]}
                latihan={latihan}
                onJawab={pilih}
              />
            </div>
            {latihan ? (
              <AksiLatihan
                terjawab={sesi.pilihan[sesi.indeks] !== null}
                terakhir={sesi.indeks === sesi.soal.length - 1}
                jumlahOpsi={JUMLAH_OPSI}
                petunjuk={"Tekan 1–" + JUMLAH_OPSI + " untuk menjawab"}
                onLanjut={lanjut}
              />
            ) : (
              <>
                <AksiUjian
                  pertama={sesi.indeks === 0}
                  terakhir={sesi.indeks === sesi.soal.length - 1}
                  onMundur={() => ke(sesi.indeks - 1)}
                  onMaju={() => ke(sesi.indeks + 1)}
                  onSelesai={mintaSelesai}
                />
                <div className="kartu nav-inline">
                  <Navigator pilihan={sesi.pilihan} indeks={sesi.indeks} onPilih={ke} />
                </div>
                <Sheet buka={navBuka} judul="Navigator soal" onTutup={() => setNavBuka(false)}>
                  <Navigator pilihan={sesi.pilihan} indeks={sesi.indeks} onPilih={(i) => { ke(i); setNavBuka(false); }} />
                  <div className="tema-di-sheet"><span>Tema</span><TemaToggle /></div>
                </Sheet>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
