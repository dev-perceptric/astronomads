'use client';

import { useEffect, useState } from 'react';
import BirthForm from '@/components/BirthForm';
import { api, toBirthProfile, useAccount, type SavedProfile } from '@/lib/account';
import { loadProfile, type BirthProfile } from '@/lib/profile';
import s from './PersonPicker.module.css';

const dateLabel = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(2000, m - 1, d));
  dt.setUTCFullYear(y);
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
};

/**
 * Choose a person: your chart saved on this device, any of your account's birth profiles, or new
 * birth details. Shows the chosen person as a card with a Change button.
 */
export default function PersonPicker({ label, value, onChange }: { label: string; value: BirthProfile | null; onChange: (p: BirthProfile | null) => void }) {
  const account = useAccount();
  const [device, setDevice] = useState<BirthProfile | null>(null);
  const [saved, setSaved] = useState<SavedProfile[]>([]);
  const [mode, setMode] = useState<'pick' | 'new'>('pick');
  const [search, setSearch] = useState('');

  useEffect(() => setDevice(loadProfile()), []);
  useEffect(() => {
    if (account.status !== 'in') return;
    api<{ profiles: SavedProfile[] }>('/api/profiles').then((r) => r.ok && setSaved(r.data.profiles));
  }, [account.status]);

  if (value) {
    return (
      <div className={s.card}>
        <p className={s.label}>{label}</p>
        <p className={s.name}>{value.name}</p>
        <p className={s.meta}>
          {dateLabel(value.date)} · {value.time ?? 'Time unknown'} · {value.city.name}, {value.city.country}
        </p>
        <button type="button" className={s.change} onClick={() => onChange(null)}>
          Change
        </button>
      </div>
    );
  }

  const options: { key: string; p: BirthProfile; tag?: string }[] = [];
  if (device) options.push({ key: 'device', p: device, tag: 'My chart' });
  for (const sp of saved) options.push({ key: `p${sp.id}`, p: toBirthProfile(sp) });
  const q = search.trim().toLowerCase();
  const shown = q ? options.filter((o) => `${o.p.name} ${o.p.city.name}`.toLowerCase().includes(q)) : options;

  return (
    <div className={`${s.card} ${s.open}`}>
      <p className={s.label}>{label}</p>
      {options.length > 0 && (
        <div className={s.tabs} role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'pick'} onClick={() => setMode('pick')}>
            Saved people
          </button>
          <button type="button" role="tab" aria-selected={mode === 'new'} onClick={() => setMode('new')}>
            New person
          </button>
        </div>
      )}
      {mode === 'pick' && options.length > 0 ? (
        <>
          {options.length > 6 && <input className={`input ${s.search}`} type="search" placeholder="Search by name" aria-label="Search saved people" value={search} onChange={(e) => setSearch(e.target.value)} />}
          <ul className={s.list}>
            {shown.map((o) => (
              <li key={o.key}>
                <button type="button" className={s.option} onClick={() => onChange(o.p)}>
                  <span className={s.optName}>
                    {o.p.name} {o.tag && <span className={s.tag}>{o.tag}</span>}
                  </span>
                  <span className={s.meta}>
                    {dateLabel(o.p.date)} · {o.p.city.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <BirthForm
          className={s.form}
          submitLabel="Use these details"
          onSave={async (p) => {
            onChange(p);
            return null;
          }}
        />
      )}
    </div>
  );
}
