# Lin Bele Jacobsen — portfolio 2026

Statisk Astro-nettsted, klart for gratis hosting på Cloudflare Pages.

## Slik kjører du lokalt

Du trenger Node.js 22 eller nyere.

```sh
npm install
npm run dev
```

Nettstedet åpnes på `http://localhost:4321`.

## Slik legger du til en case study

1. Kopier `src/content/projects/placeholder-case-study.md`.
2. Gi filen et kort filnavn, for eksempel `navn-pa-prosjekt.md`.
3. Fyll ut feltene øverst (tittel, sammendrag, rolle, år, klient, tema).
4. Skriv selve casen under. Bilder, diagrammer og forskningstekst kan ligge i Markdown.

Siden `/projects/[filnavn]` lages automatisk.

Sett `draft: true` hvis en case ikke skal vises ennå.

## Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** `22`

Ingen database, backend eller React.
