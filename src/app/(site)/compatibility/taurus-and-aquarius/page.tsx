import { PAIR } from '@/lib/compat/pairs/taurus-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="aquarius" copy={PAIR} />;
}
