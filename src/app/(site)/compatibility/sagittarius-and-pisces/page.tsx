import { PAIR } from '@/lib/compat/pairs/sagittarius-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('sagittarius', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="sagittarius" b="pisces" copy={PAIR} />;
}
