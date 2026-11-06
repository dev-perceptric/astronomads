import { PAIR } from '@/lib/compat/pairs/leo-sagittarius';
import PairPage, { pairMetadata } from '../_pair/PairPage';

export const dynamic = 'force-static';
export const metadata = pairMetadata('leo', 'sagittarius', PAIR);

export default function Page() {
  return <PairPage a="leo" b="sagittarius" copy={PAIR} />;
}
