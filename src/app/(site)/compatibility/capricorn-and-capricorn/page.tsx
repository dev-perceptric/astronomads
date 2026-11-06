import { PAIR } from '@/lib/compat/pairs/capricorn-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('capricorn', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="capricorn" b="capricorn" copy={PAIR} />;
}
