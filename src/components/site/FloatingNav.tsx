'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** The floating glass navigation of the brand pages. */
export default function FloatingNav() {
  const path = usePathname();
  const current = (href: string) => (path === href ? 'page' : undefined);
  return (
    <nav className="nm-nav" aria-label="Main">
      <Link href="/" aria-current={current('/')}>
        Home
      </Link>
      <Link href="/chart" aria-current={current('/chart')}>
        My chart
      </Link>
      <Link href="/today" aria-current={current('/today')}>
        Today
      </Link>
      <Link href="/account" aria-current={current('/account')}>
        Account
      </Link>
      <Link href="/#start" className="nm-nav-cta">
        New chart
      </Link>
    </nav>
  );
}
