import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const KEY = 'poly-helper:theme'
const THEME_COLOR: Record<Theme, string> = { light: '#3f7e72', dark: '#1b191d' }

function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

/** Przełącznik jasny/ciemny. Wybór zapisywany lokalnie; start z preferencji systemu. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Dopasuj meta theme-color do aktualnego motywu przy montowaniu.
  useEffect(() => {
    applyTheme(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // tryb prywatny — po prostu nie zapiszemy wyboru
    }
  }

  const goingDark = theme === 'light'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={goingDark ? 'Włącz tryb ciemny' : 'Włącz tryb jasny'}
      title={goingDark ? 'Tryb ciemny' : 'Tryb jasny'}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
    </button>
  )
}
