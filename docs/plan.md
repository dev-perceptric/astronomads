# Astronomads plan

## v1: birth chart features

| Feature | Status |
|---|---|
| Free birth chart: wheel, planets, Placidus houses, aspects, aspect grid | Built |
| Unknown birth time mode | Built |
| Big three (Sun, Moon, Rising) | Built |
| Daily sky: Moon phase and sign, contacts with your chart | Built |
| City search with historical time zones | Built |
| Saved chart (on this device) | Built |
| Accounts: email and password, up to 200 saved birth profiles | Built (needs the Hostinger database set up) |
| Readings: points, signs, houses, AC/MC aspects, lunar nodes | Built |
| Big three share card | Next |
| Compatibility | Next |
| Astrocartography map | Next |
| Sign and Learn pages for SEO | Next |
| Celebrity charts | After the birth time data is settled |

Publishing plan, sky events and tool launch months for December 2026 to December 2027: `docs/content-calendar.md`.

## Build order

| Week | Work |
|---|---|
| 1 | Chart engine, city search, wheel, chart page, daily page (done) |
| 2 | Share card, accounts, saved charts |
| 3 | Compatibility, longer reading texts |
| 4 | Astrocartography map |
| 5 | Sign and Learn pages, launch |

## Celebrity birth times
- Working list: `data/celebs/top5500.csv` (2,000 Modern, 3,000 All-time, 500 Historical).
- Web research of the top 300 found 11 sourced times (under 4%). Most times online are copies of Astro-Databank or Astrotheme with no original source.
- Astro-Databank license SADBY5: USD 979.30 for 5 years (confirmed on the astro.com shop). About 40% of the list would get rated times. Rules: back-link to Astro-Databank on each page, update every 6 months, no bulk export, `relationships` and `events` may not be shown.
- Gauquelin data (CURA): professional license needed, price on request.

## Monthly running cost

Hosting is Hostinger Cloud Startup (Node.js web app), see `docs/deploy-hostinger.md`. Accounts use the MySQL database and the email mailbox that come with the plan, so they add nothing to the bill.

| Item | Beta (50k visits a month) | Growth (2M visits a month) |
|---|---|---|
| Hostinger Business web hosting | ~$3.50 to $4 intro, ~$17 at renewal (check) | Move to Hostinger Cloud: ~$10 to $30 (check) |
| Accounts database (Hostinger MySQL, included in the plan) | $0 (check) | $0 (check) |
| Reset emails (Hostinger mailbox over SMTP, included in the plan) | $0 (check) | $0 (check; Hostinger caps daily sending per mailbox) |
| Claude tokens | $0 (reading texts are written once, about $30 one-time) | $0 |
| Chart engine (astronomy-engine, MIT), cities (GeoNames), fonts (Google Fonts) | $0 | $0 |
| **Total with accounts** | **~$4 to $17** | **~$10 to $30** |

Optional: Astro-Databank SADBY5, about $16 a month spread over 5 years. Domain renewal about $10 to $15 a year.
