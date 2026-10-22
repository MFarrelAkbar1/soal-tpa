import type { Kasus, SoalEsai } from "../types";
import { kasusPdp, soalPdp } from "./pdp";
import { kasusAsr, soalAsr } from "./asr";
import { kasusPresentasi, soalPresentasi } from "./presentasi";

// Urutan Mode Latihan: PDP umum, studi kasus sulit, ASR, presentasi, data cabang.
export const kasusBca: Kasus[] = [...kasusPdp, ...kasusAsr, ...kasusPresentasi];
export const soalBca: SoalEsai[] = [...soalPdp, ...soalAsr, ...soalPresentasi];

const indeksKasus = new Map(kasusBca.map((k) => [k.id, k]));

export function cariKasus(id: string): Kasus {
  const k = indeksKasus.get(id);
  if (!k) throw new Error("Kasus tidak ditemukan: " + id);
  return k;
}

export function soalDariKasus(caseId: string): SoalEsai[] {
  return soalBca.filter((s) => s.caseId === caseId);
}
