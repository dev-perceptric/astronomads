import { PAIR } from '@/lib/compat/pairs/gemini-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="virgo" copy={PAIR} />;
}
