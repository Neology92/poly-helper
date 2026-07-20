/**
 * Model danych narzędzia „Check-in relacyjny".
 *
 * Struktura inspirowana Multiamory RADAR (regularny, zapisywany check-in) i Triforce of
 * Communication (najpierw nazwij cel rozmowy). Jeden profil = jedna osoba partnerska z całą
 * historią wpisów. Dane lokalnie (bez konta, offline). Bez gamifikacji — historia to zwykła
 * lista z datami, żadnych streaków/wyników.
 */

/** Opcjonalny „cel rozmowy" (Triforce) — nazwany zanim zacznie się rozmowa. */
export type TriforceCel = '' | 'wysluchanie' | 'wsparcie' | 'rozwiazanie'

/** Pojedynczy check-in. Pola tekstowe (RADAR) + opcjonalny cel i następna randka. */
export interface CheckinEntry {
  id: string
  /** Data zapisu (YYYY-MM-DD) — stemplowana przy „Zapisz check-in". */
  date: string
  cel: TriforceCel
  /** Radość / co działa. */
  radosc: string
  /** Uznanie / wdzięczność. */
  uznanie: string
  /** Do poprawy / co uwiera. */
  doPoprawy: string
  /** Ustalenia / akcje. */
  ustalenia: string
  /** Następna randka — data lub notatka (opcjonalne). */
  nastepnaRandka: string
}

/** Dokument jednego profilu: nagłówek + bieżący szkic + historia zapisanych wpisów. */
export interface CheckinDoc {
  version: 1
  meta: { osoba: string; notatka: string }
  /** Bieżący, jeszcze niezapisany check-in (autozapis). */
  draft: CheckinEntry
  /** Historia — najnowszy pierwszy. */
  entries: CheckinEntry[]
}

/** Pola RADAR w kolejności prezentacji (klucz + etykieta + podpowiedź). */
export const RADAR_FIELDS = [
  {
    key: 'radosc',
    label: 'Radość / co działa',
    hint: 'Co ostatnio było dobre między wami? Co cieszy, za co jesteś wdzięcznx?',
  },
  {
    key: 'uznanie',
    label: 'Uznanie / wdzięczność',
    hint: 'Coś, co osoba partnerska zrobiła, a Ty chcesz to docenić na głos.',
  },
  {
    key: 'doPoprawy',
    label: 'Do poprawy / co uwiera',
    hint: 'Co zgrzyta? Bez oskarżeń — nazwij potrzebę, nie winnx.',
  },
  {
    key: 'ustalenia',
    label: 'Ustalenia / akcje',
    hint: 'Konkrety: co robimy dalej, kto, do kiedy. Można renegocjować przy kolejnym check-inie.',
  },
] as const

export type RadarKey = (typeof RADAR_FIELDS)[number]['key']

/** Opcje „celu rozmowy" (Triforce) — łagodny prompt na start. */
export const TRIFORCE_OPTIONS: { value: Exclude<TriforceCel, ''>; label: string }[] = [
  { value: 'wysluchanie', label: 'Chcę być wysłuchanx' },
  { value: 'wsparcie', label: 'Chcę wsparcia / świętowania' },
  { value: 'rozwiazanie', label: 'Chcę rozwiązać problem' },
]

export function emptyEntry(): CheckinEntry {
  return {
    id: '',
    date: '',
    cel: '',
    radosc: '',
    uznanie: '',
    doPoprawy: '',
    ustalenia: '',
    nastepnaRandka: '',
  }
}

export function emptyCheckinDoc(): CheckinDoc {
  return {
    version: 1,
    meta: { osoba: '', notatka: '' },
    draft: emptyEntry(),
    entries: [],
  }
}

/** Czy szkic ma jakąkolwiek treść (żeby nie zapisywać pustych wpisów). */
export function draftHasContent(d: CheckinEntry): boolean {
  return Boolean(
    d.radosc.trim() ||
      d.uznanie.trim() ||
      d.doPoprawy.trim() ||
      d.ustalenia.trim() ||
      d.nastepnaRandka.trim(),
  )
}

/** Uzupełnia brakujące pola wczytanego dokumentu (migracja bez podbijania wersji). */
export function normalizeCheckinDoc(doc: CheckinDoc): CheckinDoc {
  const base = emptyEntry()
  const fixEntry = (e: Partial<CheckinEntry> | undefined): CheckinEntry => ({
    ...base,
    ...e,
    id: e?.id || '',
    date: e?.date || '',
  })
  return {
    version: 1,
    meta: {
      osoba: doc?.meta?.osoba ?? '',
      notatka: doc?.meta?.notatka ?? '',
    },
    draft: fixEntry(doc?.draft),
    entries: Array.isArray(doc?.entries) ? doc.entries.map(fixEntry) : [],
  }
}
