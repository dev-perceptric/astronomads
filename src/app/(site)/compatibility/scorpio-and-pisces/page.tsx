import { PAIR } from '@/lib/compat/pairs/scorpio-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('scorpio', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="scorpio" b="pisces" copy={PAIR} />;
}
