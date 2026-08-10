/**
 * Słowniczek — WSPÓLNY model haseł (jedno źródło prawdy).
 *
 * Z tego korzysta strona `/w/slownik`; artykuły też mogą linkować do konkretnego hasła
 * (kotwica `#haslo-<slug>`), zamiast powielać definicje. Nośnik standaryzacji polskiego
 * nazewnictwa: hasło główne + warianty + status ustalenia. Werdykty i źródła:
 * `docs/research/polskie-nazewnictwo.md`.
 */

/** Status ustalenia terminu w polskim dyskursie. */
export type TermStatus = 'ustalone' | 'wschodzace' | 'nieustalone' | 'zwykle-en'

export const STATUS_LABEL: Record<TermStatus, string> = {
  ustalone: 'ustalone',
  wschodzace: 'wschodzące',
  nieustalone: 'nieustalone',
  'zwykle-en': 'zwykle po ang.',
}

export interface GlossaryTerm {
  /** Identyfikator do kotwicy (#haslo-<slug>) i linkowania z artykułów. */
  slug: string
  /** Hasło główne (preferowana forma PL). */
  headword: string
  /** Warianty / synonimy (PL i ang.). */
  variants?: string[]
  /** Odpowiednik angielski, jeśli pomocny. */
  en?: string
  /** Definicja PL (neutralna, inkluzywna). */
  definition: string
  status?: TermStatus
  /** Dodatkowa uwaga (np. czego unikać). */
  note?: string
}

/** Kanoniczna lista haseł. Kolejność dowolna — strona sortuje alfabetycznie. */
export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: 'poliamoria',
    headword: 'Poliamoria',
    en: 'polyamory',
    status: 'ustalone',
    definition:
      'Praktyka albo zdolność bycia w więcej niż jednej relacji intymnej naraz — za wiedzą i zgodą wszystkich zainteresowanych osób.',
  },
  {
    slug: 'osoba-poliamoryczna',
    headword: 'Osoba poliamoryczna',
    variants: ['poliamoryczny/-a', 'poliamorysta/-ka', 'poliamoryk/-yczka'],
    en: 'polyamorous',
    status: 'ustalone',
    definition: 'Osoba, która praktykuje poliamorię albo się z nią identyfikuje.',
  },
  {
    slug: 'etyczna-niemonogamia',
    headword: 'Etyczna niemonogamia (CNM/ENM)',
    variants: ['konsensualna niemonogamia', 'niemonogamia za zgodą', 'odpowiedzialna niemonogamia'],
    en: 'ethical / consensual non-monogamy',
    status: 'nieustalone',
    definition:
      'Parasol na wszystkie relacje, w których — jawnie i dobrowolnie — wyłączność nie obowiązuje: poliamoria, swing, relacje otwarte i inne. Na stronie używamy formy „etyczna niemonogamia".',
  },
  {
    slug: 'monogamia',
    headword: 'Monogamia',
    variants: ['mononormatywność (pokrewne)'],
    en: 'monogamy',
    status: 'ustalone',
    definition:
      'Relacja z jedną osobą naraz, z założeniem wyłączności. „Mononormatywność" to społeczne założenie, że to jedyna słuszna forma.',
  },
  {
    slug: 'kompersja',
    headword: 'Kompersja',
    en: 'compersion',
    status: 'ustalone',
    definition:
      'Ciepło albo radość na myśl o tym, że osoba partnerska cieszy się inną relacją. Bywa nazywana „przeciwieństwem zazdrości", choć obie mogą współistnieć.',
  },
  {
    slug: 'zazdrosc',
    headword: 'Zazdrość',
    en: 'jealousy',
    status: 'ustalone',
    definition:
      'Sygnał niezaspokojonej potrzeby albo lęku (przed utratą, o uwagę), a nie wada charakteru. W poliamorii traktowana jako coś do zrozumienia, nie do stłumienia.',
  },
  {
    slug: 'zawisc',
    headword: 'Zawiść',
    en: 'envy',
    status: 'ustalone',
    definition:
      'Chęć posiadania tego, co ma ktoś inny — inna niż zazdrość (lęk o utratę). To rozróżnienie w polskim dyskursie się trzyma.',
  },
  {
    slug: 'metamour',
    headword: 'Metamour',
    variants: ['meta (pot.)'],
    en: 'metamour',
    status: 'nieustalone',
    definition:
      'Osoba partnerska Twojej osoby partnerskiej, z którą samx nie jesteś w relacji.',
    note: 'Unikaj słowa „współpartner" — myli (sugeruje relację, której nie ma).',
  },
  {
    slug: 'polikula',
    headword: 'Polikuła',
    variants: ['polycule (ang.)'],
    status: 'wschodzace',
    definition:
      'Sieć osób połączonych relacjami — bezpośrednio albo przez metamours. Obraz „cząsteczki" złożonej z wielu wiązań.',
  },
  {
    slug: 'nre',
    headword: 'Energia nowego związku (ENZ)',
    variants: ['NRE (ang.)'],
    en: 'new relationship energy',
    status: 'nieustalone',
    definition:
      'Intensywne emocje i ekscytacja na początku nowej relacji. Potrafi chwilowo przyćmić istniejące relacje — warto o niej rozmawiać wprost.',
  },
  {
    slug: 'poliamoria-hierarchiczna',
    headword: 'Poliamoria hierarchiczna',
    variants: ['partner pierwszoplanowy / drugoplanowy'],
    en: 'hierarchical polyamory',
    status: 'nieustalone',
    definition:
      'Układ, w którym relacje mają różny „priorytet" albo zakres zobowiązań. Wiele osób świadomie unika hierarchii.',
    note: 'Wolimy etykiety „pierwszoplanowy / drugoplanowy" od wartościujących „pierwotny / wtórny".',
  },
  {
    slug: 'anarchia-relacyjna',
    headword: 'Anarchia relacyjna (RA)',
    variants: ['anarchizm relacji (spotykane)'],
    en: 'relationship anarchy',
    status: 'nieustalone',
    definition:
      'Podejście bez z góry narzuconej hierarchii i gotowych szablonów — każdą relację ustala się indywidualnie, także granicę między przyjaźnią a romansem.',
  },
  {
    slug: 'poliamoria-solo',
    headword: 'Poliamoria solo (solopoli)',
    en: 'solo polyamory',
    status: 'wschodzace',
    definition:
      'Poliamoria bez dążenia do „splatania życia" (wspólne mieszkanie, finanse). Autonomia jako świadoma wartość.',
  },
  {
    slug: 'poliamoria-rownolegla',
    headword: 'Poliamoria równoległa',
    en: 'parallel polyamory',
    status: 'nieustalone',
    definition:
      'Styl, w którym metamours nie utrzymują ze sobą bliskich relacji — relacje biegną „równolegle", obok siebie.',
  },
  {
    slug: 'kitchen-table',
    headword: 'Kitchen table',
    en: 'kitchen table polyamory',
    status: 'zwykle-en',
    definition:
      'Styl, w którym metamours znają się i potrafią razem „usiąść przy jednym stole". Zwykle bez polskiej kalki.',
  },
  {
    slug: 'triada',
    headword: 'Triada',
    variants: ['throuple (ang.)'],
    en: 'triad',
    status: 'ustalone',
    definition: 'Relacja trzech osób powiązanych ze sobą nawzajem.',
    note: 'Nie „trójkąt" — to słowo niesie konotację zdrady.',
  },
  {
    slug: 'wachlarz-v',
    headword: 'Wachlarz („V")',
    en: 'vee',
    status: 'nieustalone',
    definition:
      'Układ, w którym jedna osoba jest w relacji z dwiema, które nie są w relacji ze sobą (kształt litery „V").',
  },
  {
    slug: 'relacja-otwarta',
    headword: 'Relacja otwarta',
    variants: ['związek otwarty'],
    en: 'open relationship',
    status: 'ustalone',
    definition:
      'Relacja (często para), w której osoby mają wzajemną zgodę na relacje seksualne albo romantyczne poza nią.',
  },
  {
    slug: 'swing',
    headword: 'Swing / swingowanie',
    en: 'swinging',
    status: 'ustalone',
    definition:
      'Rekreacyjny seks poza główną relacją, zwykle wspólnie albo w gronie towarzyskim.',
  },
  {
    slug: 'weto',
    headword: 'Weto',
    en: 'veto',
    status: 'ustalone',
    definition:
      'Ustalenie, w którym jedna osoba może „zawetować" relację innej. Budzi kontrowersje — bywa, że wzmacnia kontrolę zamiast bezpieczeństwa.',
  },
  {
    slug: 'fluid-bonding',
    headword: 'Fluid bonding',
    status: 'zwykle-en',
    definition:
      'Świadoma rezygnacja z barier (np. prezerwatyw) w obrębie ustalonego kręgu osób — po rozmowie o zdrowiu i badaniach. Zwykle opisowo, bez kalki.',
  },
  {
    slug: 'dadt',
    headword: 'Nie pytaj, nie mów (DADT)',
    en: "don't ask, don't tell",
    status: 'zwykle-en',
    definition:
      'Ustalenie, w którym osoby świadomie nie dzielą się szczegółami swoich innych relacji.',
  },
]

/** Hasła posortowane alfabetycznie (po polsku). */
export function sortedGlossary(): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) => a.headword.localeCompare(b.headword, 'pl'))
}

/** Wyszukanie hasła po slugu (dla linkowania z artykułów). */
export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug)
}
