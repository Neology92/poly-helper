/**
 * Generyczny magazyn „egzemplarzy" (profili) w localStorage — bez konta, offline.
 *
 * Wydzielony z boundaries-table/storage.ts i sparametryzowany po typie dokumentu `TDoc`,
 * żeby kolejne narzędzia (Check-in, w przyszłości żywa umowa) nie duplikowały tej samej
 * logiki profili + autozapisu. Cały stan jednego narzędzia to jeden klucz = jeden obiekt
 * (mały wolumen danych). Funkcje są czyste i niemutujące; znacznik czasu (`now`) wstrzykiwany.
 */

export interface StoredCopy<TDoc> {
  id: string
  updatedAt: number
  doc: TDoc
}

export interface CopiesStore<TDoc> {
  version: 1
  /** Aktywny egzemplarz (widoczny w edytorze). */
  activeId: string | null
  /** Kolejność wyświetlania egzemplarzy. */
  order: string[]
  docs: Record<string, StoredCopy<TDoc>>
}

export interface CopiesConfig<TDoc> {
  /** Klucz localStorage, np. `poly-helper:check-in:v1`. */
  storageKey: string
  /** Fabryka pustego dokumentu (nowy profil). */
  emptyDoc: () => TDoc
  /** Opcjonalna normalizacja przy wczytaniu (migracja bez podbijania wersji). */
  normalize?: (doc: TDoc) => TDoc
}

export function newId(): string {
  // W środowisku przeglądarki dostępne; fallback na wypadek starszych silników.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/**
 * Buduje zestaw funkcji magazynu dla konkretnego typu dokumentu.
 * Zwraca te same operacje, co dawne storage.ts tabeli — tyle że generyczne.
 */
export function makeCopiesStore<TDoc>(config: CopiesConfig<TDoc>) {
  const { storageKey, emptyDoc, normalize } = config

  function emptyStore(): CopiesStore<TDoc> {
    return { version: 1, activeId: null, order: [], docs: {} }
  }

  function loadStore(): CopiesStore<TDoc> {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return emptyStore()
      const parsed = JSON.parse(raw) as CopiesStore<TDoc>
      if (parsed?.version !== 1 || typeof parsed.docs !== 'object' || !parsed.docs) {
        return emptyStore()
      }
      const docs = normalize
        ? Object.fromEntries(
            Object.entries(parsed.docs).map(([id, c]) => [id, { ...c, doc: normalize(c.doc) }]),
          )
        : parsed.docs
      // Uzupełnij brakujące pola (odporność na częściowe/uszkodzone dane).
      return {
        version: 1,
        activeId: parsed.activeId ?? null,
        order: Array.isArray(parsed.order) ? parsed.order : Object.keys(docs),
        docs,
      }
    } catch {
      return emptyStore()
    }
  }

  function saveStore(store: CopiesStore<TDoc>): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(store))
    } catch {
      // Brak miejsca lub tryb prywatny — dane po prostu się nie zapiszą. Nie przerywamy pracy.
    }
  }

  /** Tworzy nowy, pusty egzemplarz i ustawia go jako aktywny. */
  function createCopy(store: CopiesStore<TDoc>, now: number): CopiesStore<TDoc> {
    const id = newId()
    const copy: StoredCopy<TDoc> = { id, updatedAt: now, doc: emptyDoc() }
    return {
      ...store,
      activeId: id,
      order: [...store.order, id],
      docs: { ...store.docs, [id]: copy },
    }
  }

  /** Usuwa egzemplarz; jeśli był aktywny, aktywuje sąsiedni (albo null). */
  function deleteCopy(store: CopiesStore<TDoc>, id: string): CopiesStore<TDoc> {
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
  function updateActiveDoc(
    store: CopiesStore<TDoc>,
    now: number,
    updater: (doc: TDoc) => TDoc,
  ): CopiesStore<TDoc> {
    const id = store.activeId
    if (!id || !store.docs[id]) return store
    const current = store.docs[id]
    const nextDoc = updater(current.doc)
    return {
      ...store,
      docs: { ...store.docs, [id]: { ...current, doc: nextDoc, updatedAt: now } },
    }
  }

  function setActive(store: CopiesStore<TDoc>, id: string): CopiesStore<TDoc> {
    if (!store.docs[id]) return store
    return { ...store, activeId: id }
  }

  return {
    emptyStore,
    loadStore,
    saveStore,
    createCopy,
    deleteCopy,
    updateActiveDoc,
    setActive,
  }
}
