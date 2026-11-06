'use client';

import Link from 'next/link';
import type { PointKey } from '@/lib/astro/chart';
import { useChart } from '@/components/useChart';
import { ELEMENT_COLORS, SIGNS, type Element, type Mode } from '@/lib/astro/constants';
import { ELEMENT_LOW, ELEMENT_STRONG, MODE_STRONG, pointName } from '@/lib/astro/interpretations';
import { MODE_LOW, POLARITY, SIGNATURE } from '@/lib/astro/interpretations/signDetails';
import { Blank, PersonBar, PointMark, Reading, Readings, ResultHead, SignMark, partStyles as p, cap, signName, usePerson } from '../_tool/parts';

const ELEMENTS: Element[] = ['fire', 'earth', 'air', 'water'];
const MODES: Mode[] = ['cardinal', 'fixed', 'mutable'];
const MODE_COLOR: Record<Mode, string> = { cardinal: 'var(--asp-hard)', fixed: 'var(--asp-ease)', mutable: 'var(--asp-blend)' };

export default function ElementsTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  if (!profile || !chart) return <Blank />;

  const points: { k: PointKey; sign: number; w: number }[] = chart.placements.map((x) => ({ k: x.body, sign: x.sign, w: x.body === 'sun' || x.body === 'moon' ? 2 : 1 }));
  if (chart.asc !== null) points.push({ k: 'asc', sign: Math.floor(chart.asc / 30), w: 2 });
  const total = points.reduce((a, x) => a + x.w, 0);
  const el: Record<Element, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const md: Record<Mode, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const x of points) {
    el[SIGNS[x.sign].element] += x.w;
    md[SIGNS[x.sign].mode] += x.w;
  }
  const topEl = ELEMENTS.reduce((a, b) => (el[b] > el[a] ? b : a));
  const topMode = MODES.reduce((a, b) => (md[b] > md[a] ? b : a));
  const lowEls = ELEMENTS.filter((e) => el[e] <= 1);
  const lowModes = MODES.filter((m) => md[m] <= 1);
  const active = el.fire + el.air;
  const receptive = el.earth + el.water;
  const polarity = Math.abs(active - receptive) <= 1 ? 'even' : active > receptive ? 'active' : 'receptive';
  const signature = SIGNS.findIndex((x) => x.element === topEl && x.mode === topMode);
  const who = (pred: (sign: number) => boolean) => points.filter((x) => pred(x.sign));
  const first = profile.name.split(' ')[0];

  const Bar = ({ name, value, color, members }: { name: string; value: number; color: string; members: typeof points }) => (
    <div className={p.barRow}>
      <span className={p.barName}>{name}</span>
      <span className={p.bar}>
        <span style={{ width: `${(value / total) * 100}%`, ['--c' as string]: color }} />
      </span>
      <span className={p.barVal}>{value}</span>
      <span className={p.barWho}>
        {members.length === 0
          ? 'Nothing here'
          : members.map((m) => (
              <span key={m.k} className={p.cellRow} title={pointName(m.k)}>
                <PointMark k={m.k} size={22} />
              </span>
            ))}
      </span>
    </div>
  );

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Your balance" title={`${first}: mostly ${topEl}, mostly ${topMode}`}>
        <p>
          We count {total} points: the Sun, the Moon{chart.asc !== null ? ' and your rising sign' : ''} score 2 each, and every other planet scores 1. {chart.asc === null ? 'Add a birth time to count your rising sign too.' : ''}
        </p>
      </ResultHead>

      <div className={p.readings}>
        <div className={p.reading}>
          <p className={p.smallLabel}>Elements</p>
          <div className={p.bars}>
            {ELEMENTS.map((e) => (
              <Bar key={e} name={cap(e)} value={el[e]} color={ELEMENT_COLORS[e]} members={who((s) => SIGNS[s].element === e)} />
            ))}
          </div>
        </div>
        <div className={p.reading}>
          <p className={p.smallLabel}>Modes</p>
          <div className={p.bars}>
            {MODES.map((m) => (
              <Bar key={m} name={cap(m)} value={md[m]} color={MODE_COLOR[m]} members={who((s) => SIGNS[s].mode === m)} />
            ))}
          </div>
          <p className={p.smallLabel} style={{ marginTop: 20 }}>
            Polarity
          </p>
          <div className={p.bars}>
            <Bar name="Active" value={active} color="var(--astral)" members={who((s) => s % 2 === 0)} />
            <Bar name="Receptive" value={receptive} color="var(--stone)" members={who((s) => s % 2 === 1)} />
          </div>
        </div>
      </div>

      <Readings>
        <Reading kicker="Leading element" title={`Strong ${topEl}`}>
          <p>{ELEMENT_STRONG[topEl]}</p>
        </Reading>
        <Reading kicker="Leading mode" title={`Strong ${topMode}`}>
          <p>{MODE_STRONG[topMode]}</p>
        </Reading>
        <Reading kicker="Signature sign" title={<><SignMark sign={signature} /> {signName(signature)}</>}>
          <p>
            Your leading element ({topEl}) and leading mode ({topMode}) meet in {signName(signature)}. Many people feel a strong pull toward this sign, even when no planet sits in it.
          </p>
          <p>{SIGNATURE[signature]}</p>
        </Reading>
        <Reading kicker="Polarity" title={polarity === 'even' ? 'Active and receptive in balance' : polarity === 'active' ? 'More active than receptive' : 'More receptive than active'}>
          <p>{POLARITY[polarity]}</p>
        </Reading>
        {lowEls.map((e) => (
          <Reading key={e} kicker="Light element" title={`Little ${e}`}>
            <p>{ELEMENT_LOW[e]}</p>
          </Reading>
        ))}
        {lowModes.map((m) => (
          <Reading key={m} kicker="Light mode" title={`Little ${m}`}>
            <p>{MODE_LOW[m]}</p>
          </Reading>
        ))}
      </Readings>

      <div className={p.actions}>
        <Link href="/chart" className="nm-btn nm-btn-primary">
          See the full birth chart
        </Link>
        <Link href={`/zodiac/${SIGNS[signature].key}`} className="nm-btn nm-btn-outline">
          Read about {signName(signature)}
        </Link>
      </div>
    </>
  );
}
