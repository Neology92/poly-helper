/** Lekki zapis ustawień gry (pseudonim [imię]) — localStorage, bez konta. */

const KEY = 'poly-helper:gra:v1'

export interface GameSettings {
  pseudonim: string
}

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { pseudonim: '' }
    const parsed = JSON.parse(raw) as Partial<GameSettings>
    return { pseudonim: typeof parsed.pseudonim === 'string' ? parsed.pseudonim : '' }
  } catch {
    return { pseudonim: '' }
  }
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings))
  } catch {
    // brak miejsca / tryb prywatny — pomijamy
  }
}
