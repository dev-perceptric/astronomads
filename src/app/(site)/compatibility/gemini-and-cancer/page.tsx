import { PAIR } from '@/lib/compat/pairs/gemini-cancer';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'cancer', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="cancer" copy={PAIR} />;
}
