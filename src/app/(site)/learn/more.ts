import { ARTICLES } from '@/lib/learn';

/** Links for the end of each article and the Learn hub. */
export const MORE = [
  ...ARTICLES.map((x) => ({ href: `/learn/${x.slug}`, title: x.h1, text: x.lead.split('. ')[0] + '.' })),
  { href: '/zodiac', title: 'The zodiac signs', text: 'All twelve signs in depth, with their real constellations.' },
  { href: '/compatibility#signs', title: 'Sign compatibility', text: 'All 78 Sun sign pairings, read for love, friendship and work.' },
  { href: '/tools/elements', title: 'Elements and modes', text: 'Your chart’s balance of fire, earth, air and water.' },
  { href: '/tools/chart-ruler', title: 'Your chart ruler', text: 'The planet that steers your whole chart.' },
];
