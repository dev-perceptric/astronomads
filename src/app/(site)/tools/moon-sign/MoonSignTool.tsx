'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useChart } from '@/components/useChart';
import { moonPhase, positionsAt } from '@/lib/astro/chart';
import { SIGNS } from '@/lib/astro/constants';
import { IN_HOUSE, IN_SIGN, ordinal } from '@/lib/astro/interpretations';
import { MOON_DETAIL } from '@/lib/astro/interpretations/signDetails';
import { MOON_DAYS } from '@/lib/astro/readings';
import { signForDay } from '@/lib/astro/timing';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import { Blank, Note, PersonBar, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, signName, timeLabel, usePerson } from '../_tool/parts';

export default function MoonSignTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!profile || !chart || !now) return <Blank />;

  const moon = chart.placements.find((x) => x.body === 'moon')!;
  const day = chart.timeKnown ? null : signForDay('Moon', profile.date, profile.city.timeZone);
  const unsure = day && !day.certain ? day : null;
  const phase = moonPhase(chart.utc);
  const todayLon = positionsAt(now).find((x) => x.body === 'moon')!.lon;
  const todaySign = Math.floor(todayLon / 30);
  const todayPhase = moonPhase(now);
  const d = MOON_DETAIL[moon.sign];
  const first = profile.name.split(' ')[0];
  const sameAsToday = todaySign === moon.sign;

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Your Moon sign" title={unsure ? `${first}: Moon in ${signName(unsure.from)} or ${signName(unsure.to)}` : `${first}: Moon in ${signName(moon.sign)}`}>
        <p>{IN_SIGN.moon[moon.sign]}</p>
      </ResultHead>

      {unsure && (
        <Note>
          The Moon left {signName(unsure.from)} and entered {signName(unsure.to)} at {timeLabel(unsure.change, profile.city.timeZone)} local time in {profile.city.name} on your birth day. Born before then, your Moon is in {signName(unsure.from)}. Born after, it is in {signName(unsure.to)}. The reading below uses noon; add your birth time to be exact.
        </Note>
      )}

      <Tiles>
        <SignTile k="moon" label="Moon sign" sign={moon.sign} lon={chart.timeKnown ? moon.lon : undefined} sub={<p>{SIGN_FACTS[moon.sign].element[0].toUpperCase() + SIGN_FACTS[moon.sign].element.slice(1)} Moon, ruled by {SIGN_FACTS[moon.sign].ruler}{moon.house ? `, in your ${ordinal(moon.house)} house` : ''}.</p>} />
        <div className={p.tile} style={{ ['--el' as string]: 'var(--p-moon)' }}>
          <p className={p.smallLabel}>Moon phase at birth</p>
          <p className={p.tileSign}>{phase.name}</p>
          <p className={p.tileDeg}>{Math.round(phase.illumination * 100)}% lit</p>
          <p className={p.tileSub}>{phase.angle < 180 ? 'A waxing Moon: you tend to build, start and reach outward.' : 'A waning Moon: you tend to refine, share what you know and let go with grace.'}</p>
        </div>
        <SignTile label="The Moon today" sign={todaySign} lon={todayLon} sub={<p>{todayPhase.name}. {sameAsToday ? 'The Moon is back in your Moon sign today, a good day to tend your own needs.' : MOON_DAYS[todaySign].line}</p>} />
      </Tiles>

      <Readings>
        <Reading kicker="What you need" title={<><SignMark sign={moon.sign} /> Your {signName(moon.sign)} Moon needs</>}>
          <p>{d.needs}</p>
        </Reading>
        <Reading kicker="Comfort" title="What soothes you">
          <p>{d.comfort}</p>
        </Reading>
        <Reading kicker="Stress" title="When life gets hard">
          <p>{d.stress}</p>
        </Reading>
        <Reading kicker="Love" title="How you love">
          <p>{d.love}</p>
        </Reading>
        {moon.house && (
          <Reading kicker="House" title={`Moon in the ${ordinal(moon.house)} house`}>
            <p>{IN_HOUSE.moon[moon.house - 1]}</p>
          </Reading>
        )}
      </Readings>

      <div className={p.actions}>
        <Link href="/tools/big-three" className="nm-btn nm-btn-primary">
          See your big three
        </Link>
        <Link href="/today" className="nm-btn nm-btn-outline">
          Today’s Moon for you
        </Link>
        <Link href={`/zodiac/${SIGNS[moon.sign].key}`} className="nm-btn nm-btn-outline">
          All about {signName(moon.sign)}
        </Link>
      </div>
    </>
  );
}
