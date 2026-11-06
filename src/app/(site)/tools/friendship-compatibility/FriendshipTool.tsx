'use client';

import { FRIEND_CONTACT, FRIEND_THEME } from '@/lib/astro/interpretations/friendship';
import RelateView from '../_tool/RelateView';

export default function FriendshipTool() {
  return (
    <RelateView
      mode="friend"
      themes={FRIEND_THEME}
      contacts={FRIEND_CONTACT}
      labels={['You', 'Your friend']}
      kicker="Friendship compatibility"
      title={(a, b, n) => `${a} and ${b}: ${n} of 100 as friends`}
      links={[
        { href: '/compatibility', label: 'Love compatibility' },
        { href: '/tools/work-compatibility', label: 'Work compatibility' },
        { href: '/tools/big-three-match', label: 'Big three match' },
      ]}
    />
  );
}
