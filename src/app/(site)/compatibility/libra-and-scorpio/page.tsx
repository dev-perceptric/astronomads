import { PAIR } from '@/lib/compat/pairs/libra-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="libra" b="scorpio" copy={PAIR} />;
}
