import { GUIDE } from '@/lib/tools/guides/progressions';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import ProgressionsTool from './ProgressionsTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Progressions">
      <ProgressionsTool />
    </ToolShell>
  );
}
