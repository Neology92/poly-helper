import { useMemo, useState } from 'react'
import { columns, copyHeaderFields, items } from '../../data'
import type { BoundaryDocument, CheckboxAnswer } from '../../data'
import { useCopies } from './useCopies'
import { ItemRow, CustomRowView } from './Row'
import { ScopePanel } from './ScopePanel'
import { downloadTablePdf } from './pdf'
import './table.css'

/** Etykieta profilu na pasku wyboru. */
function profileLabel(osoba: string, index: number): string {
  const trimmed = osoba.trim()
  return trimmed || `Profil ${index + 1}`
}

const ALL_NUMBERS = items.map((it) => it.number)

/**
 * Tabela granic informowania — interaktywna.
 * Wypełnianie online z autozapisem lokalnym (bez konta, offline). Obsługuje wiele PROFILI
 * (jeden na osobę partnerską) oraz checklistę zakresu (które pozycje są teraz w użyciu / w PDF).
 */
export default function BoundariesTable() {
  const c = useCopies()
  const doc = c.activeDoc
  const [pdfBusy, setPdfBusy] = useState<null | 'blank' | 'filled'>(null)
  const [focus, setFocus] = useState(false)
  const [onlySelectedPdf, setOnlySelectedPdf] = useState(false)
  const [renaming, setRenaming] = useState(false)

  const off = useMemo(() => new Set(doc?.deselected ?? []), [doc?.deselected])
  const selectedNumbers = useMemo(
    () => ALL_NUMBERS.filter((n) => !off.has(n)),
    [off],
  )
  const visibleItems = focus ? items.filter((it) => !off.has(it.number)) : items

  async function exportPdf(kind: 'blank' | 'filled', activeDoc: BoundaryDocument) {
    setPdfBusy(kind)
    try {
      const only = onlySelectedPdf ? selectedNumbers : undefined
      await downloadTablePdf(
        kind === 'blank' ? { kind: 'blank' } : { kind: 'filled', doc: activeDoc },
        only,
      )
    } catch (err) {
      console.error('Nie udało się wygenerować PDF:', err)
      alert('Nie udało się wygenerować PDF. Spróbuj ponownie.')
    } finally {
      setPdfBusy(null)
    }
  }

  if (!doc) {
    return (
      <div className="table-tool">
        <p>Ładowanie…</p>
      </div>
    )
  }

  return (
    <div className="table-tool">
      <header className="table-tool__head">
        <span className="badge badge--ready">Wypełnianie online</span>
        <h1>Tabela granic informowania</h1>
        <p className="table-tool__lede">
          Ustalcie razem, o czym z równoległych relacji chcecie się nawzajem informować — i jak
          szczegółowo. Osobny profil dla każdej osoby partnerskiej; zmiany zapisują się na bieżąco
          w tej przeglądarce.
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
                    value={doc.meta.osobaInformowana}
                    onChange={(e) => c.setMeta('osobaInformowana', e.target.value)}
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
                  {profileLabel(copy.doc.meta.osobaInformowana, i)}
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
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setRenaming(true)}
            >
              Zmień nazwę
            </button>
          )}
          {c.copies.length > 1 && c.activeId && (
            <button
              type="button"
              className="btn btn--danger-ghost"
              onClick={() => {
                if (confirm('Usunąć ten profil? Tej operacji nie da się cofnąć.')) {
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
      <div className="meta">
        <label className="meta__field meta__field--wide">
          <span>{copyHeaderFields.osobaInformowana}</span>
          <input
            value={doc.meta.osobaInformowana}
            onChange={(e) => c.setMeta('osobaInformowana', e.target.value)}
            placeholder="np. imię lub pseudonim osoby partnerskiej"
          />
        </label>
        <label className="meta__field">
          <span>{copyHeaderFields.data}</span>
          <input
            type="date"
            value={doc.meta.data}
            onChange={(e) => c.setMeta('data', e.target.value)}
          />
        </label>
        <label className="meta__field meta__field--wide">
          <span>{copyHeaderFields.notatka}</span>
          <input
            value={doc.meta.notatka}
            onChange={(e) => c.setMeta('notatka', e.target.value)}
            placeholder="kontekst, ustalenia dodatkowe…"
          />
        </label>
      </div>

      {/* Checklista zakresu */}
      <ScopePanel
        items={items}
        deselected={doc.deselected}
        onToggle={c.toggleItemScope}
        onSelectAll={() => c.setAllScope([])}
        onSelectNone={() => c.setAllScope(ALL_NUMBERS)}
        focus={focus}
        onFocusChange={setFocus}
      />

      {/* Tabela */}
      <div className="table" role="table" aria-label="Pozycje granic informowania">
        <div className="row row--header" role="row">
          <div className="cell cell--mustsay" title={columns.mustSay.hint}>
            {columns.mustSay.label}
          </div>
          <div className="cell cell--num">{columns.number.label}</div>
          <div className="cell cell--name">{columns.name.label}</div>
          <div className="cell cell--donttell" title={columns.dontTell.hint}>
            {columns.dontTell.label}
          </div>
          <div className="cell cell--heads" title={columns.headsUp.hint}>
            {columns.headsUp.label}
          </div>
          <div className="cell cell--after" title={columns.afterFact.hint}>
            {columns.afterFact.label}
          </div>
          <div className="cell cell--detail" title={columns.detail.hint}>
            {columns.detail.label}
          </div>
        </div>

        {visibleItems.map((item) => (
          <ItemRow
            key={item.number}
            item={item}
            answer={doc.answers[item.number]}
            onMustSay={(v) => c.setCheckbox(item.number, 'mustSay', v)}
            onCheckbox={(field, v) => c.setCheckbox(item.number, field, v)}
            onDetail={(level) => c.setDetail(item.number, level)}
            onFieldText={(text) => c.setFieldText(item.number, text)}
          />
        ))}

        {focus && visibleItems.length === 0 && (
          <p className="table__empty">Żadna pozycja nie jest w zakresie — zaznacz coś powyżej.</p>
        )}

        {doc.customRows.map((row, i) => (
          <CustomRowView
            key={row.id}
            row={row}
            index={i}
            onName={(name) => c.updateCustomRow(row.id, { name })}
            onCheckbox={(field, v) =>
              c.updateCustomRow(row.id, { answer: { [field]: v } as Partial<CheckboxAnswer> })
            }
            onDetail={(level) => c.updateCustomRow(row.id, { answer: { detail: level } })}
            onRemove={() => c.removeCustomRow(row.id)}
          />
        ))}
      </div>

      <div className="table-tool__foot">
        <button type="button" className="btn btn--ghost" onClick={c.addCustomRow}>
          + Dopisz własną pozycję
        </button>
        <p className="table-tool__saved" aria-live="polite">
          Zapisano lokalnie
        </p>
      </div>

      <div className="export">
        <div className="export__head">
          <div className="export__label">Pobierz PDF do druku</div>
          <label className="export__only">
            <input
              type="checkbox"
              checked={onlySelectedPdf}
              onChange={(e) => setOnlySelectedPdf(e.target.checked)}
            />
            Tylko wybrane pozycje ({selectedNumbers.length})
          </label>
        </div>
        <div className="export__actions">
          <button
            type="button"
            className="btn btn--ghost"
            disabled={pdfBusy !== null}
            onClick={() => exportPdf('blank', doc)}
          >
            {pdfBusy === 'blank' ? 'Generuję…' : 'Pusty szablon'}
          </button>
          <button
            type="button"
            className="btn btn--solid"
            disabled={pdfBusy !== null}
            onClick={() => exportPdf('filled', doc)}
          >
            {pdfBusy === 'filled' ? 'Generuję…' : 'Ten profil (wypełniony)'}
          </button>
        </div>
      </div>
    </div>
  )
}
