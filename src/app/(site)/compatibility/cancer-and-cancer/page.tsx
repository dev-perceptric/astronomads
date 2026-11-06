import { PAIR } from '@/lib/compat/pairs/cancer-cancer';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'cancer', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="cancer" copy={PAIR} />;
}
