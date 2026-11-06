'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/components/Logo';
import { signOut, useAccount } from '@/lib/account';

const LINKS = [
  { href: '/zodiac', label: 'Zodiac' },
  { href: '/chart', label: 'My chart' },
  { href: '/today', label: 'Today' },
  { href: '/compatibility', label: 'Compatibility' },
  { href: '/reports', label: 'Reports' },
];

/**
 * The header of the brand pages: logo, main links, New chart, and the account menu.
 * A floating glass bar at the top; on phones the links fold into a menu.
 */
export default function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const account = useAccount();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the phone menu whenever the page changes.
  useEffect(() => setMobileOpen(false), [path]);

  const current = (href: string) => (path === href || ((href === '/zodiac' || href === '/reports') && path.startsWith(`${href}/`)) ? 'page' : undefined);
  const leave = async () => {
    setMobileOpen(false);
    await signOut();
    router.push('/');
  };

  return (
    <header className="nm-header">
      <div className="nm-header-bar">
        <Link href="/" className="nm-header-logo" aria-label="Astronomads home">
          <Logo kind="lockup" fg="var(--void)" ground="var(--marble)" cut={false} />
        </Link>

        <nav className="nm-header-links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nm-header-end">
          <Link href="/#start" className="nm-header-cta">
            New chart
          </Link>
          {account.status === 'out' && (
            <Link href="/account" className="nm-header-signin" aria-current={current('/account')}>
              Sign in
            </Link>
          )}
          {account.status === 'in' && <AccountMenu email={account.email} profiles={account.profiles} max={account.max} onSignOut={leave} />}
          <button
            className="nm-header-toggle"
            aria-expanded={mobileOpen}
            aria-controls="nm-header-sheet"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              {mobileOpen ? <path d="M6 6 18 18M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="nm-header-sheet" className="nm-header-sheet">
          <nav aria-label="Main">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.href)}>
                {l.label}
              </Link>
            ))}
            <Link href="/#start">New chart</Link>
          </nav>
          {account.status === 'out' && (
            <div className="nm-header-sheet-account">
              <Link href="/account">Sign in</Link>
            </div>
          )}
          {account.status === 'in' && (
            <div className="nm-header-sheet-account">
              <p className="nm-header-email">{account.email}</p>
              <Link href="/account">My birth profiles</Link>
              <Link href="/account/settings">Settings</Link>
              <button onClick={leave}>Sign out</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

/** The account button and its menu (menu button pattern: arrows move, Escape closes, focus returns to the button). */
function AccountMenu({ email, profiles, max, onSignOut }: { email: string; profiles: number; max: number; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    if (!open) return;
    const items = () => Array.from(menu.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    items()[0]?.focus();
    const onDown = (e: MouseEvent) => {
      if (!menu.current?.contains(e.target as Node) && !button.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      const list = items();
      const at = list.indexOf(document.activeElement as HTMLElement);
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        list[(at + 1) % list.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        list[(at - 1 + list.length) % list.length]?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        list[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        list[list.length - 1]?.focus();
      } else if (e.key === 'Tab') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="nm-account">
      <button
        ref={button}
        className="nm-account-button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="nm-account-menu"
        aria-label={`Account, ${email}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nm-account-initial" aria-hidden="true">
          {email[0]?.toUpperCase()}
        </span>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div ref={menu} id="nm-account-menu" className="nm-account-menu" role="menu" aria-label="Account">
          <div className="nm-account-who" role="presentation">
            <span className="nm-header-email">{email}</span>
            <span className="nm-account-count">
              {profiles} of {max} profiles
            </span>
          </div>
          <Link href="/account" role="menuitem" className="nm-account-item">
            My birth profiles
          </Link>
          <Link href="/account/settings" role="menuitem" className="nm-account-item">
            Settings
          </Link>
          <div className="nm-account-rule" role="separator" />
          <button role="menuitem" className="nm-account-item" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
