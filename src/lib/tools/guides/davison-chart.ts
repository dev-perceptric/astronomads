import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "davison-chart",
  title: "Davison Chart Calculator: Free Relationship Chart for Two",
  description: "Free Davison chart calculator. Find the moment and place halfway between two births, see the relationship wheel, and read its planets by sign and house.",
  h1: "Davison Chart Calculator",
  lead: "A Davison chart is a real sky for the moment halfway between two births, cast at the place halfway between two birthplaces. Enter both births to see the chart of your relationship.",
  sections: [
    {
      id: "what-is-a-davison-chart",
      title: "What a Davison chart is",
      paras: [
        "A Davison chart is a single birth chart for a relationship. It is cast for the moment exactly halfway in time between two births, at the spot on Earth halfway between the two birthplaces. If one of you was born in March 1990 and the other in March 1994, the Davison moment falls in March 1992. The sky at that moment becomes the chart of the bond you share, as if the relationship had a birthday of its own.",
        "The method is named after Ronald Davison, a British astrologer who wrote about it in the 1970s. He wanted a chart that described a couple as one unit, with its own Sun, Moon and rising sign. Since a Davison chart is a real moment in time, you can read it with every tool you would use on a personal chart. Signs, houses, aspects and even the Moon phase all work the same way here.",
        "Davison charts work for any pair of people. Couples use them most, yet friends, business partners, siblings and parents with grown children can learn from them too. The chart describes what the two of you create together. It speaks to the shared space between you, the mood that fills a room when you are both in it and the purpose that keeps bringing you back.",
      ],
    },
    {
      id: "how-we-calculate-the-davison-chart",
      title: "How we calculate the Davison chart",
      paras: [
        "Our Davison Chart Calculator asks for both birth dates, birth times and birth cities. First we turn each local birth time into Universal Time using the city's own time zone history, so daylight saving and old clock changes are handled for you. Then we find the exact instant halfway between the two births. A gap of 8 years and 6 months, for example, puts the Davison moment 4 years and 3 months after the first birth, down to the minute.",
        "Next we find the halfway place. The latitude is the average of the two birth latitudes. The longitude is the midpoint of the two birth longitudes, measured the shorter way around the globe. Someone born in New York and someone born in Los Angeles get a Davison place in southern Kansas. Two people born in the same town get that same town. The place can land in open sea, which is fine, since the sky above it is still a real sky.",
        "With the moment and the place set, we cast a full chart with the astronomy-engine library, the same engine behind our free birth chart. Planet positions are true positions for that instant. The Midheaven and Ascendant come from the local sky at the Davison place, and the houses are Placidus, just like your own chart on Astronomads. The readings then describe the planets by sign and by house.",
      ],
      list: {
        title: "Steps behind every Davison chart",
        items: [
          "Each birth turned into Universal Time",
          "The exact halfway instant between the two births",
          "The average of the two birth latitudes",
          "The longitude midpoint, the shorter way around",
          "A full chart cast for that moment and place",
          "Readings for the planets by sign and by house",
        ],
      },
    },
    {
      id: "how-to-read-your-davison-chart",
      title: "How to read your Davison chart result",
      paras: [
        "Your result opens with the Davison date, time and place, so you can see the moment your relationship chart describes. Below that sits the wheel, drawn like any birth chart, with the planets around the outside and the Placidus house lines inside. Then come the readings. First you get the Sun, Moon, Mercury, Venus, Mars and Ascendant by sign, followed by the Sun, Moon, Venus and Mars by house.",
        "Start with the Davison Sun. It shows the purpose of the bond, what the two of you are building and what lights you both up when you are together. Then read the Davison Moon for the emotional climate, the things that make your shared life feel safe. Venus and Mars describe affection and drive inside the pair, and Mercury shows how you talk. The Ascendant is the face the relationship shows to friends and family.",
        "The houses add a setting. A Davison Sun in the 4th house places the heart of the bond at home, while a Davison Sun in the 10th turns it toward shared goals and public life. Read the house next to the sign for each planet, and test every line against real moments you have lived together. The readings that ring true are the ones worth keeping close.",
      ],
      list: {
        title: "What your Davison chart result shows",
        items: [
          "The Davison date and time",
          "The Davison place halfway between your birthplaces",
          "A full chart wheel with Placidus houses",
          "The Davison Sun, Moon and Mercury by sign",
          "The Davison Venus, Mars and Ascendant by sign",
          "The Sun, Moon, Venus and Mars by house",
        ],
      },
    },
    {
      id: "davison-chart-vs-composite-chart",
      title: "Davison chart vs composite chart",
      paras: [
        "The composite chart and the Davison chart are both charts of a relationship, and people often confuse them. A composite chart takes each pair of planets, such as your Venus and your partner's Venus, and finds the midpoint between them along the zodiac. The result is a set of halfway points that belong to no single moment in the sky. A Davison chart finds a halfway moment in time and a halfway place on Earth, then reads the real sky there.",
        "That difference matters in a few ways. In a Davison chart every planet sits where it truly was, so the chart follows the rules of the real sky. Mercury stays close to the Sun, Venus stays within about 47 degrees of it, and the Moon phase is a true phase. Planets can be retrograde, just as in a birth chart. A composite chart has no real retrogrades, and now and then its midpoints place a planet somewhere the real sky would never put it.",
        "The slow planets often land in similar places in both charts, while the Sun, the Moon and the Ascendant can differ a lot, sometimes by whole signs. Many astrologers read both. The composite is often described as the inner design of a relationship, and the Davison as the relationship living in real time. Our Composite Chart Calculator gives the same readings, so you can open both and see which picture feels more like the two of you.",
      ],
    },
    {
      id: "davison-chart-planets",
      title: "The planets in a Davison chart",
      paras: [
        "Each planet in a Davison chart describes one part of your shared life. The sign shows the style. A fire sign brings warmth and quick action, an earth sign brings patience and practical care, an air sign brings talk and ideas, and a water sign brings feeling and closeness. Read each planet's sign as the way that part of the relationship likes to work when things go well, and as a hint about what it needs when things feel stuck.",
        "The Davison Sun and Moon carry the most weight. When they sit in signs that get along, such as signs of the same element or signs two apart, the purpose of the bond and its comfort tend to pull the same way. When they sit in signs that clash, the pair may feel a lively push between what it wants to do and what it needs to feel safe. That push often becomes the engine of your growth as a couple.",
      ],
      list: {
        title: "The Davison chart points we read",
        items: [
          "Sun: the shared purpose and what the bond is here to build",
          "Moon: the emotional climate and what makes you feel safe together",
          "Mercury: how you talk, plan and solve problems as a pair",
          "Venus: affection and the pleasures you enjoy together",
          "Mars: shared drive and how you handle conflict",
          "Ascendant: the first impression the relationship gives others",
        ],
      },
    },
    {
      id: "davison-chart-houses",
      title: "Davison chart houses: where the relationship lives",
      paras: [
        "With both birth times, the Davison chart has a full set of Placidus houses. We read the house of the Sun, Moon, Venus and Mars. A planet's house shows the area of life where that part of the relationship does its main work. Two people with a Davison Venus in the 5th house may find their sweetest moments in play and creative projects, while a Davison Venus in the 2nd may show love through shared comforts and a well kept budget.",
        "Houses are the most time sensitive part of the chart. If one birth time is off by an hour, the Davison moment moves by half an hour, and the house lines shift with it. A planet near a house line may then fall into the next house. When that happens, read both houses and keep the one that matches your life together. Your own experience is the best tiebreaker you have.",
      ],
      list: {
        title: "Davison chart houses at a glance",
        items: [
          "1st house: the bond as a shared identity",
          "2nd house: money and shared values",
          "3rd house: daily talk and short trips",
          "4th house: home and family roots",
          "5th house: fun, romance and creative play",
          "6th house: routines and health habits",
          "7th house: partnership and commitment",
          "8th house: trust, intimacy, shared money and deep change",
          "9th house: travel and big beliefs",
          "10th house: shared goals and public life",
          "11th house: friends and future hopes",
          "12th house: rest and private healing",
        ],
      },
    },
    {
      id: "davison-chart-uses",
      title: "Practical uses for a Davison chart",
      paras: [
        "For couples, the Davison chart is a way to talk about the relationship as a third thing in the room. Instead of 'you always' or 'I never', you can look at the chart and ask what the bond itself needs. A Davison Moon in Cancer may ask for regular nights in, while a Davison Mars in Sagittarius may ask for trips and new plans. Naming those needs out loud makes them far easier to meet.",
        "The chart also works for friends, family and business partners. Two founders can read the Davison Mercury and the 10th house for clues about how they plan and present their work. Siblings can read the Davison Moon to understand the mood of the home they grew up in together. Old friends may find that the Davison Sun names the reason they keep finding their way back to each other after years apart.",
        "Because the Davison chart is a real chart, astrologers also follow transits to it, as they would to a personal chart. When a slow planet crosses the Davison Sun or Moon, the relationship may enter a new chapter. Our Couple's Year Ahead tool uses the composite chart for this kind of timing, and many people like to read the two side by side for a fuller view.",
      ],
      list: {
        title: "Good questions to bring to a Davison chart",
        items: [
          "What is this bond here to build?",
          "What helps us feel safe together?",
          "How do we make decisions as a pair?",
          "Where in life do we shine the most?",
          "How do we look to the people around us?",
        ],
      },
    },
    {
      id: "davison-chart-mix-ups",
      title: "Common Davison chart mix ups",
      paras: [
        "The most common mix up is treating the Davison chart as a score. It describes a relationship, and it gives no grade. Every chart has easy parts and stretching parts, and a Davison chart with many tense aspects can belong to a long, loving and lively bond. The tensions often point to the work the two of you do best together, the places where you keep each other growing.",
        "Another mix up is reading the Davison chart as if it belonged to one of you. The Davison Sun may be in a sign neither of you has, and that is normal. It describes what you create together. People also mix up the Davison place with a place to live or travel to. It is a point used for the math, and the bond needs no visit there to work.",
        "A third mix up is expecting the Davison chart and the composite chart to agree on everything. They use different methods, so their fast points often differ. Neither one is wrong. Read the themes they share with extra confidence, and treat the differences as two views of the same bond. Over time, many couples find that one of the two simply speaks to them more.",
      ],
    },
    {
      id: "davison-chart-birth-times",
      title: "Birth time accuracy in a Davison chart",
      paras: [
        "Birth times shape the Davison chart in a simple way. The Davison moment is the average of the two births, so an error in one birth time is cut in half. If one time is off by an hour, the Davison moment moves by 30 minutes. In that half hour the Davison Moon moves only about a quarter of a degree, so the Moon sign rarely changes. The Ascendant can move several degrees, though, since it turns through the whole zodiac each day.",
        "When one or both birth times are unknown, read the Davison planets by sign with confidence and treat the Ascendant and houses as open questions. The Sun, Mercury, Venus and Mars move slowly enough that a few hours make little difference. The Moon moves about 13 degrees a day, so a Davison Moon within about 7 degrees of a sign edge could belong to the neighboring sign. Read both Moon signs in that case.",
      ],
      list: {
        title: "Where to look for a birth time",
        items: [
          "A long form birth certificate",
          "Hospital or clinic records",
          "A baby book or birth announcement",
          "Parents or older relatives",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-davison-chart",
      title: "What to explore after your Davison chart",
      paras: [
        "The Davison chart is one view of a relationship. The Compatibility page at /compatibility compares your two charts directly, with theme scores and every contact between them. The Composite Chart Calculator builds the midpoint version of your relationship chart, and the Synastry Chart draws both charts as a double wheel with house overlays. Together they show the bond from the inside and from each person's side.",
        "If you want to start with the basics, the sign pair pages read your two Sun signs in depth, such as Aries and Leo at /compatibility/aries-and-leo. The zodiac sign pages at /zodiac explain the sign of your Davison Sun or Moon in more detail. You can browse every free calculator at /tools, from Big Three Compatibility to Best Dates Together, whenever you want a new angle on the two of you.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Compatibility for two full charts at /compatibility",
          "Composite Chart Calculator",
          "Synastry Chart with house overlays",
          "Sign pair pages such as /compatibility/aries-and-leo",
          "Zodiac sign pages at /zodiac",
          "Every free calculator at /tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a Davison chart?",
      a: "A Davison chart is a relationship chart cast for the moment halfway in time between two births, at the place halfway between the two birthplaces. It is a real sky at a real moment, so it has true planet positions, a true Moon phase and its own houses. Astrologers read it as the birth chart of the bond itself.",
    },
    {
      q: "How is the Davison chart calculated?",
      a: "We turn both births into Universal Time and find the exact instant halfway between them. The place uses the average of the two birth latitudes and the midpoint of the two longitudes, taken the shorter way around the globe. Then we cast a full chart for that moment and place with Placidus houses.",
    },
    {
      q: "What is the difference between a Davison chart and a composite chart?",
      a: "A composite chart finds the midpoint between each pair of planets, which gives halfway points with no single moment behind them. A Davison chart finds the halfway moment and place, then reads the real sky. The slow planets often match closely, while the Moon, the Sun and the Ascendant can differ by whole signs.",
    },
    {
      q: "Do I need birth times for a Davison chart?",
      a: "Birth times matter most for the Ascendant and the houses, which depend on the clock. The planets by sign hold up well without times, since an error in one birth time is cut in half in the Davison moment. The Moon is the one planet to double check, especially when it sits near the edge of a sign.",
    },
    {
      q: "Why is our Davison place in the ocean?",
      a: "The Davison place is a point found by math: the average latitude and the halfway longitude. For two birthplaces far apart, that point often lands in open sea. This is perfectly fine. The sky above the ocean at that moment is still a real sky, and the chart reads the same way as any other.",
    },
    {
      q: "Can a Davison chart show if a relationship will last?",
      a: "A Davison chart describes the style and purpose of a bond. It makes no forecast of an ending. Long, happy relationships come with every kind of Davison chart, including ones with many tense aspects. Use the chart to understand what the two of you build together and what helps the bond feel its best.",
    },
    {
      q: "Can I make a Davison chart for friends or family?",
      a: "Yes. The method works for any two people: friends, siblings, a parent and a grown child, or business partners. The readings speak about the shared space between you, so they fit many kinds of bonds. For friends, the Davison Sun and Moon often describe why the friendship feels the way it does.",
    },
    {
      q: "What does the Davison Sun mean?",
      a: "The Davison Sun shows the purpose of the relationship and what the two of you are building together. Its sign describes the style of that purpose, and its house shows the area of life where it shines. The Davison Sun may sit in a sign neither of you has, since it belongs to the bond itself.",
    },
    {
      q: "Which matters more, the Davison chart or synastry?",
      a: "They answer different questions. Synastry compares two charts and shows how each person affects the other. The Davison chart shows the relationship as a single thing with its own nature. Many people read synastry first to understand the pull between them, then the Davison chart to understand what they create together.",
    },
  ],
};
