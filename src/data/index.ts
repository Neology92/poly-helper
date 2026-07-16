/**
 * Publiczny punkt wejścia do modelu danych.
 *
 * DEFINICJA (kanon):  items, getItem, cardItems, columns, typy pozycji
 * STAN (dokument):     BoundaryDocument, emptyDocument, odpowiedzi
 * NARZĘDZIA:           applyName (podmiana [imię]), validateItems
 */
export * from './types'
export * from './items'
export * from './columns'
export * from './document'
export { applyName } from './name'
export { validateItems } from './validate'

// W trybie deweloperskim ostrzegaj o niespójnościach kanonu (wyłapuje literówki
// w transkrypcji). Kod jest usuwany z produkcyjnego buildu.
if (import.meta.env.DEV) {
  import('./validate').then(({ validateItems }) => {
    const issues = validateItems()
    if (issues.length) {
      console.error('[poly-helper] Niespójności w modelu danych:\n' + issues.join('\n'))
    }
  })
}
