import type { Metadata } from 'next';
import Link from 'next/link';
import Stipple from '@/components/Stipple';
import { PRODUCTS, price } from '@/lib/reports/products';
import s from './_doc/reports.module.css';

export const metadata: Metadata = {
  title: 'Astrology reports',
  description: 'In-depth astrology reports from your full birth chart: the Birth Chart Portrait and the Compatibility Report, written by Astronomads.',
  alternates: { canonical: '/reports' },
};

export default function ReportsPage() {
  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Reports</p>
          <h1 className={`${s.title} fade-up`}>Your chart, in full</h1>
          <p className={s.lead}>Long reads made from your exact birth chart, to keep as a page or a PDF. Preview yours free before you buy.</p>
        </div>
      </section>
      <section className="nm-section nm-marble">
        <div className={s.cards}>
          <Link href="/reports/portrait" className={s.card}>
            <span className="nm-label">One person</span>
            <span className={s.cardTitle}>{PRODUCTS.portrait.name}</span>
            <span className={s.cardText}>{PRODUCTS.portrait.tagline} Your big three, your balance, your chart ruler, then every planet, node and angle by sign, house and aspect.</span>
            <span className={s.cardPrice}>{price(PRODUCTS.portrait)}</span>
          </Link>
          <Link href="/reports/synastry" className={s.card}>
            <span className="nm-label">Two people</span>
            <span className={s.cardTitle}>{PRODUCTS.synastry.name}</span>
            <span className={s.cardText}>{PRODUCTS.synastry.tagline} Five scores, every contact between your planets, and how each of you loves.</span>
            <span className={s.cardPrice}>{price(PRODUCTS.synastry)}</span>
          </Link>
        </div>
      </section>
    </>
  );
}
