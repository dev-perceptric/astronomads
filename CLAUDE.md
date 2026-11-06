# Astronomads

An astrology site: free birth charts, a daily sky, compatibility and astrocartography (where on Earth your planets are strongest). Start with `docs/plan.md`.

## Stack
- Next.js (App Router) and TypeScript. Plain CSS with tokens in `src/app/globals.css` and CSS modules.
- Chart math: `src/lib/astro/` on `astronomy-engine` (MIT). Placidus houses, with whole sign houses as the fallback near the poles.
- Cities: `src/data/cities.json`, built from GeoNames (CC BY 4.0) with `npm run cities -- <geonames dir>`.
- Tests: `npm test` (vitest). `npm run lint` type-checks.

## Rule: every build includes its running cost
- Every plan, feature or milestone states what it adds to the monthly bill: servers plus every paid service, Claude tokens included. Give monthly totals at Beta (50k visits a month) and Growth (2M visits a month).
- Mark any price that couldn't be confirmed on the vendor's own page as "check".

## Rule: the math is proven
- Any change to `src/lib/astro/` keeps `npm test` green. Positions are checked against a known chart (Obama, 4 Aug 1961, 19:24, Honolulu): Sun and Moon within 0.1°, angles within 0.2°. Placidus cusps are checked against Swiss Ephemeris at five places (north, south, equator, far north) within 0.1°.
- Birth times go through `localToUtc` with the city's IANA time zone, so historical offsets and daylight saving are right.

## Rule: birth data is sourced
- Never copy birth times from Astrotheme, Astro-Databank (astro.com), Astro-Seek or other chart sites without a license. Every celebrity time keeps its source link and Rodden rating (AA, A, B, C, DD, X, XX).
- `data/celebs/top5500.csv` is the working list (Pantheon 2025, CC BY-SA 4.0).

## Rule: one look
- The brand is Night and Marble (`docs/brand.md`). The homepage and the birth chart (`src/app/(site)/`, with `site.css`, `FloatingNav` and `SiteFooter` shared in its layout) already use it, and the chart wheel takes `variant="brand"` there; the pages under `src/app/(app)/` still use the neutral system below until they move over. Use `Logo` for the logo, never typed text.
- Neutral oklch tokens in `globals.css`, light by default with a dark theme (`data-theme` plus the system setting, switched by `ThemeToggle`). Never a raw hex in components: chart colors come from `--p-*`, `--el-*` and `--asp-*`.
- Geist for text and headings (bold, tight tracking), Geist Mono for eyebrows, tables and degrees, Noto Sans Symbols for glyphs. Eyebrows read `01 · label`.
- Primary buttons are filled with the foreground color, 44px tall, `rounded 8px`. Cards are 16px rounded with a soft border and shadow. One warm accent, `--peak`, used sparingly.
- The chart wheel follows a classic reference layout. Outside a heavy rim: planets, AC and MC as large colored symbols with degree (bold) and minutes (small) in the same color, tied to their exact degree by thin colored lines. Inside, in closed bands: a dense degree scale, a sign ring with large element-colored signs, a house band with Placidus cusp lines, triangle cusp marks and house numbers, and a wide aspect disc (blue trine, light blue dashed sextile, red square and opposition, green tight conjunction). House cusp lines and the AC/MC axes never enter the sign ring.
- Headlines blur in word by word (`reveal-word`), blocks fade up (`fade-up`). Everything stops under `prefers-reduced-motion`.
- Planet, sign, aspect and angle symbols are our own SVG set in `src/components/Glyph.tsx` (24 grid, round 1.6 strokes). Use `Glyph` in pages and `GlyphAt` inside the wheel, never font characters.
- On brand pages the planets are solid, matte symbols (`Glyph3D`, `Glyph3DAt`: flat face, side edge, faint aura, no shine, square ends and mitered corners), built from the same shapes. Planet, sign and aspect colors there follow the classic chart palette set in `site.css` and the homepage's `.light` block. The wheel is an astrolabe: thin double frame, dotted degree scale, tinted sign ring with spaced sign names, Roman house numerals, starred center. Each planet's line runs straight out from its exact degree, then bends to the symbol. No browser pop-ups (`alert`, `confirm`, `prompt`).
