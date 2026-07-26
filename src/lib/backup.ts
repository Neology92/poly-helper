/**
 * Kopia zapasowa / przenośność danych (issue #12) — bez backendu.
 *
 * Zbiera wszystkie dane poly-helper z localStorage (profile Tabeli granic, Check-inu,
 * ustawienia gry itd.) do jednego pliku JSON i pozwala je z powrotem wczytać na tym
 * albo innym urządzeniu. Czysto lokalnie: plik powstaje i jest czytany po stronie klienta.
 *
 * `poly-helper:theme` jest pomijany celowo — to lokalna preferencja urządzenia, nie „dane".
 */

const PREFIX = 'poly-helper:'
const EXCLUDE = new Set([`${PREFIX}theme`])

/** Klucze store'ów typu „profile" (CopiesStore) — dla nich scalanie łączy profile po id. */
const PROFILE_STORES = [`${PREFIX}tabela-granic:v1`, `${PREFIX}check-in:v1`]

export interface BackupFile {
  app: 'poly-helper'
  kind: 'backup'
  version: 1
  exportedAt: string
  /** klucz localStorage → surowa wartość (string JSON). */
  data: Record<string, string>
}

export type ImportMode = 'replace' | 'merge'

export interface BackupSummary {
  keys: number
  profilesTabela: number
  profilesCheckin: number
  other: number
}

/** Wszystkie klucze poly-helper w localStorage (poza wykluczonymi), posortowane. */
function collectKeys(): string[] {
  const keys: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith(PREFIX) && !EXCLUDE.has(k)) keys.push(k)
  }
  return keys.sort()
}

/** Buduje obiekt kopii z bieżącego localStorage. */
export function buildBackup(nowIso: string): BackupFile {
  const data: Record<string, string> = {}
  for (const k of collectKeys()) {
    const v = localStorage.getItem(k)
    if (v != null) data[k] = v
  }
  return { app: 'poly-helper', kind: 'backup', version: 1, exportedAt: nowIso, data }
}

/** Ile profili (order.length) trzyma dany klucz-store. */
function countProfiles(data: Record<string, string>, key: string): number {
  try {
    const s = JSON.parse(data[key] ?? 'null')
    return Array.isArray(s?.order) ? s.order.length : 0
  } catch {
    return 0
  }
}

export function summarize(file: BackupFile): BackupSummary {
  const known = new Set(PROFILE_STORES)
  return {
    keys: Object.keys(file.data).length,
    profilesTabela: countProfiles(file.data, `${PREFIX}tabela-granic:v1`),
    profilesCheckin: countProfiles(file.data, `${PREFIX}check-in:v1`),
    other: Object.keys(file.data).filter((k) => !known.has(k)).length,
  }
}

/** Pobiera plik kopii (JSON). Zwraca podsumowanie tego, co zapisano. */
export function downloadBackup(nowIso: string): BackupSummary {
  const file = buildBackup(nowIso)
  const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `poly-helper-kopia_${file.exportedAt.slice(0, 10) || 'dane'}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
  return summarize(file)
}

/** Parsuje i waliduje plik kopii. Rzuca z czytelnym komunikatem, gdy to nie nasz plik. */
export function parseBackup(text: string): BackupFile {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error('Nie udało się odczytać pliku — to nie jest poprawny JSON.')
  }
  const p = parsed as Partial<BackupFile>
  if (
    p?.app !== 'poly-helper' ||
    p?.kind !== 'backup' ||
    p?.version !== 1 ||
    typeof p.data !== 'object' ||
    !p.data
  ) {
    throw new Error('To nie wygląda na plik kopii poly-helper.')
  }
  // Zatrzymaj tylko sensowne wpisy (klucz w naszej przestrzeni, wartość-string).
  const data: Record<string, string> = {}
  for (const [k, v] of Object.entries(p.data as Record<string, unknown>)) {
    if (typeof k === 'string' && k.startsWith(PREFIX) && !EXCLUDE.has(k) && typeof v === 'string') {
      data[k] = v
    }
  }
  return {
    app: 'poly-helper',
    kind: 'backup',
    version: 1,
    exportedAt: String(p.exportedAt ?? ''),
    data,
  }
}

function isCopiesStore(
  o: unknown,
): o is { activeId: string | null; order: string[]; docs: Record<string, unknown> } {
  const s = o as { order?: unknown; docs?: unknown }
  return !!s && typeof s === 'object' && Array.isArray(s.order) && !!s.docs && typeof s.docs === 'object'
}

/** Scalanie jednej wartości: dla store'ów-profili unia po id (istniejące wygrywa); inne — bez zmian. */
function mergeValue(existingRaw: string, incomingRaw: string): string {
  try {
    const a = JSON.parse(existingRaw)
    const b = JSON.parse(incomingRaw)
    if (isCopiesStore(a) && isCopiesStore(b)) {
      const docs = { ...b.docs, ...a.docs } // przy konflikcie id: lokalne (a) wygrywa
      const order = [...a.order, ...b.order.filter((id: string) => !a.order.includes(id))]
      return JSON.stringify({
        ...a,
        docs,
        order,
        activeId: a.activeId ?? b.activeId ?? order[0] ?? null,
      })
    }
  } catch {
    // uszkodzone dane — trzymaj istniejące
  }
  return existingRaw
}

/**
 * Zapisuje dane z kopii do localStorage.
 * - `replace`: nadpisuje klucze z pliku (istniejące, których nie ma w pliku, zostają).
 * - `merge`: scala profile (po id), inne klucze dodaje tylko gdy brak lokalnie.
 */
export function applyBackup(file: BackupFile, mode: ImportMode): void {
  for (const [key, rawValue] of Object.entries(file.data)) {
    if (mode === 'replace') {
      localStorage.setItem(key, rawValue)
      continue
    }
    const existing = localStorage.getItem(key)
    if (existing == null) {
      localStorage.setItem(key, rawValue)
    } else {
      localStorage.setItem(key, mergeValue(existing, rawValue))
    }
  }
}

/** Podsumowanie bieżącego stanu (do pokazania „co masz teraz"). */
export function currentSummary(): BackupSummary {
  return summarize(buildBackup(''))
}
