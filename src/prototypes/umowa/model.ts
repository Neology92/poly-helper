/**
 * Model danych PROTOTYPU „Żywej umowy relacyjnej" (#8).
 *
 * To spike/koncept — trzy warianty (A/B/C) na ukrytej podstronie, do wyboru kierunku.
 * Bez profili, bez PDF (dodamy, gdy wybierzemy kierunek). Inspiracja: RA Smorgasbord
 * („bufet komponentów relacji", bez narzuconej hierarchii/weta). Wszystko lokalnie.
 */

import { newId } from '../../lib/copies'

/** Neutralna skala wyboru per pozycja (bez hierarchii/weta). '' = nieokreślone. */
export type Poziom = '' | 'tak' | 'moze' | 'przyszlosc' | 'nie' | 'granica'

export const POZIOMY: { value: Exclude<Poziom, ''>; label: string }[] = [
  { value: 'tak', label: 'Tak' },
  { value: 'moze', label: 'Może' },
  { value: 'przyszlosc', label: 'W przyszłości' },
  { value: 'nie', label: 'Nie' },
  { value: 'granica', label: 'Granica' },
]

/** Datowany snapshot całej treści wariantu — „historia zmian" (umowa jest żywa/wersjonowana). */
export interface Version<T> {
  id: string
  date: string
  label: string
  snapshot: T
}

/** Kategorie z RA Smorgasbord (neutralnie, po polsku) — bufet dla wariantów A i C, grupy w B. */
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

/** Przykładowe pozycje w kategoriach (seed menu w wariancie B; można dopisywać własne). */
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

// ---------------------------------------------------------------------------
// Wariant A — sekcje z wolnym tekstem (dokument)
// ---------------------------------------------------------------------------
export interface SectionA {
  id: string
  title: string
  body: string
}
export interface DocA {
  sections: SectionA[]
  versions: Version<SectionA[]>[]
}

export function emptyDocA(): DocA {
  return {
    sections: [
      { id: newId(), title: 'Komunikacja', body: '' },
      { id: newId(), title: 'Czas i granice', body: '' },
    ],
    versions: [],
  }
}

// ---------------------------------------------------------------------------
// Wariant B — menu smorgasbord (pozycje × poziom + notka)
// ---------------------------------------------------------------------------
export interface ItemB {
  id: string
  kategoria: string
  label: string
  poziom: Poziom
  note: string
}
export interface DocB {
  items: ItemB[]
  versions: Version<ItemB[]>[]
}

export function emptyDocB(): DocB {
  const items: ItemB[] = []
  for (const grupa of SMORGASBORD) {
    for (const label of grupa.pozycje) {
      items.push({ id: newId(), kategoria: grupa.kategoria, label, poziom: '', note: '' })
    }
  }
  return { items, versions: [] }
}

// ---------------------------------------------------------------------------
// Wariant C — hybryda (sekcje zawierające pozycje-ustalenia)
// ---------------------------------------------------------------------------
export interface ItemC {
  id: string
  text: string
  poziom: Poziom
  note: string
}
export interface SectionC {
  id: string
  title: string
  items: ItemC[]
}
export interface DocC {
  sections: SectionC[]
  versions: Version<SectionC[]>[]
}

function itemC(text: string): ItemC {
  return { id: newId(), text, poziom: '', note: '' }
}

export function emptyDocC(): DocC {
  return {
    sections: [
      {
        id: newId(),
        title: 'Bliskość fizyczna (dotyk)',
        items: [itemC('Przytulanie'), itemC('Całowanie'), itemC('Wspólne spanie')],
      },
      {
        id: newId(),
        title: 'Dom i wspólne życie',
        items: [itemC('Wspólne posiłki'), itemC('Obowiązki domowe')],
      },
    ],
    versions: [],
  }
}

// ---------------------------------------------------------------------------
// Lekka normalizacja przy wczytaniu (odporność na częściowe dane w prototypie).
// ---------------------------------------------------------------------------
export function normDocA(raw: unknown): DocA {
  const d = (raw ?? {}) as Partial<DocA>
  return {
    sections: Array.isArray(d.sections) ? d.sections : emptyDocA().sections,
    versions: Array.isArray(d.versions) ? d.versions : [],
  }
}
export function normDocB(raw: unknown): DocB {
  const d = (raw ?? {}) as Partial<DocB>
  return {
    items: Array.isArray(d.items) && d.items.length ? d.items : emptyDocB().items,
    versions: Array.isArray(d.versions) ? d.versions : [],
  }
}
export function normDocC(raw: unknown): DocC {
  const d = (raw ?? {}) as Partial<DocC>
  return {
    sections: Array.isArray(d.sections) ? d.sections : emptyDocC().sections,
    versions: Array.isArray(d.versions) ? d.versions : [],
  }
}

/** Etykieta poziomu (do widoku/historii). */
export function poziomLabel(p: Poziom): string {
  return POZIOMY.find((x) => x.value === p)?.label ?? ''
}
