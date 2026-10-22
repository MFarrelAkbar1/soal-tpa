import { useCallback, useEffect, useState } from "react";
import type { SesiBca } from "../../bca/sesi";
import { namaMode, selesaikan, sesiBaru, sisaDetik } from "../../bca/sesi";
import { keAtas } from "../../lib/util";
import { Kop } from "../Kop";
import { LatihanEsai } from "./LatihanEsai";
import { UjianEsai, adaIsian } from "./UjianEsai";
import { HasilBca } from "./HasilBca";
import { PanelPanduan } from "./PanelPanduan";

interface Props {
  sesi: SesiBca;
  onUbah: (f: (s: SesiBca) => SesiBca) => void;
  onGanti: (s: SesiBca) => void;
  onMenu: () => void;
}

export function BcaFinance({ sesi, onUbah, onGanti, onMenu }: Props) {
  const [sekarang, setSekarang] = useState(() => Date.now());
  const [panduan, setPanduan] = useState(false);
  const latihan = sesi.mode === "latihan";
  const selesai = sesi.selesai !== null;

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

  return (
    <div className="wrap">
      <Kop
        eyebrow={"BCA Finance · " + (selesai ? "Rangkuman" : namaMode(sesi.mode))}
        judul="Studi Kasus BCA Finance"
        lengket={!latihan && !selesai}
        skor={null}
        sisaDetik={selesai ? null : sisa}
      />

      {!selesai && (
        <div className="bca-simpan">
          <span>Jawaban tersimpan otomatis di browser ini, aman bila tab tertutup atau halaman di-refresh.</span>
          <button type="button" className="bca-tautan" onClick={onMenu}>Ke menu (sesi tetap tersimpan)</button>
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
        <LatihanEsai sesi={sesi} onKetik={ketik} onKe={ke} onSelesai={mintaSelesai} />
      ) : (
        <UjianEsai sesi={sesi} onKetik={ketik} onKe={ke} onSelesai={mintaSelesai} />
      )}

      <button type="button" className="bca-tombol-panduan" onClick={() => setPanduan(true)} aria-haspopup="dialog">
        Panduan
      </button>
      <PanelPanduan buka={panduan} onTutup={tutupPanduan} />
    </div>
  );
}
