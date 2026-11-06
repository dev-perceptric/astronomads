import { PAIR } from '@/lib/compat/pairs/libra-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="libra" b="pisces" copy={PAIR} />;
}
