import { PAIR } from '@/lib/compat/pairs/cancer-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="scorpio" copy={PAIR} />;
}
