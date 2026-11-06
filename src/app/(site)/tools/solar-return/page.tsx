import { GUIDE } from '@/lib/tools/guides/solar-return';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import SolarReturnTool from './SolarReturnTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Solar return">
      <SolarReturnTool />
    </ToolShell>
  );
}
