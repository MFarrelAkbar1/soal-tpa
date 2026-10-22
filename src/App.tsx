import { useCallback, useEffect, useReducer } from "react";
import { bankSoal } from "./data";
import { PAKET } from "./config/paket";
import type { PaketUjian } from "./types";
import { acakSalinan, keAtas } from "./lib/util";
import { sesiAwal, sesiReducer } from "./sesi";
import { useShortcut } from "./hooks/useShortcut";
import { Kop } from "./components/Kop";
import { Menu } from "./components/Menu";
import { LembarSoal } from "./components/LembarSoal";
import { AksiLatihan } from "./components/AksiLatihan";
import { AksiUjian } from "./components/AksiUjian";
import { Navigator } from "./components/Navigator";
import { HasilLatihan, HasilUjian } from "./components/Hasil";

export default function App() {
  const [s, dispatch] = useReducer(sesiReducer, sesiAwal);
  const { layar, soal, indeks, pilihan, paket } = s;

  const mulaiLatihan = useCallback(() => dispatch({ type: "mulai-latihan", soal: bankSoal }), []);

  const mulaiUjian = useCallback((p: PaketUjian) => {
    const kolam = bankSoal.filter((x) => x.section === p.section);
    dispatch({ type: "mulai-ujian", paket: p, soal: acakSalinan(kolam).slice(0, p.jumlah) });
  }, []);

  const keMenu = useCallback(() => dispatch({ type: "menu" }), []);
  const jawab = useCallback((i: number) => dispatch({ type: "jawab", i }), []);
  const lanjut = useCallback(() => dispatch({ type: "lanjut" }), []);
  const keSoal = useCallback((i: number) => dispatch({ type: "ke-soal", i }), []);

  const mintaSelesai = () => {
    const kosong = pilihan.filter((p) => p === null).length;
    if (kosong > 0) {
      const pesan = "Masih ada " + kosong + " soal yang belum dijawab dan akan dihitung salah.\n\n" +
        "Selesaikan ujian sekarang?";
      if (!window.confirm(pesan)) return;
    }
    dispatch({ type: "selesai", karenaWaktuHabis: false });
  };

  // timer mode ujian; reducer menutup ujian otomatis saat sisa waktu mencapai 0
  useEffect(() => {
    if (layar !== "ujian") return;
    const id = window.setInterval(() => dispatch({ type: "detik" }), 1000);
    return () => window.clearInterval(id);
  }, [layar, s.nomorSesi]);

  // setiap ganti layar, ganti soal, atau mulai sesi baru: gulir ke atas
  useEffect(keAtas, [layar, indeks, s.nomorSesi]);

  useShortcut(s, { jawab, lanjut, keSoal });

  const diSoal = layar === "latihan" || layar === "ujian";
  const terjawab = pilihan[indeks] !== null && pilihan[indeks] !== undefined;

  let kop;
  switch (layar) {
    case "menu":
      kop = <Kop eyebrow="Tes Potensi Akademik" judul="Latihan Soal" lengket={false} skor="0/0" sisaDetik={null} />;
      break;
    case "latihan":
      kop = <Kop eyebrow="Mode latihan" judul="Latihan Soal" lengket={false} skor={s.benar + "/" + s.dijawab} sisaDetik={null} />;
      break;
    case "hasil-latihan":
      kop = <Kop eyebrow="Mode latihan" judul="Latihan Soal" lengket={false} skor={s.benar + "/" + soal.length} sisaDetik={null} />;
      break;
    case "ujian":
      kop = <Kop eyebrow="Mode ujian" judul={paket!.section} lengket skor={null} sisaDetik={s.sisaDetik} />;
      break;
    case "hasil-ujian":
      kop = <Kop eyebrow="Hasil ujian" judul={paket!.section} lengket={false} skor={s.benar + "/" + soal.length} sisaDetik={null} />;
      break;
  }

  return (
    <div className="wrap">
      {kop}

      {layar === "menu" && (
        <Menu bank={bankSoal} paket={PAKET} onLatihan={mulaiLatihan} onUjian={mulaiUjian} />
      )}

      {diSoal && (
        <div>
          <LembarSoal
            soal={soal[indeks]}
            indeks={indeks}
            total={soal.length}
            pilihan={pilihan[indeks]}
            latihan={layar === "latihan"}
            onJawab={jawab}
          />
          {layar === "latihan" ? (
            <AksiLatihan
              terjawab={terjawab}
              terakhir={indeks === soal.length - 1}
              jumlahOpsi={soal[indeks].options.length}
              onLanjut={lanjut}
            />
          ) : (
            <>
              <AksiUjian
                pertama={indeks === 0}
                terakhir={indeks === soal.length - 1}
                onMundur={() => keSoal(indeks - 1)}
                onMaju={() => keSoal(indeks + 1)}
                onSelesai={mintaSelesai}
              />
              <Navigator pilihan={pilihan} indeks={indeks} onPilih={keSoal} />
            </>
          )}
        </div>
      )}

      {layar === "hasil-latihan" && (
        <HasilLatihan benar={s.benar} total={soal.length} rekap={s.rekap} onUlangi={mulaiLatihan} onMenu={keMenu} />
      )}

      {layar === "hasil-ujian" && paket && (
        <HasilUjian
          paket={paket}
          soal={soal}
          pilihan={pilihan}
          benar={s.benar}
          rekap={s.rekap}
          habisWaktu={s.habisWaktu}
          terpakai={s.terpakai}
          onUlangi={() => mulaiUjian(paket)}
          onMenu={keMenu}
        />
      )}
    </div>
  );
}
