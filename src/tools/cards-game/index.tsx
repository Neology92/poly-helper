import { useEffect, useMemo, useState } from 'react'
import { applyName, cardItems, columns } from '../../data'
import type { CheckboxAnswer, CheckboxItem, DetailLevel, ItemAnswer } from '../../data'
import { rowFlags } from '../boundaries-table/rules'
import { loadSettings, saveSettings } from './storage'
import { downloadDeckPdf } from './deckPdf'
import './game.css'

const CARDS = cardItems() as CheckboxItem[]

/** Tasowanie kopii tablicy (Fisher–Yates). W przeglądarce Math.random jest OK. */
function shuffled<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type Screen = 'intro' | 'cards' | 'checkout'

export interface CardsGameProps {
  /** Odpowiedzi aktywnego profilu tabeli (żeby pokazać stan i pozwolić go zmieniać w grze). */
  answers: Record<number, ItemAnswer>
  onCheckbox: (number: number, field: keyof Omit<CheckboxAnswer, 'detail' | 'uwagi'>, v: boolean) => void
  onDetail: (number: number, level: DetailLevel) => void
  /** Nazwa profilu, do którego trafiają odpowiedzi (informacyjnie). */
  profileName: string
}

/**
 * Gra karciana — tryb wypełniania Tabeli granic „przez rozmowę".
 * Scenki czytane na głos; po każdej od razu zaznaczacie odpowiedź, a ona zapisuje się
 * do wiersza tabeli aktywnego profilu. Zagranie w grę = wypełniona tabela.
 */
export default function CardsGame({ answers, onCheckbox, onDetail, profileName }: CardsGameProps) {
  const [screen, setScreen] = useState<Screen>('intro')
  const [pseudonim, setPseudonim] = useState('')
  const [stopSlowo, setStopSlowo] = useState('')
  const [order, setOrder] = useState<number[]>(() => CARDS.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [deckBusy, setDeckBusy] = useState(false)
  const [paused, setPaused] = useState(false)

  async function exportDeck() {
    setDeckBusy(true)
    try {
      await downloadDeckPdf()
    } catch (err) {
      console.error('Nie udało się wygenerować talii PDF:', err)
      alert('Nie udało się wygenerować talii PDF. Spróbuj ponownie.')
    } finally {
      setDeckBusy(false)
    }
  }

  // Wczytaj zapisane ustawienia (pseudonim, stop-słowo).
  useEffect(() => {
    const s = loadSettings()
    setPseudonim(s.pseudonim)
    setStopSlowo(s.stopSlowo)
  }, [])

  const card = CARDS[order[pos]]
  const progress = `${pos + 1} / ${CARDS.length}`

  /** Ile kart ma już jakąkolwiek odpowiedź w tabeli (postęp wypełniania, nie „wynik"). */
  const odpowiedziane = useMemo(
    () =>
      CARDS.filter((c) => {
        const a = answers[c.number] as CheckboxAnswer | undefined
        return a && (a.dontTell || a.headsUp || a.afterFact)
      }).length,
    [answers],
  )

  function start(shuffle: boolean) {
    saveSettings({ pseudonim, stopSlowo })
    setOrder(shuffle ? shuffled(CARDS.map((_, i) => i)) : CARDS.map((_, i) => i))
    setPos(0)
    setRevealed(false)
    setPaused(false)
    setScreen('cards')
  }

  function go(delta: number) {
    setPos((p) => Math.min(CARDS.length - 1, Math.max(0, p + delta)))
    setRevealed(false)
  }

  const name = useMemo(() => pseudonim.trim(), [pseudonim])

  if (screen === 'intro') {
    return (
      <div className="game">
        <p className="game__lede">
          Scenki czytane na głos „jakby wydarzyły się naprawdę". Pomagają poczuć, ile faktycznie
          chcesz usłyszeć — a Wasze odpowiedzi <strong>zapisują się od razu do tabeli</strong>.
          Zagranie w grę to po prostu inny sposób jej wypełnienia.
        </p>

        <ol className="rules">
          <li>Jedna osoba czyta kartę na głos, w pierwszej osobie — jakby to się właśnie stało.</li>
          <li>Najpierw sam opis ogólny. Potem osoba słuchająca decyduje, czy chce szczegóły.</li>
          <li>Od razu pod kartą zaznaczacie odpowiedź — trafia do wiersza tabeli.</li>
          <li>Nie ma złych odpowiedzi. Przy każdej karcie można się zatrzymać i porozmawiać.</li>
        </ol>

        <p className="game__target">
          Odpowiedzi trafią do profilu: <strong>{profileName}</strong> · wypełnione{' '}
          {odpowiedziane} z {CARDS.length} kart.
        </p>

        <label className="game__field">
          <span>Pseudonim za „[imię]"</span>
          <input
            value={pseudonim}
            onChange={(e) => setPseudonim(e.target.value)}
            placeholder="np. Kamil"
            aria-describedby="pseudonim-hint"
          />
        </label>
        <p id="pseudonim-hint" className="game__hint">
          Ustalcie pseudonim dla osoby z Twojej równoległej relacji. Prawdziwe imię nie musi padać
          — w kartach w miejsce „[imię]" pojawi się ten pseudonim.
        </p>

        {/* Rama bezpieczeństwa (check-in): gra bywa intensywna — warto się umówić na zasady. */}
        <section className="safety" aria-label="Zanim zaczniecie">
          <h2 className="safety__title">Zanim zaczniecie</h2>
          <ul className="safety__list">
            <li>
              <strong>Umówcie się na stop-słowo.</strong> Kiedy padnie, przerywacie od razu — bez
              tłumaczenia się i bez dyskusji.
            </li>
            <li>
              <strong>Można przerwać w każdej chwili.</strong> Przycisk „Pauza" jest zawsze pod ręką;
              nie trzeba przechodzić całej talii za jednym razem.
            </li>
            <li>
              <strong>Trudne emocje to normalne.</strong> Scenki bywają poruszające — to nie znaczy,
              że coś poszło źle. Zatrzymajcie się i porozmawiajcie.
            </li>
            <li>
              <strong>Nie ma złych odpowiedzi.</strong> Odpowiadacie za siebie, nie „jak wypada".
            </li>
          </ul>
          <label className="game__field">
            <span>Nasze stop-słowo (opcjonalnie)</span>
            <input
              value={stopSlowo}
              onChange={(e) => setStopSlowo(e.target.value)}
              placeholder="np. pauza, ananas…"
            />
          </label>
        </section>

        <div className="game__actions">
          <button type="button" className="btn btn--solid" onClick={() => start(false)}>
            Zacznij po kolei
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => start(true)}>
            Potasuj i zacznij
          </button>
        </div>

        <div className="game__print">
          <div>
            <div className="game__print-title">Wolicie na papierze?</div>
            <p className="game__print-desc">
              Pobierz całą talię (29 kart, 5×A4, grid 2×3 ze znacznikami cięcia). Karty są
              wielokrotnego użytku — pseudonim „[imię]" wpisujecie kartą „Imiona na czas gry".
            </p>
          </div>
          <button type="button" className="btn btn--ghost" disabled={deckBusy} onClick={exportDeck}>
            {deckBusy ? 'Generuję…' : 'Pobierz talię PDF'}
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'checkout') {
    return (
      <div className="game">
        <section className="checkout" aria-label="Check-out">
          <h2 className="checkout__title">Na koniec — zatrzymajcie się na chwilę</h2>
          <p className="checkout__lede">
            Rozmowa o granicach potrafi poruszyć. Zanim wrócicie do zwykłego dnia, zamknijcie ją
            świadomie.
          </p>
          <ul className="checkout__list">
            <li>Jak się teraz czujecie? Co było najtrudniejsze, a co ulżyło?</li>
            <li>Czy coś wymaga jeszcze rozmowy — teraz albo umówionej na później?</li>
            <li>Powiedzcie sobie coś dobrego. To była wspólna praca, nie egzamin.</li>
            <li>Ustalenia nie są na zawsze — wracacie do nich, gdy coś się zmieni.</li>
          </ul>
          <p className="checkout__saved">
            Wasze odpowiedzi są już w tabeli (profil <strong>{profileName}</strong>) — wypełnione{' '}
            {odpowiedziane} z {CARDS.length} kart.
          </p>
          <div className="game__actions">
            <button type="button" className="btn btn--solid" onClick={() => setScreen('intro')}>
              Wróć do ustawień gry
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game__topbar">
        <button type="button" className="link-btn" onClick={() => setScreen('intro')}>
          <span aria-hidden="true">←</span> Ustawienia
        </button>
        <span className="game__topbar__right">
          <span className="game__progress" aria-live="polite">
            {progress}
          </span>
          <button type="button" className="btn btn--ghost btn--small" onClick={() => setPaused(true)}>
            Pauza
          </button>
        </span>
      </div>

      {paused && (
        <section className="pause" aria-label="Pauza">
          <p className="pause__title">Zatrzymane. Nie musicie kontynuować.</p>
          <p className="pause__text">
            {stopSlowo.trim()
              ? `Wasze stop-słowo: „${stopSlowo.trim()}". `
              : ''}
            Odpowiedzi, które już zaznaczyliście, są zapisane. Możecie wrócić do gry teraz albo
            kiedy indziej.
          </p>
          <div className="game__actions">
            <button type="button" className="btn btn--solid" onClick={() => setPaused(false)}>
              Wracamy do gry
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setPaused(false)
                setScreen('checkout')
              }}
            >
              Kończymy na dziś
            </button>
          </div>
        </section>
      )}

      <article className="card" aria-label={`Karta ${card.number}: ${card.name}`}>
        <p className="card__general">{applyName(card.card.general, name)}</p>

        <div className={`card__divider ${revealed ? 'is-open' : ''}`} aria-hidden="true">
          <span className="card__arrow">▾</span>
        </div>

        {revealed ? (
          <>
            <p className="card__detail">{applyName(card.card.detail, name)}</p>
            {card.card.readingNote && (
              <p className="card__note">{applyName(card.card.readingNote, name)}</p>
            )}
          </>
        ) : (
          <button type="button" className="card__reveal" onClick={() => setRevealed(true)}>
            Czytaj dalej ze szczegółami
          </button>
        )}

        <div className="card__ref" aria-hidden="true">
          {card.number} · {card.name}
        </div>
      </article>

      <AnswerPanel
        number={card.number}
        answer={answers[card.number] as CheckboxAnswer}
        onCheckbox={onCheckbox}
        onDetail={onDetail}
        profileName={profileName}
      />

      <div className="game__nav">
        <button type="button" className="btn btn--ghost" onClick={() => go(-1)} disabled={pos === 0}>
          ← Poprzednia
        </button>
        {pos < CARDS.length - 1 ? (
          <button type="button" className="btn btn--solid" onClick={() => go(1)}>
            Następna →
          </button>
        ) : (
          <button type="button" className="btn btn--solid" onClick={() => setScreen('checkout')}>
            Koniec — do podsumowania
          </button>
        )}
      </div>
    </div>
  )
}

/**
 * Panel odpowiedzi pod kartą — zapisuje wprost do wiersza tabeli (aktywny profil).
 * Reguły są te same co w tabeli (normalizacja po stronie hooka): „nie mów mi" wyklucza resztę,
 * poziom szczegółu i „informuj bezwzględnie" dostępne tylko, gdy w ogóle informujemy.
 */
function AnswerPanel({
  number,
  answer,
  onCheckbox,
  onDetail,
  profileName,
}: {
  number: number
  answer: CheckboxAnswer | undefined
  onCheckbox: CardsGameProps['onCheckbox']
  onDetail: CardsGameProps['onDetail']
  profileName: string
}) {
  if (!answer) return null
  const flags = rowFlags(answer)
  const odpowiedziano = answer.dontTell || answer.headsUp || answer.afterFact

  return (
    <section className="answer" aria-label="Twoja odpowiedź do tabeli">
      <p className="answer__q">Chcesz o tym wiedzieć?</p>

      <div className="answer__row">
        <button
          type="button"
          className={`answer__opt answer__opt--danger ${answer.dontTell ? 'is-on' : ''}`}
          aria-pressed={answer.dontTell}
          onClick={() => onCheckbox(number, 'dontTell', !answer.dontTell)}
        >
          ✕ Nie mów mi o tym
        </button>
        <button
          type="button"
          className={`answer__opt ${answer.headsUp ? 'is-on' : ''}`}
          aria-pressed={answer.headsUp}
          disabled={!flags.canTell}
          title={!flags.canTell ? 'Odznacz „nie mów mi o tym", aby wybrać' : undefined}
          onClick={() => onCheckbox(number, 'headsUp', !answer.headsUp)}
        >
          {columns.headsUp.label}
        </button>
        <button
          type="button"
          className={`answer__opt ${answer.afterFact ? 'is-on' : ''}`}
          aria-pressed={answer.afterFact}
          disabled={!flags.canTell}
          title={!flags.canTell ? 'Odznacz „nie mów mi o tym", aby wybrać' : undefined}
          onClick={() => onCheckbox(number, 'afterFact', !answer.afterFact)}
        >
          {columns.afterFact.label}
        </button>
      </div>

      {flags.canDetail && (
        <div className="answer__row answer__row--detail">
          <span className="answer__label">Jak szczegółowo?</span>
          <button
            type="button"
            className={`answer__opt ${answer.detail === 'ogolnie' ? 'is-on' : ''}`}
            aria-pressed={answer.detail === 'ogolnie'}
            onClick={() => onDetail(number, answer.detail === 'ogolnie' ? 'unset' : 'ogolnie')}
          >
            ogólnie
          </button>
          <button
            type="button"
            className={`answer__opt ${answer.detail === 'szczegoly' ? 'is-on' : ''}`}
            aria-pressed={answer.detail === 'szczegoly'}
            onClick={() => onDetail(number, answer.detail === 'szczegoly' ? 'unset' : 'szczegoly')}
          >
            szczegóły
          </button>
          <button
            type="button"
            className={`answer__opt answer__opt--must ${answer.mustSay ? 'is-on' : ''}`}
            aria-pressed={answer.mustSay}
            disabled={!flags.canMustSay}
            onClick={() => onCheckbox(number, 'mustSay', !answer.mustSay)}
          >
            ! informuj bezwzględnie
          </button>
        </div>
      )}

      <p className="answer__saved" aria-live="polite">
        {odpowiedziano
          ? `Zapisano do tabeli · profil ${profileName}`
          : 'Zaznacz odpowiedź — zapisze się do tabeli.'}
      </p>
    </section>
  )
}
