# Astronomads

Birth charts drawn in light, the daily sky, and where on Earth your stars land.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Check it

```bash
npm test
npm run lint
npm run build
```

## What's here
- `/` Birth details form and an example chart
- `/chart` The birth chart: wheel, big three, placements, aspects and element balance. Reads `?n=&d=&t=&c=` (name, date, time, GeoNames city id) or the chart saved on this device
- `/today` Moon phase and sign, what to lean into and let go of, today's contacts with your chart, and the sky now
- `/api/cities?q=` City search, `/api/cities?id=` one city

## Data
- City data © GeoNames, CC BY 4.0.
- `data/celebs/top5500.csv`: famous people list from Pantheon 2025 (Datawheel, CC BY-SA 4.0), with researched birth times and sources.
