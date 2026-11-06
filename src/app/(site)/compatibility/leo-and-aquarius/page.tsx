import { PAIR } from '@/lib/compat/pairs/leo-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="leo" b="aquarius" copy={PAIR} />;
}
