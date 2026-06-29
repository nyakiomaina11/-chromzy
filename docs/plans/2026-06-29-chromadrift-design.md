# CHROMZY - Solana NFT Landing Site Design

**Date:** 2026-06-29  
**Status:** Approved for implementation

## Design Read

Reading this as: **NFT collection landing for crypto-native collectors**, with a **dark tech / premium digital art** language, leaning toward **native CSS + restrained motion + Solana-adjacent cyan accent**.

**Dials:** DESIGN_VARIANCE 8 | MOTION_INTENSITY 6 | VISUAL_DENSITY 4

## Brand

| Token | Value |
|-------|-------|
| Name | CHROMZY |
| Tagline | 4,444 souls drifting on Solana |
| Chain | Solana (Metaplex Core) |
| Supply | 4,444 |
| Accent | Electric cyan `#14F5D4` on zinc-950 `#09090b` |
| Display font | Outfit (Google Fonts, self-hosted via link for static site) |
| Mono font | JetBrains Mono |

## Competitor Patterns (Research)

From Mad Lads, DeGods, Tensor-adjacent drops, and 2025-2026 mint UX guides:

1. **Above-fold clarity** - price, chain, supply, CTA before wallet connect
2. **Progressive wallet** - connect only on mint/claim intent
3. **Micro-app pages** - focused mint page separate from story/gallery
4. **Transparent mint states** - placeholder UI for Sign / Confirm / Pending
5. **Mobile-first** - large tap targets, hamburger nav
6. **Rarity explorer** - dedicated collection page with trait filters (UI only)
7. **Roadmap timeline** - phased utility without fake precision numbers

## Information Architecture

```
/ (index)          - Hero, stats, featured NFTs, utility bento, CTA
/collection.html   - Full gallery grid, trait filters, rarity placeholders
/mint.html         - Mint widget, phases, wallet connect stub, tx states
/roadmap.html      - Timeline, milestones, vision
/about.html        - Lore, manifesto, brand story
/team.html         - Core team cards
/faq.html          - Accordion FAQ
```

## Shared Components

- Sticky nav (single line desktop, hamburger mobile)
- Connect Wallet button (stub - `data-wallet-connect`)
- Footer with social links, Solana badge, legal links
- NFT image placeholder component (`data-nft-slot`)
- Toast/notification stub for wallet events
- Reduced-motion CSS media query

## Wallet Integration (User-Owned)

Placeholder only. `js/wallet.js` exports:
- `initWalletUI()` - binds connect button
- `getWalletState()` - returns `{ connected: false, address: null }`
- Events: `wallet:connect`, `wallet:disconnect` (custom events for later)

User will wire Phantom/Solflare/WalletConnect later.

## Image Placeholders

All NFT slots use structured placeholders:
```html
<div class="nft-slot" data-nft-id="001" data-aspect="1/1">
  <span class="nft-slot__label">NFT #001</span>
  <span class="nft-slot__hint">Replace with your art</span>
</div>
```

## Loop Plan

| Loop | Focus |
|------|-------|
| 1 | Scaffold, CSS system, home + nav + footer |
| 2 | All remaining pages + wallet stub |
| 3 | Motion, polish, competitor UX patterns |
| 4 | Pre-flight audit, a11y, mobile, copy audit |

## Pre-Flight Targets

- Zero em-dashes in copy
- One accent color throughout
- Hero fits viewport
- Max 1 marquee (trait ticker on home)
- Connect wallet visible in nav on all pages
- All pages share consistent theme (dark lock)
