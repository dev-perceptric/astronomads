import { NextRequest } from 'next/server';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

/** A whole purchase against a real database, with Stripe's API faked. Needs TEST_DATABASE_URL. */
const url = process.env.TEST_DATABASE_URL;
(url ? describe : describe.skip)('report orders', () => {
  let db: typeof import('./db');
  let checkout: { POST: (r: NextRequest) => Promise<Response>; GET: () => Response };
  let orders: { GET: (r: NextRequest) => Promise<Response> };
  const realFetch = globalThis.fetch;
  let paid = false;
  let lastForm = new URLSearchParams();

  beforeAll(async () => {
    process.env.DATABASE_URL = url;
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    process.env.SITE_URL = 'https://astro.test';
    db = await import('./db');
    (await import('./auth')).resetRateLimits();
    checkout = (await import('@/app/api/checkout/route')) as unknown as typeof checkout;
    orders = await import('@/app/api/orders/route');
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const u = String(input);
      if (u === 'https://api.stripe.com/v1/checkout/sessions' && init?.method === 'POST') {
        lastForm = new URLSearchParams(String(init.body));
        return new Response(JSON.stringify({ id: 'cs_test_1', url: 'https://checkout.stripe.test/pay', payment_status: 'unpaid' }));
      }
      if (u.startsWith('https://api.stripe.com/v1/checkout/sessions/cs_test_1')) {
        return new Response(JSON.stringify({ id: 'cs_test_1', payment_status: paid ? 'paid' : 'unpaid', client_reference_id: lastForm.get('client_reference_id'), customer_details: { email: 'buyer@example.com' } }));
      }
      throw new Error(`unexpected fetch ${u}`);
    }) as typeof fetch;
  });
  afterAll(async () => {
    globalThis.fetch = realFetch;
    await db?.closeDb();
  });
  beforeEach(async () => {
    paid = false;
    await db.query('DELETE FROM orders');
  });

  const post = (body: unknown) =>
    new NextRequest('https://astro.test/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://astro.test', host: 'astro.test' }, body: JSON.stringify(body) });
  const nova = { name: 'Nova', date: '1996-03-20', time: '06:40', cityId: 2267057 };

  it('opens checkout, shows the report only once Stripe says paid, then lists it as paid', async () => {
    expect(await checkout.GET().json()).toEqual({ enabled: true });
    const res = await checkout.POST(post({ product: 'portrait', people: [nova] }));
    expect(res.status).toBe(200);
    expect((await res.json()).url).toBe('https://checkout.stripe.test/pay');
    expect(lastForm.get('line_items[0][price_data][unit_amount]')).toBe('3900');
    const token = lastForm.get('client_reference_id')!;
    expect(lastForm.get('success_url')).toBe(`https://astro.test/reports/view?order=${token}`);

    const pending = await (await orders.GET(new NextRequest(`https://astro.test/api/orders?token=${token}`))).json();
    expect(pending.order.status).toBe('pending');

    paid = true;
    const done = await (await orders.GET(new NextRequest(`https://astro.test/api/orders?token=${token}`))).json();
    expect(done.order).toMatchObject({ status: 'paid', product: 'portrait', email: 'buyer@example.com', people: [{ name: 'Nova', city: { id: 2267057 } }] });
  });

  it('refuses a wrong number of people, a bad product and a made-up token', async () => {
    expect((await checkout.POST(post({ product: 'synastry', people: [nova] }))).status).toBe(400);
    expect((await checkout.POST(post({ product: 'tarot', people: [nova] }))).status).toBe(400);
    expect((await orders.GET(new NextRequest('https://astro.test/api/orders?token=AAAAAAAAAAAAAAAAAAAAAAAAAAAA'))).status).toBe(404);
  });
});
