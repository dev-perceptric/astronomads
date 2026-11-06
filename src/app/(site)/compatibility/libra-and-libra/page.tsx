import { PAIR } from '@/lib/compat/pairs/libra-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'libra', PAIR);

export default function Page() {
  return <PairPage a="libra" b="libra" copy={PAIR} />;
}
