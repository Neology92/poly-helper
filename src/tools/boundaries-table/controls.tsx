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
  disabled = false,
  hint,
}: {
  glyph: string
  active: boolean
  onChange: (v: boolean) => void
  label: string
  tone?: 'ink' | 'danger'
  disabled?: boolean
  hint?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      title={disabled && hint ? hint : label}
      className={`marker marker--${tone} ${active ? 'is-on' : ''}`}
      onClick={() => !disabled && onChange(!active)}
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
  disabled = false,
  hint,
}: {
  active: boolean
  onChange: (v: boolean) => void
  label: string
  accent: 'amber' | 'teal'
  disabled?: boolean
  hint?: string
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      title={disabled && hint ? hint : label}
      className={`check check--${accent} ${active ? 'is-on' : ''}`}
      onClick={() => !disabled && onChange(!active)}
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
  disabled = false,
  required = false,
  hint,
}: {
  value: DetailLevel
  onChange: (v: DetailLevel) => void
  disabled?: boolean
  required?: boolean
  hint?: string
}) {
  const pick = (v: DetailLevel) => !disabled && onChange(value === v ? 'unset' : v)
  const cls = ['detail', disabled ? 'is-disabled' : '', required ? 'is-required' : '']
    .filter(Boolean)
    .join(' ')
  return (
    <div
      className={cls}
      role="group"
      aria-label="Poziom szczegółu"
      title={disabled && hint ? hint : required ? 'Wybierz poziom szczegółu' : undefined}
    >
      <button
        type="button"
        aria-pressed={value === 'ogolnie'}
        disabled={disabled}
        className={`detail__opt ${value === 'ogolnie' ? 'is-on' : ''}`}
        onClick={() => pick('ogolnie')}
      >
        {DETAIL_LABELS.ogolnie}
      </button>
      <button
        type="button"
        aria-pressed={value === 'szczegoly'}
        disabled={disabled}
        className={`detail__opt ${value === 'szczegoly' ? 'is-on' : ''}`}
        onClick={() => pick('szczegoly')}
      >
        {DETAIL_LABELS.szczegoly}
      </button>
    </div>
  )
}
