import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { makeCopiesStore, newId, type CopiesStore } from '../../lib/copies'
import {
  draftHasContent,
  emptyCheckinDoc,
  emptyEntry,
  normalizeCheckinDoc,
  type CheckinDoc,
  type CheckinEntry,
} from './model'

/** Znacznik czasu (wydzielony, by łatwo testować/mokować). */
const now = () => Date.now()
/** Dzisiejsza data w formacie YYYY-MM-DD (lokalna strefa). */
function today(): string {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

const store = makeCopiesStore<CheckinDoc>({
  storageKey: 'poly-helper:check-in:v1',
  emptyDoc: emptyCheckinDoc,
  normalize: normalizeCheckinDoc,
})

/**
 * Stan wszystkich profili check-inu + akcje edycji aktywnego profilu.
 * Autozapis do localStorage po każdej zmianie.
 */
export function useCheckins() {
  const [state, setState] = useState<CopiesStore<CheckinDoc>>(() => {
    const loaded = store.loadStore()
    // Zawsze miej przynajmniej jeden profil gotowy do wypełnienia.
    if (loaded.order.length === 0) return store.createCopy(loaded, now())
    if (!loaded.activeId || !loaded.docs[loaded.activeId]) {
      return { ...loaded, activeId: loaded.order[0] }
    }
    return loaded
  })

  // Autozapis (pomiń pierwszy render — stan właśnie wczytany z dysku).
  const firstRun = useRef(true)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    store.saveStore(state)
  }, [state])

  const activeCopy = state.activeId ? (state.docs[state.activeId] ?? null) : null
  const activeDoc: CheckinDoc | null = activeCopy?.doc ?? null

  // --- zarządzanie profilami ---
  const addCopy = useCallback(() => setState((s) => store.createCopy(s, now())), [])
  const removeCopy = useCallback((id: string) => setState((s) => store.deleteCopy(s, id)), [])
  const selectCopy = useCallback((id: string) => setState((s) => store.setActive(s, id)), [])

  const patchDoc = useCallback(
    (updater: (doc: CheckinDoc) => CheckinDoc) =>
      setState((s) => store.updateActiveDoc(s, now(), updater)),
    [],
  )

  const setMeta = useCallback(
    (field: keyof CheckinDoc['meta'], value: string) =>
      patchDoc((doc) => ({ ...doc, meta: { ...doc.meta, [field]: value } })),
    [patchDoc],
  )

  // --- edycja bieżącego szkicu ---
  const patchDraft = useCallback(
    (field: keyof Omit<CheckinEntry, 'id' | 'date'>, value: string) =>
      patchDoc((doc) => ({ ...doc, draft: { ...doc.draft, [field]: value } })),
    [patchDoc],
  )

  /** Zapisuje szkic jako wpis (data + id) na początek historii i czyści szkic. */
  const saveEntry = useCallback(
    () =>
      patchDoc((doc) => {
        if (!draftHasContent(doc.draft)) return doc
        const entry: CheckinEntry = { ...doc.draft, id: newId(), date: today() }
        return { ...doc, draft: emptyEntry(), entries: [entry, ...doc.entries] }
      }),
    [patchDoc],
  )

  const deleteEntry = useCallback(
    (id: string) =>
      patchDoc((doc) => ({ ...doc, entries: doc.entries.filter((e) => e.id !== id) })),
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
    patchDraft,
    saveEntry,
    deleteEntry,
  }
}
