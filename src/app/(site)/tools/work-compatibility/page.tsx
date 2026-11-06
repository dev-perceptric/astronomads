import { GUIDE } from '@/lib/tools/guides/work-compatibility';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import WorkTool from './WorkTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Work compatibility">
      <WorkTool />
    </ToolShell>
  );
}
