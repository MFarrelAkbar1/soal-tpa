import { useId } from "react";
import type { Gambar, Primitif } from "../../analogi/gambar";
import { deskripsi, primitif } from "../../analogi/gambar";
import type { Visual } from "../../analogi/tampil";
import type { JalurSvg } from "../../analogi/vektor";
import { srcGambar } from "../../lib/util";

// Satu gambar Analogi Gambar: SVG inline dari generator, PNG potongan PDF (soal asli TIU 5),
// atau SVG garis bebas (soal baru TIU 5).
// Keduanya diletakkan di alas --img-plate yang selalu terang, jadi tetap terbaca di mode gelap
// tanpa diinversi.
export function Figur({ g, label }: { g: Visual; label?: string }) {
  if ("src" in g) {
    return <img className="figur" src={srcGambar(g.src)} alt={label ?? ""} loading="lazy" draggable={false} />;
  }
  if ("jalur" in g) return <FigurJalur jalur={g.jalur} label={label} />;
  return <FigurSvg g={g} label={label} />;
}

function FigurSvg({ g, label }: { g: Gambar; label?: string }) {
  const id = "arsir-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const daftar = primitif(g);
  const adaArsir = daftar.some((p) => p.jenis !== "titik" && p.isi === "arsir");

  const kelasIsi = (p: Exclude<Primitif, { jenis: "titik" }>) =>
    "fg-bangun" + (p.isi === "hitam" ? " fg-hitam" : p.isi === "kosong" ? " fg-kosong" : "");

  return (
    <svg className="figur" viewBox="0 0 100 100" role="img" aria-label={(label ? label + ": " : "") + deskripsi(g)}>
      {adaArsir && (
        <defs>
          {/* pola arsir tetap terhadap layar, jadi tidak ikut berputar atau tercermin */}
          <pattern id={id} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line className="fg-arsir" x1="0" y1="0" x2="0" y2="6" />
          </pattern>
        </defs>
      )}
      {daftar.map((p, i) => {
        if (p.jenis === "titik") return <circle key={i} className="fg-titik" cx={p.cx} cy={p.cy} r="4" />;
        const isi = p.isi === "arsir" ? "url(#" + id + ")" : undefined;
        if (p.jenis === "lingkaran") {
          return <circle key={i} className={kelasIsi(p)} cx={p.cx} cy={p.cy} r={p.r} fill={isi} strokeWidth={p.garis} />;
        }
        return (
          <polygon
            key={i}
            className={kelasIsi(p)}
            points={p.titik.map(([x, y]) => x.toFixed(2) + "," + y.toFixed(2)).join(" ")}
            fill={isi}
            strokeWidth={p.garis}
          />
        );
      })}
    </svg>
  );
}

const KELAS_JALUR: Record<JalurSvg["isi"], string> = {
  tanpa: "fg-jalur",
  putih: "fg-jalur fg-kosong",
  hitam: "fg-jalur fg-hitam",
};

function FigurJalur({ jalur, label }: { jalur: JalurSvg[]; label?: string }) {
  return (
    <svg className="figur" viewBox="0 0 100 100" role="img" aria-label={label ?? "gambar"}>
      {jalur.map((j, i) => <path key={i} className={KELAS_JALUR[j.isi]} d={j.d} />)}
    </svg>
  );
}
