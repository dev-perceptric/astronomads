'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useChart } from '@/components/useChart';
import { positionsAt } from '@/lib/astro/chart';
import { IN_HOUSE, IN_SIGN, ordinal } from '@/lib/astro/interpretations';
import { RETRO } from '@/lib/astro/interpretations/returns';
import { MARS_DETAIL, VENUS_DETAIL, VENUS_MARS_LINK } from '@/lib/astro/interpretations/signDetails';
import { signForDay } from '@/lib/astro/timing';
import { relation } from '@/lib/zodiac/signs';
import { Blank, Note, PersonBar, PointMark, Reading, Readings, ResultHead, SignTile, Tiles, partStyles as p, signName, timeLabel, usePerson } from '../_tool/parts';

export default function VenusMarsTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  if (!profile || !chart || !now) return <Blank />;

  const venus = chart.placements.find((x) => x.body === 'venus')!;
  const mars = chart.placements.find((x) => x.body === 'mars')!;
  const sky = positionsAt(now);
  const vNow = sky.find((x) => x.body === 'venus')!;
  const mNow = sky.find((x) => x.body === 'mars')!;
  const changes = chart.timeKnown
    ? []
    : (['Venus', 'Mars'] as const)
        .map((e) => ({ e, r: signForDay(e, profile.date, profile.city.timeZone) }))
        .filter((x) => !x.r.certain);
  const rel = relation(venus.sign, mars.sign);
  const first = profile.name.split(' ')[0];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Love and drive" title={`${first}: Venus in ${signName(venus.sign)}, Mars in ${signName(mars.sign)}`}>
        <p>Venus shows how you love, what you find beautiful and what you need to feel cared for. Mars shows how you go after what you want, how you fight and what fires you up.</p>
      </ResultHead>

      {changes.map(({ e, r }) =>
        r.certain ? null : (
          <Note key={e}>
            {e} moved from {signName(r.from)} into {signName(r.to)} at {timeLabel(r.change, profile.city.timeZone)} local time on your birth day. Add your birth time to know which side you fall on.
          </Note>
        ),
      )}

      <Tiles>
        <SignTile k="venus" label="Your Venus" sign={venus.sign} lon={venus.lon} sub={<p>{venus.house ? `${ordinal(venus.house)} house` : 'House needs a birth time'}{venus.retrograde ? ', retrograde' : ''}</p>} />
        <SignTile k="mars" label="Your Mars" sign={mars.sign} lon={mars.lon} sub={<p>{mars.house ? `${ordinal(mars.house)} house` : 'House needs a birth time'}{mars.retrograde ? ', retrograde' : ''}</p>} />
        <div className={p.tile} style={{ ['--el' as string]: 'var(--p-venus)' }}>
          <p className={p.smallLabel}>In the sky today</p>
          <p className={p.listMain}>
            <span className={p.cellRow}>
              <PointMark k="venus" size={26} /> Venus in {signName(Math.floor(vNow.lon / 30))}
              {vNow.retrograde ? ', retrograde' : ''}
            </span>
          </p>
          <p className={p.listMain}>
            <span className={p.cellRow}>
              <PointMark k="mars" size={26} /> Mars in {signName(Math.floor(mNow.lon / 30))}
              {mNow.retrograde ? ', retrograde' : ''}
            </span>
          </p>
        </div>
      </Tiles>

      <Readings>
        <Reading kicker="Venus" title={<><PointMark k="venus" size={30} /> Venus in {signName(venus.sign)}</>}>
          <p>{IN_SIGN.venus[venus.sign]}</p>
        </Reading>
        <Reading kicker="Venus" title="What attracts you">
          <p>{VENUS_DETAIL[venus.sign].attracts}</p>
        </Reading>
        <Reading kicker="Venus" title="How you show love">
          <p>{VENUS_DETAIL[venus.sign].shows}</p>
        </Reading>
        <Reading kicker="Venus" title="What you need in love">
          <p>{VENUS_DETAIL[venus.sign].needs}</p>
        </Reading>
        <Reading kicker="Mars" title={<><PointMark k="mars" size={30} /> Mars in {signName(mars.sign)}</>}>
          <p>{IN_SIGN.mars[mars.sign]}</p>
        </Reading>
        <Reading kicker="Mars" title="How you chase goals">
          <p>{MARS_DETAIL[mars.sign].drive}</p>
        </Reading>
        <Reading kicker="Mars" title="How you handle anger">
          <p>{MARS_DETAIL[mars.sign].anger}</p>
        </Reading>
        <Reading kicker="Mars" title="Desire">
          <p>{MARS_DETAIL[mars.sign].desire}</p>
        </Reading>
        <Reading kicker="Together" title={`Venus and Mars: ${rel.label.toLowerCase()}`}>
          <p>{VENUS_MARS_LINK[rel.kind]}</p>
        </Reading>
        {venus.house && (
          <Reading kicker="Venus house" title={`Venus in the ${ordinal(venus.house)} house`}>
            <p>{IN_HOUSE.venus[venus.house - 1]}</p>
          </Reading>
        )}
        {mars.house && (
          <Reading kicker="Mars house" title={`Mars in the ${ordinal(mars.house)} house`}>
            <p>{IN_HOUSE.mars[mars.house - 1]}</p>
          </Reading>
        )}
        {venus.retrograde && (
          <Reading kicker="Retrograde" title="Born with Venus retrograde">
            <p>{RETRO.venus.natal}</p>
          </Reading>
        )}
        {mars.retrograde && (
          <Reading kicker="Retrograde" title="Born with Mars retrograde">
            <p>{RETRO.mars.natal}</p>
          </Reading>
        )}
      </Readings>

      <div className={p.actions}>
        <Link href="/compatibility" className="nm-btn nm-btn-primary">
          Compare your chart with someone
        </Link>
        <Link href="/tools/big-three" className="nm-btn nm-btn-outline">
          Your big three
        </Link>
      </div>
    </>
  );
}
