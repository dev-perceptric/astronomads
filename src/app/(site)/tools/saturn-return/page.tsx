import { GUIDE } from '@/lib/tools/guides/saturn-return';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import SaturnReturnTool from './SaturnReturnTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Saturn return">
      <SaturnReturnTool />
    </ToolShell>
  );
}
