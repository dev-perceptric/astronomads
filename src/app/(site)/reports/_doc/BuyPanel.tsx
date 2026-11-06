'use client';

import { useEffect, useState } from 'react';
import { api, profileBody, useAccount } from '@/lib/account';
import { PRODUCTS, price, type ProductKey } from '@/lib/reports/products';
import type { BirthProfile } from '@/lib/profile';
import s from './reports.module.css';

/** Price, what's inside, an email field when signed out, and the button to Stripe's checkout. */
export default function BuyPanel({ product, people, back, includes }: { product: ProductKey; people: BirthProfile[]; back: string; includes: string[] }) {
  const p = PRODUCTS[product];
  const account = useAccount();
  const [onSale, setOnSale] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ enabled: boolean }>('/api/checkout').then((r) => setOnSale(r.ok && r.data.enabled));
  }, []);

  const buy = async () => {
    setBusy(true);
    setError('');
    const r = await api<{ url: string }>('/api/checkout', 'POST', { product, people: people.map(profileBody), email: account.status === 'in' ? undefined : email, back });
    if (!r.ok || !r.data.url) {
      setBusy(false);
      return setError(r.ok ? 'Checkout could not start. Try again.' : r.error);
    }
    window.location.href = r.data.url;
  };

  return (
    <aside className={s.buy}>
      <p className="nm-label">{p.name}</p>
      <p className={s.price}>{price(p)}</p>
      <ul className={s.includes}>
        {includes.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      {onSale === false ? (
        <p className={s.soon}>On sale very soon.</p>
      ) : (
        <>
          {account.status !== 'in' && (
            <div className="field">
              <label htmlFor="buy-email">Email for your report link</label>
              <input id="buy-email" className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className={`nm-btn nm-btn-primary ${s.buyBtn}`} onClick={buy} disabled={busy || onSale === null}>
            {busy ? 'Opening checkout…' : `Get it for ${price(p)}`}
          </button>
          <p className={s.fine}>Secure payment by Stripe. Yours to keep as a page and a PDF, with the link sent to your email.</p>
        </>
      )}
    </aside>
  );
}
