import type { MetadataRoute } from 'next';
import { SIGN_COPY } from '@/lib/zodiac/copy';

/** Every public page we want found. Sign pages appear as they are written. */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  const now = new Date();
  return [
    { url: `${site}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site}/chart`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site}/today`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    ...Object.keys(SIGN_COPY).map((sign) => ({ url: `${site}/zodiac/${sign}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 })),
  ];
}
