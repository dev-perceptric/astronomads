'use client';

import { EXAMPLE_PROFILE } from '@/lib/profile';
import ChartWheel from './ChartWheel';
import { useChart } from './useChart';

export default function ExampleWheel() {
  const chart = useChart(EXAMPLE_PROFILE);
  if (!chart) return null;
  return <ChartWheel chart={chart} name="Nova" />;
}
