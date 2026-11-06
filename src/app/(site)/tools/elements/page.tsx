import { GUIDE } from '@/lib/tools/guides/elements';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import ElementsTool from './ElementsTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Elements and modes">
      <ElementsTool />
    </ToolShell>
  );
}
