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
  /** Wolny tekst — kolumna „uwagi". */
  uwagi: string
}

/** Odpowiedź dla pozycji „do wypisania/ustalenia" (kind: 'field' — poz. 5/12/21/22). */
export interface FieldAnswer {
  text: string
  /** Wolny tekst — kolumna „uwagi". */
  uwagi: string
}

export type ItemAnswer = CheckboxAnswer | FieldAnswer

/**
 * Własna pozycja dopisana przez użytkownika. Może być typu 'checkbox' (jak zwykły wiersz)
 * albo 'field' (pole tekstowe). Oba pola stanu (`answer`, `text`) są zawsze obecne —
 * używane zależnie od `kind`.
 */
export interface CustomRow {
  id: string
  name: string
  kind: 'checkbox' | 'field'
  answer: CheckboxAnswer
  text: string
  uwagi: string
}

/** Nagłówek egzemplarza. */
export interface DocumentMeta {
  osobaInformowana: string
  data: string
  notatka: string
}

/** Kompletny zapisany dokument (jeden profil osoby partnerskiej). */
export interface BoundaryDocument {
  version: 1
  meta: DocumentMeta
  /** Odpowiedzi wg numeru pozycji (item.number). */
  answers: Record<number, ItemAnswer>
  customRows: CustomRow[]
  /**
   * Numery pozycji WYŁĄCZONYCH z bieżącego zakresu (checklista). Puste = wszystkie w zakresie.
   * Przechowujemy wykluczenia, nie zaznaczenia — dzięki temu nowe pozycje są domyślnie w zakresie
   * i nie trzeba migrować starszych zapisów.
   */
  deselected: number[]
}

export function emptyCheckboxAnswer(): CheckboxAnswer {
  return {
    mustSay: false,
    dontTell: false,
    headsUp: false,
    afterFact: false,
    detail: 'unset',
    uwagi: '',
  }
}

export function emptyFieldAnswer(): FieldAnswer {
  return { text: '', uwagi: '' }
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
    deselected: [],
  }
}

/** Zawężenie typu odpowiedzi po rodzaju pozycji. */
export function isFieldAnswer(answer: ItemAnswer): answer is FieldAnswer {
  return 'text' in answer
}
