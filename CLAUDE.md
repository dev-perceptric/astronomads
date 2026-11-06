# Astronomads

An astrology site: free birth charts, a daily sky, compatibility and astrocartography (where on Earth your planets are strongest). Start with `docs/plan.md`.

## Stack
- Next.js (App Router) and TypeScript. Plain CSS with tokens in `src/app/globals.css` and CSS modules.
- Chart math: `src/lib/astro/` on `astronomy-engine` (MIT). Whole sign houses for now.
- Cities: `src/data/cities.json`, built from GeoNames (CC BY 4.0) with `npm run cities -- <geonames dir>`.
- Tests: `npm test` (vitest). `npm run lint` type-checks.

## Rule: every build includes its running cost
- Every plan, feature or milestone states what it adds to the monthly bill: servers plus every paid service, Claude tokens included. Give monthly totals at Beta (50k visits a month) and Growth (2M visits a month).
- Mark any price that couldn't be confirmed on the vendor's own page as "check".

## Rule: the math is proven
- Any change to `src/lib/astro/` keeps `npm test` green. Positions are checked against a known chart (Obama, 4 Aug 1961, 19:24, Honolulu): Sun and Moon within 0.1°, angles within 0.2°.
- Birth times go through `localToUtc` with the city's IANA time zone, so historical offsets and daylight saving are right.

## Rule: birth data is sourced
- Never copy birth times from Astrotheme, Astro-Databank (astro.com), Astro-Seek or other chart sites without a license. Every celebrity time keeps its source link and Rodden rating (AA, A, B, C, DD, X, XX).
- `data/celebs/top5500.csv` is the working list (Pantheon 2025, CC BY-SA 4.0).

## Rule: one look
- A light reference site: white page, dark readable text, tokens in `globals.css`. One deep blue (`--accent`) for links and actions, a gold star in the wordmark.
- Bodoni Moda for headings, Jost for text (16px), DM Mono for degrees, Noto Sans Symbols for glyphs.
- Data goes in clean tables and white cards with thin borders. The chart wheel is drawn on white: element-tinted sign band, colored planet glyphs, straight aspect lines (blue trine, green dashed sextile, red square and opposition).
- Planet and sign glyphs carry U+FE0E so phones never show emoji.
- Motion stays minimal and stops under `prefers-reduced-motion`.
- No browser pop-ups (`alert`, `confirm`, `prompt`).
