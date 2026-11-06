import { GUIDE } from '@/lib/tools/guides/parent-child';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import ParentChildTool from './ParentChildTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Parent and child">
      <ParentChildTool />
    </ToolShell>
  );
}
