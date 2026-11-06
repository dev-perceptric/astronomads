import { PAIR } from '@/lib/compat/pairs/leo-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="leo" b="scorpio" copy={PAIR} />;
}
