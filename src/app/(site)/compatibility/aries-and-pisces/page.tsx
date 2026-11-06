import { PAIR } from '@/lib/compat/pairs/aries-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="aries" b="pisces" copy={PAIR} />;
}
