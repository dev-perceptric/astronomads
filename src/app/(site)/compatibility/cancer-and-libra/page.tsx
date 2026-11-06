import { PAIR } from '@/lib/compat/pairs/cancer-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'libra', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="libra" copy={PAIR} />;
}
