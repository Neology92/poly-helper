import { useMemo, useState } from 'react'
import { useCheckins } from './useCheckins'
import {
  RADAR_FIELDS,
  TRIFORCE_OPTIONS,
  draftHasContent,
  type CheckinDoc,
  type CheckinEntry,
  type RadarKey,
  type TriforceCel,
} from './model'
import { downloadCheckinPdf } from './pdf'
import './check-in.css'

/** Etykieta profilu na pasku wyboru. */
function profileLabel(osoba: string, index: number): string {
  return osoba.trim() || `Profil ${index + 1}`
}

/** Ludzka etykieta celu Triforce (do historii/PDF). */
function celLabel(cel: TriforceCel): string | null {
  return TRIFORCE_OPTIONS.find((o) => o.value === cel)?.label ?? null
}

/** Sformatowana data (bez zależności od locale w teście). */
function formatDate(iso: string): string {
  return iso || '—'
}

/**
 * Check-in relacyjny — ustrukturyzowana, zapisywana rozmowa (styl RADAR).
 * Wypełnianie online z autozapisem lokalnym (bez konta, offline). Obsługuje wiele PROFILI
 * (jeden na osobę partnerską) oraz historię wpisów z datami. Bez gamifikacji.
 */
export default function CheckIn() {
  const c = useCheckins()
  const doc = c.activeDoc
  const [renaming, setRenaming] = useState(false)
  const [pdfBusy, setPdfBusy] = useState(false)

  const hasContent = useMemo(() => (doc ? draftHasContent(doc.draft) : false), [doc])

  async function exportPdf(activeDoc: CheckinDoc) {
    setPdfBusy(true)
    try {
      await downloadCheckinPdf(activeDoc)
    } catch (err) {
      console.error('Nie udało się wygenerować PDF:', err)
      alert('Nie udało się wygenerować PDF. Spróbuj ponownie.')
    } finally {
      setPdfBusy(false)
    }
  }

  if (!doc) {
    return (
      <div className="checkin">
        <p>Ładowanie…</p>
      </div>
    )
  }

  const draft = doc.draft

  return (
    <div className="checkin">
      <header className="checkin__head">
        <span className="badge badge--ready">Wypełnianie online</span>
        <h1>Check-in relacyjny</h1>
        <p className="checkin__lede">
          Regularna, spokojna rozmowa o tym, co działa, co uwiera i co ustalić — zapisywana, żeby
          było do czego wracać. Osobny profil dla każdej osoby partnerskiej; zmiany zapisują się na
          bieżąco w tej przeglądarce. To pomoc do rozmowy, nie ocena ani wynik.
        </p>
      </header>

      {/* Pasek profili */}
      <div className="copies" role="group" aria-label="Profile">
        <ul className="copies__list">
          {c.copies.map((copy, i) => {
            const active = copy.id === c.activeId
            if (active && renaming) {
              return (
                <li key={copy.id}>
                  {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
                  <input
                    className="chip chip-rename"
                    autoFocus
                    value={doc.meta.osoba}
                    onChange={(e) => c.setMeta('osoba', e.target.value)}
                    onBlur={() => setRenaming(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === 'Escape') {
                        e.preventDefault()
                        setRenaming(false)
                      }
                    }}
                    placeholder={`Profil ${i + 1}`}
                    aria-label="Nazwa profilu"
                  />
                </li>
              )
            }
            return (
              <li key={copy.id}>
                <button
                  type="button"
                  className={`chip ${active ? 'is-active' : ''}`}
                  aria-current={active}
                  onClick={() => c.selectCopy(copy.id)}
                  onDoubleClick={() => {
                    c.selectCopy(copy.id)
                    setRenaming(true)
                  }}
                  title="Kliknij, by wybrać · dwuklik, by zmienić nazwę"
                >
                  {profileLabel(copy.doc.meta.osoba, i)}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="copies__actions">
          <button type="button" className="btn btn--ghost" onClick={c.addCopy}>
            + Nowy profil
          </button>
          {c.activeId && (
            <button type="button" className="btn btn--ghost" onClick={() => setRenaming(true)}>
              Zmień nazwę
            </button>
          )}
          {c.copies.length > 1 && c.activeId && (
            <button
              type="button"
              className="btn btn--danger-ghost"
              onClick={() => {
                if (confirm('Usunąć ten profil wraz z historią? Tej operacji nie da się cofnąć.')) {
                  c.removeCopy(c.activeId!)
                }
              }}
            >
              Usuń profil
            </button>
          )}
        </div>
      </div>

      {/* Nagłówek profilu */}
      <label className="checkin__note">
        <span>Notatka / kontekst (opcjonalnie)</span>
        <input
          value={doc.meta.notatka}
          onChange={(e) => c.setMeta('notatka', e.target.value)}
          placeholder="np. rytm check-inów, na co uważać…"
        />
      </label>

      {/* Dwie kolumny na desktopie: formularz | historia */}
      <div className="checkin__cols">
        {/* Formularz RADAR */}
        <section className="checkin__form" aria-label="Nowy check-in">
          <h2 className="checkin__section-title">Nowy check-in</h2>

          <fieldset className="triforce">
            <legend>Cel tej rozmowy (opcjonalnie)</legend>
            <p className="triforce__hint">
              Zanim zaczniecie — nazwij, czego teraz potrzebujesz. Ułatwia słuchanie.
            </p>
            <div className="triforce__opts">
              {TRIFORCE_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`chip chip--soft ${draft.cel === o.value ? 'is-active' : ''}`}
                  aria-pressed={draft.cel === o.value}
                  onClick={() => c.patchDraft('cel', draft.cel === o.value ? '' : o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          {RADAR_FIELDS.map((f) => (
            <label key={f.key} className="field">
              <span className="field__label">{f.label}</span>
              <span className="field__hint">{f.hint}</span>
              <textarea
                className="field-input"
                rows={3}
                value={draft[f.key as RadarKey]}
                onChange={(e) => c.patchDraft(f.key as RadarKey, e.target.value)}
                placeholder="Wpiszcie tutaj…"
              />
            </label>
          ))}

          <label className="field field--inline">
            <span className="field__label">Następna randka?</span>
            <input
              type="date"
              value={draft.nastepnaRandka}
              onChange={(e) => c.patchDraft('nastepnaRandka', e.target.value)}
            />
          </label>

          <div className="checkin__form-foot">
            <button
              type="button"
              className="btn btn--solid"
              disabled={!hasContent}
              onClick={c.saveEntry}
              title={hasContent ? undefined : 'Najpierw coś wpisz'}
            >
              Zapisz check-in
            </button>
            <p className="checkin__saved" aria-live="polite">
              Zapisano lokalnie
            </p>
          </div>
        </section>

        {/* Historia */}
        <section className="checkin__history" aria-label="Historia check-inów">
          <div className="checkin__history-head">
            <h2 className="checkin__section-title">Historia wpisów</h2>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={pdfBusy || doc.entries.length === 0}
              onClick={() => exportPdf(doc)}
            >
              {pdfBusy ? 'Generuję…' : 'Pobierz PDF'}
            </button>
          </div>

          {doc.entries.length === 0 ? (
            <p className="checkin__empty">
              Jeszcze nie ma zapisanych check-inów. Wypełnij formularz i kliknij „Zapisz check-in".
            </p>
          ) : (
            <ol className="entries">
              {doc.entries.map((e) => (
                <EntryCard key={e.id} entry={e} onRemove={() => c.deleteEntry(e.id)} />
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  )
}

/** Pojedynczy zapisany check-in w historii. */
function EntryCard({ entry, onRemove }: { entry: CheckinEntry; onRemove: () => void }) {
  const cel = celLabel(entry.cel)
  const rows: { label: string; value: string }[] = [
    { label: 'Radość / co działa', value: entry.radosc },
    { label: 'Uznanie / wdzięczność', value: entry.uznanie },
    { label: 'Do poprawy / co uwiera', value: entry.doPoprawy },
    { label: 'Ustalenia / akcje', value: entry.ustalenia },
  ].filter((r) => r.value.trim())

  return (
    <li className="entry">
      <div className="entry__head">
        <time className="entry__date">{formatDate(entry.date)}</time>
        {cel && <span className="entry__cel">{cel}</span>}
        <button type="button" className="entry__remove" onClick={onRemove}>
          Usuń
        </button>
      </div>
      <dl className="entry__body">
        {rows.map((r) => (
          <div key={r.label} className="entry__row">
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
      {entry.nastepnaRandka.trim() && (
        <p className="entry__randka">Następna randka: {entry.nastepnaRandka}</p>
      )}
    </li>
  )
}
