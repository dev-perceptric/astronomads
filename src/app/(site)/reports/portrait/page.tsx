import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PRODUCTS } from '@/lib/reports/products';
import PortraitProduct from './PortraitProduct';

export const metadata: Metadata = {
  title: PRODUCTS.portrait.name,
  description: `${PRODUCTS.portrait.tagline} Preview yours free.`,
  alternates: { canonical: '/reports/portrait' },
};

export default function Page() {
  return (
    <Suspense>
      <PortraitProduct />
    </Suspense>
  );
}
