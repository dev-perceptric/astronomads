import { GUIDE } from '@/lib/tools/guides/couple-year-ahead';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import CoupleYearTool from './CoupleYearTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Couple's year ahead">
      <CoupleYearTool />
    </ToolShell>
  );
}
