import { lazy } from 'react'
import type { Tool } from './types'

/**
 * REJESTR NARZĘDZI — jedyne miejsce, które trzeba edytować, by dodać nowe narzędzie.
 *
 * Aby dodać narzędzie:
 *   1. Utwórz `src/tools/<slug>/index.tsx` z domyślnym eksportem komponentu-ekranu.
 *   2. Dopisz tu jeden wpis (meta + leniwy import).
 * Strona główna i routing zbudują się automatycznie z tej tablicy.
 */
export const tools: Tool[] = [
  {
    meta: {
      slug: 'tabela-granic',
      title: 'Tabela granic informowania',
      tagline:
        'Ustalcie razem, o czym z równoległych relacji chcecie się informować — i jak szczegółowo. W środku gra karciana, która wypełnia tabelę.',
      icon: '▦',
      status: 'ready',
      audience: ['poly'],
    },
    Component: lazy(() => import('./boundaries-table/index')),
  },
  {
    meta: {
      slug: 'check-in',
      title: 'Check-in relacyjny',
      tagline:
        'Regularna, zapisywana rozmowa: co działa, co poprawić, co razem ustalić.',
      icon: '🧭',
      status: 'ready',
      audience: ['poly', 'mono'],
    },
    Component: lazy(() => import('./check-in/index')),
  },
  {
    meta: {
      slug: 'umowa',
      title: 'Żywa umowa relacyjna',
      tagline:
        'Spiszcie ustalenia własnymi słowami — prowadzone menu albo pusta kartka. Z historią zmian.',
      icon: '📝',
      status: 'ready',
      audience: ['poly', 'mono'],
    },
    Component: lazy(() => import('./umowa/index')),
  },
]

/** Szybkie wyszukanie narzędzia po slug-u (dla routera). */
export function findTool(slug: string | undefined): Tool | undefined {
  return tools.find((t) => t.meta.slug === slug)
}
