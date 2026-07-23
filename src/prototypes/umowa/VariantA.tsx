import { newId } from '../../lib/copies'
import { KATEGORIE, emptyDocA, normDocA, type DocA, type SectionA } from './model'
import { useVersioned } from './useVersioned'
import { VersionHistory } from './VersionHistory'

/**
 * Wariant A — „dokument": konfigurowalne sekcje z wolnym tekstem.
 * Bufet gotowych tytułów sekcji (z RA Smorgasbord) do dodania jednym klikiem.
 */
export function VariantA() {
  const { doc, update, saveVersion, restoreVersion, deleteVersion } = useVersioned<DocA, SectionA[]>(
    'poly-helper:proto-umowa:A:v1',
    emptyDocA,
    normDocA,
    (d) => d.sections,
    (d, sections) => ({ ...d, sections }),
  )

  const addSection = (title: string) =>
    update((d) => ({ ...d, sections: [...d.sections, { id: newId(), title, body: '' }] }))
  const patchSection = (id: string, patch: Partial<SectionA>) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  const removeSection = (id: string) =>
    update((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) }))

  const usedTitles = new Set(doc.sections.map((s) => s.title))

  return (
    <div className="proto-cols">
      <section className="proto-main" aria-label="Umowa — sekcje">
        <p className="proto-lede">
          Dokument z sekcjami. W każdej wpisujecie własnymi słowami, na co się umawiacie. Dodawajcie,
          usuwajcie i zmieniajcie nazwy sekcji dowolnie — to Wasza umowa.
        </p>

        <div className="proto-sections">
          {doc.sections.map((s) => (
            <div key={s.id} className="proto-section">
              <div className="proto-section__head">
                <input
                  className="proto-input proto-input--title"
                  value={s.title}
                  onChange={(e) => patchSection(s.id, { title: e.target.value })}
                  placeholder="Nazwa sekcji…"
                  aria-label="Nazwa sekcji"
                />
                <button
                  type="button"
                  className="proto-linkbtn proto-linkbtn--danger"
                  onClick={() => removeSection(s.id)}
                >
                  Usuń
                </button>
              </div>
              <textarea
                className="proto-input proto-textarea"
                rows={3}
                value={s.body}
                onChange={(e) => patchSection(s.id, { body: e.target.value })}
                placeholder="Wasze ustalenia w tej sekcji…"
                aria-label={`Treść sekcji ${s.title}`}
              />
            </div>
          ))}
        </div>

        <div className="proto-buffet">
          <span className="proto-buffet__label">Dodaj sekcję z bufetu:</span>
          <div className="proto-buffet__chips">
            {KATEGORIE.filter((k) => !usedTitles.has(k)).map((k) => (
              <button
                key={k}
                type="button"
                className="chip chip--soft"
                onClick={() => addSection(k)}
              >
                + {k}
              </button>
            ))}
            <button type="button" className="btn btn--ghost" onClick={() => addSection('')}>
              + Własna sekcja
            </button>
          </div>
        </div>
      </section>

      <aside className="proto-side">
        <VersionHistory
          versions={doc.versions}
          onSave={saveVersion}
          onRestore={restoreVersion}
          onDelete={deleteVersion}
          summarize={(snap) => snap.map((s) => s.title || '(bez nazwy)').join(' · ') || 'pusto'}
        />
      </aside>
    </div>
  )
}
