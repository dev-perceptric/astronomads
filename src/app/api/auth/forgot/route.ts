import type { NextRequest } from 'next/server';
import { allow, createResetToken, normalizeEmail, validEmail } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { clientIp, fail, json, readBody, serverError } from '@/lib/server/http';
import { siteUrl } from '@/lib/server/google';
import { mailConfigured, sendResetEmail } from '@/lib/server/mail';

/** Always answers the same way, so it never reveals whether an email has an account. */
export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  const email = normalizeEmail(r.body.email);
  if (!validEmail(email)) return fail('Enter a valid email address.', 400);
  if (!mailConfigured()) return fail('Password reset by email is not set up yet.', 503);
  if (!allow(`forgot:${clientIp(req)}`, 10, 3600_000) || !allow(`forgot:${email}`, 3, 3600_000)) {
    return fail('Too many reset emails. Try again in an hour.', 429);
  }
  try {
    const rows = await query<{ id: number }[]>('SELECT id FROM users WHERE email = ?', [email]);
    if (rows[0]) {
      const token = await createResetToken(rows[0].id);
      // Built from our own address, never from the request, so the link can't be pointed elsewhere.
      await sendResetEmail(email, `${siteUrl()}/account/reset?token=${encodeURIComponent(token)}`);
    }
    return json({ ok: true });
  } catch (e) {
    return serverError(e);
  }
}
