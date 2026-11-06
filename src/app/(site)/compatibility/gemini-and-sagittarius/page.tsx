import { PAIR } from '@/lib/compat/pairs/gemini-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="sagittarius" copy={PAIR} />;
}
