import { PAIR } from '@/lib/compat/pairs/leo-leo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'leo', PAIR);

export default function Page() {
  return <PairPage a="leo" b="leo" copy={PAIR} />;
}
