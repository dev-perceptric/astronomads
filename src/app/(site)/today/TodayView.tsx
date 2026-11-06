'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Glyph, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import Stipple from '@/components/Stipple';
import PersonPicker from '@/components/site/PersonPicker';
import { useChart } from '@/components/useChart';
import { moonPhase, positionsAt } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey } from '@/lib/astro/constants';
import { TRANSIT_FAST } from '@/lib/astro/interpretations/transitsFast';
import { TRANSIT_SLOW } from '@/lib/astro/interpretations/transitsSlow';
import { pointName } from '@/lib/astro/points';
import { MOON_DAYS } from '@/lib/astro/readings';
import { DURATION, transitsAt, weekAhead, type Transit } from '@/lib/astro/transits';
import { profileParams, useProfileParam } from '@/lib/people';
import { EXAMPLE_PROFILE, loadProfile, type BirthProfile } from '@/lib/profile';
import s from './today.module.css';

const SLOW = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
type Table = Record<string, Record<string, Record<'blend' | 'ease' | 'tension', string>>>;
const TRANSIT_ALL: Table = { ...(TRANSIT_FAST as Table), ...(TRANSIT_SLOW as Table) };
const transitText = (t: Transit) => TRANSIT_ALL[t.transit]?.[t.natal]?.[t.def.tone] ?? '';
const natalLabel = (t: Transit) => (t.natal === 'asc' || t.natal === 'mc' ? `your ${pointName(t.natal)}` : `your ${pointName(t.natal)}`);

/** The personal daily horoscope: today's sky meeting your chart. */
export default function TodayView() {
  const router = useRouter();
  const params = new URLSearchParams(useSearchParams().toString());
  const fromUrl = useProfileParam(params);
  const [profile, setProfile] = useState<BirthProfile | null>(null);
  const [isExample, setIsExample] = useState(false);
  const [choosing, setChoosing] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (fromUrl === null) return;
    if (fromUrl !== 'none' && fromUrl !== 'error') {
      setProfile(fromUrl);
      setIsExample(false);
    } else {
      const saved = loadProfile();
      setProfile(saved ?? EXAMPLE_PROFILE);
      setIsExample(!saved);
    }
  }, [fromUrl]);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 15 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const natal = useChart(profile);
  const all = useMemo(() => (natal && now ? transitsAt(natal, now) : []), [natal, now]);
  const week = useMemo(() => (natal && now ? weekAhead(natal, now) : []), [natal, now]);
  if (!profile || !natal || !now) return <section className={`nm-section nm-void ${s.blank}`} />;

  const today = all.filter((t) => !SLOW.includes(t.transit)).slice(0, 4);
  const big = all.filter((t) => SLOW.includes(t.transit)).slice(0, 4);
  const phase = moonPhase(now);
  const moonLon = positionsAt(now).find((p) => p.body === 'moon')!.lon;
  const moonSign = Math.floor(moonLon / 30);
  const day = MOON_DAYS[moonSign];
  const dateLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  const first = profile.name.split(' ')[0];

  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <div className={s.heroText}>
            <p className="nm-label">{dateLabel}</p>
            <h1 className={`${s.title} fade-up`}>{isExample ? 'A day in the sky' : `${first}, your day`}</h1>
            <p className={s.moonLine}>
              {phase.name} in <Glyph name={SIGNS[moonSign].key as SignKey} size={24} color={ELEMENT_COLORS[SIGNS[moonSign].element]} weight={1.8} /> {SIGNS[moonSign].name} · {Math.round(phase.illumination * 100)}% lit
            </p>
            <p className={s.dayLine}>{day.line}</p>
            <div className={s.whose}>
              {isExample ? (
                <>
                  <span>Showing an example chart.</span>
                  <Link href="/#start" className="nm-btn nm-btn-primary">
                    Make it mine
                  </Link>
                </>
              ) : (
                <>
                  <span>
                    For {profile.name}, born {new Date(`${profile.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
                  </span>
                  <button className={s.textBtn} onClick={() => setChoosing((c) => !c)} aria-expanded={choosing}>
                    Someone else
                  </button>
                </>
              )}
            </div>
          </div>
          <MoonArt angle={phase.angle} />
        </div>
      </section>

      {choosing && (
        <section className={`nm-section nm-marble ${s.choose}`}>
          <PersonPicker
            label="Whose day?"
            value={null}
            onChange={(p) => {
              if (!p) return;
              setChoosing(false);
              router.push(`/today?${new URLSearchParams(profileParams(p)).toString()}`);
            }}
          />
        </section>
      )}

      <section className={`nm-section nm-marble ${s.section}`}>
        <p className="nm-label">01 Today for you</p>
        <h2 className="nm-title">The sky meets your chart</h2>
        {today.length === 0 ? (
          <p className={s.empty}>A calm day: the fast planets make no close contacts with your chart. Follow the Moon’s mood below.</p>
        ) : (
          <ul className={s.cards}>
            {today.map((t, i) => (
              <TransitCard key={i} t={t} label={natalLabel(t)} ground="light" />
            ))}
          </ul>
        )}
        <div className={s.moonLists}>
          <div>
            <p className={s.listLabel}>Lean into</p>
            <ul>
              {day.leanInto.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.listLabel}>Let go of</p>
            <ul>
              {day.letGo.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {big.length > 0 && (
        <section className={`nm-section nm-void ${s.section}`}>
          <p className="nm-label">02 The bigger picture</p>
          <h2 className="nm-title">Longer chapters right now</h2>
          <ul className={s.cards}>
            {big.map((t, i) => (
              <TransitCard key={i} t={t} label={natalLabel(t)} ground="dark" />
            ))}
          </ul>
        </section>
      )}

      {week.length > 0 && (
        <section className={`nm-section nm-marble ${s.section}`}>
          <p className="nm-label">03 The days ahead</p>
          <h2 className="nm-title">Your week</h2>
          <ol className={s.week}>
            {week.slice(0, 10).map((t, i) => (
              <li key={i} className={s.weekRow}>
                <span className={s.weekDay}>{t.day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })}</span>
                <span className={s.weekGlyphs}>
                  <Glyph3D name={t.transit} size={26} color={bodyByKey(t.transit).color} ground="light" />
                  <Glyph name={t.def.kind} size={14} color={t.def.color} weight={2} />
                </span>
                <div>
                  <p className={s.weekTitle}>
                    {bodyByKey(t.transit).name} {t.def.kind} {natalLabel(t)}
                  </p>
                  <p className={s.weekText}>{transitText(t)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className={`nm-section nm-void ${s.more}`}>
        <div className={s.moreGrid}>
          <Link href="/compatibility" className={s.moreCard}>
            <span className="nm-label">Compatibility</span>
            <span className={s.moreTitle}>Compare your chart with someone</span>
          </Link>
          <Link href="/reports/portrait" className={s.moreCard}>
            <span className="nm-label">Your full report</span>
            <span className={s.moreTitle}>Every planet in your chart, explained</span>
          </Link>
          <Link href="/zodiac" className={s.moreCard}>
            <span className="nm-label">The zodiac</span>
            <span className={s.moreTitle}>Read about all twelve signs</span>
          </Link>
        </div>
      </section>
    </>
  );
}

function TransitCard({ t, label, ground }: { t: Transit; label: string; ground: 'light' | 'dark' }) {
  return (
    <li className={s.card}>
      <span className={s.cardGlyphs}>
        <Glyph3D name={t.transit} size={40} color={bodyByKey(t.transit).color} ground={ground} />
        <Glyph name={t.def.kind} size={16} color={t.def.color} weight={2} />
      </span>
      <p className={s.cardTitle}>
        {bodyByKey(t.transit).name} {t.def.kind} {label}
      </p>
      <p className={s.cardText}>{transitText(t)}</p>
      <p className={s.cardMeta}>
        {t.applying ? 'Building' : 'Easing'} · lasts {DURATION[t.transit]} · {t.orb.toFixed(1)}° from exact
      </p>
    </li>
  );
}

/** Tonight's Moon, drawn from its real phase angle. */
function MoonArt({ angle }: { angle: number }) {
  const r = 80;
  const a = (angle * Math.PI) / 180;
  const rx = Math.abs(r * Math.cos(a)).toFixed(2);
  const waxing = angle < 180;
  const gibbous = angle > 90 && angle < 270;
  const d = `M0 ${-r} A${r} ${r} 0 0 ${waxing ? 1 : 0} 0 ${r} A${rx} ${r} 0 0 ${waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1} 0 ${-r} Z`;
  return (
    <svg className={s.moon} viewBox="-120 -120 240 240" role="img" aria-label="Tonight's Moon">
      <circle r={r + 14} fill="none" stroke="var(--rule)" />
      <circle r={r + 22} fill="none" stroke="var(--rule)" strokeDasharray="1 5" />
      <circle r={r} fill="var(--secondary)" />
      <path d={d} fill="var(--marble)" />
    </svg>
  );
}
