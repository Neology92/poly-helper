import { useState } from 'react'
import type { BoundaryItem } from '../../data'

/**
 * Checklista zakresu — wybór, które pozycje są teraz uzupełniane/zmieniane w tabeli
 * i trafiają do eksportu PDF. Zaznaczenie = pozycja „w zakresie" (nie w `deselected`).
 * Dotyczy pozycji kanonicznych; wiersze własne są zawsze w zakresie.
 */
export function ScopePanel({
  items,
  deselected,
  onToggle,
  onSelectAll,
  onSelectNone,
  focus,
  onFocusChange,
}: {
  items: BoundaryItem[]
  deselected: number[]
  onToggle: (number: number) => void
  onSelectAll: () => void
  onSelectNone: () => void
  focus: boolean
  onFocusChange: (v: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const off = new Set(deselected)
  const selected = items.length - items.filter((it) => off.has(it.number)).length

  return (
    <section className="scope">
      <div className="scope__bar">
        <button
          type="button"
          className="scope__toggle"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '▾' : '▸'}</span> Zakres pozycji
          <span className="scope__count">
            {selected} z {items.length}
          </span>
        </button>

        <label className="scope__focus">
          <input
            type="checkbox"
            checked={focus}
            onChange={(e) => onFocusChange(e.target.checked)}
          />
          Pokaż w tabeli tylko wybrane
        </label>
      </div>

      {open && (
        <div className="scope__body">
          <p className="scope__hint">
            Zaznacz pozycje, którymi zajmujecie się teraz. Odznaczone można ukryć w tabeli i
            pominąć w PDF-ie. Wiersze własne są zawsze uwzględniane.
          </p>
          <div className="scope__actions">
            <button type="button" className="btn btn--ghost" onClick={onSelectAll}>
              Zaznacz wszystkie
            </button>
            <button type="button" className="btn btn--ghost" onClick={onSelectNone}>
              Odznacz wszystkie
            </button>
          </div>
          <ul className="scope__list">
            {items.map((it) => {
              const on = !off.has(it.number)
              return (
                <li key={it.number}>
                  <label className={`scope__item ${on ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={on} onChange={() => onToggle(it.number)} />
                    <span className="scope__num">{it.number}</span>
                    <span className="scope__name">{it.name}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
