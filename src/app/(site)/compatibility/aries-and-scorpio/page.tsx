import { PAIR } from '@/lib/compat/pairs/aries-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="aries" b="scorpio" copy={PAIR} />;
}
