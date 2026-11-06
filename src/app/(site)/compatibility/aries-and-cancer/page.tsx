import { PAIR } from '@/lib/compat/pairs/aries-cancer';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'cancer', PAIR);

export default function Page() {
  return <PairPage a="aries" b="cancer" copy={PAIR} />;
}
