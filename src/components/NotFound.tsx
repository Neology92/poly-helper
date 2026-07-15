import { Link } from 'react-router-dom'

/** Prosty ekran 404 / nieznane narzędzie. */
export function NotFound() {
  return (
    <div className="placeholder">
      <h1>Nie znaleziono</h1>
      <p className="placeholder__lede">
        Taka strona albo narzędzie nie istnieje — albo jeszcze go tu nie ma.
      </p>
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Wróć na stronę główną
      </Link>
    </div>
  )
}
