import { Link } from 'react-router-dom'
import './about.css'

const REPO = 'https://github.com/Neology92/poly-helper'

/**
 * Strona „O projekcie" + prywatność (issue #9) — poziom serwisu.
 * Czym jest, dla kogo, jak działają dane (prywatność wprost), kontakt, nota informacyjna.
 * Link w stopce. Kontekst ostrzeżeń: docs/research/spolecznosc-i-narzedzia.md.
 */
export function About() {
  return (
    <div className="about">
      <Link to="/" className="back-link">
        <span aria-hidden="true">←</span> Strona główna
      </Link>

      <header className="about__head">
        <h1>O projekcie</h1>
        <p className="about__lede">
          poly-helper to zestaw prostych, prywatnych narzędzi i wiedzy wspierających budowanie
          relacji — przede wszystkim poliamorycznych, choć wiele z nich sprawdzi się w każdej
          relacji. Wszystko działa w Twojej przeglądarce, bez konta.
        </p>
      </header>

      <section className="about__section">
        <h2>Dla kogo i po co</h2>
        <p>
          Dla osób, które chcą rozmawiać o relacjach spokojnie i konkretnie — nowych w poliamorii i
          doświadczonych, a także par monogamicznych. To pomoce do <strong>rozmowy</strong>, a nie
          kontrakt na zawsze: wraca się do nich, gdy coś się zmienia.
        </p>
        <p>
          Nie ma tu „jednej słusznej drogi". Struktury są konfigurowalne i neutralne — nie narzucamy
          hierarchii, weta ani gotowych ról. Ty decydujesz, co pasuje do Waszej relacji.
        </p>
      </section>

      <section className="about__section about__section--privacy">
        <h2>Prywatność — wprost</h2>
        <ul className="about__list">
          <li>
            <strong>Dane zostają na Twoim urządzeniu.</strong> Wszystko, co wpiszesz, zapisuje się
            lokalnie w tej przeglądarce (localStorage). Nie wysyłamy tego na żaden serwer.
          </li>
          <li>
            <strong>Bez kont i logowania.</strong> Nie zakładasz konta, nie podajesz e-maila, nie ma
            hasła.
          </li>
          <li>
            <strong>Bez trackerów, reklam i analityki.</strong> Nie śledzimy Cię i nie profilujemy.
          </li>
          <li>
            <strong>Pseudonimy zamiast imion.</strong> W narzędziach używamy pseudonimu w miejsce{' '}
            <code>[imię]</code> — prawdziwe imiona nie muszą nigdzie padać.
          </li>
          <li>
            <strong>Działa offline.</strong> Jako aplikacja PWA można ją „zainstalować" i używać bez
            sieci; zawsze ładuje się najnowsza wersja.
          </li>
        </ul>
      </section>

      <section className="about__section">
        <h2>Zgoda osób, które tu nie wchodzą</h2>
        <p>
          Wpisujesz też ustalenia dotyczące osób partnerskich, które same nie korzystają z aplikacji.
          Uszanuj ich prywatność: używaj pseudonimów, zapisuj tylko to, co potrzebne, i pamiętaj, że
          to Wasze wspólne dane. Ujawnienie czyjejś niemonogamii czy tożsamości bez zgody potrafi
          realnie zaszkodzić.
        </p>
      </section>

      <section className="about__section">
        <h2>Kopia i przenoszenie danych</h2>
        <p>
          Skoro dane żyją tylko w przeglądarce, wyczyszczenie jej albo zmiana urządzenia oznacza ich
          utratę. Zrób <Link to="/dane">kopię danych</Link> — możesz ją zapisać jako plik i wczytać
          na innym urządzeniu. Plik zawiera wrażliwe treści, więc trzymaj go bezpiecznie.
        </p>
      </section>

      <section className="about__section">
        <h2>Kontakt i błędy</h2>
        <p>
          Projekt jest rozwijany otwarcie. Błędy, pomysły i sugestie treści najlepiej zgłaszać przez{' '}
          <a href={`${REPO}/issues`} target="_blank" rel="noreferrer noopener">
            GitHub Issues
          </a>
          . Kod i roadmapa są w{' '}
          <a href={REPO} target="_blank" rel="noreferrer noopener">
            repozytorium
          </a>
          .
        </p>
      </section>

      <p className="about__note">
        Materiał ma charakter informacyjny i wspiera rozmowę — nie zastępuje porady terapeutycznej,
        medycznej ani prawnej.
      </p>
    </div>
  )
}
