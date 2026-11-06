import { NextResponse, type NextRequest } from 'next/server';
import { allow } from '@/lib/server/auth';
import { dbConfigured } from '@/lib/server/db';
import { OAUTH_COOKIE, encodeState, googleConfigured, siteUrl, startGoogle } from '@/lib/server/google';
import { clientIp } from '@/lib/server/http';

/** Sends the browser to Google's sign-in page. */
export function GET(req: NextRequest) {
  const back = (error: string) => NextResponse.redirect(new URL(`/account?error=${error}`, siteUrl()));
  if (!dbConfigured() || !googleConfigured()) return back('google_off');
  if (!allow(`google:${clientIp(req)}`, 30, 900_000)) return back('google_busy');
  const { url, saved } = startGoogle(req.nextUrl.searchParams.get('next'));
  const res = NextResponse.redirect(url);
  // Lax so it comes back with Google's redirect; httpOnly so pages can't read it; gone after 10 minutes.
  res.cookies.set(OAUTH_COOKIE, encodeState(saved), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/auth/google',
    maxAge: 600,
  });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}
