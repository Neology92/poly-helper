# Research: społeczność poli — bolączki, istniejące narzędzia, ostrzeżenia

> Utrwalone wyniki researchu produktowego (2026-07). Źródło: analiza forów/blogów/klinicystów.
> Uwaga metodologiczna: Reddit blokuje automatyczny crawling — część oparta na źródłach wtórnych
> cytujących wątki r/polyamory i r/nonmonogamy; reszta bezpośrednio z podanych źródeł.
> To materiał kierunkowy dla roadmapy, nie prawda absolutna — warto weryfikować przed decyzjami.

## Bolączki społeczności (rankingiem częstości)

**Tier 1 — niemal uniwersalne:**
- **Zazdrość / niepewność.** Rama społeczności: zazdrość to *sygnał* niezaspokojonej potrzeby, nie
  wada do stłumienia (Leanne Yau; Multiamory „Newbie Mistakes"; KinderMind).
- **Zarządzanie czasem / grafik / wypalenie.** Najbardziej „narzędziowa" bolączka — logistyka, nie
  tylko emocje: daty, rocznice, czas na check-iny (Weel; KinderMind).
- **Komunikacja / brak regularnych check-inów** („communication cop-out" — Multiamory).

**Tier 2 — konflikty strukturalne:**
- Granice vs zasady + hierarchia/weto („monogamiczny szablon", weto jako top mistake).
- **NRE** (nowa relacja destabilizuje istniejące; kliniczne toolkity przygotowują na NRE — Kauppi).
- **Metamours** (przywiązanie jest „usieciowione" — Nested Attachment Model, Fern).

**Tier 3 — sytuacyjne, ale powracające:**
- Relacje **mono/poli**; **coming out / stygma / bezpieczeństwo** (realne ryzyko: zwolnienie z pracy,
  brak ochrony prawnej); **koordynacja STI** (kadencja ~3 mies., bariery, dzielenie statusu w sieci);
  **niezaspokojone potrzeby / rozstania**.

Reprodukcja wątków samodzielnie (zalogowany na Reddit):
`site:reddit.com/r/polyamory scheduling google calendar`, `... "feeling like a secondary"`,
`site:reddit.com/r/nonmonogamy spreadsheet track partners`.

## Istniejące narzędzia (i ich granice)

- **Aplikacje.** PYE (lovepye.com — „pierwszy kalendarz dla poliamorii": prywatność per-partner,
  potwierdzanie zgody na daty, wspólna dostępność) — wąsko kalendarzowe. Weel Planner (okno na Apple
  Calendar, „nie przechowuje danych kalendarza" — sygnał zaufania) — tylko Apple/grafik. **„The Poly
  Life"** — przestroga: r/polyamory zareagowało „mamy dość oprogramowania" (Fast Company).
  **De facto standard:** Kalendarz Google (kolory per partner) + arkusze + dokumenty.
- **Arkusze / szablony.** **Relationship Anarchy Smorgasbord** („bufet" komponentów relacji do
  wspólnego złożenia); **user manuals / „State of the Relationship"**; szablony umów (Etsy, terapeuci);
  **toolkit kliniczny Kauppi** (92 s.).
- **Frameworki.** **Multiamory RADAR** (miesięczny ustrukturyzowany check-in) + **Triforce of
  Communication** (najpierw nazwij cel rozmowy: 1. być wysłuchanym, 2. wsparcie/świętowanie,
  3. rozwiązać problem) + Smorgasbord; **Polysecure (Fern)** — Nested Attachment + HEARTS; też NVC,
  teoria przywiązania.
- **Luka integracyjna:** nikt nie spina *check-in + żywa umowa + grafik + kadencja STI* w jedną prostą,
  prywatną całość.

## MVP — gdzie realna wartość

Most między *emocjonalnym* (podcasty/PDF/książki) a *logistycznym* (Kalendarz/arkusze) — nikt go
czysto nie zbudował. Sygnał: ludzie sami budują arkusze (klasyczny „workaround"). Kierunki:
1. **check-in RADAR** zapisywany, z historią;
2. **żywa umowa / user-manual** wersjonowana;
3. **warstwa zdrowia** (kadencja badań);
4. **grafik świadomy uczciwości** (czy nie zaniedbuję partnera);
5. **widok sieci** (metamours).

Prowadzić warstwą check-in/umowa (nieobsłużone), nie kolejnym kalendarzem (zatłoczone; „lepsze niż
arkusz + Kalendarz Google" to warunek adopcji).

## Pitfalls / ostrzeżenia (KRYTYCZNE)

- **Prywatność/outing = egzystencjalne.** Najbardziej wrażliwe dane (orientacja, struktura, zdrowie,
  tożsamość partnerów, którzy nie zgodzili się być w apce). Udokumentowane szkody: outing, wyciek zdjęć,
  szantaż, nękanie; weryfikacja tożsamości/twarzy bywa *niebezpieczna* (PoPETs 2024; Privacy Guides 2025).
  → data minimization / local-first; rozważyć szyfrowanie po stronie klienta; zero ad-SDK/trackerów;
  **zgoda nie-użytkowników** (pseudonimizacja, nie wymagać konta partnera); bezpieczeństwo realne
  (dyskretna ikona/nazwa, szybkie ukrycie, powiadomienia bez treści).
- **Nie gamifikować intymności** — krytyka „Quantified Relationship" (mentalność tit-for-tat odziera
  gesty ze znaczenia). Metryki tylko jako prompty do refleksji, nigdy wyniki/streaki/rywalizacja
  (Danaher; Mackinnon).
- **Żadnej „jedynej słusznej drogi"** — społeczność podzielona (hierarchia vs RA; zasady vs granice).
  Domyślne „primary"/weto alienują i mogą *wzmacniać* kontrolę. Struktury konfigurowalne, bez oceny.
- **Inkluzywność** — queer/trans/neuroróżnorodni/kink/solo-poli/RA są rdzeniem; sztywne założenia
  płci/kształtu wykluczają.
- **Zaufanie z góry** — groźne dane + historia wycieków + działające darmowe workaroundy = trzeba
  zasłużyć (jawność o danych, ew. open-source/audyt, brak reklam, minimalizm).

## Kierunki przyszłościowe (nice-to-have, NIE teraz)

- **Opcjonalna synchronizacja między urządzeniami** dla małej skali (~100–200 osób), minimalnym
  nakładem, np. przez **Supabase**. Wyłącznie plan na przyszłość. Twarde warunki (CLAUDE.md: prywatność
  domyślna): local-first pozostaje domyślne; sync opt-in; rozważyć szyfrowanie E2E / zero-knowledge;
  brak wymogu konta partnera; minimalizacja danych. Do zaprojektowania osobno, gdy przyjdzie czas.

## Źródła (wybór)

multiamory.com/podcast/561 · multiamory.com/radar · beyond-monogamy.com (Leanne Yau) ·
kauppimartha.medium.com (toolkit) · shortform.com/blog/polysecure-book · lovepye.com · weelplanner.app ·
fastcompany.com/3038098 · readyforpolyamory.com (smorgasbord) ·
petsymposium.org/popets/2024/popets-2024-0046 · privacyguides.org (queer dating apps, 2025) ·
philpapers.org (The Quantified Relationship).
