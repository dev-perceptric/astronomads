import { PAIR } from '@/lib/compat/pairs/cancer-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="aquarius" copy={PAIR} />;
}
