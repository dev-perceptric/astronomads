import type { Metadata } from 'next';
import Link from 'next/link';
import Stipple from '@/components/Stipple';
import { TOOLS } from '@/lib/tools/registry';
import s from './hub.module.css';

const title = 'Free Astrology Calculators: Big Three, Moon Sign, Returns and More';
const description = 'Free astrology calculators: big three, Moon and rising sign, retrogrades, solar and Saturn returns, progressions, composite charts, synastry and celebrity match.';

export const metadata: Metadata = {
  title: { absolute: `${title} · Astronomads` },
  description,
  alternates: { canonical: '/tools' },
  openGraph: { title, description, url: '/tools', images: [{ url: '/og/zodiac-aries.png', width: 1200, height: 630 }] },
};

const GROUPS = [
  { key: 'chart', label: '01 Your birth chart', title: 'Who you are', text: 'Calculators that read the sky at the moment you were born.' },
  { key: 'timing', label: '02 Timing', title: 'What is happening now', text: 'Calculators that follow the moving sky against your chart, from today to the decades ahead.' },
  { key: 'pairs', label: '03 Two people', title: 'You and someone else', text: 'Calculators that compare two charts, for love, friendship, work and family.' },
] as const;

const HOW = [
  ['Real positions', 'Every planet comes from the astronomy-engine library, the true position of date, checked in our tests against Swiss Ephemeris and published dates.'],
  ['Your exact time zone', 'Birth times go through the time zone history of your birth city, so old offsets and daylight saving are right.'],
  ['Placidus houses', 'Houses use the Placidus system, with whole sign houses near the poles where Placidus breaks down.'],
  ['Free and private', 'The math runs in your own browser. Your birth details live in the page address and on this device unless you save them to an account.'],
];

export default function ToolsPage() {
  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Tools</p>
          <h1 className={`${s.title} fade-up`}>Every calculator, free</h1>
          <p className={s.lead}>Twenty eight tools built on your exact birth chart, each with a full guide to reading the result.</p>
        </div>
      </section>
      {GROUPS.map((g) => (
        <section key={g.key} className={`nm-section nm-marble ${s.group}`}>
          <p className="nm-label">{g.label}</p>
          <h2 className="nm-title">{g.title}</h2>
          <p className={s.groupText}>{g.text}</p>
          <div className={s.cards}>
            {TOOLS.filter((t) => t.group === g.key).map((t) => (
              <Link key={t.slug} href={t.href} className={s.card}>
                <span className={s.cardTitle}>{t.name}</span>
                <span className={s.cardText}>{t.short}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
      <section className={`nm-section nm-void ${s.how}`}>
        <p className="nm-label">04 How they work</p>
        <h2 className="nm-title">Built on the real sky</h2>
        <div className={s.howGrid}>
          {HOW.map(([h, t]) => (
            <div key={h}>
              <p className={s.howTitle}>{h}</p>
              <p className={s.howText}>{t}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
