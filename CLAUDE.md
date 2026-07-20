# CLAUDE.md

Wskazówki dla Claude Code przy pracy nad tym repo.

## Czym jest projekt

poly-helper — zestaw drukowalnych i webowych narzędzi wspierających relacje (głównie
poliamoryczne, też mono). Publikacja: Netlify, statyczna PWA, zawsze najnowszy build.
Każde narzędzie ma tryb online (wypełnianie, zapis lokalny) i eksport do PDF.

## Źródła prawdy — czytaj przed zmianami treści/wyglądu

- `poly-helper-dump.md` — **treść**: model danych tabeli (25 pozycji), finalne teksty kart,
  wytyczne redakcyjne, decyzje designerskie i dług techniczny. To kanon treści.
- `src/styles/tokens.css` — **wygląd**: paleta, typografia.
- `docs/reference/` — finalne PDF-y + **nieaktualne** prototypy HTML (17 pozycji). Referencja UI,
  nie kopiuj z nich treści.

## Architektura (skrót)

- Vite + React + TS, SPA (`/` + `/n/:slug`), PWA (`autoUpdate`), fonty self-hosted.
- **Rejestr narzędzi**: `src/tools/registry.tsx` — jedyne miejsce, by dodać narzędzie.
  Każde narzędzie to `src/tools/<slug>/index.tsx` (default export, leniwie ładowany).
- Dane użytkownika: lokalnie (bez kont, offline). PDF: generowane po stronie klienta.

## Konwencje

- Język UI i komentarzy: **polski**. Pisownia „seksting" przez „ks"; unikać słowa „związek"
  (preferować „relacja"); unikać kalek brzmiących cringe'owo.
- **Język inkluzywny:** przymiotniki/imiesłowy odnoszące się do osoby o nieznanej płci pisz
  z końcówką **„-x"** (np. „ważnx", „gotowx", „wysłuchanx"), **nie** w formie męskoosobowej ani
  z podkreśleniem („ważn_a"). Gdy naturalne — formy bezosobowe/neutralne („Zapisano", „Dodaj wpis").
  Uwaga: teksty kart Gry (narracja w 1. os. czasu przeszłego) to osobny, głębszy problem — Epik #5.
- Typografia w tekstach: cudzysłowy „ " — **nie** wstawiaj prostego `"` wewnątrz atrybutu
  JSX `attr="..."` (zamyka atrybut). W razie potrzeby użyj `attr={'...'}`.
- Prywatność domyślna: nie dodawaj kont/telemetrii/backendu bez wyraźnej decyzji.

## Komendy

```bash
npm run dev        # dev server
npm run build      # tsc -b && vite build  (musi przechodzić przed commitem)
npm run typecheck  # sama kontrola typów
npm run preview    # podgląd produkcyjnego buildu (weryfikacja deep-linków)
```

## Gałąź

Praca na `claude/polyamory-tools-project-brwb03`.
