import { useEffect, useMemo, useState } from 'react'
import { applyName, cardItems } from '../../data'
import type { CheckboxItem } from '../../data'
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

type Screen = 'intro' | 'cards'

export default function CardsGame() {
  const [screen, setScreen] = useState<Screen>('intro')
  const [pseudonim, setPseudonim] = useState('')
  const [order, setOrder] = useState<number[]>(() => CARDS.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [deckBusy, setDeckBusy] = useState(false)

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

  // Wczytaj zapisany pseudonim.
  useEffect(() => {
    setPseudonim(loadSettings().pseudonim)
  }, [])

  const card = CARDS[order[pos]]
  const progress = `${pos + 1} / ${CARDS.length}`

  function start(shuffle: boolean) {
    saveSettings({ pseudonim })
    setOrder(shuffle ? shuffled(CARDS.map((_, i) => i)) : CARDS.map((_, i) => i))
    setPos(0)
    setRevealed(false)
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
        <span className="badge badge--ready">Gra do rozmowy</span>
        <h1>Gra karciana</h1>
        <p className="game__lede">
          Scenki czytane na głos „jakby wydarzyły się naprawdę". Pomagają poczuć, ile faktycznie
          chcesz usłyszeć — zanim zaznaczysz to w tabeli granic.
        </p>

        <ol className="rules">
          <li>Jedna osoba czyta kartę na głos, w pierwszej osobie — jakby to się właśnie stało.</li>
          <li>Najpierw sam opis ogólny. Potem osoba słuchająca decyduje, czy chce szczegóły.</li>
          <li>Na tej podstawie zaznaczacie wiersz w tabeli: czy informować, jak szczegółowo.</li>
          <li>Nie ma złych odpowiedzi. Przy każdej karcie można się zatrzymać i porozmawiać.</li>
        </ol>

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
              Pobierz całą talię (30 kart, 5×A4, grid 2×3 ze znacznikami cięcia). Karty są
              wielokrotnego użytku — pseudonim „[imię]" wpisujecie kartą „Imiona na czas gry".
            </p>
          </div>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={deckBusy}
            onClick={exportDeck}
          >
            {deckBusy ? 'Generuję…' : 'Pobierz talię PDF'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game__topbar">
        <button type="button" className="link-btn" onClick={() => setScreen('intro')}>
          <span aria-hidden="true">←</span> Ustawienia
        </button>
        <span className="game__progress" aria-live="polite">
          {progress}
        </span>
      </div>

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

      <div className="game__nav">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => go(-1)}
          disabled={pos === 0}
        >
          ← Poprzednia
        </button>
        {pos < CARDS.length - 1 ? (
          <button type="button" className="btn btn--solid" onClick={() => go(1)}>
            Następna →
          </button>
        ) : (
          <button type="button" className="btn btn--solid" onClick={() => setScreen('intro')}>
            Koniec — do ustawień
          </button>
        )}
      </div>
    </div>
  )
}
