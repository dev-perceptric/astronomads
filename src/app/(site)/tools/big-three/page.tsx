import { GUIDE } from '@/lib/tools/guides/big-three';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import BigThreeTool from './BigThreeTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Big three">
      <BigThreeTool />
    </ToolShell>
  );
}
