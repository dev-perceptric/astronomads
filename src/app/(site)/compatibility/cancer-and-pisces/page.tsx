import { PAIR } from '@/lib/compat/pairs/cancer-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('cancer', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="cancer" b="pisces" copy={PAIR} />;
}
