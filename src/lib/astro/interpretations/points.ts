import type { PointKey } from '../chart';
import type { NodeKey } from '../constants';

export type PointInfo = {
  /** Short role, e.g. "Your core self" */
  role: string;
  /** 3 to 5 single words or short pairs, e.g. ["identity", "vitality", "purpose"] */
  keywords: string[];
  /** 2 to 3 sentences, 35 to 70 words: what this point stands for in a birth chart */
  text: string;
};

/** What each point stands for. Original Astronomads copy. */
export const POINT_INFO: Record<Exclude<PointKey, NodeKey>, PointInfo> = {
  sun: {
    role: 'Your core self',
    keywords: ['identity', 'vitality', 'purpose', 'will'],
    text: 'The Sun shows the part of you that wants to shine and be seen for who you are. It points to what gives you energy and a sense of purpose. When you live in line with your Sun, you feel steady and more like yourself.',
  },
  moon: {
    role: 'Your inner needs',
    keywords: ['feelings', 'comfort', 'instinct', 'home'],
    text: 'The Moon describes how you feel and what you need to feel safe. It speaks to your moods and to the kind of care that settles you after a long day. People who know you well often see your Moon before they see your Sun.',
  },
  mercury: {
    role: 'Your thinking mind',
    keywords: ['thought', 'speech', 'learning', 'curiosity'],
    text: 'Mercury shows how you take in ideas and put them into words. It colors the way you learn and the way you talk things through with others. Its place in your chart hints at the topics that hold your attention and the style of conversation you enjoy most.',
  },
  venus: {
    role: 'What you love',
    keywords: ['love', 'beauty', 'pleasure', 'values'],
    text: 'Venus shows what you find beautiful and how you give and receive affection. It points to the things you value, from friendships to the colors you wear. Its sign and house describe what makes you feel close to someone and what helps you relax into joy.',
  },
  mars: {
    role: 'Your drive',
    keywords: ['action', 'courage', 'desire', 'energy'],
    text: 'Mars is your engine. It shows how you go after what you want and how you respond when something stands in your way. Knowing your Mars helps you use your energy well, whether that means speaking up for yourself or pushing through a hard week.',
  },
  jupiter: {
    role: 'Where you grow',
    keywords: ['growth', 'faith', 'generosity', 'wisdom'],
    text: 'Jupiter shows where life tends to open up for you and where you feel hopeful. It is linked to learning and to the beliefs that give your life meaning. In your chart it marks an area where saying yes to bigger plans often brings out your best.',
  },
  saturn: {
    role: 'Your structure',
    keywords: ['discipline', 'limits', 'responsibility', 'mastery'],
    text: 'Saturn shows where you learn through effort and patience. It can feel like a strict teacher at first, asking you to slow down and build things properly. Over time, the area Saturn touches often becomes a source of real skill and self-respect.',
  },
  uranus: {
    role: 'Your spark of change',
    keywords: ['freedom', 'originality', 'change', 'insight'],
    text: 'Uranus points to the part of you that wants freedom and does things its own way. It brings sudden ideas and a need to break from habits that feel stale. Where it sits in your chart, you may surprise people, and yourself, with fresh choices.',
  },
  neptune: {
    role: 'Your dreams',
    keywords: ['imagination', 'compassion', 'intuition', 'ideals'],
    text: 'Neptune is linked to imagination and the longing for something beyond everyday life. It shows where you dream freely and pick up on moods that others miss. The area it touches asks for clear boundaries so your kindness and your ideals stay grounded.',
  },
  pluto: {
    role: 'Your power to renew',
    keywords: ['transformation', 'depth', 'power', 'rebirth'],
    text: 'Pluto shows where you go deep and where life asks you to let go and begin again. It is tied to strong feelings and personal power. The area it touches can bring intense chapters, and each one leaves you wiser and more sure of your own strength.',
  },
  asc: {
    role: 'How you meet the world',
    keywords: ['first impression', 'style', 'body', 'approach'],
    text: 'Your Ascendant, or rising sign, is the sign that was rising on the eastern horizon when you were born. It shapes the first impression you make and the way you step into new places. Think of it as the front door of your chart, the style people notice before they know you.',
  },
  mc: {
    role: 'Your public path',
    keywords: ['career', 'reputation', 'calling', 'direction'],
    text: 'The Midheaven is the highest point of your chart at the moment of your birth. It speaks to your work in the world and the reputation you build over the years. Its sign hints at the kind of role where you feel proud of what you do.',
  },
};
