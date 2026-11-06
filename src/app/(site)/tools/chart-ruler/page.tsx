import { GUIDE } from '@/lib/tools/guides/chart-ruler';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import ChartRulerTool from './ChartRulerTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Chart ruler">
      <ChartRulerTool />
    </ToolShell>
  );
}
