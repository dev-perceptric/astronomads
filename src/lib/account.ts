'use client';

import { useEffect, useState } from 'react';
import type { City } from './cities';
import type { BirthProfile } from './profile';

export type SavedProfile = { id: number; name: string; date: string; time: string | null; city: City; createdAt: string };

export type AccountState =
  | { status: 'loading' }
  | { status: 'off' } // the server has no database yet
  | { status: 'out'; google: boolean }
  | { status: 'in'; email: string; profiles: number; max: number; hasPassword: boolean; hasGoogle: boolean; google: boolean };

type Result<T> = { ok: true; data: T } | { ok: false; error: string; status: number };

/**
 * Calls our account API. A network hiccup or a busy server is tried again with growing waits;
 * what is left comes back as one short line for the person.
 */
export async function api<T = Record<string, unknown>>(path: string, method = 'GET', body?: unknown): Promise<Result<T>> {
  const waits = [400, 1200];
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(path, {
        method,
        headers: method === 'GET' ? undefined : { 'content-type': 'application/json' },
        body: method === 'GET' ? undefined : JSON.stringify(body ?? {}),
        credentials: 'same-origin',
        cache: 'no-store',
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) return { ok: true, data: data as T };
      const retry = res.status >= 500 && res.status !== 503 && attempt < waits.length;
      if (!retry) return { ok: false, error: (data as { error?: string }).error ?? 'Something went wrong. Try again.', status: res.status };
    } catch {
      if (attempt >= waits.length) return { ok: false, error: 'You seem to be offline. Check your connection and try again.', status: 0 };
    }
    await new Promise((r) => setTimeout(r, waits[attempt]));
  }
}

/* One shared account state for the whole page, so the header and the account pages always agree. */
let current: AccountState = { status: 'loading' };
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

/** Asks the server who is signed in and tells every component that uses `useAccount`. */
export function refreshAccount(): Promise<void> {
  type Me = { enabled: boolean; google?: boolean; user: { email: string; hasPassword?: boolean; hasGoogle?: boolean } | null; profiles?: number; max?: number };
  inflight ??= api<Me>('/api/auth/me')
    .then((r) => {
      const google = r.ok && Boolean(r.data.google);
      if (!r.ok) current = { status: 'out', google: false };
      else if (!r.data.enabled) current = { status: 'off' };
      else if (!r.data.user) current = { status: 'out', google };
      else
        current = {
          status: 'in',
          email: r.data.user.email,
          profiles: r.data.profiles ?? 0,
          max: r.data.max ?? 200,
          hasPassword: r.data.user.hasPassword !== false,
          hasGoogle: Boolean(r.data.user.hasGoogle),
          google,
        };
      listeners.forEach((l) => l());
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function useAccount(): AccountState & { refresh: () => Promise<void> } {
  const [state, setState] = useState<AccountState>(current);
  useEffect(() => {
    const update = () => setState(current);
    listeners.add(update);
    if (current.status === 'loading') refreshAccount();
    else update();
    return () => {
      listeners.delete(update);
    };
  }, []);
  return { ...state, refresh: refreshAccount };
}

/** Signs out everywhere on this page. */
export async function signOut(): Promise<void> {
  await api('/api/auth/logout', 'POST');
  await refreshAccount();
}

/** Short lines for the errors Google sign-in can come back with (?error= on the account pages). */
export const GOOGLE_ERRORS: Record<string, string> = {
  google_cancelled: 'Google sign-in was cancelled.',
  google_failed: 'Google sign-in didn’t work. Try again.',
  google_off: 'Google sign-in isn’t available yet.',
  google_busy: 'Too many tries. Wait 15 minutes and try again.',
  google_taken: 'That Google account is already linked to another Astronomads account.',
};

/** Reads ?error= once, then takes it out of the address so a refresh doesn't show it again. */
export function takeUrlError(): string {
  if (typeof window === 'undefined') return '';
  const url = new URL(window.location.href);
  const code = url.searchParams.get('error');
  if (!code) return '';
  url.searchParams.delete('error');
  window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  return GOOGLE_ERRORS[code] ?? '';
}

export const profileBody = (p: BirthProfile) => ({ name: p.name, date: p.date, time: p.time, cityId: p.city.id });
export const toBirthProfile = (p: SavedProfile): BirthProfile => ({ name: p.name, date: p.date, time: p.time, city: p.city });
