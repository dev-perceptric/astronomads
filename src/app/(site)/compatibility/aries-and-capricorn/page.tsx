import { PAIR } from '@/lib/compat/pairs/aries-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="aries" b="capricorn" copy={PAIR} />;
}
