import { PAIR } from '@/lib/compat/pairs/pisces-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('pisces', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="pisces" b="pisces" copy={PAIR} />;
}
