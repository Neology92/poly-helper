import { items, EMPTY_ROWS } from '../../data'
import './preview.css'

/**
 * Tabela granic informowania — na razie podgląd modelu danych (tylko do odczytu).
 *
 * Docelowo: interaktywna tabela do wypełniania online z zapisem lokalnym i eksportem PDF.
 * Ten ekran renderuje już KANONICZNE 25 pozycji z modelu (`src/data`), więc treść jest
 * podpięta — dokładamy warstwę wypełniania i eksportu w kolejnym kroku.
 */
export default function BoundariesTable() {
  return (
    <article className="bt">
      <span className="badge badge--wip">W budowie — podgląd treści</span>
      <h1>Tabela granic informowania</h1>
      <p className="bt__lede">
        Ustalcie razem, o czym z równoległych relacji chcecie się nawzajem informować — i jak
        szczegółowo. Poniżej pełna lista {items.length} pozycji z modelu. Wypełnianie online i
        eksport do PDF dokładamy w kolejnym kroku.
      </p>

      <ol className="bt__list">
        {items.map((item) => (
          <li key={item.number} className="bt__row">
            <span className="bt__num">{item.number}</span>
            <div className="bt__body">
              <p className="bt__name">
                {item.name}
                {item.kind === 'field' && <span className="bt__pill">do ustalenia</span>}
              </p>
              {item.clarification && <p className="bt__note">{item.clarification}</p>}
              {item.note && <p className="bt__note">{item.note}</p>}
              {item.kind === 'field' && <p className="bt__prompt">{item.fieldPrompt}</p>}
            </div>
          </li>
        ))}
      </ol>

      <p className="bt__footer">
        + {EMPTY_ROWS} puste wiersze na dopisanie własnych pozycji.
      </p>
    </article>
  )
}
