import './tool-placeholder.css'

interface ToolPlaceholderProps {
  title: string
  lede: string
  /** Lista tego, co narzędzie będzie umiało (widoczna zapowiedź). */
  points?: string[]
}

/**
 * Wspólny placeholder dla narzędzi jeszcze niezaimplementowanych.
 * Zapowiada, co dane narzędzie będzie robić, w spójnym stylu.
 */
export function ToolPlaceholder({ title, lede, points }: ToolPlaceholderProps) {
  return (
    <article className="placeholder">
      <span className="badge badge--wip">W budowie</span>
      <h1>{title}</h1>
      <p className="placeholder__lede">{lede}</p>

      {points && points.length > 0 && (
        <>
          <p className="placeholder__label">Co będzie umieć:</p>
          <ul className="placeholder__list">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </>
      )}

      <p className="placeholder__note">
        To narzędzie ma już gotowe treści i wersje PDF — dokładamy tu warstwę interaktywną
        i eksport. Wróć wkrótce.
      </p>
    </article>
  )
}
