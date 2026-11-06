import type { AspectKind, BodyKey } from './constants';
import type { PointKey } from './chart';

/** What each point stands for, written to sit after "your" or "their" */
export const POINT_THEME: Record<PointKey, string> = {
  sun: 'sense of self',
  moon: 'inner weather',
  mercury: 'way of thinking',
  venus: 'way of loving',
  mars: 'drive',
  jupiter: 'faith',
  saturn: 'discipline',
  uranus: 'need for freedom',
  neptune: 'imagination',
  pluto: 'power to change',
  nnode: 'direction of growth',
  snode: 'comfort zone',
  asc: 'first impression',
  mc: 'public path',
};

/** How the sky's planet acts on a given day */
export const TRANSIT_SUBJECT: Record<BodyKey, string> = {
  sun: 'The day’s spotlight',
  moon: 'The mood of the hour',
  mercury: 'Conversation',
  venus: 'Love and pleasure',
  mars: 'Drive',
  jupiter: 'Luck',
  saturn: 'A push to commit',
  uranus: 'Sudden change',
  neptune: 'Daydreams',
  pluto: 'Deep change',
};

export const ASPECT_VERB: Record<AspectKind, string> = {
  conjunction: 'meets',
  sextile: 'opens a door for',
  square: 'tests',
  trine: 'supports',
  opposition: 'pulls against',
};

export const PLANET_VOICE: Record<BodyKey, string> = {
  sun: 'You shine',
  moon: 'You feel',
  mercury: 'You think',
  venus: 'You love',
  mars: 'You act',
  jupiter: 'You grow',
  saturn: 'You build',
  uranus: 'You break patterns',
  neptune: 'You dream',
  pluto: 'You transform',
};

export const SIGN_STYLE: string[] = [
  'boldly, by going first',
  'slowly, through your senses',
  'with curiosity and range',
  'protectively, from the heart',
  'warmly and out loud',
  'carefully, in the details',
  'with balance and grace',
  'intensely, all the way in',
  'freely, chasing meaning',
  'patiently, with a plan',
  'your own way, ahead of your time',
  'softly, by intuition',
];

export const HOUSE_REALM: string[] = [
  'self and body',
  'money and worth',
  'words and nearby places',
  'home and roots',
  'joy and romance',
  'work and daily care',
  'partners',
  'intimacy and shared ground',
  'travel and big ideas',
  'career and reputation',
  'friends and the future',
  'rest and the unseen',
];

export type MoonDay = { line: string; leanInto: string[]; letGo: string[] };

/** One entry per sign the Moon is passing through */
export const MOON_DAYS: MoonDay[] = [
  { line: 'Act on the first honest impulse.', leanInto: ['Starting the thing', 'Movement before noon', 'Saying it plainly'], letGo: ['Waiting for permission', 'Old arguments', 'Overplanning'] },
  { line: 'Slow down until things taste like something.', leanInto: ['Good bread', 'Saving money', 'Staying put'], letGo: ['Rushing', 'Comparing', 'Clutter'] },
  { line: 'Follow the conversation where it wants to go.', leanInto: ['Messages you meant to send', 'Short trips', 'One new word'], letGo: ['Endless scrolling', 'Gossip', 'Finishing every thought'] },
  { line: 'Tend to whatever feels like home.', leanInto: ['Cooking for someone', 'Calling family', 'Early nights'], letGo: ['Old hurts', 'Hiding how you feel', 'Overgiving'] },
  { line: 'Let yourself be seen without explaining.', leanInto: ['Dressing up', 'Making something', 'Generous praise'], letGo: ['Shrinking', 'Needing applause', 'Pride in an argument'] },
  { line: 'Fix one small thing well.', leanInto: ['Lists', 'Long walks', 'A clear desk'], letGo: ['Perfection', 'Self-criticism', 'Fixing other people'] },
  { line: 'Look for the beautiful middle.', leanInto: ['Art', 'Fair trades', 'Long dinners'], letGo: ['People-pleasing', 'Indecision', 'Keeping score'] },
  { line: 'Go one layer deeper than usual.', leanInto: ['Honest talks', 'Privacy', 'Deep work'], letGo: ['Jealousy', 'Testing people', 'Grudges'] },
  { line: 'Say yes to the wider view.', leanInto: ['Booking the ticket', 'Big questions', 'Laughing loudly'], letGo: ['Fine print', 'Preaching', 'Restlessness'] },
  { line: 'Build something that will still stand next year.', leanInto: ['Long-term plans', 'Mentors', 'Quiet ambition'], letGo: ['Cold shoulders', 'Overworking', 'Status games'] },
  { line: 'Let your strange idea breathe.', leanInto: ['Friends', 'New tools', 'Group plans'], letGo: ['Detachment', 'Contrarian moods', 'Old scripts'] },
  { line: 'Feel first and explain later.', leanInto: ['Music', 'Water', 'Naps'], letGo: ['Escaping', 'Saying yes to everything', 'Blurry boundaries'] },
];

export const placementLine = (body: BodyKey, sign: number) => `${PLANET_VOICE[body]} ${SIGN_STYLE[sign]}.`;

export const transitLine = (transit: BodyKey, kind: AspectKind, natal: PointKey) =>
  `${TRANSIT_SUBJECT[transit]} ${ASPECT_VERB[kind]} your ${POINT_THEME[natal]}.`;

export const natalAspectLine = (a: PointKey, kind: AspectKind, b: PointKey) => {
  const first = POINT_THEME[a];
  return `Your ${first} ${ASPECT_VERB[kind]} your ${POINT_THEME[b]}.`;
};
