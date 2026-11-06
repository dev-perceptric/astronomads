import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "best-dates",
  title: "Best Dates Together: Your Best Days as a Couple in 90 Days",
  description: "Score the next 90 days for you and your partner. Find your best dates for romance, talk, adventure, home, plans and care, with ideas and days to go easy.",
  h1: "Best Dates Together",
  lead: "We score each of the next 90 days against both of your charts and label the best ones with a kind and a date idea. Plan your next evening out with the sky on your side.",
  sections: [
    {
      id: "what-is-best-dates-together",
      title: "What Best Dates Together does",
      paras: [
        "Best Dates Together looks at the next 90 days and finds the ones that suit the two of you best. For each day, it checks where the Moon, Mercury, Venus, Mars and Jupiter will be, and how they meet the Sun, Moon, Venus and Mars in both of your charts. Days when the sky touches both charts warmly score highest. The best dates come with a label and an idea for how to spend them.",
        "Each of the best days gets one of six kinds: romance, talk, adventure, home, plans or care. The kind tells you what the day favors, so you can match your plans to the mood of the sky. A romance day is lovely for a dinner out, while a home day may be better for cooking together and an early night. The tool also lists a few days to go easy.",
        "The tool is made for couples, though it works for any two people who spend time together, such as best friends, a parent and a grown child, or two roommates. The point is simple. Some days are easier to share than others, and a little planning can turn an ordinary evening into one you both remember for a long time.",
      ],
    },
    {
      id: "how-we-score-your-best-dates",
      title: "How we score your best dates",
      paras: [
        "First we build both birth charts. We turn each local birth time into Universal Time using the city's own time zone history, then compute true planet positions with the astronomy-engine library, the same engine behind our free birth chart. From each chart we take four personal points: the Sun, Moon, Venus and Mars. These are the parts of a chart most tied to mood, affection and energy.",
        "Then we step through each of the next 90 days. For every day we place the Moon, Mercury, Venus, Mars and Jupiter in the sky and check the aspects they make to all eight personal points across your two charts. Easy aspects like trines and sextiles lift the score. Tense aspects like squares and oppositions lower it. A day that lifts both of you at once rises to the top.",
        "Finally we sort the days. The highest scoring ones become your best dates, each labeled with the kind of day it is and paired with a date idea. The kind comes from the contacts doing the most work that day. The lowest scoring days become your days to go easy, a short list of dates when it may help to keep plans simple and relaxed.",
      ],
      list: {
        title: "What goes into each day's score",
        items: [
          "The Moon, Mercury, Venus, Mars and Jupiter of the day",
          "Your Sun, Moon, Venus and Mars",
          "Your partner's Sun, Moon, Venus and Mars",
          "Every aspect between the day's planets and those eight points",
          "Extra weight when a day touches both charts",
        ],
      },
    },
    {
      id: "how-to-read-your-best-dates",
      title: "How to read your best dates",
      paras: [
        "Your result lists your best dates in order, each with its date, its kind and a date idea. Read the kind first. It tells you the mood the day supports. Then read the idea and adjust it to your own life. A suggestion to try a new restaurant might become a picnic in your favorite park, as long as it keeps the same spirit of trying something together.",
        "Below the best dates you will find a few days to go easy. These are the days when the sky leans tense against your charts. They make no claim that anything will go wrong. They simply suggest a softer plan, like a quiet night at home or extra patience in conversation. Many couples like to save big talks and big plans for a better day.",
        "Look at the spread of kinds across the 90 days. If you see many talk days in a row, that stretch may be good for planning a trip or working through a question together. If romance days cluster near a birthday or anniversary, you have a ready made window to celebrate. The calendar works best as a gentle guide for choices you were already making.",
      ],
      list: {
        title: "What your best dates result shows",
        items: [
          "Your best days over the next 90 days",
          "The kind of each best day",
          "A date idea for each best day",
          "A few days to go easy",
        ],
      },
    },
    {
      id: "best-dates-by-kind",
      title: "Best dates by kind of day",
      paras: [
        "Each kind of day has its own flavor. In broad terms, Venus contacts lean toward romance and pleasure, Mercury contacts lean toward talk and plans, and Mars and Jupiter contacts lean toward energy and adventure. The Moon, which moves fastest, colors most days, and its contacts often point to home and care. The label on each day comes from whichever contacts are strongest.",
        "Use the list below for ideas, then make them your own. A great date depends most on the attention you give each other. The right day for a long walk and a deep talk might be worth more than a fancy dinner on a day when one of you feels tired. Match the plan to the kind and you give the day its best chance.",
      ],
      list: {
        title: "The six kinds of best dates",
        items: [
          "Romance: dinner out, dancing, a love letter or a sunset walk",
          "Talk: a long coffee, a museum visit or a game of questions",
          "Adventure: a day trip, a hike, a new class or a concert",
          "Home: cook a meal together, build a blanket fort, watch a favorite film",
          "Plans: map out a trip, set shared goals or sort the calendar",
          "Care: a slow morning, a massage, a bath or a gentle check in",
        ],
      },
    },
    {
      id: "best-dates-sky-planets",
      title: "The planets behind your best dates",
      paras: [
        "The five planets we use move at very different speeds. The Moon moves about 13 degrees a day and changes sign every two or three days, so it shapes the mood of most dates. Mercury and Venus each move about one degree a day on average, sometimes faster and sometimes slower. Their contacts last a few days, which gives you a small window to plan around.",
        "Mars moves about half a degree a day, so its contacts last longer and add a steady push of energy. Jupiter is the slowest of the five. It moves only a small fraction of a degree each day, so a Jupiter contact can color several weeks at once. When a Jupiter trine overlaps with a warm Moon and Venus day, you get some of the brightest best dates of the season.",
      ],
      list: {
        title: "The day's planets at a glance",
        items: [
          "Moon: mood and comfort, about 13 degrees a day",
          "Mercury: talk and plans, about one degree a day on average",
          "Venus: love and pleasure, about one degree a day",
          "Mars: energy and drive, about half a degree a day",
          "Jupiter: luck and generosity, a small fraction of a degree a day",
        ],
      },
    },
    {
      id: "best-dates-go-easy-days",
      title: "Days to go easy on your best dates calendar",
      paras: [
        "Every 90 days include a few tense ones. On a go easy day, the planets of the day form squares or oppositions to the Sun, Moon, Venus or Mars in both of your charts. That can bring a short temper, crossed wires or low energy. The tool lists these days so you can plan around them, and so a small spat on one of them feels less personal.",
        "Go easy days are perfect for simple plans. Order in, watch a comfort film or take separate time to rest and catch up later. If a hard talk is coming, try to hold it for a better day. If it has to happen on a go easy day, slow down, listen more and take a break if voices rise. These small steps help the day pass gently.",
        "A go easy day for the two of you can still be a fine day for one of you alone. If most of the tense contacts fall on one chart, that person may want some extra space while the other feels well. Use the day to support each other in small ways. A warm meal, a kind message in the afternoon or an early night can make a tense sky feel much lighter.",
      ],
    },
    {
      id: "best-dates-uses",
      title: "Practical uses for your best dates",
      paras: [
        "The most common use is choosing when to go out. Pick a romance or adventure day for a special evening, and keep go easy days for staying in. Many people use the list for bigger moments too: a proposal, a first trip together, meeting the family or moving in. A warm day gives those moments a little extra help from the sky.",
        "The list also helps with everyday life. Plan days can be good for budgets, chores and shared calendars. Care days can be good for checking in after a busy week. Friends can use the list to plan a reunion, and a parent and a grown child can pick a day for a long lunch. Come back now and then, since the 90 day window rolls forward each day.",
      ],
      list: {
        title: "Ways to use your best dates",
        items: [
          "Plan a special evening on a romance day",
          "Book a trip for an adventure day",
          "Save big talks for talk or plans days",
          "Check in with each other on care days",
          "Keep go easy days simple and restful",
        ],
      },
    },
    {
      id: "best-dates-mix-ups",
      title: "Common best dates mix ups",
      paras: [
        "The most common mix up is treating a best date as a guarantee. The score shows how the sky meets your charts, and your own choices still matter most. A thoughtful plan on an average day can be wonderful, and a rushed plan on a top day can fall flat. Another mix up is reading a go easy day as a bad day. It is simply a day to keep things gentle.",
        "People also forget that the score covers the whole day. The Moon moves about half a degree every hour, so a day can feel a little different in the morning and the evening. The label describes the day as a whole. Finally, remember that the score looks at both of you. A day that lifts only one of you ranks lower than a day that lifts you both.",
      ],
    },
    {
      id: "best-dates-birth-times",
      title: "Birth time accuracy for your best dates",
      paras: [
        "Birth times matter most for each person's Moon. The Moon moves about 13 degrees a day, so a missing birth time can move a natal Moon by up to about 7 degrees either way. That can shift which days the sky touches your Moon, and Moon contacts play a big part in the score. With both birth times, your best dates are as sharp as they can be.",
        "The Sun, Venus and Mars in your charts move slowly, so they stay close even without birth times. If you know only your birth dates, the list still gives you a useful picture, and the days driven by Venus, Mars and Jupiter stay reliable. Treat home and care days with a little more flexibility, since those often lean on the Moon. A birth certificate is the best place to find a time.",
      ],
    },
    {
      id: "what-to-explore-after-your-best-dates",
      title: "What to explore after your best dates",
      paras: [
        "Best Dates Together looks at the next 90 days. For the bigger picture, the Couple's Year Ahead follows the slow planets across your relationship chart for the next 12 months. The Compatibility page at /compatibility compares your two charts with five theme scores and every contact explained. The Synastry Chart draws both charts as a double wheel, so you can see the links behind your best dates.",
        "The sign pair pages read your two Sun signs in depth, such as Gemini and Libra at /compatibility/gemini-and-libra. The zodiac sign pages at /zodiac explain the signs of your Moon, Venus and Mars, which shape so many of your best dates. Every free calculator lives at /tools, including the Composite Chart Calculator and the Davison Chart Calculator for the chart of your relationship.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Couple's Year Ahead for the next 12 months",
          "Compatibility at /compatibility",
          "Synastry Chart with house overlays",
          "Sign pair pages such as /compatibility/gemini-and-libra",
          "Zodiac sign pages at /zodiac",
          "Every free calculator at /tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "How does Best Dates Together pick our best dates?",
      a: "For each of the next 90 days, we check how the Moon, Mercury, Venus, Mars and Jupiter of that day meet the Sun, Moon, Venus and Mars in both of your charts. Easy aspects lift the score and tense ones lower it. The highest scoring days become your best dates, each with a kind and a date idea.",
    },
    {
      q: "What are the six kinds of days?",
      a: "The kinds are romance, talk, adventure, home, plans and care. Each one describes what the day favors, based on the contacts doing the most work. Romance days suit dinners and dancing, talk days suit long chats, and adventure days suit trips. Home, plans and care days suit time in, shared goals and gentle check ins.",
    },
    {
      q: "What is a day to go easy?",
      a: "It is a day when the planets of the day lean tense against both of your charts. It makes no claim that anything will go wrong. It simply suggests simple plans, extra patience and saving big talks for a better day. A short list of these days appears below your best dates.",
    },
    {
      q: "Why does the Moon matter so much?",
      a: "The Moon moves about 13 degrees a day, faster than any other planet, so it meets new points in your charts almost every day. It also rules mood and comfort, which shape how a date feels. Mercury, Venus, Mars and Jupiter move more slowly and add longer themes behind the Moon's daily changes.",
    },
    {
      q: "Do we need birth times for best dates?",
      a: "Birth times sharpen the results, mostly through each person's Moon. Without a time, a natal Moon can be off by up to about 7 degrees, which can shift Moon contacts by a day or so. The Sun, Venus and Mars stay close without times, so days driven by those contacts remain reliable.",
    },
    {
      q: "Can friends use Best Dates Together?",
      a: "Yes. The scoring works for any two people. Friends can pick a talk or adventure day for a catch up or a trip, and a parent and a grown child can choose a care or home day for a long visit. The date ideas work well for many kinds of bonds, with a little adjusting.",
    },
    {
      q: "How far ahead can I see?",
      a: "The tool covers the next 90 days from today. The window rolls forward each day, so you can come back any time for fresh dates. For the bigger picture, the Couple's Year Ahead shows the slow planet seasons across your relationship chart for the next 12 months.",
    },
    {
      q: "Is a best date a guarantee of a great time?",
      a: "A best date is a day when the sky meets your charts warmly, and it gives a good plan a little extra help. Your choices still matter most. Attention, kindness and a plan that suits you both will make any day better. Use the list as a friendly guide for choices you were already making.",
    },
  ],
};
