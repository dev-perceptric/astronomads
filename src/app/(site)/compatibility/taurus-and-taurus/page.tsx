import { PAIR } from '@/lib/compat/pairs/taurus-taurus';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'taurus', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="taurus" copy={PAIR} />;
}
