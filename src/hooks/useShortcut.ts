import { useEffect, useRef } from "react";
import type { Sesi } from "../sesi";
import { HURUF } from "../lib/util";

interface Handler {
  jawab: (i: number) => void;
  lanjut: () => void;
  keSoal: (i: number) => void;
}

// Shortcut: A–F / 1–6 menjawab, Enter lanjut (latihan), ←/→/Enter pindah soal (ujian).
export function useShortcut(sesi: Sesi, h: Handler): void {
  const ref = useRef({ sesi, h });
  ref.current = { sesi, h };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const { sesi: s, h } = ref.current;
      if (s.layar !== "latihan" && s.layar !== "ujian") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      // jangan menjawab soal di belakang sheet/dialog yang sedang terbuka
      if (document.querySelector('[aria-modal="true"]')) return;

      const diTombol = e.target instanceof HTMLElement && e.target.tagName === "BUTTON";
      if (diTombol && (e.key === "Enter" || e.key === " ")) return;

      const terjawab = s.pilihan[s.indeks] !== null;
      if (s.layar === "ujian") {
        if (e.key === "ArrowLeft") { e.preventDefault(); h.keSoal(s.indeks - 1); return; }
        if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); h.keSoal(s.indeks + 1); return; }
      } else {
        if (e.key === "Enter" && terjawab) { e.preventDefault(); h.lanjut(); return; }
        if (terjawab) return;
      }

      const k = e.key.length === 1 ? e.key.toUpperCase() : "";
      let i = k ? HURUF.indexOf(k) : -1;
      if (i === -1 && k) i = "123456".indexOf(k);
      if (i > -1 && i < s.soal[s.indeks].options.length) { e.preventDefault(); h.jawab(i); }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
}
