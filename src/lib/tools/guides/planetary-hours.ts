import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "planetary-hours",
  title: "Planetary Hours Calculator: Today's Planetary Hours by City",
  description: "Free planetary hours calculator. See sunrise, sunset, the day ruler and all 24 planetary hours in your city's local time, with what each planet's hour suits.",
  h1: "Planetary Hours",
  lead: "Each day and each night is split into twelve planetary hours, and every hour belongs to a planet. Pick a city and a date to see today's hours and find the right one for your task.",
  sections: [
    {
      id: "what-are-planetary-hours",
      title: "What planetary hours are",
      paras: [
        "Planetary hours are an old system for timing your day. The time from sunrise to sunset is split into twelve equal parts, and the time from sunset to the next sunrise into twelve more. Each part is called a planetary hour, and each one is ruled by one of the seven classical planets: the Sun, the Moon, Mercury, Venus, Mars, Jupiter and Saturn.",
        "The idea is simple. Each planet has its own nature, so each hour carries a different flavor. A Venus hour suits love, beauty and social plans. A Mercury hour suits writing, calls and study. By matching a task to the right hour, you work with the energy of the moment instead of against it. It is a small habit that adds a sense of rhythm to an ordinary day.",
        "Planetary hours have been used for well over a thousand years, by astrologers, farmers and anyone who wanted a little help with timing. They need no birth chart at all. Everyone in the same city shares the same hours on the same day, which makes them one of the easiest astrology tools to start using right away. All you need is your city and today's date.",
      ],
    },
    {
      id: "planetary-hours-astronomy",
      title: "The astronomy behind planetary hours",
      paras: [
        "Planetary hours follow the Sun instead of the clock on the wall. Because the day is measured from sunrise to sunset, the length of a planetary hour changes with the seasons and with your latitude. In summer, when days are long, the twelve day hours stretch past 60 minutes and the twelve night hours shrink. In winter, it works the other way around.",
        "Near the equator, day and night stay close to twelve hours each all year, so planetary hours stay close to 60 minutes. The farther you go from the equator, the bigger the swing. In London in late June, each day hour lasts about 83 minutes and each night hour about 37 minutes. In late December, those numbers roughly swap, with short day hours and long night hours.",
        "Because sunrise and sunset depend on your exact place, two cities on the same date can have very different hours, even inside one time zone. That is why the calculator asks for a city. Its latitude and longitude set the sunrise and sunset, and its time zone sets the clock times you see. A city at the western edge of a time zone sees the Sun rise later on the clock than a city at the eastern edge.",
      ],
    },
    {
      id: "planetary-hours-order",
      title: "The Chaldean order and the planetary days",
      paras: [
        "The planets take turns in a fixed sequence called the Chaldean order. It lists the seven classical planets from the slowest to the fastest, as seen from Earth: Saturn, Jupiter, Mars, the Sun, Venus, Mercury and the Moon. After the Moon, the order starts again with Saturn. Hour after hour, day and night, the rulers follow this loop. Each planet hands the next hour to the planet that comes after it in the list.",
        "The first hour after sunrise belongs to the ruler of the weekday. Sunday starts with the Sun, Monday with the Moon, Tuesday with Mars, and so on through the week. Then the Chaldean order takes over. Because there are 24 hours in a full day and seven planets in the loop, the sequence lands each new sunrise on exactly the next weekday ruler. The two systems fit together perfectly.",
        "This pattern is also where many weekday names come from. Saturday, Sunday and Monday still carry the names of Saturn, the Sun and the Moon in English. In Spanish, French and Italian, the names for Tuesday to Friday come from Mars, Mercury, Jupiter and Venus. English uses old Norse and Germanic gods for those four days, matched long ago to the same planets.",
      ],
      list: {
        title: "Planetary day rulers",
        items: [
          "Sunday: the Sun",
          "Monday: the Moon",
          "Tuesday: Mars",
          "Wednesday: Mercury",
          "Thursday: Jupiter",
          "Friday: Venus",
          "Saturday: Saturn",
        ],
      },
    },
    {
      id: "how-we-calculate-planetary-hours",
      title: "How our planetary hours calculator works",
      paras: [
        "You pick a city and a date, which is today unless you choose another day. The calculator finds the exact times of sunrise and sunset for that city with the astronomy-engine library, plus the next sunrise after it. It splits the daylight into twelve equal day hours and the darkness into twelve equal night hours, then assigns each hour its ruler, starting from the weekday ruler at sunrise.",
        "Every start and end time is shown in the city's local time, with daylight saving taken into account. If you are looking at today, the current hour is highlighted so you can see at a glance which planet rules right now. Each planet's hour comes with a short note on what it suits and what to hold off on, so you can plan without looking anything up.",
        "There is one special case. Above the Arctic Circle or below the Antarctic Circle, the Sun can stay up all day in summer or stay below the horizon all day in winter. With no sunrise or no sunset, there is nothing to split into hours, so the calculator tells you that planetary hours are unavailable for that day. Pick a date closer to the equinox and the hours return.",
      ],
      list: {
        title: "What the planetary hours page shows",
        items: [
          "Sunrise and sunset for your city and date",
          "The ruler of the day",
          "All 24 planetary hours with start and end times",
          "The current hour highlighted when you view today",
          "What each planet's hour suits and what to hold off on",
        ],
      },
    },
    {
      id: "planetary-hour-guide",
      title: "Each planetary hour and what it suits",
      paras: [
        "Every planetary hour takes on the nature of its ruler. Think of the list below as a quick guide to the seven hours you will meet each day. The calculator gives a fuller note for each one, including what to save for a different hour. Over time you may add your own notes, since each person feels the hours a little differently.",
        "The hours of the day ruler tend to be the strongest of the day. On a Friday, for example, Venus rules the first hour after sunrise and returns several times through the day and night, so Friday is a natural day for Venus tasks. If you have a choice of days, pick the day that matches your task, then pick the matching hour within it.",
      ],
      list: {
        title: "The seven planetary hours",
        items: [
          "Sun hour: being seen, leading and asking someone in charge for support",
          "Moon hour: home, family, food and self care",
          "Mercury hour: writing, calls, study and short trips",
          "Venus hour: love, beauty, art and social plans",
          "Mars hour: exercise, hard tasks and bold action",
          "Jupiter hour: growth, teaching, travel plans and asking for more",
          "Saturn hour: planning, cleaning up and finishing long jobs",
        ],
      },
    },
    {
      id: "reading-planetary-hours",
      title: "How to read your planetary hours table",
      paras: [
        "The table lists all 24 hours in order, starting at sunrise. The first twelve rows are the day hours and the last twelve are the night hours. Each row shows the ruling planet, the start time and the end time. Because the length of an hour changes with the seasons, the day rows and night rows will rarely be 60 minutes long.",
        "To use the table, decide what you want to do and find the planet that matches it. Then scan the table for that planet's hours. Each planet appears three or four times in a full day, so you usually have a few choices. Pick the one that fits your schedule, and start your task inside that window. Many people care most about the start, since the beginning of a task sets its tone.",
        "If you are watching the table on the day, look for the highlighted row. It shows the hour you are in right now. Many people like to check the current hour before sending an important message or starting a meeting, just to see what kind of energy is in the air. A quick look takes only a moment and can become part of your routine.",
      ],
    },
    {
      id: "using-planetary-hours",
      title: "Practical ways to use planetary hours",
      paras: [
        "Start small. Choose one task a day and time it with a matching hour. Send a hard email in a Mercury hour, plan a date in a Venus hour, or go for a run in a Mars hour. After a few weeks, you will notice which hours feel best for you and which ones you would rather skip. Those notes become your own personal guide.",
        "Planetary hours also help you avoid friction. If you need a calm talk, a Mars hour may add heat you would rather leave out. If you want to celebrate, a Saturn hour may feel heavy. Use the hold off notes in the calculator to steer around those mismatches when your schedule allows. Often a better hour is only an hour or two away.",
        "Treat planetary hours as a light touch. Your schedule, your energy and common sense still come first. When you have some freedom in when to do something, the hours give you a simple way to choose. When you have none, do the task anyway and enjoy the rest of the day. A good plan in a plain hour still beats a rushed plan in a perfect one.",
      ],
      list: {
        title: "Easy planetary hour habits",
        items: [
          "Check the day ruler each morning",
          "Pick one task to time with a matching hour",
          "Save hard talks for calmer hours than Mars",
          "Use Saturn hours for chores and paperwork",
          "Use Venus hours for gifts, dates and art",
          "Note how each hour feels in a short journal",
        ],
      },
    },
    {
      id: "planetary-hours-seasons",
      title: "Planetary hours through the seasons and near the poles",
      paras: [
        "Planetary hours breathe with the year. Around the spring and autumn equinoxes, day and night are close to equal, so every hour is close to 60 minutes. As summer comes on, the day hours stretch and the night hours shrink. As winter arrives, the opposite happens. Checking the table across a few months is a nice way to feel the turning of the seasons.",
        "The swing grows as you move toward the poles. In cities far north or far south, a summer day hour can last close to two hours and a night hour as little as a quarter of an hour. Past the polar circles, there are days when the Sun never sets or never rises. On those days the calculator explains that planetary hours are unavailable, since there is no sunrise or sunset to measure from.",
      ],
    },
    {
      id: "planetary-hours-mix-ups",
      title: "Common planetary hours mix ups",
      paras: [
        "The most common mix up is starting the day at midnight. Planetary days begin at sunrise, so the hours before dawn on a Tuesday still belong to the night of Monday's planetary day. If you check the hours at 4 in the morning, make sure you are reading the right day in the calculator. Pick the previous date to see the night hours you are actually in.",
        "Another mix up is assuming each planetary hour lasts 60 minutes. They match clock hours only near the equinoxes or near the equator. People also confuse planetary hours with transits. Planetary hours are the same for everyone in one city, while transits are personal and depend on your birth chart. The two work well together, but they answer different questions.",
      ],
    },
    {
      id: "planetary-hours-next",
      title: "Planetary hours accuracy and what to explore next",
      paras: [
        "Planetary hours need no birth time, since they depend only on the place and the date. Accuracy comes from picking the right city. If you live in a small town, choose the nearest city in our list. A short distance makes little difference, though hundreds of miles can shift sunrise and sunset by several minutes, which shifts every hour with them.",
        "Once you have your hours, open your free birth chart to see which planets are strongest for you. Many people favor the hours of their chart ruler or the planet closest to their Ascendant. The daily horoscope adds today's personal transits, and the zodiac sign pages explain the signs each planet rules. The compatibility page shows how two charts meet, a good next step for a Venus hour.",
      ],
      list: {
        title: "Where to go after your planetary hours",
        items: [
          "Free birth chart: the planets that matter most to you",
          "Chart ruler: the planet that guides your chart",
          "Daily horoscope: today's sky for you",
          "Transits: the sky on any date",
          "Retrograde checker: which planets are moving backward now",
          "Compatibility: how two charts meet",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What are planetary hours?",
      a: "Planetary hours split the day from sunrise to sunset into twelve equal parts and the night from sunset to the next sunrise into twelve more. Each part is ruled by one of the seven classical planets, in a fixed order. People use them to time tasks to the planet that suits them best.",
    },
    {
      q: "How are planetary hours calculated?",
      a: "The calculator finds sunrise and sunset for your city and date, then divides the daylight into twelve equal day hours and the darkness into twelve equal night hours. The first hour after sunrise goes to the ruler of the weekday. The rest follow the Chaldean order: Saturn, Jupiter, Mars, Sun, Venus, Mercury and Moon.",
    },
    {
      q: "Why are planetary hours longer or shorter than 60 minutes?",
      a: "They follow the Sun instead of the clock. In summer, daylight is long, so each day hour stretches and each night hour shrinks. In winter it works the other way. Near the equinoxes and near the equator, the hours come close to 60 minutes each.",
    },
    {
      q: "What planetary hour is it right now?",
      a: "Pick your city in the calculator above, leave the date on today, and the current hour is highlighted in the table. The row shows the ruling planet with its start and end time in your local time, along with what that hour suits and what to save for later.",
    },
    {
      q: "When does a planetary day start?",
      a: "At sunrise. The first hour after sunrise belongs to the weekday ruler, and the planetary day runs until the next sunrise. That means the hours between midnight and dawn still belong to the previous planetary day. On a Tuesday at 5 in the morning, before sunrise, you are still in Monday's night hours.",
    },
    {
      q: "Which planetary hour is best for love?",
      a: "Venus hours suit love, dates, gifts and anything to do with beauty or art. Friday, ruled by Venus, is the natural day for it. The Moon hour also works well for close, caring time at home. For a first move or a bold message, some people prefer a Mars hour.",
    },
    {
      q: "Do I need my birth chart for planetary hours?",
      a: "No birth data is needed. Planetary hours depend only on the city and the date, so everyone in the same place shares them. If you want to go further, look at your birth chart and favor the hours of your chart ruler or of planets that are strong in your chart.",
    },
    {
      q: "Why does the calculator say hours are unavailable?",
      a: "Above the Arctic Circle or below the Antarctic Circle, the Sun can stay up all day in summer or stay down all day in winter. Without a sunrise or a sunset, there is no day or night to divide into twelve parts, so the calculator marks those days as unavailable.",
    },
    {
      q: "Where do the weekday names come from?",
      a: "Many come from the planetary day rulers. In English, Saturday, Sunday and Monday carry the names of Saturn, the Sun and the Moon. In Spanish, French and Italian, Tuesday to Friday are named for Mars, Mercury, Jupiter and Venus. English uses Norse and Germanic gods for those four days, matched to the same planets.",
    },
  ],
};
