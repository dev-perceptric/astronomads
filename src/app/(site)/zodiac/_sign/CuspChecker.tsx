'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as Astronomy from 'astronomy-engine';
import CityPicker from '@/components/CityPicker';
import { Glyph, type SignKey } from '@/components/Glyph';
import { formatDegree } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS } from '@/lib/astro/constants';
import { sunSignForDay } from '@/lib/astro/ingress';
import { localToUtc } from '@/lib/astro/time';
import type { City } from '@/lib/cities';
import s from './zodiac.module.css';

type Result = { sign: number; lon: number; exact: boolean } | { cusp: true; from: number; to: number; ingress: Date };

/**
 * "Is your Sun in Aries?" Checks the real Sun position for a birthday, and asks for time and place on a
 * cusp day. Without a `sign` it simply finds your sign (the zodiac hub).
 */
export default function CuspChecker({ sign }: { sign?: number }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [city, setCity] = useState<City | null>(null);
  const [more, setMore] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState('');
  const here = sign === undefined ? null : SIGNS[sign];

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return setError('Add your birth date.');
    if (more && time && city) {
      const lon = Astronomy.SunPosition(localToUtc(date, time, city.timeZone)).elon;
      return setResult({ sign: Math.floor(lon / 30), lon, exact: true });
    }
    const r = sunSignForDay(date);
    if (r.certain) return setResult({ sign: r.sign, lon: r.lon, exact: false });
    setMore(true);
    setResult({ cusp: true, from: r.from, to: r.to, ingress: r.ingress });
  };

  return (
    <div className={s.checker}>
      <form className={s.checkForm} onSubmit={check} noValidate>
        <div className="field">
          <label htmlFor="ck-date">Birth date</label>
          <input id="ck-date" className="input" type="date" min="1700-01-01" max="2100-12-31" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {more && (
          <>
            <div className="field">
              <label htmlFor="ck-time">Birth time</label>
              <input id="ck-time" className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="ck-city">Birth city</label>
              <CityPicker inputId="ck-city" value={city} onChange={setCity} />
            </div>
          </>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className={s.checkActions}>
          <button className="nm-btn nm-btn-primary" type="submit">
            Check my Sun
          </button>
          {!more && (
            <button type="button" className={s.textBtn} onClick={() => setMore(true)}>
              Add time and city
            </button>
          )}
        </div>
      </form>

      <div className={s.checkResult} aria-live="polite">
        {!result && (
          <div className={s.resultIdle}>
            {here ? <Glyph name={here.key as SignKey} size={88} color={ELEMENT_COLORS[here.element]} weight={1.2} /> : <Glyph name="sun" size={88} color="var(--p-sun)" weight={1.2} />}
            <p>Your result shows here.</p>
          </div>
        )}
        {result && 'cusp' in result && (
          <div className={s.resultCard}>
            <p className={s.resultLabel}>Born on a cusp day</p>
            <p className={s.resultTitle}>
              {SIGNS[result.from].name} or {SIGNS[result.to].name}
            </p>
            <p className={s.resultText}>
              The Sun moved into {SIGNS[result.to].name} on this day at{' '}
              {result.ingress.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC. Add your birth time and city to know for sure.
            </p>
          </div>
        )}
        {result && 'sign' in result && (
          <div className={s.resultCard}>
            <Glyph name={SIGNS[result.sign].key as SignKey} size={64} color={ELEMENT_COLORS[SIGNS[result.sign].element]} weight={1.4} />
            <p className={s.resultLabel}>{here && result.sign === sign ? 'Yes' : 'Your Sun is in'}</p>
            <p className={s.resultTitle}>
              {here && result.sign === sign ? `Your Sun is in ${here.name}` : SIGNS[result.sign].name}
            </p>
            <p className={s.resultText}>
              {result.exact ? `Exactly ${formatDegree(result.lon)} ${SIGNS[result.sign].name}.` : `About ${Math.floor(result.lon % 30)}° ${SIGNS[result.sign].name} on that day.`}{' '}
              Your Moon, Rising sign and houses tell the rest of the story.
            </p>
            <div className={s.checkActions}>
              <Link href="/#start" className="nm-btn nm-btn-primary">
                Draw my full chart
              </Link>
              {(!here || result.sign !== sign) && (
                <Link href={`/zodiac/${SIGNS[result.sign].key}`} className={s.textBtn}>
                  Read about {SIGNS[result.sign].name}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
