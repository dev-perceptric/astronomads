import { PAIR } from '@/lib/compat/pairs/cancer-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="virgo" copy={PAIR} />;
}
