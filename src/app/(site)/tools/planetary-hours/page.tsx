import { GUIDE } from '@/lib/tools/guides/planetary-hours';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import PlanetaryHoursTool from './PlanetaryHoursTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Planetary hours">
      <PlanetaryHoursTool />
    </ToolShell>
  );
}
