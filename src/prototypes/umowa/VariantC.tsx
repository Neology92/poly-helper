import { useState } from 'react'
import { newId } from '../../lib/copies'
import {
  KATEGORIE,
  emptyDocC,
  normDocC,
  type DocC,
  type ItemC,
  type Poziom,
  type SectionC,
} from './model'
import { useVersioned } from './useVersioned'
import { VersionHistory } from './VersionHistory'
import { LevelPicker } from './LevelPicker'

/**
 * Wariant C — „hybryda": sekcje (jak w A) zawierające pozycje-ustalenia z poziomem i notką (jak w B).
 */
export function VariantC() {
  const { doc, update, saveVersion, restoreVersion, deleteVersion } = useVersioned<DocC, SectionC[]>(
    'poly-helper:proto-umowa:C:v1',
    emptyDocC,
    normDocC,
    (d) => d.sections,
    (d, sections) => ({ ...d, sections }),
  )

  const patchSection = (id: string, patch: Partial<SectionC>) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  const removeSection = (id: string) =>
    update((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) }))
  const addSection = (title: string) =>
    update((d) => ({ ...d, sections: [...d.sections, { id: newId(), title, items: [] }] }))

  const patchItem = (sid: string, iid: string, patch: Partial<ItemC>) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) =>
        s.id === sid
          ? { ...s, items: s.items.map((it) => (it.id === iid ? { ...it, ...patch } : it)) }
          : s,
      ),
    }))
  const addItem = (sid: string, text: string) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) =>
        s.id === sid
          ? { ...s, items: [...s.items, { id: newId(), text, poziom: '' as Poziom, note: '' }] }
          : s,
      ),
    }))
  const removeItem = (sid: string, iid: string) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) =>
        s.id === sid ? { ...s, items: s.items.filter((it) => it.id !== iid) } : s,
      ),
    }))

  const usedTitles = new Set(doc.sections.map((s) => s.title))

  return (
    <div className="proto-cols">
      <section className="proto-main" aria-label="Umowa — sekcje z pozycjami">
        <p className="proto-lede">
          Sekcje jak w dokumencie, ale każda złożona z konkretnych pozycji — przy każdej neutralny
          poziom i notka. Coś pomiędzy swobodnym tekstem a menu.
        </p>

        {doc.sections.map((s) => (
          <SectionCard
            key={s.id}
            section={s}
            onTitle={(title) => patchSection(s.id, { title })}
            onRemove={() => removeSection(s.id)}
            onPatchItem={(iid, patch) => patchItem(s.id, iid, patch)}
            onRemoveItem={(iid) => removeItem(s.id, iid)}
            onAddItem={(text) => addItem(s.id, text)}
          />
        ))}

        <div className="proto-buffet">
          <span className="proto-buffet__label">Dodaj sekcję z bufetu:</span>
          <div className="proto-buffet__chips">
            {KATEGORIE.filter((k) => !usedTitles.has(k)).map((k) => (
              <button key={k} type="button" className="chip chip--soft" onClick={() => addSection(k)}>
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
          summarize={(snap) => {
            const poz = snap.reduce((n, s) => n + s.items.length, 0)
            return `${snap.length} sekcji · ${poz} pozycji`
          }}
        />
      </aside>
    </div>
  )
}

function SectionCard({
  section,
  onTitle,
  onRemove,
  onPatchItem,
  onRemoveItem,
  onAddItem,
}: {
  section: SectionC
  onTitle: (t: string) => void
  onRemove: () => void
  onPatchItem: (iid: string, patch: Partial<ItemC>) => void
  onRemoveItem: (iid: string) => void
  onAddItem: (text: string) => void
}) {
  const [nowa, setNowa] = useState('')
  return (
    <div className="proto-section">
      <div className="proto-section__head">
        <input
          className="proto-input proto-input--title"
          value={section.title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder="Nazwa sekcji…"
          aria-label="Nazwa sekcji"
        />
        <button type="button" className="proto-linkbtn proto-linkbtn--danger" onClick={onRemove}>
          Usuń sekcję
        </button>
      </div>

      <ul className="proto-items">
        {section.items.map((it) => (
          <li key={it.id} className="proto-item">
            <div className="proto-item__row">
              <input
                className="proto-input proto-input--itemtext"
                value={it.text}
                onChange={(e) => onPatchItem(it.id, { text: e.target.value })}
                placeholder="Ustalenie…"
                aria-label="Treść pozycji"
              />
              <button
                type="button"
                className="proto-linkbtn proto-linkbtn--danger"
                onClick={() => onRemoveItem(it.id)}
              >
                Usuń
              </button>
            </div>
            <LevelPicker
              value={it.poziom}
              onChange={(p) => onPatchItem(it.id, { poziom: p })}
              ariaLabel="Poziom pozycji"
            />
            <input
              className="proto-input proto-input--note"
              value={it.note}
              onChange={(e) => onPatchItem(it.id, { note: e.target.value })}
              placeholder="Notatka…"
              aria-label="Notatka pozycji"
            />
          </li>
        ))}
      </ul>

      <form
        className="proto-additem"
        onSubmit={(e) => {
          e.preventDefault()
          if (nowa.trim()) {
            onAddItem(nowa.trim())
            setNowa('')
          }
        }}
      >
        <input
          className="proto-input"
          value={nowa}
          onChange={(e) => setNowa(e.target.value)}
          placeholder="+ dopisz pozycję…"
          aria-label="Nowa pozycja w sekcji"
        />
        <button type="submit" className="btn btn--ghost" disabled={!nowa.trim()}>
          Dodaj
        </button>
      </form>
    </div>
  )
}
