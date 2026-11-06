'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import BirthForm from '@/components/BirthForm';
import Stipple from '@/components/Stipple';
import { api, profileBody, toBirthProfile, useAccount, type SavedProfile } from '@/lib/account';
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
  if (account.status === 'out') return <SignIn onDone={account.refresh} />;
  return <Profiles email={account.email} max={account.max} onChange={account.refresh} />;
}

/* ---------- Signed out ---------- */

function SignIn({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<'in' | 'up' | 'forgot'>('in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);

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

function Profiles({ email, max, onChange }: { email: string; max: number; onChange: () => void }) {
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
              {email} · {count} of {max} saved
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
      <Settings onSignedOut={onChange} />
    </>
  );
}

/* ---------- Settings ---------- */

function Settings({ onSignedOut }: { onSignedOut: () => void }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [delPassword, setDelPassword] = useState('');
  const [delError, setDelError] = useState('');

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await api('/api/auth/password', 'POST', { current, next });
    if (!r.ok) return setPwMsg({ ok: false, text: r.error });
    setCurrent('');
    setNext('');
    setPwMsg({ ok: true, text: 'Password changed. Other devices were signed out.' });
  };
  const signOut = async () => {
    await api('/api/auth/logout', 'POST');
    onSignedOut();
  };
  const deleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await api('/api/auth/delete', 'POST', { password: delPassword });
    if (!r.ok) return setDelError(r.error);
    onSignedOut();
  };

  return (
    <section className={`nm-section nm-void ${s.settings}`}>
      <p className="nm-label">Settings</p>
      <div className={s.settingsGrid}>
        <form className={`${s.setting} ${s.brandForm}`} onSubmit={changePassword}>
          <p className={s.settingTitle}>Change password</p>
          <div className="field">
            <label htmlFor="pw-current">Current password</label>
            <input id="pw-current" className="input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="pw-next">New password</label>
            <input id="pw-next" className="input" type="password" autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} />
          </div>
          {pwMsg && (
            <p className={pwMsg.ok ? s.note : 'error'} role={pwMsg.ok ? 'status' : 'alert'}>
              {pwMsg.text}
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            Change password
          </button>
        </form>

        <div className={s.setting}>
          <p className={s.settingTitle}>Sign out</p>
          <button className="nm-btn nm-btn-glass" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className={`${s.setting} ${s.brandForm}`}>
          <p className={s.settingTitle}>Delete account</p>
          {!deleting ? (
            <button className={`nm-btn nm-btn-outline ${s.dangerBtn}`} onClick={() => setDeleting(true)}>
              Delete my account
            </button>
          ) : (
            <form onSubmit={deleteAccount} className={s.deleteForm}>
              <p className={s.settingLine}>This removes your account and every saved profile for good.</p>
              <div className="field">
                <label htmlFor="del-password">Password</label>
                <input id="del-password" className="input" type="password" autoComplete="current-password" value={delPassword} onChange={(e) => setDelPassword(e.target.value)} />
              </div>
              {delError && (
                <p className="error" role="alert">
                  {delError}
                </p>
              )}
              <div className={s.actionsRow}>
                <button className={`nm-btn ${s.dangerFill}`} type="submit">
                  Delete for good
                </button>
                <button className="nm-btn nm-btn-glass" type="button" onClick={() => setDeleting(false)}>
                  Keep my account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
