import { NAME_PLACEHOLDER } from './types'

/**
 * Podmienia placeholder [imię] na wybrany pseudonim.
 *
 * UWAGA: to prosta podmiana tekstowa — NIE odmienia przez przypadki. W wersji drukowanej
 * osoba czytająca odmienia [imię] naturalnie sama (dump §4.2). W wersji online wstawiamy
 * pseudonim w mianowniku; to świadome uproszczenie (patrz dług techniczny, dump §8 pyt. 1).
 * Gdy pseudonim jest pusty, zostawiamy widoczny placeholder.
 */
export function applyName(text: string, name: string | undefined | null): string {
  const trimmed = name?.trim()
  if (!trimmed) return text
  return text.split(NAME_PLACEHOLDER).join(trimmed)
}
