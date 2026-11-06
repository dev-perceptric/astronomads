import { PAIR } from '@/lib/compat/pairs/virgo-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="capricorn" copy={PAIR} />;
}
