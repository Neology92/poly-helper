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
| Tabela granic informowania | `tabela-granic` | w budowie (placeholder) |
| Gra karciana | `gra-karciana` | w budowie (placeholder) |

## Stack

- **Vite + React + TypeScript** — SPA z code-splittingiem per narzędzie.
- **react-router-dom** — routing (`/` + `/n/:slug`).
- **vite-plugin-pwa** (`autoUpdate`) — offline + automatyczna aktualizacja do najnowszego buildu.
- **@fontsource-variable** (Inter + Fraunces) — fonty self-hosted (działają offline).
- Dane użytkownika: **lokalnie** (localStorage/IndexedDB) — bez backendu, bez kont.
- Generowanie PDF: **po stronie klienta** (docelowo pdf-lib / react-pdf) — jeden codebase
  dla wersji online i drukowanej.

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

## Źródła prawdy

- **Treści** (pozycje tabeli, teksty kart, wytyczne redakcyjne, decyzje designerskie):
  `poly-helper-dump.md`.
- **Wygląd**: `src/styles/tokens.css`.
- `docs/reference/` zawiera finalne PDF-y i **nieaktualne** prototypy HTML (17 pozycji,
  stare teksty) — traktować jako referencję UI, nie źródło prawdy.

## Deploy (Netlify)

Konfiguracja jest w `netlify.toml`:

- build: `npm run build`, publish: `dist`,
- SPA fallback (każda ścieżka → `index.html`),
- `sw.js` i `manifest.webmanifest` bez agresywnego cache (użytkownik nie utknie na starym buildzie).

Podłączenie repo do Netlify (raz): New site → wybierz to repozytorium → ustawienia
build zaciągną się z `netlify.toml`. Kolejne pushe na gałąź produkcyjną deployują się automatycznie.

## Roadmapa

- [x] Szkielet: rejestr narzędzi, routing, PWA, deploy na Netlify.
- [ ] Model danych tabeli (25 pozycji + puste) jako typowane dane — przeniesienie z dumpa.
- [ ] Interaktywna **Tabela granic informowania** (wypełnianie + zapis lokalny).
- [ ] Eksport tabeli do PDF (pusty szablon + wersja wypełniona).
- [ ] Teksty i talia **Gry karcianej** + tryb online (mechanizm `[imię]`).
- [ ] Eksport talii do PDF (grid 2×3, crop marks) — odtworzenie layoutu z ReportLab.
- [ ] Kolejne narzędzia dla relacji (poli i mono).

## Filozofia

Te narzędzia służą **rozmowie, nie są kontraktem na zawsze**. Wraca się do nich, gdy coś
się zmienia. Prywatność jest domyślna: dane zostają na urządzeniu, a mechanizmy w rodzaju
pseudonimów `[imię]` mają sprawić, że prawdziwe imiona nie muszą padać.
