import { PAIR } from '@/lib/compat/pairs/taurus-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'libra', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="libra" copy={PAIR} />;
}
