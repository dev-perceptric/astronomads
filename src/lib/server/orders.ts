import { randomBytes } from 'node:crypto';
import { cityById, type City } from '@/lib/cities';
import { PRODUCTS, type ProductKey } from '@/lib/reports/products';
import { query } from './db';
import { getSession } from './stripe';

export type OrderPerson = { name: string; date: string; time: string | null; cityId: number };
export type Order = {
  token: string;
  product: ProductKey;
  people: (Omit<OrderPerson, 'cityId'> & { city: City })[];
  email: string | null;
  status: 'pending' | 'paid';
  createdAt: string;
};
type Row = { token: string; product: ProductKey; people: string; email: string | null; status: 'pending' | 'paid'; stripe_session: string | null; created_at: string; paid_at: string | null };

export const newToken = () => randomBytes(24).toString('base64url');

export async function createOrder(o: { product: ProductKey; people: OrderPerson[]; email: string | null; userId: number | null }): Promise<string> {
  const token = newToken();
  const p = PRODUCTS[o.product];
  await query('INSERT INTO orders (token, product, people, email, user_id, amount, currency) VALUES (?, ?, ?, ?, ?, ?, ?)', [token, o.product, JSON.stringify(o.people), o.email, o.userId, p.amount, p.currency]);
  return token;
}

export const setSession = (token: string, session: string) => query('UPDATE orders SET stripe_session = ? WHERE token = ?', [session, token]);

const toOrder = (r: Row): Order => ({
  token: r.token,
  product: r.product,
  people: (JSON.parse(r.people) as OrderPerson[]).map(({ cityId, ...rest }) => ({ ...rest, city: cityById(cityId)! })),
  email: r.email,
  status: r.status,
  createdAt: r.created_at,
});

/**
 * Loads an order by its secret token. A pending order is checked with Stripe once more, so the buyer sees
 * the report as soon as they return. Says whether it just became paid, so the caller can send the email once.
 */
export async function loadOrder(token: string): Promise<{ order: Order; justPaid: boolean } | null> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const rows = await query<Row[]>('SELECT token, product, people, email, status, stripe_session, created_at, paid_at FROM orders WHERE token = ?', [token]);
  const row = rows[0];
  if (!row) return null;
  let justPaid = false;
  if (row.status !== 'paid' && row.stripe_session) {
    const s = await getSession(row.stripe_session);
    if (s.payment_status === 'paid' && s.client_reference_id === token) {
      const email = row.email ?? s.customer_details?.email ?? null;
      const res = await query<{ affectedRows: number }>("UPDATE orders SET status = 'paid', paid_at = UTC_TIMESTAMP(), email = ? WHERE token = ? AND status <> 'paid'", [email, token]);
      justPaid = res.affectedRows > 0;
      row.status = 'paid';
      row.email = email;
    }
  }
  return { order: toOrder(row), justPaid };
}

/** Paid reports for a signed-in person: theirs by account, and any bought with their email. */
export async function ordersFor(userId: number, email: string): Promise<Order[]> {
  const rows = await query<Row[]>(
    "SELECT token, product, people, email, status, stripe_session, created_at, paid_at FROM orders WHERE status = 'paid' AND (user_id = ? OR email = ?) ORDER BY id DESC LIMIT 200",
    [userId, email],
  );
  return rows.map(toOrder);
}
