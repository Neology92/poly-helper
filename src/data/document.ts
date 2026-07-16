import type { BoundaryItem } from './types'
import { items } from './items'

/**
 * STAN (dokument) — dane wypełnione przez użytkownika dla JEDNEJ „Osoby informowanej".
 * Jeden dokument = jeden egzemplarz tabeli. Zapisywany lokalnie (bez konta, offline).
 */

/** Poziom szczegółu wybrany w wierszu (dwa checkboxy □ ogólnie / szczegóły □). */
export type DetailLevel = 'unset' | 'ogolnie' | 'szczegoly'

/** Odpowiedź dla zwykłej pozycji (kind: 'checkbox'). */
export interface CheckboxAnswer {
  mustSay: boolean
  dontTell: boolean
  /** „Gdy myślę, że może się wydarzyć" (heads-up). */
  headsUp: boolean
  /** „Gdy się wydarzyło" (po fakcie). */
  afterFact: boolean
  detail: DetailLevel
}

/** Odpowiedź dla pozycji „do wypisania/ustalenia" (kind: 'field' — poz. 12/21/22). */
export interface FieldAnswer {
  text: string
}

export type ItemAnswer = CheckboxAnswer | FieldAnswer

/** Własna pozycja dopisana przez użytkownika (puste wiersze tabeli). */
export interface CustomRow {
  id: string
  name: string
  answer: CheckboxAnswer
}

/** Nagłówek egzemplarza. */
export interface DocumentMeta {
  osobaInformowana: string
  data: string
  notatka: string
}

/** Kompletny zapisany dokument. `version` na potrzeby przyszłych migracji. */
export interface BoundaryDocument {
  version: 1
  meta: DocumentMeta
  /** Odpowiedzi wg numeru pozycji (item.number). */
  answers: Record<number, ItemAnswer>
  customRows: CustomRow[]
}

export function emptyCheckboxAnswer(): CheckboxAnswer {
  return {
    mustSay: false,
    dontTell: false,
    headsUp: false,
    afterFact: false,
    detail: 'unset',
  }
}

export function emptyFieldAnswer(): FieldAnswer {
  return { text: '' }
}

/** Pusta odpowiedź dopasowana do rodzaju pozycji. */
export function emptyAnswerFor(item: BoundaryItem): ItemAnswer {
  return item.kind === 'field' ? emptyFieldAnswer() : emptyCheckboxAnswer()
}

/** Pusty dokument z odpowiedziami dla wszystkich kanonicznych pozycji. */
export function emptyDocument(): BoundaryDocument {
  const answers: Record<number, ItemAnswer> = {}
  for (const item of items) {
    answers[item.number] = emptyAnswerFor(item)
  }
  return {
    version: 1,
    meta: { osobaInformowana: '', data: '', notatka: '' },
    answers,
    customRows: [],
  }
}

/** Zawężenie typu odpowiedzi po rodzaju pozycji. */
export function isFieldAnswer(answer: ItemAnswer): answer is FieldAnswer {
  return 'text' in answer
}
