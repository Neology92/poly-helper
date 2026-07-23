import { useEffect, useRef, useState } from 'react'
import { newId } from '../../lib/copies'
import { loadDoc, saveDoc, today } from './storage'
import type { Version } from './model'

/** Głęboka kopia (snapshot musi być niezależny od bieżącego stanu). */
function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v)) as T
}

/**
 * Wspólny hook dla wariantów prototypu: autozapis do localStorage + wersjonowanie treści.
 * `getSnap`/`applySnap` mapują między dokumentem a jego migawką (fragmentem podlegającym wersjom).
 */
export function useVersioned<TDoc extends { versions: Version<TSnap>[] }, TSnap>(
  key: string,
  empty: () => TDoc,
  normalize: (d: unknown) => TDoc,
  getSnap: (d: TDoc) => TSnap,
  applySnap: (d: TDoc, snap: TSnap) => TDoc,
) {
  const [doc, setDoc] = useState<TDoc>(() => loadDoc(key, empty, normalize))

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    saveDoc(key, doc)
  }, [key, doc])

  const update = (fn: (d: TDoc) => TDoc) => setDoc(fn)

  const saveVersion = (label: string) =>
    setDoc((d) => ({
      ...d,
      versions: [
        { id: newId(), date: today(), label: label.trim(), snapshot: clone(getSnap(d)) },
        ...d.versions,
      ],
    }))

  const restoreVersion = (id: string) =>
    setDoc((d) => {
      const v = d.versions.find((x) => x.id === id)
      return v ? applySnap(d, clone(v.snapshot)) : d
    })

  const deleteVersion = (id: string) =>
    setDoc((d) => ({ ...d, versions: d.versions.filter((x) => x.id !== id) }))

  return { doc, update, saveVersion, restoreVersion, deleteVersion }
}
