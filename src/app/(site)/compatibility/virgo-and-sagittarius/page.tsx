import { PAIR } from '@/lib/compat/pairs/virgo-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="sagittarius" copy={PAIR} />;
}
