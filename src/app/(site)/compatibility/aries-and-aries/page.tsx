import { PAIR } from '@/lib/compat/pairs/aries-aries';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'aries', PAIR);

export default function Page() {
  return <PairPage a="aries" b="aries" copy={PAIR} />;
}
