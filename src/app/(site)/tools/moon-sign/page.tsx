import { GUIDE } from '@/lib/tools/guides/moon-sign';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import MoonSignTool from './MoonSignTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Moon sign">
      <MoonSignTool />
    </ToolShell>
  );
}
