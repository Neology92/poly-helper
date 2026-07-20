import { items } from './items'
import { NAME_PLACEHOLDER, hasCard } from './types'

/** Numery pozycji, które są polami „do wypisania/ustalenia" (bez kart). */
const FIELD_NUMBERS = [5, 12, 21, 22]
const EXPECTED_COUNT = 25

/**
 * Sprawdza niezmienniki kanonu (kontrola transkrypcji z dumpa).
 * Zwraca listę problemów — pusta lista = wszystko OK.
 */
export function validateItems(): string[] {
  const issues: string[] = []

  if (items.length !== EXPECTED_COUNT) {
    issues.push(`Oczekiwano ${EXPECTED_COUNT} pozycji, jest ${items.length}.`)
  }

  const numbers = items.map((it) => it.number)
  const expected = Array.from({ length: EXPECTED_COUNT }, (_, i) => i + 1)
  for (const n of expected) {
    if (!numbers.includes(n)) issues.push(`Brak pozycji o numerze ${n}.`)
  }
  const dupes = numbers.filter((n, i) => numbers.indexOf(n) !== i)
  if (dupes.length) issues.push(`Zduplikowane numery pozycji: ${[...new Set(dupes)].join(', ')}.`)

  for (const it of items) {
    const isField = it.kind === 'field'
    const shouldBeField = FIELD_NUMBERS.includes(it.number)
    if (isField !== shouldBeField) {
      issues.push(
        `Pozycja ${it.number} („${it.name}") ma kind='${it.kind}', a oczekiwano ` +
          `'${shouldBeField ? 'field' : 'checkbox'}'.`,
      )
    }
    if (!it.name.trim()) issues.push(`Pozycja ${it.number} ma pustą nazwę.`)

    if (hasCard(it)) {
      if (!it.card.general.trim()) issues.push(`Pozycja ${it.number}: pusty opis ogólny karty.`)
      if (!it.card.detail.trim()) issues.push(`Pozycja ${it.number}: pusty opis szczegółowy karty.`)
      const mentionsName =
        it.card.general.includes(NAME_PLACEHOLDER) || it.card.detail.includes(NAME_PLACEHOLDER)
      if (!mentionsName) {
        issues.push(`Pozycja ${it.number}: karta nie zawiera placeholdera ${NAME_PLACEHOLDER}.`)
      }
    } else if (!it.fieldPrompt.trim()) {
      issues.push(`Pozycja ${it.number}: pole 'field' bez etykiety (fieldPrompt).`)
    }
  }

  return issues
}
