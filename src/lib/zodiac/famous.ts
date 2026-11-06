import { readFileSync } from 'node:fs';
import path from 'node:path';
import { sunSignForDay } from '@/lib/astro/ingress';

export type FamousPerson = { name: string; occupation: string; country: string; date: string; sunLon: number; wiki: string };

/** Splits one CSV line, honoring quoted fields. */
function splitCsv(line: string): string[] {
  const out: string[] = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cur += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      out.push(cur);
      cur = '';
    } else cur += c;
  }
  out.push(cur);
  return out;
}

let cache: FamousPerson[][] | null = null;

/**
 * Famous people by Sun sign, from the Pantheon list (CC BY-SA 4.0). Only people born since 1700
 * (no calendar change to worry about) whose Sun was in one sign for their whole birth day, in any
 * time zone, so nobody born on a cusp is filed under the wrong sign. Most famous first. Runs at build time.
 */
export function famousBySign(): FamousPerson[][] {
  if (cache) return cache;
  const text = readFileSync(path.join(process.cwd(), 'data/celebs/top5500.csv'), 'utf8');
  const [head, ...rows] = text.trim().split('\n');
  const cols = splitCsv(head);
  const at = (name: string) => cols.indexOf(name);
  const bySign: FamousPerson[][] = Array.from({ length: 12 }, () => []);
  const people = rows
    .map(splitCsv)
    .filter((r) => r[at('date_known')] === 'full date' && /^\d{4}-\d{2}-\d{2}$/.test(r[at('birth_date')]) && Number(r[at('birth_date')].slice(0, 4)) >= 1700)
    .sort((a, b) => Number(b[at('fame_score_hpi')]) - Number(a[at('fame_score_hpi')]));
  for (const r of people) {
    const sun = sunSignForDay(r[at('birth_date')]);
    if (!sun.certain) continue;
    bySign[sun.sign].push({
      name: r[at('name')],
      occupation: r[at('occupation')],
      country: r[at('birth_country')],
      date: r[at('birth_date')],
      sunLon: sun.lon,
      wiki: r[at('wikipedia_url')],
    });
  }
  cache = bySign;
  return bySign;
}
