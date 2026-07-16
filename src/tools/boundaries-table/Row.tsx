import type {
  BoundaryItem,
  CheckboxAnswer,
  CustomRow as CustomRowData,
  DetailLevel,
  FieldAnswer,
  ItemAnswer,
} from '../../data'
import { columns } from '../../data'
import { CheckToggle, DetailControl, Marker } from './controls'

function isFieldAnswer(a: ItemAnswer): a is FieldAnswer {
  return 'text' in a
}

/** Zestaw kontrolek wspólny dla zwykłej pozycji i wiersza własnego. */
function CheckboxControls({
  answer,
  onCheckbox,
  onDetail,
}: {
  answer: CheckboxAnswer
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail'>, v: boolean) => void
  onDetail: (level: DetailLevel) => void
}) {
  return (
    <>
      <div className="cell cell--donttell">
        <span className="cell__label">{columns.dontTell.label}</span>
        <Marker
          glyph={columns.dontTell.glyph!}
          active={answer.dontTell}
          onChange={(v) => onCheckbox('dontTell', v)}
          label={columns.dontTell.label}
          tone="danger"
        />
      </div>
      <div className="cell cell--heads">
        <span className="cell__label">{columns.headsUp.label}</span>
        <CheckToggle
          active={answer.headsUp}
          onChange={(v) => onCheckbox('headsUp', v)}
          label={columns.headsUp.label}
          accent="amber"
        />
      </div>
      <div className="cell cell--after">
        <span className="cell__label">{columns.afterFact.label}</span>
        <CheckToggle
          active={answer.afterFact}
          onChange={(v) => onCheckbox('afterFact', v)}
          label={columns.afterFact.label}
          accent="teal"
        />
      </div>
      <div className="cell cell--detail">
        <span className="cell__label">{columns.detail.label}</span>
        <DetailControl value={answer.detail} onChange={onDetail} />
      </div>
    </>
  )
}

/** Wiersz kanonicznej pozycji (checkbox lub field). */
export function ItemRow({
  item,
  answer,
  onMustSay,
  onCheckbox,
  onDetail,
  onFieldText,
}: {
  item: BoundaryItem
  answer: ItemAnswer
  onMustSay: (v: boolean) => void
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail'>, v: boolean) => void
  onDetail: (level: DetailLevel) => void
  onFieldText: (text: string) => void
}) {
  const isField = item.kind === 'field'

  return (
    <div className={`row ${isField ? 'row--field' : ''}`}>
      <div className="cell cell--mustsay">
        {!isField && (
          <>
            <span className="cell__label">{columns.mustSay.label}</span>
            <Marker
              glyph={columns.mustSay.glyph!}
              active={(answer as CheckboxAnswer).mustSay}
              onChange={onMustSay}
              label={columns.mustSay.label}
            />
          </>
        )}
      </div>

      <div className="cell cell--num" aria-hidden="true">
        {item.number}
      </div>

      <div className="cell cell--name">
        <p className="row__name">{item.name}</p>
        {item.clarification && <p className="row__note">{item.clarification}</p>}
        {item.note && <p className="row__note">{item.note}</p>}
      </div>

      {isFieldAnswer(answer) ? (
        <div className="cell cell--fieldinput">
          <label>
            <span className="row__prompt">{(item as { fieldPrompt: string }).fieldPrompt}</span>
            <textarea
              className="field-input"
              rows={2}
              value={answer.text}
              onChange={(e) => onFieldText(e.target.value)}
              placeholder="Wpiszcie tutaj…"
            />
          </label>
        </div>
      ) : (
        <CheckboxControls
          answer={answer as CheckboxAnswer}
          onCheckbox={onCheckbox}
          onDetail={onDetail}
        />
      )}
    </div>
  )
}

/** Wiersz własny (dopisana pozycja). */
export function CustomRowView({
  row,
  index,
  onName,
  onCheckbox,
  onDetail,
  onRemove,
}: {
  row: CustomRowData
  index: number
  onName: (name: string) => void
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail'>, v: boolean) => void
  onDetail: (level: DetailLevel) => void
  onRemove: () => void
}) {
  return (
    <div className="row row--custom">
      <div className="cell cell--mustsay">
        <span className="cell__label">{columns.mustSay.label}</span>
        <Marker
          glyph={columns.mustSay.glyph!}
          active={row.answer.mustSay}
          onChange={(v) => onCheckbox('mustSay', v)}
          label={columns.mustSay.label}
        />
      </div>

      <div className="cell cell--num" aria-hidden="true">
        •
      </div>

      <div className="cell cell--name">
        <input
          className="row__name-input"
          value={row.name}
          onChange={(e) => onName(e.target.value)}
          placeholder={`Własna pozycja ${index + 1}…`}
          aria-label={`Nazwa własnej pozycji ${index + 1}`}
        />
        <button type="button" className="row__remove" onClick={onRemove}>
          Usuń
        </button>
      </div>

      <CheckboxControls answer={row.answer} onCheckbox={onCheckbox} onDetail={onDetail} />
    </div>
  )
}
