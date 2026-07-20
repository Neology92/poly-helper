import type { Content, TableCell, TDocumentDefinitions } from 'pdfmake/interfaces'
import type { CheckboxItem } from '../../data'
import { cardItems } from '../../data'
import { getPdfMake } from '../../lib/pdfmake'

/**
 * Eksport talii Gry karcianej do PDF (do druku i wycięcia).
 *
 * Odwzorowuje układ z dumpa (§4.3–4.4, §6): grid 2×3 stykających się kart na A4, ramka bloku
 * + znaczniki cięcia (crop marks), karta = opis ogólny (serif) → separator ze strzałką →
 * szczegóły → odnośnik „nr · nazwa" na dole. Karty są wielokrotnego użytku: placeholder [imię]
 * zostaje dosłownie (pseudonim ustala się kartą „Imiona na czas gry", nie drukiem).
 *
 * Uwaga (dług): odnośnik NIE jest obrócony o 180° — pdfmake nie obraca tekstu. Renderujemy go
 * blado, w normalnej orientacji. Reszta anatomii karty odwzorowana.
 */

// --- geometria (pt; 1 mm = 2.8346 pt) ---
const PAGE_W = 595.28
const PAGE_H = 841.89
const COLS = 2
const ROWS = 3
const CARD_W = 266.5
const CARD_H = 258
const BLOCK_W = CARD_W * COLS // 533
const BLOCK_H = CARD_H * ROWS // 774
const OX = (PAGE_W - BLOCK_W) / 2 // ~31.1
const OY = (PAGE_H - BLOCK_H) / 2 // ~33.9
const PAD_X = 16
const PAD_Y = 14
const CONTENT_W = CARD_W - 2 * PAD_X
const PER_PAGE = COLS * ROWS

const INK = '#2d2530'
const SOFT = '#6b6069'
const FAINT = '#b9aea4'
const LINE = '#c9beb4'
const CUT = '#9a8f96'

// --- skład talii: 1× zasady, 3× imiona, 21× scenek, 4× szablony = 29 kart (5 stron) ---
type DeckCard =
  | { kind: 'rules' }
  | { kind: 'names' }
  | { kind: 'scene'; item: CheckboxItem }
  | { kind: 'blank'; number: number }

function buildDeck(): DeckCard[] {
  const scenes = cardItems() as CheckboxItem[]
  return [
    { kind: 'rules' },
    { kind: 'names' },
    { kind: 'names' },
    { kind: 'names' },
    ...scenes.map((item) => ({ kind: 'scene', item }) as DeckCard),
    ...[26, 27, 28, 29].map((number) => ({ kind: 'blank', number }) as DeckCard),
  ]
}

/** Separator: blada linia z doklejoną strzałką ▾ (jeden kształt). */
function separator(): Content {
  return {
    margin: [0, 10, 0, 8],
    stack: [
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: CONTENT_W, y2: 0, lineWidth: 0.6, lineColor: LINE }] },
      { text: '▾', alignment: 'center', color: FAINT, fontSize: 10, margin: [0, -6, 0, 0] },
    ],
  }
}

function dashedLine(width: number): Content {
  return {
    canvas: [
      { type: 'line', x1: 0, y1: 6, x2: width, y2: 6, lineWidth: 0.6, lineColor: LINE, dash: { length: 2 } },
    ],
    margin: [0, 3, 0, 0],
  }
}

/** Główna zawartość karty (bez odnośnika) jako stack; odnośnik dokładany osobno. */
function cardBody(card: DeckCard): Content {
  switch (card.kind) {
    case 'scene':
      return {
        stack: [
          { text: card.item.card.general, font: 'Roboto', fontSize: 10.5, bold: true, color: INK, lineHeight: 1.25 },
          separator(),
          { text: card.item.card.detail, fontSize: 8.5, color: SOFT, lineHeight: 1.35 },
          ...(card.item.card.readingNote
            ? [{ text: card.item.card.readingNote, fontSize: 7, italics: true, color: FAINT, margin: [0, 6, 0, 0] } as Content]
            : []),
        ],
      }
    case 'rules':
      return {
        stack: [
          { text: 'Jak grać', fontSize: 13, bold: true, color: INK, margin: [0, 0, 0, 8] },
          {
            ol: [
              'Jedna osoba czyta kartę na głos, w pierwszej osobie — jakby to się właśnie stało.',
              'Najpierw sam opis ogólny. Potem osoba słuchająca decyduje, czy chce szczegóły (pod strzałką).',
              'Na tej podstawie zaznaczacie wiersz w tabeli granic: czy informować, jak szczegółowo, czy uprzedzać.',
              'Czytacie na zmianę, ale w jednej rundzie odpowiada jedna osoba — wypełnia się jej tabelę.',
              'Nie ma złych odpowiedzi. Przy każdej karcie można się zatrzymać i porozmawiać.',
            ],
            fontSize: 8.5,
            color: INK,
            lineHeight: 1.3,
          },
        ],
      }
    case 'names':
      return {
        stack: [
          { text: 'Imiona na czas gry', fontSize: 12, bold: true, color: INK, margin: [0, 0, 0, 6] },
          {
            text: 'Ustalcie pseudonim za „[imię]" dla osoby z Waszej równoległej relacji. Prawdziwe imię nie musi padać.',
            fontSize: 7.5,
            color: SOFT,
            margin: [0, 0, 0, 12],
          },
          { text: 'Gdy odpowiada:', fontSize: 8, color: SOFT },
          dashedLine(CONTENT_W),
          { text: '[imię] =', fontSize: 8, color: SOFT, margin: [0, 12, 0, 0] },
          dashedLine(CONTENT_W),
          { text: 'Gdy odpowiada:', fontSize: 8, color: SOFT, margin: [0, 18, 0, 0] },
          dashedLine(CONTENT_W),
          { text: '[imię] =', fontSize: 8, color: SOFT, margin: [0, 12, 0, 0] },
          dashedLine(CONTENT_W),
        ],
      }
    case 'blank':
      return {
        stack: [
          { text: 'opis ogólny (wprost o czynności)', fontSize: 9, italics: true, color: FAINT, lineHeight: 1.25 },
          separator(),
          { text: 'szczegóły (kontekst, jak wyglądało)', fontSize: 8.5, italics: true, color: FAINT, lineHeight: 1.3 },
        ],
      }
  }
}

function cardRef(card: DeckCard): string {
  if (card.kind === 'scene') return `${card.item.number} · ${card.item.name}`
  if (card.kind === 'blank') return `${card.number} ·  ·  ·  ·  ·`
  return ''
}

/** Treść karty (body + odnośnik) jako komórka o stałej szerokości — poprawne zawijanie tekstu. */
function cardCellContent(card: DeckCard): TableCell {
  const stack: Content[] = [cardBody(card)]
  const ref = cardRef(card)
  if (ref) stack.push({ text: ref, fontSize: 6.5, color: FAINT, margin: [0, 12, 0, 0] })
  return { stack, border: [false, false, false, false] }
}

/**
 * Karta umieszczona bezwzględnie w komórce (col, row). Treść owinięta w jednokomórkową tabelę
 * o szerokości CONTENT_W — dzięki temu tekst zawija się do karty (samo absolutePosition tego
 * nie robi). Geometrię (ramka, linie cięcia, crop marks) rysuje tło — patrz gridAndCropMarks().
 */
function placeCard(card: DeckCard, col: number, row: number): Content {
  const x = OX + col * CARD_W
  const y = OY + row * CARD_H
  return {
    absolutePosition: { x: x + PAD_X, y: y + PAD_Y },
    table: { widths: [CONTENT_W], body: [[cardCellContent(card)]] },
    layout: 'noBorders',
  } as Content
}

/** Ramka bloku, wewnętrzne linie cięcia i crop marks — dokładna geometria, na każdej stronie. */
function gridAndCropMarks(): Content {
  const lines: object[] = []
  lines.push({ type: 'rect', x: OX, y: OY, w: BLOCK_W, h: BLOCK_H, lineWidth: 0.4, lineColor: LINE })
  for (let c = 1; c < COLS; c++) {
    const lx = OX + c * CARD_W
    lines.push({ type: 'line', x1: lx, y1: OY, x2: lx, y2: OY + BLOCK_H, lineWidth: 0.4, lineColor: LINE })
  }
  for (let r = 1; r < ROWS; r++) {
    const ly = OY + r * CARD_H
    lines.push({ type: 'line', x1: OX, y1: ly, x2: OX + BLOCK_W, y2: ly, lineWidth: 0.4, lineColor: LINE })
  }
  const LEN = 12
  const GAP = 4
  const xs = Array.from({ length: COLS + 1 }, (_, i) => OX + i * CARD_W)
  const ys = Array.from({ length: ROWS + 1 }, (_, i) => OY + i * CARD_H)
  for (const vx of xs) {
    lines.push({ type: 'line', x1: vx, y1: OY - GAP, x2: vx, y2: OY - GAP - LEN, lineWidth: 0.4, lineColor: CUT })
    lines.push({ type: 'line', x1: vx, y1: OY + BLOCK_H + GAP, x2: vx, y2: OY + BLOCK_H + GAP + LEN, lineWidth: 0.4, lineColor: CUT })
  }
  for (const hy of ys) {
    lines.push({ type: 'line', x1: OX - GAP, y1: hy, x2: OX - GAP - LEN, y2: hy, lineWidth: 0.4, lineColor: CUT })
    lines.push({ type: 'line', x1: OX + BLOCK_W + GAP, y1: hy, x2: OX + BLOCK_W + GAP + LEN, y2: hy, lineWidth: 0.4, lineColor: CUT })
  }
  return { canvas: lines } as Content
}

function buildDocDefinition(): TDocumentDefinitions {
  const deck = buildDeck()
  const pages = Math.ceil(deck.length / PER_PAGE)
  const content: Content[] = []
  for (let p = 0; p < pages; p++) {
    for (let i = 0; i < PER_PAGE; i++) {
      const card = deck[p * PER_PAGE + i]
      if (!card) continue
      content.push(placeCard(card, i % COLS, Math.floor(i / COLS)))
    }
    if (p < pages - 1) content.push({ text: '', pageBreak: 'after' })
  }

  return {
    pageSize: 'A4',
    pageMargins: [0, 0, 0, 0],
    defaultStyle: { font: 'Roboto', fontSize: 9, color: INK },
    info: { title: 'Gra karciana — talia' },
    background: () => gridAndCropMarks(),
    content,
  }
}

/** Pobiera PDF całej talii (5 stron A4, grid 2×3, do wycięcia). */
export async function downloadDeckPdf(): Promise<void> {
  const pdfMake = await getPdfMake()
  pdfMake.createPdf(buildDocDefinition()).download('gra-karciana_talia.pdf')
}
