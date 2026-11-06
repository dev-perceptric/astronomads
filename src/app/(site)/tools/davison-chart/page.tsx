import { GUIDE } from '@/lib/tools/guides/davison-chart';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import DavisonTool from './DavisonTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Davison chart">
      <DavisonTool />
    </ToolShell>
  );
}
