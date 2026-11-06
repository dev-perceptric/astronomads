import type { MetadataRoute } from 'next';
import { PAIRS_WRITTEN } from '@/lib/compat/pairs';
import { ARTICLES } from '@/lib/learn';
import { TOOLS } from '@/lib/tools/registry';
import { SIGN_COPY } from '@/lib/zodiac/copy';

/** Every public page we want found. Sign pages appear as they are written. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  const now = new Date();
  return [
    { url: `${site}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/chart`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site}/today`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${site}/compatibility`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site}/reports`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site}/reports/portrait`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site}/reports/synastry`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...ARTICLES.map((a) => ({ url: `${site}/learn/${a.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${site}/tools`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...TOOLS.filter((t) => t.href.startsWith('/tools/')).map((t) => ({ url: `${site}${t.href}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...PAIRS_WRITTEN.map((p) => ({ url: `${site}/compatibility/${p.replace('-', '-and-')}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${site}/zodiac`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...Object.keys(SIGN_COPY).map((sign) => ({ url: `${site}/zodiac/${sign}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ];
}
