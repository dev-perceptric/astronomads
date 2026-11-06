import { GUIDE } from '@/lib/tools/guides/venus-mars';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import VenusMarsTool from './VenusMarsTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Venus and Mars">
      <VenusMarsTool />
    </ToolShell>
  );
}
