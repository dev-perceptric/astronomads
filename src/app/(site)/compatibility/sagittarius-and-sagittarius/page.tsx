import { PAIR } from '@/lib/compat/pairs/sagittarius-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('sagittarius', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="sagittarius" b="sagittarius" copy={PAIR} />;
}
