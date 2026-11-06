'use client';

import { useEffect, useState } from 'react';
import type { City } from './cities';
import type { BirthProfile } from './profile';

/**
 * Birth profiles in a page address, so a compatibility result or report can be shared and reloaded.
 * One person: n, d, t, c. Two people: the same keys with an "a" or "b" in front (an, ad, at, ac).
 */
export function profileParams(p: BirthProfile, prefix = ''): Record<string, string> {
  const q: Record<string, string> = { [`${prefix}n`]: p.name, [`${prefix}d`]: p.date, [`${prefix}c`]: String(p.city.id) };
  if (p.time) q[`${prefix}t`] = p.time;
  return q;
}

export const pairQuery = (a: BirthProfile, b: BirthProfile) => new URLSearchParams({ ...profileParams(a, 'a'), ...profileParams(b, 'b') }).toString();

const cityCache = new Map<number, City>();

/** Looks a city up by its GeoNames id, trying again on a hiccup. */
export async function cityById(id: number): Promise<City | null> {
  if (cityCache.has(id)) return cityCache.get(id)!;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(`/api/cities?id=${id}`);
      if (res.status === 404) return null;
      if (res.ok) {
        const city = (await res.json()) as City;
        cityCache.set(id, city);
        return city;
      }
    } catch {
      // try again
    }
    await new Promise((r) => setTimeout(r, 300 * 2 ** attempt));
  }
  return null;
}

/** Reads one person from the address (with an optional prefix). Null while loading, 'none' if absent, 'error' if unreadable. */
export function useProfileParam(params: URLSearchParams, prefix = ''): BirthProfile | null | 'none' | 'error' {
  const d = params.get(`${prefix}d`);
  const c = params.get(`${prefix}c`);
  const n = params.get(`${prefix}n`);
  const t = params.get(`${prefix}t`);
  const [state, setState] = useState<BirthProfile | null | 'none' | 'error'>(d && c ? null : 'none');
  useEffect(() => {
    if (!d || !c) return setState('none');
    if (!/^-?\d{1,4}-\d{2}-\d{2}$/.test(d) || (t && !/^\d{2}:\d{2}$/.test(t))) return setState('error');
    let cancelled = false;
    setState(null);
    cityById(Number(c)).then((city) => {
      if (cancelled) return;
      setState(city ? { name: n || 'Someone', date: d, time: t || null, city } : 'error');
    });
    return () => {
      cancelled = true;
    };
  }, [d, c, n, t]);
  return state;
}
