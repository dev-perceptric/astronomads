import Link from 'next/link';
import BirthForm from '@/components/BirthForm';
import ExampleWheel from '@/components/ExampleWheel';
import Logo from '@/components/Logo';
import Stipple from '@/components/Stipple';
import s from './home.module.css';

const words = (text: string, start: number) =>
  text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="reveal-word" style={{ ['--word-index' as string]: start + i }}>
        {w}
      </span>{' '}
    </span>
  ));

const PARTS = [
  { title: 'Birth chart', body: 'Every planet, house and aspect at the minute you were born, with Placidus houses checked against Swiss Ephemeris.', href: '/chart', live: true },
  { title: 'Today', body: 'The Moon’s phase and sign, and the planets touching your chart right now.', href: '/today', live: true },
  { title: 'Compatibility', body: 'Two charts side by side: where you meet, and where you grow.', live: false },
  { title: 'Astrocartography', body: 'A world map of your planet lines, for choosing where to go next.', live: false },
];

export default function Home() {
  return (
    <div className={s.root} id="top">
      {/* Hero */}
      <section className={`${s.section} ${s.void} ${s.hero}`}>
        <div className={s.bracket + ' ' + s.heroFrame}>
          <h1 className={s.srOnly}>Astronomads</h1>
          <div className={`${s.heroLogo} fade-up`}>
            <Logo kind="wordmark" fg="#fff" ground="#000" title="Astronomads" className={s.heroMark} />
          </div>
          <Stipple kind="bust-ring" className={s.heroArt} />
          <div className={s.heroBottom}>
            <p className={s.heroTitle} style={{ ['--reveal-delay' as string]: '250ms' }}>
              {words('Every sky is different.', 0)}
              <br />
              {words('Read yours to the minute.', 4)}
            </p>
            <p className={`${s.heroAside} fade-up`} style={{ ['--fade-delay' as string]: '900ms' }}>
              Free birth charts, drawn from the exact minute you arrived.
            </p>
          </div>
        </div>
      </section>

      {/* Start: the form, beside an example chart */}
      <section className={`${s.section} ${s.marble} ${s.light}`} id="start">
        <p className={s.label}>01 Birth chart</p>
        <h2 className={s.sectionTitle}>Draw your chart</h2>
        <div className={s.startGrid}>
          <div className={s.formCol}>
            <BirthForm />
          </div>
          <figure className={s.exampleCol}>
            <div className={`${s.bracket} ${s.bracketMarble}`}>
              <ExampleWheel />
            </div>
            <figcaption className={s.caption}>Example: Nova, born 20 March 1996 at 06:40 in Lisbon</figcaption>
          </figure>
        </div>
      </section>

      {/* What you get */}
      <section className={`${s.section} ${s.void}`}>
        <p className={s.label}>02 Your sky</p>
        <h2 className={s.sectionTitle}>Your sky, in four parts</h2>
        <div className={s.cards}>
          {PARTS.map((p) => {
            const inner = (
              <>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <div className={s.cardRight}>
                  <p className={s.cardBody}>{p.body}</p>
                  <span className={p.live ? s.cardLink : s.cardSoon}>{p.live ? 'Open' : 'Coming next'}</span>
                </div>
              </>
            );
            return p.live && p.href ? (
              <Link key={p.title} href={p.href} className={`${s.bracket} ${s.card} ${s.cardLive}`}>
                {inner}
              </Link>
            ) : (
              <div key={p.title} className={`${s.bracket} ${s.card}`}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Statement */}
      <section className={`${s.section} ${s.marble}`}>
        <div className={s.twoCol}>
          <div className={s.colText}>
            <p className={s.label}>03 Method</p>
            <p className={s.statement}>The sky you were born under, read with care.</p>
            <p className={s.body}>
              We place every planet where it stood at your birth, using your city’s own time zone history, and tell you what each placement means. Charts are calculated in your browser and checked against Swiss Ephemeris, the reference astrologers use.
            </p>
          </div>
          <Stipple kind="planet" tone="marble" className={s.sideArt} />
        </div>
      </section>

    </div>
  );
}
