'use client';

import { FAMILY_CONTACT, FAMILY_THEME } from '@/lib/astro/interpretations/family';
import { IN_SIGN } from '@/lib/astro/interpretations';
import { MOON_DETAIL } from '@/lib/astro/interpretations/signDetails';
import RelateView from '../_tool/RelateView';
import { Reading, Readings, ResultHead, SignMark, partStyles as p, signName } from '../_tool/parts';

export default function ParentChildTool() {
  return (
    <RelateView
      mode="family"
      themes={FAMILY_THEME}
      contacts={FAMILY_CONTACT}
      labels={['Parent', 'Child']}
      kicker="Parent and child"
      title={(a, b, n) => `${a} and ${b}: ${n} of 100 as family`}
      extra={(_, child) => {
        const first = child.profile.name.split(' ')[0];
        const moon = child.chart.placements.find((x) => x.body === 'moon')!.sign;
        const sun = child.chart.placements.find((x) => x.body === 'sun')!.sign;
        const d = MOON_DETAIL[moon];
        return (
          <div className={p.block}>
            <ResultHead kicker="Your child" title={`What ${first} needs`}>
              <p>A child’s Moon sign shows what makes them feel safe and loved. Their Sun sign shows who they are growing into.</p>
            </ResultHead>
            <Readings>
              <Reading kicker="Moon" title={<><SignMark sign={moon} /> Moon in {signName(moon)}</>}>
                <p>{d.needs}</p>
              </Reading>
              <Reading kicker="Comfort" title="What soothes them">
                <p>{d.comfort}</p>
              </Reading>
              <Reading kicker="Hard days" title="When life gets hard">
                <p>{d.stress}</p>
              </Reading>
              <Reading kicker="Sun" title={<><SignMark sign={sun} /> Sun in {signName(sun)}</>}>
                <p>{IN_SIGN.sun[sun]}</p>
              </Reading>
            </Readings>
          </div>
        );
      }}
      links={[
        { href: '/tools/moon-sign', label: 'Moon sign calculator' },
        { href: '/tools/big-three', label: 'Big three' },
        { href: '/tools/friendship-compatibility', label: 'Friendship compatibility' },
      ]}
    />
  );
}
