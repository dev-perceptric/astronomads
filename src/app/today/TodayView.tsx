'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useChart } from '@/components/useChart';
import { findAspect, formatDegree, moonPhase, positionsAt, type PointKey } from '@/lib/astro/chart';
import { SIGNS, bodyByKey, type AspectKind, type BodyKey } from '@/lib/astro/constants';
import { MOON_DAYS, transitLine } from '@/lib/astro/readings';
import { EXAMPLE_PROFILE, loadProfile, type BirthProfile } from '@/lib/profile';
import s from './today.module.css';

type Transit = { transit: BodyKey; natal: PointKey; kind: AspectKind; glyph: string; color: string; orb: number };

export default function TodayView() {
  const [now, setNow] = useState<Date | null>(null);
  const [profile, setProfile] = useState<BirthProfile | null>(null);
  const [isExample, setIsExample] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    setProfile(saved ?? EXAMPLE_PROFILE);
    setIsExample(!saved);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const natal = useChart(profile);
  const sky = useMemo(() => (now ? positionsAt(now) : null), [now]);

  const transits = useMemo<Transit[]>(() => {
    if (!sky || !natal) return [];
    const points: { key: PointKey; lon: number }[] = natal.placements.map((p) => ({ key: p.body, lon: p.lon }));
    if (natal.asc !== null) points.push({ key: 'asc', lon: natal.asc });
    const out: Transit[] = [];
    for (const t of sky) {
      for (const n of points) {
        const hit = findAspect(t.lon, n.lon, t.body === 'moon' ? 0.5 : 0.35);
        if (hit) out.push({ transit: t.body, natal: n.key, kind: hit.def.kind, glyph: hit.def.glyph, color: hit.def.color, orb: hit.orb });
      }
    }
    return out.sort((a, b) => a.orb - b.orb).slice(0, 5);
  }, [sky, natal]);

  if (!now || !sky || !profile) return null;

  const phase = moonPhase(now);
  const moonLon = sky.find((p) => p.body === 'moon')!.lon;
  const moonSign = Math.floor(moonLon / 30);
  const day = MOON_DAYS[moonSign];
  const dateLabel = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className={s.today}>
      {isExample && (
        <div className={s.banner}>
          <span>Showing the example chart. Calculate yours to make this day personal.</span>
          <Link className="btn btn-primary" href="/">
            Calculate my chart
          </Link>
        </div>
      )}

      <section className={s.hero}>
        <MoonGlyph angle={phase.angle} />
        <div className={s.heroText}>
          <p className="eyebrow">{dateLabel}</p>
          <h1 className={`display ${s.title}`}>
            {phase.name}
            <br />
            in {SIGNS[moonSign].name}
          </h1>
          <p className={s.line}>{day.line}</p>
          <p className={`mono ${s.meta}`}>{Math.round(phase.illumination * 100)}% lit</p>
        </div>
      </section>

      <section className={s.lists}>
        <div className={`card ${s.list}`}>
          <p className="eyebrow">Lean into</p>
          <ul>
            {day.leanInto.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className={`card ${s.list}`}>
          <p className="eyebrow">Let go of</p>
          <ul>
            {day.letGo.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={`display ${s.h2}`}>Touching {isExample ? 'Nova’s' : 'your'} chart</h2>
        {transits.length === 0 ? (
          <p className={s.muted}>A quiet sky for you today. No close contacts.</p>
        ) : (
          <ul className={s.transits}>
            {transits.map((t) => (
              <li key={`${t.transit}-${t.natal}-${t.kind}`} className={s.transit}>
                <span className={`glyph ${s.tGlyphs}`}>
                  <span style={{ color: bodyByKey(t.transit).color }}>{bodyByKey(t.transit).glyph}</span>{' '}
                  <span style={{ color: t.color }}>{t.glyph}</span>{' '}
                  {t.natal === 'asc' || t.natal === 'mc' ? <span className={s.angleTag}>{t.natal === 'asc' ? 'AC' : 'MC'}</span> : bodyByKey(t.natal as BodyKey).glyph}
                </span>
                <span className={s.tMain}>
                  <span className={s.tTitle}>
                    {bodyByKey(t.transit).name} {t.kind} your {t.natal === 'asc' ? 'Ascendant' : bodyByKey(t.natal as BodyKey).name}
                  </span>
                  <span className={s.tLine}>{transitLine(t.transit, t.kind, t.natal)}</span>
                </span>
                <span className={`mono ${s.orb}`}>{t.orb.toFixed(1)}°</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={s.section}>
        <h2 className={`display ${s.h2}`}>The sky now</h2>
        <ul className={s.sky}>
          {sky.map((p) => {
            const b = bodyByKey(p.body);
            const sign = SIGNS[Math.floor(p.lon / 30)];
            return (
              <li key={p.body} className={s.skyItem}>
                <span className={`glyph ${s.skyGlyph}`} style={{ color: b.color }}>
                  {b.glyph}
                </span>
                <span className={s.skyName}>{b.name}</span>
                <span className={s.skySign}>
                  <span className="glyph">{sign.glyph}</span> {sign.name}
                </span>
                <span className="mono">
                  {formatDegree(p.lon)}
                  {p.retrograde && <span className={s.retro}> ℞</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

/** The Moon as it looks tonight: the lit part and the shadow line follow the phase angle. */
function MoonGlyph({ angle }: { angle: number }) {
  const r = 80;
  const a = (angle * Math.PI) / 180;
  const rx = Math.abs(r * Math.cos(a)).toFixed(2);
  const waxing = angle < 180;
  const gibbous = angle > 90 && angle < 270;
  // Outer limb: right side while waxing, left while waning. The terminator bulges toward the dark side when gibbous.
  const limbSweep = waxing ? 1 : 0;
  const termSweep = waxing ? (gibbous ? 1 : 0) : gibbous ? 0 : 1;
  const d = `M0 ${-r} A${r} ${r} 0 0 ${limbSweep} 0 ${r} A${rx} ${r} 0 0 ${termSweep} 0 ${-r} Z`;
  return (
    <svg className={s.moon} viewBox="-120 -120 240 240" role="img" aria-label="Tonight’s Moon">
      <defs>
        <radialGradient id="moonLit" cx="40%" cy="38%">
          <stop offset="0%" stopColor="#fffdf5" />
          <stop offset="100%" stopColor="#efe6c8" />
        </radialGradient>
      </defs>
      <circle r={r + 10} fill="none" stroke="var(--line)" />
      <circle r={r} fill="#232a58" />
      <path d={d} fill="url(#moonLit)" />
    </svg>
  );
}
