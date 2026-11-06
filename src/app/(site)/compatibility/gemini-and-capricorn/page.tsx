import { PAIR } from '@/lib/compat/pairs/gemini-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('gemini', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="gemini" b="capricorn" copy={PAIR} />;
}
