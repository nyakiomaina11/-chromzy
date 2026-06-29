# CHROMZY

A light, editorial, gallery-catalogue website for a Solana NFT drop. Warm paper, Bodoni Moda display, a single vermilion spot ink — deliberately the opposite of the dark-neon NFT template. Built as a static site: plain HTML, modular CSS, and vanilla ES modules. No build step, no framework.

> Catalogue plates are baked to `assets/images/nfts/{id}.webp` from the generative colour engine. Re-bake with `node scripts/bake-plates.mjs`. The living plate on the index stays live `<canvas>`.

## Features

- **Editorial catalogue design** — asymmetric 12-column grid, hairline rules, real typographic scale
- **Generative colour plate** — `<canvas>` Albers fields in OKLCH palettes, click to re-roll ([js/plate.js](js/plate.js))
- **Catalogue grid** — filter + search, plate detail modal
- **Acquire flow** — mint phases, spec sheet, live plate preview, real Phantom / Solflare / Backpack wallet connect + transaction states
- **Expressive roadmap** — "The Edition Log," a voyage with compass, dashed route, and wax seals
- **Motion** — scroll reveals, stagger, count-ups, global hover + zoom, page loader; all respect `prefers-reduced-motion`
- **Responsive** — mobile masthead, hamburger nav, fluid type
- **SEO** — per-page meta, Open Graph + Twitter, canonical, JSON-LD (VisualArtwork + FAQPage), `sitemap.xml`, `robots.txt`
- **A11y** — skip link, focus-visible rings, ARIA on nav/modals/accordion

## Pages

| Page | File | Nav |
|------|------|-----|
| Home | `index.html` | Index |
| Catalogue | `collection.html` | Plates |
| Acquire / mint | `mint.html` | Acquire |
| Edition log (voyage) | `roadmap.html` | Edition |
| Curatorial note | `about.html` | Note |
| The studio | `team.html` | Studio |
| FAQ | `faq.html` | FAQ |
| Terms | `terms.html` | (footer) |
| Privacy | `privacy.html` | (footer) |
| License | `license.html` | (footer) |

## Stack

- HTML5 · modern CSS (custom properties, `@import` layers, container-free responsive grid)
- Vanilla JS ES modules — no bundler
- Fonts: Bodoni Moda · IBM Plex Mono · Helvetica (system)
- Wallets: Phantom / Solflare / Backpack via the injected provider standard

## Structure

```
.
├── index.html  collection.html  mint.html  roadmap.html  about.html  team.html  faq.html
├── terms.html  privacy.html  license.html
├── css/        variables · base · effects · components · pages · interactions   (→ main.css)
├── js/         main · nav · wallet · animations · ui · plate · collection-data · collection-page
├── assets/     og-image.svg · images/nfts/*.webp   (baked plate art)
├── scripts/    bake-plates.mjs                     (regenerate NFT images)
├── docs/       research/  plans/                       (competitor + inspiration reports)
├── sitemap.xml  robots.txt  netlify.toml  vercel.json
└── .env.example                                        (Firecrawl key → .env.local, gitignored)
```

## Local development

No build. Serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

Static — deploys anywhere. Configured for **Vercel** (`vercel.json`) and **Netlify** (`netlify.toml`) with security headers and long-cache for `/assets`.

```bash
vercel --prod
```

## Customize

- **Copy & catalogue data:** [js/collection-data.js](js/collection-data.js)
- **Artwork:** drop files in `assets/images/` and point the catalogue at them
- **Wallet:** [js/wallet.js](js/wallet.js) (`DEMO_MODE = true` to simulate without an extension). Wire the mint transaction where `data-mint-action` is handled in [js/main.js](js/main.js)

## License

Code: MIT. Generative plate artwork © Studio Chromzy — not covered by the code license.
