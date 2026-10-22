import type { Soal } from "../types";
import { gmaVerbal } from "./gma-verbal";
import { gmaNumerical } from "./gma-numerical";
import { smartAbility } from "./smart-ability";

// Urutan sama dengan bank soal lama: Verbal, Numerical, Smart Ability.
export const bankSoal: Soal[] = [...gmaVerbal, ...gmaNumerical, ...smartAbility];
