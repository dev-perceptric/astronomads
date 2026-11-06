import { NextRequest } from 'next/server';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

/**
 * Runs the real API routes against a real MySQL or MariaDB database.
 * Set TEST_DATABASE_URL (mysql://user:pass@127.0.0.1:3306/astronomads_test) to run; skipped otherwise.
 * Every table in that database is emptied, so never point it at production.
 */
const url = process.env.TEST_DATABASE_URL;
const run = url ? describe : describe.skip;

type Handler = (req: NextRequest, ctx?: { params: Promise<{ id: string }> }) => Promise<Response>;

run('accounts API', () => {
  let routes: Record<string, Record<string, Handler>>;
  let db: typeof import('./db');
  let auth: typeof import('./auth');

  beforeAll(async () => {
    process.env.DATABASE_URL = url;
    db = await import('./db');
    auth = await import('./auth');
    routes = {
      signup: await import('@/app/api/auth/signup/route'),
      login: await import('@/app/api/auth/login/route'),
      logout: await import('@/app/api/auth/logout/route'),
      me: await import('@/app/api/auth/me/route'),
      reset: await import('@/app/api/auth/reset/route'),
      password: await import('@/app/api/auth/password/route'),
      del: await import('@/app/api/auth/delete/route'),
      profiles: await import('@/app/api/profiles/route'),
      profile: await import('@/app/api/profiles/[id]/route'),
    } as unknown as Record<string, Record<string, Handler>>;
  });

  beforeEach(async () => {
    auth.resetRateLimits();
    await db.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const t of ['sessions', 'password_resets', 'profiles', 'users']) await db.query(`DELETE FROM ${t}`);
    await db.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  afterAll(async () => {
    await db?.closeDb();
  });

  const req = (method: string, body?: unknown, cookie?: string, origin = 'http://astro.test') =>
    new NextRequest('http://astro.test/api', {
      method,
      headers: { 'content-type': 'application/json', host: 'astro.test', origin, ...(cookie ? { cookie } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  const cookieOf = (res: Response) => res.headers.get('set-cookie')?.split(';')[0] ?? '';
  const call = (r: string, method: string, body?: unknown, cookie?: string, id?: number) =>
    routes[r][method](req(method, body, cookie), id ? { params: Promise.resolve({ id: String(id) }) } : undefined);
  const lisbon = { name: 'Nova', date: '1996-03-20', time: '06:40', cityId: 2267057 };

  async function signUp(email = 'a@example.com', password = 'correct horse') {
    const res = await call('signup', 'POST', { email, password });
    expect(res.status).toBe(201);
    return cookieOf(res);
  }

  it('creates an account, signs in and out', async () => {
    const cookie = await signUp('Person@Example.com ');
    expect(cookie).toMatch(/^astro_session=/);
    const me = await (await routes.me.GET(req('GET', undefined, cookie))).json();
    expect(me).toMatchObject({ enabled: true, user: { email: 'person@example.com' }, profiles: 0, max: 200 });

    expect((await call('signup', 'POST', { email: 'person@example.com', password: 'another one' })).status).toBe(409);
    expect((await call('login', 'POST', { email: 'person@example.com', password: 'wrong pass' })).status).toBe(401);
    expect((await call('login', 'POST', { email: 'nobody@example.com', password: 'wrong pass' })).status).toBe(401);
    const login = await call('login', 'POST', { email: 'PERSON@example.com', password: 'correct horse' });
    expect(login.status).toBe(200);

    await call('logout', 'POST', {}, cookie);
    const after = await (await routes.me.GET(req('GET', undefined, cookie))).json();
    expect(after.user).toBeNull();
  });

  it('rejects weak input, other sites and too many tries', async () => {
    expect((await call('signup', 'POST', { email: 'not-an-email', password: 'correct horse' })).status).toBe(400);
    expect((await call('signup', 'POST', { email: 'b@example.com', password: 'short' })).status).toBe(400);
    const cross = await routes.signup.POST(req('POST', { email: 'c@example.com', password: 'correct horse' }, undefined, 'https://evil.example'));
    expect(cross.status).toBe(403);
    await signUp('d@example.com');
    let last = 0;
    for (let i = 0; i < 11; i++) last = (await call('login', 'POST', { email: 'd@example.com', password: 'wrong pass' })).status;
    expect(last).toBe(429);
  });

  it('stores profiles, keeps them private, and stops at 200', async () => {
    const a = await signUp('a@example.com');
    const b = await signUp('b@example.com');
    const created = await call('profiles', 'POST', lisbon, a);
    expect(created.status).toBe(201);
    const { id } = await created.json();

    expect((await call('profiles', 'POST', { ...lisbon, cityId: 1 }, a)).status).toBe(400);
    expect((await call('profiles', 'POST', { ...lisbon, date: '1996-02-30' }, a)).status).toBe(400);
    expect((await call('profiles', 'POST', { ...lisbon, time: '25:00' }, a)).status).toBe(400);
    expect((await call('profiles', 'POST', { ...lisbon, time: null }, a)).status).toBe(201);
    expect((await call('profiles', 'POST', lisbon)).status).toBe(401);

    const list = await (await routes.profiles.GET(req('GET', undefined, a))).json();
    expect(list.profiles).toHaveLength(2);
    expect(list.profiles[0]).toMatchObject({ name: 'Nova', date: '1996-03-20', city: { id: 2267057, timeZone: 'Europe/Lisbon' } });
    expect((await (await routes.profiles.GET(req('GET', undefined, b))).json()).profiles).toHaveLength(0);

    // Another account can neither change nor delete it.
    expect((await call('profile', 'PATCH', { ...lisbon, name: 'Taken' }, b, id)).status).toBe(404);
    expect((await call('profile', 'DELETE', {}, b, id)).status).toBe(404);
    expect((await call('profile', 'PATCH', { ...lisbon, name: 'Nova Renamed' }, a, id)).status).toBe(200);
    expect((await call('profile', 'DELETE', {}, a, id)).status).toBe(200);

    // One profile is left. Fill to 199, then save two at once: one fits, the other is refused.
    const user = (await db.query<{ id: number }[]>('SELECT id FROM users WHERE email = ?', ['a@example.com']))[0];
    const values = Array.from({ length: 198 }, (_, i) => [user.id, `P${i}`, '2000-01-01', null, 2267057, 'Lisbon, Portugal']);
    await db.query('INSERT INTO profiles (user_id, name, birth_date, birth_time, city_id, city_name) VALUES ?', [values]);
    const both = await Promise.all([call('profiles', 'POST', lisbon, a), call('profiles', 'POST', lisbon, a)]);
    expect(both.map((r) => r.status).sort()).toEqual([201, 409]);
    expect((await call('profiles', 'POST', lisbon, a)).status).toBe(409);
    const count = await (await routes.me.GET(req('GET', undefined, a))).json();
    expect(count.profiles).toBe(200);
  });

  it('resets a password once, and signs out old sessions', async () => {
    const old = await signUp('r@example.com', 'first password');
    const user = (await db.query<{ id: number }[]>('SELECT id FROM users WHERE email = ?', ['r@example.com']))[0];
    const token = await auth.createResetToken(user.id);
    const res = await call('reset', 'POST', { token, password: 'second password' });
    expect(res.status).toBe(200);
    expect((await call('reset', 'POST', { token, password: 'third password' })).status).toBe(400);
    expect((await (await routes.me.GET(req('GET', undefined, old))).json()).user).toBeNull();
    expect((await call('login', 'POST', { email: 'r@example.com', password: 'second password' })).status).toBe(200);
  });

  it('changes the password and deletes the account with its profiles', async () => {
    let cookie = await signUp('z@example.com', 'first password');
    await call('profiles', 'POST', lisbon, cookie);
    expect((await call('password', 'POST', { current: 'nope nope', next: 'second password' }, cookie)).status).toBe(401);
    const changed = await call('password', 'POST', { current: 'first password', next: 'second password' }, cookie);
    expect(changed.status).toBe(200);
    cookie = cookieOf(changed);
    expect((await call('del', 'POST', { password: 'first password' }, cookie)).status).toBe(401);
    expect((await call('del', 'POST', { password: 'second password' }, cookie)).status).toBe(200);
    expect(await db.query<unknown[]>('SELECT * FROM profiles')).toHaveLength(0);
    expect(await db.query<unknown[]>('SELECT * FROM sessions')).toHaveLength(0);
  });
});
