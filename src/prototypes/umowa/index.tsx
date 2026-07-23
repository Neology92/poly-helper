import { useState } from 'react'
import { Link } from 'react-router-dom'
import { VariantA } from './VariantA'
import { VariantB } from './VariantB'
import { VariantC } from './VariantC'
import './umowa-proto.css'

type Wariant = 'A' | 'B' | 'C'

const WARIANTY: { id: Wariant; nazwa: string; opis: string }[] = [
  { id: 'A', nazwa: 'A · Dokument', opis: 'Sekcje z wolnym tekstem — piszecie ustalenia własnymi słowami.' },
  { id: 'B', nazwa: 'B · Menu', opis: 'Lista komponentów relacji, przy każdym neutralny poziom + notka.' },
  { id: 'C', nazwa: 'C · Hybryda', opis: 'Sekcje złożone z pozycji-ustaleń (tekst + poziom + notka).' },
]

const STORAGE_KEY = 'poly-helper:proto-umowa:wariant'

/**
 * PROTOTYP „Żywej umowy relacyjnej" (#8) — ukryta podstrona (nie w rejestrze narzędzi).
 * Trzy warianty koncepcji do wyklikania i wyboru kierunku. Bez PDF i profili (na później).
 */
export default function UmowaProto() {
  const [wariant, setWariant] = useState<Wariant>(() => {
    const saved = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY)
      } catch {
        return null
      }
    })()
    return saved === 'A' || saved === 'B' || saved === 'C' ? saved : 'A'
  })

  const select = (w: Wariant) => {
    setWariant(w)
    try {
      localStorage.setItem(STORAGE_KEY, w)
    } catch {
      /* ignore */
    }
  }

  const opis = WARIANTY.find((w) => w.id === wariant)?.opis

  return (
    <div className="umowa-proto">
      <div className="proto-banner" role="note">
        <strong>Prototyp / koncept.</strong> To robocza podstrona do wyboru kierunku „żywej umowy" —
        niewidoczna w aplikacji. Wypróbuj trzy warianty i zdecyduj, który najbardziej pasuje; potem
        dopracujemy szczegóły (m.in. eksport PDF i profile).
      </div>

      <header className="proto-head">
        <h1>Żywa umowa relacyjna</h1>
        <p className="proto-sub">
          Edytowalny, wersjonowany zapis Waszych ustaleń — zamiast dokumentu w chmurze. Konfigurowalny,
          neutralny (żadnej narzuconej hierarchii ani weta). Dane zostają w tej przeglądarce.
        </p>
        <p className="proto-crosslink">
          Granice informowania ustalcie osobno w{' '}
          <Link to="/n/tabela-granic">Tabeli granic</Link> — ta umowa ich nie duplikuje.
        </p>
      </header>

      <div className="proto-switch" role="tablist" aria-label="Warianty koncepcji">
        {WARIANTY.map((w) => (
          <button
            key={w.id}
            type="button"
            role="tab"
            aria-selected={wariant === w.id}
            className={`proto-switch__tab ${wariant === w.id ? 'is-active' : ''}`}
            onClick={() => select(w.id)}
          >
            {w.nazwa}
          </button>
        ))}
      </div>
      {opis && <p className="proto-switch__desc">{opis}</p>}

      {wariant === 'A' && <VariantA />}
      {wariant === 'B' && <VariantB />}
      {wariant === 'C' && <VariantC />}
    </div>
  )
}
