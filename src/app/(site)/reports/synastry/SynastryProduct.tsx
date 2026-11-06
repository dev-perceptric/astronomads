'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Stipple from '@/components/Stipple';
import PersonPicker from '@/components/site/PersonPicker';
import { pairQuery, useProfileParam } from '@/lib/people';
import { loadProfile, type BirthProfile } from '@/lib/profile';
import { PRODUCTS } from '@/lib/reports/products';
import BuyPanel from '../_doc/BuyPanel';
import SynastryDoc from '../_doc/SynastryDoc';
import s from '../_doc/reports.module.css';

export default function SynastryProduct() {
  const router = useRouter();
  const params = new URLSearchParams(useSearchParams().toString());
  const pa = useProfileParam(params, 'a');
  const pb = useProfileParam(params, 'b');
  const [a, setA] = useState<BirthProfile | null>(null);
  const [b, setB] = useState<BirthProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pa === null || pb === null) return;
    setA(pa !== 'none' && pa !== 'error' ? pa : loadProfile());
    setB(pb !== 'none' && pb !== 'error' ? pb : null);
    setReady(true);
  }, [pa, pb]);

  useEffect(() => {
    if (a && b) router.replace(`/reports/synastry?${pairQuery(a, b)}`, { scroll: false });
  }, [a, b, router]);

  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Report</p>
          <h1 className={`${s.title} fade-up`}>{PRODUCTS.synastry.name}</h1>
          <p className={s.lead}>{PRODUCTS.synastry.tagline} See your scores free, right here.</p>
        </div>
      </section>
      <section className="nm-section nm-marble">
        {!ready ? null : (
          <div className={s.product}>
            <div>
              {a && b ? (
                <>
                  <p className={s.previewNote}>Free preview</p>
                  <SynastryDoc a={a} b={b} full={false} />
                  <div className={s.unlock}>
                    <p className={s.unlockTitle}>Every contact between your charts is in the full report</p>
                  </div>
                </>
              ) : (
                <div className={s.cards}>
                  <PersonPicker label="Person one" value={a} onChange={setA} />
                  <PersonPicker label="Person two" value={b} onChange={setB} />
                </div>
              )}
            </div>
            <div className={s.buyCol}>
              {a && b && (
                <>
                  <PersonPicker label="Person one" value={a} onChange={setA} />
                  <PersonPicker label="Person two" value={b} onChange={setB} />
                  <BuyPanel
                    product="synastry"
                    people={[a, b]}
                    back={`/reports/synastry?${pairQuery(a, b)}`}
                    includes={['Five compatibility scores, explained', 'Every contact between your two charts', 'Each of you in depth: Sun, Moon, Mercury, Venus and Mars', 'A page to keep, and a PDF to save']}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
