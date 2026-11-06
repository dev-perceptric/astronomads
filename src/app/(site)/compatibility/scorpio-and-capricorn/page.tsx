import { PAIR } from '@/lib/compat/pairs/scorpio-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('scorpio', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="scorpio" b="capricorn" copy={PAIR} />;
}
