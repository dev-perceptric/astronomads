import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "venus-mars",
  title: "Venus and Mars Sign Calculator: Your Love and Desire Signs",
  description: "Find your Venus sign and Mars sign from your birth date. Read what attracts you, how you love, how you chase goals and how the two signs work together.",
  h1: "Your Venus and Mars",
  lead: "Venus shows how you love and what attracts you. Mars shows how you go after what you want. Enter your birth date to find both, with readings for each.",
  sections: [
    {
      id: "what-venus-and-mars-signs-mean",
      title: "What Venus and Mars signs mean",
      paras: [
        "Venus and Mars are the two planets of attraction in astrology. Venus describes how you love: what you find beautiful, how you show affection and what makes you feel valued. Mars describes how you act: how you chase goals, how you handle anger and what sparks your desire. Together they explain a lot about your love life, and a lot about your energy outside of love too.",
        "Venus is also the planet of taste and pleasure. Your Venus sign can describe the music, clothes and places you enjoy, along with your sense of fairness and the things you value most. Mars is the planet of courage and action. Your Mars sign can describe how you exercise, how you compete and how you respond when someone stands in your way.",
        "Neither planet belongs to one gender. Everyone has both, and everyone uses both. You may attract people through your Venus and pursue them through your Mars, or the other way around. Many people find that their Venus sign explains what they want in a partner, while their Mars sign explains how they act on it. Reading the two together shows the full arc of attraction.",
      ],
    },
    {
      id: "how-we-calculate-your-venus-and-mars-signs",
      title: "How we calculate your Venus and Mars signs",
      paras: [
        "The Venus and Mars Sign Calculator needs your birth date, and a time and city are optional. We compute the true positions of Venus and Mars for your birth with the astronomy-engine library. Both planets move far more slowly than the Moon, so for most birthdays the date alone is enough. When either planet changed signs on your birth day, the result tells you, so you know a time is needed to settle it.",
        "Venus usually spends about a month in a sign, and Mars usually spends about six to eight weeks, though both linger much longer during a retrograde. Venus also stays close to the Sun in our sky, never more than about 47 degrees away. That means your Venus sign is always your Sun sign or one of the two signs on either side of it. Mars can sit in any sign, whatever your Sun sign.",
        "The result also notes whether either planet was retrograde at your birth, describes how your Venus sign and Mars sign relate to each other, and shows where Venus and Mars are in the sky today. That last part lets you see when today's Venus or Mars is passing through your own Venus or Mars sign, which many people notice as a lively time for love or energy.",
      ],
    },
    {
      id: "how-to-read-your-venus-and-mars-result",
      title: "How to read your Venus and Mars result",
      paras: [
        "Start with your Venus sign. Read what attracts you, how you show love and what you need in order to feel loved, since these readings are the heart of Venus. Then read your Mars sign: how you chase goals, how you handle anger and what drives your desire. Test each reading against real moments, such as a crush you remember well or the last time you lost your temper.",
        "Then look at the notes. A retrograde note means that planet's energy tends to turn inward and mature with time. A sign change note means you were born on the day Venus or Mars changed signs, so check your birth time to know which sign you have. The relationship note explains how your Venus and Mars signs get along, such as sharing an element or sitting at a square.",
      ],
      list: {
        title: "What your Venus and Mars result shows",
        items: [
          "Your Venus sign and Mars sign",
          "What attracts you",
          "How you show love",
          "What you need in love",
          "How you chase goals",
          "How you handle anger",
          "What drives your desire",
          "Retrograde and sign change notes",
          "How the two signs relate",
          "Venus and Mars in the sky today",
        ],
      },
    },
    {
      id: "venus-sign-by-sign",
      title: "Venus sign by sign: how each sign loves",
      paras: [
        "Your Venus sign is your love language in astrology. It shows what feels romantic to you and what kind of gestures you notice most. Read the note for your own Venus sign, and if you know a partner's Venus sign, read theirs too. Many arguments in love come from two people offering affection in the style they like instead of the style the other person needs.",
        "Venus also shows how you treat yourself. The pleasures your Venus sign loves are a good guide to self-care, gifts and even home decor. A Taurus Venus may feel spoiled by a soft blanket and a home cooked meal, while a Sagittarius Venus may feel spoiled by a ticket to somewhere new. Use your sign as a gentle guide when you plan a treat.",
      ],
      list: {
        title: "The twelve Venus signs",
        items: [
          "Venus in Aries: loves the chase and bold, honest gestures. Attracted to confidence and a little challenge.",
          "Venus in Taurus: loves through touch and loyalty. Values steady care and simple pleasures.",
          "Venus in Gemini: loves through talk and play. Attracted to wit and a partner who keeps things fresh.",
          "Venus in Cancer: loves by caring and protecting. Needs emotional safety and a sense of home.",
          "Venus in Leo: loves grandly and warmly. Wants to feel adored and enjoys making a partner feel special.",
          "Venus in Virgo: loves through helpful acts and attention to detail. Shows care by fixing and improving.",
          "Venus in Libra: loves partnership and beauty. Attracted to grace and good manners.",
          "Venus in Scorpio: loves deeply and loyally. Wants total trust and a bond with real depth.",
          "Venus in Sagittarius: loves freedom and shared adventure. Attracted to honesty and big ideas.",
          "Venus in Capricorn: loves with commitment and patience. Shows care through effort and reliability.",
          "Venus in Aquarius: loves through friendship first. Needs space and a partner who accepts quirks.",
          "Venus in Pisces: loves with empathy and imagination. Attracted to tenderness and romance.",
        ],
      },
    },
    {
      id: "mars-sign-by-sign",
      title: "Mars sign by sign: how each sign acts and desires",
      paras: [
        "Your Mars sign shows how you go after what you want, in love and everywhere else. It describes your energy level, your style of courage and the way you deal with conflict. Read it alongside your Venus sign. A gentle Venus with a fiery Mars may seem soft until someone crosses a line, and a bold Venus with a careful Mars may flirt freely yet take serious steps slowly.",
        "Mars is also your guide to motivation and exercise. Some Mars signs love competition and speed, while others prefer slow strength or graceful movement. Knowing yours can help you pick goals and workouts you will stick with, and it can help you spot your anger style early, before it surprises you or the people around you. A Mars in a calm sign still has a temper, simply a slower one.",
      ],
      list: {
        title: "The twelve Mars signs",
        items: [
          "Mars in Aries: fast and brave. Acts first, flares quickly and cools down just as fast.",
          "Mars in Taurus: slow to start and very hard to stop. Steady, patient strength.",
          "Mars in Gemini: acts through words and ideas. Quick and good at debate.",
          "Mars in Cancer: protective drive. Fights hardest for family and the people it loves.",
          "Mars in Leo: proud and bold. Wants to lead and to be noticed for its effort.",
          "Mars in Virgo: precise and hardworking. Channels energy into skill and useful work.",
          "Mars in Libra: acts through partnership and diplomacy. Prefers fair solutions to open fights.",
          "Mars in Scorpio: intense focus and strong will. Holds steady under pressure and rarely gives up.",
          "Mars in Sagittarius: energetic and adventurous. Chases big goals and loves movement and travel.",
          "Mars in Capricorn: disciplined and ambitious. Climbs slowly and reaches the top.",
          "Mars in Aquarius: acts for ideas and causes. Independent and inventive.",
          "Mars in Pisces: gentle, intuitive drive. Works best when inspired and flows around obstacles like water.",
        ],
      },
    },
    {
      id: "how-venus-and-mars-signs-relate",
      title: "How your Venus and Mars signs relate",
      paras: [
        "Your result explains how your Venus sign and Mars sign relate. This relationship describes how well your loving side and your acting side work together. When they agree, what you want and how you go after it line up smoothly. When they clash, you may feel a pull between gentle and bold, which can make your love life exciting and at times confusing.",
        "The relationship comes from how many signs apart Venus and Mars sit. Signs four apart share an element and form a trine, which blends easily. Signs two apart form a sextile, a friendly, helpful link. Signs three apart form a square, which brings tension and drive. Signs six apart form an opposition, a push and pull that often draws you to partners who carry the other side.",
        "Every combination has gifts. A Venus and Mars square often brings strong attraction and a lot of passion. A trine can make love feel easy, though it may need a push to grow. Use the note in your result to understand your own pattern, and treat any tension in it as fuel you can learn to steer. Many strong couples are built on exactly that kind of spark.",
      ],
      list: {
        title: "Venus and Mars sign relationships",
        items: [
          "Same sign: love and desire fuse into one strong style.",
          "Next door signs: different styles that need conscious teamwork.",
          "Two signs apart (sextile): easy, friendly cooperation.",
          "Three signs apart (square): spark and friction that drive growth.",
          "Four signs apart (trine, same element): natural harmony.",
          "Five signs apart: very different styles that ask for steady adjustment.",
          "Six signs apart (opposition): a lively balance between two poles.",
        ],
      },
    },
    {
      id: "venus-and-mars-retrograde-at-birth",
      title: "Venus and Mars retrograde at birth",
      paras: [
        "Venus turns retrograde about every 18 to 19 months for about 40 to 43 days, and Mars about every 25 to 26 months for about 9 to 11 weeks, so a retrograde Venus or Mars at birth is fairly uncommon. Retrograde means the planet seemed to move backward through the zodiac from Earth's view. Venus does this as it passes between Earth and the Sun, and Mars does it as Earth overtakes it on the inside track.",
        "Astrologers read a retrograde Venus at birth as love that turns inward first. People with it often think deeply about what they value, may take longer to trust their own taste and often return to old loves, styles or interests. A retrograde Mars at birth suggests drive that works best when it is planned, with energy that builds slowly and then lands with real force.",
        "Your result notes either retrograde clearly. If you have one, read your Venus or Mars sign reading with that inward twist in mind. A retrograde Mars in Aries, for example, still has fire and courage, yet it may think through a fight before starting it. The Retrograde Checker can also show which of your planets were retrograde at birth and when Venus and Mars next turn retrograde in the sky.",
      ],
    },
    {
      id: "venus-and-mars-in-love-and-dating",
      title: "Venus and Mars in love and dating",
      paras: [
        "In dating, Venus often describes what you are drawn to and Mars describes how you make a move. A Venus in Cancer may love a partner who cooks and remembers family birthdays, while a Mars in Sagittarius may make the first move with a spontaneous invite to a road trip. Knowing both helps you understand your own mixed signals and explain them to someone new.",
        "Astrologers pay close attention to Venus and Mars when comparing two charts. When one person's Venus sits in the same sign or element as the other's Mars, attraction often feels strong and natural. When two Venus signs share an element, the couple usually agrees on what romance looks like. Our Compatibility page reads these cross chart links in full, along with the rest of both charts.",
        "Outside romance, the same planets describe friendship and teamwork. Your Venus shows how you make people feel welcome, and your Mars shows how you stand up for them. In daily life, a simple rule helps: lean on your Venus to build bonds and on your Mars to get things done, and notice which one you skip when you are tired.",
      ],
    },
    {
      id: "venus-and-mars-mix-ups-and-birth-time",
      title: "Venus and Mars mix ups and birth time accuracy",
      paras: [
        "A common mix up is thinking Venus is the woman's planet and Mars the man's planet in a chart. Everyone has both, and both describe parts of every person. Another is assuming your Venus sign must match your Sun sign. It often does, yet it can also be one or two signs away. People also confuse their natal Venus and Mars with the Venus and Mars in the sky today, which our result shows separately.",
        "Birth time matters less here than for the Moon or rising sign, since Venus and Mars move slowly. For most people the birth date alone gives a certain answer. The exception is a birthday when Venus or Mars changed signs. If your result shows a sign change note, add your birth time and city to find out which side of the change you were born on. A time also gives you the houses of Venus and Mars in your free birth chart.",
      ],
      list: {
        title: "Venus and Mars quick facts",
        items: [
          "Venus is always within two signs of your Sun sign.",
          "Mars can sit in any sign.",
          "Venus usually spends about a month in a sign.",
          "Mars usually spends about six to eight weeks in a sign.",
          "Retrogrades make either planet stay in a sign much longer.",
          "Both planets belong to everyone.",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-venus-and-mars-signs",
      title: "What to explore after your Venus and Mars signs",
      paras: [
        "Venus and Mars are a great start for love astrology, and the Compatibility page is the natural next step. It compares two charts, scores five themes and gives readings for the strongest links, including Venus and Mars contacts. Your free birth chart adds the houses and aspects of both planets, which bring more detail to every reading here. Tap either planet in the chart to open its full reading.",
        "For the emotional side of love, the Moon Sign Calculator shows what comforts you and how you love at home. The Big Three Calculator puts your Sun, Moon and rising together. The Today page shows the current sky against your chart, and the zodiac sign pages give deep portraits of your Venus and Mars signs. The Retrograde Checker shows when either planet next turns back.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Compatibility",
          "Free birth chart",
          "Moon Sign Calculator",
          "Big Three Calculator",
          "Retrograde Checker",
          "Today, your daily horoscope",
          "Zodiac sign pages",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What does my Venus sign mean?",
      a: "Your Venus sign describes how you love and what you value. It shows what attracts you, how you show affection and what you need to feel loved. It also describes your taste in beauty and pleasure, from music and clothes to the kind of home that feels good to you.",
    },
    {
      q: "What does my Mars sign mean?",
      a: "Your Mars sign describes how you act on what you want. It shows how you chase goals, how you handle anger and what sparks your desire. It also describes your energy level, your style of courage and the kind of exercise or competition that suits you best.",
    },
    {
      q: "Do I need a birth time to find my Venus and Mars signs?",
      a: "Usually the date is enough. Venus and Mars move slowly, so they stay in one sign for weeks. The only exception is a birthday when one of them changed signs. The calculator tells you when that happened so you can add a time to settle it. A time also gives you the houses of both planets in your birth chart.",
    },
    {
      q: "Why is my Venus sign close to my Sun sign?",
      a: "Venus stays near the Sun in our sky, never more than about 47 degrees away. So your Venus sign is always your Sun sign or one of the two signs on either side. A Gemini Sun, for example, can only have Venus in Aries, Taurus, Gemini, Cancer or Leo.",
    },
    {
      q: "What if my Venus or Mars was retrograde at birth?",
      a: "A retrograde Venus or Mars at birth suggests that planet's energy works inward first. With Venus, you may reflect deeply on what you value and return to old loves or styles. With Mars, your drive may build slowly and land with force. It is less common and carries real gifts.",
    },
    {
      q: "What does it mean when Venus and Mars are in the same sign?",
      a: "Love and desire speak one language. What attracts you and how you go after it line up closely, which can make you very clear and direct in romance. The style of that sign shows up strongly in your love life, and partners usually find you easy to read.",
    },
    {
      q: "Which Venus and Mars signs are compatible?",
      a: "Signs in the same element tend to pair easily, such as a fire Venus with a fire Mars. Fire and air support each other, and so do earth and water. Opposite signs often attract strongly. For a real answer, compare two full charts on our Compatibility page, which looks at every planet and scores five themes.",
    },
    {
      q: "Where are Venus and Mars today?",
      a: "The calculator shows the current signs of Venus and Mars in the sky. When today's Venus passes through your Venus sign, many people feel more social and romantic. When today's Mars passes through your Mars sign, energy often runs high. Venus comes back to your Venus sign roughly once a year, and Mars about every two years.",
    },
    {
      q: "Is Venus about women and Mars about men?",
      a: "No. Everyone has both planets in their chart, and both describe parts of every person. Venus is how you love and receive, and Mars is how you pursue and protect. People of any gender can have a strong Venus, a strong Mars or a balance of both.",
    },
  ],
};
