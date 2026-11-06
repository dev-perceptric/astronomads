import { PAIR } from '@/lib/compat/pairs/aries-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="aries" b="sagittarius" copy={PAIR} />;
}
