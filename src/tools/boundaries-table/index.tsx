import { columns, copyHeaderFields, items } from '../../data'
import type { CheckboxAnswer } from '../../data'
import { useCopies } from './useCopies'
import { ItemRow, CustomRowView } from './Row'
import './table.css'

/** Etykieta egzemplarza na pasku wyboru. */
function copyLabel(osoba: string, index: number): string {
  const trimmed = osoba.trim()
  return trimmed || `Egzemplarz ${index + 1}`
}

/**
 * Tabela granic informowania — interaktywna.
 * Wypełnianie online z autozapisem lokalnym (bez konta, offline). Obsługuje wiele egzemplarzy
 * (jeden na „Osobę informowaną"). Eksport do PDF dokładamy w kolejnym kroku.
 */
export default function BoundariesTable() {
  const c = useCopies()
  const doc = c.activeDoc

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
          szczegółowo. Wypełnia się osobny egzemplarz dla każdej osoby informowanej. Zmiany
          zapisują się na bieżąco w tej przeglądarce.
        </p>
      </header>

      {/* Pasek egzemplarzy */}
      <div className="copies" role="group" aria-label="Egzemplarze">
        <ul className="copies__list">
          {c.copies.map((copy, i) => (
            <li key={copy.id}>
              <button
                type="button"
                className={`chip ${copy.id === c.activeId ? 'is-active' : ''}`}
                aria-current={copy.id === c.activeId}
                onClick={() => c.selectCopy(copy.id)}
              >
                {copyLabel(copy.doc.meta.osobaInformowana, i)}
              </button>
            </li>
          ))}
        </ul>
        <div className="copies__actions">
          <button type="button" className="btn btn--ghost" onClick={c.addCopy}>
            + Nowy egzemplarz
          </button>
          {c.copies.length > 1 && c.activeId && (
            <button
              type="button"
              className="btn btn--danger-ghost"
              onClick={() => {
                if (confirm('Usunąć ten egzemplarz? Tej operacji nie da się cofnąć.')) {
                  c.removeCopy(c.activeId!)
                }
              }}
            >
              Usuń egzemplarz
            </button>
          )}
        </div>
      </div>

      {/* Nagłówek egzemplarza */}
      <div className="meta">
        <label className="meta__field meta__field--wide">
          <span>{copyHeaderFields.osobaInformowana}</span>
          <input
            value={doc.meta.osobaInformowana}
            onChange={(e) => c.setMeta('osobaInformowana', e.target.value)}
            placeholder="np. imię lub pseudonim osoby, dla której wypełniacie"
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

        {items.map((item) => (
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
    </div>
  )
}
