import type { Metadata } from 'next';
import { Suspense } from 'react';
import CompatView from './CompatView';

const title = 'Compatibility: Compare Two Birth Charts';
const description = 'Free astrology compatibility from two full birth charts: attraction, emotional bond, communication, commitment and growth, with the contacts between your planets explained.';

export const metadata: Metadata = {
  title: { absolute: `${title} · Astronomads` },
  description,
  alternates: { canonical: '/compatibility' },
  openGraph: { title, description, url: '/compatibility', images: [{ url: '/og/zodiac-libra.png', width: 1200, height: 630 }] },
};

export default function CompatibilityPage() {
  return (
    <Suspense>
      <CompatView />
    </Suspense>
  );
}
