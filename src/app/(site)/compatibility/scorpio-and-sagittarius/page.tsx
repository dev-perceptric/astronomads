import { PAIR } from '@/lib/compat/pairs/scorpio-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('scorpio', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="scorpio" b="sagittarius" copy={PAIR} />;
}
