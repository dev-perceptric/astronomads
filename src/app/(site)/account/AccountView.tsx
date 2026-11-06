'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BirthForm from '@/components/BirthForm';
import Stipple from '@/components/Stipple';
import { api, profileBody, takeUrlError, toBirthProfile, useAccount, type SavedProfile } from '@/lib/account';
import { loadProfile, profileToQuery, type BirthProfile } from '@/lib/profile';
import s from './account.module.css';

const dateLabel = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(2000, m - 1, d));
  dt.setUTCFullYear(y);
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
};
const sameProfile = (a: BirthProfile, b: SavedProfile) => a.name === b.name && a.date === b.date && a.time === b.time && a.city.id === b.city.id;

export default function AccountView() {
  const account = useAccount();
  if (account.status === 'loading') return <section className={`nm-section nm-void ${s.blank}`} />;
  if (account.status === 'off') {
    return (
      <section className={`nm-section nm-void ${s.blank}`}>
        <p className="nm-label">Account</p>
        <h1 className={s.heroTitle}>Accounts open soon</h1>
        <Link href="/#start" className="nm-btn nm-btn-primary">
          Draw a chart
        </Link>
      </section>
    );
  }
  if (account.status === 'out') return <SignIn google={account.google} onDone={account.refresh} />;
  return <Profiles max={account.max} onChange={account.refresh} />;
}

/* ---------- Signed out ---------- */

function SignIn({ google, onDone }: { google: boolean; onDone: () => void }) {
  const [mode, setMode] = useState<'in' | 'up' | 'forgot'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

  // Coming back from Google with a problem shows it here.
  useEffect(() => {
    const e = takeUrlError();
    if (e) setError(e);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setNote('');
    if (mode === 'forgot') {
      const r = await api('/api/auth/forgot', 'POST', { email });
      setBusy(false);
      if (!r.ok) return setError(r.error);
      return setNote('If that email has an account, a reset link is on its way. It works for one hour.');
    }
    const r = await api(mode === 'up' ? '/api/auth/signup' : '/api/auth/login', 'POST', { email, password });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onDone();
  };

  return (
    <section className={`nm-section nm-void ${s.hero}`}>
      <Stipple kind="field" tone="astral" className={s.field} />
      <div className={`nm-bracket ${s.heroFrame}`}>
        <div className={s.heroText}>
          <p className="nm-label">Account</p>
          <h1 className={s.heroTitle}>Every chart you love, in one place</h1>
          <p className={s.heroLine}>Save up to 200 birth profiles and open any of them in one click.</p>
        </div>
        <form className={`nm-marble ${s.panel} ${s.brandForm}`} onSubmit={submit} noValidate>
          {mode !== 'forgot' ? (
            <div className={s.tabs} role="tablist" aria-label="Account">
              {(['in', 'up'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  className={s.tab}
                  onClick={() => {
                    setMode(m);
                    setError('');
                  }}
                >
                  {m === 'in' ? 'Sign in' : 'Create account'}
                </button>
              ))}
            </div>
          ) : (
            <p className={s.panelTitle}>Reset your password</p>
          )}
          {google && mode !== 'forgot' && (
            <>
              <a className={s.google} href="/api/auth/google?next=/account">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/google-g.svg" alt="" width={18} height={18} />
                Continue with Google
              </a>
              <p className={s.or}>
                <span>or with email</span>
              </p>
            </>
          )}
          <div className="field">
            <label htmlFor="acc-email">Email</label>
            <input id="acc-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {mode !== 'forgot' && (
            <div className="field">
              <label htmlFor="acc-password">Password</label>
              <input
                id="acc-password"
                className="input"
                type="password"
                autoComplete={mode === 'up' ? 'new-password' : 'current-password'}
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {mode === 'up' && <span className={s.hint}>At least 8 characters</span>}
            </div>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {note && (
            <p className={s.note} role="status">
              {note}
            </p>
          )}
          <button className="btn btn-primary" type="submit" disabled={busy}>
            {busy ? 'One moment…' : mode === 'in' ? 'Sign in' : mode === 'up' ? 'Create account' : 'Send reset link'}
          </button>
          <button
            type="button"
            className={s.textBtn}
            onClick={() => {
              setMode(mode === 'forgot' ? 'in' : 'forgot');
              setError('');
              setNote('');
            }}
          >
            {mode === 'forgot' ? 'Back to sign in' : 'Forgot your password?'}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Signed in ---------- */

function Profiles({ max, onChange }: { max: number; onChange: () => void }) {
  const [profiles, setProfiles] = useState<SavedProfile[] | null>(null);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [confirming, setConfirming] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'name' | 'newest' | 'birth'>('name');
  const [device, setDevice] = useState<BirthProfile | null>(null);

  const load = useCallback(async () => {
    const r = await api<{ profiles: SavedProfile[] }>('/api/profiles');
    if (r.ok) setProfiles(r.data.profiles);
    else setError(r.error);
  }, []);
  useEffect(() => {
    load();
    setDevice(loadProfile());
  }, [load]);

  const changed = async () => {
    await load();
    onChange();
  };

  const shown = useMemo(() => {
    if (!profiles) return [];
    const q = search.trim().toLowerCase();
    const list = q ? profiles.filter((p) => `${p.name} ${p.city.name} ${p.city.country}`.toLowerCase().includes(q)) : [...profiles];
    if (sort === 'newest') list.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id - a.id);
    if (sort === 'birth') list.sort((a, b) => a.date.localeCompare(b.date));
    return list;
  }, [profiles, search, sort]);

  const count = profiles?.length ?? 0;
  const full = count >= max;
  const offerDevice = device && profiles && !profiles.some((p) => sameProfile(device, p)) && !full;

  const add = async (p: BirthProfile) => {
    const r = await api('/api/profiles', 'POST', profileBody(p));
    if (!r.ok) return r.error;
    setAdding(false);
    await changed();
    return null;
  };
  const save = (id: number) => async (p: BirthProfile) => {
    const r = await api(`/api/profiles/${id}`, 'PATCH', profileBody(p));
    if (!r.ok) return r.error;
    setEditing(null);
    await changed();
    return null;
  };
  const remove = async (id: number) => {
    const r = await api(`/api/profiles/${id}`, 'DELETE');
    setConfirming(null);
    if (!r.ok) return setError(r.error);
    await changed();
  };

  return (
    <>
      <section className={`nm-section nm-marble ${s.profiles}`}>
        <div className={s.head}>
          <div>
            <p className="nm-label">Account</p>
            <h1 className="nm-title">My birth profiles</h1>
            <p className={s.meta}>
              {count} of {max} saved
            </p>
          </div>
          <button className="nm-btn nm-btn-primary" onClick={() => setAdding(true)} disabled={full || adding}>
            Add a profile
          </button>
        </div>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {full && <p className={s.meta}>Your account is full. Delete a profile to add another.</p>}

        {offerDevice && device && (
          <div className={s.device}>
            <span>
              Saved on this device: <strong>{device.name}</strong>, {dateLabel(device.date)}
            </span>
            <button className="nm-btn nm-btn-outline" onClick={() => add(device).then((e) => e && setError(e))}>
              Add to my profiles
            </button>
          </div>
        )}

        {adding && (
          <div className={`${s.formWrap} ${s.brandForm}`}>
            <p className={s.panelTitle}>New profile</p>
            <BirthForm onSave={add} onCancel={() => setAdding(false)} submitLabel="Save profile" className={s.inlineForm} />
          </div>
        )}

        {profiles && profiles.length > 0 && (
          <div className={s.tools}>
            <input className={`input ${s.search}`} type="search" placeholder="Search by name or city" aria-label="Search profiles" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className={s.sort} role="group" aria-label="Sort">
              {(
                [
                  ['name', 'Name'],
                  ['newest', 'Newest'],
                  ['birth', 'Birth date'],
                ] as const
              ).map(([k, label]) => (
                <button key={k} className={s.sortBtn} aria-pressed={sort === k} onClick={() => setSort(k)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {profiles && profiles.length === 0 && !adding && (
          <div className={s.empty}>
            <p className={s.emptyTitle}>Add your first profile</p>
            <p className={s.meta}>Yours, family, friends, anyone whose chart you want close.</p>
            <button className="nm-btn nm-btn-primary" onClick={() => setAdding(true)}>
              Add a profile
            </button>
          </div>
        )}

        {profiles && profiles.length > 0 && (
          <ul className={s.list}>
            {shown.length === 0 && <li className={s.meta}>No profiles match “{search}”.</li>}
            {shown.map((p) => (
              <li key={p.id} className={s.row}>
                <div className={s.rowMain}>
                  <Link href={`/chart?${profileToQuery(toBirthProfile(p))}`} className={s.name}>
                    {p.name}
                  </Link>
                  <span className={s.details}>
                    {dateLabel(p.date)} · {p.time ?? 'Time unknown'} · {p.city.name}, {p.city.country}
                  </span>
                </div>
                {confirming === p.id ? (
                  <div className={s.actions}>
                    <span className={s.confirm}>Delete {p.name}?</span>
                    <button className={`${s.action} ${s.danger}`} onClick={() => remove(p.id)}>
                      Delete
                    </button>
                    <button className={s.action} onClick={() => setConfirming(null)}>
                      Keep
                    </button>
                  </div>
                ) : (
                  <div className={s.actions}>
                    <Link href={`/chart?${profileToQuery(toBirthProfile(p))}`} className={s.action}>
                      Open
                    </Link>
                    <button className={s.action} onClick={() => setEditing(editing === p.id ? null : p.id)} aria-expanded={editing === p.id}>
                      Edit
                    </button>
                    <button className={s.action} onClick={() => setConfirming(p.id)}>
                      Delete
                    </button>
                  </div>
                )}
                {editing === p.id && (
                  <div className={`${s.formWrap} ${s.brandForm} ${s.rowForm}`}>
                    <BirthForm initial={toBirthProfile(p)} onSave={save(p.id)} onCancel={() => setEditing(null)} submitLabel="Save changes" className={s.inlineForm} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
