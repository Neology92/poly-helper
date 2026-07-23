/**
 * Lekki zapis prototypu „Żywej umowy" — jeden klucz localStorage = jeden dokument wariantu.
 * Bez profili (prototyp). Wzorzec jak cards-game/storage.ts.
 */

export function loadDoc<T>(key: string, empty: () => T, normalize: (d: unknown) => T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return empty()
    return normalize(JSON.parse(raw))
  } catch {
    return empty()
  }
}

export function saveDoc<T>(key: string, doc: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(doc))
  } catch {
    // brak miejsca / tryb prywatny — pomijamy
  }
}

/** Dzisiejsza data YYYY-MM-DD (lokalna strefa). */
export function today(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
