import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { makeCopiesStore, newId, type CopiesStore } from '../../lib/copies'
import {
  emptyUmowaDoc,
  normalizeUmowaDoc,
  type MenuItem,
  type Poziom,
  type Sekcja,
  type UmowaDoc,
} from './model'

const nowMs = () => Date.now()
function today(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T
}

const store = makeCopiesStore<UmowaDoc>({
  storageKey: 'poly-helper:umowa:v1',
  emptyDoc: emptyUmowaDoc,
  normalize: normalizeUmowaDoc,
})

/** Stan profili „Żywej umowy" + akcje edycji aktywnego profilu. Autozapis lokalny. */
export function useUmowa() {
  const [state, setState] = useState<CopiesStore<UmowaDoc>>(() => {
    const loaded = store.loadStore()
    if (loaded.order.length === 0) return store.createCopy(loaded, nowMs())
    if (!loaded.activeId || !loaded.docs[loaded.activeId]) {
      return { ...loaded, activeId: loaded.order[0] }
    }
    return loaded
  })

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    store.saveStore(state)
  }, [state])

  const activeDoc: UmowaDoc | null = state.activeId ? (state.docs[state.activeId]?.doc ?? null) : null

  // profile
  const addCopy = useCallback(() => setState((s) => store.createCopy(s, nowMs())), [])
  const removeCopy = useCallback((id: string) => setState((s) => store.deleteCopy(s, id)), [])
  const selectCopy = useCallback((id: string) => setState((s) => store.setActive(s, id)), [])

  const patchDoc = useCallback(
    (updater: (doc: UmowaDoc) => UmowaDoc) =>
      setState((s) => store.updateActiveDoc(s, nowMs(), updater)),
    [],
  )

  const setMeta = useCallback(
    (field: keyof UmowaDoc['meta'], value: string) =>
      patchDoc((d) => ({ ...d, meta: { ...d.meta, [field]: value } })),
    [patchDoc],
  )

  // menu (pozycje)
  const patchItem = useCallback(
    (id: string, patch: Partial<MenuItem>) =>
      patchDoc((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) })),
    [patchDoc],
  )
  const removeItem = useCallback(
    (id: string) => patchDoc((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) })),
    [patchDoc],
  )
  const addItem = useCallback(
    (kategoria: string, label: string) =>
      patchDoc((d) => ({
        ...d,
        items: [...d.items, { id: newId(), kategoria, label, poziom: '' as Poziom, note: '' }],
      })),
    [patchDoc],
  )

  // sekcje wolne
  const addSection = useCallback(
    (title: string) =>
      patchDoc((d) => ({ ...d, sections: [...d.sections, { id: newId(), title, body: '' }] })),
    [patchDoc],
  )
  const patchSection = useCallback(
    (id: string, patch: Partial<Sekcja>) =>
      patchDoc((d) => ({
        ...d,
        sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      })),
    [patchDoc],
  )
  const removeSection = useCallback(
    (id: string) => patchDoc((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) })),
    [patchDoc],
  )

  // wersje
  const saveWersja = useCallback(
    (label: string) =>
      patchDoc((d) => ({
        ...d,
        wersje: [
          {
            id: newId(),
            date: today(),
            label: label.trim(),
            snapshot: clone({ items: d.items, sections: d.sections }),
          },
          ...d.wersje,
        ],
      })),
    [patchDoc],
  )
  const restoreWersja = useCallback(
    (id: string) =>
      patchDoc((d) => {
        const w = d.wersje.find((x) => x.id === id)
        return w ? { ...d, items: clone(w.snapshot.items), sections: clone(w.snapshot.sections) } : d
      }),
    [patchDoc],
  )
  const deleteWersja = useCallback(
    (id: string) => patchDoc((d) => ({ ...d, wersje: d.wersje.filter((x) => x.id !== id) })),
    [patchDoc],
  )

  const copies = useMemo(
    () => state.order.map((id) => state.docs[id]).filter(Boolean),
    [state.order, state.docs],
  )

  return {
    copies,
    activeId: state.activeId,
    activeDoc,
    addCopy,
    removeCopy,
    selectCopy,
    setMeta,
    patchItem,
    removeItem,
    addItem,
    addSection,
    patchSection,
    removeSection,
    saveWersja,
    restoreWersja,
    deleteWersja,
  }
}
