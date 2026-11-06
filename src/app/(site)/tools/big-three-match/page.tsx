import { GUIDE } from '@/lib/tools/guides/big-three-match';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import BigThreeMatchTool from './BigThreeMatchTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Big three match">
      <BigThreeMatchTool />
    </ToolShell>
  );
}
