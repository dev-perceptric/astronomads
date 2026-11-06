import { PAIR } from '@/lib/compat/pairs/leo-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'libra', PAIR);

export default function Page() {
  return <PairPage a="leo" b="libra" copy={PAIR} />;
}
