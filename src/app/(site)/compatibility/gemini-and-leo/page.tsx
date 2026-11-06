import { PAIR } from '@/lib/compat/pairs/gemini-leo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'leo', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="leo" copy={PAIR} />;
}
