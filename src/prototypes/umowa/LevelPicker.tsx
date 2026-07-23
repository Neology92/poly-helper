import { POZIOMY, type Poziom } from './model'

/** Segmentowany wybór neutralnego poziomu (Tak / Może / W przyszłości / Nie / Granica). */
export function LevelPicker({
  value,
  onChange,
  ariaLabel,
}: {
  value: Poziom
  onChange: (p: Poziom) => void
  ariaLabel?: string
}) {
  return (
    <div className="levels" role="group" aria-label={ariaLabel ?? 'Poziom'}>
      {POZIOMY.map((p) => {
        const active = value === p.value
        return (
          <button
            key={p.value}
            type="button"
            className={`levels__opt levels__opt--${p.value} ${active ? 'is-active' : ''}`}
            aria-pressed={active}
            onClick={() => onChange(active ? '' : p.value)}
          >
            {p.label}
          </button>
        )
      })}
    </div>
  )
}
