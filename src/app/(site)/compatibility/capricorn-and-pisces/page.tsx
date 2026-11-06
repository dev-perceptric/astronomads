import { PAIR } from '@/lib/compat/pairs/capricorn-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('capricorn', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="capricorn" b="pisces" copy={PAIR} />;
}
