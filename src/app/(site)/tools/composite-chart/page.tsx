import { GUIDE } from '@/lib/tools/guides/composite-chart';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import CompositeTool from './CompositeTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Composite chart">
      <CompositeTool />
    </ToolShell>
  );
}
