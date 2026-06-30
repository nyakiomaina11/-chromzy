# CHROMZY Loops 5-8: Brainstorm & Plan

**Date:** 2026-06-29  
**Prior loops 1-4:** Scaffold, pages, motion layer, initial polish (complete)

## Brainstorm: What top NFT sites do that we still lack

| Pattern | Mad Lads / DeGods / Claynos | Our gap |
|---------|----------------------------|---------|
| Mint progress live | Supply bar, countdown | Static numbers only |
| NFT detail on click | Trait breakdown modal | Grid only |
| Social proof | Holder quotes, Discord size | None |
| Search / filter | Trait search on gallery | Pills only |
| Page enter | Brand moment on load | Instant paint |
| Wallet UX | Mint enables after connect | Mint btn stays disabled |
| Scroll progress | Subtle journey indicator | None |
| SEO / share | Schema, OG | Basic meta only |

## Approach options

1. **More pages** - blog, lore wiki (scope creep, YAGNI)
2. **More motion** - parallax everywhere (perf risk)
3. **Interaction depth** - modal, search, mint bar, loader (**recommended**)
4. **Framework migration** - Next.js (user said JS static site)

**Recommendation:** Option 3. Same stack, higher perceived quality, no rewrite.

## Loop schedule

| Loop | Focus | Deliverables |
|------|-------|--------------|
| **5** | Architecture + wallet UX | Page loader, scroll progress, demo wallet connect, mint btn wiring |
| **6** | Interaction depth | NFT modal, collection search, signal feed, mint supply bar |
| **7** | Mobile + a11y | Skip link, focus rings, mobile hero, touch-safe tilt off |
| **8** | Launch prep | JSON-LD, favicon, loop audit, README update |

## Success criteria

- Every page shares loader + scroll progress
- Collection: click NFT opens trait modal
- Mint: visual supply progress + wallet enables mint
- Home: holder signal feed (placeholder quotes)
- No generic three-card rows added
- Reduced motion respected everywhere
