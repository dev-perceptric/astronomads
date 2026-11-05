// Builds src/data/cities.json from GeoNames dumps (CC BY 4.0, https://www.geonames.org).
// Usage: node scripts/build-cities.mjs <dir with cities15000.txt, admin1CodesASCII.txt, countryInfo.txt>
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node scripts/build-cities.mjs <geonames dir>');
  process.exit(1);
}
const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8').split('\n');

const countries = {};
for (const line of read('countryInfo.txt')) {
  if (!line || line.startsWith('#')) continue;
  const c = line.split('\t');
  countries[c[0]] = c[4];
}
const admin1 = {};
for (const line of read('admin1CodesASCII.txt')) {
  if (!line) continue;
  const [code, name] = line.split('\t');
  admin1[code] = name;
}

const rows = [];
for (const line of read('cities15000.txt')) {
  if (!line) continue;
  const c = line.split('\t');
  const [id, name, ascii] = c;
  const lat = Number(c[4]);
  const lon = Number(c[5]);
  const cc = c[8];
  const region = admin1[`${cc}.${c[10]}`] ?? '';
  const pop = Number(c[14]) || 0;
  const tz = c[17];
  if (!tz) continue;
  rows.push([Number(id), name, ascii === name ? '' : ascii, region, countries[cc] ?? cc, +lat.toFixed(4), +lon.toFixed(4), tz, pop]);
}
rows.sort((a, b) => b[8] - a[8]);
const out = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'src', 'data', 'cities.json');
fs.writeFileSync(out, JSON.stringify(rows));
console.log(`Wrote ${rows.length} cities to ${out}`);
