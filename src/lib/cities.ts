import raw from '@/data/cities.json';

export type City = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  timeZone: string;
  population: number;
};

type Row = [number, string, string, string, string, number, number, string, number];

const rows = raw as Row[];

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

const toCity = (r: Row): City => ({
  id: r[0],
  name: r[1],
  region: r[3],
  country: r[4],
  lat: r[5],
  lon: r[6],
  timeZone: r[7],
  population: r[8],
});

let index: { key: string; alt: string; row: Row }[] | null = null;
const getIndex = () =>
  (index ??= rows.map((row) => ({ key: fold(row[1]), alt: row[2] ? fold(row[2]) : '', row })));

/** Rows are stored largest city first, so the first matches are the likeliest. */
export function searchCities(query: string, limit = 8): City[] {
  const q = fold(query);
  if (q.length < 2) return [];
  const [place, ...rest] = q.split(',').map((s) => s.trim());
  const hint = rest.join(' ');
  const starts: City[] = [];
  const contains: City[] = [];
  for (const { key, alt, row } of getIndex()) {
    const hit = key.startsWith(place) || alt.startsWith(place);
    const inner = !hit && (key.includes(place) || alt.includes(place));
    if (!hit && !inner) continue;
    if (hint && !fold(`${row[3]} ${row[4]}`).includes(hint)) continue;
    (hit ? starts : contains).push(toCity(row));
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

export function cityById(id: number): City | null {
  const row = rows.find((r) => r[0] === id);
  return row ? toCity(row) : null;
}
