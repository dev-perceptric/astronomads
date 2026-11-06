import { PAIR } from '@/lib/compat/pairs/sagittarius-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('sagittarius', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="sagittarius" b="capricorn" copy={PAIR} />;
}
