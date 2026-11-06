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
| Big three share card | Next |
| Accounts and saved charts for friends (Supabase) | Next |
| Compatibility | Next |
| Astrocartography map | Next |
| Sign and Learn pages for SEO | Next |
| Celebrity charts | After the birth time data is settled |

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

| Item | Beta (50k visits a month) | Growth (2M visits a month) |
|---|---|---|
| Render web service | $25 (check) | $170 (check) |
| Supabase (when accounts arrive) | $25 (check) | $135 (check) |
| Resend email (when accounts arrive) | $20 (check) | $90 (check) |
| Claude tokens | $0 (reading texts are written once, about $30 one-time) | $0 |
| Chart engine (astronomy-engine, MIT), cities (GeoNames), fonts (Google Fonts) | $0 | $0 |
| **Total today (web service only)** | **~$25** | **~$170** |
| **Total with accounts** | **~$70** | **~$395** |

Optional: Astro-Databank SADBY5, about $16 a month spread over 5 years. Domain renewal about $10 to $15 a year.
