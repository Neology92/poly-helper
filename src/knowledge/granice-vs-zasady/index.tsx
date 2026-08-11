import { Link } from 'react-router-dom'
import { GlossaryTerm, Myth, Ref } from '../components'

/**
 * Artykuł „Granice vs zasady" — jedna z najczęstszych osi konfliktu w niemonogamii
 * (docs/research/spolecznosc-i-narzedzia.md, Tier 2). Treść informacyjna, nie orzekająca;
 * bez opowiadania się po którejś ze stron sporu (hierarchia vs RA).
 */
export default function GraniceVsZasady() {
  return (
    <article className="article">
      <p className="article__eyebrow">Wiedza</p>
      <h1>Granice vs zasady</h1>
      <p className="article__lede">
        „Nie spotykaj się z nią" a „potrzebuję jednego wieczoru w tygodniu tylko dla nas" brzmią
        podobnie, ale działają zupełnie inaczej. Różnica między zasadą a granicą to jedna z
        najczęstszych osi nieporozumień w relacjach niemonogamicznych.
      </p>
      <p className="article__byline">Wprowadzenie · ok. 7 min czytania</p>

      <div className="tldr">
        <p className="tldr__label">W skrócie</p>
        <p>
          <strong>Granica</strong> mówi o tym, co <em>ja</em> robię i na co się godzę.{' '}
          <strong>Zasada</strong> mówi, co ma robić <em>ktoś inny</em>. Granice zwykle budują
          bezpieczeństwo, zasady bywają próbą zarządzania lękiem cudzymi rękami. To nie znaczy, że
          wszystkie ustalenia są złe — chodzi o to, żeby wiedzieć, co się ustala i po co.
        </p>
      </div>

      <div className="prose">
        <h2>Na czym polega różnica</h2>
        <p>
          Najprostszy test: <strong>o kim jest to zdanie?</strong> Jeśli o Tobie — Twoich
          działaniach, Twojej dostępności, Twoim ciele, Twoich konsekwencjach — to granica. Jeśli o
          drugiej osobie i tym, czego jej nie wolno, to zasada.
        </p>
        <p>
          „Nie uprawiam seksu bez zabezpieczenia z osobami spoza naszego kręgu ustaleń" to granica —
          dotyczy Twojego ciała i Twoich wyborów. „Nie wolno ci uprawiać seksu z nikim innym bez
          zabezpieczenia" to zasada — dotyczy cudzych wyborów. W praktyce oba zdania mogą prowadzić
          do podobnych zachowań, ale inaczej rozkładają odpowiedzialność i inaczej znoszą presję.
          <Ref n={1} />
        </p>

        <h2>Dlaczego to ważne</h2>
        <p>
          Zasady bywają kuszące, bo dają natychmiastową ulgę: skoro druga osoba czegoś nie zrobi, to
          nie poczuję lęku. Problem w tym, że lęk zwykle zostaje — a doszedł jeszcze mechanizm
          kontroli. Społeczność poliamoryczna od lat ostrzega, że rozbudowane systemy zasad (a już
          zwłaszcza <strong>weto</strong>) potrafią wzmacniać poczucie zagrożenia zamiast je koić i
          krzywdzić osoby, które nie brały udziału w ustalaniu tych reguł.
          <Ref n={2} />
        </p>
        <p>
          Granice działają inaczej: nazywają potrzebę i pokazują, co <em>Ty</em> zrobisz. Nie
          wymagają pilnowania drugiej osoby, więc nie budują roli strażnika i podejrzanego.
        </p>
        <p>
          To nie znaczy, że <strong>ustalenia</strong> (umowy) są czymś złym. Umawianie się „dzwonimy
          do siebie, gdy nocujemy u kogoś innego" jest normalne i pomocne — o ile jest wspólnie
          uzgodnione, wynika z potrzeb obu stron i można je renegocjować. Różnica między zdrową umową
          a kontrolą leży w <strong>zgodzie, wzajemności i możliwości zmiany</strong>.
          <Ref n={3} />
        </p>

        <h2>Jak przełożyć zasadę na granicę i potrzebę</h2>
        <p>
          Kiedy złapiesz się na formułowaniu zasady, spróbuj cofnąć się o krok: <em>czego ja
          naprawdę potrzebuję?</em> Zwykle pod zakazem siedzi bardzo konkretna potrzeba.
        </p>
        <ul>
          <li>
            „Nie zostawaj u niej na noc" → <em>potrzeba:</em> wspólne poranki. →{' '}
            <strong>prośba:</strong> „Chcę, żebyśmy budzili się razem w soboty."
          </li>
          <li>
            „Nie mów jej o nas" → <em>potrzeba:</em> prywatność. →{' '}
            <strong>granica:</strong> „Nie chcę, żeby szczegóły naszych kłótni szły dalej."
          </li>
          <li>
            „Nie zakochuj się" → <em>potrzeba:</em> pewność, że nie zniknę z Twojego życia. →{' '}
            <strong>prośba:</strong> „Chcę wiedzieć wcześnie, jeśli coś się między nami zmienia."
          </li>
        </ul>
        <p>
          Zauważ, że „nie zakochuj się" jest po prostu <em>niewykonalne</em> — a niewykonalne zasady
          produkują poczucie winy i ukrywanie, czyli dokładnie to, czego miały zapobiec.
        </p>

        <h2>Mity i fakty</h2>

        <Myth claim="Granice to ładniejsze słowo na zasady.">
          To dwie różne rzeczy. Granica dotyczy tego, co robię ja („nie będę w to wchodzić"); zasada
          dotyczy tego, co ma robić ktoś inny („nie wolno ci"). Nazywanie zakazów granicami zaciera
          tę różnicę i utrudnia rozmowę.
          <Ref n={1} />
        </Myth>

        <Myth claim="Skoro się kochamy, nie potrzebujemy żadnych ustaleń.">
          Wręcz przeciwnie — jasne, wspólnie uzgodnione ustalenia zmniejszają liczbę domysłów.
          Rzecz w tym, żeby były uzgodnione, a nie narzucone, i żeby dało się do nich wracać.
          <Ref n={3} />
        </Myth>

        <Myth claim="Weto chroni podstawową relację.">
          Bywa odwrotnie: weto przenosi decyzję o czyjejś relacji na osobę trzecią i często odracza
          rozmowę o prawdziwej potrzebie. Wiele osób w społeczności odchodzi od weta na rzecz
          rozmowy o konkretnych potrzebach i granicach.
          <Ref n={2} />
        </Myth>

        <Myth claim="Stawianie granic jest samolubne.">
          Granica bez wrogości to informacja, nie atak. Ułatwia drugiej stronie orientację — bo
          zamiast zgadywać, wie, na czym stoi.
        </Myth>

        <h2>Słowniczek</h2>
        <dl className="glossary">
          <GlossaryTerm slug="weto" />
          <GlossaryTerm slug="poliamoria-hierarchiczna" />
          <GlossaryTerm slug="anarchia-relacyjna" />
        </dl>
        <p>
          <Link to="/w/slownik">Pełny słowniczek →</Link>
        </p>

        <h2>Co z tym zrobić w praktyce</h2>
        <p>
          Najprostszy krok to spisać ustalenia zamiast trzymać je w głowie — wtedy widać, które są
          wspólne, a które nigdy nie zostały wypowiedziane. Pomogą w tym{' '}
          <Link to="/n/umowa">Żywa umowa relacyjna</Link> (sekcje i konkretne ustalenia) oraz{' '}
          <Link to="/n/tabela-granic">Tabela granic informowania</Link> (o czym się nawzajem
          informujemy i jak szczegółowo). Do regularnego wracania do tematu służy{' '}
          <Link to="/n/check-in">Check-in relacyjny</Link>.
        </p>

        <h2>Skąd to wiadomo? — źródła</h2>
        <ol className="sources">
          <li id="zrodlo-1">
            Rozróżnienie granica/zasada jest standardem w literaturze poradnikowej niemonogamii:
            Dossie Easton, Janet W. Hardy, <em>The Ethical Slut</em> (2017); Jessica Fern,{' '}
            <em>Polysecure</em> (2020) — o granicach jako regulacji własnego zachowania.
          </li>
          <li id="zrodlo-2">
            Krytyka weta i rozbudowanych systemów zasad: materiały Multiamory (m.in. odcinki o
            „newbie mistakes" i o wecie); Elisabeth Sheff, <em>The Polyamorists Next Door</em>{' '}
            (2014) — o kosztach hierarchii dla osób „drugoplanowych".
          </li>
          <li id="zrodlo-3">
            Zgoda, wzajemność i renegocjacja jako kryteria zdrowych ustaleń: Franklin Veaux, Eve
            Rickert, <em>More Than Two</em> (2014); praktyka regularnych check-inów (Multiamory
            RADAR).
          </li>
        </ol>
      </div>

      <p className="article-note">
        To materiał informacyjny, nie porada terapeutyczna. Jeśli ustalenia w Waszej relacji służą
        głównie kontroli albo boisz się je zakwestionować, warto poszukać wsparcia u osoby
        specjalizującej się w relacjach niemonogamicznych.
      </p>
    </article>
  )
}
