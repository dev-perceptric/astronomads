import { GUIDE } from '@/lib/tools/guides/rising-sign';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import RisingSignTool from './RisingSignTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Rising sign">
      <RisingSignTool />
    </ToolShell>
  );
}
