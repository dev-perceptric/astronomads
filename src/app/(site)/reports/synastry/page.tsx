import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PRODUCTS } from '@/lib/reports/products';
import SynastryProduct from './SynastryProduct';

export const metadata: Metadata = {
  title: PRODUCTS.synastry.name,
  description: `${PRODUCTS.synastry.tagline} Preview yours free.`,
  alternates: { canonical: '/reports/synastry' },
};

export default function Page() {
  return (
    <Suspense>
      <SynastryProduct />
    </Suspense>
  );
}
