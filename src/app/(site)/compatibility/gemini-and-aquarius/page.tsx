import { PAIR } from '@/lib/compat/pairs/gemini-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="aquarius" copy={PAIR} />;
}
