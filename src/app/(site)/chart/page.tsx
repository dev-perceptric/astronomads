import { Suspense } from 'react';
import ChartView from './ChartView';

export const metadata = { title: 'Birth chart' };

export default function ChartPage() {
  return (
    <Suspense fallback={null}>
      <ChartView />
    </Suspense>
  );
}
