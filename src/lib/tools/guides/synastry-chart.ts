import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "synastry-chart",
  title: "Synastry Chart Calculator: Free Double Wheel With House Overlays",
  description: "Free synastry chart calculator. See two charts as a double wheel, every cross aspect in a grid, and where each person's planets land in the other's houses.",
  h1: "Synastry Chart Calculator",
  lead: "A synastry chart sets one person's planets inside the other person's chart, so every link between you shows at a glance. Enter both births to draw your double wheel.",
  sections: [
    {
      id: "what-is-a-synastry-chart",
      title: "What a synastry chart is",
      paras: [
        "A synastry chart is a way to see two birth charts at once. One person's chart forms the outer wheel, with its signs, houses and planets. The other person's planets sit on an inner ring, placed at their own degrees. Lines across the center connect planets that form aspects between the two charts. The result is a double wheel that shows, in one picture, how two people meet each other.",
        "The word synastry comes from Greek roots meaning stars together. Astrologers have compared charts this way for a very long time, mostly for couples, though it works just as well for friends, family and coworkers. Each line in the center is a contact: a place where something in you touches something in the other person. Some contacts feel warm and easy, and others bring spark and stretch.",
        "Synastry differs from a relationship chart. A composite or Davison chart blends two people into one new chart. A synastry chart keeps both people whole and shows the meeting point between them. It answers questions like how your Moon feels around their Mars, or which part of your life their Venus lights up. That makes it the most personal of the two person views on Astronomads.",
      ],
    },
    {
      id: "how-we-draw-the-synastry-chart",
      title: "How we draw your synastry chart",
      paras: [
        "The Synastry Chart Calculator asks for both birth dates, birth times and birth cities. We turn each local time into Universal Time using the city's own time zone history, then compute true planet positions with the astronomy-engine library, the same engine behind our free birth chart. Each chart gets its own Ascendant, Midheaven and Placidus houses, built from its own birth time and place.",
        "Next we compare every planet in one chart with every planet in the other, from the Sun out to Pluto. Wherever two planets form a conjunction, sextile, square, trine or opposition, we record a cross aspect. We use orbs a little tighter than the ones for a single birth chart, so the links on your wheel are the clearer ones. Each cross aspect then gets its own reading.",
        "The wheel starts with your chart on the outside and the other person's planets on the inner ring. A switch swaps the two, so their chart becomes the outer wheel and your planets move inside. Below the wheel you find the house overlays in both directions and a grid of every cross aspect. Nothing about the aspects changes when you swap. Only the houses do, since each wheel uses its owner's houses.",
      ],
      list: {
        title: "What your synastry chart shows",
        items: [
          "A double wheel with one chart outside and the other's planets inside",
          "Cross aspect lines drawn across the center",
          "A switch to swap whose chart sits on the outside",
          "Their planets in your houses, with readings",
          "Your planets in their houses, with readings",
          "A grid of every cross aspect between the two charts",
        ],
      },
    },
    {
      id: "how-to-read-a-synastry-chart",
      title: "How to read a synastry chart",
      paras: [
        "Begin with the wheel as a whole. Notice where the inner planets cluster. If several of the other person's planets crowd into one area of your chart, that area of life is where you feel them most. Then look at the center. Many lines between the Sun, Moon, Venus and Mars usually mean a bond that feels personal and lively from the very first meeting.",
        "Next, read the grid. Each row is one planet from the first chart, and each column is one planet from the second. A filled cell shows the aspect between them. Start with the contacts that involve the Sun, Moon, Venus, Mars and the Ascendant, since those touch daily life most. Then move on to Mercury for talk and Saturn for commitment. Read the outer planets last.",
        "Finally, read the house overlays in both directions. They often explain feelings that aspects leave out. Your partner's Moon in your 4th house can make them feel like home to you, even with few aspects. Keep a short note of the contacts that ring true. Over time you will see that a handful of strong links tell most of the story of your bond.",
      ],
      list: {
        title: "A simple reading order",
        items: [
          "Look at where the inner planets cluster",
          "Read the Sun and Moon contacts",
          "Read the Venus and Mars contacts",
          "Check Mercury for talk and Saturn for staying power",
          "Read the house overlays both ways",
          "Read the outer planet contacts last",
        ],
      },
    },
    {
      id: "synastry-chart-aspects",
      title: "Synastry chart aspects and the cross aspect grid",
      paras: [
        "An aspect is an angle between two planets. In synastry the two planets belong to different people, so each aspect describes how one person's energy meets the other's. A conjunction blends the two planets into one strong theme. A sextile or trine brings ease, the feeling of being understood without effort. A square or opposition brings tension, which often shows up as chemistry, challenge and growth.",
        "Tense aspects are far from bad news. Many lasting couples have strong squares between their charts, and those contacts keep the bond awake and moving. Easy aspects bring comfort, though a chart with only easy links can feel sleepy at times. A healthy mix is common. The grid helps you see that mix at a glance, so you can enjoy the easy links and work kindly with the tense ones.",
      ],
      list: {
        title: "The five aspects in a synastry chart",
        items: [
          "Conjunction, 0 degrees: two planets blend into one strong theme",
          "Sextile, 60 degrees: friendly support and easy teamwork",
          "Square, 90 degrees: friction that pushes you both to grow",
          "Trine, 120 degrees: natural ease and shared rhythm",
          "Opposition, 180 degrees: attraction of opposites and a call for balance",
        ],
      },
    },
    {
      id: "synastry-chart-house-overlays",
      title: "Synastry chart house overlays, house by house",
      paras: [
        "A house overlay shows where one person's planets land in the other person's houses. If your Venus falls in your partner's 7th house, your affection lands right in their area of partnership, so they may feel drawn to commit. Overlays work in both directions and rarely match, which is why the calculator shows both lists. Each planet in each house comes with its own reading.",
        "The house tells you where in life you feel the other person most. Sun overlays light up an area and make it feel important. Moon overlays bring comfort and familiar feelings. Venus overlays bring pleasure and warmth, while Mars overlays bring energy and sometimes heat. Saturn overlays bring structure and a sense of duty. Use the list below as a quick guide to each house.",
      ],
      list: {
        title: "Synastry chart overlays in each house",
        items: [
          "1st house: they shape how you see yourself",
          "2nd house: money, comfort and what you value",
          "3rd house: daily talk and shared ideas",
          "4th house: home and a feeling of family",
          "5th house: fun, romance and play",
          "6th house: routines, chores and health habits",
          "7th house: partnership and commitment",
          "8th house: trust, intimacy and deep change",
          "9th house: travel and new beliefs",
          "10th house: career and public life",
          "11th house: friendship and future hopes",
          "12th house: private feelings and quiet healing",
        ],
      },
    },
    {
      id: "synastry-chart-key-contacts",
      title: "Key contacts in a synastry chart",
      paras: [
        "Some contacts carry more weight than others. The Sun and Moon are the heart of a chart, so links between one person's Sun and the other's Moon are classic signs of a warm match. One person's sense of purpose meets the other's emotional needs, and both feel seen. Moon to Moon contacts show how easily you share a home, a mood or a lazy Sunday together.",
        "Venus and Mars contacts describe attraction. When one person's Venus meets the other's Mars, there is often a clear romantic and physical spark. Mercury contacts show how well you talk and plan. Saturn contacts are often called the glue of long relationships, since Saturn brings loyalty and staying power, though it can also feel heavy at times. Jupiter contacts bring generosity and hope.",
        "Pay close attention to contacts with the Ascendant, if both birth times are known. A planet touching the other person's Ascendant is felt right away, often at the first meeting. Your partner's Sun on your Ascendant can make them feel like a mirror of who you want to be. Their Mars there can feel exciting and pushy in equal measure.",
      ],
      list: {
        title: "Contacts to look at first",
        items: [
          "Sun with Moon: purpose meets feeling",
          "Moon with Moon: shared comfort and moods",
          "Venus with Mars: attraction and spark",
          "Mercury with Mercury: how you talk and plan",
          "Saturn with personal planets: commitment and staying power",
          "Any planet on the other's Ascendant: first impressions",
        ],
      },
    },
    {
      id: "synastry-chart-uses",
      title: "Practical uses for a synastry chart",
      paras: [
        "Couples use the synastry chart to understand why some things feel easy and others take work. If your Mercury squares your partner's Mercury, you may simply think in different ways. Knowing that helps you slow down in arguments and ask more questions. If your Moon trines their Venus, you can lean on that ease when the rest of life feels busy.",
        "The chart is just as useful outside romance. Friends can see why they laugh so easily together. A parent can see which of their planets land in a child's houses and how their care is felt. Coworkers can compare Mercury and Mars to plan meetings that suit both styles. For these bonds, our Friendship, Work and Parent and Child tools add theme scores with wording made for each.",
        "You can also use synastry to grow. Tense contacts point to places where you rub against each other, and those same places are where you learn the most. Pick one tense aspect, read it together and agree on one small habit that helps. A couple with a Mars square Moon might agree to pause before replying when feelings run high.",
      ],
    },
    {
      id: "synastry-chart-mix-ups",
      title: "Common synastry chart mix ups",
      paras: [
        "The most common mix up is counting aspects like points in a game. One strong Sun and Moon link can outweigh ten small ones. Another mix up is treating every outer planet contact as personal. Uranus, Neptune and Pluto move so slowly that people born within a few years of each other share many of the same contacts. Those links describe your whole generation, so give them a lighter touch.",
        "People also forget that synastry runs in two directions. Your Venus in their 5th house is a different story from their Venus in your 5th house. Each person may feel the bond in a different part of life, and both views are true. Finally, a synastry chart describes potential. Two people with very few aspects can still share a deep and happy life, built through choice and care.",
      ],
    },
    {
      id: "synastry-chart-birth-times",
      title: "Birth time accuracy in a synastry chart",
      paras: [
        "Birth times matter most for houses and angles. Your houses come from your birth time, so the overlays in your chart need your time to be right. Their overlays need their time. If one time is unknown, read the overlays in that person's chart as rough, and focus on the aspects between planets, which hold up well across a few hours for every planet except the Moon.",
        "The Moon moves about 13 degrees a day, so a missing time can move it by up to about 7 degrees either way. That can add or remove a Moon aspect, or even change the Moon sign. If a Moon contact feels important, check whether it holds across the whole day. The Ascendant and Midheaven turn through the whole zodiac each day, so treat those contacts as unknown without a time.",
      ],
      list: {
        title: "How birth times affect a synastry chart",
        items: [
          "Sun to Saturn aspects: steady across a full day",
          "Moon aspects: can shift by up to about 7 degrees without a time",
          "House overlays: need the house owner's birth time",
          "Ascendant and Midheaven contacts: need both times to be close",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-synastry-chart",
      title: "What to explore after your synastry chart",
      paras: [
        "The synastry chart shows every link between two people. For a summary, the Compatibility page at /compatibility turns those links into five theme scores with readings. The Composite Chart Calculator and the Davison Chart Calculator show the relationship as a single chart of its own. Reading all three gives you the pull between you and the shape of what you build together.",
        "For a gentle start, the sign pair pages read your two Sun signs in depth, such as Taurus and Scorpio at /compatibility/taurus-and-scorpio. The zodiac sign pages at /zodiac add detail for each sign in your charts. Every free calculator lives at /tools, including Best Dates Together for planning time as a pair and the Couple's Year Ahead for the months to come.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Compatibility with theme scores at /compatibility",
          "Composite Chart Calculator",
          "Davison Chart Calculator",
          "Sign pair pages such as /compatibility/taurus-and-scorpio",
          "Zodiac sign pages at /zodiac",
          "Every free calculator at /tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a synastry chart?",
      a: "A synastry chart compares two birth charts by placing one person's planets inside the other person's wheel. Lines in the center show the aspects between the two charts, and house overlays show where each person's planets land in the other's houses. It is the classic way astrologers study how two people affect each other.",
    },
    {
      q: "How do I read a double wheel?",
      a: "The outer wheel is one person's full chart, with signs, houses and planets. The inner ring holds the other person's planets at their own degrees. Read where the inner planets fall in the outer houses, then follow the lines across the center to see the aspects. Use the switch to see it the other way around.",
    },
    {
      q: "What does the switch on the synastry chart do?",
      a: "The switch swaps whose chart sits on the outside. The aspects between you stay the same, since an angle between two planets is the same from either side. The houses change, because each wheel uses the birth time and place of the person on the outside. That is how you see overlays in both directions.",
    },
    {
      q: "What are house overlays in synastry?",
      a: "House overlays show where one person's planets fall in the other person's houses. They tell you which areas of life each person touches in the other. Your partner's Venus in your 7th house can make them feel like a natural partner, while their Mars in your 10th may push your career forward.",
    },
    {
      q: "Which synastry aspects matter most?",
      a: "Contacts between the Sun, Moon, Venus, Mars and the Ascendant carry the most weight in daily life. Sun and Moon links show deep understanding, Venus and Mars links show attraction, and Saturn links often show commitment. Outer planet contacts are shared by a whole generation, so give them a lighter touch.",
    },
    {
      q: "Are square and opposition aspects bad in synastry?",
      a: "They bring tension, which often feels like chemistry and challenge. Many strong couples have squares and oppositions between their charts, and those links keep the bond lively. The key is to name the friction and agree on small habits that help. Easy aspects bring comfort, and a mix of both is very common.",
    },
    {
      q: "Do I need birth times for a synastry chart?",
      a: "Birth dates give you most of the aspects. Birth times add the houses, the overlays and the angles, and they make Moon contacts exact. Without a time, the Moon can be off by up to about 7 degrees. Read Moon contacts with care and treat house overlays in that chart as rough.",
    },
    {
      q: "Is synastry the same as a composite chart?",
      a: "They are different views. Synastry keeps both charts whole and shows how they meet. A composite chart blends the two into one new chart made from midpoints, and a Davison chart uses the moment and place halfway between two births. Many people read synastry first, then a relationship chart.",
    },
    {
      q: "Can I use a synastry chart for friends or coworkers?",
      a: "Yes. The double wheel works for any two people. The aspects and overlays describe how you affect each other in any bond. For theme scores and wording made for friendship, work or family, try the Friendship Compatibility, Work Compatibility and Parent and Child tools on the tools page.",
    },
  ],
};
