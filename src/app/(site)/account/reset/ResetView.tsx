'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/lib/account';
import s from '../account.module.css';

export default function ResetView() {
  const token = useSearchParams().get('token') ?? '';
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== again) return setError('The two passwords don’t match.');
    setBusy(true);
    const r = await api('/api/auth/reset', 'POST', { token, password });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    router.push('/account');
  };

  return (
    <section className={`nm-section nm-void ${s.hero}`}>
      <div className={`nm-bracket ${s.heroFrame}`}>
        <div className={s.heroText}>
          <p className="nm-label">Account</p>
          <h1 className={s.heroTitle}>Choose a new password</h1>
        </div>
        {token ? (
          <form className={`nm-marble ${s.panel} ${s.brandForm}`} onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="rs-new">New password</label>
              <input id="rs-new" className="input" type="password" autoComplete="new-password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
              <span className={s.hint}>At least 8 characters</span>
            </div>
            <div className="field">
              <label htmlFor="rs-again">New password again</label>
              <input id="rs-again" className="input" type="password" autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} />
            </div>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? 'One moment…' : 'Save new password'}
            </button>
          </form>
        ) : (
          <div className={`nm-marble ${s.panel}`}>
            <p className={s.note}>This link is missing its code. Ask for a new reset link.</p>
            <Link href="/account" className="nm-btn nm-btn-primary">
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
