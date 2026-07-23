import { useState } from 'react'
import type { Version } from './model'

/**
 * Wspólna „historia zmian" — pokazuje, że umowa jest żywa/wersjonowana.
 * „Zapisz wersję" robi datowany snapshot; wpisy można przywrócić lub usunąć.
 */
export function VersionHistory<T>({
  versions,
  onSave,
  onRestore,
  onDelete,
  summarize,
}: {
  versions: Version<T>[]
  onSave: (label: string) => void
  onRestore: (id: string) => void
  onDelete: (id: string) => void
  summarize: (snapshot: T) => string
}) {
  const [label, setLabel] = useState('')

  return (
    <section className="proto-history" aria-label="Historia wersji">
      <h3 className="proto-history__title">Historia wersji</h3>
      <p className="proto-history__hint">
        Zapisz wersję ustaleń, gdy coś renegocjujecie — będzie widać, co i kiedy się zmieniło.
      </p>
      <div className="proto-history__save">
        <input
          className="proto-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="etykieta wersji (opcjonalnie), np. po rozmowie 07.2026"
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

      {versions.length === 0 ? (
        <p className="proto-empty">Brak zapisanych wersji.</p>
      ) : (
        <ol className="proto-versions">
          {versions.map((v) => (
            <li key={v.id} className="proto-version">
              <div className="proto-version__head">
                <time className="proto-version__date">{v.date}</time>
                {v.label && <span className="proto-version__label">{v.label}</span>}
                <span className="proto-version__actions">
                  <button
                    type="button"
                    className="proto-linkbtn"
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
                    className="proto-linkbtn proto-linkbtn--danger"
                    onClick={() => onDelete(v.id)}
                  >
                    Usuń
                  </button>
                </span>
              </div>
              <p className="proto-version__summary">{summarize(v.snapshot)}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
