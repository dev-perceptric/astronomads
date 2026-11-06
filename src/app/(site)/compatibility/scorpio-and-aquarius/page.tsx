import { PAIR } from '@/lib/compat/pairs/scorpio-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('scorpio', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="scorpio" b="aquarius" copy={PAIR} />;
}
