import { PAIR } from '@/lib/compat/pairs/virgo-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="scorpio" copy={PAIR} />;
}
