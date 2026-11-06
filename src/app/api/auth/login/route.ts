import type { NextRequest } from 'next/server';
import { allow, createSession, decoyHash, normalizeEmail, verifyPassword } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { clientIp, fail, json, readBody, serverError, setSessionCookie } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  const email = normalizeEmail(r.body.email);
  const password = typeof r.body.password === 'string' ? r.body.password.slice(0, 200) : '';
  if (!allow(`login:${clientIp(req)}`, 30, 900_000) || !allow(`login:${email}`, 10, 900_000)) {
    return fail('Too many tries. Wait 15 minutes and try again.', 429);
  }
  try {
    const rows = await query<{ id: number; password_hash: string }[]>('SELECT id, password_hash FROM users WHERE email = ?', [email]);
    const user = rows[0];
    // Same work whether or not the email exists, so timing reveals nothing.
    const ok = await verifyPassword(password, user?.password_hash ?? (await decoyHash()));
    if (!user || !ok) return fail('That email and password don’t match.', 401);
    const { token, expires } = await createSession(user.id);
    return setSessionCookie(json({ user: { email } }), token, expires);
  } catch (e) {
    return serverError(e);
  }
}
