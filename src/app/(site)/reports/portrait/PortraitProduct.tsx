'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Stipple from '@/components/Stipple';
import PersonPicker from '@/components/site/PersonPicker';
import { profileParams, useProfileParam } from '@/lib/people';
import { loadProfile, type BirthProfile } from '@/lib/profile';
import { PRODUCTS } from '@/lib/reports/products';
import BuyPanel from '../_doc/BuyPanel';
import PortraitDoc from '../_doc/PortraitDoc';
import s from '../_doc/reports.module.css';

export default function PortraitProduct() {
  const router = useRouter();
  const params = new URLSearchParams(useSearchParams().toString());
  const fromUrl = useProfileParam(params);
  const [person, setPerson] = useState<BirthProfile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (fromUrl === null) return;
    setPerson(fromUrl !== 'none' && fromUrl !== 'error' ? fromUrl : loadProfile());
    setReady(true);
  }, [fromUrl]);

  const choose = (p: BirthProfile | null) => {
    setPerson(p);
    if (p) router.replace(`/reports/portrait?${new URLSearchParams(profileParams(p)).toString()}`, { scroll: false });
  };

  return (
    <>
      <section className={`nm-section nm-void ${s.hero}`}>
        <Stipple kind="field" tone="astral" className={s.field} />
        <div className={`nm-bracket ${s.heroFrame}`}>
          <p className="nm-label">Report</p>
          <h1 className={`${s.title} fade-up`}>{PRODUCTS.portrait.name}</h1>
          <p className={s.lead}>{PRODUCTS.portrait.tagline} Read the first chapters free, right here.</p>
        </div>
      </section>
      <section className="nm-section nm-marble">
        {!ready ? null : (
          <div className={s.product}>
            <div>
              {!person ? (
                <PersonPicker label="Whose chart?" value={null} onChange={choose} />
              ) : (
                <>
                  <p className={s.previewNote}>Free preview</p>
                  <PortraitDoc profile={person} full={false} />
                  <div className={s.unlock}>
                    <p className={s.unlockTitle}>The rest of {person.name.split(' ')[0]}&apos;s chart is in the full report</p>
                  </div>
                </>
              )}
            </div>
            <div className={s.buyCol}>
              {person && <PersonPicker label="For" value={person} onChange={choose} />}
              {person && (
                <BuyPanel
                  product="portrait"
                  people={[person]}
                  back={`/reports/portrait?${new URLSearchParams(profileParams(person)).toString()}`}
                  includes={['Your Sun, Moon and Ascendant in depth', 'Your elements, modes and chart ruler', 'Every planet, node and angle by sign and house', 'Every aspect in your chart explained', 'A page to keep, and a PDF to save']}
                />
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
