/** Lekki zapis ustawień gry (pseudonim [imię], stop-słowo) — localStorage, bez konta. */

const KEY = 'poly-helper:gra:v1'

export interface GameSettings {
  pseudonim: string
  /** Umówione słowo, po którym przerywamy — bez tłumaczenia się. */
  stopSlowo: string
}

const EMPTY: GameSettings = { pseudonim: '', stopSlowo: '' }

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw) as Partial<GameSettings>
    return {
      pseudonim: typeof parsed.pseudonim === 'string' ? parsed.pseudonim : '',
      stopSlowo: typeof parsed.stopSlowo === 'string' ? parsed.stopSlowo : '',
    }
  } catch {
    return { ...EMPTY }
  }
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings))
  } catch {
    // brak miejsca / tryb prywatny — pomijamy
  }
}
