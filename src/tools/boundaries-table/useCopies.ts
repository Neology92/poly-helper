import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type {
  BoundaryDocument,
  CheckboxAnswer,
  CustomRow,
  DetailLevel,
  DocumentMeta,
  ItemAnswer,
} from '../../data'
import { emptyCheckboxAnswer } from '../../data'
import {
  createCopy,
  deleteCopy as deleteCopyFn,
  loadStore,
  newId,
  saveStore,
  setActive as setActiveFn,
  updateActiveDoc,
  type CopiesStore,
  type StoredCopy,
} from './storage'
import { normalizeAnswer, normalizeDocument } from './rules'

/** Znacznik czasu (wydzielony, by łatwo testować/mokować). */
const now = () => Date.now()

/**
 * Stan wszystkich egzemplarzy tabeli + akcje edycji aktywnego egzemplarza.
 * Autozapis do localStorage po każdej zmianie.
 */
export function useCopies() {
  const [store, setStore] = useState<CopiesStore>(() => {
    const raw = loadStore()
    // Normalizuj wczytane dokumenty pod reguły (spójność starszych zapisów).
    const loaded: CopiesStore = {
      ...raw,
      docs: Object.fromEntries(
        Object.entries(raw.docs).map(([id, c]) => [id, { ...c, doc: normalizeDocument(c.doc) }]),
      ),
    }
    // Zawsze miej przynajmniej jeden egzemplarz gotowy do wypełnienia.
    if (loaded.order.length === 0) return createCopy(loaded, now())
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
    saveStore(store)
  }, [store])

  const activeCopy: StoredCopy | null = store.activeId
    ? (store.docs[store.activeId] ?? null)
    : null
  const activeDoc: BoundaryDocument | null = activeCopy?.doc ?? null

  // --- zarządzanie egzemplarzami ---
  const addCopy = useCallback(() => setStore((s) => createCopy(s, now())), [])
  const removeCopy = useCallback((id: string) => setStore((s) => deleteCopyFn(s, id)), [])
  const selectCopy = useCallback((id: string) => setStore((s) => setActiveFn(s, id)), [])

  // --- edycja aktywnego dokumentu ---
  const patchDoc = useCallback(
    (updater: (doc: BoundaryDocument) => BoundaryDocument) =>
      setStore((s) => updateActiveDoc(s, now(), updater)),
    [],
  )

  const setMeta = useCallback(
    (field: keyof DocumentMeta, value: string) =>
      patchDoc((doc) => ({ ...doc, meta: { ...doc.meta, [field]: value } })),
    [patchDoc],
  )

  const patchAnswer = useCallback(
    (number: number, patch: (answer: ItemAnswer) => ItemAnswer) =>
      patchDoc((doc) => ({
        ...doc,
        answers: { ...doc.answers, [number]: patch(doc.answers[number]) },
      })),
    [patchDoc],
  )

  const setCheckbox = useCallback(
    (number: number, field: keyof Omit<CheckboxAnswer, 'detail'>, value: boolean) =>
      patchAnswer(number, (a) => normalizeAnswer({ ...(a as CheckboxAnswer), [field]: value })),
    [patchAnswer],
  )

  const setDetail = useCallback(
    (number: number, level: DetailLevel) =>
      patchAnswer(number, (a) => normalizeAnswer({ ...(a as CheckboxAnswer), detail: level })),
    [patchAnswer],
  )

  const setFieldText = useCallback(
    (number: number, text: string) => patchAnswer(number, () => ({ text })),
    [patchAnswer],
  )

  // --- własne wiersze (puste pozycje) ---
  const addCustomRow = useCallback(
    () =>
      patchDoc((doc) => ({
        ...doc,
        customRows: [...doc.customRows, { id: newId(), name: '', answer: emptyCheckboxAnswer() }],
      })),
    [patchDoc],
  )

  const updateCustomRow = useCallback(
    (id: string, patch: Partial<Pick<CustomRow, 'name'>> & { answer?: Partial<CheckboxAnswer> }) =>
      patchDoc((doc) => ({
        ...doc,
        customRows: doc.customRows.map((row) =>
          row.id === id
            ? {
                ...row,
                ...(patch.name !== undefined ? { name: patch.name } : {}),
                answer: patch.answer
                  ? normalizeAnswer({ ...row.answer, ...patch.answer })
                  : row.answer,
              }
            : row,
        ),
      })),
    [patchDoc],
  )

  const removeCustomRow = useCallback(
    (id: string) =>
      patchDoc((doc) => ({ ...doc, customRows: doc.customRows.filter((r) => r.id !== id) })),
    [patchDoc],
  )

  // --- zakres (checklista pozycji) ---
  const toggleItemScope = useCallback(
    (number: number) =>
      patchDoc((doc) => {
        const off = new Set(doc.deselected)
        if (off.has(number)) off.delete(number)
        else off.add(number)
        return { ...doc, deselected: [...off] }
      }),
    [patchDoc],
  )

  const setAllScope = useCallback(
    (numbers: number[]) => patchDoc((doc) => ({ ...doc, deselected: numbers })),
    [patchDoc],
  )

  const copies = useMemo(
    () => store.order.map((id) => store.docs[id]).filter(Boolean),
    [store.order, store.docs],
  )

  return {
    copies,
    activeId: store.activeId,
    activeDoc,
    addCopy,
    removeCopy,
    selectCopy,
    setMeta,
    setCheckbox,
    setDetail,
    setFieldText,
    addCustomRow,
    updateCustomRow,
    removeCustomRow,
    toggleItemScope,
    setAllScope,
  }
}
