import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  applyBackup,
  currentSummary,
  downloadBackup,
  parseBackup,
  summarize,
  type BackupFile,
  type BackupSummary,
  type ImportMode,
} from '../lib/backup'
import './data-backup.css'

/** Krótki opis zawartości kopii. */
function summaryText(s: BackupSummary): string {
  const parts: string[] = []
  parts.push(`${s.profilesTabela} ${plural(s.profilesTabela, 'profil', 'profile', 'profili')} Tabeli granic`)
  parts.push(`${s.profilesCheckin} ${plural(s.profilesCheckin, 'profil', 'profile', 'profili')} Check-inu`)
  return parts.join(' · ')
}

function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one
  const t = n % 10
  const h = n % 100
  if (t >= 2 && t <= 4 && (h < 10 || h >= 20)) return few
  return many
}

/**
 * Strona „Kopia danych" (/dane) — eksport i import wszystkich danych poly-helper (issue #12).
 * Czysto lokalnie, bez konta. Służy do backupu i przenoszenia między urządzeniami.
 */
export function DataBackup() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [loaded, setLoaded] = useState<{ file: BackupFile; summary: BackupSummary } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)

  const now = currentSummary()

  function onExport() {
    setError(null)
    setDone(null)
    try {
      downloadBackup(new Date().toISOString())
    } catch {
      setError('Nie udało się przygotować pliku kopii.')
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    setDone(null)
    setLoaded(null)
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const parsed = parseBackup(text)
      setLoaded({ file: parsed, summary: summarize(parsed) })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udało się wczytać pliku.')
    }
  }

  function onImport(mode: ImportMode) {
    if (!loaded) return
    const czynność =
      mode === 'replace'
        ? 'Zastąpić dane na tym urządzeniu danymi z pliku? Bieżące wpisy o tych samych profilach zostaną nadpisane.'
        : 'Dołączyć profile z pliku do danych na tym urządzeniu? Istniejące profile zostaną zachowane.'
    if (!confirm(czynność)) return
    try {
      applyBackup(loaded.file, mode)
      setDone(
        mode === 'replace'
          ? 'Zaimportowano (zastąpiono). Wejdź w narzędzie, żeby zobaczyć dane.'
          : 'Zaimportowano (scalono). Wejdź w narzędzie, żeby zobaczyć dane.',
      )
      setLoaded(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch {
      setError('Nie udało się zapisać danych z kopii.')
    }
  }

  return (
    <div className="databackup">
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Strona główna
      </Link>

      <header className="databackup__head">
        <h1>Kopia danych</h1>
        <p className="databackup__lede">
          Wszystko, co wpisujesz w poly-helper, zostaje tylko w tej przeglądarce — nie ma konta ani
          chmury. Tutaj zrobisz kopię zapasową albo przeniesiesz dane na inne urządzenie.
        </p>
      </header>

      <div className="databackup__warn" role="note">
        <strong>Uwaga — wrażliwe dane.</strong> Plik kopii zawiera Wasze ustalenia oraz imiona lub
        pseudonimy osób partnerskich. Trzymaj go bezpiecznie i nie wysyłaj bez potrzeby.
      </div>

      <section className="databackup__card" aria-label="Eksport">
        <h2>Pobierz kopię</h2>
        <p className="databackup__now">Masz teraz: {summaryText(now)}.</p>
        <button type="button" className="btn btn--solid" onClick={onExport}>
          Pobierz kopię (.json)
        </button>
      </section>

      <section className="databackup__card" aria-label="Import">
        <h2>Wczytaj kopię</h2>
        <p className="databackup__hint">
          Wybierz wcześniej pobrany plik <code>.json</code>. Zobaczysz jego zawartość, zanim
          cokolwiek zapiszesz.
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="databackup__file"
          onChange={onFile}
          aria-label="Plik kopii"
        />

        {loaded && (
          <div className="databackup__preview">
            <p>
              Plik zawiera: <strong>{summaryText(loaded.summary)}</strong>
              {loaded.summary.other > 0 && <> · {loaded.summary.other} inne</>}.
            </p>
            <div className="databackup__actions">
              <button type="button" className="btn btn--solid" onClick={() => onImport('replace')}>
                Zastąp moje dane
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => onImport('merge')}>
                Dołącz (scal profile)
              </button>
            </div>
            <p className="databackup__modehint">
              <strong>Zastąp</strong> — nadpisuje dane z pliku (do przenoszenia na czyste urządzenie).{' '}
              <strong>Dołącz</strong> — dokłada profile z pliku, zachowując te, które już masz.
            </p>
          </div>
        )}
      </section>

      {error && (
        <p className="databackup__msg databackup__msg--error" role="alert">
          {error}
        </p>
      )}
      {done && (
        <p className="databackup__msg databackup__msg--ok" role="status">
          {done}
        </p>
      )}
    </div>
  )
}
