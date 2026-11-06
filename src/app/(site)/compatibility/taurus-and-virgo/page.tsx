import { PAIR } from '@/lib/compat/pairs/taurus-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="virgo" copy={PAIR} />;
}
