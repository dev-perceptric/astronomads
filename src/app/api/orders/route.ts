import type { NextRequest } from 'next/server';
import { dbConfigured } from '@/lib/server/db';
import { siteUrl } from '@/lib/server/google';
import { currentUser, fail, json, serverError } from '@/lib/server/http';
import { mailConfigured, sendReportEmail } from '@/lib/server/mail';
import { loadOrder, ordersFor } from '@/lib/server/orders';
import { PRODUCTS } from '@/lib/reports/products';

/**
 * ?token=...  one order, checked with Stripe if still pending (the token is the secret link).
 * ?mine=1     the signed-in person's paid reports.
 */
export async function GET(req: NextRequest) {
  if (!dbConfigured()) return fail('Reports are not set up on this server yet.', 503);
  const p = req.nextUrl.searchParams;
  try {
    if (p.get('mine')) {
      const user = await currentUser(req);
      if (!user) return fail('Sign in first.', 401);
      return json({ orders: await ordersFor(user.id, user.email) });
    }
    const loaded = await loadOrder(p.get('token') ?? '');
    if (!loaded) return fail('This report link isn’t valid.', 404);
    const { order, justPaid } = loaded;
    if (justPaid && order.email && mailConfigured()) {
      // The link is the receipt; a mail hiccup must never block the report itself.
      sendReportEmail(order.email, PRODUCTS[order.product].name, `${siteUrl()}/reports/view?order=${order.token}`).catch((e) => console.error('[reports] email failed', e));
    }
    return json({ order });
  } catch (e) {
    return serverError(e);
  }
}
