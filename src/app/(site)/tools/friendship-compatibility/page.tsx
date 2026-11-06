import { GUIDE } from '@/lib/tools/guides/friendship-compatibility';
import ToolShell, { toolMetadata } from '../_tool/ToolShell';
import FriendshipTool from './FriendshipTool';

export const metadata = toolMetadata(GUIDE);

export default function Page() {
  return (
    <ToolShell guide={GUIDE} name="Friendship compatibility">
      <FriendshipTool />
    </ToolShell>
  );
}
