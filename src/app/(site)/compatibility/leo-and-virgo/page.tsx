import { PAIR } from '@/lib/compat/pairs/leo-virgo';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'virgo', PAIR);

export default function Page() {
  return <PairPage a="leo" b="virgo" copy={PAIR} />;
}
