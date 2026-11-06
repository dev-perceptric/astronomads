/** One Sun sign pairing, in Astronomads' own words. Headings are made from the sign names. */
export type PairCopy = {
  /** One line under the names in the hero, 12 to 25 words */
  essence: string;
  /** Opening paragraph, 120 to 180 words */
  intro: string;
  /**
   * The long read. Exactly these ids, in this order: 'love', 'intimacy', 'communication', 'friendship',
   * 'work', 'family', 'challenges', 'making-it-work'. Each has 3 or 4 paragraphs of 60 to 110 words.
   */
  sections: { id: PairSectionId; paras: string[] }[];
  /** 5 short strengths of the pair, 4 to 10 words each */
  strengths: string[];
  /** 4 short growth points of the pair, 4 to 10 words each */
  challenges: string[];
  /** 4 date or time together ideas that suit the pair, 5 to 14 words each */
  ideas: string[];
  /** 6 questions people search, with answers of 40 to 90 words */
  faq: { q: string; a: string }[];
};

export type PairSectionId = 'love' | 'intimacy' | 'communication' | 'friendship' | 'work' | 'family' | 'challenges' | 'making-it-work';

/** "Aries and Leo in love" */
export const PAIR_TITLES: Record<PairSectionId, (pair: string) => string> = {
  love: (p) => `${p} in love`,
  intimacy: (p) => `${p} intimacy and trust`,
  communication: (p) => `${p} communication`,
  friendship: (p) => `${p} as friends`,
  work: (p) => `${p} at work`,
  family: (p) => `${p} in the family`,
  challenges: (p) => `${p} challenges`,
  'making-it-work': (p) => `How ${p} make it work`,
};
