import { PAIR } from '@/lib/compat/pairs/gemini-scorpio';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'scorpio', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="scorpio" copy={PAIR} />;
}
