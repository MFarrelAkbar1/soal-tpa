import { useId } from "react";
import type { Gambar, Primitif } from "../../analogi/gambar";
import { deskripsi, primitif } from "../../analogi/gambar";

// Satu gambar Analogi Gambar sebagai SVG inline. Warnanya dari token --fig-ink di atas alas
// --img-plate (selalu terang), jadi tetap terbaca di mode gelap.
export function Figur({ g, label }: { g: Gambar; label?: string }) {
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
