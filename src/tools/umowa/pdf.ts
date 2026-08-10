import type { Content, TDocumentDefinitions } from 'pdfmake/interfaces'
import { getPdfMake } from '../../lib/pdfmake'
import { kategorieDoc, poziomLabel, type UmowaDoc } from './model'

/**
 * PDF „Żywej umowy" po stronie klienta (pdfmake + Roboto, pełne polskie znaki).
 * Renderuje tylko wypełnione pozycje menu (z poziomem) pogrupowane po kategoriach + wolne sekcje.
 * pdfmake i font (~2 MB) ładowane leniwie, dopiero przy eksporcie.
 */

const INK = '#2d2530'
const ACCENT = '#6b6069'
const LINE = '#c9beb4'

function buildDocDefinition(doc: UmowaDoc): TDocumentDefinitions {
  const osoba = doc.meta.osoba.trim()
  const content: Content[] = [
    { text: 'Żywa umowa relacyjna', fontSize: 16, bold: true },
    osoba
      ? { text: 'Relacja: ' + osoba, fontSize: 10, color: ACCENT, margin: [0, 2, 0, 0] }
      : { text: '' },
    doc.meta.notatka.trim()
      ? { text: doc.meta.notatka, fontSize: 9, italics: true, color: ACCENT, margin: [0, 2, 0, 0] }
      : { text: '' },
    {
      text: 'Zapis ustaleń — pomoc do rozmowy, nie kontrakt na zawsze.',
      fontSize: 8,
      color: ACCENT,
      margin: [0, 2, 0, 12],
    },
  ]

  // Menu: tylko wypełnione pozycje, pogrupowane po kategoriach.
  for (const kat of kategorieDoc(doc.items)) {
    const items = doc.items.filter((it) => it.kategoria === kat && it.poziom !== '')
    if (!items.length) continue
    content.push({ text: kat, fontSize: 12, bold: true, margin: [0, 8, 0, 4] })
    for (const it of items) {
      content.push({
        columns: [
          { width: '*', text: it.label, fontSize: 10, color: INK },
          {
            width: 'auto',
            text: poziomLabel(it.poziom),
            fontSize: 9,
            bold: true,
            color: ACCENT,
            alignment: 'right',
          },
        ],
        margin: [0, 2, 0, 0],
      })
      if (it.note.trim()) {
        content.push({ text: it.note, fontSize: 8.5, italics: true, color: ACCENT, margin: [0, 0, 0, 0] })
      }
    }
  }

  // Wolne sekcje.
  const sekcje = doc.sections.filter((s) => s.title.trim() || s.body.trim())
  if (sekcje.length) {
    content.push({
      canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.6, lineColor: LINE }],
      margin: [0, 12, 0, 8],
    })
    content.push({ text: 'Własne ustalenia', fontSize: 13, bold: true, margin: [0, 0, 0, 4] })
    for (const s of sekcje) {
      content.push({ text: s.title || '(bez nazwy)', fontSize: 11, bold: true, margin: [0, 6, 0, 1] })
      if (s.body.trim()) content.push({ text: s.body, fontSize: 10, color: INK })
    }
  }

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 36],
    defaultStyle: { font: 'Roboto', fontSize: 10, color: INK, lineHeight: 1.25 },
    info: { title: 'Żywa umowa relacyjna' },
    content,
  }
}

function filename(doc: UmowaDoc): string {
  const osoba = doc.meta.osoba.trim().replace(/[^\p{L}\p{N}_-]+/gu, '-')
  return `zywa-umowa${osoba ? '_' + osoba : ''}.pdf`
}

export async function downloadUmowaPdf(doc: UmowaDoc): Promise<void> {
  const pdfMake = await getPdfMake()
  pdfMake.createPdf(buildDocDefinition(doc)).download(filename(doc))
}
