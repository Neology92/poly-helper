import { useState } from 'react'
import { newId } from '../../lib/copies'
import {
  KATEGORIE,
  emptyDocD,
  normDocD,
  type DocD,
  type DocDSnapshot,
  type ItemB,
  type Poziom,
  type SectionA,
} from './model'
import { useVersioned } from './useVersioned'
import { VersionHistory } from './VersionHistory'
import { CategoryGroup } from './VariantB'

type Tryb = 'prowadzony' | 'wolny'

/**
 * Wariant D — kandydat na docelowe narzędzie. Domyślnie PROWADZI (menu z poziomami),
 * żeby nowe osoby nie startowały z pustej kartki. Przełącznik włącza TRYB WOLNY (proza,
 * praktycznie pusta kartka) dla osób, które wiedzą, czego chcą. Dane obu trybów współistnieją
 * i wchodzą do wspólnej historii wersji.
 */
export function VariantD() {
  const { doc, update, saveVersion, restoreVersion, deleteVersion } = useVersioned<DocD, DocDSnapshot>(
    'poly-helper:proto-umowa:D:v1',
    emptyDocD,
    normDocD,
    (d) => ({ items: d.items, sections: d.sections }),
    (d, snap) => ({ ...d, items: snap.items, sections: snap.sections }),
  )
  const [tryb, setTryb] = useState<Tryb>('prowadzony')

  // --- menu (pozycje) ---
  const patchItem = (id: string, patch: Partial<ItemB>) =>
    update((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) }))
  const removeItem = (id: string) =>
    update((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }))
  const addItem = (kategoria: string, label: string) =>
    update((d) => ({
      ...d,
      items: [...d.items, { id: newId(), kategoria, label, poziom: '' as Poziom, note: '' }],
    }))

  // --- wolne sekcje ---
  const addSection = (title: string) =>
    update((d) => ({ ...d, sections: [...d.sections, { id: newId(), title, body: '' }] }))
  const patchSection = (id: string, patch: Partial<SectionA>) =>
    update((d) => ({
      ...d,
      sections: d.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  const removeSection = (id: string) =>
    update((d) => ({ ...d, sections: d.sections.filter((s) => s.id !== id) }))

  const kategorie = [
    ...KATEGORIE.filter((k) => doc.items.some((it) => it.kategoria === k)),
    ...[...new Set(doc.items.map((it) => it.kategoria))].filter((k) => !KATEGORIE.includes(k)),
  ]
  const usedTitles = new Set(doc.sections.map((s) => s.title))
  const filledItems = doc.items.filter((it) => it.poziom !== '').length

  return (
    <div className="proto-cols">
      <section className="proto-main" aria-label="Umowa — miks prowadzony i wolny">
        {/* Wprowadzenie dla początkujących */}
        <div className="proto-intro">
          <p>
            <strong>Nie wiesz, od czego zacząć?</strong> Żywa umowa to po prostu spisane ustalenia —
            o czym się umawiacie w relacji. Nie musi być idealna ani kompletna; wracacie do niej,
            gdy coś się zmienia.
          </p>
          <p className="proto-intro__how">
            Poniżej lista gotowych tematów. Przy każdym zaznacz, czego chcesz:{' '}
            <em>Tak / Może / W przyszłości / Nie / Granica</em> — i dopisz notkę, jeśli trzeba.
            Wypełnij tyle, ile pasuje.
          </p>
        </div>

        {/* Przełącznik trybu */}
        <div className="proto-mode" role="tablist" aria-label="Tryb wypełniania">
          <button
            type="button"
            role="tab"
            aria-selected={tryb === 'prowadzony'}
            className={`proto-mode__btn ${tryb === 'prowadzony' ? 'is-active' : ''}`}
            onClick={() => setTryb('prowadzony')}
          >
            Prowadzony
            <span className="proto-mode__sub">menu z podpowiedziami</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tryb === 'wolny'}
            className={`proto-mode__btn ${tryb === 'wolny' ? 'is-active' : ''}`}
            onClick={() => setTryb('wolny')}
          >
            Wolny
            <span className="proto-mode__sub">pusta kartka, proza</span>
          </button>
        </div>

        {tryb === 'prowadzony' ? (
          <>
            {kategorie.map((kat) => (
              <CategoryGroup
                key={kat}
                kategoria={kat}
                items={doc.items.filter((it) => it.kategoria === kat)}
                onPatch={patchItem}
                onRemove={removeItem}
                onAdd={(label) => addItem(kat, label)}
              />
            ))}
            {doc.sections.length > 0 && (
              <p className="proto-modehint-inline">
                Masz też {doc.sections.length}{' '}
                {doc.sections.length === 1 ? 'sekcję' : 'sekcje/sekcji'} w trybie wolnym — przełącz
                wyżej, żeby je zobaczyć.
              </p>
            )}
          </>
        ) : (
          <div className="proto-freesections proto-freesections--solo">
            <p className="proto-lede">
              Czysta przestrzeń. Dodawaj własne sekcje i pisz ustalenia po swojemu — bez z góry
              narzuconej listy.
            </p>
            {doc.sections.map((s) => (
              <div key={s.id} className="proto-section">
                <div className="proto-section__head">
                  <input
                    className="proto-input proto-input--title"
                    value={s.title}
                    onChange={(e) => patchSection(s.id, { title: e.target.value })}
                    placeholder="Nazwa sekcji…"
                    aria-label="Nazwa sekcji"
                  />
                  <button
                    type="button"
                    className="proto-linkbtn proto-linkbtn--danger"
                    onClick={() => removeSection(s.id)}
                  >
                    Usuń
                  </button>
                </div>
                <textarea
                  className="proto-input proto-textarea"
                  rows={4}
                  value={s.body}
                  onChange={(e) => patchSection(s.id, { body: e.target.value })}
                  placeholder="Wasze ustalenia własnymi słowami…"
                  aria-label={`Treść sekcji ${s.title}`}
                />
              </div>
            ))}
            <div className="proto-buffet">
              <span className="proto-buffet__label">Dodaj sekcję:</span>
              <div className="proto-buffet__chips">
                {KATEGORIE.filter((k) => !usedTitles.has(k)).map((k) => (
                  <button
                    key={k}
                    type="button"
                    className="chip chip--soft"
                    onClick={() => addSection(k)}
                  >
                    + {k}
                  </button>
                ))}
                <button type="button" className="btn btn--ghost" onClick={() => addSection('')}>
                  + Pusta sekcja
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <aside className="proto-side">
        <VersionHistory
          versions={doc.versions}
          onSave={saveVersion}
          onRestore={restoreVersion}
          onDelete={deleteVersion}
          summarize={(snap) => {
            const w = snap.items.filter((it) => it.poziom !== '').length
            return `${w}/${snap.items.length} pozycji menu · ${snap.sections.length} sekcji tekstowych`
          }}
        />
        <p className="proto-side__now">
          Wypełnione: {filledItems} pozycji menu · {doc.sections.length} sekcji tekstowych.
        </p>
      </aside>
    </div>
  )
}
