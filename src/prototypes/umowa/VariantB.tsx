import { useState } from 'react'
import { newId } from '../../lib/copies'
import {
  KATEGORIE,
  emptyDocB,
  normDocB,
  poziomLabel,
  type DocB,
  type ItemB,
  type Poziom,
} from './model'
import { useVersioned } from './useVersioned'
import { VersionHistory } from './VersionHistory'
import { LevelPicker } from './LevelPicker'

/**
 * Wariant B — „menu": pozycje pogrupowane po kategoriach, przy każdej neutralny poziom + notka.
 * Można dopisać własne pozycje. Bliżej checklisty/menu niż dokumentu.
 */
export function VariantB() {
  const { doc, update, saveVersion, restoreVersion, deleteVersion } = useVersioned<DocB, ItemB[]>(
    'poly-helper:proto-umowa:B:v1',
    emptyDocB,
    normDocB,
    (d) => d.items,
    (d, items) => ({ ...d, items }),
  )

  const patchItem = (id: string, patch: Partial<ItemB>) =>
    update((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) }))
  const removeItem = (id: string) =>
    update((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }))
  const addItem = (kategoria: string, label: string) =>
    update((d) => ({
      ...d,
      items: [...d.items, { id: newId(), kategoria, label, poziom: '' as Poziom, note: '' }],
    }))

  // Grupowanie po kategoriach (kolejność wg KATEGORIE, z ewentualnymi dodatkowymi na końcu).
  const kategorie = [
    ...KATEGORIE.filter((k) => doc.items.some((it) => it.kategoria === k)),
    ...[...new Set(doc.items.map((it) => it.kategoria))].filter((k) => !KATEGORIE.includes(k)),
  ]

  return (
    <div className="proto-cols">
      <section className="proto-main" aria-label="Umowa — menu">
        <p className="proto-lede">
          Menu komponentów relacji. Przy każdej pozycji zaznaczcie, czego chcecie — neutralnie, bez
          hierarchii. Dopiszcie własne pozycje, gdy czegoś brakuje.
        </p>

        {kategorie.map((kat) => (
          <CategoryGroup
            key={kat}
            kategoria={kat}
            items={doc.items.filter((it) => it.kategoria === kat)}
            onPatch={patchItem}
            onRemove={removeItem}
            onAdd={(label) => addItem(kat, label)}
          />
        ))}
      </section>

      <aside className="proto-side">
        <VersionHistory
          versions={doc.versions}
          onSave={saveVersion}
          onRestore={restoreVersion}
          onDelete={deleteVersion}
          summarize={(snap) => {
            const wybrane = snap.filter((it) => it.poziom !== '')
            return wybrane.length
              ? `${wybrane.length} z ${snap.length} pozycji wypełnionych`
              : `${snap.length} pozycji, nic jeszcze nie zaznaczone`
          }}
        />
      </aside>
    </div>
  )
}

function CategoryGroup({
  kategoria,
  items,
  onPatch,
  onRemove,
  onAdd,
}: {
  kategoria: string
  items: ItemB[]
  onPatch: (id: string, patch: Partial<ItemB>) => void
  onRemove: (id: string) => void
  onAdd: (label: string) => void
}) {
  const [nowa, setNowa] = useState('')
  return (
    <div className="proto-group">
      <h3 className="proto-group__title">{kategoria}</h3>
      <ul className="proto-items">
        {items.map((it) => (
          <li key={it.id} className="proto-item">
            <div className="proto-item__row">
              <span className="proto-item__label">{it.label}</span>
              <button
                type="button"
                className="proto-linkbtn proto-linkbtn--danger"
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
              className="proto-input proto-input--note"
              value={it.note}
              onChange={(e) => onPatch(it.id, { note: e.target.value })}
              placeholder={it.poziom ? `Notatka (${poziomLabel(it.poziom)})…` : 'Notatka…'}
              aria-label={`Notatka: ${it.label}`}
            />
          </li>
        ))}
      </ul>
      <form
        className="proto-additem"
        onSubmit={(e) => {
          e.preventDefault()
          if (nowa.trim()) {
            onAdd(nowa.trim())
            setNowa('')
          }
        }}
      >
        <input
          className="proto-input"
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
