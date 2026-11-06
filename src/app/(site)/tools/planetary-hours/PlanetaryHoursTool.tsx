'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { bodyByKey } from '@/lib/astro/constants';
import { HOUR_MEANING } from '@/lib/astro/interpretations/cycles';
import { CHALDEAN, addDays, planetaryDay } from '@/lib/astro/timing';
import { loadProfile, EXAMPLE_PROFILE } from '@/lib/profile';
import { Blank, CityField, Field, PointMark, Reading, Readings, ResultHead, partStyles as p, dateLabel, isoDate, timeLabel, useCityParam, useParam } from '../_tool/parts';

const length = (ms: number) => `${Math.floor(ms / 60000)} min`;

export default function PlanetaryHoursTool() {
  const [home, setHome] = useState<typeof EXAMPLE_PROFILE.city | null>(null);
  useEffect(() => setHome((loadProfile() ?? EXAMPLE_PROFILE).city), []);
  const [city, setCity] = useCityParam('pc', home);
  const [dateParam, setDate] = useParam('date');
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  const tz = city?.timeZone ?? 'UTC';
  // Without a chosen date, use the planetary day we are in now: before sunrise, that is still yesterday's.
  const date = useMemo(() => {
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) return dateParam;
    if (!city || !now) return null;
    const today = isoDate(now, tz);
    const d = planetaryDay(today, city.lat, city.lon, tz);
    return d && now < d.sunrise ? addDays(today, -1) : today;
  }, [dateParam, city, now, tz]);
  const day = useMemo(() => (date && city ? planetaryDay(date, city.lat, city.lon, tz) : undefined), [date, city, tz]);
  if (!city || !now || !date || day === undefined) return <Blank />;

  const current = day?.hours.find((h) => h.start <= now && h.end > now) ?? null;

  return (
    <>
      <div className={p.controls}>
        <CityField id="ph-city" label="City" value={city} onChange={setCity} />
        <Field label="Date" htmlFor="ph-date">
          <input id="ph-date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value || null)} />
        </Field>
        {dateParam && (
          <button type="button" className="nm-btn nm-btn-outline" onClick={() => setDate(null)}>
            Now
          </button>
        )}
      </div>

      {!day ? (
        <ResultHead kicker={dateLabel(new Date(`${date}T12:00:00Z`))} title={`No sunrise or sunset in ${city.name} that day`}>
          <p>In polar day or polar night the Sun never crosses the horizon, so there is no day and night to divide. Planetary hours are unavailable for this date and place.</p>
        </ResultHead>
      ) : (
        <>
          <ResultHead kicker={`${dateLabel(day.sunrise, tz)} in ${city.name}`} title={`A ${bodyByKey(day.ruler).name} day${current ? `, ${bodyByKey(current.planet).name} hour now` : ''}`}>
            <p>{HOUR_MEANING[day.ruler].day}</p>
          </ResultHead>

          <div className={p.tiles}>
            <div className={p.tile} style={{ ['--el' as string]: bodyByKey(day.ruler).color }}>
              <div className={p.tileHead}>
                <PointMark k={day.ruler} size={44} />
                <p className={p.smallLabel}>Ruler of the day</p>
              </div>
              <p className={p.tileSign}>{bodyByKey(day.ruler).name}</p>
              <p className={p.tileSub}>
                Sunrise {timeLabel(day.sunrise, tz)}, sunset {timeLabel(day.sunset, tz)}
              </p>
            </div>
            {current && (
              <div className={p.tile} style={{ ['--el' as string]: bodyByKey(current.planet).color }}>
                <div className={p.tileHead}>
                  <PointMark k={current.planet} size={44} />
                  <p className={p.smallLabel}>Hour now</p>
                </div>
                <p className={p.tileSign}>{bodyByKey(current.planet).name}</p>
                <p className={p.tileSub}>
                  Until {timeLabel(current.end, tz)}, {Math.max(1, Math.round((current.end.getTime() - now.getTime()) / 60000))} min left
                </p>
              </div>
            )}
            <div className={p.tile} style={{ ['--el' as string]: 'var(--rule)' }}>
              <p className={p.smallLabel}>Hour lengths</p>
              <p className={p.tileSign}>{length(day.hours[0].end.getTime() - day.hours[0].start.getTime())}</p>
              <p className={p.tileSub}>Each day hour. Each night hour is {length(day.hours[12].end.getTime() - day.hours[12].start.getTime())}.</p>
            </div>
          </div>

          {current && (
            <Readings>
              <Reading kicker="This hour" title={<><PointMark k={current.planet} size={30} /> {bodyByKey(current.planet).name} hour</>}>
                <p>{HOUR_MEANING[current.planet].hour}</p>
                <p>
                  <strong>Good for:</strong> {HOUR_MEANING[current.planet].goodFor.join(', ')}.
                </p>
                <p>
                  <strong>Hold off on:</strong> {HOUR_MEANING[current.planet].holdOff.join(', ')}.
                </p>
              </Reading>
            </Readings>
          )}

          <div className={p.scroll}>
            <table className={p.table}>
              <thead>
                <tr>
                  <th>Hour</th>
                  <th>Planet</th>
                  <th>Starts</th>
                  <th>Ends</th>
                  <th>Good for</th>
                </tr>
              </thead>
              <tbody>
                {day.hours.map((h, i) => (
                  <tr key={i} data-current={h === current}>
                    <td>
                      {h.night ? 'Night' : 'Day'} {(i % 12) + 1}
                    </td>
                    <td>
                      <span className={p.cellRow}>
                        <PointMark k={h.planet} size={24} /> {bodyByKey(h.planet).name}
                      </span>
                    </td>
                    <td>{timeLabel(h.start, tz)}</td>
                    <td>{timeLabel(h.end, tz)}</td>
                    <td>{HOUR_MEANING[h.planet].goodFor.slice(0, 2).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className={p.block}>
        <ResultHead kicker="The seven hours" title="What each planet’s hour suits">
          <p>The hours run in the old Chaldean order, slowest planet to fastest: {CHALDEAN.map((k) => bodyByKey(k).name).join(', ')}, then around again.</p>
        </ResultHead>
        <Readings>
          {CHALDEAN.map((k) => (
            <Reading key={k} title={<><PointMark k={k} size={30} /> {bodyByKey(k).name}</>}>
              <p>{HOUR_MEANING[k].hour}</p>
              <p>
                <strong>Good for:</strong> {HOUR_MEANING[k].goodFor.join(', ')}.
              </p>
              <p>
                <strong>Hold off on:</strong> {HOUR_MEANING[k].holdOff.join(', ')}.
              </p>
            </Reading>
          ))}
        </Readings>
      </div>

      <div className={p.actions}>
        <Link href="/today" className="nm-btn nm-btn-primary">
          Your daily horoscope
        </Link>
        <Link href="/tools/transits" className="nm-btn nm-btn-outline">
          Transits for any date
        </Link>
      </div>
    </>
  );
}
