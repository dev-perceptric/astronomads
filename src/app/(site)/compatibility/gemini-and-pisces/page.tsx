import { PAIR } from '@/lib/compat/pairs/gemini-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="pisces" copy={PAIR} />;
}
