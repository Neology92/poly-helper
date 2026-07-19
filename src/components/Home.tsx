import { Link } from 'react-router-dom'
import { tools } from '../tools/registry'
import type { ToolStatus } from '../tools/types'
import { articles } from '../knowledge/registry'
import './home.css'

const STATUS_LABEL: Record<ToolStatus, string> = {
  ready: 'Gotowe',
  wip: 'W budowie',
  planned: 'Planowane',
}

/** Strona główna — hero + dwie sekcje: Narzędzia i Wiedza. */
export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <p className="eyebrow">Relacje poliamoryczne i nie tylko</p>
        <h1>Rozmowy o granicach, którym łatwiej nadać kształt.</h1>
        <p className="lede">
          Narzędzia i wiedza wspierające budowanie relacji — przede wszystkim poliamorycznych,
          ale wiele z nich sprawdzi się w każdej relacji. Do wypełnienia online albo
          wydrukowania. Zawsze w najnowszej wersji.
        </p>
      </section>

      {/* ---------- Narzędzia ---------- */}
      <section className="section" aria-labelledby="sekcja-narzedzia">
        <div className="section__head">
          <h2 id="sekcja-narzedzia" className="section__title">
            Narzędzia
          </h2>
          <p className="section__desc">Do wspólnego wypełnienia online lub wydrukowania.</p>
        </div>
        <ul className="card-grid">
          {tools.map(({ meta }) => (
            <li key={meta.slug}>
              <Link to={`/n/${meta.slug}`} className="card">
                <div className="card__top">
                  <span className="card__icon" aria-hidden="true">
                    {meta.icon ?? '◆'}
                  </span>
                  <span className={`badge badge--${meta.status}`}>
                    {STATUS_LABEL[meta.status]}
                  </span>
                </div>
                <h3 className="card__title">{meta.title}</h3>
                <p className="card__tagline">{meta.tagline}</p>
                {meta.audience && (
                  <p className="card__meta">
                    {meta.audience.includes('poly') && <span className="tag">poli</span>}
                    {meta.audience.includes('mono') && <span className="tag">mono</span>}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Wiedza ---------- */}
      <section className="section" aria-labelledby="sekcja-wiedza">
        <div className="section__head">
          <h2 id="sekcja-wiedza" className="section__title">
            Wiedza
          </h2>
          <p className="section__desc">
            Krótkie wprowadzenia — z odwołaniem do źródeł, bez oceniania.
          </p>
        </div>
        <ul className="card-grid">
          {articles.map(({ meta }) => (
            <li key={meta.slug}>
              <Link to={`/w/${meta.slug}`} className="card">
                <div className="card__top">
                  <span className="card__icon" aria-hidden="true">
                    {meta.icon ?? '◆'}
                  </span>
                  {meta.readingMinutes && (
                    <span className="badge badge--read">{meta.readingMinutes} min czytania</span>
                  )}
                </div>
                <h3 className="card__title">{meta.title}</h3>
                <p className="card__tagline">{meta.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
