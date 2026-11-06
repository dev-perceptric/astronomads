import stars from '@/data/zodiac-stars.json';
import type { SignKey } from '@/components/Glyph';

type Data = { center: number; lines: [number, number][][]; stars: [number, number, number, string][] };

const EPS = (23.4393 * Math.PI) / 180;

/**
 * The sign's real constellation as a round star-chart plate: every star to magnitude 6 as a dot
 * sized by brightness (bright ones with a scatter of stipple dust), the classic stick figure, a faint
 * grid of right ascension and declination, and the ecliptic, the Sun's yearly path. East is on the left,
 * as on any sky chart. Star data: d3-celestial (BSD-3-Clause), from the Hipparcos catalogue.
 */
export default function Constellation({ sign, color, name }: { sign: SignKey; color: string; name: string }) {
  const d = (stars as unknown as Record<string, Data>)[sign];
  const S = 640;
  const C = S / 2;
  const plate = C - 14;
  const fig = d.lines.flat();
  const dec0 = (Math.min(...fig.map((p) => p[1])) + Math.max(...fig.map((p) => p[1]))) / 2;
  const ra0 = (Math.min(...fig.map((p) => p[0])) + Math.max(...fig.map((p) => p[0]))) / 2;
  const k = Math.cos((dec0 * Math.PI) / 180);
  const spanX = (Math.max(...fig.map((p) => p[0])) - Math.min(...fig.map((p) => p[0]))) * k;
  const spanY = Math.max(...fig.map((p) => p[1])) - Math.min(...fig.map((p) => p[1]));
  // The figure fills about 42% of the plate's width, leaving room for the sky around it.
  const scale = (plate * 2 * 0.42) / Math.max(spanX, spanY, 6);
  // Rounded to a tenth of a unit: plenty for the eye, and it keeps the page small.
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const P = (ra: number, dec: number): [number, number] => [r1(C - (ra - ra0) * k * scale), r1(C - (dec - dec0) * scale)];
  const inside = ([x, y]: [number, number], m = 0) => Math.hypot(x - C, y - C) <= plate - m;
  const onFigure = (ra: number, dec: number) => fig.some(([a, b]) => Math.abs(a - ra) < 0.05 && Math.abs(b - dec) < 0.05);

  // Grid: lines of right ascension every 15° and declination every 10°.
  const wrapRa = (ra: number) => ((ra - d.center + 540) % 360) - 180;
  const grid: string[] = [];
  for (let dec = -80; dec <= 80; dec += 10) {
    const pts: string[] = [];
    for (let ra = ra0 - 60; ra <= ra0 + 60; ra += 3) pts.push(P(ra, dec).join(','));
    grid.push(pts.join(' '));
  }
  const raStart = Math.ceil((d.center + ra0 - 60) / 15) * 15;
  for (let raAbs = raStart; raAbs <= d.center + ra0 + 60; raAbs += 15) {
    const ra = wrapRa(raAbs);
    const pts: string[] = [];
    for (let dec = dec0 - 60; dec <= dec0 + 60; dec += 5) pts.push(P(ra, dec).join(','));
    grid.push(pts.join(' '));
  }

  // The ecliptic, from ecliptic longitude to right ascension and declination.
  const ecl: string[] = [];
  let label: [number, number] | null = null;
  for (let lam = 0; lam < 360; lam += 1) {
    const l = (lam * Math.PI) / 180;
    const dec = (Math.asin(Math.sin(EPS) * Math.sin(l)) * 180) / Math.PI;
    const ra = (Math.atan2(Math.cos(EPS) * Math.sin(l), Math.cos(l)) * 180) / Math.PI;
    const p = P(wrapRa(ra), dec);
    if (inside(p, -2)) {
      ecl.push(p.join(','));
      if (!label && inside(p, 110)) label = p;
    } else if (ecl.length && ecl[ecl.length - 1] !== '|') ecl.push('|');
  }
  const eclPaths = ecl.join(' ').split('|').map((s) => s.trim()).filter((s) => s.split(' ').length > 1);

  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const clip = `plate-${sign}`;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="zodiac-constellation" role="img" aria-label={`Star chart of the constellation ${name}, with its brightest stars named`}>
      <defs>
        <clipPath id={clip}>
          <circle cx={C} cy={C} r={plate} />
        </clipPath>
      </defs>
      <circle cx={C} cy={C} r={plate + 8} fill="none" stroke="var(--marble)" strokeOpacity={0.35} />
      <circle cx={C} cy={C} r={plate} fill="var(--void)" stroke="var(--marble)" strokeOpacity={0.7} />
      {/* Degree ticks on the rim, like an astrolabe plate */}
      {Array.from({ length: 72 }, (_, i) => {
        const a = (i * 5 * Math.PI) / 180;
        const len = i % 6 === 0 ? 8 : 4;
        return <line key={i} x1={r1(C + Math.cos(a) * plate)} y1={r1(C + Math.sin(a) * plate)} x2={r1(C + Math.cos(a) * (plate + len))} y2={r1(C + Math.sin(a) * (plate + len))} stroke="var(--marble)" strokeOpacity={0.45} />;
      })}
      <g clipPath={`url(#${clip})`}>
        <g fill="none" stroke="var(--marble)" strokeOpacity={0.16} strokeWidth={0.8}>
          {grid.map((pts, i) => (
            <polyline key={i} points={pts} />
          ))}
        </g>
        <g fill="none" stroke="var(--astral)" strokeWidth={1.4} strokeDasharray="6 6">
          {eclPaths.map((pts, i) => (
            <polyline key={i} points={pts} />
          ))}
        </g>
        <g stroke={color} strokeOpacity={0.85} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {d.lines.map((line, i) => (
            <polyline key={i} points={line.map(([ra, dec]) => P(ra, dec).join(',')).join(' ')} />
          ))}
        </g>
        {d.stars.map(([ra, dec, mag, starName], i) => {
          const p = P(ra, dec);
          if (!inside(p, -4)) return null;
          const [x, y] = p;
          const onFig = onFigure(ra, dec);
          const r = Math.max(1.35, 6.2 - mag * 0.9);
          const dust = mag < 4.4 ? Math.round((4.6 - mag) * 12) : 0;
          return (
            <g key={i}>
              {Array.from({ length: dust }, (_, j) => {
                const a = rand() * Math.PI * 2;
                const dist = r * (1.5 + rand() * 3.4);
                return <circle key={j} cx={r1(x + Math.cos(a) * dist)} cy={r1(y + Math.sin(a) * dist)} r={r1(0.45 + rand() * 0.6)} fill="var(--marble)" opacity={r1(0.25 + rand() * 0.4)} />;
              })}
              <circle cx={x} cy={y} r={r1(r)} fill="var(--marble)" opacity={onFig ? 1 : r1(Math.min(0.95, 0.55 + (6 - mag) * 0.12))} />
              {starName && (onFig || mag < 3) && inside(p, 30) && (
                <text x={x + r + 9} y={y - r - 5} className="zodiac-star-name" opacity={onFig ? 1 : 0.6}>
                  {starName}
                </text>
              )}
            </g>
          );
        })}
        {label && (
          <text x={label[0]} y={label[1] + 22} textAnchor="middle" className="zodiac-ecliptic">
            Ecliptic, the Sun&apos;s path
          </text>
        )}
      </g>
      <text x={C} y={S - 2} textAnchor="middle" className="zodiac-plate-label">
        {name} · east is left
      </text>
    </svg>
  );
}
