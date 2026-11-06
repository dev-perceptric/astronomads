import type { SignKey } from '@/components/Glyph';
import type { Element, Mode } from '@/lib/astro/constants';

/** Traditional facts for each sign. Classic rulers first; modern rulers where astrologers added one. */
export type SignFacts = {
  key: SignKey;
  index: number; // 0 = Aries
  name: string;
  symbol: string; // "The Ram"
  element: Element;
  mode: Mode;
  ruler: string;
  modernRuler?: string;
  opposite: SignKey;
  house: number;
  body: string;
  polarity: 'Active' | 'Receptive';
  /** Usual dates; the exact moments change a little every year */
  usual: [string, string];
  keywords: string[];
};

const F = (
  key: SignKey,
  name: string,
  symbol: string,
  element: Element,
  mode: Mode,
  ruler: string,
  modernRuler: string | undefined,
  opposite: SignKey,
  body: string,
  usual: [string, string],
  keywords: string[],
): Omit<SignFacts, 'index' | 'house' | 'polarity'> => ({ key, name, symbol, element, mode, ruler, modernRuler, opposite, body, usual, keywords });

const LIST = [
  F('aries', 'Aries', 'The Ram', 'fire', 'cardinal', 'Mars', undefined, 'libra', 'Head and face', ['21 March', '19 April'], ['Courage', 'Firsts', 'Directness', 'Drive']),
  F('taurus', 'Taurus', 'The Bull', 'earth', 'fixed', 'Venus', undefined, 'scorpio', 'Throat and neck', ['20 April', '20 May'], ['Patience', 'Comfort', 'Loyalty', 'Senses']),
  F('gemini', 'Gemini', 'The Twins', 'air', 'mutable', 'Mercury', undefined, 'sagittarius', 'Arms, hands and lungs', ['21 May', '20 June'], ['Curiosity', 'Talk', 'Wit', 'Variety']),
  F('cancer', 'Cancer', 'The Crab', 'water', 'cardinal', 'Moon', undefined, 'capricorn', 'Chest and stomach', ['21 June', '22 July'], ['Care', 'Home', 'Memory', 'Feeling']),
  F('leo', 'Leo', 'The Lion', 'fire', 'fixed', 'Sun', undefined, 'aquarius', 'Heart and back', ['23 July', '22 August'], ['Warmth', 'Pride', 'Play', 'Generosity']),
  F('virgo', 'Virgo', 'The Maiden', 'earth', 'mutable', 'Mercury', undefined, 'pisces', 'Digestion', ['23 August', '22 September'], ['Craft', 'Service', 'Detail', 'Health']),
  F('libra', 'Libra', 'The Scales', 'air', 'cardinal', 'Venus', undefined, 'aries', 'Kidneys and lower back', ['23 September', '22 October'], ['Balance', 'Beauty', 'Fairness', 'Partners']),
  F('scorpio', 'Scorpio', 'The Scorpion', 'water', 'fixed', 'Mars', 'Pluto', 'taurus', 'Reproductive organs', ['23 October', '21 November'], ['Depth', 'Intensity', 'Trust', 'Change']),
  F('sagittarius', 'Sagittarius', 'The Archer', 'fire', 'mutable', 'Jupiter', undefined, 'gemini', 'Hips and thighs', ['22 November', '21 December'], ['Freedom', 'Meaning', 'Travel', 'Humor']),
  F('capricorn', 'Capricorn', 'The Sea-Goat', 'earth', 'cardinal', 'Saturn', undefined, 'cancer', 'Knees, bones and skin', ['22 December', '19 January'], ['Ambition', 'Structure', 'Patience', 'Mastery']),
  F('aquarius', 'Aquarius', 'The Water Bearer', 'air', 'fixed', 'Saturn', 'Uranus', 'leo', 'Ankles and circulation', ['20 January', '18 February'], ['Ideas', 'Friends', 'Change', 'Freedom']),
  F('pisces', 'Pisces', 'The Fish', 'water', 'mutable', 'Jupiter', 'Neptune', 'virgo', 'Feet', ['19 February', '20 March'], ['Imagination', 'Empathy', 'Dreams', 'Faith']),
];

export const SIGN_FACTS: SignFacts[] = LIST.map((s, i) => ({ ...s, index: i, house: i + 1, polarity: i % 2 === 0 ? 'Active' : 'Receptive' }));
export const signBySlug = (slug: string) => SIGN_FACTS.find((s) => s.key === slug) ?? null;

export type Relation = { kind: 'same' | 'neighbor' | 'sextile' | 'square' | 'trine' | 'quincunx' | 'opposite'; label: string; tone: 'easy' | 'tense' | 'mixed' };

/** How two signs relate, from how far apart they sit on the zodiac. */
export function relation(a: number, b: number): Relation {
  const d = Math.min((b - a + 12) % 12, (a - b + 12) % 12);
  return (
    [
      { kind: 'same', label: 'Same sign', tone: 'mixed' },
      { kind: 'neighbor', label: 'Neighbors', tone: 'mixed' },
      { kind: 'sextile', label: 'Sextile', tone: 'easy' },
      { kind: 'square', label: 'Square', tone: 'tense' },
      { kind: 'trine', label: 'Trine', tone: 'easy' },
      { kind: 'quincunx', label: 'Quincunx', tone: 'mixed' },
      { kind: 'opposite', label: 'Opposites', tone: 'tense' },
    ] as const
  )[d];
}
