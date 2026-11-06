import Link from 'next/link';
import { Glyph, type SignKey } from '@/components/Glyph';
import { ELEMENT_COLORS } from '@/lib/astro/constants';
import { PAIRS_WRITTEN } from '@/lib/compat/pairs';
import { SIGN_FACTS } from '@/lib/zodiac/signs';
import { pairHref } from './PairPage';
import s from './pair.module.css';

/** Every sign with links to its pairings, under the compatibility tool. */
export default function PairGrid() {
  const written = (a: number, b: number) => PAIRS_WRITTEN.includes([SIGN_FACTS[Math.min(a, b)].key, SIGN_FACTS[Math.max(a, b)].key].join('-'));
  return (
    <section id="signs" className={`nm-section nm-marble ${s.hub}`}>
      <p className="nm-label">Sign compatibility</p>
      <h2 className="nm-title">Every sign with every sign</h2>
      <p className={s.hubLead}>All 78 Sun sign pairings, read in depth for love, intimacy, friendship, work and family.</p>
      <div className={s.grid}>
        {SIGN_FACTS.map((a) => (
          <div key={a.key} className={s.signCol}>
            <p className={s.signHead}>
              <Glyph name={a.key as SignKey} size={24} color={ELEMENT_COLORS[a.element]} weight={1.8} /> {a.name}
            </p>
            <ul>
              {SIGN_FACTS.filter((b) => written(a.index, b.index)).map((b) => (
                <li key={b.key}>
                  <Link href={pairHref(a.key, b.key)}>
                    <Glyph name={b.key as SignKey} size={14} color={ELEMENT_COLORS[b.element]} weight={1.8} /> {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
