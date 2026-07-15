import { ToolPlaceholder } from '../../components/ToolPlaceholder'

/**
 * Gra karciana — placeholder.
 *
 * Docelowo: talia scenek czytanych na głos, mechanizm [imię]-pseudonimów,
 * karta = opis ogólny → strzałka → szczegóły. Wersja online do przeglądania kart
 * oraz eksport talii do PDF (grid 2×3 z crop marks). Treści z `poly-helper-dump.md`.
 */
export default function CardsGame() {
  return (
    <ToolPlaceholder
      title="Gra karciana"
      lede={
        'Talia scenek czytanych na głos „jakby wydarzyły się naprawdę” — pomaga poczuć, ile faktycznie chcesz usłyszeć, zanim zaznaczysz to w tabeli.'
      }
      points={[
        'Tryb online: przechodzenie przez karty scenka po scence, z ukrytymi szczegółami.',
        'Mechanizm pseudonimów [imię] — prawdziwe imiona nie padają.',
        'Eksport talii do PDF do druku (grid 2×3, znaczniki cięcia).',
      ]}
    />
  )
}
