import { PAIR } from '@/lib/compat/pairs/aries-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="aries" b="aquarius" copy={PAIR} />;
}
