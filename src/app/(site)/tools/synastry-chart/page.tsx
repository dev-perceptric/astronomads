import { GUIDE } from '@/lib/tools/guides/synastry-chart';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import SynastryChartTool from './SynastryChartTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Synastry chart">
      <SynastryChartTool />
    </ToolShell>
  );
}
