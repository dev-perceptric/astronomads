'use client';

import { useEffect, useMemo, useState } from 'react';
import { computeChart, type Chart } from '@/lib/astro/chart';
import type { City } from '@/lib/cities';
import { EXAMPLE_PROFILE, loadProfile, type BirthProfile } from '@/lib/profile';

type State = { profile: BirthProfile; isExample: boolean; isSaved: boolean } | { error: string } | null;

/** Reads the chart from the address (?n,d,t,c), else the saved chart, else the example. */
export function useProfileFromUrl(params: URLSearchParams): State {
  const [state, setState] = useState<State>(null);
  const key = params.toString();

  useEffect(() => {
    let cancelled = false;
    const saved = loadProfile();
    const d = params.get('d');
    const c = params.get('c');
    if (!d || !c) {
      setState(saved ? { profile: saved, isExample: false, isSaved: true } : { profile: EXAMPLE_PROFILE, isExample: true, isSaved: false });
      return;
    }
    const build = (city: City): BirthProfile => ({ name: params.get('n') || 'Me', date: d, time: params.get('t'), city });
    if (saved && String(saved.city.id) === c) {
      const p = build(saved.city);
      const same = saved.date === p.date && saved.time === p.time && saved.name === p.name;
      setState({ profile: p, isExample: false, isSaved: same });
      return;
    }
    (async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(`/api/cities?id=${encodeURIComponent(c)}`);
          if (res.status === 404) throw new Error('missing');
          if (!res.ok) throw new Error(String(res.status));
          const city = (await res.json()) as City;
          if (!cancelled) setState({ profile: build(city), isExample: false, isSaved: false });
          return;
        } catch (e) {
          if ((e as Error).message === 'missing') break;
          await new Promise((r) => setTimeout(r, 300 * 2 ** attempt));
        }
      }
      if (!cancelled) setState({ error: 'This chart’s birth city couldn’t be found. Draw it again from the start page.' });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export function useChart(profile: BirthProfile | null): Chart | null {
  return useMemo(() => {
    if (!profile) return null;
    try {
      return computeChart({ date: profile.date, time: profile.time, lat: profile.city.lat, lon: profile.city.lon, timeZone: profile.city.timeZone });
    } catch {
      return null;
    }
  }, [profile]);
}
