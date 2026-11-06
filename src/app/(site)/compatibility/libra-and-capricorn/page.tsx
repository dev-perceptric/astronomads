import { PAIR } from '@/lib/compat/pairs/libra-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="libra" b="capricorn" copy={PAIR} />;
}
