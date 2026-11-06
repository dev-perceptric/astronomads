import type { NextRequest } from 'next/server';
import { allow, verifyPassword } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { clearSessionCookie, currentUser, fail, json, readBody, serverError } from '@/lib/server/http';

/** Deletes the account and every saved profile. Needs the password, or the email typed out for Google-only accounts. */
export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    if (!allow(`delete:${user.id}`, 10, 900_000)) return fail('Too many tries. Wait 15 minutes and try again.', 429);
    const rows = await query<{ password_hash: string | null }[]>('SELECT password_hash FROM users WHERE id = ?', [user.id]);
    const stored = rows[0]?.password_hash;
    if (stored) {
      if (typeof r.body.password !== 'string' || !(await verifyPassword(r.body.password, stored))) return fail('That password is wrong.', 401);
    } else if (typeof r.body.confirm !== 'string' || r.body.confirm.trim().toLowerCase() !== user.email) {
      return fail('Type your email exactly to confirm.', 400);
    }
    // Sessions, resets and profiles go with it (ON DELETE CASCADE).
    await query('DELETE FROM users WHERE id = ?', [user.id]);
    return clearSessionCookie(json({ ok: true }));
  } catch (e) {
    return serverError(e);
  }
}
