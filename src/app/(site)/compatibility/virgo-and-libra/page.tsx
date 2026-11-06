import { PAIR } from '@/lib/compat/pairs/virgo-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'libra', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="libra" copy={PAIR} />;
}
