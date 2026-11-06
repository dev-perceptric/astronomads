import { PAIR } from '@/lib/compat/pairs/taurus-gemini';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('taurus', 'gemini', PAIR);

export default function Page() {
  return <PairPage a="taurus" b="gemini" copy={PAIR} />;
}
