'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useChart } from '@/components/useChart';
import { ELEMENT_COLORS, SIGNS } from '@/lib/astro/constants';
import { IN_SIGN } from '@/lib/astro/interpretations';
import { RISING_DETAIL } from '@/lib/astro/interpretations/signDetails';
import { risingTimeline } from '@/lib/astro/timing';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import { Blank, Note, PersonBar, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, partStyles as p, signName, timeLabel, usePerson } from '../_tool/parts';

const mins = (ms: number) => {
  const m = Math.round(ms / 60000);
  return m >= 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m} min`;
};

export default function RisingSignTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  const timeline = useMemo(() => (profile ? risingTimeline(profile.date, profile.city.lat, profile.city.lon, profile.city.timeZone) : []), [profile]);
  if (!profile || !chart) return <Blank />;

  const tz = profile.city.timeZone;
  const asc = chart.asc;
  const sign = asc === null ? null : Math.floor(asc / 30);
  const mcSign = chart.mc === null ? null : Math.floor(chart.mc / 30);
  const total = timeline.length ? timeline[timeline.length - 1].end.getTime() - timeline[0].start.getTime() : 1;
  const first = profile.name.split(' ')[0];
  const f = sign === null ? null : SIGN_FACTS[sign];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      {sign === null ? (
        <ResultHead kicker="Your rising sign" title="Add a birth time to find your rising sign">
          <p>The rising sign changes about every two hours, so it needs the time you were born. The timeline below shows every sign that rose on your birth day in {profile.city.name}, so you can see which ones are possible.</p>
        </ResultHead>
      ) : (
        <>
          <ResultHead kicker="Your rising sign" title={`${first}: ${signName(sign)} rising`}>
            <p>{IN_SIGN.asc[sign]}</p>
          </ResultHead>
          <Tiles>
            <SignTile k="asc" label="Rising sign" sign={sign} lon={asc!} sub={<p>{SIGN_FACTS[sign].element[0].toUpperCase() + SIGN_FACTS[sign].element.slice(1)}, {SIGN_FACTS[sign].mode}.</p>} />
            <div className={p.tile} style={{ ['--el' as string]: ELEMENT_COLORS[SIGNS[sign].element] }}>
              <p className={p.smallLabel}>Chart ruler</p>
              <p className={p.tileSign}>{f!.ruler}</p>
              <p className={p.tileSub}>
                The planet that rules {signName(sign)}
                {f!.modernRuler ? `, with ${f!.modernRuler} as the modern co-ruler` : ''}. <Link href="/tools/chart-ruler">Read your chart ruler</Link>
              </p>
            </div>
            {mcSign !== null && <SignTile k="mc" label="Midheaven" sign={mcSign} lon={chart.mc!} sub={<p>The top of your chart: your public path and calling.</p>} />}
          </Tiles>
          <Readings>
            <Reading kicker="First impression" title={<><SignMark sign={sign} /> How people see you</>}>
              <p>{RISING_DETAIL[sign].impression}</p>
            </Reading>
            <Reading kicker="Style" title="Your look and manner">
              <p>{RISING_DETAIL[sign].style}</p>
            </Reading>
            <Reading kicker="Approach" title="How you meet new things">
              <p>{RISING_DETAIL[sign].approach}</p>
            </Reading>
            <Reading kicker="Growth" title="Where you grow">
              <p>{RISING_DETAIL[sign].growth}</p>
            </Reading>
            {mcSign !== null && (
              <Reading kicker="Midheaven" title={<><SignMark sign={mcSign} /> Midheaven in {signName(mcSign)}</>}>
                <p>{IN_SIGN.mc[mcSign]}</p>
              </Reading>
            )}
          </Readings>
        </>
      )}

      <div className={p.block}>
        <ResultHead kicker="Your birth day" title={`Rising signs over ${profile.city.name}`}>
          <p>Every sign rises once a day. Some take under an hour and others more than three, depending on the sign and how far you are from the equator. Times are local to {profile.city.name}.</p>
        </ResultHead>
        <div className={p.strip} aria-hidden="true">
          {timeline.map((seg, i) => (
            <div key={i} data-on={seg.sign === sign} style={{ width: `${((seg.end.getTime() - seg.start.getTime()) / total) * 100}%`, ['--el' as string]: ELEMENT_COLORS[SIGNS[seg.sign].element] }} title={SIGNS[seg.sign].name}>
              {(seg.end.getTime() - seg.start.getTime()) / total > 0.035 && <SignMark sign={seg.sign} size={18} />}
            </div>
          ))}
        </div>
        <div className={p.stripTicks}>
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </div>
        <div className={p.scroll}>
          <table className={p.table}>
            <thead>
              <tr>
                <th>Rising sign</th>
                <th>From</th>
                <th>To</th>
                <th>Length</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((seg, i) => (
                <tr key={i} data-current={seg.sign === sign}>
                  <td>
                    <span className={p.cellRow}>
                      <SignMark sign={seg.sign} size={18} /> {SIGNS[seg.sign].name}
                    </span>
                  </td>
                  <td>{i === 0 ? 'Midnight' : timeLabel(seg.start, tz)}</td>
                  <td>{i === timeline.length - 1 ? 'Midnight' : timeLabel(seg.end, tz)}</td>
                  <td>{mins(seg.end.getTime() - seg.start.getTime())}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sign !== null && (
          <Note>
            You were born at {profile.time} with {signName(sign)} rising. If your birth time could be off by a few minutes, check how close it sits to the edge of this window in the table above.
          </Note>
        )}
      </div>

      <div className={p.actions}>
        <Link href="/tools/big-three" className="nm-btn nm-btn-primary">
          See your big three
        </Link>
        <Link href="/chart" className="nm-btn nm-btn-outline">
          Your full birth chart
        </Link>
      </div>
    </>
  );
}
