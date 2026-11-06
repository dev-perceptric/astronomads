import { cityById, type City } from '@/lib/cities';
import { query, transaction } from './db';

export const MAX_PROFILES = 200;

export type StoredProfile = {
  id: number;
  name: string;
  date: string;
  time: string | null;
  city: City;
  createdAt: string;
};

export type ProfileInput = { name: string; date: string; time: string | null; cityId: number };

type Row = { id: number; name: string; birth_date: string; birth_time: string | null; city_id: number; city_name: string; created_at: string };

/** Checks a birth profile from the browser. Returns the clean input, or an error line for the person. */
export function parseProfile(body: unknown): { ok: true; value: ProfileInput } | { ok: false; error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === 'string' ? b.name.trim().replace(/\s+/g, ' ') : '';
  if (!name || name.length > 80) return { ok: false, error: 'Add a name of up to 80 characters.' };
  const date = typeof b.date === 'string' ? b.date : '';
  const m = /^(-?\d{1,4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m) return { ok: false, error: 'Check the birth date.' };
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const probe = new Date(Date.UTC(2000, mo - 1, d));
  if (y < 1 || y > 2200 || mo < 1 || mo > 12 || probe.getUTCMonth() !== mo - 1) return { ok: false, error: 'Check the birth date.' };
  const time = b.time === null || b.time === undefined || b.time === '' ? null : typeof b.time === 'string' ? b.time : '';
  if (time !== null && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return { ok: false, error: 'Check the birth time.' };
  const cityId = Number(b.cityId);
  if (!Number.isInteger(cityId) || !cityById(cityId)) return { ok: false, error: 'Pick a birth city from the list.' };
  return { ok: true, value: { name, date: `${String(y).padStart(4, '0')}-${m[2]}-${m[3]}`, time, cityId } };
}

const toProfile = (r: Row): StoredProfile | null => {
  const city = cityById(r.city_id);
  if (!city) return null;
  return { id: r.id, name: r.name, date: r.birth_date, time: r.birth_time, city, createdAt: r.created_at };
};

const cityLabel = (c: City) => [c.name, c.country].join(', ');

export async function listProfiles(userId: number): Promise<StoredProfile[]> {
  const rows = await query<Row[]>(
    'SELECT id, name, birth_date, birth_time, city_id, city_name, created_at FROM profiles WHERE user_id = ? ORDER BY name, id',
    [userId],
  );
  return rows.map(toProfile).filter((p): p is StoredProfile => p !== null);
}

export async function countProfiles(userId: number): Promise<number> {
  const rows = await query<{ n: number }[]>('SELECT COUNT(*) AS n FROM profiles WHERE user_id = ?', [userId]);
  return Number(rows[0]?.n ?? 0);
}

/** Adds a profile unless the account already holds the maximum. Locks the user row so two saves can't pass the limit together. */
export async function addProfile(userId: number, p: ProfileInput): Promise<{ ok: true; id: number } | { ok: false; full: true }> {
  const city = cityById(p.cityId)!;
  return transaction(async (conn) => {
    await conn.query('SELECT id FROM users WHERE id = ? FOR UPDATE', [userId]);
    const [count] = await conn.query('SELECT COUNT(*) AS n FROM profiles WHERE user_id = ?', [userId]);
    if (Number((count as { n: number }[])[0].n) >= MAX_PROFILES) return { ok: false as const, full: true as const };
    const [res] = await conn.query(
      'INSERT INTO profiles (user_id, name, birth_date, birth_time, city_id, city_name) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, p.name, p.date, p.time, p.cityId, cityLabel(city)],
    );
    return { ok: true as const, id: (res as { insertId: number }).insertId };
  });
}

export async function updateProfile(userId: number, id: number, p: ProfileInput): Promise<boolean> {
  const city = cityById(p.cityId)!;
  const res = await query<{ affectedRows: number }>(
    'UPDATE profiles SET name = ?, birth_date = ?, birth_time = ?, city_id = ?, city_name = ? WHERE id = ? AND user_id = ?',
    [p.name, p.date, p.time, p.cityId, cityLabel(city), id, userId],
  );
  return res.affectedRows > 0;
}

export async function deleteProfile(userId: number, id: number): Promise<boolean> {
  const res = await query<{ affectedRows: number }>('DELETE FROM profiles WHERE id = ? AND user_id = ?', [id, userId]);
  return res.affectedRows > 0;
}
