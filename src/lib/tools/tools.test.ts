import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import * as CYCLES from '../astro/interpretations/cycles';
import * as RETURNS from '../astro/interpretations/returns';
import * as DETAILS from '../astro/interpretations/signDetails';
import { TOOLS } from './registry';
import type { ToolGuide } from './types';

/** Copy rules from the brand voice: no dashes, no "quietly", no "not" or "n't". */
const breaksRules = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b|\bcannot\b/i.test(t);
const words = (t: string) => t.trim().split(/\s+/).length;
/** Every string inside a value, however deep. */
const strings = (v: unknown): string[] => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : []);
const slugs = TOOLS.filter((t) => t.href.startsWith('/tools/')).map((t) => t.slug);
const root = path.resolve(__dirname, '../../app/(site)/tools');

describe('tools', () => {
  it('has a plain folder and a guide for every calculator', async () => {
    expect(slugs).toHaveLength(23);
    for (const slug of slugs) {
      expect(existsSync(path.join(root, slug, 'page.tsx')), slug).toBe(true);
      const { GUIDE } = (await import(`./guides/${slug}.ts`)) as { GUIDE: ToolGuide };
      expect(GUIDE.slug).toBe(slug);
    }
    // Hostinger can't serve script files from bracket folders.
    for (const dir of readdirSync(root)) expect(dir.includes('[')).toBe(false);
  });

  it('has detailed guides that follow the copy rules', async () => {
    for (const slug of slugs) {
      const { GUIDE } = (await import(`./guides/${slug}.ts`)) as { GUIDE: ToolGuide };
      for (const t of strings(GUIDE)) expect(breaksRules(t), `${slug}: ${t}`).toBe(false);
      expect(GUIDE.sections.length, slug).toBeGreaterThanOrEqual(8);
      expect(GUIDE.faq.length, slug).toBeGreaterThanOrEqual(8);
      expect(words(strings({ s: GUIDE.sections, f: GUIDE.faq }).join(' ')), slug).toBeGreaterThan(1800);
      expect(new Set(GUIDE.sections.map((x) => x.id)).size).toBe(GUIDE.sections.length);
      expect(GUIDE.description.length, slug).toBeLessThanOrEqual(170);
    }
  });

  it('has complete readings that follow the copy rules', () => {
    for (const [name, table] of Object.entries({ ...DETAILS, ...RETURNS, ...CYCLES })) {
      const all = strings(table);
      expect(all.length, name).toBeGreaterThan(0);
      for (const t of all) expect(breaksRules(t), `${name}: ${t}`).toBe(false);
    }
    const twelve = [DETAILS.MOON_DETAIL, DETAILS.RISING_DETAIL, DETAILS.VENUS_DETAIL, DETAILS.MARS_DETAIL, DETAILS.RULER_HOUSE, DETAILS.RULER_SIGN, DETAILS.SIGNATURE, RETURNS.SOLAR_RETURN_ASC, RETURNS.SOLAR_RETURN_SUN_HOUSE, RETURNS.SOLAR_RETURN_MOON_SIGN, RETURNS.LUNAR_RETURN_ASC, RETURNS.LUNAR_RETURN_MOON_HOUSE, CYCLES.SATURN_RETURN_HOUSE, CYCLES.SATURN_RETURN_SIGN, CYCLES.PROG_MOON_SIGN, CYCLES.PROG_SUN_SIGN];
    for (const t of twelve) {
      expect(t).toHaveLength(12);
      expect(new Set(strings(t)).size).toBe(strings(t).length);
    }
    expect(Object.keys(DETAILS.SUN_MOON_MIX)).toHaveLength(10);
    expect(Object.keys(DETAILS.VENUS_MARS_LINK).sort()).toEqual(['neighbor', 'opposite', 'quincunx', 'same', 'sextile', 'square', 'trine']);
    expect(CYCLES.PROG_MOON_PHASE).toHaveLength(8);
    expect(Object.keys(CYCLES.HOUR_MEANING)).toHaveLength(7);
    expect(Object.keys(RETURNS.RETRO)).toHaveLength(8);
  });
});
