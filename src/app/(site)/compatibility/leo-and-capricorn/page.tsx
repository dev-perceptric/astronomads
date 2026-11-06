import { PAIR } from '@/lib/compat/pairs/leo-capricorn';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'capricorn', PAIR);

export default function Page() {
  return <PairPage a="leo" b="capricorn" copy={PAIR} />;
}
