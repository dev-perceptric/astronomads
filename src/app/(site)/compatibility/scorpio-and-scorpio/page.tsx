import { PAIR } from '@/lib/compat/pairs/scorpio-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('scorpio', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="scorpio" b="scorpio" copy={PAIR} />;
}
