import type { ComponentType, LazyExoticComponent } from 'react'

/** Dla kogo narzędzie jest przede wszystkim pomyślane. */
export type Audience = 'poly' | 'mono'

/** Etap gotowości narzędzia — steruje etykietami i dostępnością w UI. */
export type ToolStatus = 'ready' | 'wip' | 'planned'

/**
 * Metadane narzędzia — wszystko, czego strona główna i router potrzebują,
 * by wyświetlić i podlinkować narzędzie BEZ ładowania jego kodu.
 */
export interface ToolMeta {
  /** Stabilny identyfikator: część URL-a (/n/<slug>) i klucz w localStorage. */
  slug: string
  /** Nazwa wyświetlana. */
  title: string
  /** Jednozdaniowy opis na kartę na stronie głównej. */
  tagline: string
  /** Dłuższy opis (opcjonalny) — na stronę narzędzia. */
  description?: string
  /** Emoji lub krótki znak jako ikona karty. */
  icon?: string
  /** Etap gotowości. */
  status: ToolStatus
  /** Dla kogo (znaczniki na karcie). Domyślnie oba. */
  audience?: Audience[]
}

/**
 * Pełna definicja narzędzia. Komponent jest ładowany leniwie (code-splitting),
 * więc treść i logika jednego toola nie obciążają startu całej aplikacji.
 */
export interface Tool {
  meta: ToolMeta
  /** Leniwie ładowany komponent-ekran narzędzia. */
  Component: LazyExoticComponent<ComponentType>
}
