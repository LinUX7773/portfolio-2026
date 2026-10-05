# Lin Bele Jacobsen — portfolio 2026

Statisk Astro-nettsted, klart for gratis hosting på Cloudflare Pages.

## Slik kjører du lokalt

Du trenger Node.js 22 eller nyere.

```sh
npm install
npm run dev
```

Nettstedet åpnes på `http://localhost:4321`.

## Språk

Nettstedet finnes på norsk (standard, på `/`) og engelsk (på `/en`).

- Felles tekster (meny, footer, knapper) ligger i `src/i18n/index.ts`.
- Sidene ligger i `src/views/`, med norsk og engelsk tekst i samme fil.
- `src/pages/` og `src/pages/en/` inneholder bare tynne filer som viser hver side på riktig språk.

## Slik legger du til et prosjekt

1. Kopier `src/content/projects/en/placeholder-case-study.md`.
2. Gi filen et kort filnavn, for eksempel `navn-pa-prosjekt.md`.
3. Lag én norsk versjon i `src/content/projects/nb/` og én engelsk i `src/content/projects/en/`, med samme filnavn.
4. Fyll ut feltene øverst (tittel, sammendrag, rolle, år, klient, tema) og skriv prosjektet under. Bilder, diagrammer og tekst kan ligge i Markdown.

Sidene `/projects/[filnavn]` og `/en/projects/[filnavn]` lages automatisk.

Sett `draft: true` hvis et prosjekt ikke skal vises ennå.

## Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** `22`

Ingen database, backend eller React.
