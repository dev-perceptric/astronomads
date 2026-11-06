import type { BodyKey } from '../constants';

/** blend = conjunction, ease = sextile or trine, tension = square or opposition */
export type Harmony = 'blend' | 'ease' | 'tension';

/**
 * What a planet's aspect to the Ascendant or the Midheaven means.
 * Original Astronomads copy.
 */
export const ANGLE_ASPECT: Record<BodyKey, Record<'asc' | 'mc', Record<Harmony, string>>> = {
  sun: {
    asc: {
      blend: 'With the Sun sitting on your rising point, your personality arrives in the room before you do. People tend to remember you after one meeting, so a warm hello can set the tone for a whole new group.',
      ease: 'Your sense of self and your outward manner pull in the same direction, so being yourself around strangers comes fairly easily. When you start something new, trust your own pace instead of copying how others begin.',
      tension: 'Sometimes there is a gap between who you feel you are and how people first read you. If someone misjudges you at a first meeting, a second talk usually lets your real warmth come through.',
    },
    mc: {
      blend: 'Near the top of your chart, the Sun ties your sense of purpose closely to your work and public life. You may feel most alive when your effort is visible, so look for roles where your name stands behind what you make.',
      ease: 'Goals and core self back each other up here, which helps you find work that feels like a natural fit. Recognition tends to grow from steady effort, so keep showing up in the areas where you already feel sure of yourself.',
      tension: 'At times your personal wishes and the demands of your public role pull apart. When a job starts to feel like a costume, ask which part of it you could reshape so it reflects more of you.',
    },
  },
  moon: {
    asc: {
      blend: 'Feelings show on your face, and people often sense your mood before you say a word. That openness puts others at ease, though you will want a calm place to recharge after busy, crowded days.',
      ease: 'A gentle, approachable manner comes from the way your instincts guide your first steps with people. Newcomers often open up to you quickly, and you may become the friend others call when they need a kind ear.',
      tension: 'Shifting moods can change how you come across, so you might seem bright one day and guarded the next. Before an important first meeting, take a few minutes to settle so the other person meets your steady side.',
    },
    mc: {
      blend: 'Caring for people can become part of your public life, and others often see you as someone who understands them. Work that feels personal suits you, though your sense of security may rise and fall with how your career is going.',
      ease: 'Emotional needs and ambitions get along well in your chart, so a career can also feel like home. Trusting your gut about which roles fit you tends to serve you better than chasing titles.',
      tension: 'Home life and public duties may compete for your time and your heart. During seasons of long work hours, protecting one small family ritual each week can keep both sides of your life in balance.',
    },
  },
  mercury: {
    asc: {
      blend: 'Words are your way into the world, and people quickly notice how curious and quick you seem. A good question at the start of a conversation can open more doors for you than a long introduction.',
      ease: 'Thinking on your feet comes naturally in new settings, which makes breaking the ice feel easy. At the start of a project, jotting down ideas helps you move from talk to action faster.',
      tension: 'Your mind can race ahead of your manner, so words sometimes come out faster or sharper than you mean. Taking one breath before you reply helps people hear the thoughtful person behind the quick remark.',
    },
    mc: {
      blend: 'Mercury at the top of your chart puts ideas at the center of your public role, and you may be known for how well you explain things. Teaching or writing could become part of your work, so keep your messages clear and kind.',
      ease: 'Colleagues tend to trust your judgment, because your way of thinking lines up well with your goals. Saying your plans out loud to a mentor or teammate can turn a loose idea into a real next step.',
      tension: 'What you think and what your role expects of you may clash, which can lead to mixed messages at work. Rereading important emails and asking questions early can save you from misunderstandings that slow your progress.',
    },
  },
  venus: {
    asc: {
      blend: 'Venus on your Ascendant lends you a graceful, pleasant first impression that people enjoy being around. You likely care about how a space feels, so small touches like a favorite color or a tidy desk can lift your whole day.',
      ease: 'Friendliness helps you start things on a good note, and others usually respond warmly to your manner. On a new team, your talent for making people comfortable can smooth over the awkward first days.',
      tension: 'Wanting to be liked can shape how you present yourself, and you may bend too far to please others. Notice when you agree only to keep the peace, and practice saying what you really prefer.',
    },
    mc: {
      blend: 'Beauty and harmony may become part of how the public sees you, perhaps as kind or artistic. Work that involves design or bringing people together tends to suit you, as long as you also respect your own worth.',
      ease: 'Charm works in favor of your career here, helping you build good ties with the people who matter at work. A thank you note to a colleague can do more for your path than you might expect.',
      tension: 'Your wish for comfort and your career goals may tug against each other, especially when work feels harsh or dull. Finding one pleasing part of your job, even a nicer chair, can keep you going through tough stretches.',
    },
  },
  mars: {
    asc: {
      blend: 'People often read you as bold or direct, because Mars puts your drive right at the front of how you appear. You probably leap into new things fast, so a short pause to plan can keep your enthusiasm from burning out.',
      ease: 'Courage flows easily into how you meet the world, giving you a confident and active presence. You may be the one who gets a group moving, and a hobby that keeps you on your feet gives that spark a good outlet.',
      tension: 'Even when you only mean to help, your drive can come across as pushy or impatient. If people seem to step back when you speak, try a slower tone and invite them to share their view first.',
    },
    mc: {
      blend: 'Ambition runs through your public life, and you may be known as someone who gets things done. Challenges at work tend to fire you up, though picking your battles saves energy for the goals that count most.',
      ease: 'Hard work comes without much fuss for you, and it moves your career forward at a steady clip. Setting one clear target each month gives that push something solid to aim at.',
      tension: 'As you climb, friction with bosses or rivals may make you feel you have to fight for every step. Pouring that heat into building your skills often turns each obstacle into proof of your strength.',
    },
  },
  jupiter: {
    asc: {
      blend: 'Optimism spills into your first impression, and many people find you friendly and open from the start. Because you may say yes to many plans at once, keep a short list of what matters most so you avoid spreading yourself thin.',
      ease: 'Good humor and a hopeful outlook help you begin new things with confidence. People are often glad to lend a hand, and accepting their offers can make a fresh start feel lighter.',
      tension: 'Enthusiasm may sometimes outrun your follow through, so you promise more than you can deliver. Before you commit to something new, check your calendar and leave room for the plans you already have.',
    },
    mc: {
      blend: 'Big hopes shape your sense of direction, and others may see you as someone with wide vision. Roles that let you teach or lead can feel rewarding, and staying humble keeps that vision grounded.',
      ease: 'Jupiter helps you spot chances to grow and step into larger roles over time. Mentors can be a real help here, so stay in touch with the people who believe in you.',
      tension: 'Ambitions can grow faster than your plans, leaving you with too many goals at once. Picking one clear aim for the year and setting the rest aside helps your hard work add up.',
    },
  },
  saturn: {
    asc: {
      blend: 'Saturn on your rising point can give you a serious, reserved air, and people often see you as mature for your age. You might feel shy at the start of things, yet your steady presence builds trust over time.',
      ease: 'Patience and good judgment lend you a calm, reliable air when you meet the world. Friends may come to you for practical advice, and your careful way of starting projects often saves time later.',
      tension: 'Self-doubt can make you hold back when you meet new people or try something unfamiliar. Confidence grows with practice, so give yourself credit for each small step you take toward a fresh start.',
    },
    mc: {
      blend: 'Responsibility sits at the heart of your public life, and you may be known as the dependable one. Your progress tends to build through slow and steady effort, so treat each year of work as a brick in something lasting.',
      ease: 'Building a career step by step suits you, since discipline and your goals work hand in hand. Long-term plans feel natural to you, and others tend to trust you with real responsibility.',
      tension: 'Heavy pressure may come from authority figures or from your own high standards at work. When progress feels slow, look back at how far you have come, since patience in this area tends to bear fruit.',
    },
  },
  uranus: {
    asc: {
      blend: 'An original streak shapes how you come across, and some people may see you as ahead of your time. You might change your look or your plans often, so let friends know when you are trying something new.',
      ease: 'Curiosity guides how you step into new situations, and Uranus adds a fresh, inventive touch. Starting projects in unusual ways may come naturally to you, and that flair can help you stand out in a good way.',
      tension: 'A restless urge for freedom can make you seem unpredictable when people first meet you. If you catch yourself rebelling just to feel free, take a breath and ask whether the change truly serves you.',
    },
    mc: {
      blend: 'Your career may take surprising turns, since Uranus at the top of your chart ties your path to change and invention. Look for work with room to experiment, where thinking differently counts as a strength.',
      ease: 'A love of new ideas helps you find creative ways to move ahead at work. Trying a new tool or method can give you an edge and keep you excited about what you do.',
      tension: 'Sudden shifts in your goals or plans may leave you feeling unsettled now and then. A steady routine alongside your bold ideas can help you handle surprises without losing your footing.',
    },
  },
  neptune: {
    asc: {
      blend: 'A soft, dreamy quality surrounds you, and people may see their own hopes reflected in you. Your gentle presence draws others in, though clear boundaries help you stay true to yourself.',
      ease: 'Sensitivity colors how you meet the world, and strangers often find you kind and intuitive. You often sense what others need before they say it, which makes you a comforting presence in new groups.',
      tension: 'You may feel unsure of how you come across, or worry that people misread you. Writing down your intentions before a new start can help you stay clear about who you are and what you want.',
    },
    mc: {
      blend: 'Ideals and imagination shape your public role, and people may see you as artistic or caring. Work that helps others or lets you dream big can feel meaningful, so choose paths that feed your sense of purpose.',
      ease: 'With Neptune in easy contact, compassion and vision lend your career a sense of meaning. Creative or caring fields may suit you, and your intuition can help you pick a fitting direction.',
      tension: 'Confusion about your goals may make it hard to settle on one clear path. Talking plans over with a trusted friend and checking the practical details can keep your dreams from drifting into wishful thinking.',
    },
  },
  pluto: {
    asc: {
      blend: 'Pluto here gives you an intense presence, and people may sense a hidden depth in you right away. You often notice what others miss, so use that gift with care as you build trust with someone new.',
      ease: 'Inner strength steadies the way you meet the world, so you tend to enter new places with calm focus. Reading people quickly may come easily, which helps you start new ventures with clear insight.',
      tension: 'A strong need for control can make you guarded with new people. Letting others see a little of your softer side can ease the tension and help them feel safer around you.',
    },
    mc: {
      blend: 'Your public path may pass through deep changes, as Pluto links your career to power and renewal. Roles with big responsibility or research may draw you, and owning your influence helps you use it well.',
      ease: 'Resilience works in your favor at work, helping you rebuild after setbacks and keep moving. Others may see you as someone who can handle hard moments, so trust your ability to lead through change.',
      tension: 'Power struggles at work may show up along your path, testing how you handle authority. Choosing honesty over control and letting go of old grudges can turn those tense moments into real growth.',
    },
  },
};
