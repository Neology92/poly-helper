import type { BoundaryDocument } from '../../data'
import { emptyDocument } from '../../data'

/**
 * Warstwa zapisu tabeli granic informowania.
 *
 * Przechowuje WIELE egzemplarzy (jeden na „Osobę informowaną") w localStorage — bez konta,
 * offline. Cały stan jest w jednym kluczu jako jeden obiekt (mały wolumen danych).
 */

const STORAGE_KEY = 'poly-helper:tabela-granic:v1'

export interface StoredCopy {
  id: string
  updatedAt: number
  doc: BoundaryDocument
}

export interface CopiesStore {
  version: 1
  /** Aktywny egzemplarz (widoczny w edytorze). */
  activeId: string | null
  /** Kolejność wyświetlania egzemplarzy. */
  order: string[]
  docs: Record<string, StoredCopy>
}

export function newId(): string {
  // W środowisku przeglądarki dostępne; fallback na wypadek starszych silników.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function emptyStore(): CopiesStore {
  return { version: 1, activeId: null, order: [], docs: {} }
}

export function loadStore(): CopiesStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw) as CopiesStore
    if (parsed?.version !== 1 || typeof parsed.docs !== 'object' || !parsed.docs) {
      return emptyStore()
    }
    // Uzupełnij brakujące pola (odporność na częściowe/uszkodzone dane).
    return {
      version: 1,
      activeId: parsed.activeId ?? null,
      order: Array.isArray(parsed.order) ? parsed.order : Object.keys(parsed.docs),
      docs: parsed.docs,
    }
  } catch {
    return emptyStore()
  }
}

export function saveStore(store: CopiesStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // Brak miejsca lub tryb prywatny — dane po prostu się nie zapiszą. Nie przerywamy pracy.
  }
}

/** Tworzy nowy, pusty egzemplarz i ustawia go jako aktywny. */
export function createCopy(store: CopiesStore, now: number): CopiesStore {
  const id = newId()
  const copy: StoredCopy = { id, updatedAt: now, doc: emptyDocument() }
  return {
    ...store,
    activeId: id,
    order: [...store.order, id],
    docs: { ...store.docs, [id]: copy },
  }
}

/** Usuwa egzemplarz; jeśli był aktywny, aktywuje sąsiedni (albo null). */
export function deleteCopy(store: CopiesStore, id: string): CopiesStore {
  if (!store.docs[id]) return store
  const order = store.order.filter((x) => x !== id)
  const docs = { ...store.docs }
  delete docs[id]
  let activeId = store.activeId
  if (activeId === id) {
    const removedIndex = store.order.indexOf(id)
    activeId = order[removedIndex] ?? order[removedIndex - 1] ?? order[0] ?? null
  }
  return { ...store, activeId, order, docs }
}

/** Podmienia dokument aktywnego egzemplarza (immutable). */
export function updateActiveDoc(
  store: CopiesStore,
  now: number,
  updater: (doc: BoundaryDocument) => BoundaryDocument,
): CopiesStore {
  const id = store.activeId
  if (!id || !store.docs[id]) return store
  const current = store.docs[id]
  const nextDoc = updater(current.doc)
  return {
    ...store,
    docs: { ...store.docs, [id]: { ...current, doc: nextDoc, updatedAt: now } },
  }
}

export function setActive(store: CopiesStore, id: string): CopiesStore {
  if (!store.docs[id]) return store
  return { ...store, activeId: id }
}
