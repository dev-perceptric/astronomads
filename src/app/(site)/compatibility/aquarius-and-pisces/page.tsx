import { PAIR } from '@/lib/compat/pairs/aquarius-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aquarius', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="aquarius" b="pisces" copy={PAIR} />;
}
