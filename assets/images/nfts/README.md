# Baked colour plates

Static plate art for the catalogue and home gallery. Generated from the same OKLCH palette engine as the living plate (`js/plate-core.js`).

## Regenerate

```bash
npm install sharp
node scripts/bake-plates.mjs
```

Writes `assets/images/nfts/{id}.webp` (and `.svg` source). IDs are zero-padded four digits (`0007.webp`, `0142.webp`, …).

## Manual drops

You can replace any file with your own render — keep the same filename and the site picks it up automatically.

## Recommended export

- **Size:** 1024×1024 minimum
- **Format:** WebP
- **Naming:** 4-digit plate ID matching `js/collection-data.js`
