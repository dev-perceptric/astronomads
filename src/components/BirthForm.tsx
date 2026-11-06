'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { City } from '@/lib/cities';
import { profileToQuery, saveProfile, type BirthProfile } from '@/lib/profile';
import CityPicker from './CityPicker';
import s from './BirthForm.module.css';

export default function BirthForm({ initial }: { initial?: BirthProfile | null }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? '');
  const [date, setDate] = useState(initial?.date ?? '');
  const [time, setTime] = useState(initial?.time ?? '');
  const [unknown, setUnknown] = useState(initial ? initial.time === null : false);
  const [city, setCity] = useState<City | null>(initial?.city ?? null);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return setError('Add your birth date.');
    if (!unknown && !time) return setError('Add your birth time, or tick “I don’t know my birth time”.');
    if (!city) return setError('Pick your birth city from the list.');
    const profile: BirthProfile = { name: name.trim() || 'Me', date, time: unknown ? null : time, city };
    saveProfile(profile);
    router.push(`/chart?${profileToQuery(profile)}`);
  };

  return (
    <form className={`card ${s.form}`} onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="bf-name">Name</label>
        <input id="bf-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first name" autoComplete="given-name" />
      </div>
      <div className={s.row}>
        <div className="field">
          <label htmlFor="bf-date">Birth date</label>
          <input id="bf-date" className="input" type="date" value={date} min="1800-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="bf-time">Birth time</label>
          <input id="bf-time" className="input" type="time" value={unknown ? '' : time} disabled={unknown} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <label className={s.check} htmlFor="bf-unknown">
        <input id="bf-unknown" type="checkbox" checked={unknown} onChange={(e) => setUnknown(e.target.checked)} />
        <span className={s.box} aria-hidden="true" />
        I don’t know my birth time
      </label>
      <div className="field">
        <label htmlFor="bf-city">Birth city</label>
        <CityPicker inputId="bf-city" value={city} onChange={setCity} />
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary" type="submit">
        Calculate my chart
      </button>
    </form>
  );
}
