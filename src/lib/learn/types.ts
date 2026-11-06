/** A long Learn article. Original Astronomads writing. */
export type FigureKey = 'hemispheres' | 'quadrants' | 'diurnal' | 'distribution' | 'house-sizes' | 'house-compare' | 'circles';

export type Article = {
  slug: string;
  /** Title for search results */
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lead: string;
  /** Reading time in minutes, shown in the hero */
  minutes: number;
  sections: {
    id: string;
    title: string;
    paras: string[];
    list?: { title: string; items: string[] };
    /** A drawing or a live tool placed after the paragraphs */
    figure?: FigureKey;
    /** A short boxed aside, for a definition or a caution */
    aside?: { title: string; text: string };
  }[];
  faq: { q: string; a: string }[];
  /** Further reading: books and papers named in the text */
  sources: string[];
};
