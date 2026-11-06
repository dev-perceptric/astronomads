'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Glyph, type GlyphName, type SignKey } from '@/components/Glyph';
import Logo from '@/components/Logo';
import { moonPhase, positionsAt } from '@/lib/astro/chart';
import { ELEMENT_COLORS, SIGNS, bodyByKey } from '@/lib/astro/constants';
import { stations } from '@/lib/astro/timing';
import { signOut, useAccount } from '@/lib/account';
import { PRODUCTS, price } from '@/lib/reports/products';
import { TOOLS, type ToolInfo } from '@/lib/tools/registry';
import { ARTICLES } from '@/lib/learn';
import { SIGN_FACTS } from '@/lib/zodiac/signs';

type Section = 'tools' | 'learn' | 'shop';

/** A symbol for each tool in the menu. */
const TOOL_GLYPH: Record<string, GlyphName> = {
  chart: 'asc', 'big-three': 'sun', 'sun-sign': 'sun', 'moon-sign': 'moon', 'rising-sign': 'asc', 'venus-mars': 'venus', elements: 'trine', 'chart-ruler': 'mc',
  today: 'sun', transits: 'jupiter', retrogrades: 'mercury', 'solar-return': 'sun', 'lunar-return': 'moon', 'saturn-return': 'saturn', progressions: 'pluto', 'planetary-hours': 'jupiter',
  compatibility: 'venus', 'sign-compatibility': 'opposition', 'big-three-match': 'sun', 'friendship-compatibility': 'jupiter', 'work-compatibility': 'saturn', 'parent-child': 'moon',
  'composite-chart': 'conjunction', 'davison-chart': 'conjunction', 'synastry-chart': 'trine', 'celebrity-match': 'sun', 'couple-year-ahead': 'saturn', 'best-dates': 'venus',
};
const GROUPS: { key: ToolInfo['group']; title: string }[] = [
  { key: 'chart', title: 'Your chart' },
  { key: 'timing', title: 'Timing' },
  { key: 'pairs', title: 'Two people' },
];

/** Which menu a page belongs to, for the current marker. */
function sectionOf(path: string): Section | null {
  if (path.startsWith('/reports')) return 'shop';
  if (path.startsWith('/zodiac') || path.startsWith('/learn') || /^\/compatibility\/[a-z]+-and-[a-z]+/.test(path)) return 'learn';
  if (path.startsWith('/tools') || path === '/compatibility' || path === '/chart' || path === '/today') return 'tools';
  return null;
}

/**
 * The header of the brand pages: logo, Tools, Learn and Shop with wide panels, New chart and the
 * account menu. A floating glass bar at the top; on phones everything folds into one menu.
 */
export default function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const account = useAccount();
  const [open, setOpen] = useState<Section | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggers = useRef<Record<Section, HTMLButtonElement | null>>({ tools: null, learn: null, shop: null });

  // Close everything when the page changes.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [path]);

  // Escape closes the panel and returns focus to its button; a click outside closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      triggers.current[open]?.focus();
      setOpen(null);
    };
    const onDown = (e: MouseEvent) => {
      if (!header.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const fine = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hoverOpen = (s: Section) => {
    if (!fine()) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(s), open ? 0 : 120);
  };
  const hoverLeave = () => {
    if (!fine()) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(null), 220);
  };
  const keep = () => hoverTimer.current && clearTimeout(hoverTimer.current);

  const leave = async () => {
    setMobileOpen(false);
    await signOut();
    router.push('/');
  };
  const here = sectionOf(path);

  return (
    <header className="nm-header" ref={header} onMouseLeave={hoverLeave} onMouseEnter={keep}>
      <div className="nm-header-bar">
        <Link href="/" className="nm-header-logo" aria-label="Astronomads home">
          <Logo kind="lockup" fg="var(--void)" ground="var(--marble)" cut={false} />
        </Link>

        <nav className="nm-header-links" aria-label="Main">
          {(['tools', 'learn', 'shop'] as Section[]).map((s) => (
            <button
              key={s}
              ref={(el) => {
                triggers.current[s] = el;
              }}
              type="button"
              className="nm-header-trigger"
              aria-expanded={open === s}
              aria-controls={`nm-mega-${s}`}
              aria-current={here === s ? 'page' : undefined}
              onClick={() => setOpen((o) => (o === s ? null : s))}
              onMouseEnter={() => hoverOpen(s)}
            >
              {s === 'tools' ? 'Tools' : s === 'learn' ? 'Learn' : 'Shop'}
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="nm-header-end">
          <Link href="/#start" className="nm-header-cta">
            New chart
          </Link>
          {account.status !== 'loading' && <AccountMenu account={account} onSignOut={leave} />}
          <button className="nm-header-toggle" aria-expanded={mobileOpen} aria-controls="nm-header-sheet" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              {mobileOpen ? <path d="M6 6 18 18M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id={`nm-mega-${open}`} className="nm-mega" onMouseEnter={keep}>
          {open === 'tools' && <ToolsPanel />}
          {open === 'learn' && <LearnPanel />}
          {open === 'shop' && <ShopPanel />}
        </div>
      )}

      {mobileOpen && (
        <div id="nm-header-sheet" className="nm-header-sheet">
          <nav aria-label="Main" className="nm-sheet-sections">
            <SheetSection title="Tools" defaultOpen>
              {GROUPS.map((g) => (
                <div key={g.key} className="nm-sheet-group">
                  <p className="nm-mega-label">{g.title}</p>
                  {TOOLS.filter((t) => t.group === g.key).map((t) => (
                    <Link key={t.slug} href={t.href} aria-current={path === t.href ? 'page' : undefined}>
                      <Glyph name={TOOL_GLYPH[t.slug] ?? 'sun'} size={18} color="var(--astral)" weight={1.8} /> {t.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link href="/tools">All tools</Link>
            </SheetSection>
            <SheetSection title="Learn">
              <div className="nm-sheet-signs">
                {SIGN_FACTS.map((s) => (
                  <Link key={s.key} href={`/zodiac/${s.key}`}>
                    <Glyph name={s.key} size={18} color={ELEMENT_COLORS[s.element]} weight={1.8} /> {s.name}
                  </Link>
                ))}
              </div>
              {ARTICLES.map((a) => (
                <Link key={a.slug} href={`/learn/${a.slug}`}>
                  {a.h1}
                </Link>
              ))}
              <Link href="/zodiac">All zodiac signs</Link>
              <Link href="/compatibility#signs">Sign compatibility</Link>
              <Link href="/learn">All guides</Link>
            </SheetSection>
            <SheetSection title="Shop">
              {Object.values(PRODUCTS).map((p) => (
                <Link key={p.key} href={`/reports/${p.key === 'portrait' ? 'portrait' : 'synastry'}`}>
                  {p.name} · {price(p)}
                </Link>
              ))}
              <Link href="/reports">All reports</Link>
            </SheetSection>
            <SheetSection title="Account">
              {account.status === 'in' && <p className="nm-header-email">{account.email}</p>}
              <Link href="/chart">My chart</Link>
              <Link href="/today">Today</Link>
              {account.status === 'in' ? (
                <>
                  <Link href="/account">My birth profiles</Link>
                  <Link href="/account#reports">My reports</Link>
                  <Link href="/account/settings">Settings</Link>
                  <button onClick={leave}>Sign out</button>
                </>
              ) : account.status === 'out' ? (
                <>
                  <Link href="/account">Sign in</Link>
                  <Link href="/account?mode=up">Create account</Link>
                </>
              ) : null}
            </SheetSection>
          </nav>
          <Link href="/#start" className="nm-sheet-cta">
            New chart
          </Link>
        </div>
      )}
    </header>
  );
}

function SheetSection({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details className="nm-sheet-section" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="nm-sheet-body">{children}</div>
    </details>
  );
}

function ToolsPanel() {
  const pairs = TOOLS.filter((t) => t.group === 'pairs');
  const half = Math.ceil(pairs.length / 2);
  const cols: { title: string; list: ToolInfo[] }[] = [
    { title: 'Your chart', list: TOOLS.filter((t) => t.group === 'chart') },
    { title: 'Timing', list: TOOLS.filter((t) => t.group === 'timing') },
    { title: 'Two people', list: pairs.slice(0, half) },
    { title: '', list: pairs.slice(half) },
  ];
  return (
    <>
      <div className="nm-mega-grid nm-mega-tools">
        {cols.map((c, i) => (
          <div key={i}>
            <p className="nm-mega-label" aria-hidden={!c.title}>
              {c.title || '\u00a0'}
            </p>
            <ul>
              {c.list.map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="nm-mega-item nm-mega-tool" title={t.short}>
                    <Glyph name={TOOL_GLYPH[t.slug] ?? 'sun'} size={18} color="var(--astral)" weight={1.8} />
                    <span className="nm-mega-name">{t.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="nm-mega-foot">
        <Link href="/tools">All {TOOLS.length} tools</Link>
      </div>
    </>
  );
}

function LearnPanel() {
  return (
    <div className="nm-mega-grid nm-mega-learn">
      <div>
        <p className="nm-mega-label">Zodiac signs</p>
        <ul className="nm-mega-signs">
          {SIGN_FACTS.map((s) => (
            <li key={s.key}>
              <Link href={`/zodiac/${s.key}`} className="nm-mega-sign">
                <Glyph name={s.key as SignKey} size={26} color={ELEMENT_COLORS[s.element]} weight={1.6} />
                <span>
                  <span className="nm-mega-name">{s.name}</span>
                  <span className="nm-mega-line">
                    {s.usual[0].replace(/^(\d+ \w{3})\w*$/, '$1')} to {s.usual[1].replace(/^(\d+ \w{3})\w*$/, '$1')}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="nm-mega-foot nm-mega-foot-inline">
          <Link href="/zodiac">All zodiac signs</Link> · <Link href="/learn">All guides</Link>
        </div>
      </div>
      <div>
        <p className="nm-mega-label">Guides</p>
        <ul style={{ marginBottom: 18 }}>
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/learn/${a.slug}`} className="nm-mega-item">
                <Glyph name={a.slug === 'house-systems' ? 'mc' : 'asc'} size={18} color="var(--astral)" weight={1.8} />
                <span>
                  <span className="nm-mega-name">{a.h1}</span>
                  <span className="nm-mega-line">{a.minutes} minute read</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="nm-mega-label">Compatibility</p>
        <ul>
          <li>
            <Link href="/compatibility#signs" className="nm-mega-item">
              <Glyph name="opposition" size={18} color="var(--astral)" weight={1.8} />
              <span>
                <span className="nm-mega-name">Sign compatibility</span>
                <span className="nm-mega-line">All 78 pairings, read for love, friendship and work.</span>
              </span>
            </Link>
          </li>
          {[
            ['aries', 'leo'],
            ['cancer', 'scorpio'],
          ].map(([a, b]) => (
            <li key={a + b}>
              <Link href={`/compatibility/${a}-and-${b}`} className="nm-mega-item nm-mega-pair">
                <Glyph name={a as SignKey} size={16} color="currentColor" weight={1.8} />
                <Glyph name={b as SignKey} size={16} color="currentColor" weight={1.8} />
                <span className="nm-mega-name">
                  {a[0].toUpperCase() + a.slice(1)} and {b[0].toUpperCase() + b.slice(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <RightNow />
    </div>
  );
}

/** The sky right now: the Moon's sign and phase, and the next planet to turn. Worked out in the browser. */
function RightNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const sky = useMemo(() => {
    if (!now) return null;
    const moonLon = positionsAt(now).find((p) => p.body === 'moon')!.lon;
    const phase = moonPhase(now);
    const to = new Date(now.getTime() + 160 * 86400e3);
    const next = (['mercury', 'venus', 'mars'] as const).flatMap((b) => stations(b, now, to)).sort((a, b) => a.date.getTime() - b.date.getTime())[0];
    return { moonSign: Math.floor(moonLon / 30), phase, next };
  }, [now]);
  return (
    <div className="nm-mega-now">
      <p className="nm-mega-label">Right now</p>
      {sky && (
        <>
          <Link href="/today" className="nm-mega-card">
            <span className="nm-mega-line">The Moon</span>
            <span className="nm-mega-big">
              <Glyph name={SIGNS[sky.moonSign].key as SignKey} size={24} color={ELEMENT_COLORS[SIGNS[sky.moonSign].element]} weight={1.8} /> {SIGNS[sky.moonSign].name}
            </span>
            <span className="nm-mega-line">
              {sky.phase.name}, {Math.round(sky.phase.illumination * 100)}% lit
            </span>
          </Link>
          {sky.next && (
            <Link href="/tools/retrogrades" className="nm-mega-card">
              <span className="nm-mega-line">Next turn</span>
              <span className="nm-mega-big">
                {bodyByKey(sky.next.body).name} turns {sky.next.kind}
              </span>
              <span className="nm-mega-line">{sky.next.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })}</span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

function ShopPanel() {
  return (
    <div className="nm-mega-grid nm-mega-shop">
      {Object.values(PRODUCTS).map((p) => (
        <Link key={p.key} href={`/reports/${p.key}`} className="nm-mega-product">
          <span className="nm-mega-label">{p.people === 1 ? 'One person' : 'Two people'}</span>
          <span className="nm-mega-product-name">{p.name}</span>
          <span className="nm-mega-line">{p.tagline}</span>
          <span className="nm-mega-product-foot">
            <span className="nm-mega-price">{price(p)}</span>
            <span className="nm-mega-preview">Preview yours free</span>
          </span>
        </Link>
      ))}
      <div>
        <p className="nm-mega-label">Reports</p>
        <ul>
          <li>
            <Link href="/reports" className="nm-mega-item">
              <span className="nm-mega-name">All reports</span>
            </Link>
          </li>
          <li>
            <Link href="/account#reports" className="nm-mega-item">
              <span className="nm-mega-name">My reports</span>
            </Link>
          </li>
        </ul>
        <p className="nm-mega-note">Delivered as a page you keep, with Save as PDF.</p>
      </div>
    </div>
  );
}

/** The account button and its menu (menu button pattern: arrows move, Escape closes, focus returns to the button). */
function AccountMenu({ account, onSignOut }: { account: ReturnType<typeof useAccount>; onSignOut: () => void }) {
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
        aria-label={account.status === 'in' ? `Account, ${account.email}` : 'Account'}
        aria-current={path.startsWith('/account') ? 'page' : undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="nm-account-initial" aria-hidden="true">
          {account.status === 'in' ? (
            account.email[0]?.toUpperCase()
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16">
              <circle cx="12" cy="8.5" r="3.6" />
              <path d="M5 19.5c1.4-3.4 4-5 7-5s5.6 1.6 7 5" />
            </svg>
          )}
        </span>
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div ref={menu} id="nm-account-menu" className="nm-account-menu" role="menu" aria-label="Account">
          {account.status === 'in' && (
            <div className="nm-account-who" role="presentation">
              <span className="nm-header-email">{account.email}</span>
              <span className="nm-account-count">
                {account.profiles} of {account.max} profiles
              </span>
            </div>
          )}
          <Link href="/chart" role="menuitem" className="nm-account-item">
            My chart
          </Link>
          <Link href="/today" role="menuitem" className="nm-account-item">
            Today
          </Link>
          {account.status !== 'off' && <div className="nm-account-rule" role="separator" />}
          {account.status === 'in' ? (
            <>
              <Link href="/account" role="menuitem" className="nm-account-item">
                My birth profiles
              </Link>
              <Link href="/account#reports" role="menuitem" className="nm-account-item">
                My reports
              </Link>
              <Link href="/account/settings" role="menuitem" className="nm-account-item">
                Settings
              </Link>
              <div className="nm-account-rule" role="separator" />
              <button role="menuitem" className="nm-account-item" onClick={onSignOut}>
                Sign out
              </button>
            </>
          ) : account.status === 'out' ? (
            <>
              <Link href="/account" role="menuitem" className="nm-account-item">
                Sign in
              </Link>
              <Link href="/account?mode=up" role="menuitem" className="nm-account-item">
                Create account
              </Link>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
