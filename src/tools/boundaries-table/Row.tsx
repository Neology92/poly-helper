import type {
  BoundaryItem,
  CheckboxAnswer,
  CustomRow as CustomRowData,
  DetailLevel,
  FieldAnswer,
  FieldItem,
  ItemAnswer,
} from '../../data'
import { columns } from '../../data'
import { CheckToggle, DetailControl, Marker } from './controls'
import { rowFlags, type RowFlags } from './rules'

function isFieldAnswer(a: ItemAnswer): a is FieldAnswer {
  return 'text' in a
}

const HINT_DONT_TELL = 'Odznacz „nie mów mi o tym”, aby wybrać'
const HINT_NEED_TELLING =
  'Najpierw zaznacz, kiedy informować (może się wydarzyć / wydarzyło się)'

/** Podpowiedź dla zablokowanego must-say / poziomu szczegółu. */
function lockHint(flags: RowFlags): string {
  return flags.lockedByDontTell ? HINT_DONT_TELL : HINT_NEED_TELLING
}

/** Chipy sugestii wstawiające tekst do pola. */
function SuggestChips({ suggestions, onPick }: { suggestions: string[]; onPick: (s: string) => void }) {
  return (
    <div className="suggest">
      {suggestions.map((s) => (
        <button key={s} type="button" className="suggest__chip" onClick={() => onPick(s)}>
          {s}
        </button>
      ))}
    </div>
  )
}

/** Komórka „uwagi" (wolny tekst) — wspólna dla wszystkich wierszy. */
function UwagiCell({ value, onChange }: { value: string; onChange: (t: string) => void }) {
  return (
    <div className="cell cell--uwagi">
      <span className="cell__label">Uwagi</span>
      <textarea
        className="field-input"
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="uwagi…"
        aria-label="Uwagi"
      />
    </div>
  )
}

/** Zestaw kontrolek wspólny dla zwykłej pozycji i wiersza własnego. */
function CheckboxControls({
  answer,
  flags,
  onCheckbox,
  onDetail,
}: {
  answer: CheckboxAnswer
  flags: RowFlags
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail' | 'uwagi'>, v: boolean) => void
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
          disabled={!flags.canTell}
          hint={HINT_DONT_TELL}
        />
      </div>
      <div className="cell cell--after">
        <span className="cell__label">{columns.afterFact.label}</span>
        <CheckToggle
          active={answer.afterFact}
          onChange={(v) => onCheckbox('afterFact', v)}
          label={columns.afterFact.label}
          accent="teal"
          disabled={!flags.canTell}
          hint={HINT_DONT_TELL}
        />
      </div>
      <div className="cell cell--detail">
        <span className="cell__label">{columns.detail.label}</span>
        <DetailControl
          value={answer.detail}
          onChange={onDetail}
          disabled={!flags.canDetail}
          required={flags.detailRequired}
          hint={lockHint(flags)}
        />
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
  onUwagi,
}: {
  item: BoundaryItem
  answer: ItemAnswer
  onMustSay: (v: boolean) => void
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail' | 'uwagi'>, v: boolean) => void
  onDetail: (level: DetailLevel) => void
  onFieldText: (text: string) => void
  onUwagi: (text: string) => void
}) {
  const isField = item.kind === 'field'
  const checkAnswer = isFieldAnswer(answer) ? null : (answer as CheckboxAnswer)
  const flags = checkAnswer ? rowFlags(checkAnswer) : null

  return (
    <div className={`row ${isField ? 'row--field' : ''}`}>
      <div className="cell cell--mustsay">
        {checkAnswer && flags && (
          <>
            <span className="cell__label">{columns.mustSay.label}</span>
            <Marker
              glyph={columns.mustSay.glyph!}
              active={checkAnswer.mustSay}
              onChange={onMustSay}
              label={columns.mustSay.label}
              disabled={!flags.canMustSay}
              hint={lockHint(flags)}
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
            <span className="row__prompt">{(item as FieldItem).fieldPrompt}</span>
            {(item as FieldItem).suggestions && (
              <SuggestChips suggestions={(item as FieldItem).suggestions!} onPick={onFieldText} />
            )}
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
          answer={checkAnswer!}
          flags={flags!}
          onCheckbox={onCheckbox}
          onDetail={onDetail}
        />
      )}

      <UwagiCell value={answer.uwagi} onChange={onUwagi} />
    </div>
  )
}

/** Wiersz własny (dopisana pozycja) — typu checkbox albo field. */
export function CustomRowView({
  row,
  index,
  onName,
  onCheckbox,
  onDetail,
  onText,
  onUwagi,
  onRemove,
}: {
  row: CustomRowData
  index: number
  onName: (name: string) => void
  onCheckbox: (field: keyof Omit<CheckboxAnswer, 'detail' | 'uwagi'>, v: boolean) => void
  onDetail: (level: DetailLevel) => void
  onText: (text: string) => void
  onUwagi: (text: string) => void
  onRemove: () => void
}) {
  const isField = row.kind === 'field'
  const flags = isField ? null : rowFlags(row.answer)

  return (
    <div className={`row row--custom ${isField ? 'row--field' : ''}`}>
      <div className="cell cell--mustsay">
        {!isField && flags && (
          <>
            <span className="cell__label">{columns.mustSay.label}</span>
            <Marker
              glyph={columns.mustSay.glyph!}
              active={row.answer.mustSay}
              onChange={(v) => onCheckbox('mustSay', v)}
              label={columns.mustSay.label}
              disabled={!flags.canMustSay}
              hint={lockHint(flags)}
            />
          </>
        )}
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

      {isField ? (
        <div className="cell cell--fieldinput">
          <label>
            <textarea
              className="field-input"
              rows={2}
              value={row.text}
              onChange={(e) => onText(e.target.value)}
              placeholder="Wpiszcie tutaj…"
              aria-label="Treść pola"
            />
          </label>
        </div>
      ) : (
        <CheckboxControls
          answer={row.answer}
          flags={flags!}
          onCheckbox={onCheckbox}
          onDetail={onDetail}
        />
      )}

      <UwagiCell value={row.uwagi} onChange={onUwagi} />
    </div>
  )
}
