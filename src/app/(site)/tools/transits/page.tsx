import { GUIDE } from '@/lib/tools/guides/transits';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import TransitsTool from './TransitsTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Transits">
      <TransitsTool />
    </ToolShell>
  );
}
