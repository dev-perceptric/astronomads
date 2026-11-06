// Builds public/data/celebs.json for the celebrity match: noon UTC positions of the ten planets for
// everyone in the Pantheon 2025 list (CC BY-SA 4.0) with a full birth date from 1700 on.
// Run: node scripts/celebs-json.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import * as A from 'astronomy-engine';

const split = (line) => {
  const out = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur);
  return out;
};
const norm = (d) => ((d % 360) + 360) % 360;
const BODIES = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const lon = (b, t) => (b === 'Sun' ? A.SunPosition(t).elon : b === 'Moon' ? A.EclipticGeoMoon(t).lon : A.Ecliptic(A.GeoVector(b, t, true)).elon);

// Matches are for fun, so the pool keeps entertainers, athletes, artists, writers, scientists and
// builders. Politicians, soldiers, royalty, religious figures and anyone filed under crime or
// extremism are left out, so nobody is told they match a dictator.
const FIELD = {
  Actor: 'Film and TV', 'Film Director': 'Film and TV', Producer: 'Film and TV', Comedian: 'Film and TV', Presenter: 'Film and TV', Celebrity: 'Film and TV', Youtuber: 'Film and TV', Magician: 'Film and TV', Model: 'Art and fashion',
  Singer: 'Music', Musician: 'Music', Composer: 'Music', Conductor: 'Music', Dancer: 'Music',
  Writer: 'Writers', Journalist: 'Writers', Philosopher: 'Writers', Historian: 'Writers', 'Comic Artist': 'Writers', Linguist: 'Writers',
  Physicist: 'Science', Chemist: 'Science', Biologist: 'Science', Physician: 'Science', Mathematician: 'Science', Psychologist: 'Science', Economist: 'Science', Astronomer: 'Science', 'Computer Scientist': 'Science', Sociologist: 'Science', Anthropologist: 'Science', Geologist: 'Science', Archaeologist: 'Science', Geographer: 'Science', 'Political Scientist': 'Science',
  Inventor: 'Builders', Engineer: 'Builders', Businessperson: 'Builders', Architect: 'Builders', Astronaut: 'Builders', Explorer: 'Builders', Pilot: 'Builders', 'Game Designer': 'Builders', Chef: 'Builders',
  Painter: 'Art and fashion', Artist: 'Art and fashion', Sculptor: 'Art and fashion', Photographer: 'Art and fashion', 'Fashion Designer': 'Art and fashion', Designer: 'Art and fashion',
  'Social Activist': 'Activists',
};
const SPORT = /Player|Driver|Tennis|Boxer|Athlete|Coach|Wrestler|Martial Arts|Cyclist|Mountaineer|Gymnast|Skier|Skater|Golfer|Swimmer|Cricketer|Snooker|Referee|Gamer/;
const fieldOf = (occ) => FIELD[occ] ?? (SPORT.test(occ) ? 'Sports' : null);

const [head, ...rows] = readFileSync('data/celebs/top5500.csv', 'utf8').trim().split('\n');
const cols = split(head);
const at = (n) => cols.indexOf(n);
const people = [];
for (const r of rows.map(split)) {
  const date = r[at('birth_date')];
  if (r[at('date_known')] !== 'full date' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number(date.slice(0, 4)) < 1700) continue;
  const field = fieldOf(r[at('occupation')]);
  if (!field) continue;
  const [y, m, d] = date.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d, 12));
  const lons = BODIES.map((b) => Math.round(norm(lon(b, t)) * 10));
  // The Moon's sign is sure only when it stays in one sign across every time zone of that day.
  const m1 = Math.floor(norm(lon('Moon', new Date(t.getTime() - 26 * 3600e3))) / 30);
  const m2 = Math.floor(norm(lon('Moon', new Date(t.getTime() + 24 * 3600e3))) / 30);
  const wiki = r[at('wikipedia_url')].replace('https://en.wikipedia.org/wiki/', '');
  people.push([r[at('name')], r[at('occupation')], field, date, wiki, m1 === m2 ? 1 : 0, Math.round(Number(r[at('fame_score_hpi')]) * 10), ...lons]);
}
people.sort((x, y) => y[6] - x[6]);
mkdirSync('public/data', { recursive: true });
writeFileSync('public/data/celebs.json', JSON.stringify({ source: 'Pantheon 2025 (CC BY-SA 4.0), positions at 12:00 UTC by Astronomads', fields: ['name', 'occupation', 'field', 'date', 'wiki', 'moonSure', 'fame', 'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'], people }));
console.log('people', people.length);
