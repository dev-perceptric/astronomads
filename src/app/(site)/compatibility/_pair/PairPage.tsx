import type { Metadata } from 'next';
import Link from 'next/link';
import { Glyph, type SignKey } from '@/components/Glyph';
import Stipple from '@/components/Stipple';
import Toc from '@/app/(site)/zodiac/_sign/Toc';
import t from '@/app/(site)/tools/_tool/tool.module.css';
import { ELEMENT_COLORS } from '@/lib/astro/constants';
import { PAIRS_WRITTEN } from '@/lib/compat/pairs';
import { PAIR_TITLES, type PairCopy } from '@/lib/compat/types';
import { SIGN_FACTS, relation, signBySlug } from '@/lib/zodiac/signs';
import s from './pair.module.css';

/*
 * One page per Sun sign pairing, each in its own plain folder (compatibility/aries-and-leo/page.tsx),
 * all rendered here. Plain folders because Hostinger can't serve scripts from [bracket] folders.
 */

const cap = (x: string) => x[0].toUpperCase() + x.slice(1);
export const pairHref = (a: string, b: string) => {
  const [x, y] = [signBySlug(a)!, signBySlug(b)!].sort((m, n) => m.index - n.index);
  return `/compatibility/${x.key}-and-${y.key}`;
};

export function pairMetadata(a: string, b: string, copy: PairCopy): Metadata {
  const A = signBySlug(a)!;
  const B = signBySlug(b)!;
  const title = `${A.name} and ${B.name} Compatibility: Love, Friendship and Work`;
  const url = pairHref(a, b);
  return {
    title: { absolute: `${title} · Astronomads` },
    description: `${A.name} and ${B.name} compatibility in love, intimacy, friendship, work and family. ${copy.essence}`.slice(0, 300),
    alternates: { canonical: url },
    openGraph: { title, description: copy.essence, url, type: 'article', images: [{ url: `/og/zodiac-${A.key}.png`, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title, description: copy.essence },
  };
}

export default function PairPage({ a, b, copy }: { a: string; b: string; copy: PairCopy }) {
  const A = signBySlug(a)!;
  const B = signBySlug(b)!;
  const pair = `${A.name} and ${B.name}`;
  const rel = relation(A.index, B.index);
  const site = (process.env.SITE_URL || 'https://astronomads.com').replace(/\/$/, '');
  const url = `${site}${pairHref(a, b)}`;
  const toc = [{ id: 'overview', title: `${pair} overview` }, ...copy.sections.map((x) => ({ id: x.id, title: PAIR_TITLES[x.id](pair) }))];
  const sameElement = A.element === B.element;
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: `${pair} compatibility`, description: copy.essence, author: { '@type': 'Organization', name: 'Astronomads', url: site }, publisher: { '@type': 'Organization', name: 'Astronomads', url: site }, mainEntityOfPage: url },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Compatibility', item: `${site}/compatibility` },
        { '@type': 'ListItem', position: 3, name: pair, item: url },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: copy.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })) },
  ];
  const others = (sign: typeof A) =>
    SIGN_FACTS.map((o) => ({ o, href: pairHref(sign.key, o.key), slug: [sign, o].sort((m, n) => m.index - n.index).map((x) => x.key).join('-') }))
      .filter((x) => PAIRS_WRITTEN.includes(x.slug) && !(x.o.key === (sign === A ? B : A).key));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className={`nm-section nm-void ${t.hero}`}>
        <Stipple kind="field" tone="astral" className={t.field} />
        <div className={`nm-bracket ${t.heroFrame}`}>
          <nav className={t.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/compatibility">Compatibility</Link> <span aria-hidden="true">/</span> <span aria-current="page">{pair}</span>
          </nav>
          <div className={s.glyphs} aria-hidden="true">
            <Glyph name={A.key as SignKey} size={96} color={ELEMENT_COLORS[A.element]} weight={1.4} />
            <span className={s.amp}>&amp;</span>
            <Glyph name={B.key as SignKey} size={96} color={ELEMENT_COLORS[B.element]} weight={1.4} />
          </div>
          <p className="nm-label">Sign compatibility</p>
          <h1 className={`${t.title} fade-up`}>{pair}</h1>
          <p className={t.lead}>{copy.essence}</p>
          <dl className={s.facts}>
            <div>
              <dt>Elements</dt>
              <dd>{sameElement ? `Both ${A.element}` : `${cap(A.element)} and ${B.element}`}</dd>
            </div>
            <div>
              <dt>Modes</dt>
              <dd>{A.mode === B.mode ? `Both ${A.mode}` : `${cap(A.mode)} and ${B.mode}`}</dd>
            </div>
            <div>
              <dt>Rulers</dt>
              <dd>{A.ruler === B.ruler ? `Both ${A.ruler}` : `${A.ruler} and ${B.ruler}`}</dd>
            </div>
            <div>
              <dt>Distance</dt>
              <dd>{rel.label}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={`nm-section nm-marble ${s.glance}`}>
        <p className="nm-label">01 At a glance</p>
        <h2 className="nm-title">{pair} in one look</h2>
        <div className={s.glanceGrid}>
          {(
            [
              ['Strengths', copy.strengths],
              ['Growth points', copy.challenges],
              ['Time together', copy.ideas],
            ] as const
          ).map(([label, items]) => (
            <div key={label} className={s.glanceCol}>
              <p className={t.smallLabel}>{label}</p>
              <ul>
                {items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={s.cta}>
          <p className={s.ctaText}>Your Sun sign is one part of your chart. Compare both full charts for the personal answer: Moon, Venus, Mars and rising included.</p>
          <div className={s.ctaBtns}>
            <Link href="/compatibility" className="nm-btn nm-btn-primary">
              Compare two charts
            </Link>
            <Link href="/tools/big-three-match" className="nm-btn nm-btn-outline">
              Big three match
            </Link>
          </div>
        </div>
      </section>

      <section className={`nm-section nm-marble ${t.read}`}>
        <div className={t.readGrid}>
          <aside className={t.tocCol}>
            <Toc items={toc} />
          </aside>
          <article className={t.article}>
            <p className="nm-label">02 The pairing</p>
            <h2 id="overview" className={t.sectionTitle}>
              {pair} compatibility
            </h2>
            <p className={t.para}>{copy.intro}</p>
            {copy.sections.map((sec) => (
              <div key={sec.id}>
                <h2 id={sec.id} className={t.sectionTitle}>
                  {PAIR_TITLES[sec.id](pair)}
                </h2>
                {sec.paras.map((x, j) => (
                  <p key={j} className={t.para}>
                    {x}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className={`nm-section nm-marble ${t.faq}`}>
        <p className="nm-label">03 Questions</p>
        <h2 className="nm-title">{pair}: common questions</h2>
        <div className={t.faqList}>
          {copy.faq.map((f) => (
            <details key={f.q} className={t.faqItem}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={`nm-section nm-void ${t.more}`}>
        <p className="nm-label">04 More pairings</p>
        <h2 className="nm-title">Every match for {A.name}{A.key === B.key ? '' : ` and ${B.name}`}</h2>
        {[A, ...(A.key === B.key ? [] : [B])].map((sign) => (
          <div key={sign.key} className={s.moreRow}>
            <p className={s.moreLabel}>
              <Link href={`/zodiac/${sign.key}`}>{sign.name}</Link> with
            </p>
            <div className={s.chips}>
              {others(sign).map(({ o, href }) => (
                <Link key={o.key} href={href} className={s.chip}>
                  <Glyph name={o.key as SignKey} size={18} color="currentColor" weight={1.8} /> {o.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
