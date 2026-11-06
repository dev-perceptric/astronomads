import type { Metadata } from 'next';
import { Suspense } from 'react';
import ResetView from './ResetView';

export const metadata: Metadata = { title: 'Reset password', robots: { index: false } };

export default function ResetPage() {
  return (
    <Suspense>
      <ResetView />
    </Suspense>
  );
}
