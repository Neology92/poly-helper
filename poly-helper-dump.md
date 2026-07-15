# poly-helper — dump projektu

> Dokument przekazania wiedzy. Zawiera cele, założenia, finalne treści, decyzje designerskie
> i wnioski z iteracji nad dwoma narzędziami: **tabelą granic informowania** oraz **grą karcianą**
> wspierającą jej wypełnianie. Stan na: 2026-07-15.

---

## 1. Cel projektu

Para w relacji poliamorycznej chce jasno ustalić, **o czym z innych (równoległych) relacji
informować osobę partnerską, a o czym nie** — oraz jak szczegółowo i w jakim momencie.

Rozwiązanie składa się z dwóch analogowych (drukowanych) narzędzi:

1. **Tabela granic informowania** — formularz do wspólnego wypełnienia; jeden egzemplarz
   na jedną osobę informowaną (każda osoba może mieć własne, inne ustawienia).
2. **Gra karciana** — talia scenek czytanych na głos „jakby wydarzyły się naprawdę";
   pomaga osobie słuchającej poczuć, ile faktycznie chce usłyszeć, zanim zaznaczy to w tabeli.

Kluczowa filozofia: **to narzędzie do rozmowy, nie kontrakt na zawsze** — wraca się do niego,
gdy coś się zmienia.

## 2. Wymagania twarde (ustalone przez użytkownika)

- **W pełni analogowe** — rozgrywka i wypełnianie bez elektroniki.
- **Druk czarno-biały (B&W)**, klasyczna drukarka domowa z marginesami.
- Tabela: **jedna strona A4**.
- Karty: **wielokrotnego użytku** (bez pól do zaznaczania na kartach — odpowiedzi
  lądują wyłącznie w tabeli).
- Karty **stykają się ze sobą** (grid 2×3 na A4) — minimum cięć nożyczkami; ramka wokół
  całego bloku + znaczniki cięcia (crop marks), by dało się przyciąć do wymiaru mimo marginesów.
- Język polski; pisownia „seksting" przez „ks"; unikać słowa „związek" (preferowane: „relacja");
  unikać sformułowań brzmiących „cringe'owo" (np. „pikantne wiadomości").

## 3. Model danych tabeli

### 3.1 Kolumny (kolejność od lewej)

| Kolumna | Forma | Znaczenie |
|---|---|---|
| **must say** | blady wykrzyknik `!` (opacity ~9%) do zamalowania | rzeczy, o których informować bezwzględnie |
| **#** | liczba | numer pozycji (spójny z odnośnikami na kartach) |
| **Czynność** | tekst | nazwa sytuacji |
| **DON'T TELL** | blady `X` (opacity ~11%) do zamalowania | twarde „nie mów mi o tym" |
| **Gdy myślę, że może się wydarzyć** | checkbox | uprzedzenie z wyprzedzeniem (heads-up) |
| **Gdy się wydarzyło** | checkbox | informacja po fakcie |
| **Poziom szczegółu** | `□ ogólnie / szczegóły □` | dwa checkboxy w jednej linii, po lewej i prawej |

Nagłówek egzemplarza: **Osoba informowana** (nie „egzemplarz dla…"), Data, Notatka / kontekst.

### 3.2 Pozycje (25 + 3 puste do dopisania)

Sortowanie: **od najmniej do najdalej posuniętych**, z przeplotem fizyczne/emocjonalne/logistyczne
(bez nagłówków klastrów). Ustalone kotwice sortowania: spanie przed seksem; wyjazdy przed seksem;
zakochanie po seksie; głęboka bliskość emocjonalna wcześnie (przed zauroczeniem);
zmiana statusu po „kocham Cię".

1. Przytulanie *(uwaga: chodzi o dłuższą czułą bliskość — leżenie przytulonym przy filmie,
   rozmowy w „kłębku" — NIE o przytulenie na powitanie/pożegnanie)*
2. Trzymanie za rękę
3. Całowanie
4. Pieszczoty / inne formy dotyku
5. Znaczenia na ciele (malinki itp.)
6. Randki / umawianie się
7. Prezenty (dawanie / otrzymywanie)
8. Głęboka bliskość emocjonalna, zwierzanie się z ważnych rzeczy
9. Nocowanie / spanie razem (bez seksu)
10. Wspólne wyjazdy, podróże
11. Wyjścia na wspólne eventy (np. ten sam koncert)
12. Zapotrzebowanie na czas (ile czasu z tą osobą) — **pole „Ustalcie razem — ile czasu, jak często:" zamiast checkboxów** (to kwestia do ustalenia, nie informowania)
13. Choroby zakaźne (przeziębienie, grypa itp.) — heads-up o zaraźliwości przed spotkaniem
14. Seksting
15. Seks
16. Badania na STI/STD (wykonanie / wynik) — **dotyczy innej osoby ([imię]), nie wypełniającego**
17. Seks bez zabezpieczeń / zmiana ustaleń o bezpieczniejszym seksie
18. Zauroczenie / fascynacja *(rozdzielone od zakochania — dwa różne progi)*
19. Zakochanie
20. Powiedzenie / usłyszenie „kocham Cię"
21. No-go spaces (miejsca tylko dla nas) — **pole „Wypisz miejsca tylko dla was:" zamiast checkboxów**
22. No-go talks (tematy, których nie przekazywać) — **pole „Wypisz tematy, których nie przekazywać:" zamiast checkboxów**
23. Kryzys / konflikt
24. Początek zupełnie nowej relacji z inną osobą
25. Zmiana statusu relacji (wejście w oficjalną relację partnerską)

- Pozycje 12, 21, 22 mają w tabeli pola do wypisania/ustalenia i **nie mają kart w talii**.
- 3 dodatkowe puste wiersze z kropkowaną linią na dopisanie własnych pozycji.

### 3.3 Odrzucone / nieużyte pomysły na pozycje

Z pierwotnego brainstormu użytkownik NIE wybrał: kink/BDSM, poznawanie znajomych/rodziny,
wspólne zdjęcia / social media, ryzyko ciąży. (Można je zaproponować ponownie w rozwoju,
ale świadomie odpadły.)

## 4. Gra karciana — zasady i konstrukcja

### 4.1 Mechanika

1. Jedna osoba czyta kartę **na głos, w pierwszej osobie** — jakby sytuacja właśnie wydarzyła
   się naprawdę.
2. Najpierw czyta tylko **górną część** karty (opis ogólny — wprost nazywa czynność, bez szczegółów).
3. Osoba słuchająca daje znak, czy chce **ciąg dalszy ze szczegółami** (dolna część, pod strzałką) — albo nie.
4. Na tej podstawie zaznacza się wiersz w tabeli: czy informować, jak szczegółowo, czy uprzedzać.
5. Czyta się na zmianę, ale **w jednej rundzie odpowiada jedna osoba** — wypełnia się jej tabelę.
   Potem zamiana ról.
6. Nie ma złych odpowiedzi; przy każdej karcie można się zatrzymać i porozmawiać.

### 4.2 Mechanizm imion `[imię]`

- W tekstach kart jest podmienialny placeholder **[imię]**.
- Przed grą każda osoba ustala (a druga zatwierdza) **pseudonim** dla osoby ze swojej innej
  relacji — np. „Kamil". Czytając karty wstawia się go za `[imię]`, naturalnie odmieniając.
- Cel: prawdziwe imiona nie padają (bezpieczeństwo), a opisy brzmią realnie.
- Karta „Imiona na czas gry" ma pola: „Gdy odpowiada ___ … [imię] = ___" ×2 (po jednej parze
  na osobę). W talii są **3 kopie** tej karty (na zapisywanie długopisem przy kolejnych rozgrywkach).

### 4.3 Skład talii (30 kart, 5 stron A4)

- 1× „Jak grać"
- 3× „Imiona na czas gry"
- 22× karty-scenki (pozycje 1–11, 13–20, 23–25 — patrz teksty w §5)
- 4× szablony pustych kart (nr 26–29) — tylko blade podpowiedzi „opis ogólny (wprost o czynności)"
  / „szczegóły (kontekst, jak wyglądało)", separator ze strzałką i odwrócony numer z kropkami

### 4.4 Anatomia karty-scenki

```
┌─────────────────────────────┐
│   OPIS OGÓLNY (serif, 11pt) │  ← wprost nazywa czynność
│  ────────────▼────────────  │  ← separator + strzałka: JEDEN blady kształt,
│                             │     trójkąt doklejony do linii (złudzenie całości)
│   OPIS SZCZEGÓŁOWY (9pt)    │  ← potoczny język, konkrety: jak się zaczęło,
│                             │     jak wyglądało, co zostało w głowie
│    (odwrócony do góry       │
│     nogami odnośnik:        │  ← np. „15 · Seks" — nr + nazwa z tabeli,
│     „NN · nazwa", 6pt)      │     mały, blady, do odnalezienia wiersza
└─────────────────────────────┘
```

- **Bez nagłówków kategorii/klastra** na kartach (były — usunięte).
- **Bez pól do zaznaczania** na kartach (były — usunięte; karty wielokrotnego użytku).

## 5. Finalne teksty kart (źródło prawdy)

Format: `#nr tabeli — nazwa` → **Ogólny** / **Szczegółowy**. Placeholder: `[imię]`.

**1 — Przytulanie**
O: Spędziliśmy z [imię] cały wieczór przytuleni na kanapie.
S: No miało być tylko film, a szybko zrobiło się inaczej — najpierw głowa na ramieniu, potem nogi na mnie i w końcu leżeliśmy całkiem zaplątani pod kocem. Film leciał gdzieś w tle, a my gadaliśmy jeszcze ze dwie godziny i nikomu się nie chciało ruszyć. Było po prostu ciepło i dobrze, oddech [imię] tuż obok.

**2 — Trzymanie za rękę**
O: Szliśmy z [imię] przez miasto, trzymając się za ręce.
S: Złapaliśmy się za ręce gdzieś na pierwszym skrzyżowaniu, tak bez gadania, i już tak zostało do końca. [imię] co chwilę gładził mnie kciukiem po dłoni, nie puszczaliśmy nawet w tłoku. Potem przy kawie trzymaliśmy się jeszcze pod stołem. Niby nic, a chodziłem z tym uśmiechem pół dnia.

**3 — Całowanie**
O: Pocałowaliśmy się z [imię].
S: Staliśmy blisko, rozmowa się urwała i jakoś sami się do siebie nachyliliśmy. Najpierw jeden taki ostrożny, potem już normalnie, kilka razy, [imię] z ręką na mojej szyi. Między buziakami trochę śmiechu i to patrzenie na siebie, jak nikomu nie chce się odsunąć. Najbardziej został mi ten moment napięcia tuż przedtem.

**4 — Pieszczoty / inne formy dotyku**
O: Z [imię] było sporo zmysłowego dotyku i pieszczot — choć bez seksu.
S: Zaczęło się od przytulania i z minuty na minutę robiło się coraz cieplej — buziaki w szyję, ręce pod ubraniem, raz wolniej, raz szybciej. Dużo dotyku i takiego sprawdzania, gdzie są granice, bez spinki. Seks świadomie odpuściliśmy, ale i tak leżeliśmy tak ze sobą jeszcze długo, nieźle rozgrzani.

**5 — Znaczenia na ciele (malinki itp.)**
O: Zostały mi po [imię] ślady na ciele — malinki.
S: Zorientowałem się dopiero rano przed lustrem — kilka śladów na szyi i obojczyku. Trochę mnie to rozbawiło, trochę zawstydziło, bo ciężko je ukryć pod kołnierzem. Taka pamiątka po naprawdę namiętnym wieczorze z [imię].

**6 — Randki / umawianie się**
O: Umówiliśmy się z [imię] na kolejną randkę.
S: Padło to pod koniec ostatniego spotkania — najpierw „a może byśmy…", potem konkretny dzień i w sumie cały plan na wieczór tylko we dwoje. Resztę dogadywaliśmy potem na wiadomościach: godzina, miejsce, co po kolacji. Już samo to ustalanie jakoś nakręcało i nie mogłem się doczekać.

**7 — Prezenty (dawanie / otrzymywanie)**
O: Dostałem od [imię] prezent (albo sam coś podarowałem).
S: Nie z okazji niczego konkretnego — [imię] po prostu pomyślała o mnie i przyniosła drobiazg, który idealnie trafił w mój gust. Zrobiło mi się głupio miło i od razu zacząłem główkować, czym się odwdzięczyć. Takie drobne „widzę cię" znaczy dla mnie więcej, niż się spodziewałem.

**8 — Głęboka bliskość emocjonalna**
O: Zwierzyłem się [imię] z naprawdę ważnych, osobistych rzeczy.
S: Siedzieliśmy do późna i samo zeszło na cięższe tematy — przeszłość, lęki, rzeczy, o których mówię mało komu. Jedno zwierzenie pociągnęło drugie, w obie strony, i w którymś momencie złapałem się, że opowiadam [imię] coś, czego dawno nikomu nie mówiłem. Zaskoczyło mnie, jak bezpiecznie się z tym przy [imię] poczułem.

**9 — Nocowanie / spanie razem (bez seksu)**
O: Zostałem u [imię] na noc — spaliśmy razem w jednym łóżku, bez seksu.
S: Zrobiło się tak późno, że nie było po co wracać, więc zostałem. Pożyczona koszulka, mycie zębów obok siebie, gadanie po ciemku coraz wolniej, aż zasnęliśmy przytuleni. Rano obudziliśmy się wciąż tak samo zaplątani, na luzie. Seksu nie było — i właśnie ten spokój całej nocy obok kogoś został mi najbardziej.

**10 — Wspólne wyjazdy, podróże**
O: Planujemy z [imię] wspólny wyjazd na weekend.
S: Pomysł padł przy gadaniu o wolnym terminie i w kilka minut zrobił się konkretny: dwa dni poza miastem, jeden nocleg, lista miejsc. Od razu zaczęliśmy przeglądać noclegi i podśmiewać się, czy nad wodę, czy w góry. Pierwszy raz planujemy z [imię] coś dłuższego niż jeden wieczór i trochę mnie to ekscytuje, a trochę stresuje.

**11 — Wyjścia na wspólne eventy**
O: Wychodzi na to, że z [imię] będziemy na tym samym evencie co ja z tobą.
S: Okazało się, że oboje mamy bilety na ten sam koncert. Zaczęliśmy kombinować, jak to ogarnąć — iść razem, osobno, czy jakoś się rozdzielić w trakcie. Fajnie, że się nakłada, ale i trochę zawile — i logistycznie, i emocjonalnie.

**13 — Choroby zakaźne (przeziębienie, grypa itp.)**
O: [imię] rozłożyła się z przeziębieniem albo grypą, a widzieliśmy się tuż przedtem.
S: Spędziliśmy razem wieczór, a dzień później [imię] napisała, że leży z gorączką i katarem. Czyli mogłem się od [imię] zarazić — i teoretycznie nieść to dalej. Sam czuję się na razie ok, ale wolę, żebyś wiedział, zanim się zobaczymy.

**14 — Seksting**
O: Wpadliśmy z [imię] w seksting.
S: Zaczęło się od zwykłego pisania, które wieczorem zrobiło się coraz śmielsze — najpierw aluzje, potem konkrety, w którymś momencie poleciały też zdjęcia. Pisaliśmy tak do późna i jedno nakręcało drugie. Było w tym dużo ekscytacji i tego napięcia, że niby tylko słowa, a działa jak mało co.

**15 — Seks**
O: Uprawialiśmy z [imię] seks.
S: Zaczęło się od długiego wieczoru we dwoje, który robił się coraz gorętszy — buziaki, dotyk, było też schodzenie głową pod kołdrę, aż w końcu przeszło w pełny seks. Dużo śmiechu, luzu i sprawdzania, co komu pasuje, bez spinki. Zostaliśmy razem do rana i najbardziej zaskoczyła mnie ta lekkość, jak łatwo nam ze sobą.

**16 — Badania na STI/STD (dot. [imię])**
O: [imię] ma zrobione badania na STI/STD i zna już wyniki.
S: Temat wyszedł, kiedy zaczęliśmy gadać o zbliżeniu i granicach. [imię] zrobiła komplet badań z własnej głowy, jeszcze zanim w ogóle zapytałem, i pokazała mi wyniki wprost, bez ściemy. Pogadaliśmy potem konkretnie, kto się z kim jeszcze widuje — wiemy o sobie nawzajem, jak stoimy zdrowotnie.

**17 — Seks bez zabezpieczeń / zmiana ustaleń**
O: Z [imię] zmieniliśmy ustalenia o bezpieczniejszym seksie — doszło do seksu bez zabezpieczenia.
S: Najpierw była konkretna rozmowa: badania, wyniki, ustalenia z innymi osobami, z którymi się widujemy. Dopiero jak wszystko sobie wyłożyliśmy i zgodziliśmy na te same zasady, zdecydowaliśmy się na to świadomie, nie z zaskoczenia. Dla mnie to był też moment, że poczułem, że robi się między nami poważniej.

**18 — Zauroczenie / fascynacja**
O: Czuję wyraźne zauroczenie [imię] — myślę o tej osobie coraz więcej.
S: Zaczęło się niby od niechcenia, a teraz wraca po kilka razy dziennie — odtwarzam sobie w głowie ostatnie spotkanie, czekam na wiadomość, sprawdzam telefon. Łapię się na uśmiechu na samo wspomnienie [imię] i na tym, że szukam pretekstów, żeby się odezwać. Jeszcze takie lekkie i fajne, ale ciężko to przeoczyć.

**19 — Zakochanie**
O: Chyba się w [imię] zakochuję.
S: Narastało spotkanie po spotkaniu — najpierw tęsknota między nimi, potem myślenie o [imię] przy zwykłych, codziennych rzeczach, aż w końcu dotarło, że to już nie samo zauroczenie. Coraz częściej wyobrażam sobie wspólne plany, dłuższą perspektywę, takie „chcę, żeby to trwało". Trochę mnie zaskakuje, jakie jest mocne.

**20 — „Kocham Cię"**
O: Od [imię] padły słowa „kocham Cię".
S: Wyszło to w takim cichym, bliskim momencie pod koniec wieczoru — bez planu, prawie szeptem, najpierw z jednej strony, potem odpowiedź z drugiej. Zapadła krótka cisza, w której chyba oboje załapaliśmy, że właśnie nazwaliśmy coś ważnego. Długo mi to potem siedziało w głowie.

**23 — Kryzys / konflikt**
O: Mamy z [imię] poważny konflikt — coś się między nami sypie.
S: Zaczęło się od jednej spornej rozmowy, która nagle przerodziła się w kłótnię — podniesione głosy, urażone tony, a potem kilka dni ciszy i dystansu. Pisaliśmy do siebie krótko i chłodno, oboje czekając, kto pierwszy zrobi krok. Nie wiem jeszcze, czy to się da pozbierać, i noszę to w sobie na co dzień.

**24 — Początek nowej relacji z inną osobą**
O: Poznałem [imię] i zaczyna się między nami coś nowego.
S: Trafiliśmy na siebie niedawno i z każdym kolejnym spotkaniem robi się ciekawiej — rozmowy ciągną się godzinami, jest łatwa chemia i to takie „chcę cię znów zobaczyć". Wygląda na początek osobnej, równoległej relacji, na razie świeżej, ale idzie w stronę czegoś więcej niż znajomość. Jestem tym podekscytowany i ciekaw, w którą stronę to pójdzie.
*(Uwaga: tutaj [imię] = nowo poznana osoba, nie dotychczasowa.)*

**25 — Zmiana statusu relacji**
O: Z [imię] wchodzimy w oficjalną relację partnerską.
S: Po jednej z rozmów nazwaliśmy wprost, czym dla siebie jesteśmy, i ustaliliśmy, że [imię] jest dla mnie partnerem/partnerką. Pojawiły się większe deklaracje, plany na dłużej i ustalenia, jak chcemy o sobie mówić na zewnątrz. To świadomy krok dalej, nie samo płynięcie z prądem — i czuję z tym i dumę, i lekki respekt.

### 5.1 Wytyczne redakcyjne do tekstów (przy dopisywaniu nowych)

- Opis **ogólny wprost nazywa czynność** (bez zgadywania, o co chodzi).
- Opis **szczegółowy rozszerza o kontekst i konkrety**: od czego się zaczęło, jak to wyglądało,
  co zostało w głowie / co się w tym podobało.
- **Język potoczny, mówiony** („bez spinki", „na luzie", „nakręcało") — nie literacki.
- Pierwsza osoba; formy „my" tam, gdzie się da (teksty pisane z męskiej perspektywy narratora —
  patrz pytanie 1 w §8).
- Bez słowa „związek"; „seksting" przez „ks"; bez „pikantnych wiadomości" i podobnych kalek.

## 6. Decyzje designerskie i wnioski (dlaczego tak)

### Tabela
- **B&W-first**: kolumny checkboxów rozdzielone tylko liniami (bez szarych podkładów —
  testowaliśmy, uznane za zbędne); poziome linie wyraźniejsze, pionowe ledwo widoczne
  (prowadzenie wzroku wzdłuż wiersza).
- Elementy do zamalowywania (`!`, `X`, checkboxy) w **niskim opacity** (9–42%) — mają być
  widoczne, ale nie dominować; zamalowanie długopisem tworzy czytelny kontrast.
- `□ ogólnie / szczegóły □` w **jednej linii**, checkbox z lewej i prawej — szybciej skanowalne
  niż dwa wiersze.
- „must say" po lewej (skraj), „DON'T TELL" **za tytułem czynności** (środek tabeli) — użytkownik
  chciał X-a blisko środka.
- Wiersze niebędące „zdarzeniami" (czas, no-go spaces/talks) mają **pola tekstowe** zamiast
  checkboxów — semantyka „do ustalenia/wypisania", nie „informować czy nie".

### Karty
- Grid **2×3 stykających się kart** = najmniej cięć; wspólna krawędź to jedno cięcie.
  Crop marks w narożnikach bloku i na przedłużeniu linii wewnętrznych.
- Separator + strzałka `▾` jako **jeden blady kształt** (trójkąt doklejony do linii) —
  wcześniejsza wersja z ciemną, dużą strzałką odrzucona.
- **Odwrócony (180°) odnośnik** na dole karty („NN · nazwa") — czytelny dla osoby siedzącej
  naprzeciwko / przy odkładaniu karty, nie zakłóca czytania scenki.
- Historia iteracji (czego NIE robić): nagłówki kategorii na kartach (usunięte);
  checkboxy na kartach (usunięte — karty wielokrotnego użytku); napis „ZA ZGODĄ — CZYTAJ DALEJ"
  (usunięty — sama strzałka wystarcza); duża ciemna strzałka (zmieniona na bladą zespoloną z linią).

### Techniczne (obecna implementacja)
- PDF-y generowane w **Pythonie / ReportLab**; czcionki **DejaVu** (pełne polskie znaki).
- Tabela: A4 pion, marginesy ~9 mm, wszystko na 1 stronie.
- Karty: blok 188×273 mm wycentrowany na A4; komórka 90×88 mm (whitespace wewn. 6/5 mm);
  BaseDocTemplate z ramką bez paddingu (SimpleDocTemplate dodaje domyślny padding i psuje łamanie).
- HTML-owe wersje interaktywne (tabela + gra) istnieją jako **wcześniejsze artefakty**
  (gra-karciana.html, tabela-granice-informowania.html) — NIE są zsynchronizowane z finalnymi
  PDF-ami (starsza lista pozycji i teksty). Traktować jako prototypy UI, nie źródło prawdy.

## 7. Znane niespójności / dług

- HTML-e (patrz wyżej) mają starszą listę pozycji (17) i stare teksty — do aktualizacji
  albo usunięcia.
- Teksty kart pisane z męskiej perspektywy narratora („zostałem", „chodziłem") — brak
  wariantów żeńskich/neutralnych (patrz §8, pytanie 1).
- Karta 16 (badania STI/STD) zakłada żeńską osobę trzecią („zrobiła", „pokazała") — j.w.
- Szablony kart mają numery 26–29 „na sztywno" — jeśli tabela urośnie, numeracja się rozjedzie.
- Brak wariantów scenek (po 1 na pozycję) — przy powtórnym graniu talia jest przewidywalna.

## 8. 10 pytań poszerzających (do zebrania kontekstu przed dalszym rozwojem)

1. **Rodzaj gramatyczny narratora**: teksty są w rodzaju męskim. Czy potrzebne są warianty
   żeńskie/neutralne (osobne talie? podwójne końcówki „zostałem/am"? neutralizacja składni)?
2. **Skala odpowiedzi**: czy obecna binarna siatka (informować / nie + ogólnie / szczegóły)
   wystarcza, czy przydałby się poziom pośredni (np. „tylko jak zapytam") albo wymiar czasu
   („od razu / przy najbliższym spotkaniu / kiedykolwiek")?
3. **Liczba osób**: narzędzie zakłada diadę wypełniającą (2 osoby, egzemplarz per osoba).
   Czy planowane jest użycie w konfiguracjach 3+ (np. triada, hierarchie, kitchen-table)?
   Jak wtedy wersjonować egzemplarze?
4. **Cykl rewizji**: jak często wracacie do tabeli? Czy dodać pole „ważne do / przejrzeć po…",
   miejsce na historię zmian, albo osobny „changelog" ustaleń?
5. **Onboarding emocjonalny**: czy przed grą potrzebna jest karta/rytuał otwarcia i zamknięcia
   (check-in / check-out, zasada stop-słowa, co robić gdy karta wywoła trudne emocje)?
6. **Zakres talii**: czy dorobić warianty scenek (2–3 na pozycję) na powtórne granie?
   Czy jakieś pozycje z odrzuconych (kink/BDSM, social media, znajomi/rodzina, ciąża)
   powinny jednak wrócić?
7. **Docelowy nośnik rozwoju**: repo `poly-helper` sugeruje aplikację. Co jest celem —
   web-app do generowania spersonalizowanych PDF-ów (wybór pozycji, własne teksty, języki),
   czy narzędzie czysto drukowane rozwijane jako pliki?
8. **Personalizacja pozycji**: czy lista 25 pozycji ma być edytowalna per para (dodawanie,
   ukrywanie, zmiana kolejności), czy stała jako „kanon" z pustymi wierszami na wyjątki?
9. **Prywatność i bezpieczeństwo**: mechanizm `[imię]`-pseudonimów działa przy druku.
   Jeśli powstanie wersja cyfrowa — jakie są wymagania (offline-only? brak kont? szyfrowanie
   lokalne? eksport bez danych)?
10. **Testy z użytkownikami**: czy narzędzie było już używane w praktyce? Co zadziałało,
    co zgrzytało (np. długość rozgrywki ~22 kart, czytelność bladych znaczników po wydruku,
    rozmiar kart w dłoni)? To dane, które najlepiej ukierunkują kolejną iterację.

## 9. Pliki w archiwum

| Plik | Opis |
|---|---|
| `poly-helper-dump.md` | ten dokument |
| `tabela-granice-informowania.pdf` | finalna tabela (1×A4, B&W, 25 pozycji + 3 puste) |
| `gra-karty.pdf` | finalna talia (5×A4, 30 kart: zasady, 3× imiona, 22 scenki, 4 szablony) |
| `tabela-granice-informowania.html` | prototyp interaktywnej tabeli (NIEaktualny — 17 pozycji) |
| `gra-karciana.html` | prototyp interaktywnej gry (NIEaktualny — 17 scenek, stare teksty) |
