'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import ChartWheel from '@/components/ChartWheel';
import { useChart } from '@/components/useChart';
import { chartAt } from '@/lib/astro/chart';
import { bodyByKey } from '@/lib/astro/constants';
import { IN_HOUSE, ordinal } from '@/lib/astro/interpretations';
import { SOLAR_RETURN_ASC, SOLAR_RETURN_MOON_SIGN, SOLAR_RETURN_SUN_HOUSE } from '@/lib/astro/interpretations/returns';
import { utcOffsetLabel } from '@/lib/astro/time';
import { solarReturn } from '@/lib/astro/timing';
import { Blank, CityField, Note, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, dateLabel, degLabel, signName, signOfLon, timeLabel, useCityParam, useParam, usePerson } from '../_tool/parts';

export default function SolarReturnTool() {
  const { profile, isExample, choose } = usePerson();
  const natal = useChart(profile);
  const [yearParam, setYear] = useParam('y');
  const [city, setCity] = useCityParam('pc', profile?.city ?? null);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const sunLon = natal?.placements.find((x) => x.body === 'sun')!.lon ?? null;
  // Default: the solar year you are in now (the most recent return).
  const year = useMemo(() => {
    if (yearParam && /^\d{4}$/.test(yearParam)) return Number(yearParam);
    if (!natal || sunLon === null || !now) return null;
    const y = now.getUTCFullYear();
    return solarReturn(sunLon, natal.utc, y) > now ? y - 1 : y;
  }, [yearParam, natal, sunLon, now]);
  const moment = useMemo(() => (natal && sunLon !== null && year ? solarReturn(sunLon, natal.utc, year) : null), [natal, sunLon, year]);
  const sr = useMemo(() => (moment && city ? chartAt(moment, city.lat, city.lon) : null), [moment, city]);
  if (!profile || !natal || !moment || !sr || !city || !year) return <Blank />;

  const tz = city.timeZone;
  const ascSign = Math.floor(sr.asc! / 30);
  const sun = sr.placements.find((x) => x.body === 'sun')!;
  const moon = sr.placements.find((x) => x.body === 'moon')!;
  const first = profile.name.split(' ')[0];
  const angular = sr.placements.filter((x) => x.house && [1, 4, 7, 10].includes(x.house));

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <div className={p.controls}>
        <div className={p.field}>
          <span className={p.smallLabel}>Year</span>
          <div className={p.actions} style={{ margin: 0 }}>
            <button type="button" className="nm-btn nm-btn-outline" onClick={() => setYear(String(year - 1))} aria-label="Previous year">
              {year - 1}
            </button>
            <span className={p.yearNow}>{year}</span>
            <button type="button" className="nm-btn nm-btn-outline" onClick={() => setYear(String(year + 1))} aria-label="Next year">
              {year + 1}
            </button>
          </div>
        </div>
        <CityField id="sr-city" label="Where you spend your birthday" value={city} onChange={setCity} />
      </div>

      <ResultHead kicker={`Solar return ${year}`} title={`${first}’s year ahead: ${signName(ascSign)} rising`}>
        <p>
          The Sun returns to {degLabel(sunLon!)} {signName(signOfLon(sunLon!))} on {dateLabel(moment, tz)} at {timeLabel(moment, tz)} in {city.name} ({utcOffsetLabel(moment, tz)}). This chart sets the tone until your next birthday.
        </p>
      </ResultHead>
      {!profile.time && <Note>Without a birth time your natal Sun could be off by up to half a degree, which can move this moment by about twelve hours and change the rising sign. Add your birth time for an exact chart.</Note>}

      <Tiles>
        <SignTile k="asc" label="Return rising sign" sign={ascSign} lon={sr.asc!} sub={<p>The mood and face of the year.</p>} />
        <SignTile k="sun" label={`Sun in the ${ordinal(sun.house!)} house`} sign={sun.sign} lon={sun.lon} sub={<p>Where your year’s focus goes.</p>} />
        <SignTile k="moon" label={`Moon in the ${ordinal(moon.house!)} house`} sign={moon.sign} lon={moon.lon} sub={<p>The emotional weather of the year.</p>} />
      </Tiles>

      <div className={p.wheel}>
        <ChartWheel chart={sr} name={`Solar return ${year}`} ground="light" />
      </div>

      <Readings>
        <Reading kicker="Rising sign" title={<><SignMark sign={ascSign} /> {signName(ascSign)} rising this year</>}>
          <p>{SOLAR_RETURN_ASC[ascSign]}</p>
        </Reading>
        <Reading kicker="Sun" title={`Sun in the ${ordinal(sun.house!)} house`}>
          <p>{SOLAR_RETURN_SUN_HOUSE[sun.house! - 1]}</p>
        </Reading>
        <Reading kicker="Moon" title={<><SignMark sign={moon.sign} /> Moon in {signName(moon.sign)}</>}>
          <p>{SOLAR_RETURN_MOON_SIGN[moon.sign]}</p>
        </Reading>
        <Reading kicker="Moon" title={`Moon in the ${ordinal(moon.house!)} house`}>
          <p>{IN_HOUSE.moon[moon.house! - 1]}</p>
        </Reading>
        {angular
          .filter((x) => x.body !== 'sun' && x.body !== 'moon')
          .map((x) => (
            <Reading key={x.body} kicker="On an angle" title={<><PointMark k={x.body} size={30} /> {bodyByKey(x.body).name} in the {ordinal(x.house!)} house</>}>
              <p>Planets in the 1st, 4th, 7th and 10th houses of a solar return speak loudest during the year.</p>
              <p>{IN_HOUSE[x.body][x.house! - 1]}</p>
            </Reading>
          ))}
      </Readings>

      <div className={p.block}>
        <ResultHead kicker="The chart" title="Every planet in your solar return" />
        <div className={p.scroll}>
          <table className={p.table}>
            <thead>
              <tr>
                <th>Planet</th>
                <th>Sign</th>
                <th>Degree</th>
                <th>House</th>
              </tr>
            </thead>
            <tbody>
              {sr.placements.map((x) => (
                <tr key={x.body}>
                  <td>
                    <span className={p.cellRow}>
                      <PointMark k={x.body} size={24} /> {bodyByKey(x.body).name}
                      {x.retrograde && <span className={p.retro}>R</span>}
                    </span>
                  </td>
                  <td>
                    <span className={p.cellRow}>
                      <SignMark sign={x.sign} size={16} /> {signName(x.sign)}
                    </span>
                  </td>
                  <td>{degLabel(x.lon)}</td>
                  <td>{ordinal(x.house!)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={p.actions}>
        <Link href="/tools/lunar-return" className="nm-btn nm-btn-primary">
          Your lunar returns
        </Link>
        <Link href="/tools/progressions" className="nm-btn nm-btn-outline">
          Your progressions
        </Link>
      </div>
    </>
  );
}
