import { PAIR } from '@/lib/compat/pairs/sagittarius-aquarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('sagittarius', 'aquarius', PAIR);

export default function Page() {
  return <PairPage a="sagittarius" b="aquarius" copy={PAIR} />;
}
