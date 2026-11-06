/** The written guide under each calculator. Original Astronomads copy. */
export type ToolGuide = {
  /** Page address under /tools, e.g. "moon-sign" */
  slug: string;
  /** Title for search results, about 50 to 65 characters */
  title: string;
  /** Meta description, about 140 to 160 characters */
  description: string;
  /** The big headline in the hero */
  h1: string;
  /** One or two sentences under the headline */
  lead: string;
  /** The long read below the calculator. Each heading carries the tool's keyword. */
  sections: { id: string; title: string; paras: string[]; list?: { title: string; items: string[] } }[];
  faq: { q: string; a: string }[];
};
