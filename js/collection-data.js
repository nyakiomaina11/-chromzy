/**
 * CHROMZY — collection data (generative colour-plate edition).
 * Curatorial concept: a finite suite of 4,444 generative colour plates in the
 * lineage of Albers and the Bauhaus colour course. No two palettes alike.
 */

export const COLLECTION = {
  name: "CHROMZY",
  descriptor: "Genesis Edition",
  tagline: "4,444 geometric portraits in nested colour fields — no two alike.",
  supply: 4444,
  chain: "Solana",
  standard: "Metaplex Core",
  mintPrice: 1.5,
  currency: "SOL",
  royalty: 5,
  maxPerWallet: 1,
  mintWindow: "Autumn 2026",
  curator: "Hélène Roy",
  studio: "Studio Chromzy",
  contractAddress: "CHr0M…DR1FT",
  year: "MMXXVI",
};

/** Paste into LaunchMyNFT → Collection → Description */
export const LAUNCHMYNFT = {
  scriptVersion: "0.1.5",
  rpcEndpoint:
    "https://mainnet.helius-rpc.com/?api-key=218ab1d8-5f13-44e7-a2da-610c40d1b8cb",
  collectionId: "LqSoiJ03DsNA8heEA6iT",
  ownerId: "97uZrxmqnvDAYPNNoKy5BWKJMmsupEvmMU1y25gdtpwZ",
  shortDescription:
    "CHROMZY Genesis Edition — 4,444 geometric portraits on Solana. Nested colour fields, catalogue plate numbering, no two alike. Mint Pl. 0001 live.",
  description: `CHROMZY COLLECTION — Genesis Edition · 4,444 on Solana

Chromzy is a fixed edition of generative portrait plates composed like a printed catalogue: nested rectangular colour fields, registration marks, serial numbering, and a vermilion edition tab. Each piece pairs a stylised geometric figure with a unique earthy palette — mustard, olive, terracotta, umber — rendered flat, grainy, and editorial.

Pl. 0001 — Chromzy is the genesis reveal: a bearded profile in layered frames, standing on twin block feet. It sets the visual DNA for every work that follows. No two Chromzys share a palette. There is no post-mint reveal — what you mint is what you keep.

Mint the genesis plate now. The full catalogue of 4,444 follows.`,
};

export const NOTE = {
  marker: "§ 01 — Note",
  lead:
    "Chromzy is a fixed edition of 4,444 plates, each the record of a single pass through a colour system that never resolves the same way twice. The work descends from the chromatic studies of Albers and the Bauhaus colour course — interval, adjacency, the way one field quietly changes its neighbour.",
  body:
    "No two plates share a palette. Each is composed, numbered, and signed at the moment of minting — then left exactly as it fell.",
};

/* Featured plates shown on the index, mirroring the imported design. */
export const FEATURED = [
  { no: "0007", title: "Interval", artist: "M. Okonkwo", dim: "2400×3000", ar: "4-5", col: "a", seed: 7, chroma: "0.11", family: "warm" },
  { no: "0142", title: "Quiet Adjacency", artist: "L. Vahl", dim: "3000×2000", ar: "3-2", col: "b", seed: 142, chroma: "0.10", family: "cool" },
  { no: "0291", title: "Warm Over Cool", artist: "I. Tanaka", dim: "2600×2600", ar: "1-1", col: "c", seed: 291, chroma: "0.12", family: "split" },
  { no: "0488", title: "Recto", artist: "C. Mercer", dim: "2400×3000", ar: "4-5", col: "d", seed: 488, chroma: "0.09", family: "neutral" },
  { no: "0654", title: "Untitled (Drift)", artist: "T. Ferro", dim: "2200×2933", ar: "3-4", col: "e", seed: 654, chroma: "0.11", family: "warm" },
  { no: "0810", title: "Field, Folded", artist: "H. Roy", dim: "3200×2000", ar: "16-10", col: "f", seed: 810, chroma: "0.10", family: "mono" },
];

export const TRAITS = [
  { name: "Palette family", values: ["Warm", "Cool", "Neutral", "Split", "Near-monochrome"] },
  { name: "Interval", values: ["Tight", "Even", "Wide", "Irregular"] },
  { name: "Value run", values: ["Light→Dark", "Dark→Light"] },
  { name: "Chroma", values: ["Muted", "Mid", "Saturated"] },
  { name: "Fields", values: ["Four nested rectangles"] },
  { name: "Edition mark", values: ["Plate", "Proof", "Artist's Proof"] },
];

export const MINT_PHASES = [
  { name: "Allowlist", price: "1.5 ◎ SOL", limit: "1 per wallet", status: "upcoming", detail: "Opens one week prior" },
  { name: "Public", price: "1.5 ◎ SOL", limit: "Remainder", status: "upcoming", detail: "Autumn 2026" },
];

export const ROADMAP = [
  {
    phase: "Plate I",
    title: "The Edition",
    status: "active",
    desc: "Compose and release all 4,444 plates on Metaplex Core. Each palette generated, numbered, and signed at mint. Royalties enforced at 5%.",
    tags: ["Mint", "On-chain", "Provenance"],
  },
  {
    phase: "Plate II",
    title: "The Catalogue",
    status: "upcoming",
    desc: "A permanent on-site catalogue raisonné: every plate browsable by palette family, interval, and value run, with full minting record.",
    tags: ["Catalogue", "Index", "Search"],
  },
  {
    phase: "Plate III",
    title: "The Printing",
    status: "upcoming",
    desc: "Archival giclée editions for holders — the on-chain plate rendered to paper at 2400×3000, signed by the studio.",
    tags: ["Print", "Physical", "Holder"],
  },
  {
    phase: "Plate IV",
    title: "The Annex",
    status: "upcoming",
    desc: "An invited annex of guest colourists composing within the Chromzy system. Released as a numbered companion suite.",
    tags: ["Guest artists", "Companion", "Collab"],
  },
];

export const TEAM = [
  { name: "Hélène Roy", role: "Curator / Direction", bio: "Colour theorist and editor. Sets the system's intervals and selects each release.", social: { x: "@heleneroy" } },
  { name: "Mira Okonkwo", role: "Generative Systems", bio: "Writes the colour engine. Anchor and Rust developer, shipped on Solana mainnet.", social: { x: "@miraonchain" } },
  { name: "Isamu Tanaka", role: "Colour Composition", bio: "Painter working in value and adjacency. Author of the warm-over-cool studies.", social: { x: "@itanaka" } },
  { name: "Clara Mercer", role: "Catalogue / Print", bio: "Book designer. Builds the catalogue raisonné and the archival print program.", social: { x: "@cmercer" } },
  { name: "Theo Ferro", role: "Community", bio: "Runs the studio's correspondence and allowlist. Believes the index is the artwork.", social: { x: "@theoferro" } },
  { name: "L. Vahl", role: "Anonymous Colourist", bio: "Guest contributor. Identity disclosed when Plate IV opens.", social: { x: "@lvahl" } },
];

export const FAQ = [
  { q: "What is Chromzy?", a: "A Genesis Edition of 4,444 generative portrait plates on Solana. Each piece is a stylised figure locked inside nested colour fields — numbered like a catalogue plate and minted exactly as composed." },
  { q: "What does a plate actually look like?", a: "A geometric portrait in concentric rectangular frames — mustard, olive, terracotta, and umber — with registration marks and a serial plate number. Pl. 0001 on the home page is the genesis reveal." },
  { q: "How much does it cost to mint?", a: "1.5 ◎ SOL per plate, plus standard Solana network fees. One plate per wallet during allowlist; the remainder release publicly thereafter." },
  { q: "What wallet do I need?", a: "Phantom, Solflare, or any Wallet Standard compatible Solana wallet. Connect on the Mint page when the window opens." },
  { q: "When is the mint?", a: "Autumn 2026. The allowlist opens one week prior. Exact block and date are announced to the studio's correspondents first." },
  { q: "Are royalties enforced?", a: "Yes — a 5% creator royalty on secondary sales, enforced via the Metaplex Core royalty plugin." },
  { q: "Is this financial advice?", a: "No. Chromzy is a digital art edition. Acquire it because you want the plate." },
];

/* Catalogue sample — generative plates with fixed seeds for the grid. */
const CATALOGUE = [
  ...FEATURED,
  { no: "0103", title: "Cool Interval", artist: "M. Okonkwo", seed: 103, chroma: "0.10", family: "cool" },
  { no: "0188", title: "Split Field", artist: "I. Tanaka", seed: 188, chroma: "0.11", family: "split" },
  { no: "0234", title: "Neutral Run", artist: "C. Mercer", seed: 234, chroma: "0.09", family: "neutral" },
  { no: "0312", title: "Near Mono", artist: "L. Vahl", seed: 312, chroma: "0.08", family: "mono" },
  { no: "0399", title: "Warm Proof", artist: "H. Roy", seed: 399, chroma: "0.12", family: "warm" },
  { no: "0511", title: "Wide Interval", artist: "T. Ferro", seed: 511, chroma: "0.10", family: "cool" },
  { no: "0602", title: "Adjacency II", artist: "M. Okonkwo", seed: 602, chroma: "0.11", family: "split" },
  { no: "0720", title: "Value Study", artist: "I. Tanaka", seed: 720, chroma: "0.09", family: "neutral" },
  { no: "0888", title: "Drift (Mono)", artist: "L. Vahl", seed: 888, chroma: "0.08", family: "mono" },
  { no: "1204", title: "Plate Proof", artist: "C. Mercer", seed: 1204, chroma: "0.11", family: "warm" },
  { no: "1566", title: "Even Fields", artist: "H. Roy", seed: 1566, chroma: "0.10", family: "cool" },
  { no: "2001", title: "Late Chroma", artist: "T. Ferro", seed: 2001, chroma: "0.12", family: "split" },
];

export const GALLERY_ITEMS = CATALOGUE.map((p) => ({
  id: p.no,
  title: p.title,
  artist: p.artist,
  family: p.family,
  family_label: p.family.charAt(0).toUpperCase() + p.family.slice(1),
  tier_key: p.family,
  seed: p.seed,
  chroma: p.chroma,
}));
