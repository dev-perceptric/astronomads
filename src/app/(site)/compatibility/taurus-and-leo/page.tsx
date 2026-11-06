import { PAIR } from '@/lib/compat/pairs/taurus-leo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'leo', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="leo" copy={PAIR} />;
}
