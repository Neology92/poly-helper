import type {
  Content,
  TableCell,
  TDocumentDefinitions,
} from 'pdfmake/interfaces'
import type { BoundaryDocument, CheckboxAnswer, DetailLevel } from '../../data'
import { EMPTY_ROWS, columns, copyHeaderFields, items } from '../../data'

/**
 * Generowanie PDF tabeli granic informowania po stronie klienta (pdfmake + Roboto,
 * pełne polskie znaki). Dwa warianty: pusty szablon do druku oraz wersja z odpowiedziami.
 *
 * pdfmake i font (~2 MB) ładowane są leniwie, dopiero przy eksporcie.
 */

type Mode = { kind: 'blank' } | { kind: 'filled'; doc: BoundaryDocument }

// Kolory B&W-first: czcionka ciemna, znaki „do zamalowania" blade, linie stonowane.
const INK = '#2d2530'
const FAINT = '#c9c0b8'
const LINE = '#c9beb4'
const LINE_SOFT = '#ece4dc'
const ACCENT = '#6b6069'

// Szerokości kolumn (pt). Suma stałych + „*" na Czynność.
const W = { mustSay: 22, num: 13, dontTell: 28, heads: 36, after: 34, detail: 96 }

async function getPdfMake() {
  const [pdfMakeMod, vfsMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ])
  const pdfMake = (pdfMakeMod as { default?: unknown }).default ?? pdfMakeMod
  const vfs = (vfsMod as { default?: unknown }).default ?? vfsMod
  ;(pdfMake as { vfs: unknown }).vfs = vfs
  return pdfMake as {
    createPdf: (def: TDocumentDefinitions) => { download: (name?: string) => void }
  }
}

/** Znak „do zamalowania" (! / ×): blady w pustym szablonie, ciemny gdy zaznaczony. */
function mark(active: boolean, glyph: string): TableCell {
  return {
    text: glyph,
    alignment: 'center',
    bold: true,
    fontSize: 11,
    color: active ? INK : FAINT,
    margin: [0, 1, 0, 0],
  }
}

/** Kwadrat-checkbox (może się wydarzyć / wydarzyło się), wyśrodkowany w kolumnie. */
function checkbox(active: boolean, colWidth: number): TableCell {
  const size = 9
  const avail = colWidth - 6 // paddingi celi z layoutu
  const left = Math.max(0, (avail - size) / 2)
  return {
    margin: [left, 3, 0, 3],
    canvas: [
      {
        type: 'rect',
        x: 0,
        y: 0,
        w: size,
        h: size,
        r: 1.5,
        lineWidth: 0.8,
        lineColor: '#9a8f96',
        ...(active ? { color: INK } : {}),
      },
    ],
  }
}

/** Poziom szczegółu w jednej linii: „□ ogólnie  □ szczegóły", zaznaczona wypełniona. */
function detailCell(level: DetailLevel): TableCell {
  const sq = (on: boolean): Content =>
    ({
      width: 'auto',
      canvas: [
        {
          type: 'rect',
          x: 0,
          y: 0,
          w: 7,
          h: 7,
          r: 1.2,
          lineWidth: 0.8,
          lineColor: '#9a8f96',
          ...(on ? { color: INK } : {}),
        },
      ],
      margin: [0, 1.5, 0, 0],
    }) as Content
  const lbl = (label: string, on: boolean, right = 0): Content =>
    ({
      width: 'auto',
      text: label,
      fontSize: 6.5,
      color: on ? INK : ACCENT,
      margin: [2, 0, right, 0],
    }) as Content
  return {
    columns: [
      sq(level === 'ogolnie'),
      lbl('ogólnie', level === 'ogolnie', 6),
      sq(level === 'szczegoly'),
      lbl('szczegóły', level === 'szczegoly'),
    ],
    columnGap: 0,
  }
}

/** Komórka z nazwą pozycji + doprecyzowaniem/uwagą. */
function nameCell(name: string, sub?: string, sub2?: string): TableCell {
  const stack: Content[] = [{ text: name, fontSize: 8, bold: false, color: INK }]
  if (sub) stack.push({ text: sub, fontSize: 6, italics: true, color: ACCENT, margin: [0, 0.5, 0, 0] })
  if (sub2) stack.push({ text: sub2, fontSize: 6, italics: true, color: ACCENT, margin: [0, 0.5, 0, 0] })
  return { stack }
}

/** Pusta linia do pisania ręcznego (przerywana). */
function ruleLine(width: number): Content {
  return {
    canvas: [
      { type: 'line', x1: 0, y1: 6, x2: width, y2: 6, lineWidth: 0.6, lineColor: LINE, dash: { length: 2 } },
    ],
    margin: [0, 2, 0, 0],
  }
}

function buildRows(mode: Mode): TableCell[][] {
  const rows: TableCell[][] = []

  // Nagłówek kolumn.
  const head = (t: string): TableCell => ({
    text: t,
    fontSize: 6.8,
    bold: true,
    color: ACCENT,
    margin: [0, 2, 0, 2],
  })
  rows.push([
    head(columns.mustSay.label),
    head(columns.number.label),
    head(columns.name.label),
    head(columns.dontTell.label),
    head(columns.headsUp.label),
    head(columns.afterFact.label),
    head(columns.detail.label),
  ])

  const filled = mode.kind === 'filled' ? mode.doc : null

  for (const item of items) {
    if (item.kind === 'field') {
      const value = filled ? (filled.answers[item.number] as { text: string }).text : ''
      const area: Content = value
        ? { text: value, fontSize: 8, margin: [0, 2, 0, 0] }
        : ruleLine(480)
      rows.push([
        { text: '' },
        { text: item.number, fontSize: 7, alignment: 'center', color: FAINT, margin: [0, 2, 0, 0] },
        {
          colSpan: 5,
          stack: [
            {
              columns: [
                { text: item.name, fontSize: 8.5, bold: true },
                { text: item.fieldPrompt, fontSize: 7.5, color: ACCENT, alignment: 'right' },
              ],
            },
            ...(item.clarification
              ? [{ text: item.clarification, fontSize: 6.5, italics: true, color: ACCENT } as Content]
              : []),
            area,
          ],
        },
        {},
        {},
        {},
        {},
      ])
      continue
    }

    const a: CheckboxAnswer | null = filled ? (filled.answers[item.number] as CheckboxAnswer) : null
    rows.push([
      mark(a?.mustSay ?? false, columns.mustSay.glyph!),
      { text: item.number, fontSize: 7, alignment: 'center', color: FAINT, margin: [0, 3, 0, 0] },
      nameCell(item.name, item.clarification, item.note),
      mark(a?.dontTell ?? false, columns.dontTell.glyph!),
      checkbox(a?.headsUp ?? false, W.heads),
      checkbox(a?.afterFact ?? false, W.after),
      detailCell(a?.detail ?? 'unset'),
    ])
  }

  // Wiersze własne (tylko w wersji wypełnionej, jeśli są).
  if (filled) {
    for (const row of filled.customRows) {
      rows.push([
        mark(row.answer.mustSay, columns.mustSay.glyph!),
        { text: '•', fontSize: 8, alignment: 'center', color: FAINT, margin: [0, 2, 0, 0] },
        nameCell(row.name || '—'),
        mark(row.answer.dontTell, columns.dontTell.glyph!),
        checkbox(row.answer.headsUp, W.heads),
        checkbox(row.answer.afterFact, W.after),
        detailCell(row.answer.detail),
      ])
    }
  }

  // Puste wiersze na dopisanie własnych pozycji.
  for (let i = 0; i < EMPTY_ROWS; i++) {
    rows.push([
      mark(false, columns.mustSay.glyph!),
      { text: '', fontSize: 7 },
      { stack: [ruleLine(300)] },
      mark(false, columns.dontTell.glyph!),
      checkbox(false, W.heads),
      checkbox(false, W.after),
      detailCell('unset'),
    ])
  }

  return rows
}

function metaHeader(mode: Mode): Content {
  const filled = mode.kind === 'filled' ? mode.doc : null
  const field = (label: string, value: string | undefined, width: number): Content =>
    ({
      width: width === 0 ? '*' : width,
      stack: [
        { text: label.toUpperCase(), fontSize: 6.5, bold: true, color: ACCENT, characterSpacing: 0.5 },
        value
          ? { text: value, fontSize: 9, margin: [0, 2, 0, 0] }
          : ruleLine(width === 0 ? 200 : width - 10),
      ],
    }) as Content
  return {
    columns: [
      field(copyHeaderFields.osobaInformowana, filled?.meta.osobaInformowana, 0),
      field(copyHeaderFields.data, filled?.meta.data, 90),
      field(copyHeaderFields.notatka, filled?.meta.notatka, 0),
    ],
    columnGap: 14,
    margin: [0, 6, 0, 8],
  }
}

function buildDocDefinition(mode: Mode): TDocumentDefinitions {
  return {
    pageSize: 'A4',
    pageMargins: [22, 20, 22, 16],
    defaultStyle: { font: 'Roboto', fontSize: 7.5, color: INK, lineHeight: 1.1 },
    info: { title: 'Tabela granic informowania' },
    content: [
      { text: 'Tabela granic informowania', fontSize: 13, bold: true },
      {
        text: 'O czym z równoległych relacji informować osobę partnerską — i jak szczegółowo. Narzędzie do rozmowy, nie kontrakt na zawsze.',
        fontSize: 7.5,
        color: ACCENT,
        margin: [0, 2, 0, 0],
      },
      metaHeader(mode),
      {
        table: {
          headerRows: 1,
          widths: [W.mustSay, W.num, '*', W.dontTell, W.heads, W.after, W.detail],
          body: buildRows(mode),
        },
        layout: {
          hLineWidth: (i: number) => (i === 1 ? 0.9 : 0.5),
          vLineWidth: () => 0.3,
          hLineColor: (i: number) => (i === 1 ? LINE : LINE_SOFT),
          vLineColor: () => LINE_SOFT,
          paddingLeft: () => 3,
          paddingRight: () => 3,
          paddingTop: () => 2,
          paddingBottom: () => 2,
        },
      },
      {
        text: '!  = informować bezwzględnie      ×  = „nie mów mi o tym"      □ ogólnie / szczegóły = jak szczegółowo',
        fontSize: 6.8,
        color: ACCENT,
        margin: [0, 4, 0, 0],
      },
    ],
  }
}

function filename(mode: Mode): string {
  if (mode.kind === 'blank') return 'tabela-granic-informowania_pusty.pdf'
  const osoba = mode.doc.meta.osobaInformowana.trim().replace(/[^\p{L}\p{N}_-]+/gu, '-')
  return `tabela-granic-informowania${osoba ? '_' + osoba : ''}.pdf`
}

/** Pobiera PDF (pusty szablon lub wypełniony egzemplarz). */
export async function downloadTablePdf(mode: Mode): Promise<void> {
  const pdfMake = await getPdfMake()
  pdfMake.createPdf(buildDocDefinition(mode)).download(filename(mode))
}
