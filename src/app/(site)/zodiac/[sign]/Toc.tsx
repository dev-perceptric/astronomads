'use client';

import { useEffect, useState } from 'react';
import s from './zodiac.module.css';

/** Contents for the long read. Marks the section you're in. */
export default function Toc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const first = items.find((i) => seen.get(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-90px 0px -55% 0px' },
    );
    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className={s.toc} aria-label="On this page">
      <p className={s.tocLabel}>On this page</p>
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>
              {i.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
