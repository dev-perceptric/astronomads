import { NextResponse, type NextRequest } from 'next/server';
import { createSession } from '@/lib/server/auth';
import { dbConfigured } from '@/lib/server/db';
import { OAUTH_COOKIE, decodeState, finishGoogle, googleConfigured, siteUrl, userForGoogle } from '@/lib/server/google';
import { query } from '@/lib/server/db';
import { currentUser, setSessionCookie } from '@/lib/server/http';

/** Google sends the browser back here with a code. Checks it, signs the person in, and goes on. */
export async function GET(req: NextRequest) {
  const saved = decodeState(req.cookies.get(OAUTH_COOKIE)?.value);
  const go = (path: string) => {
    const res = NextResponse.redirect(new URL(path, siteUrl()));
    res.cookies.set(OAUTH_COOKIE, '', { path: '/api/auth/google', maxAge: 0 });
    res.headers.set('Cache-Control', 'no-store');
    return res;
  };
  if (!dbConfigured() || !googleConfigured()) return go('/account?error=google_off');

  const p = req.nextUrl.searchParams;
  if (p.get('error')) return go('/account?error=google_cancelled');
  const code = p.get('code');
  if (!saved || !code || p.get('state') !== saved.state) return go('/account?error=google_failed');

  try {
    const who = await finishGoogle(code, saved);
    if (!who.ok) {
      console.error('[accounts] Google sign-in refused:', who.why);
      return go('/account?error=google_failed');
    }
    // Already signed in: this connects Google to the current account (from Settings).
    const signedIn = await currentUser(req);
    if (signedIn) {
      const owner = await query<{ id: number }[]>('SELECT id FROM users WHERE google_sub = ?', [who.sub]);
      if (owner[0] && owner[0].id !== signedIn.id) return go('/account/settings?error=google_taken');
      await query('UPDATE users SET google_sub = ? WHERE id = ?', [who.sub, signedIn.id]);
      return go(saved.next);
    }
    const userId = await userForGoogle(who.sub, who.email);
    const { token, expires } = await createSession(userId);
    return setSessionCookie(go(saved.next), token, expires);
  } catch (e) {
    console.error('[accounts] Google sign-in failed:', e);
    return go('/account?error=google_failed');
  }
}
