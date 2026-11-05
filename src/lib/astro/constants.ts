export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Mode = 'cardinal' | 'fixed' | 'mutable';

export type Sign = {
  key: string;
  name: string;
  glyph: string;
  element: Element;
  mode: Mode;
};

// U+FE0E asks for the text form of each glyph, so phones don't swap in emoji.
const t = (g: string) => `${g}︎`;

export const SIGNS: Sign[] = [
  { key: 'aries', name: 'Aries', glyph: t('♈'), element: 'fire', mode: 'cardinal' },
  { key: 'taurus', name: 'Taurus', glyph: t('♉'), element: 'earth', mode: 'fixed' },
  { key: 'gemini', name: 'Gemini', glyph: t('♊'), element: 'air', mode: 'mutable' },
  { key: 'cancer', name: 'Cancer', glyph: t('♋'), element: 'water', mode: 'cardinal' },
  { key: 'leo', name: 'Leo', glyph: t('♌'), element: 'fire', mode: 'fixed' },
  { key: 'virgo', name: 'Virgo', glyph: t('♍'), element: 'earth', mode: 'mutable' },
  { key: 'libra', name: 'Libra', glyph: t('♎'), element: 'air', mode: 'cardinal' },
  { key: 'scorpio', name: 'Scorpio', glyph: t('♏'), element: 'water', mode: 'fixed' },
  { key: 'sagittarius', name: 'Sagittarius', glyph: t('♐'), element: 'fire', mode: 'mutable' },
  { key: 'capricorn', name: 'Capricorn', glyph: t('♑'), element: 'earth', mode: 'cardinal' },
  { key: 'aquarius', name: 'Aquarius', glyph: t('♒'), element: 'air', mode: 'fixed' },
  { key: 'pisces', name: 'Pisces', glyph: t('♓'), element: 'water', mode: 'mutable' },
];

export type BodyKey =
  | 'sun'
  | 'moon'
  | 'mercury'
  | 'venus'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'pluto';

export type Body = {
  key: BodyKey;
  name: string;
  glyph: string;
  /** Name used by astronomy-engine */
  engine: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';
  /** Orb color in the chart, soft and luminous */
  color: string;
  /** Size weight in the chart: lights and personal planets read larger */
  weight: number;
};

export const BODIES: Body[] = [
  { key: 'sun', name: 'Sun', glyph: t('☉'), engine: 'Sun', color: '#ffe3a6', weight: 1.4 },
  { key: 'moon', name: 'Moon', glyph: t('☽'), engine: 'Moon', color: '#e9edff', weight: 1.3 },
  { key: 'mercury', name: 'Mercury', glyph: t('☿'), engine: 'Mercury', color: '#b6f0e4', weight: 1 },
  { key: 'venus', name: 'Venus', glyph: t('♀'), engine: 'Venus', color: '#ffc3dc', weight: 1.1 },
  { key: 'mars', name: 'Mars', glyph: t('♂'), engine: 'Mars', color: '#ffa7a1', weight: 1 },
  { key: 'jupiter', name: 'Jupiter', glyph: t('♃'), engine: 'Jupiter', color: '#cbb8ff', weight: 0.95 },
  { key: 'saturn', name: 'Saturn', glyph: t('♄'), engine: 'Saturn', color: '#dfd3ad', weight: 0.9 },
  { key: 'uranus', name: 'Uranus', glyph: t('♅'), engine: 'Uranus', color: '#a3e4ff', weight: 0.8 },
  { key: 'neptune', name: 'Neptune', glyph: t('♆'), engine: 'Neptune', color: '#a6b9ff', weight: 0.8 },
  { key: 'pluto', name: 'Pluto', glyph: t('♇'), engine: 'Pluto', color: '#d8a9ff', weight: 0.75 },
];

export const ELEMENT_COLORS: Record<Element, string> = {
  fire: '#ffb9a3',
  earth: '#c9e2b3',
  air: '#d8ccff',
  water: '#9fe6df',
};

export type AspectKind = 'conjunction' | 'sextile' | 'square' | 'trine' | 'opposition';

export type AspectDef = {
  kind: AspectKind;
  angle: number;
  orb: number;
  glyph: string;
  tone: 'blend' | 'ease' | 'tension';
  color: string;
};

export const ASPECTS: AspectDef[] = [
  { kind: 'conjunction', angle: 0, orb: 8, glyph: t('☌'), tone: 'blend', color: '#f6eed6' },
  { kind: 'sextile', angle: 60, orb: 4, glyph: t('⚹'), tone: 'ease', color: '#c6b8ff' },
  { kind: 'square', angle: 90, orb: 6, glyph: t('□'), tone: 'tension', color: '#ffb3cf' },
  { kind: 'trine', angle: 120, orb: 6, glyph: t('△'), tone: 'ease', color: '#a6ece1' },
  { kind: 'opposition', angle: 180, orb: 7, glyph: t('☍'), tone: 'tension', color: '#ffb3cf' },
];

export const signOf = (lon: number) => SIGNS[Math.floor(norm(lon) / 30) % 12];
export const norm = (deg: number) => ((deg % 360) + 360) % 360;
export const bodyByKey = (key: BodyKey) => BODIES.find((b) => b.key === key)!;
