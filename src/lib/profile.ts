import type { City } from './cities';

export type BirthProfile = {
  name: string;
  date: string; // YYYY-MM-DD
  time: string | null; // HH:MM or null when unknown
  city: City;
};

const KEY = 'astronomads.profile.v1';

/** Saved on this device until accounts arrive. */
export function loadProfile(): BirthProfile | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BirthProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: BirthProfile): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    return true;
  } catch {
    return false;
  }
}

export function profileToQuery(p: BirthProfile): string {
  const q = new URLSearchParams({ n: p.name, d: p.date, c: String(p.city.id) });
  if (p.time) q.set('t', p.time);
  return q.toString();
}

/** Example chart shown before anyone enters their own details. Clearly labelled as an example. */
export const EXAMPLE_PROFILE: BirthProfile = {
  name: 'Nova (example)',
  date: '1996-03-20',
  time: '06:40',
  city: { id: 2267057, name: 'Lisbon', region: 'Lisbon', country: 'Portugal', lat: 38.7251, lon: -9.1498, timeZone: 'Europe/Lisbon', population: 517802 },
};
