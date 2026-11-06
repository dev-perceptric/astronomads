import { PAIR } from '@/lib/compat/pairs/taurus-cancer';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'cancer', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="cancer" copy={PAIR} />;
}
