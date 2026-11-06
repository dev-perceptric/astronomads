'use client';

import { WORK_CONTACT, WORK_THEME } from '@/lib/astro/interpretations/work';
import RelateView from '../_tool/RelateView';

export default function WorkTool() {
  return (
    <RelateView
      mode="work"
      themes={WORK_THEME}
      contacts={WORK_CONTACT}
      labels={['You', 'Your colleague']}
      kicker="Work compatibility"
      title={(a, b, n) => `${a} and ${b}: ${n} of 100 at work`}
      links={[
        { href: '/tools/friendship-compatibility', label: 'Friendship compatibility' },
        { href: '/tools/composite-chart', label: 'Composite chart' },
        { href: '/compatibility', label: 'Love compatibility' },
      ]}
    />
  );
}
