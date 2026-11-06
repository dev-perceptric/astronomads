import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Astronomads', template: '%s · Astronomads' },
  description: 'Free birth charts calculated to the minute, the daily sky, and where on Earth your stars land.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  viewportFit: 'cover',
};

// Applies the saved theme before first paint, so the page never flashes the wrong one.
const themeScript = `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}if(t==="dark"||t==="light")document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Noto+Sans+Symbols&display=swap"
        />
      </head>
      <body>
        <div className="shell">
          <div className="topbar-wrap">
            <header className="topbar">
              <div className="topbar-left">
                <Link href="/" className="wordmark" aria-label="Astronomads home">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 5.5 13.4 10.6 18.5 12 13.4 13.4 12 18.5 10.6 13.4 5.5 12 10.6 10.6Z" fill="var(--peak)" />
                  </svg>
                  Astronomads
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
      </body>
    </html>
  );
}
