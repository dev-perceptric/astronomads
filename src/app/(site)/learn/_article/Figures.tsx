import { houseCusps } from '@/lib/astro/houses';
import { obliquity } from '@/lib/astro/chart';
import { ordinal } from '@/lib/astro/interpretations';
import f from './figures.module.css';

/*
 * Drawings for the Learn articles, all in the chart's own layout: Ascendant on the left,
 * Midheaven at the top, zodiac and houses running counterclockwise.
 */

const R = 120;
const pt = (r: number, deg: number): [number, number] => [r * Math.cos((deg * Math.PI) / 180), -r * Math.sin((deg * Math.PI) / 180)];
/** Wheel angle of a house cusp when the houses are drawn equal: cusp 1 on the left (180°). */
const houseAngle = (h: number) => 180 + (h - 1) * 30;
const arc = (r: number, from: number, to: number) => {
  const [x1, y1] = pt(r, from);
  const [x2, y2] = pt(r, to);
  return `M0 0 L${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 0 0 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
};

function Axes() {
  return (
    <>
      <line x1={-R - 8} y1={0} x2={R + 8} y2={0} className={f.axis} />
      <line x1={0} y1={-R - 8} x2={0} y2={R + 8} className={f.axis} />
      <text x={-R - 14} y={4} textAnchor="end" className={f.angle}>
        AC
      </text>
      <text x={R + 14} y={4} className={f.angle}>
        DC
      </text>
      <text x={0} y={-R - 14} textAnchor="middle" className={f.angle}>
        MC
      </text>
      <text x={0} y={R + 24} textAnchor="middle" className={f.angle}>
        IC
      </text>
    </>
  );
}

function HouseNumbers() {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = pt(R * 0.8, houseAngle(i + 1) + 15);
        return (
          <text key={i} x={x} y={y + 4} textAnchor="middle" className={f.num}>
            {i + 1}
          </text>
        );
      })}
    </>
  );
}

export function HemispheresFigure() {
  return (
    <figure className={f.figure}>
      <div className={f.pair}>
        <svg viewBox="-170 -160 340 320" role="img" aria-label="The horizon divides the chart into an upper half, houses 7 to 12, and a lower half, houses 1 to 6.">
          <path d={arc(R, 0, 180)} className={f.fillA} />
          <path d={arc(R, 180, 360)} className={f.fillB} />
          <circle r={R} className={f.ring} />
          <Axes />
          <HouseNumbers />
          <text x={0} y={-R / 2 + 8} textAnchor="middle" className={f.zone}>
            Upper · South
          </text>
          <text x={0} y={R / 2 + 2} textAnchor="middle" className={f.zone}>
            Lower · North
          </text>
        </svg>
        <svg viewBox="-170 -160 340 320" role="img" aria-label="The meridian divides the chart into an eastern half, houses 10 to 3, and a western half, houses 4 to 9.">
          <path d={arc(R, 90, 270)} className={f.fillA} />
          <path d={arc(R, 270, 450)} className={f.fillB} />
          <circle r={R} className={f.ring} />
          <Axes />
          <HouseNumbers />
          <text x={-R / 2 + 6} y={-12} textAnchor="middle" className={f.zone}>
            East
          </text>
          <text x={R / 2 - 6} y={-12} textAnchor="middle" className={f.zone}>
            West
          </text>
        </svg>
      </div>
      <figcaption>The horizon (left) and the meridian (right) each cut the chart in half. Houses drawn equal for clarity.</figcaption>
    </figure>
  );
}

export function QuadrantsFigure() {
  const q = [
    { from: 180, to: 270, label: 'I', houses: 'Houses 1 to 3', tone: f.q1 },
    { from: 270, to: 360, label: 'II', houses: 'Houses 4 to 6', tone: f.q2 },
    { from: 0, to: 90, label: 'III', houses: 'Houses 7 to 9', tone: f.q3 },
    { from: 90, to: 180, label: 'IV', houses: 'Houses 10 to 12', tone: f.q4 },
  ];
  return (
    <figure className={f.figure}>
      <svg viewBox="-190 -170 380 340" className={f.single} role="img" aria-label="The four quadrants: I, houses 1 to 3; II, houses 4 to 6; III, houses 7 to 9; IV, houses 10 to 12.">
        {q.map((x) => (
          <path key={x.label} d={arc(R, x.from, x.to)} className={x.tone} />
        ))}
        <circle r={R} className={f.ring} />
        <Axes />
        {q.map((x) => {
          const [lx, ly] = pt(R * 0.56, (x.from + x.to) / 2);
          return (
            <g key={x.label}>
              <text x={lx} y={ly - 6} textAnchor="middle" className={f.roman}>
                {x.label}
              </text>
              <text x={lx} y={ly + 12} textAnchor="middle" className={f.small}>
                Houses
              </text>
              <text x={lx} y={ly + 25} textAnchor="middle" className={f.small}>
                {x.houses.replace('Houses ', '')}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>Quadrant I lies below the horizon on the eastern side; the others follow counterclockwise in house order.</figcaption>
    </figure>
  );
}

export function DiurnalFigure() {
  const marks = [
    { deg: 180, label: 'Sunrise' },
    { deg: 135, label: 'Morning' },
    { deg: 90, label: 'Noon' },
    { deg: 45, label: 'Afternoon' },
    { deg: 0, label: 'Sunset' },
    { deg: -45, label: 'Evening' },
    { deg: -90, label: 'Midnight' },
    { deg: -135, label: 'Before dawn' },
  ];
  return (
    <figure className={f.figure}>
      <svg viewBox="-210 -175 420 350" className={f.single} role="img" aria-label="The Sun rises at the Ascendant, culminates at the Midheaven at noon, sets at the Descendant and reaches the Imum Coeli at midnight, moving clockwise through the houses.">
        <path d={arc(R, 0, 180)} className={f.fillDay} />
        <path d={arc(R, 180, 360)} className={f.fillNight} />
        <circle r={R} className={f.ring} />
        <Axes />
        <HouseNumbers />
        <defs>
          <marker id="diurnal-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" className={f.arrowHead} />
          </marker>
        </defs>
        <path d={`M${pt(R + 26, 168)[0]} ${pt(R + 26, 168)[1]} A${R + 26} ${R + 26} 0 0 1 ${pt(R + 26, 112)[0]} ${pt(R + 26, 112)[1]}`} className={f.arrow} markerEnd="url(#diurnal-arrow)" />
        {marks.map((m) => {
          const [x, y] = pt(R, m.deg);
          const [lx, ly] = pt(R + 46, m.deg);
          return (
            <g key={m.label}>
              <circle cx={x} cy={y} r={6} className={f.sun} />
              <text x={lx} y={ly + 4} textAnchor={Math.abs(m.deg) === 90 ? 'middle' : lx < 0 ? 'end' : 'start'} className={f.small}>
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>The daily turn runs clockwise, against the order of the houses. Above the horizon, the Sun makes a day chart; below it, a night chart.</figcaption>
    </figure>
  );
}

export function CirclesFigure() {
  // A sphere seen slightly from above: the horizon, the celestial equator and the ecliptic as ellipses.
  return (
    <figure className={f.figure}>
      <svg viewBox="-200 -170 400 340" className={f.single} role="img" aria-label="The celestial sphere with the horizon, the celestial equator tilted by the latitude, and the ecliptic tilted a further 23.4 degrees.">
        <circle r={140} className={f.ring} />
        <ellipse rx={140} ry={34} className={f.horizon} />
        <g transform="rotate(-38)">
          <ellipse rx={140} ry={30} className={f.equator} />
        </g>
        <g transform="rotate(-62)">
          <ellipse rx={140} ry={44} className={f.ecliptic} />
        </g>
        <line x1={0} y1={-140} x2={0} y2={140} className={f.axis} />
        <circle cx={0} cy={-140} r={3.5} className={f.dot} />
        <text x={8} y={-146} className={f.small}>
          Zenith
        </text>
        <text x={150} y={6} className={f.small}>
          West
        </text>
        <text x={-150} y={6} textAnchor="end" className={f.small}>
          East
        </text>
        <text x={-128} y={-104} className={f.labelEq}>
          Celestial equator
        </text>
        <text x={48} y={-150} className={f.labelEc}>
          Ecliptic
        </text>
        <text x={-60} y={52} className={f.labelHz}>
          Horizon
        </text>
        <text x={6} y={128} className={f.small}>
          Meridian
        </text>
      </svg>
      <figcaption>Three circles make every house system: the local horizon, the celestial equator (tilted by the latitude of birth) and the ecliptic (tilted a further 23.4° to the equator).</figcaption>
    </figure>
  );
}

/** The size of each Placidus house at three latitudes, worked out by our engine at build time. */
export function HouseSizesFigure() {
  const eps = obliquity(new Date('2000-01-01T12:00:00Z'));
  const rows = [0, 40, 60].map((lat) => {
    const c = houseCusps('placidus', 0, eps, lat)!;
    return { lat, sizes: c.map((x, i) => (((c[(i + 1) % 12] - x) % 360) + 360) % 360) };
  });
  return (
    <figure className={f.figure}>
      <div className={f.scroll}>
        <table className={f.table}>
          <thead>
            <tr>
              <th>Latitude</th>
              {Array.from({ length: 6 }, (_, i) => (
                <th key={i}>{ordinal(i + 1)}</th>
              ))}
              <th>Smallest</th>
              <th>Largest</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.lat}>
                <td>{r.lat === 0 ? 'Equator' : `${r.lat}° N`}</td>
                {r.sizes.slice(0, 6).map((s, i) => (
                  <td key={i}>{s.toFixed(1)}°</td>
                ))}
                <td>{Math.min(...r.sizes).toFixed(1)}°</td>
                <td>{Math.max(...r.sizes).toFixed(1)}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>Placidus house sizes with 0° Aries on the Midheaven. Houses 7 to 12 mirror houses 1 to 6. Calculated by Astronomads.</figcaption>
    </figure>
  );
}
