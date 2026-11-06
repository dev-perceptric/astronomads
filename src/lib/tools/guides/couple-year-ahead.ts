import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "couple-year-ahead",
  title: "Couple's Year Ahead: 12 Month Relationship Forecast for Two",
  description: "See the next 12 months for you and your partner, with dated Jupiter, Saturn, Uranus, Neptune and Pluto aspects to your composite chart and to each chart.",
  h1: "Couple's Year Ahead",
  lead: "Follow the slow planets across your relationship chart, month by month, for the next 12 months. Each dated aspect comes with a reading for the two of you.",
  sections: [
    {
      id: "what-is-the-couples-year-ahead",
      title: "What the Couple's Year Ahead is",
      paras: [
        "The Couple's Year Ahead is a calendar of the next 12 months for two people. It follows the five slow planets, Jupiter, Saturn, Uranus, Neptune and Pluto, as they move through the sky, and marks the dates when they form exact aspects to your relationship chart. It also marks the dates when Jupiter and Saturn touch each of your own charts. Every date comes with a short reading.",
        "In astrology, a transit is a planet in today's sky meeting a point in a chart. Fast planets like the Moon pass by in hours, so their effects come and go. Slow planets linger for weeks or months near the same degree, so their transits shape whole seasons. That makes them the best guide to the chapters a relationship moves through, from a growth spurt to a time of settling down.",
        "This tool is made for couples, though it works for any close pair, such as best friends or business partners. The readings speak about the bond you share and about each of you within it. The goal is to help you plan with care. A season of Saturn may be the right time to build, while a Jupiter season may be the right time to say yes to something new together.",
      ],
    },
    {
      id: "how-we-calculate-the-couples-year-ahead",
      title: "How we calculate your Couple's Year Ahead",
      paras: [
        "First we build both birth charts. We turn each local birth time into Universal Time using the city's own time zone history, then compute true planet positions with the astronomy-engine library. Next we build your composite chart, the chart of the relationship. Each composite planet sits at the midpoint of the two matching planets, measured along the shorter arc between them. The composite Ascendant comes from the midpoint of your two Midheavens at your average birth latitude.",
        "Then we follow Jupiter, Saturn, Uranus, Neptune and Pluto through the next 12 months, day by day. Whenever one of them reaches an exact aspect to the composite Sun, Moon, Venus or Ascendant, we refine the moment to the exact date. We do the same for Jupiter and Saturn against each person's own Sun, Moon and Venus. The results are sorted into months, so the year reads like a calendar.",
        "Slow planets turn retrograde for part of each year, so they can cross the same degree more than once. A single aspect may show up as one exact date, or as three dates spread over several months: forward, backward, then forward again. When you see the same aspect listed three times, read it as one long season with three peaks.",
      ],
      list: {
        title: "Steps behind your Couple's Year Ahead",
        items: [
          "Both birth charts from your dates, times and cities",
          "A composite chart made from the midpoint of each planet pair",
          "The five slow planets followed through 12 months",
          "Exact aspects to the composite Sun, Moon, Venus and Ascendant",
          "Jupiter and Saturn aspects to each person's Sun, Moon and Venus",
          "Every date sorted by month, each with a reading",
        ],
      },
    },
    {
      id: "how-to-read-your-couples-year-ahead",
      title: "How to read your Couple's Year Ahead",
      paras: [
        "Your result reads like a calendar, one month at a time. Each entry names the slow planet, the aspect, the point it touches and the exact date. A line such as Jupiter trine composite Venus tells you that a season of warmth and generosity in your love life peaks on that day. The reading below each entry explains what the transit tends to bring and how to use it well.",
        "Start by scanning the whole year. Notice the months with several entries and the months with none. Busy months tend to feel eventful, and quiet months can be a welcome rest. Slow planets move so gently that empty months are normal. Then look at which points come up most. A year full of composite Moon entries is a year about home and feelings, while a year of composite Ascendant entries is about how you show up together.",
        "Next, read the personal entries for each of you. When Saturn touches one partner's Sun, that person may feel more serious or busy, and the relationship can support them through it. When Jupiter touches one partner's Venus, that person may feel extra loving and open. Reading both lists side by side helps you understand each other's moods during the year.",
      ],
      list: {
        title: "The aspects in your calendar",
        items: [
          "Conjunction: a planet lands right on the point and starts a new chapter",
          "Sextile: an easy opening worth acting on",
          "Square: friction that asks for a change",
          "Trine: a smooth season that supports what you already have",
          "Opposition: a moment of balance between your needs and the world's",
        ],
      },
    },
    {
      id: "couples-year-ahead-slow-planets",
      title: "The slow planets in your Couple's Year Ahead",
      paras: [
        "Each slow planet has its own style and pace. Jupiter moves through about one sign a year and brings growth, luck and a wish for more. Saturn spends about two and a half years in each sign and brings structure, tests and lasting results. Their transits are the ones you will see most often, since they move fast enough to hit several points in a year.",
        "Uranus, Neptune and Pluto move much more slowly. Uranus spends about seven years in each sign and brings surprise and change. Neptune spends about fourteen years in each sign and brings dreams, softness and sometimes fog. Pluto spends anywhere from about twelve to thirty years in a sign and brings deep change at the root. When one of these three touches your composite chart, the season can last most of the year.",
      ],
      list: {
        title: "The five slow planets at a glance",
        items: [
          "Jupiter: growth and good fortune, about one sign a year",
          "Saturn: commitment and steady effort, about two and a half years per sign",
          "Uranus: change and fresh air, about seven years per sign",
          "Neptune: romance and imagination, about fourteen years per sign",
          "Pluto: deep renewal, about twelve to thirty years per sign",
        ],
      },
    },
    {
      id: "couples-year-ahead-composite-points",
      title: "The four composite points in your Couple's Year Ahead",
      paras: [
        "We track four points in your composite chart, each one a part of the relationship. The composite Sun is the purpose of the bond and what it is building. The composite Moon is the emotional climate, the comfort and closeness you share. The composite Venus is love, pleasure and affection. The composite Ascendant is the face the relationship shows the world and the way you start things as a pair.",
        "A transit to the composite Sun often marks a turning point in what the relationship is about, such as a move, a wedding or a shared project. A transit to the composite Moon often touches home, family and how you care for each other. Venus transits shape romance and money. Ascendant transits change how others see you as a couple and can bring fresh starts.",
      ],
      list: {
        title: "What each composite point covers",
        items: [
          "Composite Sun: shared purpose and direction",
          "Composite Moon: home, comfort and feelings",
          "Composite Venus: romance and shared pleasures",
          "Composite Ascendant: your image as a couple and new starts",
        ],
      },
    },
    {
      id: "couples-year-ahead-personal-transits",
      title: "Personal transits in your Couple's Year Ahead",
      paras: [
        "A relationship is two people as well as one bond. That is why the Couple's Year Ahead also lists Jupiter and Saturn aspects to each person's Sun, Moon and Venus. These personal transits describe what each of you is going through on your own. A partner with Saturn on their Sun may be working hard on a career goal, while the other partner with Jupiter on their Moon may feel happy and expansive at home.",
        "Reading these side by side builds empathy. When one of you has a heavy Saturn season, the other can offer patience and practical help. When one of you has a bright Jupiter season, the other can share in the joy and say yes to plans. The personal entries also explain why the two of you may feel out of step at times, and they show when you will both feel lifted at once.",
      ],
    },
    {
      id: "couples-year-ahead-uses",
      title: "Practical uses for your Couple's Year Ahead",
      paras: [
        "The simplest use is planning. A Jupiter trine to the composite Sun is a lovely window for a trip, a celebration or a big shared step. A Saturn conjunction to the composite Moon may be a good season to sort out your home, your budget or your routines. You can use the dates to choose when to start something, and when to give a hard talk the time it needs.",
        "The calendar is also a tool for kindness. Knowing that a tense transit is coming lets you prepare. You can plan extra rest, slow down big choices and check in with each other more often. When the date passes, you can look back and notice what the season taught you. Many couples find that naming a hard season makes it feel smaller and easier to share.",
      ],
      list: {
        title: "Ways to use your calendar",
        items: [
          "Pick dates for trips and celebrations",
          "Plan big talks for steady seasons",
          "Prepare for busy months with extra rest",
          "Support each other through personal Saturn seasons",
          "Look back each month and note what changed",
        ],
      },
    },
    {
      id: "couples-year-ahead-mix-ups",
      title: "Common Couple's Year Ahead mix ups",
      paras: [
        "The most common mix up is reading a tense transit as a warning of trouble. Squares and oppositions bring pressure, and pressure often leads to growth. Many couples make their best changes during Saturn squares. Another mix up is expecting every month to be busy. Slow planets move gently, so a month with no entries is common and simply means a calm stretch.",
        "People also mix up the composite entries with the personal ones. A transit to the composite Venus is about the shared love life. A transit to one partner's Venus is about that person's own heart, which then colors the relationship. Finally, the exact date is a peak, and the season around it can start weeks earlier and fade weeks later, especially with the outer planets.",
      ],
    },
    {
      id: "couples-year-ahead-birth-times",
      title: "Birth time accuracy in your Couple's Year Ahead",
      paras: [
        "Birth times matter most for the composite Ascendant and the composite Moon. The composite Ascendant comes from the two Midheavens, which turn through the whole zodiac each day, so it needs both birth times to be close. Without them, treat Ascendant entries as unknown. The composite Moon is the midpoint of two fast Moons, so a missing time can shift it by several degrees and move its transit dates.",
        "The composite Sun and Venus are much steadier, and so are each person's own Sun and Venus. Their transit dates stay close even without birth times. Your own Moon can move by up to about 7 degrees without a time, so personal Moon entries may come early or late. If you know the times, enter them. If you only know one, the results still give you a useful year.",
      ],
    },
    {
      id: "what-to-explore-after-your-couples-year-ahead",
      title: "What to explore after your Couple's Year Ahead",
      paras: [
        "Your Couple's Year Ahead builds on the composite chart, which you can open in full with the Composite Chart Calculator. The Davison Chart Calculator gives a second view of your relationship chart, and the Compatibility page at /compatibility compares your two charts with theme scores. For day by day planning, Best Dates Together scores the next 90 days for romance, talk and more.",
        "The sign pair pages read your two Sun signs in depth, such as Cancer and Capricorn at /compatibility/cancer-and-capricorn. The zodiac sign pages at /zodiac explain each sign in your charts. Every free calculator lives at /tools, including the Transits Calculator for your own chart and the Saturn Return Calculator for the big personal seasons that can shape a couple's life.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Composite Chart Calculator",
          "Davison Chart Calculator",
          "Best Dates Together for the next 90 days",
          "Compatibility at /compatibility",
          "Sign pair pages such as /compatibility/cancer-and-capricorn",
          "Zodiac sign pages at /zodiac",
          "Every free calculator at /tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What does the Couple's Year Ahead show?",
      a: "It shows the next 12 months for two people, month by month. You see the dates when Jupiter, Saturn, Uranus, Neptune and Pluto make exact aspects to your composite Sun, Moon, Venus and Ascendant, plus Jupiter and Saturn aspects to each person's Sun, Moon and Venus. Each entry has a reading.",
    },
    {
      q: "What is a composite chart?",
      a: "A composite chart is a single chart for a relationship. Each composite planet sits at the midpoint of the two matching planets, measured the shorter way around the zodiac. The composite Ascendant comes from the midpoint of the two Midheavens at the average birth latitude. The Couple's Year Ahead tracks transits to this chart.",
    },
    {
      q: "Why does the same aspect appear three times?",
      a: "Slow planets turn retrograde for part of each year, so they can cross the same degree moving forward, then backward, then forward again. Each crossing is an exact date. Read the three dates as one season with three peaks. The first often starts a theme, and the last often settles it.",
    },
    {
      q: "Why are some months empty?",
      a: "Slow planets move gently, so they reach exact aspects only now and then. A month with no entries is common and simply means a calm stretch for the relationship. Use those months to rest, enjoy each other and follow through on plans made during busier months.",
    },
    {
      q: "Are squares and oppositions bad for a couple?",
      a: "They bring pressure, and pressure often leads to growth. A Saturn square to the composite Sun may push you to make a clear choice together, and many couples look back on such seasons with pride. The readings give practical tips for each tense transit, so you can meet it with care.",
    },
    {
      q: "Why only Jupiter and Saturn for the personal transits?",
      a: "Jupiter and Saturn move fast enough to touch personal points several times a year, and slow enough to shape whole seasons. They describe the growth and the effort each person brings to the relationship in the months ahead. The outer planets appear in the composite part of the calendar.",
    },
    {
      q: "Do we need birth times for the Couple's Year Ahead?",
      a: "Birth times matter most for the composite Ascendant, which needs both times, and for the composite and personal Moons. The Sun and Venus entries stay accurate without times. If you know your times, enter them for the fullest calendar, and treat Ascendant entries as unknown without them.",
    },
    {
      q: "Can we use this for friends or business partners?",
      a: "Yes. The composite chart works for any pair, so the calendar suits close friends, siblings and business partners too. The readings speak about a shared bond, and the personal entries describe what each person is living through. For friendship or work themes, try the Friendship and Work Compatibility tools.",
    },
    {
      q: "How far ahead does the Couple's Year Ahead look?",
      a: "It covers the next 12 months from today. You can come back at any time to see the calendar roll forward. For closer planning, Best Dates Together scores each of the next 90 days for two people, with date ideas for the best days and a few days to go easy.",
    },
  ],
};
