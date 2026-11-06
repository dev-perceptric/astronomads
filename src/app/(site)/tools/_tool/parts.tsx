'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import CityPicker from '@/components/CityPicker';
import { Glyph, type SignKey } from '@/components/Glyph';
import { Glyph3D } from '@/components/Glyph3D';
import PersonPicker from '@/components/site/PersonPicker';
import type { PointKey } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, isNode, type BodyKey } from '@/lib/astro/constants';
import { pointColor } from '@/lib/astro/points';
import type { City } from '@/lib/cities';
import { cityById, profileParams, useProfileParam } from '@/lib/people';
import { EXAMPLE_PROFILE, loadProfile, type BirthProfile } from '@/lib/profile';
import s from './parts.module.css';

/* ---------- Formatting ---------- */

const pad = (n: number) => String(n).padStart(2, '0');
export const dateLabel = (d: Date, timeZone = 'UTC') => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone });
export const shortDate = (d: Date, timeZone = 'UTC') => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone });
export const timeLabel = (d: Date, timeZone = 'UTC') => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone });
export const isoDate = (d: Date, timeZone = 'UTC') => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
};
export const birthDateLabel = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(2000, m - 1, d));
  dt.setUTCFullYear(y);
  return dateLabel(dt);
};
/** 14°07′ */
export const degLabel = (lon: number) => {
  const inSign = (((lon % 360) + 360) % 360) % 30;
  let d = Math.floor(inSign);
  let m = Math.round((inSign - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${pad(m)}′`;
};
export const signOfLon = (lon: number) => Math.floor((((lon % 360) + 360) % 360) / 30);
export const signName = (i: number) => SIGNS[i].name;
export const cap = (t: string) => t[0].toUpperCase() + t.slice(1);

/* ---------- Address state ---------- */

/** One value kept in the page address, so a result can be shared and reloaded. */
export function useParam(name: string): [string | null, (v: string | null) => void] {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const value = sp.get(name);
  const set = (v: string | null) => {
    const q = new URLSearchParams(sp.toString());
    if (v === null || v === '') q.delete(name);
    else q.set(name, v);
    router.replace(`${path}${q.size ? `?${q}` : ''}`, { scroll: false });
  };
  return [value, set];
}

/**
 * The person a calculator is about: from the address, else the chart saved on this device, else
 * the example chart (clearly labeled). Choosing someone puts them in the address.
 */
export function usePerson(): { profile: BirthProfile | null; isExample: boolean; choose: (p: BirthProfile) => void } {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const params = useMemo(() => new URLSearchParams(sp.toString()), [sp]);
  const fromUrl = useProfileParam(params);
  const [state, setState] = useState<{ profile: BirthProfile | null; isExample: boolean }>({ profile: null, isExample: false });
  useEffect(() => {
    if (fromUrl === null) return;
    if (fromUrl !== 'none' && fromUrl !== 'error') setState({ profile: fromUrl, isExample: false });
    else {
      const saved = loadProfile();
      setState({ profile: saved ?? EXAMPLE_PROFILE, isExample: !saved });
    }
  }, [fromUrl]);
  const choose = (p: BirthProfile) => {
    const q = new URLSearchParams(sp.toString());
    for (const k of ['n', 'd', 't', 'c']) q.delete(k);
    for (const [k, v] of Object.entries(profileParams(p))) q.set(k, v);
    router.replace(`${path}?${q}`, { scroll: false });
  };
  return { ...state, choose };
}

/** A city kept in the address by its id (for returns and planetary hours). */
export function useCityParam(name: string, fallback: City | null): [City | null, (c: City) => void] {
  const [id, setId] = useParam(name);
  const [city, setCity] = useState<City | null>(null);
  useEffect(() => {
    if (!id) return setCity(null);
    let cancelled = false;
    cityById(Number(id)).then((c) => !cancelled && setCity(c));
    return () => {
      cancelled = true;
    };
  }, [id]);
  return [id ? city : fallback, (c) => setId(String(c.id))];
}

/* ---------- Inputs ---------- */

/** Whose chart: a one-line summary with a Change button that opens the person picker. */
export function PersonBar({ profile, isExample, choose, label = 'Whose chart?', note }: { profile: BirthProfile; isExample: boolean; choose: (p: BirthProfile) => void; label?: string; note?: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [profile]);
  return (
    <div className={s.personWrap}>
      <div className={s.person}>
        <div className={s.personText}>
          <p className={s.smallLabel}>{isExample ? 'Example chart' : label}</p>
          <p className={s.personName}>{profile.name}</p>
          <p className={s.personMeta}>
            {birthDateLabel(profile.date)} · {profile.time ?? 'Time unknown'} · {profile.city.name}, {profile.city.country}
          </p>
          {note}
        </div>
        <button type="button" className={`nm-btn ${isExample ? 'nm-btn-primary' : 'nm-btn-outline'}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {isExample ? 'Use my birth details' : 'Change'}
        </button>
      </div>
      {open && (
        <div className={s.pickerWrap}>
          <PersonPicker label={label} value={null} onChange={(p) => p && choose(p)} />
        </div>
      )}
    </div>
  );
}

export function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className={s.field}>
      <label className={s.smallLabel} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function CityField({ id, label, value, onChange }: { id: string; label: string; value: City | null; onChange: (c: City) => void }) {
  return (
    <Field label={label} htmlFor={id}>
      <CityPicker inputId={id} value={value} onChange={(c) => c && onChange(c)} />
    </Field>
  );
}

/** Small segmented switch, for two to four choices. */
export function Switch<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className={s.switch} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Results ---------- */

export function PointMark({ k, size = 40, ground = 'light' }: { k: PointKey; size?: number; ground?: 'light' | 'dark' }) {
  if (k === 'asc' || k === 'mc')
    return (
      <span className={s.angleMark} style={{ width: size, height: size, fontSize: Math.max(9, size * 0.3) }}>
        {k === 'asc' ? 'AC' : 'MC'}
      </span>
    );
  return <Glyph3D name={k as BodyKey} size={size} color={pointColor(k)} ground={ground} />;
}

export function SignMark({ sign, size = 22 }: { sign: number; size?: number }) {
  return <Glyph name={SIGNS[sign].key as SignKey} size={size} color={ELEMENT_COLORS[SIGNS[sign].element]} weight={1.8} />;
}

/** A big result tile: a point, its sign and degree, and a short line. */
export function SignTile({ k, label, sign, lon, sub, children }: { k?: PointKey; label: string; sign: number; lon?: number; sub?: ReactNode; children?: ReactNode }) {
  return (
    <div className={s.tile} style={{ ['--el' as string]: ELEMENT_COLORS[SIGNS[sign].element] }}>
      <div className={s.tileHead}>
        {k && !isNode(k) && <PointMark k={k} size={44} />}
        <p className={s.smallLabel}>{label}</p>
      </div>
      <p className={s.tileSign}>
        <SignMark sign={sign} size={34} /> {SIGNS[sign].name}
      </p>
      {lon !== undefined && <p className={s.tileDeg}>{degLabel(lon)}</p>}
      {sub && <div className={s.tileSub}>{sub}</div>}
      {children}
    </div>
  );
}

export function Tiles({ children }: { children: ReactNode }) {
  return <div className={s.tiles}>{children}</div>;
}

/** A titled reading block in the serif. */
export function Reading({ kicker, title, children }: { kicker?: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className={s.reading}>
      {kicker && <p className={s.smallLabel}>{kicker}</p>}
      <h3 className={s.readingTitle}>{title}</h3>
      <div className={s.readingBody}>{children}</div>
    </div>
  );
}

export function Readings({ children }: { children: ReactNode }) {
  return <div className={s.readings}>{children}</div>;
}

export function ResultHead({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className={s.resultHead}>
      <p className="nm-label">{kicker}</p>
      <h2 className={s.resultTitle}>{title}</h2>
      {children && <div className={s.resultLead}>{children}</div>}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className={s.note}>{children}</p>;
}

export function Block({ children }: { children: ReactNode }) {
  return <div className={s.block}>{children}</div>;
}

export function Blank() {
  return <div className={s.blank} />;
}

export { s as partStyles };
