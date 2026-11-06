import type { Metadata } from 'next';
import { Suspense } from 'react';
import ReportView from './ReportView';

export const metadata: Metadata = { title: 'Your report', robots: { index: false } };

export default function Page() {
  return (
    <Suspense>
      <ReportView />
    </Suspense>
  );
}
