import type { BoundaryItem } from './types'

/**
 * KANON: 25 pozycji tabeli granic informowania.
 *
 * Źródło prawdy: `poly-helper-dump.md` — §3.2 (nazwy, kolejność, pola specjalne)
 * oraz §5 (finalne teksty kart). Kolejność: od najmniej do najdalej posuniętych,
 * z przeplotem fizyczne/emocjonalne/logistyczne (bez nagłówków klastrów).
 *
 * Pozycje 12, 21, 22 to pola „do ustalenia/wypisania" (kind: 'field') — nie mają kart.
 * Pozostałe 22 pozycje mają karty-scenki (kind: 'checkbox').
 */
export const items: BoundaryItem[] = [
  {
    number: 1,
    name: 'Przytulanie',
    clarification:
      'Chodzi o dłuższą czułą bliskość — leżenie przytulonym przy filmie, rozmowy w „kłębku" — NIE o przytulenie na powitanie/pożegnanie.',
    kind: 'checkbox',
    card: {
      general: 'Spędziliśmy z [imię] cały wieczór przytuleni na kanapie.',
      detail:
        'No miało być tylko film, a szybko zrobiło się inaczej — najpierw głowa na ramieniu, potem nogi na mnie i w końcu leżeliśmy całkiem zaplątani pod kocem. Film leciał gdzieś w tle, a my gadaliśmy jeszcze ze dwie godziny i nikomu się nie chciało ruszyć. Było po prostu ciepło i dobrze, oddech [imię] tuż obok.',
    },
  },
  {
    number: 2,
    name: 'Trzymanie za rękę',
    kind: 'checkbox',
    card: {
      general: 'Szliśmy z [imię] przez miasto, trzymając się za ręce.',
      detail:
        'Złapaliśmy się za ręce gdzieś na pierwszym skrzyżowaniu, tak bez gadania, i już tak zostało do końca. [imię] co chwilę gładził mnie kciukiem po dłoni, nie puszczaliśmy nawet w tłoku. Potem przy kawie trzymaliśmy się jeszcze pod stołem. Niby nic, a chodziłem z tym uśmiechem pół dnia.',
    },
  },
  {
    number: 3,
    name: 'Całowanie',
    kind: 'checkbox',
    card: {
      general: 'Pocałowaliśmy się z [imię].',
      detail:
        'Staliśmy blisko, rozmowa się urwała i jakoś sami się do siebie nachyliliśmy. Najpierw jeden taki ostrożny, potem już normalnie, kilka razy, [imię] z ręką na mojej szyi. Między buziakami trochę śmiechu i to patrzenie na siebie, jak nikomu nie chce się odsunąć. Najbardziej został mi ten moment napięcia tuż przedtem.',
    },
  },
  {
    number: 4,
    name: 'Pieszczoty / inne formy dotyku',
    kind: 'checkbox',
    card: {
      general: 'Z [imię] było sporo zmysłowego dotyku i pieszczot — choć bez seksu.',
      detail:
        'Zaczęło się od przytulania i z minuty na minutę robiło się coraz cieplej — buziaki w szyję, ręce pod ubraniem, raz wolniej, raz szybciej. Dużo dotyku i takiego sprawdzania, gdzie są granice, bez spinki. Seks świadomie odpuściliśmy, ale i tak leżeliśmy tak ze sobą jeszcze długo, nieźle rozgrzani.',
    },
  },
  {
    number: 5,
    name: 'Znaczenia na ciele (malinki itp.)',
    kind: 'checkbox',
    card: {
      general: 'Zostały mi po [imię] ślady na ciele — malinki.',
      detail:
        'Zorientowałem się dopiero rano przed lustrem — kilka śladów na szyi i obojczyku. Trochę mnie to rozbawiło, trochę zawstydziło, bo ciężko je ukryć pod kołnierzem. Taka pamiątka po naprawdę namiętnym wieczorze z [imię].',
    },
  },
  {
    number: 6,
    name: 'Randki / umawianie się',
    kind: 'checkbox',
    card: {
      general: 'Umówiliśmy się z [imię] na kolejną randkę.',
      detail:
        'Padło to pod koniec ostatniego spotkania — najpierw „a może byśmy…", potem konkretny dzień i w sumie cały plan na wieczór tylko we dwoje. Resztę dogadywaliśmy potem na wiadomościach: godzina, miejsce, co po kolacji. Już samo to ustalanie jakoś nakręcało i nie mogłem się doczekać.',
    },
  },
  {
    number: 7,
    name: 'Prezenty (dawanie / otrzymywanie)',
    kind: 'checkbox',
    card: {
      general: 'Dostałem od [imię] prezent (albo sam coś podarowałem).',
      detail:
        'Nie z okazji niczego konkretnego — [imię] po prostu pomyślała o mnie i przyniosła drobiazg, który idealnie trafił w mój gust. Zrobiło mi się głupio miło i od razu zacząłem główkować, czym się odwdzięczyć. Takie drobne „widzę cię" znaczy dla mnie więcej, niż się spodziewałem.',
    },
  },
  {
    number: 8,
    name: 'Głęboka bliskość emocjonalna, zwierzanie się z ważnych rzeczy',
    kind: 'checkbox',
    card: {
      general: 'Zwierzyłem się [imię] z naprawdę ważnych, osobistych rzeczy.',
      detail:
        'Siedzieliśmy do późna i samo zeszło na cięższe tematy — przeszłość, lęki, rzeczy, o których mówię mało komu. Jedno zwierzenie pociągnęło drugie, w obie strony, i w którymś momencie złapałem się, że opowiadam [imię] coś, czego dawno nikomu nie mówiłem. Zaskoczyło mnie, jak bezpiecznie się z tym przy [imię] poczułem.',
    },
  },
  {
    number: 9,
    name: 'Nocowanie / spanie razem (bez seksu)',
    kind: 'checkbox',
    card: {
      general: 'Zostałem u [imię] na noc — spaliśmy razem w jednym łóżku, bez seksu.',
      detail:
        'Zrobiło się tak późno, że nie było po co wracać, więc zostałem. Pożyczona koszulka, mycie zębów obok siebie, gadanie po ciemku coraz wolniej, aż zasnęliśmy przytuleni. Rano obudziliśmy się wciąż tak samo zaplątani, na luzie. Seksu nie było — i właśnie ten spokój całej nocy obok kogoś został mi najbardziej.',
    },
  },
  {
    number: 10,
    name: 'Wspólne wyjazdy, podróże',
    kind: 'checkbox',
    card: {
      general: 'Planujemy z [imię] wspólny wyjazd na weekend.',
      detail:
        'Pomysł padł przy gadaniu o wolnym terminie i w kilka minut zrobił się konkretny: dwa dni poza miastem, jeden nocleg, lista miejsc. Od razu zaczęliśmy przeglądać noclegi i podśmiewać się, czy nad wodę, czy w góry. Pierwszy raz planujemy z [imię] coś dłuższego niż jeden wieczór i trochę mnie to ekscytuje, a trochę stresuje.',
    },
  },
  {
    number: 11,
    name: 'Wyjścia na wspólne eventy (np. ten sam koncert)',
    kind: 'checkbox',
    card: {
      general: 'Wychodzi na to, że z [imię] będziemy na tym samym evencie co ja z tobą.',
      detail:
        'Okazało się, że oboje mamy bilety na ten sam koncert. Zaczęliśmy kombinować, jak to ogarnąć — iść razem, osobno, czy jakoś się rozdzielić w trakcie. Fajnie, że się nakłada, ale i trochę zawile — i logistycznie, i emocjonalnie.',
    },
  },
  {
    number: 12,
    name: 'Zapotrzebowanie na czas (ile czasu z tą osobą)',
    clarification: 'To kwestia do ustalenia, nie do informowania.',
    kind: 'field',
    fieldPrompt: 'Ustalcie razem — ile czasu, jak często:',
  },
  {
    number: 13,
    name: 'Choroby zakaźne (przeziębienie, grypa itp.)',
    clarification: 'Heads-up o zaraźliwości przed spotkaniem.',
    kind: 'checkbox',
    card: {
      general:
        '[imię] rozłożyła się z przeziębieniem albo grypą, a widzieliśmy się tuż przedtem.',
      detail:
        'Spędziliśmy razem wieczór, a dzień później [imię] napisała, że leży z gorączką i katarem. Czyli mogłem się od [imię] zarazić — i teoretycznie nieść to dalej. Sam czuję się na razie ok, ale wolę, żebyś wiedział, zanim się zobaczymy.',
    },
  },
  {
    number: 14,
    name: 'Seksting',
    kind: 'checkbox',
    card: {
      general: 'Wpadliśmy z [imię] w seksting.',
      detail:
        'Zaczęło się od zwykłego pisania, które wieczorem zrobiło się coraz śmielsze — najpierw aluzje, potem konkrety, w którymś momencie poleciały też zdjęcia. Pisaliśmy tak do późna i jedno nakręcało drugie. Było w tym dużo ekscytacji i tego napięcia, że niby tylko słowa, a działa jak mało co.',
    },
  },
  {
    number: 15,
    name: 'Seks',
    kind: 'checkbox',
    card: {
      general: 'Uprawialiśmy z [imię] seks.',
      detail:
        'Zaczęło się od długiego wieczoru we dwoje, który robił się coraz gorętszy — buziaki, dotyk, było też schodzenie głową pod kołdrę, aż w końcu przeszło w pełny seks. Dużo śmiechu, luzu i sprawdzania, co komu pasuje, bez spinki. Zostaliśmy razem do rana i najbardziej zaskoczyła mnie ta lekkość, jak łatwo nam ze sobą.',
    },
  },
  {
    number: 16,
    name: 'Badania na STI/STD (wykonanie / wynik)',
    note: 'Dotyczy innej osoby ([imię]), nie osoby wypełniającej.',
    kind: 'checkbox',
    card: {
      general: '[imię] ma zrobione badania na STI/STD i zna już wyniki.',
      detail:
        'Temat wyszedł, kiedy zaczęliśmy gadać o zbliżeniu i granicach. [imię] zrobiła komplet badań z własnej głowy, jeszcze zanim w ogóle zapytałem, i pokazała mi wyniki wprost, bez ściemy. Pogadaliśmy potem konkretnie, kto się z kim jeszcze widuje — wiemy o sobie nawzajem, jak stoimy zdrowotnie.',
    },
  },
  {
    number: 17,
    name: 'Seks bez zabezpieczeń / zmiana ustaleń o bezpieczniejszym seksie',
    kind: 'checkbox',
    card: {
      general:
        'Z [imię] zmieniliśmy ustalenia o bezpieczniejszym seksie — doszło do seksu bez zabezpieczenia.',
      detail:
        'Najpierw była konkretna rozmowa: badania, wyniki, ustalenia z innymi osobami, z którymi się widujemy. Dopiero jak wszystko sobie wyłożyliśmy i zgodziliśmy na te same zasady, zdecydowaliśmy się na to świadomie, nie z zaskoczenia. Dla mnie to był też moment, że poczułem, że robi się między nami poważniej.',
    },
  },
  {
    number: 18,
    name: 'Zauroczenie / fascynacja',
    clarification: 'Rozdzielone od zakochania — dwa różne progi.',
    kind: 'checkbox',
    card: {
      general: 'Czuję wyraźne zauroczenie [imię] — myślę o tej osobie coraz więcej.',
      detail:
        'Zaczęło się niby od niechcenia, a teraz wraca po kilka razy dziennie — odtwarzam sobie w głowie ostatnie spotkanie, czekam na wiadomość, sprawdzam telefon. Łapię się na uśmiechu na samo wspomnienie [imię] i na tym, że szukam pretekstów, żeby się odezwać. Jeszcze takie lekkie i fajne, ale ciężko to przeoczyć.',
    },
  },
  {
    number: 19,
    name: 'Zakochanie',
    kind: 'checkbox',
    card: {
      general: 'Chyba się w [imię] zakochuję.',
      detail:
        'Narastało spotkanie po spotkaniu — najpierw tęsknota między nimi, potem myślenie o [imię] przy zwykłych, codziennych rzeczach, aż w końcu dotarło, że to już nie samo zauroczenie. Coraz częściej wyobrażam sobie wspólne plany, dłuższą perspektywę, takie „chcę, żeby to trwało". Trochę mnie zaskakuje, jakie jest mocne.',
    },
  },
  {
    number: 20,
    name: 'Powiedzenie / usłyszenie „kocham Cię"',
    kind: 'checkbox',
    card: {
      general: 'Od [imię] padły słowa „kocham Cię".',
      detail:
        'Wyszło to w takim cichym, bliskim momencie pod koniec wieczoru — bez planu, prawie szeptem, najpierw z jednej strony, potem odpowiedź z drugiej. Zapadła krótka cisza, w której chyba oboje załapaliśmy, że właśnie nazwaliśmy coś ważnego. Długo mi to potem siedziało w głowie.',
    },
  },
  {
    number: 21,
    name: 'No-go spaces (miejsca tylko dla nas)',
    kind: 'field',
    fieldPrompt: 'Wypisz miejsca tylko dla was:',
  },
  {
    number: 22,
    name: 'No-go talks (tematy, których nie przekazywać)',
    kind: 'field',
    fieldPrompt: 'Wypisz tematy, których nie przekazywać:',
  },
  {
    number: 23,
    name: 'Kryzys / konflikt',
    kind: 'checkbox',
    card: {
      general: 'Mamy z [imię] poważny konflikt — coś się między nami sypie.',
      detail:
        'Zaczęło się od jednej spornej rozmowy, która nagle przerodziła się w kłótnię — podniesione głosy, urażone tony, a potem kilka dni ciszy i dystansu. Pisaliśmy do siebie krótko i chłodno, oboje czekając, kto pierwszy zrobi krok. Nie wiem jeszcze, czy to się da pozbierać, i noszę to w sobie na co dzień.',
    },
  },
  {
    number: 24,
    name: 'Początek zupełnie nowej relacji z inną osobą',
    kind: 'checkbox',
    card: {
      general: 'Poznałem [imię] i zaczyna się między nami coś nowego.',
      detail:
        'Trafiliśmy na siebie niedawno i z każdym kolejnym spotkaniem robi się ciekawiej — rozmowy ciągną się godzinami, jest łatwa chemia i to takie „chcę cię znów zobaczyć". Wygląda na początek osobnej, równoległej relacji, na razie świeżej, ale idzie w stronę czegoś więcej niż znajomość. Jestem tym podekscytowany i ciekaw, w którą stronę to pójdzie.',
      readingNote: 'Tutaj [imię] = nowo poznana osoba, nie dotychczasowa.',
    },
  },
  {
    number: 25,
    name: 'Zmiana statusu relacji (wejście w oficjalną relację partnerską)',
    kind: 'checkbox',
    card: {
      general: 'Z [imię] wchodzimy w oficjalną relację partnerską.',
      detail:
        'Po jednej z rozmów nazwaliśmy wprost, czym dla siebie jesteśmy, i ustaliliśmy, że [imię] jest dla mnie partnerem/partnerką. Pojawiły się większe deklaracje, plany na dłużej i ustalenia, jak chcemy o sobie mówić na zewnątrz. To świadomy krok dalej, nie samo płynięcie z prądem — i czuję z tym i dumę, i lekki respekt.',
    },
  },
]

/** Liczba pustych wierszy w tabeli na dopisanie własnych pozycji (dump §3.2). */
export const EMPTY_ROWS = 3

/** Szybki dostęp do pozycji po numerze. */
export function getItem(number: number): BoundaryItem | undefined {
  return items.find((it) => it.number === number)
}

/** Tylko pozycje z kartami-scenkami (22 karty — dla Gry karcianej). */
export function cardItems() {
  return items.filter((it) => it.kind === 'checkbox')
}
