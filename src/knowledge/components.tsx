import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { getTerm } from './glossary'

/**
 * Wspólne komponenty artykułów Wiedzy (przypis, pozycja słowniczka, karta mit→fakt).
 * Style w `src/components/article-page.css`.
 */

/** Odnośnik do przypisu (źródła) na dole artykułu. */
export function Ref({ n }: { n: number }) {
  return (
    <a className="ref" href={`#zrodlo-${n}`} aria-label={`Źródło ${n}`}>
      [{n}]
    </a>
  )
}

/** Pozycja słowniczka z dowolną treścią (gdy hasła nie ma w modelu). */
export function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  )
}

/**
 * Pozycja słowniczka renderowana ze WSPÓLNEGO modelu (`glossary.ts`) — jedno źródło prawdy.
 * Hasło linkuje do pełnego Słowniczka (kotwica). `children` (opcjonalne) dokłada np. przypis.
 */
export function GlossaryTerm({ slug, children }: { slug: string; children?: ReactNode }) {
  const t = getTerm(slug)
  if (!t) return null
  return (
    <div>
      <dt>
        <Link className="glossary__link" to={`/w/slownik#haslo-${t.slug}`}>
          {t.headword}
        </Link>
      </dt>
      <dd>
        {t.definition}
        {children ? <> {children}</> : null}
      </dd>
    </div>
  )
}

/** Karta „mit → fakt". */
export function Myth({ claim, children }: { claim: string; children: ReactNode }) {
  return (
    <div className="myth">
      <span className="myth__tag myth__tag--mit">Mit</span>
      <p className="myth__claim">„{claim}"</p>
      <span className="myth__tag myth__tag--fakt">Fakt</span>
      <p className="myth__fact">{children}</p>
    </div>
  )
}
