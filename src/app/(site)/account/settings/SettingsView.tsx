'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { api, refreshAccount, takeUrlError, useAccount } from '@/lib/account';
import s from '../account.module.css';

/** Account settings: email, password, and deleting the account, each in its own row. */
export default function SettingsView() {
  const account = useAccount();
  const router = useRouter();

  // Visitors who arrive signed out go to sign in. Someone who signs out here is sent home by the header.
  const wasIn = useRef(false);
  if (account.status === 'in') wasIn.current = true;
  useEffect(() => {
    if ((account.status === 'out' || account.status === 'off') && !wasIn.current) router.replace('/account');
  }, [account.status, router]);

  const [error, setError] = useState('');
  useEffect(() => {
    const e = takeUrlError();
    if (e) setError(e);
  }, []);

  if (account.status !== 'in') return <section className={`nm-section nm-marble ${s.blank}`} />;

  return (
    <section className={`nm-section nm-marble ${s.settingsPage}`}>
      <Link href="/account" className={s.back}>
        ← My birth profiles
      </Link>
      <h1 className="nm-title">Settings</h1>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <div className={s.settingsList}>
        <div className={s.settingRow}>
          <div>
            <p className={s.settingTitle}>Email</p>
            <p className={s.settingLine}>{account.email}</p>
          </div>
        </div>
        {(account.google || account.hasGoogle) && (
          <div className={s.settingRow}>
            <div className={s.settingMain}>
              <p className={s.settingTitle}>Google</p>
              {account.hasGoogle ? (
                <p className={`${s.settingLine} ${s.connected}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/google-g.svg" alt="" width={14} height={14} /> Connected. You can sign in with Google.
                </p>
              ) : (
                <p className={s.settingLine}>Sign in with one click next time.</p>
              )}
            </div>
            {!account.hasGoogle && (
              <a className="nm-btn nm-btn-outline" href="/api/auth/google?next=/account/settings">
                Connect Google
              </a>
            )}
          </div>
        )}
        <PasswordRow hasPassword={account.hasPassword} onChange={refreshAccount} />
        <DeleteRow email={account.email} hasPassword={account.hasPassword} onDeleted={() => refreshAccount().then(() => router.push('/'))} />
      </div>
    </section>
  );
}

function PasswordRow({ hasPassword, onChange }: { hasPassword: boolean; onChange: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const r = await api('/api/auth/password', 'POST', { current, next });
    setBusy(false);
    if (!r.ok) return setMsg({ ok: false, text: r.error });
    setCurrent('');
    setNext('');
    setOpen(false);
    setMsg({ ok: true, text: hasPassword ? 'Password changed. Other devices were signed out.' : 'Password set. You can now sign in with email too.' });
    await onChange();
  };

  return (
    <div className={s.settingRow}>
      <div className={s.settingMain}>
        <p className={s.settingTitle}>Password</p>
        {!hasPassword && !open && !msg && <p className={s.settingLine}>You sign in with Google. Set a password to sign in with email too.</p>}
        {msg?.ok && (
          <p className={s.note} role="status">
            {msg.text}
          </p>
        )}
        {open && (
          <form className={`${s.settingForm} ${s.brandForm}`} onSubmit={submit}>
            {hasPassword && (
              <div className="field">
                <label htmlFor="pw-current">Current password</label>
                <input id="pw-current" className="input" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </div>
            )}
            <div className="field">
              <label htmlFor="pw-next">New password</label>
              <input id="pw-next" className="input" type="password" autoComplete="new-password" minLength={8} value={next} onChange={(e) => setNext(e.target.value)} />
              <span className={s.hint}>At least 8 characters</span>
            </div>
            {msg && !msg.ok && (
              <p className="error" role="alert">
                {msg.text}
              </p>
            )}
            <div className={s.actionsRow}>
              <button className="btn btn-primary" type="submit" disabled={busy}>
                {busy ? 'Saving…' : hasPassword ? 'Save new password' : 'Set password'}
              </button>
              <button className="btn" type="button" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      {!open && (
        <button
          className="nm-btn nm-btn-outline"
          onClick={() => {
            setOpen(true);
            setMsg(null);
          }}
        >
          {hasPassword ? 'Change password' : 'Set a password'}
        </button>
      )}
    </div>
  );
}

function DeleteRow({ email, hasPassword, onDeleted }: { email: string; hasPassword: boolean; onDeleted: () => void }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const r = await api('/api/auth/delete', 'POST', hasPassword ? { password } : { confirm: password });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onDeleted();
  };

  return (
    <div className={`${s.settingRow} ${s.dangerRow}`}>
      <div className={s.settingMain}>
        <p className={s.settingTitle}>Delete account</p>
        <p className={s.settingLine}>Removes your account and every saved profile for good.</p>
        {open && (
          <form className={s.settingForm} onSubmit={submit}>
            <div className="field">
              {hasPassword ? (
                <>
                  <label htmlFor="del-password">Type your password to confirm</label>
                  <input id="del-password" className="input" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
              ) : (
                <>
                  <label htmlFor="del-password">Type {email} to confirm</label>
                  <input id="del-password" className="input" type="email" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                </>
              )}
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <div className={s.actionsRow}>
              <button className={`nm-btn ${s.dangerFill}`} type="submit" disabled={busy || !password}>
                {busy ? 'Deleting…' : 'Delete for good'}
              </button>
              <button className="nm-btn nm-btn-outline" type="button" onClick={() => setOpen(false)}>
                Keep my account
              </button>
            </div>
          </form>
        )}
      </div>
      {!open && (
        <button className={`nm-btn nm-btn-outline ${s.dangerBtn}`} onClick={() => setOpen(true)}>
          Delete account
        </button>
      )}
    </div>
  );
}
