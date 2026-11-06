import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { query } from './db';

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number, opts: { N: number; r: number; p: number; maxmem: number }) => Promise<Buffer>;

export const SESSION_COOKIE = 'astro_session';
export const SESSION_DAYS = 30;
const RESET_MINUTES = 60;
const SCRYPT = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

export type User = { id: number; email: string };

/* ---------- Validation ---------- */

export const normalizeEmail = (e: unknown) => (typeof e === 'string' ? e.trim().toLowerCase() : '');
export const validEmail = (e: string) => e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
/** At least 8 characters; capped so hashing stays fast. */
export const validPassword = (p: unknown): p is string => typeof p === 'string' && p.length >= 8 && p.length <= 200;

/* ---------- Passwords ---------- */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64, SCRYPT);
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [kind, n, r, p, salt, hash] = stored.split('$');
  if (kind !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'base64');
  const key = await scrypt(password, Buffer.from(salt, 'base64'), expected.length, { N: Number(n), r: Number(r), p: Number(p), maxmem: SCRYPT.maxmem });
  return key.length === expected.length && timingSafeEqual(key, expected);
}

/** A stored hash to compare against when the email is unknown, so both paths take the same time. */
let decoy: Promise<string> | null = null;
export const decoyHash = () => (decoy ??= hashPassword(randomBytes(16).toString('hex')));

/* ---------- Tokens and sessions ---------- */

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');
const newToken = () => randomBytes(32).toString('base64url');
const sqlDate = (d: Date) => d.toISOString().slice(0, 19).replace('T', ' ');

/** Creates a session and returns the raw token for the cookie. Only its hash is stored. */
export async function createSession(userId: number): Promise<{ token: string; expires: Date }> {
  const token = newToken();
  const expires = new Date(Date.now() + SESSION_DAYS * 86400_000);
  await query('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)', [sha256(token), userId, sqlDate(expires)]);
  // Housekeeping: clear this user's expired sessions.
  await query('DELETE FROM sessions WHERE user_id = ? AND expires_at < UTC_TIMESTAMP()', [userId]);
  return { token, expires };
}

export async function userFromSession(token: string | undefined): Promise<User | null> {
  if (!token || token.length > 100) return null;
  const rows = await query<User[]>(
    'SELECT u.id, u.email FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP()',
    [sha256(token)],
  );
  return rows[0] ?? null;
}

export async function endSession(token: string | undefined): Promise<void> {
  if (token) await query('DELETE FROM sessions WHERE token_hash = ?', [sha256(token)]);
}

export async function endAllSessions(userId: number): Promise<void> {
  await query('DELETE FROM sessions WHERE user_id = ?', [userId]);
}

/* ---------- Password resets ---------- */

export async function createResetToken(userId: number): Promise<string> {
  const token = newToken();
  await query('DELETE FROM password_resets WHERE user_id = ?', [userId]);
  await query('INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)', [
    sha256(token),
    userId,
    sqlDate(new Date(Date.now() + RESET_MINUTES * 60_000)),
  ]);
  return token;
}

/** Uses up a reset token and returns its user, or null when it is wrong, used or expired. */
export async function consumeResetToken(token: unknown): Promise<number | null> {
  if (typeof token !== 'string' || token.length > 100) return null;
  const hash = sha256(token);
  // One atomic update, so a link can be used once even if it is clicked twice at the same moment.
  const res = await query<{ affectedRows: number }>('UPDATE password_resets SET used = 1 WHERE token_hash = ? AND used = 0 AND expires_at > UTC_TIMESTAMP()', [hash]);
  if (!res.affectedRows) return null;
  const rows = await query<{ user_id: number }[]>('SELECT user_id FROM password_resets WHERE token_hash = ?', [hash]);
  return rows[0]?.user_id ?? null;
}

/* ---------- Rate limits (per server process) ---------- */

const hits = new Map<string, number[]>();

/** True when this key has had fewer than `max` attempts in the last `windowMs`; records the attempt. */
export function allow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) for (const [k, v] of hits) if (v.every((t) => now - t > windowMs)) hits.delete(k);
  return true;
}

export function resetRateLimits(): void {
  hits.clear();
}
