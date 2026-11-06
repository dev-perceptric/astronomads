// Makes the share image for each written sign page from the page's own hero.
// Run with the site running locally: node scripts/og-zodiac.mjs http://localhost:3100 [sign ...]
import { createRequire } from 'node:module';
// Playwright is a local tool here, so it may live outside this project's packages.
const { chromium } = createRequire(import.meta.url)('playwright');
const [base = 'http://localhost:3100', ...given] = process.argv.slice(2);
// With no signs named, makes images for every written sign.
const signs = given.length
  ? given
  : (await import('node:fs')).readdirSync(new URL('../src/lib/zodiac/copy/', import.meta.url)).map((f) => f.replace(/\.ts$/, '')).filter((s) => !['index', 'types'].includes(s));
const browser = await chromium.launch();
for (const sign of signs) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.goto(`${base}/zodiac/${sign}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.nm-header,.nm-skip{display:none!important} .nm-root{padding-top:0!important} nav[aria-label="Breadcrumb"]{visibility:hidden}' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `public/og/zodiac-${sign}.png` });
  console.log('wrote', `public/og/zodiac-${sign}.png`);
}
await browser.close();
