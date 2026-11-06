import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Glyph, type GlyphName, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import Stipple from '@/components/Stipple';
import { ELEMENT_COLORS, SIGNS, type BodyKey, type NodeKey } from '@/lib/astro/constants';
import { sunSeason } from '@/lib/astro/ingress';
import { IN_SIGN, POINT_INFO, firstSentence, ordinal } from '@/lib/astro/interpretations';
import { pointColor, pointName } from '@/lib/astro/points';
import { SIGN_COPY } from '@/lib/zodiac/copy';
import { famousBySign } from '@/lib/zodiac/famous';
import { SIGN_FACTS, relation, signBySlug } from '@/lib/zodiac/signs';
import CompatWheel from './CompatWheel';
import Constellation from './Constellation';
import CuspChecker from './CuspChecker';
import LiveSky from './LiveSky';
import Toc from './Toc';
import s from './zodiac.module.css';

/**
 * Fully built at deploy time (the famous-people list is read from the repo then). The live parts,
 * what is in the sign today and the next season, are worked out in the visitor's browser.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SIGN_COPY).map((sign) => ({ sign }));
}

type Props = { params: Promise<{ sign: string }> };

const cap = (t: string) => t[0].toUpperCase() + t.slice(1);
/** "21 March" to "21 Mar" */
const short = (d: string) => d.replace(/^(\d+ \w{3})\w*$/, '$1');
const POINTS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'nnode', 'snode', 'asc', 'mc'] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const f = signBySlug((await params).sign);
  if (!f) return {};
  const title = `${f.name} Zodiac Sign: Dates, Traits, Love and Compatibility`;
  const description = `${f.name} (${f.usual[0]} to ${f.usual[1]}): the ${f.element} sign ruled by ${f.ruler}. Personality, strengths, love, work, compatibility with every sign, famous ${f.name} people, and where ${f.name} is in the sky right now.`;
  return {
    title: { absolute: `${title} · Astronomads` },
    description,
    alternates: { canonical: `/zodiac/${f.key}` },
    openGraph: { title, description, url: `/zodiac/${f.key}`, type: 'article', images: [{ url: `/og/zodiac-${f.key}.png`, width: 1200, height: 630, alt: `${f.name}, ${f.symbol}` }] },
    twitter: { card: 'summary_large_image', title, description, images: [`/og/zodiac-${f.key}.png`] },
  };
}

export default async function SignPage({ params }: Props) {
  const f = signBySlug((await params).sign);
  const copy = f ? SIGN_COPY[f.key] : undefined;
  if (!f || !copy) notFound();

  const color = ELEMENT_COLORS[f.element];
  const now = new Date();
  let season = sunSeason(f.index, now.getUTCFullYear());
  if (season.end < now) season = sunSeason(f.index, now.getUTCFullYear() + 1);
  const seasonYear = season.start.getUTCFullYear();
  const fmt = (d: Date) => `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })} at ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC`;
  const famous = famousBySign()[f.index].slice(0, 12);
  const prev = SIGN_FACTS[(f.index + 11) % 12];
  const next = SIGN_FACTS[(f.index + 1) % 12];
  const toc = [{ id: 'overview', title: 'Overview' }, ...copy.sections.map((x) => ({ id: x.id, title: x.title }))];
  const quoteAfter = Math.min(2, copy.sections.length - 1);
  const site = process.env.SITE_URL || 'https://astronomads.com';

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${f.name}: dates, traits, love and compatibility`,
      description: copy.essence,
      image: `${site}/og/zodiac-${f.key}.png`,
      author: { '@type': 'Organization', name: 'Astronomads', url: site },
      publisher: { '@type': 'Organization', name: 'Astronomads', url: site },
      mainEntityOfPage: `${site}/zodiac/${f.key}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Zodiac', item: `${site}/zodiac` },
        { '@type': 'ListItem', position: 3, name: f.name, item: `${site}/zodiac/${f.key}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: copy.faq.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className={`nm-section nm-void ${s.hero}`} style={{ ['--sign' as string]: color }}>
        <Stipple kind="field" tone="astral" className={s.heroField} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <nav className={s.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span>Zodiac</span> <span aria-hidden="true">/</span> <span aria-current="page">{f.name}</span>
          </nav>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <p className="nm-label">
                {String(f.index + 1).padStart(2, '0')} of 12 · {cap(f.element)} · {cap(f.mode)}
              </p>
              <h1 className={`${s.signName} fade-up`}>{f.name}</h1>
              <p className={s.symbolLine}>
                <Glyph name={f.key} size={30} color={color} weight={1.8} /> {f.symbol} · {f.usual[0]} to {f.usual[1]}
              </p>
              <p className={s.essence}>{copy.essence}</p>
            </div>
            <div className={s.heroArt}>
              <Constellation sign={f.key} color={color} name={f.name} />
            </div>
          </div>
          <dl className={s.facts}>
            <div>
              <dt>Element</dt>
              <dd>
                <span className={s.dot} style={{ background: color }} /> {cap(f.element)}
              </dd>
            </div>
            <div>
              <dt>Mode</dt>
              <dd>{cap(f.mode)}</dd>
            </div>
            <div>
              <dt>Ruler</dt>
              <dd>
                {f.ruler}
                {f.modernRuler ? ` and ${f.modernRuler}` : ''}
              </dd>
            </div>
            <div>
              <dt>Opposite</dt>
              <dd>
                <Glyph name={f.opposite} size={18} color="currentColor" weight={1.8} /> {cap(f.opposite)}
              </dd>
            </div>
            <div>
              <dt>House</dt>
              <dd>{ordinal(f.house)}</dd>
            </div>
            <div>
              <dt>Body</dt>
              <dd>{f.body}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Sun check */}
      <section className={`nm-section nm-marble ${s.check}`} id="check">
        <div className={s.checkHead}>
          <p className="nm-label">01 Your Sun</p>
          <h2 className="nm-title">Is your Sun in {f.name}?</h2>
          <p className={s.lead}>
            In {seasonYear} the Sun enters {f.name} on {fmt(season.start)} and leaves on {fmt(season.end)}. The edges move a little every year, so check your own birthday.
          </p>
        </div>
        <CuspChecker sign={f.index} />
      </section>

      {/* The long read */}
      <section className={`nm-section nm-marble ${s.read}`}>
        <div className={s.readGrid}>
          <aside className={s.tocCol}>
            <Toc items={toc} />
          </aside>
          <article className={s.article}>
            <p className="nm-label">02 The sign</p>
            <h2 id="overview" className={s.articleTitle}>
              {f.name}, {f.symbol.toLowerCase()}
            </h2>
            <p className={s.intro}>{copy.intro}</p>
            <ul className={s.keywords} aria-label="Keywords">
              {f.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
            {copy.sections.map((sec, i) => (
              <div key={sec.id}>
                <h3 id={sec.id} className={s.sectionTitle}>
                  {sec.title}
                </h3>
                {sec.paras.map((p, j) => (
                  <p key={j} className={s.para}>
                    {p}
                  </p>
                ))}
                {i === quoteAfter && (
                  <blockquote className={s.quote} style={{ ['--sign' as string]: color }}>
                    <Glyph name={f.key} size={26} color={color} weight={1.8} />
                    <p>{copy.quote}</p>
                  </blockquote>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* Through every planet */}
      <section className={`nm-section nm-void ${s.points}`}>
        <p className="nm-label">03 {f.name} in your chart</p>
        <h2 className="nm-title">Your planets in {f.name}</h2>
        <p className={s.leadDark}>Every planet can sit in {f.name}. Here is what each one means there. Open a card to read it all.</p>
        <div className={s.pointGrid}>
          {POINTS.map((k) => {
            const angle = k === 'asc' || k === 'mc';
            const text = IN_SIGN[k][f.index];
            return (
              <details key={k} className={s.pointCard}>
                <summary>
                  <span className={s.pointGlyph}>
                    {angle ? <span className={s.angleMark}>{k === 'asc' ? 'AC' : 'MC'}</span> : <Glyph3D name={k as BodyKey | NodeKey} size={40} color={pointColor(k)} ground="dark" />}
                  </span>
                  <span className={s.pointTitle}>
                    {pointName(k)} in {f.name}
                  </span>
                  <span className={s.pointLine}>{firstSentence(text)}</span>
                  <span className={s.pointMore} aria-hidden="true" />
                </summary>
                <div className={s.pointBody}>
                  <p>{text}</p>
                  <p className={s.pointRole}>
                    {pointName(k)}: {POINT_INFO[k].role.toLowerCase()}
                  </p>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* Compatibility */}
      <section className={`nm-section nm-marble ${s.compat}`}>
        <p className="nm-label">04 Compatibility</p>
        <h2 className="nm-title">{f.name} with every sign</h2>
        <div className={s.compatGrid}>
          <div className={s.compatArt}>
            <CompatWheel sign={f.index} />
            <ul className={s.legend}>
              <li>
                <span style={{ background: 'var(--asp-ease)' }} /> Trine, easy
              </li>
              <li>
                <span className={s.dash} style={{ borderColor: 'var(--asp-soft)' }} /> Sextile, friendly
              </li>
              <li>
                <span style={{ background: 'var(--asp-hard)' }} /> Square or opposite, spark
              </li>
            </ul>
          </div>
          <ul className={s.matchList}>
            {SIGNS.map((sg, i) => {
              const rel = relation(f.index, i);
              return (
                <li key={sg.key} className={s.match} data-tone={rel.tone}>
                  <Glyph name={sg.key as SignKey} size={26} color={ELEMENT_COLORS[sg.element]} weight={1.8} />
                  <div>
                    <p className={s.matchName}>
                      {f.name} and {sg.name} <span className={s.matchTag}>{rel.label}</span>
                    </p>
                    <p className={s.matchText}>{copy.matches[sg.key as SignKey]}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Live sky */}
      <section className={`nm-section nm-void ${s.sky}`}>
        <p className="nm-label">05 Live</p>
        <h2 className="nm-title">{f.name} in the sky right now</h2>
        <LiveSky sign={f.index} />
      </section>

      {/* Famous */}
      <section className={`nm-section nm-marble ${s.famous}`}>
        <p className="nm-label">06 Famous {f.name}</p>
        <h2 className="nm-title">Born with the Sun in {f.name}</h2>
        <ol className={s.famousGrid}>
          {famous.map((p, i) => (
            <li key={p.name} className={s.person}>
              <span className={s.rank}>{String(i + 1).padStart(2, '0')}</span>
              <a href={p.wiki} target="_blank" rel="noreferrer" className={s.personName}>
                {p.name}
              </a>
              <span className={s.personMeta}>
                {p.occupation} · {p.country}
              </span>
              <span className={s.personMeta}>
                Born {new Date(`${p.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })} · Sun about {Math.floor(p.sunLon % 30)}° {f.name}
              </span>
            </li>
          ))}
        </ol>
        <p className={s.credit}>Famous people from Pantheon by Datawheel (CC BY-SA 4.0). Sun signs from birth dates; only people whose Sun stayed in {f.name} all day are listed.</p>
      </section>

      {/* FAQ */}
      <section className={`nm-section nm-marble ${s.faq}`}>
        <p className="nm-label">07 Questions</p>
        <h2 className="nm-title">About {f.name}</h2>
        <div className={s.faqList}>
          {copy.faq.map((q) => (
            <details key={q.q} className={s.faqItem}>
              <summary>{q.q}</summary>
              <p>{q.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* All signs */}
      <section className={`nm-section nm-void ${s.all}`}>
        <div className={s.prevNext}>
          <SignLink sign={prev} label="Previous" />
          <SignLink sign={next} label="Next" align="end" />
        </div>
        <ul className={s.allGrid}>
          {SIGN_FACTS.map((sg) => {
            const live = Boolean(SIGN_COPY[sg.key]);
            const inner = (
              <>
                <Glyph name={sg.key as GlyphName} size={34} color={ELEMENT_COLORS[sg.element]} weight={1.6} />
                <span className={s.allName}>{sg.name}</span>
                <span className={s.allDates}>{live ? `${short(sg.usual[0])} to ${short(sg.usual[1])}` : 'Soon'}</span>
              </>
            );
            return (
              <li key={sg.key}>
                {live ? (
                  <Link href={`/zodiac/${sg.key}`} className={s.allTile} aria-current={sg.key === f.key ? 'page' : undefined}>
                    {inner}
                  </Link>
                ) : (
                  <span className={`${s.allTile} ${s.allSoon}`}>{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
        <p className={s.credit}>Star positions: d3-celestial by Olaf Frohn (BSD-3-Clause), from the Hipparcos catalogue.</p>
      </section>
    </>
  );
}

function SignLink({ sign, label, align }: { sign: (typeof SIGN_FACTS)[number]; label: string; align?: 'end' }) {
  const live = Boolean(SIGN_COPY[sign.key]);
  const body = (
    <>
      <span className={s.pnLabel}>{label}</span>
      <span className={s.pnName}>
        <Glyph name={sign.key} size={22} color={ELEMENT_COLORS[sign.element]} weight={1.8} /> {sign.name}
      </span>
    </>
  );
  return live ? (
    <Link href={`/zodiac/${sign.key}`} className={`${s.pn} ${align === 'end' ? s.pnEnd : ''}`}>
      {body}
    </Link>
  ) : (
    <span className={`${s.pn} ${s.pnSoon} ${align === 'end' ? s.pnEnd : ''}`}>{body}</span>
  );
}
