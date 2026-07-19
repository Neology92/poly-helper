# poly-helper

Zestaw narzędzi wspierających budowanie relacji — przede wszystkim **poliamorycznych**,
choć wiele z nich sprawdzi się w każdej relacji. Każde narzędzie działa w dwóch trybach:

- **online** — wypełnianie w przeglądarce, z zapisem lokalnym (bez konta, offline),
- **druk** — eksport do PDF (pusty szablon oraz wersja z Waszymi odpowiedziami).

Strona jest publikowana na Netlify jako statyczna aplikacja (PWA), więc zawsze dostępny
jest **najnowszy build** — łatwiej podać znajomym link niż rozsyłać pliki PDF.

## Status

Wczesny szkielet. Działa: strona główna z rejestrem narzędzi, routing, PWA, deploy.
Treść i logika poszczególnych narzędzi są dokładane krok po kroku (patrz Roadmapa).

Narzędzia (docelowe, treści i wersje PDF gotowe — patrz `poly-helper-dump.md`):

| Narzędzie | Slug | Status |
|---|---|---|
| Tabela granic informowania | `tabela-granic` | wypełnianie online + eksport PDF |
| Gra karciana | `gra-karciana` | tryb online + eksport talii do druku |

## Stack

- **Vite + React + TypeScript** — SPA z code-splittingiem per narzędzie.
- **react-router-dom** — routing (`/` + `/n/:slug`).
- **vite-plugin-pwa** (`autoUpdate`) — offline + automatyczna aktualizacja do najnowszego buildu.
- **@fontsource-variable** (Inter + Fraunces) — fonty self-hosted (działają offline).
- Dane użytkownika: **lokalnie** (localStorage/IndexedDB) — bez backendu, bez kont.
- Generowanie PDF: **po stronie klienta** (pdfmake + font Roboto z pełnymi polskimi znakami,
  ładowany leniwie) — jeden codebase dla wersji online i drukowanej.

## Uruchomienie lokalnie

```bash
npm install
npm run dev        # serwer deweloperski (http://localhost:5173)
npm run build      # produkcyjny build do dist/
npm run preview    # podgląd produkcyjnego buildu
npm run typecheck  # sama kontrola typów
```

Wymagany Node 22+.

## Architektura

```
src/
  main.tsx                # bootstrap: Router + StrictMode
  App.tsx                 # drzewo tras (Home, /n/:slug, 404)
  styles/
    tokens.css            # design tokens (paleta, typografia) — źródło prawdy wyglądu
    global.css            # reset + style globalne + import fontów
  components/             # wspólne UI (Layout, Home, ToolPage, ToolPlaceholder, …)
  tools/
    types.ts              # typy: ToolMeta, Tool
    registry.tsx          # ⬅ REJESTR NARZĘDZI — jedyne miejsce, by dodać narzędzie
    <slug>/index.tsx      # ekran konkretnego narzędzia (leniwie ładowany)
public/
  icon.svg, icon-maskable.svg
docs/reference/           # oryginalne PDF-y i prototypy HTML (nie źródło prawdy kodu)
poly-helper-dump.md       # ⬅ ŹRÓDŁO PRAWDY treści: pozycje tabeli, teksty kart, decyzje
```

### Jak dodać nowe narzędzie

1. Utwórz `src/tools/<slug>/index.tsx` z domyślnym eksportem komponentu-ekranu.
2. Dopisz jeden wpis do tablicy `tools` w `src/tools/registry.tsx` (metadane + leniwy import).

Strona główna (karty) i routing zbudują się automatycznie z rejestru.

### Jak dodać artykuł (sekcja „Wiedza")

Analogicznie, ale w module `src/knowledge/`:

1. Utwórz `src/knowledge/<slug>/index.tsx` z domyślnym eksportem komponentu artykułu.
2. Dopisz wpis do `articles` w `src/knowledge/registry.tsx`.

Artykuły mają trasę `/w/:slug` i sekcję „Wiedza" na stronie głównej (narzędzia: `/n/:slug`).

## Źródła prawdy

- **Treści** (pozycje tabeli, teksty kart, wytyczne redakcyjne, decyzje designerskie):
  `poly-helper-dump.md`.
- **Wygląd**: `src/styles/tokens.css`.
- `docs/reference/` zawiera finalne PDF-y i **nieaktualne** prototypy HTML (17 pozycji,
  stare teksty) — traktować jako referencję UI, nie źródło prawdy.

## Deploy (Netlify)

Strona jest live: **https://poly-helper.netlify.app** (projekt `poly-helper`,
zespół `neology92`, siteId `476377dc-65dd-47bf-b14d-0a7db6ada9e0`).

### Auto-deploy z GitHuba — AKTYWNE

Continuous deployment jest **włączone z gałęzi `main`**: każdy `git push` na `main`
automatycznie buduje się w chmurze Netlify (wg `netlify.toml`) i wjeżdża na produkcję.

Konfiguracja (`netlify.toml`):

- build: `npm run build`, publish: `dist`,
- SPA fallback (każda ścieżka → `index.html`),
- `sw.js` i `manifest.webmanifest` bez agresywnego cache (nikt nie utknie na starym buildzie).

Połączenie repo↔Netlify zrobione metodą **deploy key + webhook** (bez GitHub App):
klucz „Netlify poly-helper deploy key" w ustawieniach repo (read-only) oraz webhook
na `https://api.netlify.com/hooks/github`. Nie usuwaj ich, bo rozłączą CD.

### Deploy ręczny (awaryjnie, CLI)

Gdyby trzeba wypchnąć build z pominięciem gita:

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

(Podpięcie folderu na nowej maszynie: `npx netlify-cli link --id 476377dc-65dd-47bf-b14d-0a7db6ada9e0`.)

## Roadmapa

- [x] Szkielet: rejestr narzędzi, routing, PWA, deploy na Netlify.
- [x] Model danych (kanon 25 pozycji + teksty kart) jako typowane dane — `src/data/`.
- [x] Interaktywna **Tabela granic informowania** (wypełnianie + zapis lokalny, wiele egzemplarzy).
- [x] Eksport tabeli do PDF (pusty szablon + wersja wypełniona) — pdfmake, 1×A4, pełne PL znaki.
- [x] **Gra karciana** — tryb online: zasady, pseudonim `[imię]`, karty z odsłanianiem szczegółów.
- [x] Eksport talii do PDF (30 kart, 5×A4, grid 2×3, crop marks, linie cięcia).
- [x] Sekcja **Wiedza** + artykuły „Czym jest poliamoria?" i „Zazdrość i kompersja"
  (ze źródłami, słowniczkiem, mitami; wspólne komponenty w `src/knowledge/components.tsx`).
- [x] Profile osób partnerskich + checklista zakresu pozycji (tabela); zmiana nazwy profilu.
- [x] Tryb ciemny (przełącznik w nagłówku, zapamiętywany; start z preferencji systemu).
- [ ] Kolejne narzędzia dla relacji (poli i mono) oraz artykuły Wiedzy.
- [ ] (nice-to-have) warianty rodzajowe tekstów, odmiana `[imię]`, font serif w PDF kart.

## Filozofia

Te narzędzia służą **rozmowie, nie są kontraktem na zawsze**. Wraca się do nich, gdy coś
się zmienia. Prywatność jest domyślna: dane zostają na urządzeniu, a mechanizmy w rodzaju
pseudonimów `[imię]` mają sprawić, że prawdziwe imiona nie muszą padać.
