import { PAIR } from '@/lib/compat/pairs/aries-gemini';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('aries', 'gemini', PAIR);

export default function Page() {
  return <PairPage a="aries" b="gemini" copy={PAIR} />;
}
