import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Stars from '@/components/Stars';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Astronomads', template: '%s · Astronomads' },
  description: 'Your birth chart, your daily sky and where on Earth your stars land.',
};

export const viewport: Viewport = {
  themeColor: '#0b0a1c',
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
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=DM+Mono:wght@400&family=Jost:wght@300..600&family=Noto+Sans+Symbols&display=swap"
        />
      </head>
      <body>
        <div className="sky" aria-hidden="true" />
        <Stars />
        <div className="shell">
          <header className="topbar">
            <Link href="/" className="wordmark" aria-label="Astronomads home">
              <span className="dot" aria-hidden="true" />
              astronomads
            </Link>
            <Nav />
          </header>
          <main className="page">{children}</main>
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
      </body>
    </html>
  );
}
