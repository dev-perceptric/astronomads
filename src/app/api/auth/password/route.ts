import type { NextRequest } from 'next/server';
import { allow, createSession, endAllSessions, hashPassword, validPassword, verifyPassword } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { currentUser, fail, json, readBody, serverError, setSessionCookie } from '@/lib/server/http';

/** Change password: needs the current one; signs out every other device. */
export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    const user = await currentUser(req);
    if (!user) return fail('Sign in first.', 401);
    if (!allow(`password:${user.id}`, 10, 900_000)) return fail('Too many tries. Wait 15 minutes and try again.', 429);
    if (!validPassword(r.body.next)) return fail('Use a new password of at least 8 characters.', 400);
    const rows = await query<{ password_hash: string }[]>('SELECT password_hash FROM users WHERE id = ?', [user.id]);
    if (typeof r.body.current !== 'string' || !(await verifyPassword(r.body.current, rows[0].password_hash))) return fail('Your current password is wrong.', 401);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [await hashPassword(r.body.next), user.id]);
    await endAllSessions(user.id);
    const { token, expires } = await createSession(user.id);
    return setSessionCookie(json({ ok: true }), token, expires);
  } catch (e) {
    return serverError(e);
  }
}
