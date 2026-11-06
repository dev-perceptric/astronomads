'use client';

import Link from 'next/link';
import { Glyph } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { BODIES, SIGNS, type BodyKey } from '@/lib/astro/constants';
import { IN_HOUSE, IN_SIGN, POINT_INFO, aspectReading, ordinal, pointName } from '@/lib/astro/interpretations';
import { RULER_HOUSE, RULER_SIGN } from '@/lib/astro/interpretations/signDetails';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import { Blank, PersonBar, PointMark, Reading, Readings, ResultHead, SignTile, Tiles, partStyles as p, degLabel, signName, usePerson } from '../_tool/parts';

const keyOf = (name: string) => BODIES.find((b) => b.name === name)!.key;

export default function ChartRulerTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  if (!profile || !chart) return <Blank />;
  const first = profile.name.split(' ')[0];

  if (chart.asc === null) {
    return (
      <>
        <PersonBar profile={profile} isExample={isExample} choose={choose} />
        <ResultHead kicker="Your chart ruler" title="Add a birth time to find your chart ruler">
          <p>The chart ruler is the planet that rules your rising sign, and the rising sign needs the time you were born. Use Change above to add it.</p>
        </ResultHead>
      </>
    );
  }

  const ascSign = Math.floor(chart.asc / 30);
  const facts = SIGN_FACTS[ascSign];
  const rulers: BodyKey[] = [keyOf(facts.ruler), ...(facts.modernRuler ? [keyOf(facts.modernRuler)] : [])];
  const main = chart.placements.find((x) => x.body === rulers[0])!;
  const aspects = chart.aspects.filter((a) => a.a === main.body || a.b === main.body);

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Your chart ruler" title={`${first}: ${signName(ascSign)} rising, ruled by ${pointName(main.body)}`}>
        <p>{POINT_INFO[main.body].text}</p>
      </ResultHead>

      <Tiles>
        <SignTile k="asc" label="Rising sign" sign={ascSign} lon={chart.asc} />
        {rulers.map((r, i) => {
          const pl = chart.placements.find((x) => x.body === r)!;
          return (
            <SignTile key={r} k={r} label={i === 0 ? `Chart ruler: ${pointName(r)}` : `Modern co-ruler: ${pointName(r)}`} sign={pl.sign} lon={pl.lon} sub={<p>{pl.house ? `In your ${ordinal(pl.house)} house` : ''}{pl.retrograde ? ', retrograde' : ''}</p>} />
          );
        })}
      </Tiles>

      <Readings>
        <Reading kicker="The ruler’s sign" title={<><PointMark k={main.body} size={30} /> {pointName(main.body)} in {signName(main.sign)}</>}>
          <p>{RULER_SIGN[main.sign]}</p>
          <p>{IN_SIGN[main.body][main.sign]}</p>
        </Reading>
        {main.house && (
          <Reading kicker="The ruler’s house" title={`Chart ruler in the ${ordinal(main.house)} house`}>
            <p>{RULER_HOUSE[main.house - 1]}</p>
            <p>{IN_HOUSE[main.body][main.house - 1]}</p>
          </Reading>
        )}
        {main.retrograde && (
          <Reading kicker="Retrograde" title={`${pointName(main.body)} retrograde at birth`}>
            <p>Your chart ruler was moving backward from Earth’s view when you were born. Its themes tend to work inward first: you think things over, revisit them and find your own way before you show them to the world. <Link href="/tools/retrogrades">Read more on retrogrades</Link>.</p>
          </Reading>
        )}
        {rulers[1] &&
          (() => {
            const co = chart.placements.find((x) => x.body === rulers[1])!;
            return (
              <Reading kicker="Modern co-ruler" title={<><PointMark k={co.body} size={30} /> {pointName(co.body)} in {signName(co.sign)}</>}>
                <p>Modern astrology adds {pointName(co.body)} as a second ruler of {signName(ascSign)}. Read it as an undertone beside {pointName(main.body)}.</p>
                <p>{IN_SIGN[co.body][co.sign]}</p>
                {co.house && <p>{IN_HOUSE[co.body][co.house - 1]}</p>}
              </Reading>
            );
          })()}
      </Readings>

      {aspects.length > 0 && (
        <div className={p.block}>
          <ResultHead kicker="Aspects" title={`What ${pointName(main.body)} meets in your chart`} />
          <ul className={p.list}>
            {aspects.map((a, i) => {
              const other = a.a === main.body ? a.b : a.a;
              return (
                <li key={i}>
                  <span className={p.listDate}>
                    <span className={p.cellRow}>
                      <PointMark k={main.body} size={24} /> <Glyph name={a.def.kind} size={14} color={a.def.color} weight={2} /> <PointMark k={other} size={24} />
                    </span>
                  </span>
                  <div className={p.listMain}>
                    <p>
                      {pointName(main.body)} {a.def.kind} {pointName(other)}
                    </p>
                    <p className={p.listMeta}>Orb {degLabel(a.orb)}</p>
                    <p className={p.listMeta} style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--foreground)' }}>
                      {aspectReading(a)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className={p.actions}>
        <Link href="/chart" className="nm-btn nm-btn-primary">
          See the full birth chart
        </Link>
        <Link href={`/zodiac/${SIGNS[ascSign].key}`} className="nm-btn nm-btn-outline">
          Read about {signName(ascSign)}
        </Link>
        <Link href="/tools/rising-sign" className="nm-btn nm-btn-outline">
          More on your rising sign
        </Link>
      </div>
    </>
  );
}
