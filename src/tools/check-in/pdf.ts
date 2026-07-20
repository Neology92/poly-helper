import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import { getPdfMake } from '../../lib/pdfmake'
import { TRIFORCE_OPTIONS, type CheckinDoc, type CheckinEntry, type TriforceCel } from './model'

/**
 * Generowanie PDF historii check-inów po stronie klienta (pdfmake + Roboto, pełne polskie znaki).
 * pdfmake i font (~2 MB) ładowane leniwie, dopiero przy eksporcie.
 */

const INK = '#2d2530'
const ACCENT = '#6b6069'
const LINE = '#c9beb4'

function celLabel(cel: TriforceCel): string | null {
  return TRIFORCE_OPTIONS.find((o) => o.value === cel)?.label ?? null
}

/** Sekcja wpisu: etykieta + treść (pomijana, gdy pusta). */
function section(label: string, value: string): Content[] {
  if (!value.trim()) return []
  return [
    { text: label, fontSize: 7.5, bold: true, color: ACCENT, margin: [0, 4, 0, 0] },
    { text: value, fontSize: 9.5, color: INK, margin: [0, 1, 0, 0] },
  ]
}

/** Jeden zapisany check-in jako blok treści. */
function entryBlock(entry: CheckinEntry): Content {
  const cel = celLabel(entry.cel)
  const stack: Content[] = [
    {
      columns: [
        { text: entry.date || '—', fontSize: 11, bold: true, color: INK },
        cel
          ? { text: cel, fontSize: 8, italics: true, color: ACCENT, alignment: 'right' }
          : { text: '' },
      ],
    },
    ...section('Radość / co działa', entry.radosc),
    ...section('Uznanie / wdzięczność', entry.uznanie),
    ...section('Do poprawy / co uwiera', entry.doPoprawy),
    ...section('Ustalenia / akcje', entry.ustalenia),
    ...(entry.nastepnaRandka.trim()
      ? [
          {
            text: 'Następna randka: ' + entry.nastepnaRandka,
            fontSize: 8.5,
            italics: true,
            color: ACCENT,
            margin: [0, 5, 0, 0],
          } as Content,
        ]
      : []),
  ]
  return { stack, margin: [0, 0, 0, 10] }
}

function buildDocDefinition(doc: CheckinDoc): TDocumentDefinitions {
  const osoba = doc.meta.osoba.trim()
  const blocks: Content[] = []
  doc.entries.forEach((entry, i) => {
    if (i > 0) {
      blocks.push({
        canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: LINE }],
        margin: [0, 0, 0, 8],
      })
    }
    blocks.push(entryBlock(entry))
  })

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 36],
    defaultStyle: { font: 'Roboto', fontSize: 9.5, color: INK, lineHeight: 1.2 },
    info: { title: 'Check-in relacyjny' },
    content: [
      { text: 'Check-in relacyjny', fontSize: 16, bold: true },
      osoba
        ? { text: 'Profil: ' + osoba, fontSize: 10, color: ACCENT, margin: [0, 2, 0, 0] }
        : { text: '' },
      doc.meta.notatka.trim()
        ? { text: doc.meta.notatka, fontSize: 9, italics: true, color: ACCENT, margin: [0, 2, 0, 0] }
        : { text: '' },
      {
        text: 'Zapis rozmów — pomoc do wracania, nie ocena.',
        fontSize: 8,
        color: ACCENT,
        margin: [0, 2, 0, 10],
      },
      ...blocks,
    ],
  }
}

function filename(doc: CheckinDoc): string {
  const osoba = doc.meta.osoba.trim().replace(/[^\p{L}\p{N}_-]+/gu, '-')
  return `check-in${osoba ? '_' + osoba : ''}.pdf`
}

/** Pobiera PDF z historią check-inów aktywnego profilu. */
export async function downloadCheckinPdf(doc: CheckinDoc): Promise<void> {
  const pdfMake = await getPdfMake()
  pdfMake.createPdf(buildDocDefinition(doc)).download(filename(doc))
}
