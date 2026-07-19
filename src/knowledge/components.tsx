import type { ReactNode } from 'react'

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

/** Pozycja słowniczka. */
export function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{children}</dd>
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
