import { PAIR } from '@/lib/compat/pairs/libra-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('libra', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="libra" b="sagittarius" copy={PAIR} />;
}
