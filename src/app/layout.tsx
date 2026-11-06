import type { Metadata, Viewport } from 'next';
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..700&family=EB+Garamond:ital,wght@0,400..600;1,400..600&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Noto+Sans+Symbols&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
