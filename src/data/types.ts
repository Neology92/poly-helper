/**
 * Model danych — wspólny dla wszystkich narzędzi operujących na liście pozycji
 * (Tabela granic informowania oraz Gra karciana dzielą tę samą listę 25 pozycji).
 *
 * Rozróżniamy dwie warstwy:
 *   1. DEFINICJA (kanon) — statyczne pozycje i teksty kart. Źródło prawdy treści:
 *      `poly-helper-dump.md` (§3.2 nazwy pozycji, §5 teksty kart).
 *   2. STAN (dokument) — dane wpełnione przez użytkownika dla jednej „Osoby informowanej".
 *      Patrz `document.ts`.
 */

/** Placeholder podmieniany na pseudonim osoby z równoległej relacji. */
export const NAME_PLACEHOLDER = '[imię]'

/** Rodzaj wiersza w tabeli. */
export type ItemKind = 'checkbox' | 'field'

/** Treść karty-scenki do Gry karcianej. */
export interface CardText {
  /** Opis ogólny — wprost nazywa czynność (czytany jako pierwszy). */
  general: string
  /** Opis szczegółowy — kontekst i konkrety (czytany po zgodzie słuchającej osoby). */
  detail: string
  /** Wskazówka przy czytaniu karty, np. że [imię] = nowo poznana osoba. */
  readingNote?: string
}

/** Wspólne pola każdej pozycji. */
interface BaseItem {
  /** Numer pozycji (#) — spójny z odnośnikami na kartach. */
  number: number
  /** Nazwa czynności (kolumna „Czynność"). */
  name: string
  /** Doprecyzowanie znaczenia pozycji (mniejszą, kursywą pod nazwą). */
  clarification?: string
  /** Uwaga kontekstowa na poziomie wiersza tabeli (np. dot. [imię]). */
  note?: string
}

/** Zwykłe zdarzenie — wiersz z checkboxami i kartą-scenką. */
export interface CheckboxItem extends BaseItem {
  kind: 'checkbox'
  card: CardText
}

/**
 * Pozycja „do ustalenia/wypisania" (poz. 12, 21, 22) — zamiast checkboxów ma pole
 * tekstowe. Nie ma karty w talii.
 */
export interface FieldItem extends BaseItem {
  kind: 'field'
  /** Etykieta pola tekstowego (np. „Wypisz miejsca tylko dla was:"). */
  fieldPrompt: string
  /** Opcjonalne sugestie do szybkiego wpisania (chipy wstawiające tekst). */
  suggestions?: string[]
}

/** Kanoniczna pozycja listy. */
export type BoundaryItem = CheckboxItem | FieldItem

/** Zawężenie typu: czy pozycja ma kartę-scenkę. */
export function hasCard(item: BoundaryItem): item is CheckboxItem {
  return item.kind === 'checkbox'
}
