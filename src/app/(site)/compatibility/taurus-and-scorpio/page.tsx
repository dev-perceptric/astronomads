import { PAIR } from '@/lib/compat/pairs/taurus-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="scorpio" copy={PAIR} />;
}
