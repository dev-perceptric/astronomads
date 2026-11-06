'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/account';
import type { BirthProfile } from '@/lib/profile';
import { PRODUCTS, type ProductKey } from '@/lib/reports/products';
import PortraitDoc from '../_doc/PortraitDoc';
import SynastryDoc from '../_doc/SynastryDoc';
import s from '../_doc/reports.module.css';

type Order = { token: string; product: ProductKey; people: BirthProfile[]; status: 'pending' | 'paid'; email: string | null };

/** A paid report, opened by its secret link. Waits a moment while Stripe confirms a fresh payment. */
export default function ReportView() {
  const token = useSearchParams().get('order') ?? '';
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      const r = await api<{ order: Order }>(`/api/orders?token=${encodeURIComponent(token)}`);
      if (!r.ok) return setError(r.error);
      setOrder(r.data.order);
      if (r.data.order.status !== 'paid' && tries++ < 15) timer = setTimeout(load, 2000);
    };
    if (token) load();
    else setError('This report link is missing its code.');
    return () => clearTimeout(timer);
  }, [token]);

  if (error)
    return (
      <section className={`nm-section nm-marble ${s.wait}`}>
        <p className={s.waitTitle}>{error}</p>
        <Link href="/reports" className="nm-btn nm-btn-primary">
          See reports
        </Link>
      </section>
    );
  if (!order) return <section className={`nm-section nm-marble ${s.blank}`} />;
  if (order.status !== 'paid')
    return (
      <section className={`nm-section nm-marble ${s.wait}`}>
        <p className={s.waitTitle}>Confirming your payment</p>
        <p className={s.toolbarText}>This takes a few seconds. If it stays here, refresh the page; your link keeps working.</p>
      </section>
    );

  return (
    <section className="nm-section nm-marble">
      <div className={s.toolbar}>
        <span className={s.toolbarText}>
          {PRODUCTS[order.product].name}
          {order.email ? ` · link sent to ${order.email}` : ''}
        </span>
        <button className="nm-btn nm-btn-outline" onClick={() => window.print()}>
          Save as PDF
        </button>
      </div>
      {order.product === 'portrait' ? <PortraitDoc profile={order.people[0]} full /> : <SynastryDoc a={order.people[0]} b={order.people[1]} full />}
    </section>
  );
}
