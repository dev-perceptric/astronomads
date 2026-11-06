import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { FAMILY_CONTACT, FAMILY_THEME } from '../astro/interpretations/family';
import { FRIEND_CONTACT, FRIEND_THEME } from '../astro/interpretations/friendship';
import * as PAIRS_COPY from '../astro/interpretations/pairs';
import * as REL from '../astro/interpretations/relationship';
import { SYNASTRY } from '../astro/interpretations/synastry';
import { WORK_CONTACT, WORK_THEME } from '../astro/interpretations/work';
import { MODE_THEMES } from '../astro/relate';
import { PAIRS_WRITTEN } from './pairs';
import type { PairCopy } from './types';

const breaksRules = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b|\bcannot\b/i.test(t);
const words = (t: string) => t.trim().split(/\s+/).length;
const strings = (v: unknown): string[] => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : []);
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
const ALL = ORDER.flatMap((a, i) => ORDER.slice(i).map((b) => `${a}-${b}`));
const IDS = ['love', 'intimacy', 'communication', 'friendship', 'work', 'family', 'challenges', 'making-it-work'];

describe('sign pair pages', () => {
  it('has all 78 pairings written, each with its own plain folder', () => {
    expect(PAIRS_WRITTEN).toEqual(ALL);
    for (const p of ALL) {
      const [a, b] = p.split('-');
      expect(existsSync(path.resolve(__dirname, `../../app/(site)/compatibility/${a}-and-${b}/page.tsx`)), p).toBe(true);
    }
    for (const dir of readdirSync(path.resolve(__dirname, '../../app/(site)/compatibility'))) expect(dir.includes('[')).toBe(false);
  });

  it('has detailed copy that follows the rules', async () => {
    const seen = new Set<string>();
    for (const p of ALL) {
      const { PAIR } = (await import(`./pairs/${p}.ts`)) as { PAIR: PairCopy };
      expect(PAIR.sections.map((x) => x.id), p).toEqual(IDS);
      expect(PAIR.strengths.length, p).toBeGreaterThanOrEqual(4);
      expect(PAIR.challenges.length, p).toBeGreaterThanOrEqual(3);
      expect(PAIR.faq.length, p).toBeGreaterThanOrEqual(5);
      expect(words(strings(PAIR).join(' ')), p).toBeGreaterThan(1400);
      for (const t of strings(PAIR)) {
        expect(breaksRules(t), `${p}: ${t}`).toBe(false);
        if (words(t) > 30) {
          expect(seen.has(t), `${p} repeats: ${t}`).toBe(false);
          seen.add(t);
        }
      }
    }
  });
});

describe('two-person readings', () => {
  it('has every contact in friendship, work and family words', () => {
    const keys = Object.keys(SYNASTRY).sort();
    for (const table of [FRIEND_CONTACT, WORK_CONTACT, FAMILY_CONTACT]) {
      expect(Object.keys(table).sort()).toEqual(keys);
      for (const k of keys) for (const tone of ['blend', 'ease', 'tension'] as const) expect(words(table[k][tone])).toBeGreaterThanOrEqual(20);
    }
    for (const [mode, table] of [['friend', FRIEND_THEME], ['work', WORK_THEME], ['family', FAMILY_THEME]] as const) {
      for (const th of MODE_THEMES[mode]) expect((table as Record<string, { low: string }>)[th]?.low, `${mode} ${th}`).toBeTruthy();
    }
  });

  it('follows the copy rules everywhere', () => {
    for (const [name, table] of Object.entries({ FRIEND_CONTACT, FRIEND_THEME, WORK_CONTACT, WORK_THEME, FAMILY_CONTACT, FAMILY_THEME, ...REL, ...PAIRS_COPY })) {
      for (const t of strings(table)) expect(breaksRules(t), `${name}: ${t}`).toBe(false);
    }
    for (const k of ['sun', 'moon', 'mercury', 'venus', 'mars', 'asc'] as const) expect(REL.REL_IN_SIGN[k]).toHaveLength(12);
    for (const k of ['sun', 'moon', 'venus', 'mars'] as const) expect(REL.REL_IN_HOUSE[k]).toHaveLength(12);
    for (const k of Object.keys(PAIRS_COPY.OVERLAY)) expect(PAIRS_COPY.OVERLAY[k as 'sun']).toHaveLength(12);
  });
});
