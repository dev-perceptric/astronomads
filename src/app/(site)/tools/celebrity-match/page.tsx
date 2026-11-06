import { GUIDE } from '@/lib/tools/guides/celebrity-match';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import CelebrityMatchTool from './CelebrityMatchTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Celebrity match">
      <CelebrityMatchTool />
    </ToolShell>
  );
}
