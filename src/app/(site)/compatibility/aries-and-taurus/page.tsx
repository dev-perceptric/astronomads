import { PAIR } from '@/lib/compat/pairs/aries-taurus';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'taurus', PAIR);

export default function Page() {
  return <PairPage a="aries" b="taurus" copy={PAIR} />;
}
