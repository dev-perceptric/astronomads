'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { GlyphName } from '@/components/Glyph';
import { useChart } from '@/components/useChart';
import { SIGNS } from '@/lib/astro/constants';
import { IN_SIGN, POINT_INFO } from '@/lib/astro/interpretations';
import { MOON_DETAIL, RISING_DETAIL, SUN_MOON_MIX } from '@/lib/astro/interpretations/signDetails';
import { signForDay } from '@/lib/astro/timing';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import { Blank, Note, PersonBar, Reading, Readings, ResultHead, SignMark, SignTile, Tiles, degLabel, partStyles as p, signName, timeLabel, usePerson } from '../_tool/parts';
import { drawGlyph, fontsReady, saveCanvas, token } from '../_tool/shareCard';

const ORDER = ['fire', 'earth', 'air', 'water'];
const mixKey = (a: string, b: string) => [a, b].sort((x, y) => ORDER.indexOf(x) - ORDER.indexOf(y)).join('-');

export default function BigThreeTool() {
  const { profile, isExample, choose } = usePerson();
  const chart = useChart(profile);
  if (!profile || !chart) return <Blank />;

  const sun = chart.placements.find((x) => x.body === 'sun')!;
  const moon = chart.placements.find((x) => x.body === 'moon')!;
  const asc = chart.asc;
  const ascSign = asc === null ? null : Math.floor(asc / 30);
  const moonDay = chart.timeKnown ? null : signForDay('Moon', profile.date, profile.city.timeZone);
  const mix = SUN_MOON_MIX[mixKey(SIGNS[sun.sign].element, SIGNS[moon.sign].element)];
  const first = profile.name.split(' ')[0];

  return (
    <>
      <PersonBar profile={profile} isExample={isExample} choose={choose} />
      <ResultHead kicker="Your big three" title={`${first}: ${signName(sun.sign)} Sun, ${signName(moon.sign)} Moon${ascSign !== null ? `, ${signName(ascSign)} rising` : ''}`}>
        <p>Your Sun is the core of who you are, your Moon is how you feel, and your rising sign is how you meet the world. Read together, they sketch you better than any one sign alone.</p>
      </ResultHead>

      <Tiles>
        <SignTile k="sun" label="Sun sign" sign={sun.sign} lon={sun.lon} sub={<p>{POINT_INFO.sun.role}</p>} />
        <SignTile k="moon" label="Moon sign" sign={moon.sign} lon={moon.lon} sub={<p>{POINT_INFO.moon.role}</p>} />
        {ascSign !== null ? (
          <SignTile k="asc" label="Rising sign" sign={ascSign} lon={asc!} sub={<p>{POINT_INFO.asc.role}</p>} />
        ) : (
          <div className={p.tile} style={{ ['--el' as string]: 'var(--rule)' }}>
            <p className={p.smallLabel}>Rising sign</p>
            <p className={p.tileSub}>Your rising sign needs a birth time, since it changes about every two hours. Add one with Change above.</p>
          </div>
        )}
      </Tiles>

      {moonDay && !moonDay.certain && (
        <Note>
          The Moon moved from {signName(moonDay.from)} into {signName(moonDay.to)} at {timeLabel(moonDay.change, profile.city.timeZone)} local time on this day. Born before then, your Moon is in {signName(moonDay.from)}; after, in {signName(moonDay.to)}. Add your birth time to be sure.
        </Note>
      )}

      <Readings>
        <Reading kicker="Sun" title={<><SignMark sign={sun.sign} /> Sun in {signName(sun.sign)}</>}>
          <p>{IN_SIGN.sun[sun.sign]}</p>
          <p>
            <Link href={`/zodiac/${SIGNS[sun.sign].key}`}>Read the full {signName(sun.sign)} guide</Link>
          </p>
        </Reading>
        <Reading kicker="Moon" title={<><SignMark sign={moon.sign} /> Moon in {signName(moon.sign)}</>}>
          <p>{IN_SIGN.moon[moon.sign]}</p>
          <p>{MOON_DETAIL[moon.sign].needs}</p>
        </Reading>
        {ascSign !== null && (
          <Reading kicker="Rising" title={<><SignMark sign={ascSign} /> {signName(ascSign)} rising</>}>
            <p>{IN_SIGN.asc[ascSign]}</p>
            <p>{RISING_DETAIL[ascSign].impression}</p>
          </Reading>
        )}
        <Reading kicker="Together" title={`${SIGNS[sun.sign].element[0].toUpperCase()}${SIGNS[sun.sign].element.slice(1)} Sun, ${SIGNS[moon.sign].element} Moon`}>
          <p>{mix}</p>
          {ascSign !== null && (
            <p>
              Your rising sign is ruled by {SIGN_FACTS[ascSign].ruler}
              {SIGN_FACTS[ascSign].modernRuler ? ` (and ${SIGN_FACTS[ascSign].modernRuler} in modern astrology)` : ''}, which makes it your chart ruler. <Link href="/tools/chart-ruler">See what your chart ruler says</Link>.
            </p>
          )}
        </Reading>
      </Readings>

      <ShareCard name={first} sun={sun.sign} moon={moon.sign} rising={ascSign} degrees={[degLabel(sun.lon), degLabel(moon.lon), asc === null ? '' : degLabel(asc)]} />

      <div className={p.actions}>
        <Link href={`/chart?${new URLSearchParams({ n: profile.name, d: profile.date, c: String(profile.city.id), ...(profile.time ? { t: profile.time } : {}) })}`} className="nm-btn nm-btn-primary">
          See the full birth chart
        </Link>
        <Link href="/tools/moon-sign" className="nm-btn nm-btn-outline">
          More on your Moon
        </Link>
        <Link href="/tools/rising-sign" className="nm-btn nm-btn-outline">
          More on your rising sign
        </Link>
      </div>
    </>
  );
}

/** A 1080 by 1350 card with the three signs, to save and share. */
function ShareCard({ name, sun, moon, rising, degrees }: { name: string; sun: number; moon: number; rising: number | null; degrees: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await fontsReady();
      const c = ref.current;
      if (!c || cancelled) return;
      const ctx = c.getContext('2d')!;
      const W = 1080;
      const H = 1350;
      const marble = '#ffffff';
      const stone = '#a6a6a6';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, W, H);
      // Starfield
      let seed = sun * 97 + moon * 13 + (rising ?? 5);
      const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      ctx.fillStyle = token('--astral', '#6a62f7');
      for (let i = 0; i < 160; i++) {
        ctx.globalAlpha = 0.25 + rnd() * 0.5;
        ctx.beginPath();
        ctx.arc(rnd() * W, rnd() * H, 0.8 + rnd() * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      // Bracket frame
      ctx.strokeStyle = marble;
      ctx.lineWidth = 3;
      for (const [x, dir] of [
        [60, 1],
        [W - 60, -1],
      ] as const) {
        ctx.beginPath();
        ctx.moveTo(x + 18 * dir, 60);
        ctx.lineTo(x, 60);
        ctx.lineTo(x, H - 60);
        ctx.lineTo(x + 18 * dir, H - 60);
        ctx.stroke();
      }
      ctx.fillStyle = stone;
      ctx.font = '400 26px "Geist Mono", monospace';
      ctx.fillText('MY BIG THREE', 120, 150);
      ctx.fillStyle = marble;
      ctx.font = '400 104px "EB Garamond", Georgia, serif';
      ctx.fillText(name.slice(0, 16), 116, 260);

      const rows: [string, number | null, string, GlyphName][] = [
        ['SUN', sun, degrees[0], 'sun'],
        ['MOON', moon, degrees[1], 'moon'],
        ['RISING', rising, degrees[2], 'asc'],
      ];
      rows.forEach(([label, sign, deg, glyph], i) => {
        const y = 420 + i * 270;
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(120, y - 70);
        ctx.lineTo(W - 120, y - 70);
        ctx.stroke();
        const planetColor = glyph === 'asc' ? marble : token(`--p-${glyph}`, marble);
        drawGlyph(ctx, glyph, 160, y + 20, 64, planetColor, 1.7);
        ctx.fillStyle = stone;
        ctx.font = '400 24px "Geist Mono", monospace';
        ctx.fillText(deg ? `${label}  ${deg}` : label, 230, y - 6);
        ctx.fillStyle = marble;
        ctx.font = '400 92px "EB Garamond", Georgia, serif';
        ctx.fillText(sign === null ? 'Add a birth time' : SIGNS[sign].name, 226, y + 76);
        if (sign !== null) {
          const elColor = token(`--el-${SIGNS[sign].element}`, marble);
          drawGlyph(ctx, SIGNS[sign].key as GlyphName, W - 190, y + 24, 92, elColor === '#0404c8' ? '#6a62f7' : elColor, 1.8);
        }
      });
      ctx.fillStyle = stone;
      ctx.font = '400 24px "Geist Mono", monospace';
      ctx.fillText('ASTRONOMADS.COM/TOOLS/BIG-THREE', 120, H - 110);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [name, sun, moon, rising, degrees]);

  return (
    <div className={p.block}>
      <ResultHead kicker="Share" title="Your big three card" />
      <div className={p.share}>
        <canvas ref={ref} width={1080} height={1350} className={p.shareCanvas} aria-label={`Big three card: ${SIGNS[sun].name} Sun, ${SIGNS[moon].name} Moon${rising !== null ? `, ${SIGNS[rising].name} rising` : ''}`} role="img" />
        <div className={p.shareText}>
          <p className={p.tileSub}>A card sized for stories and posts. Save it, then share it anywhere.</p>
          <button type="button" className="nm-btn nm-btn-primary" disabled={!ready} onClick={() => ref.current && saveCanvas(ref.current, `big-three-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`)}>
            Save the card
          </button>
        </div>
      </div>
    </div>
  );
}
