import type { DetailLevel } from '../../data'
import { DETAIL_LABELS } from '../../data'

/**
 * Znacznik do „zamalowania" (must say `!`, DON'T TELL `✕`). W druku blady znak zamalowuje się
 * długopisem; tu klik wypełnia go pełnym kolorem.
 */
export function Marker({
  glyph,
  active,
  onChange,
  label,
  tone = 'ink',
}: {
  glyph: string
  active: boolean
  onChange: (v: boolean) => void
  label: string
  tone?: 'ink' | 'danger'
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-label={label}
      title={label}
      className={`marker marker--${tone} ${active ? 'is-on' : ''}`}
      onClick={() => onChange(!active)}
    >
      <span aria-hidden="true">{glyph}</span>
    </button>
  )
}

/** Zwykły checkbox stanu (może się wydarzyć / wydarzyło się). */
export function CheckToggle({
  active,
  onChange,
  label,
  accent,
}: {
  active: boolean
  onChange: (v: boolean) => void
  label: string
  accent: 'amber' | 'teal'
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-label={label}
      title={label}
      className={`check check--${accent} ${active ? 'is-on' : ''}`}
      onClick={() => onChange(!active)}
    >
      <span className="check__box" aria-hidden="true" />
    </button>
  )
}

/**
 * Poziom szczegółu: dwa wykluczające się pola (□ ogólnie / szczegóły □).
 * Klik w wybrane pole odznacza (powrót do „unset").
 */
export function DetailControl({
  value,
  onChange,
}: {
  value: DetailLevel
  onChange: (v: DetailLevel) => void
}) {
  const pick = (v: DetailLevel) => onChange(value === v ? 'unset' : v)
  return (
    <div className="detail" role="group" aria-label="Poziom szczegółu">
      <button
        type="button"
        aria-pressed={value === 'ogolnie'}
        className={`detail__opt ${value === 'ogolnie' ? 'is-on' : ''}`}
        onClick={() => pick('ogolnie')}
      >
        {DETAIL_LABELS.ogolnie}
      </button>
      <button
        type="button"
        aria-pressed={value === 'szczegoly'}
        className={`detail__opt ${value === 'szczegoly' ? 'is-on' : ''}`}
        onClick={() => pick('szczegoly')}
      >
        {DETAIL_LABELS.szczegoly}
      </button>
    </div>
  )
}
