/** Every free calculator, for the /tools hub, the related links and the sitemap. */
export type ToolInfo = { slug: string; href: string; name: string; short: string; group: 'chart' | 'timing' | 'pairs' };

export const TOOLS: ToolInfo[] = [
  { slug: 'chart', href: '/chart', name: 'Birth chart', short: 'Your full chart wheel with every planet, house and aspect explained.', group: 'chart' },
  { slug: 'big-three', href: '/tools/big-three', name: 'Big three', short: 'Your Sun, Moon and rising signs together, with a card to share.', group: 'chart' },
  { slug: 'sun-sign', href: '/zodiac', name: 'Sun sign', short: 'Find your Sun sign, even on a cusp day, and read the full sign guide.', group: 'chart' },
  { slug: 'moon-sign', href: '/tools/moon-sign', name: 'Moon sign', short: 'Your emotional sign: what you need, what comforts you and how you love.', group: 'chart' },
  { slug: 'rising-sign', href: '/tools/rising-sign', name: 'Rising sign', short: 'Your Ascendant, its ruler and the hour by hour rising signs of your birth day.', group: 'chart' },
  { slug: 'venus-mars', href: '/tools/venus-mars', name: 'Venus and Mars', short: 'How you love and how you go after what you want.', group: 'chart' },
  { slug: 'elements', href: '/tools/elements', name: 'Elements and modes', short: 'Your dominant element and mode, your missing element and your signature sign.', group: 'chart' },
  { slug: 'chart-ruler', href: '/tools/chart-ruler', name: 'Chart ruler', short: 'The planet that steers your whole chart, by sign, house and aspect.', group: 'chart' },
  { slug: 'today', href: '/today', name: 'Daily horoscope', short: 'Today’s planets meeting your chart, and your week ahead.', group: 'timing' },
  { slug: 'transits', href: '/tools/transits', name: 'Transits for any date', short: 'The sky on any date meeting your chart, plus a monthly ephemeris.', group: 'timing' },
  { slug: 'retrogrades', href: '/tools/retrogrades', name: 'Retrograde checker', short: 'What is retrograde now, every station this year and next, with shadow dates.', group: 'timing' },
  { slug: 'solar-return', href: '/tools/solar-return', name: 'Solar return', short: 'Your birthday chart for the year ahead, cast for where you will be.', group: 'timing' },
  { slug: 'lunar-return', href: '/tools/lunar-return', name: 'Lunar return', short: 'Your next 13 lunar returns and the mood of each month.', group: 'timing' },
  { slug: 'saturn-return', href: '/tools/saturn-return', name: 'Saturn return', short: 'Every Saturn return in your life, pass by pass.', group: 'timing' },
  { slug: 'progressions', href: '/tools/progressions', name: 'Progressions', short: 'Your progressed chart, progressed Moon phase and life chapters.', group: 'timing' },
  { slug: 'planetary-hours', href: '/tools/planetary-hours', name: 'Planetary hours', short: 'The ruler of today and of every hour, for your city.', group: 'timing' },
  { slug: 'compatibility', href: '/compatibility', name: 'Love compatibility', short: 'Two full charts compared: five scores and every contact between your planets.', group: 'pairs' },
  { slug: 'sign-compatibility', href: '/compatibility#signs', name: 'Sign compatibility', short: 'All 78 Sun sign pairings, read in depth for love, friendship and work.', group: 'pairs' },
  { slug: 'big-three-match', href: '/tools/big-three-match', name: 'Big three match', short: 'Your Sun, Moon and rising against theirs, all nine pairings.', group: 'pairs' },
  { slug: 'friendship-compatibility', href: '/tools/friendship-compatibility', name: 'Friendship compatibility', short: 'Fun, trust, talk, support and growth between two friends.', group: 'pairs' },
  { slug: 'work-compatibility', href: '/tools/work-compatibility', name: 'Work compatibility', short: 'Decisions, communication, reliability, drive and money between colleagues.', group: 'pairs' },
  { slug: 'parent-child', href: '/tools/parent-child', name: 'Parent and child', short: 'Warmth, structure and freedom between you and your child, and what they need.', group: 'pairs' },
  { slug: 'composite-chart', href: '/tools/composite-chart', name: 'Composite chart', short: 'The relationship as its own chart, built from your midpoints.', group: 'pairs' },
  { slug: 'davison-chart', href: '/tools/davison-chart', name: 'Davison chart', short: 'The relationship’s own birth moment, halfway between you in time and place.', group: 'pairs' },
  { slug: 'synastry-chart', href: '/tools/synastry-chart', name: 'Synastry chart', short: 'A double wheel with house overlays both ways and every contact.', group: 'pairs' },
  { slug: 'celebrity-match', href: '/tools/celebrity-match', name: 'Celebrity match', short: 'Which famous person your chart matches best, and your chart twins.', group: 'pairs' },
  { slug: 'couple-year-ahead', href: '/tools/couple-year-ahead', name: 'Couple’s year ahead', short: 'The key dates for your relationship over the next 12 months.', group: 'pairs' },
  { slug: 'best-dates', href: '/tools/best-dates', name: 'Best dates together', short: 'The best days in the next 90 for romance, talks and plans.', group: 'pairs' },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug)!;
