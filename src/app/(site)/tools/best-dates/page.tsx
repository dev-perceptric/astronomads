import { GUIDE } from '@/lib/tools/guides/best-dates';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import BestDatesTool from './BestDatesTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Best dates">
      <BestDatesTool />
    </ToolShell>
  );
}
