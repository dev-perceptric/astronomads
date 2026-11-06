import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { ARTICLES } from '.';

const breaksRules = (t: string) => /[—–]|\bquietly\b|\bnot\b|n't\b|\bcannot\b/i.test(t);
const strings = (v: unknown): string[] => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === 'object' ? Object.values(v).flatMap(strings) : []);

describe('learn articles', () => {
  it('each has its own plain folder, real depth and the copy rules', () => {
    for (const a of ARTICLES) {
      expect(existsSync(path.resolve(__dirname, `../../app/(site)/learn/${a.slug}/page.tsx`)), a.slug).toBe(true);
      for (const t of strings(a)) expect(breaksRules(t), `${a.slug}: ${t}`).toBe(false);
      expect(strings({ s: a.sections, f: a.faq }).join(' ').split(/\s+/).length, a.slug).toBeGreaterThan(3000);
      expect(a.sources.length).toBeGreaterThanOrEqual(5);
      expect(new Set(a.sections.map((x) => x.id)).size).toBe(a.sections.length);
    }
  });
});
