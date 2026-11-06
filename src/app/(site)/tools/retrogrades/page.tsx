import { GUIDE } from '@/lib/tools/guides/retrogrades';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import RetrogradesTool from './RetrogradesTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Retrogrades">
      <RetrogradesTool />
    </ToolShell>
  );
}
