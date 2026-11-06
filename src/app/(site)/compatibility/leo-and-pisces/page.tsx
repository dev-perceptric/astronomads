import { PAIR } from '@/lib/compat/pairs/leo-pisces';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'pisces', PAIR);

export default function Page() {
  return <PairPage a="leo" b="pisces" copy={PAIR} />;
}
