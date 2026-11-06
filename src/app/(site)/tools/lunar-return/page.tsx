import { GUIDE } from '@/lib/tools/guides/lunar-return';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import LunarReturnTool from './LunarReturnTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Lunar return">
      <LunarReturnTool />
    </ToolShell>
  );
}
