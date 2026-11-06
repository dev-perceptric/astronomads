import { PAIR } from '@/lib/compat/pairs/taurus-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="sagittarius" copy={PAIR} />;
}
