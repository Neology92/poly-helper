import { lazy } from 'react'
import type { Article } from './types'

/**
 * REJESTR WIEDZY — jedyne miejsce, by dodać artykuł.
 *
 * Aby dodać artykuł:
 *   1. Utwórz `src/knowledge/<slug>/index.tsx` z domyślnym eksportem komponentu.
 *   2. Dopisz tu jeden wpis (meta + leniwy import).
 * Sekcja „Wiedza" na stronie głównej i routing zbudują się z tej tablicy.
 */
export const articles: Article[] = [
  {
    meta: {
      slug: 'czym-jest-poliamoria',
      title: 'Czym jest poliamoria?',
      summary:
        'Wprowadzenie do poliamorii — co to znaczy, podstawowe pojęcia i najczęstsze mity w świetle badań.',
      icon: '❤',
      readingMinutes: 9,
    },
    Component: lazy(() => import('./czym-jest-poliamoria/index')),
  },
]

export function findArticle(slug: string | undefined): Article | undefined {
  return articles.find((a) => a.meta.slug === slug)
}
