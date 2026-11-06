import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { SIGN_COPY } from './copy';
import { famousBySign } from './famous';
import { SIGN_FACTS, relation } from './signs';

const breaksRules = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b/i.test(t);

describe('sign pages', () => {
  it('has facts for all 12 signs with opposites that point back', () => {
    expect(SIGN_FACTS).toHaveLength(12);
    for (const s of SIGN_FACTS) {
      const opp = SIGN_FACTS.find((o) => o.key === s.opposite)!;
      expect(opp.opposite).toBe(s.key);
      expect(Math.abs(opp.index - s.index)).toBe(6);
    }
  });

  it('names how signs relate by distance', () => {
    expect(relation(0, 4).kind).toBe('trine');
    expect(relation(0, 6).kind).toBe('opposite');
    expect(relation(0, 9).kind).toBe('square');
    expect(relation(0, 10).kind).toBe('sextile');
    expect(relation(0, 0).kind).toBe('same');
  });

  it('has complete copy that follows the copy rules', () => {
    for (const [key, copy] of Object.entries(SIGN_COPY)) {
      const all = [copy!.essence, copy!.intro, copy!.quote, ...copy!.sections.flatMap((s) => [s.title, ...s.paras]), ...Object.values(copy!.matches), ...copy!.faq.flatMap((f) => [f.q, f.a])];
      for (const t of all) expect(breaksRules(t), `${key}: ${t}`).toBe(false);
      expect(Object.keys(copy!.matches)).toHaveLength(12);
      expect(copy!.sections.length).toBeGreaterThanOrEqual(6);
    }
  });

  it('gives every written sign its own plain page folder (no [brackets], which Hostinger cannot serve)', () => {
    for (const key of Object.keys(SIGN_COPY)) {
      expect(existsSync(path.join(process.cwd(), `src/app/(site)/zodiac/${key}/page.tsx`)), key).toBe(true);
    }
  });

  it('files famous people under a sign only when their Sun was there all day', () => {
    const bySign = famousBySign();
    expect(bySign[0].length).toBeGreaterThan(50);
    for (const [i, list] of bySign.entries()) for (const p of list) expect(Math.floor(p.sunLon / 30)).toBe(i);
  });
});
