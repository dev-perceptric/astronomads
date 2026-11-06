import { PAIR } from '@/lib/compat/pairs/taurus-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="pisces" copy={PAIR} />;
}
