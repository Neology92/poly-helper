import { Link } from 'react-router-dom'
import { tools } from '../tools/registry'
import type { ToolStatus } from '../tools/types'
import './home.css'

const STATUS_LABEL: Record<ToolStatus, string> = {
  ready: 'Gotowe',
  wip: 'W budowie',
  planned: 'Planowane',
}

/** Strona główna — hero + siatka kart narzędzi z rejestru. */
export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Narzędzia dla relacji</p>
        <h1>Rozmowy o granicach, którym łatwiej nadać kształt.</h1>
        <p className="lede">
          Zestaw narzędzi wspierających budowanie relacji — przede wszystkim
          poliamorycznych, ale wiele z nich sprawdzi się w każdej relacji. Do wypełnienia
          online albo wydrukowania. Zawsze w najnowszej wersji.
        </p>
      </section>

      <section aria-label="Narzędzia">
        <ul className="tool-grid">
          {tools.map(({ meta }) => {
            const card = (
              <>
                <div className="tool-card__top">
                  <span className="tool-card__icon" aria-hidden="true">
                    {meta.icon ?? '◆'}
                  </span>
                  <span className={`badge badge--${meta.status}`}>
                    {STATUS_LABEL[meta.status]}
                  </span>
                </div>
                <h2 className="tool-card__title">{meta.title}</h2>
                <p className="tool-card__tagline">{meta.tagline}</p>
                {meta.audience && (
                  <p className="tool-card__audience">
                    {meta.audience.includes('poly') && <span className="tag">poli</span>}
                    {meta.audience.includes('mono') && <span className="tag">mono</span>}
                  </p>
                )}
              </>
            )

            return (
              <li key={meta.slug}>
                <Link to={`/n/${meta.slug}`} className="tool-card">
                  {card}
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
