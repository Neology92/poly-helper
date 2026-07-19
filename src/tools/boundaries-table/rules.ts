import type { BoundaryDocument, CheckboxAnswer, ItemAnswer } from '../../data'

/**
 * Reguły warunkowe formularza (jedno źródło prawdy dla stanu i UI).
 *
 * Zależności w wierszu:
 *  - DON'T TELL wyklucza i czyści resztę.
 *  - „mówienie" (może się wydarzyć / wydarzyło się) dostępne, gdy nie ma DON'T TELL.
 *  - „must say" dostępne tylko, gdy zaznaczono ≥1 opcję mówienia.
 *  - „poziom szczegółu" dostępny tylko przy mówieniu — i wtedy WYMAGANY.
 */

export interface RowFlags {
  /** Zaznaczono co najmniej jedną opcję mówienia. */
  telling: boolean
  /** DON'T TELL aktywne — reszta zablokowana. */
  lockedByDontTell: boolean
  canTell: boolean
  canMustSay: boolean
  canDetail: boolean
  /** Mówienie włączone, a poziom szczegółu jeszcze nie wybrany. */
  detailRequired: boolean
}

export function rowFlags(a: CheckboxAnswer): RowFlags {
  const dontTell = a.dontTell
  const telling = a.headsUp || a.afterFact
  return {
    telling,
    lockedByDontTell: dontTell,
    canTell: !dontTell,
    canMustSay: telling && !dontTell,
    canDetail: telling && !dontTell,
    detailRequired: telling && !dontTell && a.detail === 'unset',
  }
}

/**
 * Sprowadza odpowiedź do stanu spójnego z regułami (siatka bezpieczeństwa — UI i tak
 * blokuje niedozwolone akcje, ale to gwarantuje, że zapis nigdy nie jest niespójny).
 */
export function normalizeAnswer(a: CheckboxAnswer): CheckboxAnswer {
  if (a.dontTell) {
    return { mustSay: false, dontTell: true, headsUp: false, afterFact: false, detail: 'unset' }
  }
  const telling = a.headsUp || a.afterFact
  return {
    ...a,
    mustSay: telling ? a.mustSay : false,
    detail: telling ? a.detail : 'unset',
  }
}

/** Normalizuje wszystkie odpowiedzi w dokumencie (migracja starszych, niespójnych zapisów). */
export function normalizeDocument(doc: BoundaryDocument): BoundaryDocument {
  const answers: Record<number, ItemAnswer> = {}
  for (const [key, a] of Object.entries(doc.answers)) {
    answers[Number(key)] = 'text' in a ? a : normalizeAnswer(a)
  }
  return {
    ...doc,
    answers,
    customRows: doc.customRows.map((r) => ({ ...r, answer: normalizeAnswer(r.answer) })),
    deselected: Array.isArray(doc.deselected) ? doc.deselected : [],
  }
}
