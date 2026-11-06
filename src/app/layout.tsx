import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Astronomads', template: '%s · Astronomads' },
  description: 'Free birth charts calculated to the minute, the daily sky, and where on Earth your stars land.',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=DM+Mono:wght@400;500&family=Jost:wght@300..600&family=Noto+Sans+Symbols&display=swap"
        />
      </head>
      <body>
        <div className="shell">
          <div className="topbar-wrap">
            <header className="topbar">
              <Link href="/" className="wordmark" aria-label="Astronomads home">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1.5 14 10l8.5 2-8.5 2-2 8.5-2-8.5-8.5-2 8.5-2Z" fill="var(--gold)" />
                </svg>
                Astronomads
              </Link>
              <Nav />
            </header>
          </div>
          <main className="page">{children}</main>
          <div className="footer-wrap">
            <footer className="footer">
              <span>Astronomads</span>
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
      </body>
    </html>
  );
}
