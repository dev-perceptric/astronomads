'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { City } from '@/lib/cities';
import s from './BirthForm.module.css';

type Props = {
  value: City | null;
  onChange: (city: City | null) => void;
  inputId: string;
};

export default function CityPicker({ value, onChange, inputId }: Props) {
  const [query, setQuery] = useState(value ? cityLabel(value) : '');
  const [results, setResults] = useState<City[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const listId = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value) setQuery(cityLabel(value));
  }, [value]);

  const search = (q: string) => {
    if (timer.current) clearTimeout(timer.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    timer.current = setTimeout(async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(`/api/cities?q=${encodeURIComponent(q)}`);
          if (!res.ok) throw new Error(String(res.status));
          setResults(await res.json());
          setActive(0);
          setOpen(true);
          setFailed(false);
          return;
        } catch {
          await new Promise((r) => setTimeout(r, 300 * 2 ** attempt));
        }
      }
      setFailed(true);
    }, 160);
  };

  const pick = (c: City) => {
    onChange(c);
    setQuery(cityLabel(c));
    setOpen(false);
  };

  return (
    <div className={s.picker}>
      <input
        id={inputId}
        className="input"
        value={query}
        placeholder="Search a city"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null);
          search(e.target.value);
        }}
        onFocus={() => results.length && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!open || !results.length) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === 'Enter') {
            e.preventDefault();
            pick(results[active]);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
      />
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className={s.options}>
          {results.map((c, i) => (
            <li
              key={c.id}
              role="option"
              aria-selected={i === active}
              className={s.option}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(c);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <span>{c.name}</span>
              <span className={s.optionMeta}>{[c.region, c.country].filter(Boolean).join(', ')}</span>
            </li>
          ))}
        </ul>
      )}
      {failed && <p className="error">City search isn’t answering. Try again in a moment.</p>}
    </div>
  );
}

export const cityLabel = (c: City) => [c.name, c.country].filter(Boolean).join(', ');
