import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, SESSION_DAYS, userFromSession, type User } from './auth';
import { dbConfigured } from './db';

export const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export const fail = (error: string, status: number) => json({ error }, status);

/** The client's address for rate limits (Hostinger sits behind a proxy). */
export const clientIp = (req: NextRequest) => req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';

/**
 * Guards every request that changes something: the database must be set up, the request must come
 * from our own pages (Origin check against cross-site forms), and the body must be small JSON.
 */
export async function readBody(req: NextRequest): Promise<{ ok: true; body: Record<string, unknown> } | { ok: false; res: NextResponse }> {
  if (!dbConfigured()) return { ok: false, res: fail('Accounts are not set up on this server yet.', 503) };
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (origin && host && new URL(origin).host !== host) return { ok: false, res: fail('Request blocked.', 403) };
  if (!req.headers.get('content-type')?.includes('application/json')) return { ok: false, res: fail('Send JSON.', 415) };
  const text = await req.text();
  if (text.length > 10_000) return { ok: false, res: fail('Request too large.', 413) };
  try {
    const body = text ? JSON.parse(text) : {};
    return typeof body === 'object' && body !== null ? { ok: true, body } : { ok: false, res: fail('Send a JSON object.', 400) };
  } catch {
    return { ok: false, res: fail('Send valid JSON.', 400) };
  }
}

export async function currentUser(req: NextRequest): Promise<User | null> {
  if (!dbConfigured()) return null;
  return userFromSession(req.cookies.get(SESSION_COOKIE)?.value);
}

export function setSessionCookie(res: NextResponse, token: string, expires: Date): NextResponse {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
    maxAge: SESSION_DAYS * 86400,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse): NextResponse {
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}

/** Logs the real error on the server and gives the person one short line. */
export function serverError(e: unknown): NextResponse {
  console.error('[accounts]', e);
  return fail('Something went wrong on our side. Try again in a moment.', 500);
}
