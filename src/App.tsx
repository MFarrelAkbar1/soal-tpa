import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { bankSoal } from "./data";
import { PAKET } from "./config/paket";
import type { PaketUjian } from "./types";
import { acakSalinan, keAtas, pad } from "./lib/util";
import { sesiAwal, sesiReducer } from "./sesi";
import { useShortcut } from "./hooks/useShortcut";
import { Kop, KopUjian } from "./components/Kop";
import { Sheet } from "./components/Sheet";
import { TemaToggle } from "./components/TemaToggle";
import { Menu } from "./components/Menu";
import { LembarSoal } from "./components/LembarSoal";
import { AksiLatihan } from "./components/AksiLatihan";
import { AksiUjian } from "./components/AksiUjian";
import { Navigator } from "./components/Navigator";
import { HasilLatihan, HasilUjian } from "./components/Hasil";
import { BcaFinance } from "./components/bca/BcaFinance";
import type { ModeBca, SesiBca } from "./bca/sesi";
import { muatSesi, sesiBaru, simpanSesi } from "./bca/sesi";
import { AnalogiGambar } from "./components/analogi/AnalogiGambar";
import { PetunjukAnalogi } from "./components/analogi/PetunjukAnalogi";
import type { ModeAnalogi, SesiAnalogi } from "./analogi/sesi";
import * as sesiAnalogi from "./analogi/sesi";
import { Kuesioner, PetunjukKuesioner } from "./components/bca/Kuesioner";
import type { SesiKuesioner, TesKuesioner } from "./bca/kuesioner";
import * as kuesioner from "./bca/kuesioner";

export default function App() {
  const [s, dispatch] = useReducer(sesiReducer, sesiAwal);
  const { layar, soal, indeks, pilihan, paket } = s;

  // Section BCA Finance punya sesi sendiri yang disimpan ke localStorage.
  const [bca, setBca] = useState<SesiBca | null>(muatSesi);
  const [bcaAktif, setBcaAktif] = useState(false);
  const [statusSimpan, setStatusSimpan] = useState<{ ok: boolean; pada: number } | null>(null);
  useEffect(() => {
    const ok = simpanSesi(bca);
    if (bca) setStatusSimpan({ ok, pada: Date.now() });
  }, [bca]);
  const [navBuka, setNavBuka] = useState(false);

  // Section Analogi Gambar: soal dibuat generator, sesinya juga disimpan ke localStorage.
  const [analogi, setAnalogi] = useState<SesiAnalogi | null>(sesiAnalogi.muatSesi);
  const [analogiLayar, setAnalogiLayar] = useState<null | "sesi" | { petunjuk: ModeAnalogi }>(null);
  const [simpanAnalogi, setSimpanAnalogi] = useState<{ ok: boolean; pada: number } | null>(null);
  useEffect(() => {
    const ok = sesiAnalogi.simpanSesi(analogi);
    if (analogi) setSimpanAnalogi({ ok, pada: Date.now() });
  }, [analogi]);
  const ubahAnalogi = useCallback((f: (x: SesiAnalogi) => SesiAnalogi) => setAnalogi((x) => (x ? f(x) : x)), []);
  const gantiAnalogi = useCallback((x: SesiAnalogi) => setAnalogi(x), []);
  const keMenuDariAnalogi = useCallback(() => setAnalogiLayar(null), []);

  const mulaiAnalogi = (mode: ModeAnalogi) => {
    if (analogi && !analogi.selesai && analogi.pilihan.some((p) => p !== null)) {
      const pesan = "Ada sesi Analogi Gambar yang belum selesai beserta jawabannya.\n\n" +
        "Mulai sesi baru dan hapus jawaban tersimpan itu?";
      if (!window.confirm(pesan)) return;
    }
    setAnalogiLayar({ petunjuk: mode });
  };

  // Psikotes BCA tanpa skor (PAPI Kostik, CBI): satu sesi tersimpan per tes.
  const [kq, setKq] = useState<Record<TesKuesioner, SesiKuesioner | null>>(() => ({
    papi: kuesioner.muatSesi("papi"),
    cbi: kuesioner.muatSesi("cbi"),
  }));
  const [kqLayar, setKqLayar] = useState<null | { tes: TesKuesioner; petunjuk: boolean }>(null);
  const [simpanKq, setSimpanKq] = useState<{ ok: boolean; pada: number } | null>(null);
  useEffect(() => {
    const ok = kuesioner.simpanSesi("papi", kq.papi) && kuesioner.simpanSesi("cbi", kq.cbi);
    if (kq.papi || kq.cbi) setSimpanKq({ ok, pada: Date.now() });
  }, [kq]);
  const tesAktif = kqLayar?.tes ?? "papi";
  const kqLayarRef = useRef(kqLayar);
  kqLayarRef.current = kqLayar;
  const ubahKq = useCallback((f: (x: SesiKuesioner) => SesiKuesioner) => {
    setKq((semua) => {
      const tes = kqLayarRef.current?.tes;
      if (!tes || !semua[tes]) return semua;
      return { ...semua, [tes]: f(semua[tes]!) };
    });
  }, []);
  const keMenuDariKq = useCallback(() => setKqLayar(null), []);

  const mulaiKuesioner = (tes: TesKuesioner) => {
    const t = kq[tes];
    if (t && !t.selesai && t.jawaban.some((j) => j !== null)) {
      const pesan = "Ada sesi " + kuesioner.INFO_TES[tes].nama + " yang belum selesai beserta jawabannya.\n\n" +
        "Mulai sesi baru dan hapus jawaban tersimpan itu?";
      if (!window.confirm(pesan)) return;
    }
    setKqLayar({ tes, petunjuk: true });
  };

  const ubahBca = useCallback((f: (x: SesiBca) => SesiBca) => setBca((x) => (x ? f(x) : x)), []);
  const gantiBca = useCallback((x: SesiBca) => setBca(x), []);
  const keMenuDariBca = useCallback(() => setBcaAktif(false), []);

  const mulaiBca = (mode: ModeBca) => {
    if (bca && !bca.selesai && Object.values(bca.jawaban).some((t) => t.trim())) {
      const pesan = "Ada sesi BCA Finance yang belum selesai beserta jawabannya.\n\n" +
        "Mulai sesi baru dan hapus jawaban tersimpan itu?";
      if (!window.confirm(pesan)) return;
    }
    setBca(sesiBaru(mode));
    setBcaAktif(true);
  };

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

  if (kqLayar && !kqLayar.petunjuk && kq[kqLayar.tes]) {
    return (
      <Kuesioner
        sesi={kq[kqLayar.tes]!}
        onUbah={ubahKq}
        onUlangi={() => setKqLayar({ tes: kqLayar.tes, petunjuk: true })}
        onMenu={keMenuDariKq}
        statusSimpan={simpanKq}
      />
    );
  }
  if (kqLayar && kqLayar.petunjuk) {
    return (
      <div className="app mode-latihan">
        <main className="halaman">
          <Kop eyebrow="BCA Finance · Petunjuk" judul={kuesioner.INFO_TES[tesAktif].nama} skor={null} />
          <PetunjukKuesioner
            tes={tesAktif}
            onMulai={(batas) => {
              setKq((semua) => ({ ...semua, [tesAktif]: kuesioner.sesiBaru(tesAktif, batas) }));
              setKqLayar({ tes: tesAktif, petunjuk: false });
            }}
            onMenu={keMenuDariKq}
          />
        </main>
      </div>
    );
  }

  if (analogiLayar === "sesi" && analogi) {
    return <AnalogiGambar sesi={analogi} onUbah={ubahAnalogi} onGanti={gantiAnalogi} onMenu={keMenuDariAnalogi} statusSimpan={simpanAnalogi} />;
  }
  if (analogiLayar && analogiLayar !== "sesi") {
    const mode = analogiLayar.petunjuk;
    return (
      <div className="app mode-latihan">
        <main className="halaman">
          <Kop eyebrow={"Petunjuk · " + sesiAnalogi.namaMode(mode)} judul={sesiAnalogi.modeTiu5(mode) ? "TIU 5 · Analogi Gambar" : "Analogi Gambar"} skor={null} />
          <PetunjukAnalogi
            mode={mode}
            onMulai={() => { setAnalogi(sesiAnalogi.sesiBaru(mode)); setAnalogiLayar("sesi"); }}
            onMenu={keMenuDariAnalogi}
          />
        </main>
      </div>
    );
  }

  if (bcaAktif && bca) {
    return <BcaFinance sesi={bca} onUbah={ubahBca} onGanti={gantiBca} onMenu={keMenuDariBca} statusSimpan={statusSimpan} />;
  }

  const pilihNomor = (i: number) => {
    keSoal(i);
    setNavBuka(false);
  };

  let kop;
  switch (layar) {
    case "menu":
      kop = <Kop eyebrow="Tes Potensi Akademik" judul="Latihan Soal" skor={null} />;
      break;
    case "latihan":
      kop = <Kop eyebrow="Mode latihan" judul="Latihan Soal" skor={s.benar + "/" + s.dijawab} />;
      break;
    case "hasil-latihan":
      kop = <Kop eyebrow="Hasil latihan" judul="Latihan Soal" skor={s.benar + "/" + soal.length} />;
      break;
    case "ujian":
      kop = null;
      break;
    case "hasil-ujian":
      kop = <Kop eyebrow="Hasil ujian" judul={paket!.section} skor={s.benar + "/" + soal.length} />;
      break;
  }

  return (
    <div className={"app" + (layar === "ujian" ? " tenang" : " mode-latihan")}>
      {layar === "ujian" && (
        <KopUjian
          label={"Soal " + pad(indeks + 1) + "/" + pad(soal.length)}
          sub={paket!.section}
          sisaDetik={s.sisaDetik}
          navigator={{ terisi: pilihan.filter((p) => p !== null).length, total: soal.length, onBuka: () => setNavBuka(true) }}
        />
      )}

      <main className={"halaman" + (layar === "menu" ? " menu" : "")}>
        {kop}

        {layar === "menu" && (
          <Menu
            bank={bankSoal}
            paket={PAKET}
            onLatihan={mulaiLatihan}
            onUjian={mulaiUjian}
            bcaTersimpan={bca}
            onBca={mulaiBca}
            onLanjutBca={() => setBcaAktif(true)}
            analogiTersimpan={analogi}
            onAnalogi={mulaiAnalogi}
            onLanjutAnalogi={() => setAnalogiLayar("sesi")}
            kuesionerTersimpan={kq}
            onKuesioner={mulaiKuesioner}
            onLanjutKuesioner={(tes) => setKqLayar({ tes, petunjuk: false })}
          />
        )}

        {diSoal && (
          <div>
            <div className="transisi-soal" key={s.nomorSesi + "-" + indeks}>
              <LembarSoal
                soal={soal[indeks]}
                indeks={indeks}
                total={soal.length}
                pilihan={pilihan[indeks]}
                latihan={layar === "latihan"}
                onJawab={jawab}
              />
            </div>
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
                <div className="kartu nav-inline">
                  <Navigator pilihan={pilihan} indeks={indeks} onPilih={keSoal} />
                </div>
                <Sheet buka={navBuka} judul="Navigator soal" onTutup={() => setNavBuka(false)}>
                  <Navigator pilihan={pilihan} indeks={indeks} onPilih={pilihNomor} />
                  <div className="tema-di-sheet"><span>Tema</span><TemaToggle /></div>
                </Sheet>
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
      </main>
    </div>
  );
}
