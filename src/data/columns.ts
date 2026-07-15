/**
 * Metadane kolumn tabeli granic informowania (dump §3.1 + decyzje designerskie §6).
 * Używane zarówno przez interaktywną tabelę, jak i eksport do PDF — jedno źródło etykiet
 * i semantyki, żeby wersja online i drukowana się nie rozjechały.
 */

/** Token akcentu z palety (patrz tokens.css). */
export type Accent = 'amber' | 'teal' | 'mauve' | 'ink'

export interface ColumnDef {
  key: string
  /** Nagłówek kolumny. */
  label: string
  /** Krótki opis/semantyka (tooltip, legenda). */
  hint?: string
  /** Znak do zamalowania długopisem (dla kolumn-markerów). */
  glyph?: string
  /** Sugerowane opacity znaku do zamalowania (0–1) — z decyzji designerskich. */
  glyphOpacity?: number
  /** Akcent kolorystyczny. */
  accent?: Accent
}

/**
 * Kolumny w kolejności od lewej. „DON'T TELL" celowo za tytułem czynności
 * (bliżej środka tabeli — decyzja użytkownika, §6).
 */
export const columns: Record<string, ColumnDef> = {
  mustSay: {
    key: 'mustSay',
    label: 'must say',
    hint: 'Rzeczy, o których informować bezwzględnie.',
    glyph: '!',
    glyphOpacity: 0.09,
    accent: 'ink',
  },
  number: {
    key: 'number',
    label: '#',
    hint: 'Numer pozycji (spójny z odnośnikami na kartach).',
  },
  name: {
    key: 'name',
    label: 'Czynność',
  },
  dontTell: {
    key: 'dontTell',
    label: "DON'T TELL",
    hint: 'Twarde „nie mów mi o tym".',
    glyph: '✕',
    glyphOpacity: 0.11,
    accent: 'ink',
  },
  headsUp: {
    key: 'headsUp',
    label: 'Gdy myślę, że może się wydarzyć',
    hint: 'Uprzedzenie z wyprzedzeniem (heads-up).',
    accent: 'amber',
  },
  afterFact: {
    key: 'afterFact',
    label: 'Gdy się wydarzyło',
    hint: 'Informacja po fakcie.',
    accent: 'teal',
  },
  detail: {
    key: 'detail',
    label: 'Poziom szczegółu',
    hint: 'Jak szczegółowo: ogólnie czy ze szczegółami.',
    accent: 'mauve',
  },
}

/** Etykiety dwóch opcji poziomu szczegółu (□ ogólnie / szczegóły □). */
export const DETAIL_LABELS = {
  ogolnie: 'ogólnie',
  szczegoly: 'szczegóły',
} as const

/** Nagłówek egzemplarza tabeli (dump §3.1). */
export const copyHeaderFields = {
  osobaInformowana: 'Osoba informowana',
  data: 'Data',
  notatka: 'Notatka / kontekst',
} as const
