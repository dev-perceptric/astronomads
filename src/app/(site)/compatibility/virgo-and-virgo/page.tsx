import { PAIR } from '@/lib/compat/pairs/virgo-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="virgo" copy={PAIR} />;
}
