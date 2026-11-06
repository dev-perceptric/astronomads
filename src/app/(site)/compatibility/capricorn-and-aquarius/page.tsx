import { PAIR } from '@/lib/compat/pairs/capricorn-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('capricorn', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="capricorn" b="aquarius" copy={PAIR} />;
}
