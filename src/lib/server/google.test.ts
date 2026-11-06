import { NextRequest } from 'next/server';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { checkClaims, decodeState, encodeState, safeNext, startGoogle } from './google';

const CLIENT = 'test-client.apps.googleusercontent.com';
const now = 1_800_000_000;
const good = { iss: 'https://accounts.google.com', aud: CLIENT, exp: now + 600, nonce: 'n1', sub: '1234567890', email: 'Ada@Example.com', email_verified: true };

describe('Google sign-in checks', () => {
  beforeAll(() => {
    process.env.GOOGLE_CLIENT_ID = CLIENT;
    process.env.GOOGLE_CLIENT_SECRET = 'secret';
    process.env.SITE_URL = 'https://astro.test';
  });

  it('accepts a good ID token and refuses each broken claim', () => {
    expect(checkClaims(good, 'n1', now)).toEqual({ ok: true, sub: '1234567890', email: 'ada@example.com' });
    expect(checkClaims({ ...good, iss: 'https://evil.example' }, 'n1', now)).toMatchObject({ ok: false, why: 'issuer' });
    expect(checkClaims({ ...good, aud: 'someone-else' }, 'n1', now)).toMatchObject({ ok: false, why: 'audience' });
    expect(checkClaims({ ...good, exp: now - 3600 }, 'n1', now)).toMatchObject({ ok: false, why: 'expired' });
    expect(checkClaims(good, 'other nonce', now)).toMatchObject({ ok: false, why: 'nonce' });
    expect(checkClaims({ ...good, email_verified: false }, 'n1', now)).toMatchObject({ ok: false, why: 'email' });
  });

  it('builds the Google link with state, PKCE and nonce', () => {
    const { url, saved } = startGoogle('/chart?n=Ada');
    const u = new URL(url);
    expect(u.origin + u.pathname).toBe('https://accounts.google.com/o/oauth2/v2/auth');
    expect(u.searchParams.get('redirect_uri')).toBe('https://astro.test/api/auth/google/callback');
    expect(u.searchParams.get('state')).toBe(saved.state);
    expect(u.searchParams.get('nonce')).toBe(saved.nonce);
    expect(u.searchParams.get('code_challenge_method')).toBe('S256');
    expect(u.searchParams.get('code_challenge')).not.toBe(saved.verifier);
    expect(decodeState(encodeState(saved))).toEqual(saved);
  });

  it('only returns to our own pages', () => {
    expect(safeNext('/chart?n=1')).toBe('/chart?n=1');
    for (const bad of ['https://evil.example', '//evil.example', '/\\evil.example', 'javascript:alert(1)', 42]) expect(safeNext(bad)).toBe('/account');
  });
});

/** The whole round trip against a real database, with Google's token endpoint faked. Needs TEST_DATABASE_URL. */
const url = process.env.TEST_DATABASE_URL;
(url ? describe : describe.skip)('Google sign-in round trip', () => {
  let db: typeof import('./db');
  let start: { GET: (r: NextRequest) => Response };
  let callback: { GET: (r: NextRequest) => Promise<Response> };
  let me: { GET: (r: NextRequest) => Promise<Response> };
  let signup: { POST: (r: NextRequest) => Promise<Response> };
  let password: { POST: (r: NextRequest) => Promise<Response> };
  let del: { POST: (r: NextRequest) => Promise<Response> };
  let nextClaims: Record<string, unknown> = {};
  const realFetch = globalThis.fetch;

  beforeAll(async () => {
    process.env.DATABASE_URL = url;
    db = await import('./db');
    (await import('./auth')).resetRateLimits();
    start = await import('@/app/api/auth/google/route');
    callback = await import('@/app/api/auth/google/callback/route');
    me = await import('@/app/api/auth/me/route');
    signup = await import('@/app/api/auth/signup/route');
    password = await import('@/app/api/auth/password/route');
    del = await import('@/app/api/auth/delete/route');
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input) !== 'https://oauth2.googleapis.com/token') throw new Error(`unexpected fetch ${input}`);
      const part = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url');
      return new Response(JSON.stringify({ id_token: `${part({ alg: 'RS256' })}.${part(nextClaims)}.sig` }), { status: 200 });
    }) as typeof fetch;
  });
  afterAll(async () => {
    globalThis.fetch = realFetch;
    await db?.closeDb();
  });
  beforeEach(async () => {
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of ['sessions', 'password_resets', 'profiles', 'users']) await db.query(`DELETE FROM ${t}`);
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  const cookieOf = (res: Response, name: string) => res.headers.getSetCookie().find((c) => c.startsWith(`${name}=`))?.split(';')[0] ?? '';
  const get = (path: string, cookie = '') => new NextRequest(`https://astro.test${path}`, { headers: cookie ? { cookie } : {} });
  const post = (body: unknown, cookie: string) =>
    new NextRequest('https://astro.test/api', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://astro.test', host: 'astro.test', cookie }, body: JSON.stringify(body) });

  /** Runs the browser's trip: our start page, Google (faked), our callback. */
  async function signInWithGoogle(sub: string, email: string, tamper?: (state: string) => string, session = '') {
    const begin = start.GET(get('/api/auth/google?next=/chart'));
    const google = new URL(begin.headers.get('location')!);
    const oauth = cookieOf(begin, 'astro_oauth');
    nextClaims = { ...good, sub, email, nonce: google.searchParams.get('nonce') };
    const state = tamper ? tamper(google.searchParams.get('state')!) : google.searchParams.get('state')!;
    return callback.GET(get(`/api/auth/google/callback?code=abc&state=${state}`, [oauth, session].filter(Boolean).join('; ')));
  }

  it('connects Google to the signed-in account, and refuses one already used elsewhere', async () => {
    const res = await signup.POST(post({ email: 'me@example.com', password: 'correct horse' }, ''));
    const session = cookieOf(res, 'astro_session');
    await signInWithGoogle('g-9', 'different@gmail.com', undefined, session);
    const who = await (await me.GET(get('/api/auth/me', session))).json();
    expect(who.user).toEqual({ email: 'me@example.com', hasPassword: true, hasGoogle: true });
    expect(await db.query<unknown[]>('SELECT id FROM users')).toHaveLength(1);

    await signInWithGoogle('g-10', 'taken@example.com');
    const second = cookieOf(await signup.POST(post({ email: 'two@example.com', password: 'correct horse' }, '')), 'astro_session');
    const clash = await signInWithGoogle('g-10', 'taken@example.com', undefined, second);
    expect(clash.headers.get('location')).toBe('https://astro.test/account/settings?error=google_taken');
  });

  it('creates an account, signs in, and comes back to the same account', async () => {
    const first = await signInWithGoogle('g-1', 'new@example.com');
    expect(first.headers.get('location')).toBe('https://astro.test/chart');
    const session = cookieOf(first, 'astro_session');
    const who = await (await me.GET(get('/api/auth/me', session))).json();
    expect(who.user).toEqual({ email: 'new@example.com', hasPassword: false, hasGoogle: true });

    await signInWithGoogle('g-1', 'new@example.com');
    expect(await db.query<unknown[]>('SELECT id FROM users')).toHaveLength(1);
  });

  it('links Google to an existing account with the same email', async () => {
    await signup.POST(post({ email: 'ada@example.com', password: 'correct horse' }, ''));
    const res = await signInWithGoogle('g-2', 'Ada@Example.com');
    const who = await (await me.GET(get('/api/auth/me', cookieOf(res, 'astro_session')))).json();
    expect(who.user).toEqual({ email: 'ada@example.com', hasPassword: true, hasGoogle: true });
    expect(await db.query<unknown[]>('SELECT id FROM users')).toHaveLength(1);
  });

  it('refuses a wrong state', async () => {
    const res = await signInWithGoogle('g-3', 'x@example.com', () => 'forged');
    expect(res.headers.get('location')).toBe('https://astro.test/account?error=google_failed');
    expect(cookieOf(res, 'astro_session')).toBe('');
  });

  it('lets a Google-only account set a password and delete itself by typing its email', async () => {
    const session = cookieOf(await signInWithGoogle('g-4', 'solo@example.com'), 'astro_session');
    const set = await password.POST(post({ next: 'brand new pass' }, session));
    expect(set.status).toBe(200);
    const fresh = cookieOf(set, 'astro_session');
    expect((await (await me.GET(get('/api/auth/me', fresh))).json()).user.hasPassword).toBe(true);
    expect((await del.POST(post({ password: 'brand new pass' }, fresh))).status).toBe(200);

    const other = cookieOf(await signInWithGoogle('g-5', 'solo2@example.com'), 'astro_session');
    expect((await del.POST(post({ confirm: 'wrong@example.com' }, other))).status).toBe(400);
    expect((await del.POST(post({ confirm: 'solo2@example.com' }, other))).status).toBe(200);
  });
});
