import type { NextRequest } from 'next/server';
import { allow, normalizeEmail, validEmail } from '@/lib/server/auth';
import { dbConfigured } from '@/lib/server/db';
import { siteUrl } from '@/lib/server/google';
import { clientIp, currentUser, fail, json, readBody, serverError } from '@/lib/server/http';
import { createOrder, setSession } from '@/lib/server/orders';
import { parseProfile } from '@/lib/server/profiles';
import { createCheckout, stripeConfigured } from '@/lib/server/stripe';
import { PRODUCTS, isProduct } from '@/lib/reports/products';

/** Whether reports are on sale (Stripe is set up). */
export function GET() {
  return json({ enabled: stripeConfigured() && dbConfigured() });
}

/** Starts a purchase: saves the order, opens a Stripe Checkout page, and returns its address. */
export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  if (!stripeConfigured()) return fail('Reports go on sale soon.', 503);
  if (!allow(`checkout:${clientIp(req)}`, 20, 3600_000)) return fail('Too many tries. Try again in an hour.', 429);

  const product = r.body.product;
  if (!isProduct(product)) return fail('Choose a report.', 400);
  const p = PRODUCTS[product];
  const raw = Array.isArray(r.body.people) ? r.body.people : [];
  if (raw.length !== p.people) return fail(p.people === 1 ? 'Add the birth details.' : 'Add both people.', 400);
  const people = [];
  for (const x of raw) {
    const parsed = parseProfile(x);
    if (!parsed.ok) return fail(parsed.error, 400);
    people.push(parsed.value);
  }

  try {
    const user = await currentUser(req);
    const given = normalizeEmail(r.body.email);
    const email = user?.email ?? (given && validEmail(given) ? given : null);
    const token = await createOrder({ product, people, email, userId: user?.id ?? null });
    const base = siteUrl();
    const back = typeof r.body.back === 'string' && r.body.back.startsWith('/') && !r.body.back.startsWith('//') ? r.body.back : `/reports/${product}`;
    const session = await createCheckout({
      token,
      name: `${p.name}: ${people.map((x) => x.name).join(' and ')}`,
      description: p.tagline,
      amount: p.amount,
      currency: p.currency,
      email,
      successUrl: `${base}/reports/view?order=${token}`,
      cancelUrl: `${base}${back}`,
    });
    await setSession(token, session.id);
    return json({ url: session.url });
  } catch (e) {
    return serverError(e);
  }
}
