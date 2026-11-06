import { PAIR } from '@/lib/compat/pairs/gemini-libra';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'libra', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="libra" copy={PAIR} />;
}
