import { PAIR } from '@/lib/compat/pairs/virgo-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="aquarius" copy={PAIR} />;
}
