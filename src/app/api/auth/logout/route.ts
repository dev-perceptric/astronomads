import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, endSession } from '@/lib/server/auth';
import { clearSessionCookie, json, readBody, serverError } from '@/lib/server/http';

export async function POST(req: NextRequest) {
  const r = await readBody(req);
  if (!r.ok) return r.res;
  try {
    await endSession(req.cookies.get(SESSION_COOKIE)?.value);
    return clearSessionCookie(json({ ok: true }));
  } catch (e) {
    return serverError(e);
  }
}
