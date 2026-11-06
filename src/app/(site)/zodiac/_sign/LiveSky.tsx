'use client';

import { useEffect, useState } from 'react';
import { Glyph3D } from '@/components/Glyph3D';
import { formatDegree, positionsAt, trueNode } from '@/lib/astro/chart';
import { SIGNS, bodyByKey, norm, type BodyKey } from '@/lib/astro/constants';
import { nextIngress, sunSeason } from '@/lib/astro/ingress';
import s from './zodiac.module.css';

type Sky = {
  inSign: { key: BodyKey | 'nnode' | 'snode'; name: string; lon: number; retro: boolean; color: string }[];
  moonNext: Date | null;
  moonHere: boolean;
  season: { start: Date; end: Date };
};

const day = (d: Date) => d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', timeZone: 'UTC' });
const dayTime = (d: Date) => `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}, ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC`;

/** What is in this sign right now, worked out in the browser from the current moment. */
export default function LiveSky({ sign }: { sign: number }) {
  const [sky, setSky] = useState<Sky | null>(null);

  useEffect(() => {
    const now = new Date();
    const inSign: Sky['inSign'] = positionsAt(now)
      .filter((p) => Math.floor(p.lon / 30) === sign)
      .map((p) => ({ key: p.body, name: bodyByKey(p.body).name, lon: p.lon, retro: p.retrograde, color: bodyByKey(p.body).color }));
    const north = trueNode(now);
    for (const [key, name, lon] of [
      ['nnode', 'North Node', north],
      ['snode', 'South Node', norm(north + 180)],
    ] as const)
      if (Math.floor(lon / 30) === sign) inSign.push({ key, name, lon, retro: false, color: 'var(--p-node)' });
    const year = now.getUTCFullYear();
    let season = sunSeason(sign, year);
    if (season.end < now) season = sunSeason(sign, year + 1);
    const moonHere = inSign.some((p) => p.key === 'moon');
    setSky({ inSign, moonNext: moonHere ? null : nextIngress('Moon', sign, now, 40), moonHere, season });
  }, [sign]);

  const name = SIGNS[sign].name;
  if (!sky) return <div className={s.skyGrid} aria-busy="true" />;
  const now = new Date();
  const sunHere = sky.season.start <= now && now < sky.season.end;

  return (
    <div className={s.skyGrid}>
      <div className={s.skyCard}>
        <p className={s.skyLabel}>In {name} right now</p>
        {sky.inSign.length === 0 ? (
          <p className={s.skyBig}>Nothing at the moment</p>
        ) : (
          <ul className={s.skyList}>
            {sky.inSign.map((p) => (
              <li key={p.key}>
                <Glyph3D name={p.key} size={34} color={p.color} ground="dark" />
                <span className={s.skyName}>{p.name}</span>
                <span className={s.skyDeg}>
                  {formatDegree(p.lon)}
                  {p.retro && <span className={s.retro}>R</span>}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.skyCard}>
        <p className={s.skyLabel}>The Moon</p>
        <p className={s.skyBig}>{sky.moonHere ? `In ${name} today` : `Next in ${name} on ${day(sky.moonNext!)}`}</p>
        <p className={s.skyNote}>The Moon visits every sign for about two and a half days each month.</p>
      </div>
      <div className={s.skyCard}>
        <p className={s.skyLabel}>{sunHere ? `${name} season is on` : `Next ${name} season`}</p>
        <p className={s.skyBig}>{sunHere ? `Until ${day(sky.season.end)}` : `Starts ${day(sky.season.start)}`}</p>
        <p className={s.skyNote}>
          The Sun enters {name} on {dayTime(sky.season.start)} and leaves on {dayTime(sky.season.end)}.
        </p>
      </div>
    </div>
  );
}
