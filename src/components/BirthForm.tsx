'use client';

import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import type { City } from '@/lib/cities';
import { profileToQuery, saveProfile, type BirthProfile } from '@/lib/profile';
import CityPicker from './CityPicker';
import s from './BirthForm.module.css';

type Props = {
  initial?: BirthProfile | null;
  /** When given, the form saves through this instead of opening the chart. Returns an error line, or null. */
  onSave?: (p: BirthProfile) => Promise<string | null>;
  onCancel?: () => void;
  submitLabel?: string;
  className?: string;
};

export default function BirthForm({ initial, onSave, onCancel, submitLabel = 'Calculate my chart', className }: Props) {
  const router = useRouter();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(initial?.name ?? '');
  const [date, setDate] = useState(initial?.date ?? '');
  const [time, setTime] = useState(initial?.time ?? '');
  const [unknown, setUnknown] = useState(initial ? initial.time === null : false);
  const [city, setCity] = useState<City | null>(initial?.city ?? null);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return setError('Add your birth date.');
    if (!unknown && !time) return setError('Add your birth time, or tick “I don’t know my birth time”.');
    if (!city) return setError('Pick your birth city from the list.');
    const profile: BirthProfile = { name: name.trim() || 'Me', date, time: unknown ? null : time, city };
    if (onSave) {
      setBusy(true);
      setError('');
      const problem = await onSave(profile);
      setBusy(false);
      if (problem) setError(problem);
      return;
    }
    saveProfile(profile);
    router.push(`/chart?${profileToQuery(profile)}`);
  };

  return (
    <form className={className ?? `card card-raised ${s.form}`} onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor={`${uid}-name`}>Name</label>
        <input id={`${uid}-name`} className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first name" autoComplete="given-name" />
      </div>
      <div className={s.row}>
        <div className="field">
          <label htmlFor={`${uid}-date`}>Birth date</label>
          <input id={`${uid}-date`} className="input" type="date" value={date} min="1800-01-01" max="2100-12-31" onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-time`}>Birth time</label>
          <input id={`${uid}-time`} className="input" type="time" value={unknown ? '' : time} disabled={unknown} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <label className={s.check} htmlFor={`${uid}-unknown`}>
        <input id={`${uid}-unknown`} type="checkbox" checked={unknown} onChange={(e) => setUnknown(e.target.checked)} />
        <span className={s.box} aria-hidden="true" />
        I don’t know my birth time
      </label>
      <div className="field">
        <label htmlFor={`${uid}-city`}>Birth city</label>
        <CityPicker inputId={`${uid}-city`} value={city} onChange={setCity} />
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <div className={s.actions}>
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button className="btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
