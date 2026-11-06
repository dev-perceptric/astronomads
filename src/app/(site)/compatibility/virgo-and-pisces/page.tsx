import { PAIR } from '@/lib/compat/pairs/virgo-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('virgo', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="virgo" b="pisces" copy={PAIR} />;
}
