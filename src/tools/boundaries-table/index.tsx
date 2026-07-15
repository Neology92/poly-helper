import { ToolPlaceholder } from '../../components/ToolPlaceholder'

/**
 * Tabela granic informowania — placeholder.
 *
 * Docelowo: interaktywna tabela (25 pozycji + puste wiersze) do wypełniania online
 * z zapisem lokalnym i eksportem do PDF (pusty szablon oraz wersja wypełniona).
 * Model danych i treści przenosimy z `poly-helper-dump.md` w kolejnym kroku.
 */
export default function BoundariesTable() {
  return (
    <ToolPlaceholder
      title="Tabela granic informowania"
      lede="Formularz do wspólnego ustalenia, o czym z równoległych relacji chcecie się nawzajem informować — i jak szczegółowo."
      points={[
        'Wypełnianie online z zapisem w tej przeglądarce (bez konta, offline).',
        'Eksport do PDF: pusty szablon do druku oraz wersja z Waszymi odpowiedziami.',
        '25 pozycji + puste wiersze na własne; pola tekstowe tam, gdzie „do ustalenia".',
      ]}
    />
  )
}
