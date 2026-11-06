import { GlyphAt, type SignKey } from '@/components/Glyph';
import { ELEMENT_COLORS, SIGNS } from '@/lib/astro/constants';
import { relation } from '@/lib/zodiac/signs';

const LINE: Record<string, { color: string; dash?: string }> = {
  trine: { color: 'var(--asp-ease)' },
  sextile: { color: 'var(--asp-soft)', dash: '6 5' },
  square: { color: 'var(--asp-hard)' },
  opposite: { color: 'var(--asp-hard)' },
  neighbor: { color: 'var(--rule)', dash: '2 5' },
  quincunx: { color: 'var(--rule)', dash: '2 5' },
};

/** The sign at the top of a ring of all twelve, with a line to each colored by how they relate. */
export default function CompatWheel({ sign }: { sign: number }) {
  const R = 150;
  const at = (i: number) => {
    const a = ((i - sign) * 30 - 90) * (Math.PI / 180);
    return [Math.cos(a) * R, Math.sin(a) * R];
  };
  const [cx, cy] = at(sign);
  return (
    <svg viewBox="-200 -200 400 400" className="zodiac-compat" role="img" aria-label={`How ${SIGNS[sign].name} relates to each sign`}>
      <circle r={R} fill="none" stroke="var(--rule)" />
      <circle r={R - 34} fill="none" stroke="var(--rule)" strokeDasharray="1 5" />
      {SIGNS.map((_, i) => {
        if (i === sign) return null;
        const rel = relation(sign, i);
        const l = LINE[rel.kind];
        const [x, y] = at(i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={l.color} strokeWidth={rel.tone === 'mixed' ? 1 : 1.8} strokeDasharray={l.dash} />;
      })}
      {SIGNS.map((sg, i) => {
        const [x, y] = at(i);
        const self = i === sign;
        return (
          <g key={sg.key}>
            <circle cx={x} cy={y} r={self ? 25 : 19} fill="var(--background)" stroke={self ? 'var(--foreground)' : 'var(--rule)'} strokeWidth={self ? 1.6 : 1} />
            <GlyphAt name={sg.key as SignKey} x={x} y={y} size={self ? 26 : 20} color={ELEMENT_COLORS[sg.element]} weight={2.2} />
          </g>
        );
      })}
    </svg>
  );
}
