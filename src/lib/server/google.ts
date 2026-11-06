import { createHash, randomBytes } from 'node:crypto';
import { query } from './db';

/**
 * Sign in with Google, done directly with Google's OpenID Connect endpoints (no auth service).
 * The browser goes to Google with a one-time state, a PKCE challenge and a nonce; Google sends it
 * back to /api/auth/google/callback with a code, which the server trades for an ID token.
 * Configured by GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET; the redirect address comes from SITE_URL.
 */
export const googleConfigured = () => Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
export const siteUrl = () => (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
export const redirectUri = () => `${siteUrl()}/api/auth/google/callback`;

export const OAUTH_COOKIE = 'astro_oauth';
const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];

const b64url = (b: Buffer) => b.toString('base64url');
const random = () => b64url(randomBytes(32));

/** Only our own pages: a path starting with one slash. */
export const safeNext = (n: unknown) => (typeof n === 'string' && /^\/(?!\/)[^\s\\]*$/.test(n) && n.length < 300 ? n : '/account');

export type OAuthState = { state: string; verifier: string; nonce: string; next: string };

/** Where to send the browser, and what to remember in a short-lived cookie until it comes back. */
export function startGoogle(next: unknown): { url: string; saved: OAuthState } {
  const saved: OAuthState = { state: random(), verifier: random(), nonce: random(), next: safeNext(next) };
  const challenge = b64url(createHash('sha256').update(saved.verifier).digest());
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? '',
    redirect_uri: redirectUri(),
    response_type: 'code',
    scope: 'openid email profile',
    state: saved.state,
    nonce: saved.nonce,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    prompt: 'select_account',
  });
  return { url: `${AUTH_URL}?${params}`, saved };
}

export const encodeState = (s: OAuthState) => b64url(Buffer.from(JSON.stringify(s)));
export function decodeState(raw: string | undefined): OAuthState | null {
  if (!raw || raw.length > 2000) return null;
  try {
    const s = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as OAuthState;
    return typeof s.state === 'string' && typeof s.verifier === 'string' && typeof s.nonce === 'string' ? { ...s, next: safeNext(s.next) } : null;
  } catch {
    return null;
  }
}

export type GoogleClaims = { iss?: string; aud?: string | string[]; exp?: number; iat?: number; nonce?: string; sub?: string; email?: string; email_verified?: boolean | string };

/**
 * Checks the ID token's claims. The token came straight from Google's token endpoint over TLS,
 * which OpenID Connect accepts in place of checking its signature; issuer, audience, expiry,
 * nonce and a verified email are still required. Returns the person, or why it was refused.
 */
export function checkClaims(c: GoogleClaims, nonce: string, now = Date.now() / 1000): { ok: true; sub: string; email: string } | { ok: false; why: string } {
  const aud = Array.isArray(c.aud) ? c.aud : [c.aud];
  if (!c.iss || !ISSUERS.includes(c.iss)) return { ok: false, why: 'issuer' };
  if (!aud.includes(process.env.GOOGLE_CLIENT_ID)) return { ok: false, why: 'audience' };
  if (typeof c.exp !== 'number' || c.exp < now - 60) return { ok: false, why: 'expired' };
  if (c.nonce !== nonce) return { ok: false, why: 'nonce' };
  if (typeof c.sub !== 'string' || !c.sub || c.sub.length > 64) return { ok: false, why: 'subject' };
  if (typeof c.email !== 'string' || !(c.email_verified === true || c.email_verified === 'true')) return { ok: false, why: 'email' };
  return { ok: true, sub: c.sub, email: c.email.trim().toLowerCase() };
}

/** Trades the code for an ID token and checks it. */
export async function finishGoogle(code: string, saved: OAuthState): Promise<{ ok: true; sub: string; email: string } | { ok: false; why: string }> {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      redirect_uri: redirectUri(),
      grant_type: 'authorization_code',
      code_verifier: saved.verifier,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) return { ok: false, why: `token ${res.status}` };
  const body = (await res.json()) as { id_token?: string };
  const payload = body.id_token?.split('.')[1];
  if (!payload) return { ok: false, why: 'no id token' };
  let claims: GoogleClaims;
  try {
    claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  } catch {
    return { ok: false, why: 'bad id token' };
  }
  return checkClaims(claims, saved.nonce);
}

/**
 * The account for this Google person: the one already linked to them; else the account with the
 * same email (Google has verified it), which gets linked; else a new account with no password.
 */
export async function userForGoogle(sub: string, email: string): Promise<number> {
  const bySub = await query<{ id: number }[]>('SELECT id FROM users WHERE google_sub = ?', [sub]);
  if (bySub[0]) return bySub[0].id;
  const byEmail = await query<{ id: number; google_sub: string | null }[]>('SELECT id, google_sub FROM users WHERE email = ?', [email]);
  if (byEmail[0]) {
    await query('UPDATE users SET google_sub = ? WHERE id = ? AND google_sub IS NULL', [sub, byEmail[0].id]);
    return byEmail[0].id;
  }
  try {
    const res = await query<{ insertId: number }>('INSERT INTO users (email, password_hash, google_sub) VALUES (?, NULL, ?)', [email, sub]);
    return res.insertId;
  } catch (e) {
    // Two sign-ins at once: the other one created it.
    if ((e as { code?: string }).code !== 'ER_DUP_ENTRY') throw e;
    const again = await query<{ id: number }[]>('SELECT id FROM users WHERE google_sub = ? OR email = ?', [sub, email]);
    return again[0].id;
  }
}
