import type { Metadata } from 'next';
import Stipple from '@/components/Stipple';
import s from './brand.module.css';

export const metadata: Metadata = { title: 'Brand' };

const SWATCHES = [
  { name: 'Void', token: '--void', value: '#000000', use: 'Dark sections, text on Marble', dark: true },
  { name: 'Marble', token: '--marble', value: '#FFFFFF', use: 'Light sections, text on Void' },
  { name: 'Astral', token: '--astral', value: '#6A62F7', use: 'The one accent', dark: true },
  { name: 'Astral ink', token: '--astral-ink', value: '#4B42E0', use: 'Small Astral text on Marble', dark: true },
  { name: 'Stone', token: '--stone', value: '#A6A6A6', use: 'Secondary text on Void' },
  { name: 'Ash', token: '--ash', value: '#5E5E5E', use: 'Secondary text on Marble', dark: true },
];

const TYPE = [
  { role: 'Wordmark', spec: 'Cinzel 500 · capitals · 0.04em', sample: 'ASTRONOMADS', cls: 'wordmarkSample' },
  { role: 'Hero headline', spec: 'EB Garamond 400 · 36–56 / 1.05', sample: 'Every sky is different. Read yours to the minute.', cls: 'heroSample' },
  { role: 'Statement', spec: 'EB Garamond 400 · 48 / 1.05 · Astral', sample: 'The chart you were born under, drawn with care.', cls: 'statementSample' },
  { role: 'Card title', spec: 'EB Garamond 400 · 24 / 1.2', sample: 'Sun in Leo', cls: 'cardTitleSample' },
  { role: 'Body', spec: 'Geist Mono 400 · 16–18 / 1.3 · −0.02em', sample: 'Every planet placed where it stood the minute you were born, with your houses, aspects and what each one means.', cls: 'bodySample' },
  { role: 'Label', spec: 'Geist Mono 400 · 12–14 · capitals', sample: 'YOUR PLANETS', cls: 'labelSample' },
];

function Bracket({ children, tone = 'void', className = '' }: { children: React.ReactNode; tone?: 'void' | 'marble'; className?: string }) {
  return <div className={`${s.bracket} ${tone === 'marble' ? s.bracketMarble : ''} ${className}`}>{children}</div>;
}

function Wordmark({ size = 'md' }: { size?: 'md' | 'xl' }) {
  return (
    <span className={`${s.wordmark} ${size === 'xl' ? s.wordmarkXl : ''}`} data-text="ASTRONOMADS">
      ASTRONOMADS
    </span>
  );
}

export default function BrandPage() {
  return (
    <div className={s.root}>
      {/* Hero */}
      <section className={`${s.section} ${s.void} ${s.heroSection}`}>
        <Bracket className={s.heroFrame}>
          <div className={s.heroTop}>
            <Wordmark />
          </div>
          <Stipple kind="planet" className={s.heroArt} />
          <div className={s.heroBottom}>
            <h1 className={s.heroTitle}>
              Every sky is different.
              <br />
              Read yours to the minute.
            </h1>
            <p className={s.heroAside}>Birth charts drawn with care, from the exact minute you arrived.</p>
          </div>
          <nav className={s.floatNav} aria-label="Navigation example">
            <a className={s.navItem}>Home</a>
            <a className={`${s.navItem} ${s.navCurrent}`}>My chart</a>
            <a className={s.navItem}>Today</a>
            <a className={`${s.navItem} ${s.navCta}`}>New chart</a>
          </nav>
        </Bracket>
      </section>

      {/* Intro */}
      <section className={`${s.section} ${s.marble}`}>
        <p className={s.label}>Brand guideline</p>
        <div className={s.twoCol}>
          <div className={s.colText}>
            <h2 className={s.statement}>Night and marble. A classical inscription set against the sky.</h2>
            <p className={s.body}>
              Two grounds, black and white. One astral accent for the sky. A carved Roman wordmark, a calm book serif for what matters, and a mono for everything you read. Pictures are drawn in dots, like stars.
            </p>
          </div>
          <Stipple kind="bust-ring" tone="marble" className={s.sideArt} />
        </div>
      </section>

      {/* Color */}
      <section className={`${s.section} ${s.void}`}>
        <p className={s.label}>01 Color</p>
        <h2 className={s.sectionTitle}>Two grounds and one accent</h2>
        <div className={s.swatches}>
          {SWATCHES.map((c) => (
            <div key={c.name} className={s.swatch}>
              <div className={s.chip} style={{ background: c.value }} />
              <p className={s.swatchName}>{c.name}</p>
              <p className={s.swatchMeta}>
                {c.value} · {c.token}
              </p>
              <p className={s.swatchUse}>{c.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Type */}
      <section className={`${s.section} ${s.marble}`}>
        <p className={s.label}>02 Typography</p>
        <h2 className={s.sectionTitle}>Serif for meaning, mono for information</h2>
        <div className={s.typeList}>
          {TYPE.map((t) => (
            <div key={t.role} className={s.typeRow}>
              <div className={s.typeMeta}>
                <p className={s.label}>{t.role}</p>
                <p className={s.swatchMetaDark}>{t.spec}</p>
              </div>
              <p className={`${s[t.cls]}`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className={`${s.section} ${s.void}`}>
        <p className={s.label}>03 Components</p>
        <h2 className={s.sectionTitle}>Brackets hold things</h2>
        <div className={s.cards}>
          <Bracket>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Birth chart</h3>
              <p className={s.cardBody}>Every planet, house and aspect, calculated with Placidus houses and checked against Swiss Ephemeris.</p>
            </div>
          </Bracket>
          <Bracket>
            <div className={s.card}>
              <h3 className={s.cardTitle}>Today</h3>
              <p className={s.cardBody}>The Moon’s phase and sign, and the planets touching your chart right now.</p>
            </div>
          </Bracket>
        </div>
        <div className={s.buttonRow}>
          <button className={`${s.btn} ${s.btnPrimary}`}>Calculate my chart</button>
          <button className={`${s.btn} ${s.btnGlass}`}>See today</button>
        </div>
        <div className={s.quoteWrap}>
          <Bracket>
            <blockquote className={s.quote}>
              <p>A quote sits in a bracket frame: serif at 24px, attribution in mono below.</p>
              <footer className={s.cite}>Example attribution, role</footer>
            </blockquote>
          </Bracket>
        </div>
      </section>

      <section className={`${s.section} ${s.marble}`}>
        <p className={s.label}>Components on Marble</p>
        <div className={s.buttonRow}>
          <button className={`${s.btn} ${s.btnPrimary}`}>Calculate my chart</button>
          <button className={`${s.btn} ${s.btnOutline}`}>Learn the signs</button>
        </div>
        <div className={s.fieldRow}>
          <label className={s.fieldLabel} htmlFor="brand-demo-city">
            Birth city
          </label>
          <input id="brand-demo-city" className={s.field} placeholder="Search a city" />
        </div>
      </section>

      {/* Imagery */}
      <section className={`${s.section} ${s.void}`}>
        <p className={s.label}>04 Imagery</p>
        <h2 className={s.sectionTitle}>Dots draw pictures</h2>
        <div className={s.imageGrid}>
          <figure className={s.figure}>
            <Stipple kind="planet" className={s.figArt} />
            <figcaption className={s.caption}>Planet, white on Void</figcaption>
          </figure>
          <figure className={`${s.figure} ${s.figureMarble}`}>
            <Stipple kind="planet" tone="marble" className={s.figArt} />
            <figcaption className={s.captionDark}>Planet, black on Marble</figcaption>
          </figure>
          <figure className={s.figure}>
            <Stipple kind="field" tone="astral" className={s.figArt} />
            <figcaption className={s.caption}>Star field, Astral on Void</figcaption>
          </figure>
        </div>
      </section>

      {/* Signature */}
      <section className={`${s.section} ${s.void} ${s.signature}`}>
        <Stipple kind="field" tone="astral" className={s.signatureField} />
        <p className={s.small}>Astronomads © 2026</p>
        <Wordmark size="xl" />
      </section>
    </div>
  );
}
