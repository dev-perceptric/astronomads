import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "chart-ruler",
  title: "Chart Ruler Calculator: Find the Planet That Rules Your Chart",
  description: "Find your chart ruler from your rising sign, then read its sign, house, retrograde state and aspects. A free, detailed guide to the planet that steers you.",
  h1: "Your chart ruler",
  lead: "Your chart ruler is the planet that rules your rising sign, and it acts like the steering wheel of your whole birth chart. Enter your birth time to find it and read it in full.",
  sections: [
    {
      id: "what-a-chart-ruler-means",
      title: "What a chart ruler means",
      paras: [
        "Every zodiac sign has a ruling planet, the planet said to feel most at home there. Your chart ruler is the ruling planet of your rising sign. Since the rising sign marks the start of your chart and describes how you meet life, the planet that rules it becomes a guide for the whole chart. Astrologers often call it the captain of the chart or its steering wheel.",
        "Where your chart ruler sits tells a lot about the direction of your life. Its sign shows the style it works in, its house shows the area of life it pulls you toward, and its aspects show which other planets it works with or argues with. Two people with the same rising sign can lead very different lives because their chart rulers fall in different places.",
        "The chart ruler also ties your rising sign to the rest of your chart. A Leo rising always has the Sun as its chart ruler, so the Sun's sign and house become doubly important. A Virgo rising has Mercury as its chart ruler, so the mind and daily work take a central place. Finding your chart ruler is often the second step in reading a chart, right after the Big Three.",
      ],
    },
    {
      id: "how-we-calculate-your-chart-ruler",
      title: "How we calculate your chart ruler",
      paras: [
        "The Chart Ruler Calculator needs your birth date and city plus an exact birth time, since the rising sign changes about every two hours. We convert your local time to Universal Time with the city's full time zone history, then find your Ascendant degree from the moment and place of birth. The sign of that degree is your rising sign, and its ruling planet is your chart ruler.",
        "We use the traditional rulers as the main chart ruler: Mars for Aries and Scorpio, Venus for Taurus and Libra, Mercury for Gemini and Virgo, the Moon for Cancer, the Sun for Leo, Jupiter for Sagittarius and Pisces, and Saturn for Capricorn and Aquarius. For Scorpio, Aquarius and Pisces rising we also show the modern co-ruler, Pluto, Uranus or Neptune, so you can read both.",
        "Next we compute the chart ruler's true position with the astronomy-engine library. We find its sign and the house it falls in, using Placidus houses with whole sign houses near the poles. We check whether it was retrograde at your birth, and we list the main aspects it makes to other planets and points. Each of these comes with its own reading in your result.",
      ],
    },
    {
      id: "chart-ruler-by-rising-sign",
      title: "Chart ruler by rising sign",
      paras: [
        "Here is the full list of chart rulers. The traditional rulers come from a system about two thousand years old, built on the seven bodies visible to the naked eye: the Sun, the Moon and five planets. The modern co-rulers were added after Uranus, Neptune and Pluto were discovered in 1781, 1846 and 1930. Many astrologers read both rulers for the signs that have two.",
        "If your rising sign has two rulers, start with the traditional one. It tends to describe how you act day to day. The modern co-ruler often adds a deeper, slower theme that shows up over years. Since the outer planets move so slowly, its sign is shared with many people born around the same time, yet its house and aspects remain personal to you.",
      ],
      list: {
        title: "Chart ruler for each rising sign",
        items: [
          "Aries rising: Mars",
          "Taurus rising: Venus",
          "Gemini rising: Mercury",
          "Cancer rising: the Moon",
          "Leo rising: the Sun",
          "Virgo rising: Mercury",
          "Libra rising: Venus",
          "Scorpio rising: Mars, with Pluto as modern co-ruler",
          "Sagittarius rising: Jupiter",
          "Capricorn rising: Saturn",
          "Aquarius rising: Saturn, with Uranus as modern co-ruler",
          "Pisces rising: Jupiter, with Neptune as modern co-ruler",
        ],
      },
    },
    {
      id: "how-to-read-your-chart-ruler",
      title: "How to read your chart ruler result",
      paras: [
        "Your result first shows your rising sign and names its ruling planet. Then it reads that planet in four ways. Read them in order, since each builds on the last. The sign tells you how your chart ruler behaves. The house tells you where in life it spends its time. The retrograde note shows whether its energy turns inward, and the aspects show the planets it teams up with.",
        "A good way to sum it up is a single sentence that names the planet, its sign and its house. For example, Venus in Aries in the tenth house would describe a Libra rising whose charm and taste push boldly toward career and public life. Try writing your own sentence, then read the full readings to fill it in with detail.",
      ],
      list: {
        title: "Steps for reading your chart ruler",
        items: [
          "Find your rising sign and its ruling planet.",
          "Read the planet's sign for its style.",
          "Read its house for its area of life.",
          "Check whether it was retrograde at birth.",
          "Read its aspects for its allies and tensions.",
          "Write it all as one sentence.",
        ],
      },
    },
    {
      id: "chart-ruler-sign-and-house",
      title: "Your chart ruler's sign and house",
      paras: [
        "The sign your chart ruler sits in colors your whole approach to life. A Taurus rising with Venus in Gemini still has the calm Taurus manner, yet the drive underneath it is curious and hungry for variety. A Capricorn rising with Saturn in Leo may look serious at first, yet the deeper goal is to create something proud and visible. The sign of the chart ruler often explains why your rising sign behaves a little differently from the textbook.",
        "The house is just as telling. It shows the area of life your chart ruler pulls you toward, again and again. A chart ruler in the first house makes your personality strong and self-directed. In the fourth it points toward home and family. In the seventh it points toward partners, and in the tenth toward career and public life. In the twelfth it points toward rest, inner life and work behind the scenes.",
      ],
      list: {
        title: "The houses your chart ruler can sit in",
        items: [
          "1st: self and personal style",
          "2nd: money, skills and what you value",
          "3rd: learning, siblings and local life",
          "4th: home and roots",
          "5th: creativity, romance and play",
          "6th: daily work and health",
          "7th: partners and close one on one bonds",
          "8th: shared money, trust and deep change",
          "9th: travel and belief",
          "10th: career and reputation",
          "11th: friends, groups, hopes and causes",
          "12th: rest and inner life",
        ],
      },
    },
    {
      id: "retrograde-chart-ruler-and-aspects",
      title: "A retrograde chart ruler and its aspects",
      paras: [
        "Some chart rulers were retrograde at birth, which means the planet seemed to move backward through the zodiac as seen from Earth. Every planet apart from the Sun and Moon does this at times. A retrograde chart ruler suggests that its themes work inward first. People with this pattern often think things over carefully, revisit old choices and find their own way through trial and reflection.",
        "If you have Leo or Cancer rising, your chart ruler is the Sun or the Moon, which never go retrograde. For everyone else, the note in your result tells you whether your chart ruler was direct or retrograde. A retrograde Mercury as chart ruler, for example, often shows a mind that rewrites and rethinks until the idea is just right, and that thoroughness becomes a real strength.",
        "Aspects are the angles your chart ruler makes with other planets. A conjunction blends two planets closely. A trine and a sextile are easy, helpful links. A square is a push that creates growth through friction, and an opposition is a pull between two sides that asks for balance. Your result lists the main aspects your chart ruler makes, each with a reading, so you can see which planets support it and which challenge it.",
      ],
    },
    {
      id: "each-planet-as-chart-ruler",
      title: "Each planet as your chart ruler",
      paras: [
        "Each planet brings its own story when it rules your chart. The short notes below describe the basic flavor of each one as a chart ruler, and your result goes much deeper with sign, house and aspects. If your rising sign has a modern co-ruler, read that planet's note too. The Sun and Moon each rule one rising sign, while Mercury, Venus, Mars, Jupiter and Saturn each rule two.",
        "When the planet that rules your rising sign also sits in it, such as Mars in Aries for an Aries rising, the effect doubles and the rising sign's style gets very pure and strong. When the ruler sits in the sign opposite, such as Mars in Libra for an Aries rising, you may feel pulled between yourself and others, and your life often develops through partnership.",
      ],
      list: {
        title: "What each chart ruler brings",
        items: [
          "The Sun (Leo rising): a life built around self-expression and heart.",
          "The Moon (Cancer rising): a life led by feeling and belonging.",
          "Mercury (Gemini and Virgo rising): a life guided by learning and communication.",
          "Venus (Taurus and Libra rising): a life shaped by love and values.",
          "Mars (Aries and Scorpio rising): a life driven by courage and goals.",
          "Jupiter (Sagittarius and Pisces rising): a life of growth and big horizons.",
          "Saturn (Capricorn and Aquarius rising): a life built through patience and mastery.",
          "Uranus (Aquarius co-ruler): a pull toward freedom and new ideas.",
          "Neptune (Pisces co-ruler): a pull toward dreams and compassion.",
          "Pluto (Scorpio co-ruler): a pull toward depth and renewal.",
        ],
      },
    },
    {
      id: "chart-ruler-in-love-and-at-work",
      title: "Your chart ruler in love and at work",
      paras: [
        "In love, your chart ruler shows what kind of partnership fits your path. A chart ruler in the seventh house makes relationships central to your life story. A chart ruler with a strong aspect to Venus often brings warmth and charm, while one with a strong aspect to Saturn may bring caution and a slow, serious approach to commitment. Comparing your chart ruler with a partner's planets is one way to see why some bonds feel fated.",
        "At work, the house of your chart ruler often points to your natural field. A chart ruler in the tenth house pushes toward a visible career. In the sixth it favors craft and steady routines. In the ninth it favors teaching, travel or publishing, and in the eleventh it favors teams and causes. The sign then adds the style you bring to that work, from bold to careful.",
        "In daily life, you can use your chart ruler as a guide to what recharges you. Track the days when transits touch your chart ruler, using the Today page, and notice how your energy shifts. Many people find that their best seasons arrive when their chart ruler is supported, and that harder ones arrive when it is under pressure. Knowing this helps you plan rest and effort.",
      ],
    },
    {
      id: "chart-ruler-mix-ups-and-birth-time",
      title: "Chart ruler mix ups and birth time accuracy",
      paras: [
        "The most common mix up is treating the ruler of your Sun sign as your chart ruler. Your Sun sign has a ruling planet too, but the chart ruler always comes from the rising sign. A Leo Sun with Gemini rising has Mercury as its chart ruler. Another mix up is skipping the traditional ruler for Scorpio, Aquarius and Pisces. We show both so you can see each layer.",
        "Because the chart ruler depends on the rising sign, it depends on your birth time. If your Ascendant sits near the edge of a sign, a small time error can move you into the next rising sign and give you a different chart ruler entirely. The house of the chart ruler can also shift with time. Check your Ascendant degree first, and if it sits within a degree or two of a sign edge, look at both options.",
      ],
      list: {
        title: "Chart ruler checks",
        items: [
          "Your chart ruler comes from your rising sign.",
          "Your Sun sign ruler is a separate planet.",
          "A birth time is required.",
          "Scorpio, Aquarius and Pisces rising have two rulers.",
          "The Sun and Moon never turn retrograde.",
          "Ascendants near a sign edge need a careful time.",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-chart-ruler",
      title: "What to explore after your chart ruler",
      paras: [
        "Your chart ruler connects to the rest of your chart, so the free birth chart is the natural next step. Tap the planet there to open its reading and see every aspect it makes. The Rising Sign Calculator gives the full first impression and style reading for your rising sign, with a timeline of your birth day, which is useful if your time is uncertain.",
        "To follow your chart ruler over time, use the Today page, which reads current transits to your chart. The Retrograde Checker shows when your chart ruler turns retrograde in the sky and which house of your chart it passes through. The zodiac sign pages describe the sign your chart ruler sits in, which adds depth to its reading, and Compatibility shows how it meets a partner's chart.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Free birth chart",
          "Rising Sign Calculator",
          "Retrograde Checker",
          "Big Three Calculator",
          "Today, your daily horoscope",
          "Zodiac sign pages",
          "Compatibility",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a chart ruler in astrology?",
      a: "Your chart ruler is the planet that rules your rising sign. Since the rising sign starts your chart, its ruler acts as a guide for your whole life direction. Its sign shows your style, its house shows where your energy flows, and its aspects show the planets it works with or struggles against.",
    },
    {
      q: "How do I find my chart ruler?",
      a: "Find your rising sign first, which needs your birth date, exact time and city. Then match it to its ruling planet: Mars for Aries, Venus for Taurus, Mercury for Gemini, and so on. Our Chart Ruler Calculator does all of this and reads the planet's sign, house, retrograde state and aspects.",
    },
    {
      q: "Do I use the traditional or the modern ruler?",
      a: "We show the traditional ruler as your main chart ruler and add the modern co-ruler for Scorpio, Aquarius and Pisces rising. Many astrologers read both. The traditional ruler tends to show daily behavior, and the modern one adds a slower, deeper theme. Reading both gives the fullest picture of your chart.",
    },
    {
      q: "What if my chart ruler is retrograde?",
      a: "A retrograde chart ruler suggests that its themes work inward first. You may reflect a lot, revisit choices and build your own way of doing things. It is a common pattern and it carries real gifts, such as depth and independent thinking. The Sun and Moon never go retrograde, so Leo and Cancer rising always have a direct chart ruler.",
    },
    {
      q: "Is my chart ruler the same as my Sun sign ruler?",
      a: "Only when your rising sign and Sun sign share a ruler. The chart ruler comes from the rising sign. A Taurus Sun with Sagittarius rising, for example, has Jupiter as chart ruler, while Venus rules the Sun sign. Both planets matter, and the chart ruler often has the wider influence across your life.",
    },
    {
      q: "What does it mean if my chart ruler is in the first house?",
      a: "A chart ruler in the first house makes your personality strong, direct and self-led. Your rising sign and its ruler work closely together, so the style people see on the surface runs deep. You likely shape your own path, and your body and appearance can feel closely tied to your sense of self.",
    },
    {
      q: "Can I find my chart ruler with only a rough birth time?",
      a: "Your chart ruler depends on your rising sign, so it needs a birth time. With a rough time, check the Rising Sign Calculator timeline to see which rising signs are possible in your window. If the window spans Capricorn and Aquarius, both are ruled by Saturn, so your chart ruler is clear even while the rising sign is unsure.",
    },
    {
      q: "Which chart ruler is the strongest?",
      a: "No planet is the best chart ruler, and each brings its own gifts. What matters more is the condition of your chart ruler: the sign it sits in, the house it falls in and the aspects it makes. A planet in a sign it rules, or one with many easy aspects, often works smoothly. A planet with hard aspects tends to push you to grow.",
    },
    {
      q: "How do transits to my chart ruler affect me?",
      a: "When a planet in the sky crosses or aspects your chart ruler, many astrologers see it as a turning point, since the whole chart feels the change. These periods can bring new starts, a change of direction or a strong need to rest and review. The Today page lists transits to your chart, including those that touch your chart ruler.",
    },
  ],
};
