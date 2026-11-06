import type { NextRequest } from 'next/server';
import { allow, createSession, hashPassword, normalizeEmail, validEmail, validPassword } from '@/lib/server/auth';
import { query } from '@/lib/server/db';
import { clientIp, fail, json, readBody, serverError, setSessionCookie } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  const email = normalizeEmail(r.body.email);
  if (!validEmail(email)) return fail('Enter a valid email address.', 400);
  if (!validPassword(r.body.password)) return fail('Use a password of at least 8 characters.', 400);
  if (!allow(`signup:${clientIp(req)}`, 10, 3600_000)) return fail('Too many new accounts from here. Try again in an hour.', 429);
  try {
    const existing = await query<{ id: number }[]>('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return fail('An account with this email already exists. Sign in instead.', 409);
    const hash = await hashPassword(r.body.password);
    const res = await query<{ insertId: number }>('INSERT INTO users (email, password_hash) VALUES (?, ?)', [email, hash]);
    const { token, expires } = await createSession(res.insertId);
    return setSessionCookie(json({ user: { email } }, 201), token, expires);
  } catch (e) {
    if ((e as { code?: string }).code === 'ER_DUP_ENTRY') return fail('An account with this email already exists. Sign in instead.', 409);
    return serverError(e);
  }
}
