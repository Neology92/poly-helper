import type { ReactNode } from 'react'

/** Odnośnik do przypisu (źródła) na dole artykułu. */
function Ref({ n }: { n: number }) {
  return (
    <a className="ref" href={`#zrodlo-${n}`} aria-label={`Źródło ${n}`}>
      [{n}]
    </a>
  )
}

/** Pozycja słowniczka. */
function Term({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </div>
  )
}

/** Karta „mit → fakt". */
function Myth({ claim, children }: { claim: string; children: ReactNode }) {
  return (
    <div className="myth">
      <span className="myth__tag myth__tag--mit">Mit</span>
      <p className="myth__claim">„{claim}"</p>
      <span className="myth__tag myth__tag--fakt">Fakt</span>
      <p className="myth__fact">{children}</p>
    </div>
  )
}

/**
 * Artykuł „Czym jest poliamoria?" — wprowadzenie z odwołaniem do źródeł, obaleniem mitów
 * i słowniczkiem podstawowych pojęć. Treść informacyjna, nie orzekająca.
 * Cytowania zweryfikowane; przy danych o rozpowszechnieniu zachowano zastrzeżenia z badań.
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
          Poliamoria jest jedną z form <strong>niemonogamii za zgodą</strong>. Jej sercem nie
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
          Poliamoria to jedna z odmian <strong>niemonogamii za zgodą</strong> (ang. consensual
          / ethical non-monogamy, CNM/ENM) — parasola obejmującego wszystkie relacje, w których
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
          że kiedykolwiek była w jakiejś formie niemonogamii za zgodą; inne badanie z 2021 r.
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
          <Term term="Monogamia">
            Relacja, w której dwie osoby umawiają się na wyłączność — romantyczną i seksualną.
          </Term>
          <Term term="Niemonogamia za zgodą (CNM/ENM)">
            Parasol na wszystkie relacje, w których — jawnie i dobrowolnie — wyłączność nie
            obowiązuje: poliamoria, swinging, relacje otwarte i inne. Bywa też nazywana „etyczną
            niemonogamią" (część osób woli słowo „za zgodą", by nie sugerować, że inne formy są
            nieetyczne).
          </Term>
          <Term term="Poliamoria">
            Bycie (lub gotowość do bycia) w więcej niż jednej relacji miłosnej naraz, za wiedzą
            i zgodą wszystkich zaangażowanych.
          </Term>
          <Term term="Relacja otwarta">
            Zwykle: para, która dopuszcza kontakty seksualne (rzadziej romantyczne) poza diadą.
            Bywa używane też szeroko, jako synonim niemonogamii.
          </Term>
          <Term term="Kompersja">
            Radość z tego, że osobie partnerskiej jest dobrze z kimś innym — bywa nazywana
            „przeciwieństwem zazdrości". Termin ukuty w komunie Kerista (San Francisco, ok. 1980).
            <Ref n={4} />
          </Term>
          <Term term="Metamour">
            Partner/ka Twojej osoby partnerskiej, z którą sam/a nie jesteś w relacji.
          </Term>
          <Term term="Polycule">
            Cała sieć osób połączonych relacjami (od „poly" + „molecule") — np. Ty, Twoje osoby
            partnerskie i ich partnerzy.
          </Term>
          <Term term="NRE (new relationship energy)">
            „Energia nowej relacji" — euforyczne zauroczenie na początku znajomości, które z
            czasem opada.
          </Term>
          <Term term="Poliamoria hierarchiczna i niehierarchiczna">
            Hierarchiczna: niektóre relacje mają umownie wyższy priorytet (np. „primary" i
            „secondary"). Niehierarchiczna: relacji się nie ranguje. Język „primary/secondary"
            bywa krytykowany jako umniejszający osobom „drugorzędnym".
          </Term>
          <Term term="Anarchia relacyjna">
            Podejście, które odrzuca narzucone hierarchie i etykiety; każdą relację (także
            przyjaźń) ustala się indywidualnie. Spopularyzowane manifestem Andie Nordgren (2006).
            <Ref n={5} />
          </Term>
          <Term term="Solo poli">
            Praktykowanie poliamorii bez dążenia do „splatania życia" w parę (wspólny dom,
            finanse) — autonomia jako wartość.
          </Term>
          <Term term="Kitchen table vs parallel">
            Dwa style sieci: „kuchennego stołu" (metamours się znają i bywają razem) oraz
            „równoległy" (relacje toczą się osobno, bez wspólnych spotkań).
          </Term>
          <Term term="Triada / wachlarz (V)">
            Triada — troje ludzi połączonych wzajemnie; „V" — jedna osoba (zawias) w relacji z
            dwiema, które nie są w relacji ze sobą.
          </Term>
          <Term term="Fluid bonding">
            Świadoma decyzja o rezygnacji z zabezpieczeń z konkretną osobą (np. po badaniach) —
            zwykle przedmiot wyraźnych ustaleń w całej sieci.
          </Term>
        </dl>

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
          Badania sugerują coś przeciwnego: osoby w jawnej niemonogamii za zgodą częściej się
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
