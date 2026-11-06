import { PAIR } from '@/lib/compat/pairs/aries-leo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'leo', PAIR);

export default function Page() {
  return <PairPage a="aries" b="leo" copy={PAIR} />;
}
