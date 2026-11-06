'use client';

import { useEffect, useRef } from 'react';
import { Glyph, type GlyphName } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import { formatDegree, type Chart, type PointKey } from '@/lib/astro/chart';
import { SIGNS, type BodyKey, type NodeKey } from '@/lib/astro/constants';
import { IN_HOUSE, IN_SIGN, POINT_INFO, aspectReading, isAngle, ordinal, pointColor, pointName, pointPosition, readingOrder } from '@/lib/astro/interpretations';
import { HOUSE_REALM } from '@/lib/astro/readings';
import s from './reading.module.css';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const colorOf = pointColor;

/**
 * The reading for one placement, in a panel that slides in from the right (a bottom sheet on phones).
 * Three layers: what the point means, the point in its sign, the point in its house, then its aspects.
 */
export default function ReadingSheet({ chart, point, onClose, onPick }: { chart: Chart; point: PointKey; onClose: () => void; onPick: (k: PointKey) => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const order = readingOrder(chart);
  const at = order.indexOf(point);
  const prev = order[(at - 1 + order.length) % order.length];
  const next = order[(at + 1) % order.length];

  // Keyboard: Escape closes, arrows step through the placements, Tab stays inside the panel.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onPick(next);
      else if (e.key === 'ArrowLeft') onPick(prev);
      else if (e.key === 'Tab' && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
    // Focus and scroll lock belong to the panel being open, not to which point it shows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    panel.current?.querySelector(`.${s.body}`)?.scrollTo({ top: 0 });
  }, [point]);

  const pos = pointPosition(chart, point);
  if (!pos) return null;
  const sign = SIGNS[pos.sign];
  const name = pointName(point);
  const info = POINT_INFO[point];
  const angle = isAngle(point);
  const showHouse = !angle && pos.house !== null;
  const related = chart.aspects.filter((a) => a.a === point || a.b === point);
  const title = `${name} in ${sign.name}`;

  return (
    <div className={`nm-marble ${s.layer}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={panel} className={s.panel} role="dialog" aria-modal="true" aria-labelledby="reading-title">
        <div className={s.top}>
          <p className="nm-label">Reading</p>
          <button ref={closeBtn} className={s.close} onClick={onClose} aria-label="Close the reading">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M5 5 19 19M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        <div className={s.body}>
          <header className={s.head}>
            {angle ? (
              <span className={s.angleMark}>{point === 'asc' ? 'AC' : 'MC'}</span>
            ) : (
              <Glyph3D name={point as BodyKey | NodeKey} size={68} color={colorOf(point)} ground="light" />
            )}
            <h2 id="reading-title" className={s.title}>
              {title}
            </h2>
            <p className={s.meta}>
              {formatDegree(pos.lon)} {sign.name}
              {pos.house !== null && !angle ? ` · House ${ROMAN[pos.house - 1]}` : ''}
              {pos.retrograde ? ' · Retrograde' : ''}
            </p>
          </header>

          <section className={s.part}>
            <p className={s.partLabel}>01 What the {name} means</p>
            <p className={s.role}>{info.role}</p>
            <ul className={s.keywords}>
              {info.keywords.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
            <p className={s.text}>{info.text}</p>
          </section>

          <section className={s.part}>
            <p className={s.partLabel}>
              02 {name} in {sign.name}
            </p>
            <p className={s.text}>{IN_SIGN[point][pos.sign]}</p>
          </section>

          {showHouse && (
            <section className={s.part}>
              <p className={s.partLabel}>
                03 {name} in the {ordinal(pos.house!)} house
              </p>
              <p className={s.realm}>{HOUSE_REALM[pos.house! - 1]}</p>
              <p className={s.text}>{IN_HOUSE[point as BodyKey | NodeKey][pos.house! - 1]}</p>
            </section>
          )}

          <section className={s.part}>
            <p className={s.partLabel}>
              {showHouse ? '04' : '03'} Aspects{related.length ? ` (${related.length})` : ''}
            </p>
            {related.length === 0 ? (
              <p className={s.text}>No close aspects.</p>
            ) : (
              <ul className={s.aspects}>
                {related.map((a) => {
                  const other = a.a === point ? a.b : a.a;
                  return (
                    <li key={`${a.a}-${a.b}`} className={s.aspect}>
                      <button className={s.aspectHead} onClick={() => onPick(other)} aria-label={`${a.def.kind} ${pointName(other)}. Open its reading`}>
                        <Glyph name={a.def.kind} size={16} color={a.def.color} weight={1.9} />
                        <span className={s.aspectName}>
                          {a.def.kind} {pointName(other)}
                        </span>
                        <Glyph name={other as GlyphName} size={18} color={colorOf(other)} weight={1.9} />
                        <span className={s.orb}>{a.orb.toFixed(1)}°</span>
                      </button>
                      <p className={s.aspectText}>{aspectReading(a)}</p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        <nav className={s.steps} aria-label="Other placements">
          <button className={s.step} onClick={() => onPick(prev)}>
            <span aria-hidden="true">←</span> {pointName(prev)}
          </button>
          <span className={s.count}>
            {at + 1} / {order.length}
          </span>
          <button className={s.step} onClick={() => onPick(next)}>
            {pointName(next)} <span aria-hidden="true">→</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
