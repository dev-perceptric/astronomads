import { PAIR } from '@/lib/compat/pairs/aquarius-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aquarius', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="aquarius" b="aquarius" copy={PAIR} />;
}
