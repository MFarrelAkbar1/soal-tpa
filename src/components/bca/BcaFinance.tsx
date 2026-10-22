import { useCallback, useEffect, useState } from "react";
import type { SesiBca } from "../../bca/sesi";
import { namaMode, selesaikan, sesiBaru, sisaDetik } from "../../bca/sesi";
import { cariKasus } from "../../bca/data";
import { keAtas, pad } from "../../lib/util";
import { Ikon } from "../Ikon";
import { Kop, KopUjian } from "../Kop";
import { Navigator } from "../Navigator";
import { AksiUjian } from "../AksiUjian";
import { Sheet } from "../Sheet";
import { TemaToggle } from "../TemaToggle";
import { LatihanEsai } from "./LatihanEsai";
import { UjianEsai, adaIsian } from "./UjianEsai";
import { HasilBca } from "./HasilBca";
import { PanelPanduan } from "./PanelPanduan";

interface Props {
  sesi: SesiBca;
  onUbah: (f: (s: SesiBca) => SesiBca) => void;
  onGanti: (s: SesiBca) => void;
  onMenu: () => void;
  statusSimpan: { ok: boolean; pada: number } | null;
}

function jam(ms: number): string {
  const d = new Date(ms);
  return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
}

export function BcaFinance({ sesi, onUbah, onGanti, onMenu, statusSimpan }: Props) {
  const [sekarang, setSekarang] = useState(() => Date.now());
  const [panduan, setPanduan] = useState(false);
  const [navBuka, setNavBuka] = useState(false);
  const latihan = sesi.mode === "latihan";
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

  const ketik = useCallback((kunci: string, teks: string) => {
    onUbah((s) => (s.selesai ? s : { ...s, jawaban: { ...s.jawaban, [kunci]: teks } }));
  }, [onUbah]);

  const ke = useCallback((i: number) => {
    onUbah((s) => (i < 0 || i >= s.unit.length ? s : { ...s, indeks: i }));
  }, [onUbah]);

  const cek = useCallback((kunci: string, nilai: boolean) => {
    onUbah((s) => ({ ...s, cek: { ...s.cek, [kunci]: nilai } }));
  }, [onUbah]);

  const tutupPanduan = useCallback(() => setPanduan(false), []);

  const mintaSelesai = () => {
    if (!latihan) {
      const kosong = sesi.unit.filter((id) => !adaIsian(sesi, id)).length;
      const pesan = (kosong > 0 ? "Masih ada " + kosong + " kasus yang belum diisi.\n\n" : "") +
        "Selesaikan ujian sekarang? Jawaban tidak bisa diubah lagi setelah ini.";
      if (!window.confirm(pesan)) return;
    }
    onUbah((s) => selesaikan(s, false));
  };

  const sisa = sisaDetik(sesi, sekarang);
  const terisi = sesi.unit.map((id) => (adaIsian(sesi, id) ? 0 : null));

  return (
    <div className={"app" + (ujian ? " tenang" : " mode-latihan")}>
      {ujian && sisa !== null && (
        <KopUjian
          lebar
          label={"Kasus " + (sesi.indeks + 1) + "/" + sesi.unit.length}
          sub={namaMode(sesi.mode) + " · " + cariKasus(sesi.unit[sesi.indeks]).kelompok}
          sisaDetik={sisa}
          navigator={{ terisi: terisi.filter((x) => x !== null).length, total: sesi.unit.length, onBuka: () => setNavBuka(true) }}
        />
      )}

      <main className="halaman lebar">
        {!ujian && (
          <Kop eyebrow={"BCA Finance · " + (selesai ? "Rangkuman" : namaMode(sesi.mode))} judul="Studi Kasus BCA Finance" skor={null} />
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
          <HasilBca
            sesi={sesi}
            onCek={cek}
            onUlangi={() => onGanti(sesiBaru(sesi.mode))}
            onMenu={onMenu}
          />
        ) : latihan ? (
          <LatihanEsai sesi={sesi} tersimpan={tersimpan} onKetik={ketik} onKe={ke} onSelesai={mintaSelesai} />
        ) : (
          <>
            <UjianEsai sesi={sesi} tersimpan={tersimpan} onKetik={ketik} />
            <AksiUjian
              satuan="kasus"
              pertama={sesi.indeks === 0}
              terakhir={sesi.indeks === sesi.unit.length - 1}
              onMundur={() => ke(sesi.indeks - 1)}
              onMaju={() => ke(sesi.indeks + 1)}
              onSelesai={mintaSelesai}
            />
            <Sheet buka={navBuka} judul="Navigator kasus" onTutup={() => setNavBuka(false)}>
              <Navigator label="Kasus" pilihan={terisi} indeks={sesi.indeks} onPilih={(i) => { ke(i); setNavBuka(false); }} />
              <div className="tema-di-sheet"><span>Tema</span><TemaToggle /></div>
            </Sheet>
          </>
        )}
      </main>

      <button type="button" className="fab-panduan" onClick={() => setPanduan(true)} aria-haspopup="dialog">
        <Ikon nama="buku" ukuran={20} /><span className="fab-teks">Panduan</span>
      </button>
      <PanelPanduan buka={panduan} onTutup={tutupPanduan} />
    </div>
  );
}
