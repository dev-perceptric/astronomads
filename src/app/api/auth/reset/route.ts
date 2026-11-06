import type { NextRequest } from 'next/server';
import { allow, consumeResetToken, createSession, endAllSessions, hashPassword, validPassword } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { clientIp, fail, json, readBody, serverError, setSessionCookie } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  if (!validPassword(r.body.password)) return fail('Use a password of at least 8 characters.', 400);
  if (!allow(`reset:${clientIp(req)}`, 20, 3600_000)) return fail('Too many tries. Try again in an hour.', 429);
  try {
    const userId = await consumeResetToken(r.body.token);
    if (!userId) return fail('This reset link has expired or was already used. Ask for a new one.', 400);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [await hashPassword(r.body.password), userId]);
    await endAllSessions(userId);
    const rows = await query<{ email: string }[]>('SELECT email FROM users WHERE id = ?', [userId]);
    const { token, expires } = await createSession(userId);
    return setSessionCookie(json({ user: { email: rows[0]?.email } }), token, expires);
  } catch (e) {
    return serverError(e);
  }
}
