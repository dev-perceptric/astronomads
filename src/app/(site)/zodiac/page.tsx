import type { Metadata } from 'next';
import Link from 'next/link';
import { Glyph } from '@/components/Glyph';
import Stipple from '@/components/Stipple';
import { ELEMENT_COLORS } from '@/lib/astro/constants';
import { SIGN_COPY } from '@/lib/zodiac/copy';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import CuspChecker from './_sign/CuspChecker';
import z from './_sign/zodiac.module.css';
import s from './hub.module.css';

export const dynamic = 'force-static';

const title = 'Zodiac Signs: Dates, Elements and Meanings of All 12 Signs';
const description = 'All twelve zodiac signs in one place: their dates, elements, modes and ruling planets, a birthday check for your Sun sign, and a full guide to each sign.';

export const metadata: Metadata = {
  title: { absolute: `${title} · Astronomads` },
  description,
  alternates: { canonical: '/zodiac' },
  openGraph: { title, description, url: '/zodiac', type: 'website', images: [{ url: '/og/zodiac-aries.png', width: 1200, height: 630 }] },
};

const ELEMENTS = ['fire', 'earth', 'air', 'water'] as const;
const MODES = ['cardinal', 'fixed', 'mutable'] as const;
const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
const short = (d: string) => d.replace(/^(\d+ \w{3})\w*$/, '$1');

/** The zodiac hub: find your sign, the twelve signs by element and mode, and every sign's guide. */
export default function ZodiacHub() {
  const site = process.env.SITE_URL || 'https://astronomads.com';
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'The twelve zodiac signs',
      itemListElement: SIGN_FACTS.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f.name, url: `${site}/zodiac/${f.key}` })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Zodiac', item: `${site}/zodiac` },
      ],
    },
  ];

  const tile = (f: (typeof SIGN_FACTS)[number], big = false) => {
    const live = Boolean(SIGN_COPY[f.key]);
    const inner = (
      <>
        <Glyph name={f.key} size={big ? 40 : 30} color={ELEMENT_COLORS[f.element]} weight={1.6} />
        <span className={s.tileName}>{f.name}</span>
        <span className={s.tileDates}>
          {short(f.usual[0])} to {short(f.usual[1])}
        </span>
      </>
    );
    return live ? (
      <Link href={`/zodiac/${f.key}`} className={s.tile}>
        {inner}
      </Link>
    ) : (
      <span className={`${s.tile} ${s.soon}`}>{inner}</span>
    );
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <nav className={z.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Zodiac</span>
          </nav>
          <p className="nm-label">The zodiac</p>
          <h1 className={`${s.title} fade-up`}>The twelve signs</h1>
          <p className={s.lead}>Twelve 30 degree slices of the sky, starting at the March equinox. Each one has an element, a way of moving and a ruling planet, and together they describe every part of a birth chart.</p>
          <div className={s.ring} aria-hidden="true">
            {SIGN_FACTS.map((f) => (
              <span key={f.key} style={{ ['--i' as string]: f.index }}>
                <Glyph name={f.key} size={30} color={ELEMENT_COLORS[f.element]} weight={1.6} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className={`nm-section nm-marble ${z.check}`} id="find">
        <div className={z.checkHead}>
          <p className="nm-label">01 Your sign</p>
          <h2 className="nm-title">Find your zodiac sign</h2>
          <p className={z.lead}>Enter your birthday. Our engine finds where the Sun really was, and asks for your time and city if you were born on the day it changed signs.</p>
        </div>
        <CuspChecker />
      </section>

      <section className={`nm-section nm-marble ${s.matrix}`}>
        <p className="nm-label">02 Elements and modes</p>
        <h2 className="nm-title">Zodiac signs by element</h2>
        <div className={s.table} role="table" aria-label="Zodiac signs by element and mode">
          <div role="row" className={s.headRow}>
            <span role="columnheader" />
            {MODES.map((m) => (
              <span key={m} role="columnheader" className={s.colHead}>
                {cap(m)}
              </span>
            ))}
          </div>
          {ELEMENTS.map((el) => (
            <div key={el} role="row" className={s.row}>
              <span role="rowheader" className={s.rowHead}>
                <span className={s.dot} style={{ background: ELEMENT_COLORS[el] }} />
                {cap(el)}
              </span>
              {MODES.map((m) => {
                const f = SIGN_FACTS.find((x) => x.element === el && x.mode === m)!;
                return (
                  <span key={m} role="cell">
                    {tile(f, true)}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <p className={s.note}>Fire signs act, earth signs build, air signs think and connect, water signs feel. Cardinal signs start things, fixed signs keep them going, mutable signs adapt and change them.</p>
      </section>

      <section className={`nm-section nm-void ${s.list}`}>
        <p className="nm-label">03 Every sign</p>
        <h2 className="nm-title">All twelve zodiac signs</h2>
        <ol className={s.cards}>
          {SIGN_FACTS.map((f) => {
            const copy = SIGN_COPY[f.key];
            const body = (
              <>
                <span className={s.cardTop}>
                  <Glyph name={f.key} size={34} color={ELEMENT_COLORS[f.element]} weight={1.6} />
                  <span className={s.cardNum}>{String(f.index + 1).padStart(2, '0')}</span>
                </span>
                <span className={s.cardName}>{f.name}</span>
                <span className={s.cardMeta}>
                  {f.symbol} · {short(f.usual[0])} to {short(f.usual[1])}
                </span>
                <span className={s.cardMeta}>
                  {cap(f.element)} · {cap(f.mode)} · Ruled by {f.ruler}
                  {f.modernRuler ? ` and ${f.modernRuler}` : ''}
                </span>
                {copy && <span className={s.cardLine}>{copy.essence}</span>}
              </>
            );
            return (
              <li key={f.key}>
                {copy ? (
                  <Link href={`/zodiac/${f.key}`} className={s.card}>
                    {body}
                  </Link>
                ) : (
                  <span className={`${s.card} ${s.soon}`}>{body}</span>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
