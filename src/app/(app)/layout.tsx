import Link from 'next/link';
import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
import ThemeToggle from '@/components/ThemeToggle';

/** The app shell for tool pages (chart, today, brand): header, page column, footer. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <div className="topbar-wrap">
        <header className="topbar">
          <div className="topbar-left">
            <Link href="/" className="wordmark" aria-label="Astronomads home">
              <Logo kind="lockup" fg="var(--foreground)" ground="var(--background)" accent="var(--peak)" cut={false} className="topbar-logo" title="Astronomads" />
            </Link>
            <Nav />
          </div>
          <div className="topbar-right">
            <ThemeToggle />
          </div>
        </header>
      </div>
      <main className="page">{children}</main>
      <div className="footer-wrap">
        <footer className="footer">
          <span>© 2026 Astronomads</span>
          <span>
            City data ©{' '}
            <a href="https://www.geonames.org" target="_blank" rel="noreferrer">
              GeoNames
            </a>{' '}
            (CC BY 4.0)
          </span>
        </footer>
      </div>
    </div>
  );
}
