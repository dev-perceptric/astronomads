import { PAIR } from '@/lib/compat/pairs/cancer-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="capricorn" copy={PAIR} />;
}
