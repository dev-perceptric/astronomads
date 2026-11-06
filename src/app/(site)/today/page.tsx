import type { Metadata } from 'next';
import { Suspense } from 'react';
import TodayView from './TodayView';

export const metadata: Metadata = {
  title: 'Your daily horoscope',
  description: 'A daily horoscope made from your own birth chart: today’s planets meeting yours, the Moon of the day, and the week ahead.',
  alternates: { canonical: '/today' },
};

export default function TodayPage() {
  return (
    <Suspense>
      <TodayView />
    </Suspense>
  );
}
