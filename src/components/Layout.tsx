import { Link, Outlet } from 'react-router-dom'
import './layout.css'

/** Wspólny szkielet strony: nagłówek z logo + stopka. Treść przez <Outlet/>. */
export function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/" className="brand" aria-label="poly-helper — strona główna">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__name">poly-helper</span>
          </Link>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <p>
            Narzędzia do rozmowy o relacjach — nie kontrakt na zawsze. Wracaj do nich, gdy
            coś się zmienia.
          </p>
          <p className="app-footer__meta">
            Dane zostają w tej przeglądarce. Działa offline.
          </p>
        </div>
      </footer>
    </div>
  )
}
