import { useState } from 'react'
import { POZIOMY, poziomLabel, type MenuItem, type Poziom, type Wersja } from './model'

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

/** Grupa jednej kategorii menu: pozycje × poziom + notka, z dodawaniem własnych. */
export function MenuGroup({
  kategoria,
  items,
  onPatch,
  onRemove,
  onAdd,
}: {
  kategoria: string
  items: MenuItem[]
  onPatch: (id: string, patch: Partial<MenuItem>) => void
  onRemove: (id: string) => void
  onAdd: (label: string) => void
}) {
  const [nowa, setNowa] = useState('')
  return (
    <div className="umowa-group">
      <h3 className="umowa-group__title">{kategoria}</h3>
      <ul className="umowa-items">
        {items.map((it) => (
          <li key={it.id} className="umowa-item">
            <div className="umowa-item__row">
              <span className="umowa-item__label">{it.label}</span>
              <button
                type="button"
                className="umowa-linkbtn umowa-linkbtn--danger"
                onClick={() => onRemove(it.id)}
                aria-label={`Usuń pozycję ${it.label}`}
              >
                Usuń
              </button>
            </div>
            <LevelPicker
              value={it.poziom}
              onChange={(p) => onPatch(it.id, { poziom: p })}
              ariaLabel={`Poziom: ${it.label}`}
            />
            <input
              className="umowa-input umowa-input--note"
              value={it.note}
              onChange={(e) => onPatch(it.id, { note: e.target.value })}
              placeholder={it.poziom ? `Notatka (${poziomLabel(it.poziom)})…` : 'Notatka…'}
              aria-label={`Notatka: ${it.label}`}
            />
          </li>
        ))}
      </ul>
      <form
        className="umowa-additem"
        onSubmit={(e) => {
          e.preventDefault()
          if (nowa.trim()) {
            onAdd(nowa.trim())
            setNowa('')
          }
        }}
      >
        <input
          className="umowa-input"
          value={nowa}
          onChange={(e) => setNowa(e.target.value)}
          placeholder="+ dopisz własną pozycję…"
          aria-label={`Nowa pozycja w kategorii ${kategoria}`}
        />
        <button type="submit" className="btn btn--ghost" disabled={!nowa.trim()}>
          Dodaj
        </button>
      </form>
    </div>
  )
}

/** Historia wersji — „Zapisz wersję" (snapshot) + przywracanie/usuwanie. */
export function VersionHistory({
  wersje,
  onSave,
  onRestore,
  onDelete,
}: {
  wersje: Wersja[]
  onSave: (label: string) => void
  onRestore: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [label, setLabel] = useState('')
  return (
    <section className="umowa-history" aria-label="Historia wersji">
      <h2 className="umowa-history__title">Historia wersji</h2>
      <p className="umowa-history__hint">
        Zapisz wersję, gdy coś renegocjujecie — będzie widać, co i kiedy się zmieniło.
      </p>
      <div className="umowa-history__save">
        <input
          className="umowa-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="etykieta wersji (opcjonalnie)"
          aria-label="Etykieta wersji"
        />
        <button
          type="button"
          className="btn btn--solid"
          onClick={() => {
            onSave(label)
            setLabel('')
          }}
        >
          Zapisz wersję
        </button>
      </div>

      {wersje.length === 0 ? (
        <p className="umowa-empty">Brak zapisanych wersji.</p>
      ) : (
        <ol className="umowa-versions">
          {wersje.map((v) => {
            const wypelnione = v.snapshot.items.filter((it) => it.poziom !== '').length
            return (
              <li key={v.id} className="umowa-version">
                <div className="umowa-version__head">
                  <time className="umowa-version__date">{v.date}</time>
                  {v.label && <span className="umowa-version__label">{v.label}</span>}
                  <span className="umowa-version__actions">
                    <button
                      type="button"
                      className="umowa-linkbtn"
                      onClick={() => {
                        if (confirm('Przywrócić tę wersję? Bieżąca treść zostanie nadpisana.')) {
                          onRestore(v.id)
                        }
                      }}
                    >
                      Przywróć
                    </button>
                    <button
                      type="button"
                      className="umowa-linkbtn umowa-linkbtn--danger"
                      onClick={() => onDelete(v.id)}
                    >
                      Usuń
                    </button>
                  </span>
                </div>
                <p className="umowa-version__summary">
                  {wypelnione} pozycji · {v.snapshot.sections.length} sekcji tekstowych
                </p>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
