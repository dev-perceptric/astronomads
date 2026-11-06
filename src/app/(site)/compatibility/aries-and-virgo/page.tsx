import { PAIR } from '@/lib/compat/pairs/aries-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="aries" b="virgo" copy={PAIR} />;
}
