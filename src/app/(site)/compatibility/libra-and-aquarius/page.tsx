import { PAIR } from '@/lib/compat/pairs/libra-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="libra" b="aquarius" copy={PAIR} />;
}
