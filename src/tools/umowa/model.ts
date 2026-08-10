/**
 * Model danych narzędzia „Żywa umowa relacyjna" (#8).
 *
 * Edytowalny, wersjonowany dokument ustaleń — bez narzuconej hierarchii/weta. Domyślnie
 * PROWADZI (menu komponentów z neutralną skalą), z opcją TRYBU WOLNEGO (proza). Jeden profil
 * = jedna relacja/osoba partnerska z własną historią wersji. Dane lokalnie (bez konta, offline).
 * Inspiracja: RA Smorgasbord. Awans z prototypu `src/prototypes/umowa` (wariant D).
 */

/** Neutralna skala wyboru per pozycja (bez hierarchii/weta). '' = nieokreślone. */
export type Poziom = '' | 'tak' | 'moze' | 'przyszlosc' | 'nie' | 'granica'

export const POZIOMY: { value: Exclude<Poziom, ''>; label: string }[] = [
  { value: 'tak', label: 'Tak' },
  { value: 'moze', label: 'Może' },
  { value: 'przyszlosc', label: 'W przyszłości' },
  { value: 'nie', label: 'Nie' },
  { value: 'granica', label: 'Granica' },
]

export function poziomLabel(p: Poziom): string {
  return POZIOMY.find((x) => x.value === p)?.label ?? ''
}

/** Pozycja menu (komponent relacji) z wybranym poziomem i notką. */
export interface MenuItem {
  id: string
  kategoria: string
  label: string
  poziom: Poziom
  note: string
}

/** Wolna sekcja tekstowa (tryb wolny). */
export interface Sekcja {
  id: string
  title: string
  body: string
}

/** Datowany snapshot treści umowy (menu + sekcje) — „historia zmian". */
export interface Wersja {
  id: string
  date: string
  label: string
  snapshot: { items: MenuItem[]; sections: Sekcja[] }
}

/** Dokument jednego profilu (jednej relacji). */
export interface UmowaDoc {
  version: 1
  meta: { osoba: string; notatka: string }
  items: MenuItem[]
  sections: Sekcja[]
  wersje: Wersja[]
}

/** Kategorie z RA Smorgasbord (neutralnie, po polsku). */
export const KATEGORIE = [
  'Komunikacja',
  'Bliskość emocjonalna',
  'Bliskość fizyczna (dotyk)',
  'Seks',
  'Romantyzm i randki',
  'Czułość publiczna (PDA)',
  'Towarzystwo i wspólne aktywności',
  'Dom i wspólne życie',
  'Kink / władza i uległość',
  'Opieka i zdrowie',
  'Finanse',
  'Rodzina i osoby zależne',
  'Zobowiązanie i przyszłość',
  'Współpraca i projekty',
  'Etykiety i jak się nazywamy',
  'Duchowość',
  'Czynniki zewnętrzne (refleksja)',
]

/** Seed menu — przykładowe pozycje w kategoriach; można dopisywać własne. */
export const SMORGASBORD: { kategoria: string; pozycje: string[] }[] = [
  { kategoria: 'Komunikacja', pozycje: ['Codzienny kontakt (wiadomości)', 'Regularne rozmowy o relacji (check-in)', 'Dzielenie się trudnymi emocjami'] },
  { kategoria: 'Bliskość emocjonalna', pozycje: ['Zwierzanie się z ważnych spraw', 'Wsparcie w kryzysie', 'Wzajemne powierzanie sekretów'] },
  { kategoria: 'Bliskość fizyczna (dotyk)', pozycje: ['Przytulanie', 'Trzymanie za rękę', 'Całowanie', 'Wspólne spanie', 'Masaż'] },
  { kategoria: 'Seks', pozycje: ['Seks', 'Rozmowy o fantazjach', 'Ustalenia o bezpieczniejszym seksie'] },
  { kategoria: 'Romantyzm i randki', pozycje: ['Randki', 'Romantyczne gesty', 'Świętowanie rocznic'] },
  { kategoria: 'Czułość publiczna (PDA)', pozycje: ['Trzymanie się za ręce przy ludziach', 'Pocałunki publicznie'] },
  { kategoria: 'Towarzystwo i wspólne aktywności', pozycje: ['Wspólne hobby', 'Wyjścia i wydarzenia', 'Rozmowy intelektualne'] },
  { kategoria: 'Dom i wspólne życie', pozycje: ['Wspólne mieszkanie', 'Obowiązki domowe', 'Wspólne posiłki'] },
  { kategoria: 'Kink / władza i uległość', pozycje: ['Praktyki BDSM', 'Dynamika D/s', 'Zabawa w role'] },
  { kategoria: 'Opieka i zdrowie', pozycje: ['Opieka w chorobie', 'Dostępność w nagłych sytuacjach', 'Wsparcie zdrowotne'] },
  { kategoria: 'Finanse', pozycje: ['Wspólne wydatki', 'Wsparcie finansowe', 'Wspólny budżet'] },
  { kategoria: 'Rodzina i osoby zależne', pozycje: ['Wspólne wychowywanie dzieci', 'Opieka nad zwierzętami', 'Poznanie rodziny'] },
  { kategoria: 'Zobowiązanie i przyszłość', pozycje: ['Wspólne plany na przyszłość', 'Poziom zobowiązania', 'Ustalenia o wyłączności'] },
  { kategoria: 'Współpraca i projekty', pozycje: ['Wspólne projekty i cele'] },
  { kategoria: 'Etykiety i jak się nazywamy', pozycje: ['Jak się przedstawiamy', 'Etykiety relacji'] },
  { kategoria: 'Duchowość', pozycje: ['Wspólne praktyki duchowe/religijne'] },
  { kategoria: 'Czynniki zewnętrzne (refleksja)', pozycje: ['Jak wpływa na nas otoczenie i normy', 'Coming out i bezpieczeństwo'] },
]

function id(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/** Świeże pozycje menu z seedu (poziom nieokreślony). */
export function seedItems(): MenuItem[] {
  const items: MenuItem[] = []
  for (const grupa of SMORGASBORD) {
    for (const label of grupa.pozycje) {
      items.push({ id: id(), kategoria: grupa.kategoria, label, poziom: '', note: '' })
    }
  }
  return items
}

export function emptyUmowaDoc(): UmowaDoc {
  return {
    version: 1,
    meta: { osoba: '', notatka: '' },
    items: seedItems(),
    sections: [],
    wersje: [],
  }
}

/** Uzupełnia brakujące pola wczytanego dokumentu (migracja bez podbijania wersji). */
export function normalizeUmowaDoc(doc: UmowaDoc): UmowaDoc {
  return {
    version: 1,
    meta: { osoba: doc?.meta?.osoba ?? '', notatka: doc?.meta?.notatka ?? '' },
    items: Array.isArray(doc?.items) && doc.items.length ? doc.items : seedItems(),
    sections: Array.isArray(doc?.sections) ? doc.sections : [],
    wersje: Array.isArray(doc?.wersje) ? doc.wersje : [],
  }
}

/** Uporządkowane kategorie występujące w pozycjach (wg KATEGORIE, potem dodatkowe). */
export function kategorieDoc(items: MenuItem[]): string[] {
  return [
    ...KATEGORIE.filter((k) => items.some((it) => it.kategoria === k)),
    ...[...new Set(items.map((it) => it.kategoria))].filter((k) => !KATEGORIE.includes(k)),
  ]
}
