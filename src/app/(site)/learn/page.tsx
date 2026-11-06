import type { Metadata } from 'next';
import Link from 'next/link';
import { Glyph, type SignKey } from '@/components/Glyph';
import Stipple from '@/components/Stipple';
import { ELEMENT_COLORS } from '@/lib/astro/constants';
import { ARTICLES } from '@/lib/learn';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import s from '../tools/hub.module.css';

const title = 'Learn Astrology: Signs, Houses and Chart Structure';
const description = 'In-depth astrology guides from Astronomads: house systems, hemispheres and quadrants, the twelve signs and sign compatibility, with live tools for your own chart.';

export const metadata: Metadata = {
  title: { absolute: `${title} · Astronomads` },
  description,
  alternates: { canonical: '/learn' },
  openGraph: { title, description, url: '/learn', images: [{ url: '/og/zodiac-aquarius.png', width: 1200, height: 630 }] },
};

export default function LearnPage() {
  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Learn</p>
          <h1 className={`${s.title} fade-up`}>How a chart works</h1>
          <p className={s.lead}>Long reads on the structure of astrology, each with drawings and a live tool for your own chart.</p>
        </div>
      </section>
      <section className={`nm-section nm-marble ${s.group}`}>
        <p className="nm-label">01 Guides</p>
        <h2 className="nm-title">Chart structure</h2>
        <div className={s.cards}>
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/learn/${a.slug}`} className={s.card}>
              <span className={s.cardTitle}>{a.h1}</span>
              <span className={s.cardText}>{a.lead}</span>
              <span className={s.cardText}>{a.minutes} minute read</span>
            </Link>
          ))}
        </div>
      </section>
      <section className={`nm-section nm-marble ${s.group}`}>
        <p className="nm-label">02 The zodiac</p>
        <h2 className="nm-title">The twelve signs</h2>
        <div className={s.cards}>
          {SIGN_FACTS.map((x) => (
            <Link key={x.key} href={`/zodiac/${x.key}`} className={s.card}>
              <Glyph name={x.key as SignKey} size={36} color={ELEMENT_COLORS[x.element]} weight={1.6} />
              <span className={s.cardTitle}>{x.name}</span>
              <span className={s.cardText}>
                {x.usual[0]} to {x.usual[1]}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className={`nm-section nm-void ${s.how}`}>
        <p className="nm-label">03 Compatibility</p>
        <h2 className="nm-title">Every sign with every sign</h2>
        <p className={s.howText} style={{ maxWidth: '56ch', fontSize: 16 }}>
          All 78 Sun sign pairings, read in depth for love, intimacy, friendship, work and family. <Link href="/compatibility#signs" style={{ color: 'var(--marble)' }}>See all pairings</Link>
        </p>
      </section>
    </>
  );
}
