/**
 * Stripe Checkout through its REST API (no SDK). Configured by STRIPE_SECRET_KEY.
 * We never see card details: the buyer pays on Stripe's page and comes back to the report.
 */
export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);

const API = 'https://api.stripe.com/v1';

async function stripe<T>(path: string, init?: { method?: string; form?: Record<string, string> }): Promise<T> {
  const waits = [400, 1200];
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API}${path}`, {
      method: init?.method ?? 'GET',
      headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, ...(init?.form ? { 'content-type': 'application/x-www-form-urlencoded' } : {}) },
      body: init?.form ? new URLSearchParams(init.form).toString() : undefined,
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return (await res.json()) as T;
    if ((res.status >= 500 || res.status === 429) && attempt < waits.length) {
      await new Promise((r) => setTimeout(r, waits[attempt]));
      continue;
    }
    throw new Error(`Stripe ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

export type Session = { id: string; url: string | null; payment_status: string; customer_details?: { email?: string | null } | null; client_reference_id?: string | null };

export function createCheckout(o: { token: string; name: string; description: string; amount: number; currency: string; email?: string | null; successUrl: string; cancelUrl: string }): Promise<Session> {
  const form: Record<string, string> = {
    mode: 'payment',
    client_reference_id: o.token,
    'metadata[order]': o.token,
    'line_items[0][quantity]': '1',
    'line_items[0][price_data][currency]': o.currency,
    'line_items[0][price_data][unit_amount]': String(o.amount),
    'line_items[0][price_data][product_data][name]': o.name,
    'line_items[0][price_data][product_data][description]': o.description,
    success_url: o.successUrl,
    cancel_url: o.cancelUrl,
    allow_promotion_codes: 'true',
  };
  if (o.email) form.customer_email = o.email;
  return stripe<Session>('/checkout/sessions', { method: 'POST', form });
}

export const getSession = (id: string) => stripe<Session>(`/checkout/sessions/${encodeURIComponent(id)}`);
