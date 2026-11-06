import type { SignKey } from '@/components/Glyph';

/** The written part of a sign page. Original Astronomads copy. */
export type SignCopy = {
  /** One line under the name in the hero */
  essence: string;
  /** Opening paragraph above the sections */
  intro: string;
  /** A short pull quote shown between sections */
  quote: string;
  sections: { id: string; title: string; paras: string[]; list?: { title: string; items: string[] } }[];
  /** Quick lists for the at a glance panel */
  traits: { strengths: string[]; weaknesses: string[]; likes: string[]; dislikes: string[] };
  /** One line on how this sign gets along with each sign */
  matches: Record<SignKey, string>;
  faq: { q: string; a: string }[];
};
