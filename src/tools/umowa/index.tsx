import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUmowa } from './useUmowa'
import { kategorieDoc, type UmowaDoc } from './model'
import { MenuGroup, VersionHistory } from './parts'
import { downloadUmowaPdf } from './pdf'
import './umowa.css'

type Tryb = 'prowadzony' | 'wolny'

function profileLabel(osoba: string, i: number): string {
  return osoba.trim() || `Relacja ${i + 1}`
}

/**
 * Żywa umowa relacyjna (#8) — edytowalny, wersjonowany dokument ustaleń.
 * Domyślnie PROWADZI (menu z neutralną skalą), z opcją TRYBU WOLNEGO (proza). Profile per osoba,
 * lokalnie, z historią wersji i eksportem PDF. Neutralnie: bez hierarchii/weta. Bez gamifikacji.
 */
export default function Umowa() {
  const c = useUmowa()
  const doc = c.activeDoc
  const [renaming, setRenaming] = useState(false)
  const [tryb, setTryb] = useState<Tryb>('prowadzony')
  const [pdfBusy, setPdfBusy] = useState(false)

  async function exportPdf(d: UmowaDoc) {
    setPdfBusy(true)
    try {
      await downloadUmowaPdf(d)
    } catch (err) {
      console.error('Nie udało się wygenerować PDF:', err)
      alert('Nie udało się wygenerować PDF. Spróbuj ponownie.')
    } finally {
      setPdfBusy(false)
    }
  }

  if (!doc) {
    return (
      <div className="umowa">
        <p>Ładowanie…</p>
      </div>
    )
  }

  const kategorie = kategorieDoc(doc.items)
  const usedTitles = new Set(doc.sections.map((s) => s.title))
  const filled = doc.items.filter((it) => it.poziom !== '').length

  return (
    <div className="umowa">
      <header className="umowa__head">
        <span className="badge badge--ready">Wypełnianie online</span>
        <h1>Żywa umowa relacyjna</h1>
        <p className="umowa__lede">
          Edytowalny, wersjonowany zapis Waszych ustaleń — zamiast dokumentu w chmurze.
          Konfigurowalny i neutralny (żadnej narzuconej hierarchii ani weta). Osobny profil dla każdej
          relacji; zmiany zapisują się na bieżąco w tej przeglądarce.
        </p>
        <p className="umowa__crosslink">
          Granice informowania ustalcie osobno w{' '}
          <Link to="/n/tabela-granic">Tabeli granic</Link> — ta umowa ich nie duplikuje.
        </p>
      </header>

      {/* Pasek profili */}
      <div className="copies" role="group" aria-label="Profile relacji">
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
                    placeholder={`Relacja ${i + 1}`}
                    aria-label="Nazwa relacji"
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
            + Nowa relacja
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

      <label className="umowa__note">
        <span>Notatka / kontekst (opcjonalnie)</span>
        <input
          value={doc.meta.notatka}
          onChange={(e) => c.setMeta('notatka', e.target.value)}
          placeholder="np. z kim, od kiedy, na co uważać…"
        />
      </label>

      <div className="umowa__cols">
        <section className="umowa__main" aria-label="Treść umowy">
          <div className="umowa-intro">
            <p>
              <strong>Nie wiesz, od czego zacząć?</strong> Żywa umowa to po prostu spisane ustalenia —
              o czym się umawiacie w relacji. Nie musi być idealna ani kompletna; wracacie do niej,
              gdy coś się zmienia.
            </p>
            <p className="umowa-intro__how">
              Poniżej lista gotowych tematów. Przy każdym zaznacz, czego chcesz:{' '}
              <em>Tak / Może / W przyszłości / Nie / Granica</em> — i dopisz notkę, jeśli trzeba.
              Wypełnij tyle, ile pasuje.
            </p>
          </div>

          <div className="umowa-mode" role="tablist" aria-label="Tryb wypełniania">
            <button
              type="button"
              role="tab"
              aria-selected={tryb === 'prowadzony'}
              className={`umowa-mode__btn ${tryb === 'prowadzony' ? 'is-active' : ''}`}
              onClick={() => setTryb('prowadzony')}
            >
              Prowadzony
              <span className="umowa-mode__sub">menu z podpowiedziami</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tryb === 'wolny'}
              className={`umowa-mode__btn ${tryb === 'wolny' ? 'is-active' : ''}`}
              onClick={() => setTryb('wolny')}
            >
              Wolny
              <span className="umowa-mode__sub">pusta kartka, proza</span>
            </button>
          </div>

          {tryb === 'prowadzony' ? (
            <>
              {kategorie.map((kat) => (
                <MenuGroup
                  key={kat}
                  kategoria={kat}
                  items={doc.items.filter((it) => it.kategoria === kat)}
                  onPatch={c.patchItem}
                  onRemove={c.removeItem}
                  onAdd={(label) => c.addItem(kat, label)}
                />
              ))}
              {doc.sections.length > 0 && (
                <p className="umowa-modehint">
                  Masz też {doc.sections.length}{' '}
                  {doc.sections.length === 1 ? 'sekcję' : 'sekcje/sekcji'} w trybie wolnym — przełącz
                  wyżej, żeby je zobaczyć.
                </p>
              )}
            </>
          ) : (
            <div className="umowa-free">
              <p className="umowa-free__lede">
                Czysta przestrzeń. Dodawaj własne sekcje i pisz ustalenia po swojemu — bez z góry
                narzuconej listy.
              </p>
              {doc.sections.map((s) => (
                <div key={s.id} className="umowa-section">
                  <div className="umowa-section__head">
                    <input
                      className="umowa-input umowa-input--title"
                      value={s.title}
                      onChange={(e) => c.patchSection(s.id, { title: e.target.value })}
                      placeholder="Nazwa sekcji…"
                      aria-label="Nazwa sekcji"
                    />
                    <button
                      type="button"
                      className="umowa-linkbtn umowa-linkbtn--danger"
                      onClick={() => c.removeSection(s.id)}
                    >
                      Usuń
                    </button>
                  </div>
                  <textarea
                    className="umowa-input umowa-textarea"
                    rows={4}
                    value={s.body}
                    onChange={(e) => c.patchSection(s.id, { body: e.target.value })}
                    placeholder="Wasze ustalenia własnymi słowami…"
                    aria-label={`Treść sekcji ${s.title}`}
                  />
                </div>
              ))}
              <div className="umowa-buffet">
                <span className="umowa-buffet__label">Dodaj sekcję:</span>
                <div className="umowa-buffet__chips">
                  {kategorieDoc(doc.items)
                    .filter((k) => !usedTitles.has(k))
                    .map((k) => (
                      <button
                        key={k}
                        type="button"
                        className="chip chip--soft"
                        onClick={() => c.addSection(k)}
                      >
                        + {k}
                      </button>
                    ))}
                  <button type="button" className="btn btn--ghost" onClick={() => c.addSection('')}>
                    + Pusta sekcja
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="umowa__side">
          <VersionHistory
            wersje={doc.wersje}
            onSave={c.saveWersja}
            onRestore={c.restoreWersja}
            onDelete={c.deleteWersja}
          />
          <div className="umowa__export">
            <p className="umowa__now">
              Wypełnione: {filled} pozycji menu · {doc.sections.length} sekcji.
            </p>
            <button
              type="button"
              className="btn btn--ghost"
              disabled={pdfBusy}
              onClick={() => exportPdf(doc)}
            >
              {pdfBusy ? 'Generuję…' : 'Pobierz PDF'}
            </button>
            <p className="umowa__saved" aria-live="polite">
              Zapisano lokalnie
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
