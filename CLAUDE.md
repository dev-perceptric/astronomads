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
- Any change to `src/lib/astro/` keeps `npm test` green. Positions are checked against a known chart (Obama, 4 Aug 1961, 19:24, Honolulu): Sun and Moon within 0.1°, angles within 0.2°. Placidus cusps are checked against Swiss Ephemeris at five places (north, south, equator, far north) within 0.1°. The true North Node (`trueNode`, from the Moon's osculating orbit) is checked against Swiss Ephemeris TRUE_NODE on five dates within 0.05°; the South Node is always opposite. The nodes only take conjunctions (orb 5°).
- Birth times go through `localToUtc` with the city's IANA time zone, so historical offsets and daylight saving are right.

## Rule: birth data is sourced
- Never copy birth times from Astrotheme, Astro-Databank (astro.com), Astro-Seek or other chart sites without a license. Every celebrity time keeps its source link and Rodden rating (AA, A, B, C, DD, X, XX).
- `data/celebs/top5500.csv` is the working list (Pantheon 2025, CC BY-SA 4.0).

## Rule: one look
- The brand is Night and Marble (`docs/brand.md`). The homepage and the birth chart (`src/app/(site)/`, with `site.css`, `SiteHeader` (logo; Tools, Learn and Shop with wide panels built from the tools registry, sign facts and products; New chart; the account menu with My chart and Today; one tap-to-open menu on phones) and `SiteFooter` shared in its layout) already use it, and the chart wheel takes `variant="brand"` there; the pages under `src/app/(app)/` still use the neutral system below until they move over. Use `Logo` for the logo, never typed text.
- Neutral oklch tokens in `globals.css`, light by default with a dark theme (`data-theme` plus the system setting, switched by `ThemeToggle`). Never a raw hex in components: chart colors come from `--p-*`, `--el-*` and `--asp-*`.
- Geist for text and headings (bold, tight tracking), Geist Mono for eyebrows, tables and degrees, Noto Sans Symbols for glyphs. Eyebrows read `01 · label`.
- Primary buttons are filled with the foreground color, 44px tall, `rounded 8px`. Cards are 16px rounded with a soft border and shadow. One warm accent, `--peak`, used sparingly.
- The chart wheel follows a classic reference layout. Outside a heavy rim: planets, AC and MC as large colored symbols with degree (bold) and minutes (small) in the same color, tied to their exact degree by thin colored lines. Inside, in closed bands: a dense degree scale, a sign ring with large element-colored signs, a house band with Placidus cusp lines, triangle cusp marks and house numbers, and a wide aspect disc (blue trine, light blue dashed sextile, red square and opposition, green tight conjunction). House cusp lines and the AC/MC axes never enter the sign ring.
- Headlines blur in word by word (`reveal-word`), blocks fade up (`fade-up`). Everything stops under `prefers-reduced-motion`.
- Planet, sign, aspect and angle symbols are our own SVG set in `src/components/Glyph.tsx` (24 grid, round 1.6 strokes). Use `Glyph` in pages and `GlyphAt` inside the wheel, never font characters.
- On brand pages the planets are solid, matte symbols (`Glyph3D`, `Glyph3DAt`: a fine line in the planet color on a pale tint of the same color stepping back to the lower right; no shine, glow or dark shadow; square ends and mitered corners), built from the same shapes. Planet, sign and aspect colors there follow the classic chart palette set in `site.css` and the homepage's `.light` block. The wheel is an astrolabe: thin double frame, dotted degree scale, tinted sign ring with spaced sign names, Roman house numerals, starred center. Each planet's line runs straight out from its exact degree, then bends to the symbol. A solid wedge on the frame marks each axis end (AC, DC, MC, IC), and AC and MC get lines with open arrows out to their labels. No browser pop-ups (`alert`, `confirm`, `prompt`).

## Rule: sign pages are real and our own
- Each sign page is its own plain folder, `src/app/(site)/zodiac/<sign>/page.tsx`, rendering the shared `zodiac/_sign/SignPage.tsx`; add a sign by writing its copy file in `src/lib/zodiac/copy/`, then run `node scripts/sign-pages.mjs` (makes the folder and the `SIGN_COPY` index) and `node scripts/og-zodiac.mjs <base url>` (share images). `/zodiac` is the hub. Never use a `[bracket]` route for pages: Hostinger can't serve script files from bracket folders, and the page goes blank in the browser. Facts live in `src/lib/zodiac/signs.ts`.
- The hero is the sign's real constellation (`src/data/zodiac-stars.json`, d3-celestial BSD-3-Clause from Hipparcos, credited on the page), drawn as a star-chart plate with the ecliptic.
- Every date is computed: season start and end from `sunSeason`, the birthday check from `sunSignForDay` (asks for time and city on a cusp day), the live sky from the engine. Famous people come from the Pantheon list, filed under a sign only when their Sun was there all day.
- Long reading text is set in the serif. Each page has metadata, a canonical link, Article, Breadcrumb and FAQ structured data, and a share image made by `node scripts/og-zodiac.mjs <base url> <sign>`; new pages join `sitemap.xml` by themselves.
- `src/lib/zodiac/zodiac.test.ts` checks facts, copy rules, the famous-people filing, and that every written sign has its folder.

## Rule: compatibility, today and reports
- `/compatibility` compares two charts with `synastry()` (`src/lib/astro/synastry.ts`): cross-chart aspects at 0.75 orbs and five theme scores (a guide, 8 to 97). Readings: `SYNASTRY` and `THEME_TEXT`. People come from `PersonPicker` (saved chart, account profiles, or new details) and travel in the address (`pairQuery`).
- `/today` is the personal daily horoscope: `transitsAt` and `weekAhead` (`src/lib/astro/transits.ts`) with `TRANSIT_FAST` and `TRANSIT_SLOW` readings, the Moon of the day from `MOON_DAYS`.
- Paid reports (`/reports`, `PRODUCTS` in `src/lib/reports/products.ts`): the Birth Chart Portrait ($39) and the Compatibility Report ($29), drawn by `PortraitDoc` and `SynastryDoc` with a free preview. Checkout is Stripe through its REST API (`src/lib/server/stripe.ts`, `STRIPE_SECRET_KEY`); orders live in the `orders` table, and `/reports/view?order=<token>` checks the payment with Stripe and shows the full report, with Save as PDF through the browser's print. We never handle card details. `orders.test.ts` runs a whole purchase with Stripe faked.

## Rule: calculators are proven and detailed
- Free calculators live at `/tools/<slug>` (plain folders, listed in `src/lib/tools/registry.ts`). Each page is `ToolShell` (hero, calculator, long guide from `src/lib/tools/guides/<slug>.ts`, questions, more tools) around a client calculator built from `tools/_tool/parts.tsx`.
- Timing math is in `src/lib/astro/timing.ts` (sign changes, stations and shadows, solar, lunar and Saturn returns, secondary progressions with solar arc angles, planetary hours, rising signs through a day, monthly ephemeris). `timing.test.ts` checks it against published Mercury stations, London sunrise and sunset, and exact return degrees.
- Readings for the tools: `signDetails.ts`, `returns.ts` and `cycles.ts` in the interpretations folder. `src/lib/tools/tools.test.ts` checks every guide and reading against the copy rules and checks that every guide is detailed.

## Rule: two-person tools and sign pairs
- Sign pair pages: `/compatibility/<a>-and-<b>` for all 78 Sun sign pairings, one plain folder each, made by `node scripts/pair-pages.mjs` from the copy files in `src/lib/compat/pairs/` (type `PairCopy`), rendered by `compatibility/_pair/PairPage.tsx`, listed under the compatibility tool by `PairGrid`.
- Two-person engine: `src/lib/astro/relate.ts`. `relate()` scores love (same as `synastry()`), friendship, work and family on the same 8 to 97 scale; `composite()` (midpoints, Midheaven midpoint kept above the horizon, Placidus from it at the average latitude), `davison()`, `overlays()`, `bestDates()` and `exactHits()`. `relate.test.ts` proves them.
- Readings: `friendship.ts`, `work.ts`, `family.ts` (55 contacts each), `relationship.ts` (composite and Davison), `pairs.ts` (house overlays, big three match, day kinds, couple's year). `src/lib/compat/compat.test.ts` checks all of them and every pair page.
- Celebrity match reads `public/data/celebs.json`, built by `node scripts/celebs-json.mjs` from the Pantheon list at noon UTC. Politicians, soldiers, royalty, religious figures and anyone filed under crime or extremism stay out of the pool.

## Rule: accounts are safe and small
- Accounts live in Hostinger MySQL (`src/lib/server/db.ts`, configured by `DB_*` or `DATABASE_URL`; tables are created on first use). Without a database the site still runs and `/account` shows "Accounts open soon".
- Passwords are hashed with scrypt; sessions are random tokens in an httpOnly cookie, stored only as SHA-256 hashes. Reset links are one-use, last one hour, and are built from `SITE_URL`, never from the request.
- Every change request checks the Origin, takes small JSON only, and is rate limited. Errors reach people as one short line; details go to the server log.
- Sign in with Google is our own OpenID Connect flow (`src/lib/server/google.ts`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`): one-time state, PKCE and nonce in a short-lived httpOnly cookie; the ID token comes straight from Google's token endpoint and its issuer, audience, expiry, nonce and verified email are checked. A Google email that matches an account links to it; signed in, it connects to the current account. Google-only accounts have no password until they set one.
- An account holds at most 200 birth profiles (`MAX_PROFILES`), enforced on the server inside a transaction. Accounts can be deleted with every profile.
- Account pages: `/account` (sign in, or your profiles), `/account/settings` (email, password, delete account at the bottom), `/account/reset`. The header's account menu links them; settings never sit on the profiles page.
- `src/lib/server/accounts.test.ts` runs the real routes against MySQL or MariaDB when `TEST_DATABASE_URL` is set. Run it after any change to accounts.

## Rule: readings are our own words
- Every reading on the chart page comes from `src/lib/astro/interpretations/`: what each point means (`POINT_INFO`), each point in each sign (`IN_SIGN`), each planet and node in each house (`IN_HOUSE`), each planet's aspect to the Ascendant and Midheaven (`ANGLE_ASPECT`), and planets or angles sitting on a node (`NODE_CONTACT`, `NODE_ANGLE`, in `nodes.ts`). All of it is original Astronomads copy, never copied or paraphrased from Astrotheme, astro.com, Cafe Astrology, Astro-Seek, Co-Star or a book.
- Clicking any planet, node, AC or MC (wheel, positions list, hero, planet cards) opens `ReadingSheet`, our own panel. `interpretations.test.ts` checks that every entry exists and follows the copy rules (no dashes, no "quietly", no "not").
