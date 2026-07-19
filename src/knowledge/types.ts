import type { ComponentType, LazyExoticComponent } from 'react'

/**
 * Model treści „Wiedza" — artykuły (odrębne od narzędzi).
 * Analogiczny mechanizm do rejestru narzędzi: leniwie ładowany komponent per artykuł.
 */
export interface ArticleMeta {
  /** Stabilny identyfikator: część URL-a (/w/<slug>). */
  slug: string
  /** Tytuł artykułu. */
  title: string
  /** Jednozdaniowe streszczenie na kartę. */
  summary: string
  /** Emoji/znak jako ikona karty. */
  icon?: string
  /** Szacowany czas czytania (min). */
  readingMinutes?: number
}

export interface Article {
  meta: ArticleMeta
  Component: LazyExoticComponent<ComponentType>
}
