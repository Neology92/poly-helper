import { useMemo, useState } from 'react'
import { STATUS_LABEL, sortedGlossary, type GlossaryTerm } from '../glossary'
import './slownik.css'

/** Czy hasło pasuje do frazy wyszukiwania (hasło, warianty, ang., definicja). */
function matches(term: GlossaryTerm, q: string): boolean {
  if (!q) return true
  const hay = [term.headword, term.en ?? '', term.definition, ...(term.variants ?? [])]
    .join(' ')
    .toLowerCase()
  return hay.includes(q)
}

/**
 * Słowniczek (/w/slownik) — jedno miejsce z hasłami, z wyszukiwarką i kotwicami per hasło.
 * Renderuje się ze wspólnego modelu `src/knowledge/glossary.ts` (jedno źródło prawdy).
 */
export default function Slownik() {
  const [query, setQuery] = useState('')
  const all = useMemo(() => sortedGlossary(), [])
  const q = query.trim().toLowerCase()
  const shown = useMemo(() => all.filter((t) => matches(t, q)), [all, q])

  return (
    <article className="slownik">
      <p className="slownik__eyebrow">Wiedza</p>
      <h1>Słowniczek</h1>
      <p className="slownik__lede">
        Krótkie wyjaśnienia pojęć z jednego miejsca. Przy wielu terminach polskie nazewnictwo nie jest
        jeszcze ustalone — zaznaczamy to i podajemy warianty. To materiał opisowy, nie „jedyna słuszna"
        wersja.
      </p>

      <div className="slownik__search">
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj hasła…"
          aria-label="Szukaj w słowniczku"
        />
        <span className="slownik__count" aria-live="polite">
          {shown.length} z {all.length}
        </span>
      </div>

      {shown.length === 0 ? (
        <p className="slownik__empty">Nie znaleziono hasła „{query}".</p>
      ) : (
        <dl className="slownik__list">
          {shown.map((t) => (
            <div key={t.slug} id={`haslo-${t.slug}`} className="slownik__entry">
              <dt className="slownik__term">
                <span className="slownik__headword">{t.headword}</span>
                {t.status && (
                  <span className={`slownik__status slownik__status--${t.status}`}>
                    {STATUS_LABEL[t.status]}
                  </span>
                )}
              </dt>
              <dd className="slownik__def">
                {(t.variants?.length || t.en) && (
                  <p className="slownik__variants">
                    {t.variants?.length ? <>też: {t.variants.join(', ')}</> : null}
                    {t.variants?.length && t.en ? ' · ' : null}
                    {t.en ? <>ang. {t.en}</> : null}
                  </p>
                )}
                <p className="slownik__text">{t.definition}</p>
                {t.note && <p className="slownik__note">Uwaga: {t.note}</p>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <p className="slownik__source">
        Werdykty, warianty i źródła zebrane są w repozytorium (
        <code>docs/research/polskie-nazewnictwo.md</code>). Nazewnictwo bywa dyskusyjne — jeśli coś
        brzmi nietrafnie, daj znać.
      </p>
    </article>
  )
}
