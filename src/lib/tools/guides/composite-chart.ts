import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "composite-chart",
  title: "Composite Chart Calculator: Your Relationship as One Chart",
  description: "Free composite chart calculator. Blend two birth charts by midpoints into one relationship chart, with the wheel, planets by sign and house, and aspects.",
  h1: "Composite chart calculator",
  lead: "A composite chart turns two birth charts into one chart for the relationship itself. See the wheel, the planets by sign and house, and the aspects that shape your bond.",
  sections: [
    {
      id: "what-is-a-composite-chart",
      title: "What a composite chart is",
      paras: [
        "A composite chart is a single chart made from two birth charts. Most compatibility methods compare one person with another, planet by planet. The composite chart takes a different view. It blends the two charts into a third one that describes the relationship as if it were a person of its own, with its own Sun, Moon, rising sign and houses.",
        "Astrologers often say that every relationship has a life of its own. Two people bring their own natures, and together they create something neither would create alone. A couple may be calm on their own and lively together, or two busy friends may become steady and focused as a pair. The composite chart describes that shared third presence: its purpose, its moods, its style and the areas of life where it does its best work.",
        "Composite charts are most often used for couples, yet they work for any two people. Business partners, close friends, siblings and bandmates all form a relationship with its own character. Reading the composite chart alongside your synastry gives a fuller picture. Synastry shows how each of you affects the other, and the composite shows what you build when you join forces.",
      ],
    },
    {
      id: "how-we-calculate-the-composite-chart",
      title: "How we calculate the composite chart",
      paras: [
        "You enter a birth date, a time and a city for each person. We turn each local time into Universal Time with the city's time zone history, then find the true positions of the Sun, the Moon and the eight planets from Mercury to Pluto with the astronomy-engine library. That gives two accurate birth charts, built the same way as our full birth chart.",
        "Next, we find the midpoint of each pair of planets. Your Sun and the other person's Sun give the composite Sun, your two Moons give the composite Moon, and so on through Pluto. Each midpoint is taken along the shorter arc between the two planets. If one Sun sits at 10 degrees of Aries and the other at 10 degrees of Gemini, the composite Sun lands at 10 degrees of Taurus, halfway between them.",
        "The angles and houses need extra care. The composite Midheaven is the midpoint of the two Midheavens. If that point lands on the wrong side of the midpoint of the two Ascendants, we turn it to the opposite point so it stays above the horizon. From that Midheaven, at the average of the two birth latitudes, we work out the composite Ascendant and the Placidus houses. Near the poles, where Placidus breaks down, whole sign houses take over.",
      ],
      list: {
        title: "What your composite chart result shows",
        items: [
          "A composite chart wheel for the relationship",
          "The composite Sun, Moon, Mercury, Venus and Mars by sign",
          "The composite Ascendant by sign",
          "The composite Sun, Moon, Venus and Mars by house",
          "The aspects inside the composite chart",
          "A reading for each placement",
        ],
      },
    },
    {
      id: "how-to-read-a-composite-chart",
      title: "How to read your composite chart",
      paras: [
        "Read the composite chart as you would a birth chart, with one shift in mind. Every placement describes the relationship, and neither of you alone. The composite Sun is the purpose of the bond. The composite Moon is its emotional life. The composite Ascendant is how the pair comes across to others, and the houses show where in life the relationship puts its energy.",
        "Start with the Sun and Moon by sign, since they set the core tone. Then read Venus and Mars, which shape affection and action, and Mercury, which shapes how you two talk. After that, look at the houses for the Sun, Moon, Venus and Mars. Last, read the aspects inside the chart. These show how the parts of the relationship work together, such as a composite Moon in a trine with a composite Venus.",
        "Aspects in a composite chart use the same five main angles as a birth chart. Easy aspects describe parts of the bond that cooperate. Tense aspects describe parts that pull in different directions and need attention, which often makes them the most active and creative areas of the relationship. A few aspects to the Sun or Moon usually say the most.",
      ],
      list: {
        title: "Aspects inside the composite chart",
        items: [
          "Conjunction: two parts of the bond fused into one strong theme",
          "Sextile: a friendly link that grows with effort",
          "Trine: natural flow and ease between two parts",
          "Square: friction that pushes the relationship to act",
          "Opposition: two sides that seek balance",
          "Sun and Moon aspects: how purpose and feeling get along",
          "Venus and Mars aspects: how affection and action meet",
        ],
      },
    },
    {
      id: "composite-sun-and-moon",
      title: "The composite chart Sun and Moon",
      paras: [
        "The composite Sun is the heart of the composite chart. Its sign describes what the relationship is for and what it wants to become. A composite Sun in Capricorn often belongs to a bond built around shared goals and long plans. A composite Sun in Sagittarius suggests a bond that grows through travel, learning and big ideas. A composite Sun in Cancer often points to a relationship centered on home and family.",
        "The composite Moon shows the emotional climate of the relationship. It describes what makes the two of you feel safe as a pair, how you handle moods together and what kind of home life you create. A composite Moon in Taurus tends to want comfort and routine. A composite Moon in Aquarius tends to want space, friends and a little room to be unusual.",
        "Read the Sun and Moon together. When they sit in friendly signs or form an easy aspect, the purpose and feelings of the relationship pull the same way. When they form a square or opposition, the bond may want two things at once, such as adventure and security. Couples with this pattern often do well when they make room for both, one season at a time.",
      ],
    },
    {
      id: "composite-mercury-venus-mars",
      title: "Composite chart Mercury, Venus and Mars",
      paras: [
        "Composite Mercury describes how the relationship thinks and talks. In an air sign, the pair may love long conversations and shared ideas. In an earth sign, talk tends to be practical and focused on plans. In a fire sign, it is lively and quick, and in a water sign it is warm and intuitive. This placement helps you choose the kind of talk that keeps you close.",
        "Composite Venus describes how the relationship shows love, enjoys beauty and handles shared values. Venus in Leo may want romance and celebration, while Venus in Virgo shows love through care and helpful acts. Composite Mars describes how the pair takes action, chases goals and handles conflict. Mars in Aries tends to act fast and argue openly, while Mars in Libra prefers to talk a problem through until it feels fair.",
        "Look at how Venus and Mars relate inside the composite chart. When they form an easy aspect, affection and drive tend to support each other, so romance and teamwork both feel natural. A tense aspect between them adds spark and some friction. Many lively, lasting couples have this pattern, and it works best when both partners name what they want clearly.",
      ],
      list: {
        title: "Composite Venus by element",
        items: [
          "Fire Venus: love shown through fun, praise and grand gestures",
          "Earth Venus: love shown through loyalty, touch and practical care",
          "Air Venus: love shown through talk, shared ideas and friendship",
          "Water Venus: love shown through closeness, comfort and emotional depth",
        ],
      },
    },
    {
      id: "composite-chart-ascendant-and-houses",
      title: "The composite chart Ascendant and houses",
      paras: [
        "The composite Ascendant describes how the relationship meets the world. Friends and family often notice this sign first when they see you together. A composite Ascendant in Gemini may make you look like a chatty, busy pair. In Scorpio, you may seem private and intense, and in Leo, warm and full of fun. It also hints at how the relationship starts new things.",
        "The houses show where the relationship puts its energy. The composite Sun's house describes the main stage of the bond, and the composite Moon's house shows where it finds comfort. Venus by house shows where you two find the most joy, and Mars by house shows where you push hardest together. A composite Sun in the 10th house, for example, often belongs to a couple known for shared work or public roles.",
      ],
      list: {
        title: "The composite houses in brief",
        items: [
          "1st house: the identity of the pair and how you show up together",
          "2nd house: shared money, values and comforts",
          "3rd house: talk, local life, siblings and short trips",
          "4th house: home, family and roots",
          "5th house: play, romance, creativity and children",
          "6th house: daily routines, work habits and health",
          "7th house: partnership itself and how you treat each other",
          "8th house: trust, shared resources and deep change",
          "9th house: travel, study and shared beliefs",
          "10th house: public life, careers and shared goals",
          "11th house: friends, groups and hopes for the future",
          "12th house: private life, rest and inner bonds",
        ],
      },
    },
    {
      id: "using-a-composite-chart",
      title: "Using a composite chart in your relationship",
      paras: [
        "The composite chart is a practical guide to what your relationship needs to thrive. If the composite Moon sits in the 4th house, time at home may be the heart of your bond, so guard it. If the composite Sun sits in the 9th house, plan trips or classes together. If composite Mars is in the 6th house, you may do your best teamwork on daily tasks and shared projects.",
        "You can also use the composite to understand rough patches. Tense aspects inside the chart describe built in friction. A composite Saturn square the composite Moon, for example, may show a bond where duty sometimes crowds out feelings. Knowing that helps you plan for it, such as setting aside time each week that has nothing to do with chores or bills.",
        "The composite chart also connects to timing. When slow planets in the sky meet the composite Sun, Moon, Venus or Ascendant, the relationship often goes through a new chapter. Our Couple's Year Ahead tool lists those dates for the next 12 months, with a reading for each, built from this same composite chart. Reading those dates next to your composite houses shows which part of shared life each chapter touches.",
      ],
      list: {
        title: "Ways to use your composite chart",
        items: [
          "Plan time together in the house of your composite Sun",
          "Protect the comforts your composite Moon needs",
          "Use composite Mercury to choose how you talk things through",
          "Celebrate in the style of your composite Venus",
          "Point composite Mars at a shared goal",
          "Track big dates with Couple's Year Ahead",
        ],
      },
    },
    {
      id: "composite-chart-mix-ups",
      title: "Composite chart mix ups",
      paras: [
        "The most common mix up is confusing the composite chart with synastry. Synastry compares the two birth charts directly and shows how each person affects the other. The composite chart blends the two into a third chart that describes the bond itself. Both are useful, and they answer different questions. Our Synastry Chart and Compatibility pages cover the first, and this page covers the second.",
        "People also confuse the composite with the Davison chart. A composite is built from midpoints of positions, so it describes no real moment in time. A Davison chart is a real chart cast for the moment halfway between the two births, at a place halfway between the birthplaces. The two often look alike, with some differences. Our Davison Chart Calculator lets you compare them.",
        "One more quirk is worth knowing. In a birth chart, Mercury and Venus always stay close to the Sun. In a composite chart, each midpoint is taken on its own, so now and then Mercury or Venus lands far from the composite Sun, sometimes even opposite it. This is a known effect of the midpoint method and reads like any other placement.",
      ],
    },
    {
      id: "composite-chart-birth-times",
      title: "Birth time accuracy in the composite chart",
      paras: [
        "Birth times matter more for a composite chart than for most compatibility tools. The composite Ascendant, Midheaven and houses all come from the two birth Midheavens, which change quickly through the day. When either birth time is missing, the tool leaves out the angles and houses and shows the composite planets by sign, along with the aspects between them. Those readings still give a clear picture of the bond.",
        "The composite Moon also depends on time. The Moon moves about 13 degrees a day, so a missing time can move each person's Moon by several degrees and the composite Moon along with it. Without a time, the chart is set for noon. Near the edge of a sign, that may change the composite Moon's sign, so treat the Moon reading with some care until you have real times.",
      ],
      list: {
        title: "What changes without a birth time",
        items: [
          "The composite Ascendant and Midheaven are left out",
          "The composite houses are left out",
          "The composite Moon may shift by a few degrees",
          "The Sun, Mercury, Venus and Mars signs usually stay the same",
        ],
      },
    },
    {
      id: "what-to-explore-after-a-composite-chart",
      title: "What to explore after your composite chart",
      paras: [
        "The composite chart describes the relationship as a whole, and the other compatibility tools fill in the rest. The Compatibility page compares the two birth charts directly, with scores for attraction, emotional bond, communication, commitment and growth. The Synastry Chart draws both charts on a double wheel and shows where each person's planets fall in the other's houses, which adds a personal layer to every composite placement.",
        "For timing, Couple's Year Ahead follows the slow planets as they meet your composite chart over the next 12 months, and Best Dates Together picks the best days for the two of you in the next 90 days. The Davison Chart Calculator offers a second view of the relationship as one chart. The sign pair pages, such as Libra and Aries compatibility or Scorpio and Pisces compatibility, read two Sun signs together in depth.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Full compatibility for two charts",
          "Synastry Chart with house overlays",
          "Davison Chart Calculator",
          "Couple's Year Ahead",
          "Best Dates Together",
          "Sign pair compatibility pages",
          "Zodiac sign pages",
          "All free tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a composite chart?",
      a: "A composite chart is one chart made from two birth charts. Each planet sits at the midpoint between the two people's positions for that planet, taken along the shorter arc. The result describes the relationship itself, with its own Sun, Moon, rising sign and houses, as if the bond were a person of its own.",
    },
    {
      q: "How is a composite chart calculated?",
      a: "We find the midpoint of each pair of planets along the shorter arc between them. The composite Midheaven is the midpoint of the two Midheavens, kept above the horizon. The Ascendant and Placidus houses come from that Midheaven at the average of the two birth latitudes, with whole sign houses near the poles.",
    },
    {
      q: "What is the difference between a composite chart and synastry?",
      a: "Synastry compares two birth charts directly and shows how each person affects the other, contact by contact. A composite chart blends the two charts into one and describes the relationship as a whole. Many astrologers read both, since synastry shows the two people and the composite shows what they create together.",
    },
    {
      q: "What is the difference between a composite chart and a Davison chart?",
      a: "A composite chart uses midpoints of planet positions, so it matches no real moment. A Davison chart is cast for the real moment halfway between the two births, at the place halfway between the birthplaces. The two often look similar, and many people like to compare both views of the same relationship.",
    },
    {
      q: "Do I need birth times for a composite chart?",
      a: "Birth times are needed for the composite Ascendant, Midheaven and houses. Without both times, the tool still shows the composite planets by sign and the aspects between them. The composite Moon may shift a few degrees without times, since the Moon moves quickly through each day.",
    },
    {
      q: "What does the composite Sun mean?",
      a: "The composite Sun describes the purpose of the relationship and what it wants to become. Its sign shows the style of that purpose, and its house shows where in life the bond shines brightest. Many couples recognize their composite Sun right away, since it often matches what they spend most of their shared time on.",
    },
    {
      q: "Why is my composite Venus far from my composite Sun?",
      a: "Each composite planet is a separate midpoint, so the usual closeness of Venus and Mercury to the Sun can break down. Now and then the shorter arc rule places composite Venus or Mercury far from the composite Sun, even opposite it. It is a normal quirk of the method, and the placement reads like any other.",
    },
    {
      q: "Can I make a composite chart for friends or coworkers?",
      a: "Yes. Any two people form a relationship with its own character, so the composite chart works for friends, business partners, siblings and creative teams. The houses are especially helpful there, since they show where the relationship does its best work, such as shared projects, travel or community life.",
    },
    {
      q: "What do tense aspects in a composite chart mean?",
      a: "Tense aspects describe parts of the relationship that pull in different directions. They often mark the most active and creative areas of a bond, where you two grow the most. With awareness and some planning, a square or opposition in a composite chart can become a real source of strength and shared purpose.",
    },
  ],
};
