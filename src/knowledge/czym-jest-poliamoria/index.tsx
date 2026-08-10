import { Link } from 'react-router-dom'
import { GlossaryTerm, Myth, Ref } from '../components'

/**
 * Artykuł „Czym jest poliamoria?" — wprowadzenie z odwołaniem do źródeł, obaleniem mitów
 * i słowniczkiem podstawowych pojęć. Treść informacyjna, nie orzekająca.
 * Cytowania zweryfikowane; przy danych o rozpowszechnieniu zachowano zastrzeżenia z badań.
 * Słowniczek renderuje się ze wspólnego modelu `../glossary` (jedno źródło prawdy).
 */
export default function CzymJestPoliamoria() {
  return (
    <article className="article">
      <p className="article__eyebrow">Wiedza</p>
      <h1>Czym jest poliamoria?</h1>
      <p className="article__lede">
        Poliamoria to praktykowanie lub gotowość do bycia w więcej niż jednej relacji miłosnej
        naraz — za wiedzą i zgodą wszystkich zaangażowanych osób. Krótkie wprowadzenie: co to
        właściwie znaczy, jakich słów się używa i co na temat poliamorii mówią badania.
      </p>
      <p className="article__byline">Wprowadzenie · ok. 9 min czytania</p>

      <div className="tldr">
        <p className="tldr__label">W skrócie</p>
        <p>
          Poliamoria jest jedną z form <strong>etycznej niemonogamii</strong>. Jej sercem nie
          jest liczba partnerów ani seks, lecz <strong>jawność i zgoda</strong> — tym różni się
          od zdrady. Badania z ostatnich kilkunastu lat wskazują, że relacje niemonogamiczne
          bywają równie satysfakcjonujące jak monogamiczne, a osoby je praktykujące często dbają
          o bezpieczniejszy seks skrupulatniej, nie mniej.
        </p>
      </div>

      <div className="prose">
        <h2>Co to właściwie znaczy?</h2>
        <p>
          Słowo <strong>poliamoria</strong> łączy grecki przedrostek <em>poly</em> („wiele") z
          łacińskim <em>amor</em> („miłość"). Nie ma jednego autora — upowszechniło się na
          początku lat 90. XX wieku. Za jedno z pierwszych użyć uchodzi esej Morning Glory
          Zell-Ravenheart „A Bouquet of Lovers" w magazynie <em>Green Egg</em> (1990); w 1992 r.
          Jennifer Wesp założyła usenetową grupę <em>alt.polyamory</em>. Do słownika Oxford
          English Dictionary hasło trafiło w 2006 roku.
          <Ref n={1} />
        </p>
        <p>
          Poliamoria to jedna z odmian <strong>etycznej niemonogamii</strong> (ang. consensual
          / ethical non-monogamy, CNM/ENM; też: niemonogamia za zgodą, konsensualna) — parasola
          obejmującego wszystkie relacje, w których
          osoby świadomie i dobrowolnie umawiają się, że wyłączność nie jest warunkiem.
          Kluczowe słowo to <strong>zgoda</strong>: wszyscy wiedzą i wszyscy się godzą. To
          właśnie odróżnia poliamorię od zdrady, która polega na złamaniu ustalonych zasad.
          <Ref n={2} />
        </p>
        <p>
          Poliamorię odróżnia się też zwykle od <em>swingingu</em>: w poliamorii akcent pada na
          budowanie <strong>relacji emocjonalnych i romantycznych</strong> z więcej niż jedną
          osobą, nie tylko na wspólny seks rekreacyjny. Granice bywają płynne, a same osoby
          poliamoryczne definiują je różnie — dla jednych to styl relacji, dla innych bliższe
          tożsamości.
          <Ref n={2} />
        </p>
        <p>
          Jak wiele osób tego doświadcza? W dwóch reprezentatywnych badaniach <em>samotnych</em>
          {' '}dorosłych w USA mniej więcej <strong>co piąta osoba</strong> (ok. 21%) przyznała,
          że kiedykolwiek była w jakiejś formie etycznej niemonogamii; inne badanie z 2021 r.
          wskazało, że samej poliamorii doświadczyło ok. 1 na 9 samotnych dorosłych. To niszowa,
          ale wcale nie marginalna praktyka — choć warto pamiętać, że dane dotyczą osób
          samotnych, nie całej populacji.
          <Ref n={3} />
        </p>

        <h2>Podstawowe pojęcia</h2>
        <p>
          Poniżej krótki słowniczek. Terminologia bywa umowna i różni ludzie używają tych słów
          nieco inaczej — traktuj to jako punkt wyjścia do rozmowy, nie jako sztywne definicje.
        </p>
        <dl className="glossary">
          <GlossaryTerm slug="monogamia" />
          <GlossaryTerm slug="etyczna-niemonogamia" />
          <GlossaryTerm slug="poliamoria" />
          <GlossaryTerm slug="relacja-otwarta" />
          <GlossaryTerm slug="kompersja">
            <Ref n={4} />
          </GlossaryTerm>
          <GlossaryTerm slug="metamour" />
          <GlossaryTerm slug="polikula" />
          <GlossaryTerm slug="nre" />
          <GlossaryTerm slug="poliamoria-hierarchiczna" />
          <GlossaryTerm slug="anarchia-relacyjna">
            <Ref n={5} />
          </GlossaryTerm>
          <GlossaryTerm slug="poliamoria-solo" />
          <GlossaryTerm slug="kitchen-table" />
          <GlossaryTerm slug="poliamoria-rownolegla" />
          <GlossaryTerm slug="triada" />
          <GlossaryTerm slug="wachlarz-v" />
          <GlossaryTerm slug="fluid-bonding" />
        </dl>
        <p>
          <Link to="/w/slownik">Pełny słowniczek →</Link>
        </p>

        <h2>Mity i fakty</h2>
        <p>
          Wokół poliamorii narosło sporo nieporozumień. Kilka najczęstszych — z tym, co na ich
          temat mówią badania.
        </p>

        <Myth claim="Poliamoria to po prostu zdrada.">
          Odwrotnie: definicyjną cechą poliamorii jest <strong>jawność i zgoda</strong>
          {' '}wszystkich zaangażowanych. Zdrada to złamanie ustalonych zasad — i może się
          zdarzyć tak samo w relacji monogamicznej, jak i poliamorycznej.
          <Ref n={2} />
        </Myth>

        <Myth claim="Chodzi wyłącznie o seks i unikanie zobowiązań.">
          Wieloletnie, jakościowe badania rodzin poliamorycznych (m.in. ok. 15-letnie badanie
          socjolożki Elisabeth Sheff) opisują trwałe zobowiązania, wspólne prowadzenie domu i
          wychowywanie dzieci. Dla wielu osób poliamoria to przede wszystkim <strong>więź
          emocjonalna</strong>, nie sam seks.
          <Ref n={6} />
        </Myth>

        <Myth claim="Osoby poliamoryczne roznoszą choroby.">
          Badania sugerują coś przeciwnego: osoby w jawnej, etycznej niemonogamii częściej się
          testują i używają zabezpieczeń, a osoby zdradzające w „monogamii" robią to rzadziej i
          zwykle bez wiedzy partnera.
          <Ref n={7} />
        </Myth>

        <Myth claim="To po prostu nie działa — takie związki się rozpadają.">
          Przeglądy badań nie znajdują, by relacje niemonogamiczne były mniej satysfakcjonujące
          czy gorszej jakości; poziom zaangażowania, zaufania i zadowolenia bywa porównywalny z
          relacjami monogamicznymi.
          <Ref n={8} />
        </Myth>

        <Myth claim="Zazdrość dowodzi, że poliamoria się nie uda.">
          Zazdrość w poliamorii istnieje — traktuje się ją jako sygnał do rozmowy o potrzebach i
          granicach, a nie jako wyrok. Pomocne bywa pojęcie <strong>kompersji</strong>. Badania
          nie dowodzą, by osoby poliamoryczne były „z natury" mniej zazdrosne — raczej inaczej z
          tą zazdrością pracują.
          <Ref n={8} />
        </Myth>

        <Myth claim="Poliamoria szkodzi dzieciom.">
          Jedyne długoterminowe (15+ lat) badanie jakościowe rodzin poliamorycznych nie wykazało
          dzieciom właściwej szkody; trudności brały się raczej ze społecznej stygmatyzacji niż
          z samej struktury rodziny. Jak zawsze, liczy się jakość relacji i opieki, nie ich liczba.
          <Ref n={6} />
        </Myth>

        <h2>Skąd to wiadomo? — źródła</h2>
        <p>
          To wprowadzenie opiera się na pracach naukowych i uznanych publikacjach. Poniższe
          pozycje to zarazem dobry punkt startu do dalszej lektury.
        </p>
        <ol className="sources">
          <li id="zrodlo-1">
            Historia terminu: Morning Glory Zell, „A Bouquet of Lovers", <em>Green Egg</em>
            {' '}(1990); grupa <em>alt.polyamory</em> założona przez Jennifer Wesp (1992); hasło
            „polyamory" w Oxford English Dictionary (2006).
          </li>
          <li id="zrodlo-2">
            Dossie Easton, Janet W. Hardy, <em>The Ethical Slut</em> (wyd. 1: 1997; wyd. 3:
            2017) — klasyczne wprowadzenie do etycznej niemonogamii. Zob. też materiały
            przeglądowe APA, Dywizja 44 (Komitet ds. Niemonogamii za Zgodą).
          </li>
          <li id="zrodlo-3">
            Rozpowszechnienie: Haupert i in., „Prevalence of Experiences With Consensual
            Nonmonogamous Relationships", <em>Journal of Sex &amp; Marital Therapy</em> (2017) —
            ok. 21% samotnych dorosłych w USA; Moors i in., „Desire, Familiarity, and Engagement
            in Polyamory", <em>Frontiers in Psychology</em> (2021). Dane dotyczą osób samotnych.
          </li>
          <li id="zrodlo-4">
            Pojęcie kompersji wywodzone od komuny Kerista (San Francisco, ok. 1980).
          </li>
          <li id="zrodlo-5">
            Andie Nordgren, manifest anarchii relacyjnej (2006; ang. „The Short Instructional
            Manifesto for Relationship Anarchy").
          </li>
          <li id="zrodlo-6">
            Elisabeth Sheff, <em>The Polyamorists Next Door</em> (2014) — wieloletnie badanie
            jakościowe rodzin poliamorycznych (badanie obserwacyjne, nie reprezentatywne).
          </li>
          <li id="zrodlo-7">
            Bezpieczniejszy seks: Lehmiller, <em>The Journal of Sexual Medicine</em> (2015);
            Conley i in., „Unfaithful Individuals Are Less Likely to Practice Safer Sex…",
            <em> The Journal of Sexual Medicine</em> (2012).
          </li>
          <li id="zrodlo-8">
            Jakość relacji i stygmatyzacja: Conley i in., „The Fewer the Merrier?" (2013);
            Conley i in., przegląd w <em>Perspectives on Psychological Science</em> (2017);
            Rubel &amp; Bogaert, przegląd w <em>The Journal of Sex Research</em> (2015).
          </li>
          <li id="zrodlo-9">
            Dalsza lektura: Jessica Fern, <em>Polysecure</em> (2020, o przywiązaniu); Tristan
            Taormino, <em>Opening Up</em> (2008).
          </li>
        </ol>
      </div>

      <p className="article-note">
        To materiał informacyjny, nie porada terapeutyczna ani prawna. Poliamoria nie jest
        „lepsza" ani „gorsza" od monogamii — to jeden z możliwych sposobów układania relacji.
        Każda relacja jest inna; najważniejsze zostają rozmowa, zgoda i szczerość.
      </p>
    </article>
  )
}
