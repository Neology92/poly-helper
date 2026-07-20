import { Link } from 'react-router-dom'
import { Myth, Ref, Term } from '../components'

/**
 * Artykuł „Zazdrość i kompersja" — czym są, co mówią badania i jak z nimi pracować.
 * Treść informacyjna, nie orzekająca; cytowania weryfikowane.
 */
export default function ZazdroscIKompersja() {
  return (
    <article className="article">
      <p className="article__eyebrow">Wiedza</p>
      <h1>Zazdrość i kompersja</h1>
      <p className="article__lede">
        Zazdrość nie jest ani dowodem miłości, ani porażką — jest sygnałem. Kompersja nie jest
        obowiązkiem ani miarą „dobrego poli". Oba to uczucia, z którymi da się pracować — bez
        udawania, że się ich nie czuje.
      </p>
      <p className="article__byline">Wprowadzenie · ok. 8 min czytania</p>

      <div className="tldr">
        <p className="tldr__label">W skrócie</p>
        <p>
          Zazdrość to normalna, złożona emocja — mieszanka lęku, złości i smutku wobec
          postrzeganego zagrożenia dla ważnej relacji. Warto ją czytać jako{' '}
          <strong>sygnał o potrzebie albo lęku</strong>, nie jako rozkaz kontrolowania osoby
          partnerskiej. Kompersja to radość z tego, że jej jest dobrze z kimś innym — można ją
          czuć obok zazdrości, nie zamiast niej. Nikt nie ma obowiązku jej czuć.
        </p>
      </div>

      <div className="prose">
        <h2>Czym jest zazdrość?</h2>
        <p>
          Zazdrość to nie jedno uczucie, lecz <strong>złożona reakcja</strong> — zwykle splot
          lęku, złości, smutku i niepewności, który pojawia się, gdy czujemy, że coś ważnego dla
          nas w relacji jest zagrożone. W psychologii odróżnia się ją od{' '}
          <strong>zawiści</strong> (ang. envy): zazdrość dotyczy strachu przed utratą tego, co
          mamy (i zwykle pojawia się „rywal"); zawiść to pragnienie czegoś, co ma ktoś inny.
          <Ref n={1} />
        </p>
        <p>
          Bywa tłumaczona ewolucyjnie — jako mechanizm „pilnowania" więzi. To jednak tylko
          część obrazu: siła i kształt zazdrości zależą też od naszej historii, poczucia
          bezpieczeństwa i kultury, w której dorastaliśmy. Dlatego zazdrość <strong>nie jest
          dowodem „prawdziwej miłości"</strong> ani oznaką, że coś jest z nami nie tak.
          <Ref n={2} />
        </p>
        <p>
          Zazdrość nie jest też niczym „poliamorycznym". Czują ją ludzie w każdej konfiguracji
          relacji — także monogamicznej. Badania nad etyczną niemonogamią nie pokazują, by
          zazdrość była tam z natury silniejsza; różnica bywa raczej w tym, że{' '}
          <strong>traktuje się ją wprost, jako temat do rozmowy</strong>, a nie jako coś, czego
          nie wypada nazwać.
          <Ref n={3} />
        </p>

        <h2>Czym jest kompersja?</h2>
        <p>
          <strong>Kompersja</strong> to ciepłe uczucie radości albo czułości na myśl o tym, że
          osobie partnerskiej jest dobrze z kimś innym — bywa nazywana „przeciwieństwem
          zazdrości". Termin ukuto w komunie Kerista w San Francisco (ok. 1980); w brytyjskim
          slangu poly mówi się czasem o byciu <em>frubbly</em>.
          <Ref n={4} />
        </p>
        <p>
          Dwie rzeczy warto od razu odczarować. Po pierwsze, kompersja <strong>nie jest brakiem
          zazdrości</strong> — można czuć jedno i drugie naraz (radość, że partnerka się cieszy,
          i ukłucie niepokoju). Po drugie, kompersja <strong>nie jest obowiązkowa</strong> ani
          miarą tego, czy „dobrze robisz poliamorię". To miłe, gdy się pojawia, ale jej brak
          niczego nie przekreśla. Badań nad samą kompersją jest na razie niewiele — to temat
          świeży w nauce.
          <Ref n={5} />
        </p>

        <dl className="glossary">
          <Term term="Zazdrość">
            Złożona emocja (lęk + złość + smutek) wobec postrzeganego zagrożenia dla ważnej relacji.
          </Term>
          <Term term="Zawiść (envy)">
            Pragnienie czegoś, co ma ktoś inny — inne uczucie niż zazdrość, choć często mylone.
          </Term>
          <Term term="Kompersja">
            Radość/czułość z tego, że osobie partnerskiej jest dobrze z kimś innym.
          </Term>
          <Term term="Frubble">
            Brytyjskie, potoczne słowo na przyjemne odczucie kompersji.
          </Term>
        </dl>

        <h2>Jak pracować z zazdrością?</h2>
        <p>
          Zazdrość najczęściej działa jak <strong>kontrolka na desce rozdzielczej</strong>: nie
          mówi, co dokładnie jest nie tak, ale sygnalizuje, że warto zajrzeć pod maskę. Zamiast
          tłumić ją albo od razu działać, pomocne bywa kilka kroków.
        </p>
        <ol>
          <li>
            <strong>Zauważ i nazwij.</strong> „Czuję zazdrość" to już dużo — bez oceniania
            siebie za to uczucie.
          </li>
          <li>
            <strong>Zajrzyj pod spód.</strong> Czego tak naprawdę dotyczy? Lęku przed utratą?
            Braku czasu i uwagi? Porównywania się? Potrzeby zapewnienia, że nadal jesteś ważnx?
          </li>
          <li>
            <strong>Rozdziel, co czyje.</strong> Część zazdrości to coś do <em>ukojenia w
            sobie</em> (stary lęk, zmęczenie), część to realna <em>potrzeba do ustalenia</em> z
            osobą partnerską.
          </li>
          <li>
            <strong>Poproś konkretnie — o potrzeby, nie o zakazy.</strong> „Chcę jeden wieczór w
            tygodniu tylko dla nas" niesie więcej niż „nie spotykaj się z nią".
          </li>
          <li>
            <strong>Zadbaj o poczucie bezpieczeństwa.</strong> Teoria przywiązania podpowiada, że
            bezpieczna więź łagodzi zazdrość; nad poczuciem bezpieczeństwa można pracować — samx
            i razem.
            <Ref n={6} />
          </li>
        </ol>
        <p>
          Tu przydają się konkretne narzędzia. Zazdrość i kompersja to często sygnały o
          granicach — o tym, o czym chcecie się nawzajem informować i jak szczegółowo. Możecie to
          spisać w{' '}
          <Link to="/n/tabela-granic">Tabeli granic informowania</Link>, a{' '}
          <Link to="/n/gra-karciana">Gra karciana</Link> pomaga poczuć, ile naprawdę chcecie
          usłyszeć, zanim to ustalicie.
        </p>

        <h2>Mity i fakty</h2>

        <Myth claim="Zazdrość znaczy, że naprawdę kochasz.">
          Zazdrość to sygnał lęku albo niezaspokojonej potrzeby, nie miernik miłości. Można
          bardzo kochać i niemal nie odczuwać zazdrości — i odwrotnie.
          <Ref n={2} />
        </Myth>

        <Myth claim="W poliamorii nie wolno czuć zazdrości.">
          Wolno. Osoby poliamoryczne też bywają zazdrosne — rzecz nie w tym, żeby zazdrości nie
          mieć, tylko żeby umieć z nią rozmawiać i pracować.
          <Ref n={3} />
        </Myth>

        <Myth claim="Jak czujesz zazdrość, to poliamoria nie jest dla ciebie.">
          Zazdrość jest do przepracowania, nie jest wyrokiem. Wiele osób uczy się z nią żyć i
          rozumieć ją lepiej — w każdym typie relacji.
          <Ref n={6} />
        </Myth>

        <Myth claim="Kompersja jest obowiązkowa — bez niej robisz poliamorię źle.">
          Kompersja bywa miłym dodatkiem, ale nie jest wymogiem ani egzaminem. Jej brak nie
          znaczy, że coś jest z tobą nie tak.
          <Ref n={5} />
        </Myth>

        <Myth claim="Zazdrość daje prawo kontrolować partnera.">
          Uczucie nie jest mandatem na kontrolę. Prośba o zapewnienie czy o czas to co innego niż
          stałe ograniczanie drugiej osoby — uporczywa kontrola bywa sygnałem ostrzegawczym, nie
          troski.
          <Ref n={7} />
        </Myth>

        <h2>Skąd to wiadomo? — źródła</h2>
        <ol className="sources">
          <li id="zrodlo-1">
            Zazdrość a zawiść: P. Salovey (red.), <em>The Psychology of Jealousy and Envy</em>
            {' '}(1991); R. H. Smith, S. H. Kim, „Comprehending envy", <em>Psychological
            Bulletin</em> (2007).
          </li>
          <li id="zrodlo-2">
            Ewolucyjne ujęcie i jego ograniczenia: D. M. Buss, <em>The Dangerous Passion</em>
            {' '}(2000); zazdrość jako emocja kształtowana też przez przywiązanie i kulturę.
          </li>
          <li id="zrodlo-3">
            Zazdrość w etycznej niemonogamii: T. D. Conley i in., przegląd w <em>Perspectives on
            Psychological Science</em> (2017); A. C. Moors i in. — zazdrość obecna, ale
            zarządzana, nie z natury wyższa.
          </li>
          <li id="zrodlo-4">
            Kompersja — pojęcie ukute w komunie Kerista (San Francisco, ok. 1980); bryt. slang
            <em> frubble</em>.
          </li>
          <li id="zrodlo-5">
            Kompersja jako temat badawczy jest świeży i ograniczony — zob. prace Marie Thouin
            (Thouin-Savard) o kompersji (ok. 2021–2023).
          </li>
          <li id="zrodlo-6">
            Przywiązanie a zazdrość: Jessica Fern, <em>Polysecure: Attachment, Trauma and
            Consensual Nonmonogamy</em> (2020).
          </li>
          <li id="zrodlo-7">
            Praktyczne podejście do zazdrości: Kathy Labriola, <em>The Jealousy Workbook</em>
            {' '}(2013); Dossie Easton, Janet W. Hardy, <em>The Ethical Slut</em> (2017),
            rozdziały o zazdrości.
          </li>
        </ol>
      </div>

      <p className="article-note">
        To materiał informacyjny, nie porada terapeutyczna. Jeśli zazdrość jest przytłaczająca
        albo prowadzi do kontrolowania czy krzywdzenia — twojego lub kogoś bliskiego — warto
        poszukać wsparcia u specjalist_ki. Uczucia są w porządku; liczy się to, co z nimi robimy.
      </p>
    </article>
  )
}
