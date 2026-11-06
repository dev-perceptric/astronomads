import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/account'] }],
    sitemap: `${site}/sitemap.xml`,
  };
}
