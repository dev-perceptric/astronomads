import type { SignKey } from '@/components/Glyph';

/** The written part of a sign page. Original Astronomads copy. */
export type SignCopy = {
  /** One line under the name in the hero */
  essence: string;
  /** Opening paragraph above the sections */
  intro: string;
  /** A short pull quote shown between sections */
  quote: string;
  /** Section ids pick their keyword heading from SECTION_TITLES ("Aries in love"); `title` overrides it */
  sections: { id: string; title?: string; paras: string[]; list?: { title: string; items: string[] } }[];
  /** Quick lists for the at a glance panel */
  traits: { strengths: string[]; weaknesses: string[]; likes: string[]; dislikes: string[] };
  /** One line on how this sign gets along with each sign */
  matches: Record<SignKey, string>;
  faq: { q: string; a: string }[];
};

/**
 * Every section heading carries the sign's name, the way people search ("Aries in love",
 * "Aries strengths"). Shared by all twelve pages so they stay consistent.
 */
export const SECTION_TITLES: Record<string, (sign: string) => string> = {
  nature: (n) => `${n} personality`,
  myth: (n) => `${n} myth`,
  symbol: (n) => `${n} symbol and season`,
  strengths: (n) => `${n} strengths`,
  'watch-outs': (n) => `${n} weaknesses`,
  love: (n) => `${n} in love`,
  intimacy: (n) => `${n} intimacy`,
  matches: (n) => `${n} best matches`,
  friends: (n) => `${n} as a friend`,
  family: (n) => `${n} in the family`,
  career: (n) => `${n} career`,
  money: (n) => `${n} and money`,
  wellbeing: (n) => `${n} body and wellbeing`,
  style: (n) => `${n} style and home`,
  man: (n) => `The ${n} man`,
  woman: (n) => `The ${n} woman`,
  growth: (n) => `How ${n} grows`,
};

export const sectionTitle = (sec: { id: string; title?: string }, sign: string) => sec.title ?? SECTION_TITLES[sec.id]?.(sign) ?? sec.id;
