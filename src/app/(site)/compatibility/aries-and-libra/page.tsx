import { PAIR } from '@/lib/compat/pairs/aries-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'libra', PAIR);

export default function Page() {
  return <PairPage a="aries" b="libra" copy={PAIR} />;
}
