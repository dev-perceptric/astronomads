import { PAIR } from '@/lib/compat/pairs/taurus-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="capricorn" copy={PAIR} />;
}
