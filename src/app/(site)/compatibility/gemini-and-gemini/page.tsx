import { PAIR } from '@/lib/compat/pairs/gemini-gemini';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'gemini', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="gemini" copy={PAIR} />;
}
