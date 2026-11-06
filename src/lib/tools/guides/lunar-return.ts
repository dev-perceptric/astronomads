import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "lunar-return",
  title: "Lunar Return Calculator: Your Next 13 Monthly Moon Charts",
  description: "Free lunar return calculator. See your next 13 lunar returns with exact times, the Ascendant and the Moon's house, plus a chart and a reading for each month.",
  h1: "Lunar Return Calculator",
  lead: "About every 27 days the Moon comes back to the exact place it held when you were born. Each return starts a new emotional month, and its chart shows where your feelings will lead.",
  sections: [
    {
      id: "what-is-a-lunar-return",
      title: "What a lunar return is",
      paras: [
        "A lunar return is the moment the Moon gets back to the exact degree and minute it held at your birth. The Moon circles the zodiac in about 27.3 days, so this happens about 13 times a year. Astrologers cast a chart for each of those moments, and the result is called a lunar return chart. It describes the emotional tone of the month that follows, up to the next return.",
        "In your birth chart, the Moon stands for your feelings, your habits and what helps you feel safe. A lunar return chart takes that same Moon and asks where it will find its home this month. Some months it lands in the house of work, so your mood rises and falls with your job. Other months it lands in the house of friends, and your social life sets the tone.",
        "Think of the solar return as the yearly forecast and the lunar return as the monthly one. The solar return sets the big theme of your year. Each lunar return shows how that theme plays out in your daily feelings, one month at a time. Read together, they make a simple and personal calendar that you can check at a glance whenever a new month begins.",
      ],
    },
    {
      id: "lunar-return-astronomy",
      title: "The astronomy behind the lunar return",
      paras: [
        "The Moon is the fastest body in the sky, moving about 12 to 15 degrees a day against the stars and the zodiac. Its speed changes because its orbit is an ellipse, and the Sun's pull keeps reshaping that orbit. Near its closest point to Earth it moves faster, and near its farthest point it moves slower. That is why the gap between your lunar returns varies by a few hours from one month to the next.",
        "It helps to know that the lunar return month and the familiar lunar phase month are two different cycles. The Moon gets back to the same zodiac degree in about 27.3 days. It takes about 29.5 days to go from one New Moon to the next, because the Sun has moved ahead in the meantime and the Moon needs two more days to catch up. Your lunar return arrives about two days earlier than a full phase cycle.",
        "Because the return comes back after about 27.3 days, the Earth has turned a slightly different amount each time. The angles of the chart land in a new place at every return, so the Ascendant can jump several signs from one month to the next. The Moon's sign and degree stay the same in every return chart, since that is what defines the return.",
      ],
    },
    {
      id: "how-we-calculate-lunar-return",
      title: "How we calculate your lunar returns",
      paras: [
        "You enter your birth details and pick the city where you are living or staying. The calculator first finds the exact degree of your natal Moon, using true positions of date from the astronomy-engine library. Then it steps forward from today and finds each moment the Moon gets back to that degree, refining every match down to the minute. It lists your next 13 returns, which covers about a year.",
        "Each return is shown in the local time of your chosen city, with daylight saving handled for you. For every return the calculator casts a full chart at that place: the planets in their signs, the Ascendant and Midheaven, and Placidus houses, with whole sign houses near the poles. You see the Ascendant sign and the house of the Moon, each with a reading for the month ahead, and a chart wheel to explore.",
      ],
      list: {
        title: "What each lunar return shows",
        items: [
          "The exact date and time of the return in your city",
          "The Ascendant sign of the lunar return chart",
          "The house the Moon falls in that month",
          "A reading for the month ahead",
          "A full chart wheel for that moment",
        ],
      },
    },
    {
      id: "reading-a-lunar-return",
      title: "How to read a lunar return chart",
      paras: [
        "Start with the house the Moon sits in. That house shows where your emotional energy goes this month and where you will look for comfort. A Moon in the tenth house puts feelings into career and public life. A Moon in the fourth turns you toward home. This one placement often describes the month better than anything else in the chart.",
        "Next, read the Ascendant. In a lunar return it sets the mood of the month and the way you react to what comes up. A fire sign rising makes the month feel quick and active. An earth sign rising slows it down and asks for practical steps. Air signs bring talk and ideas, and water signs bring deeper feelings and stronger instincts.",
        "Then glance at the rest of the chart. Planets close to the Ascendant or Midheaven tend to stand out in the month. A planet touching the return Moon colors your mood directly, so Venus there may soften the month while Saturn may make it more serious. Keep the reading light. A lunar return covers only four weeks, and its themes pass quickly.",
      ],
    },
    {
      id: "lunar-return-moon-house",
      title: "Lunar return Moon by house",
      paras: [
        "The Moon's sign never changes in your lunar returns, so its house carries the news. Over a year the Moon tends to move through several houses, and some months land it in the same house again. Watching that pattern teaches you which areas of life keep pulling at your feelings. Some people see the same two or three houses come up again and again over a season.",
        "Use the list below as a quick guide to the month. Our calculator gives you a fuller reading for each house, written for the month ahead. If two or three returns in a row share a house, take it as a sign that the topic deserves real attention right now. A lone month in a house tends to pass more lightly.",
      ],
      list: {
        title: "Lunar return Moon in each house",
        items: [
          "1st house: your own needs come first this month",
          "2nd house: money, comfort and self worth",
          "3rd house: talks, errands and short trips",
          "4th house: home and family",
          "5th house: fun, romance and creative play",
          "6th house: work routines and health",
          "7th house: a partner or close friend takes focus",
          "8th house: deep feelings, trust and shared money",
          "9th house: travel, study and a wider view",
          "10th house: career and public life",
          "11th house: friends and group plans",
          "12th house: rest, sleep and time alone",
        ],
      },
    },
    {
      id: "lunar-return-ascendant",
      title: "Lunar return Ascendant and the mood of the month",
      paras: [
        "The lunar return Ascendant works like the weather on the first morning of a trip. It colors how the month feels and how you meet each day. Since the Ascendant moves so much from one return to the next, it gives every month its own flavor even though your Moon stays the same. A Moon that loves quiet will still feel the pace of a fire sign rising, and a lively Moon will feel the hush of a water sign rising.",
        "Look at the planet that rules the return Ascendant too. If Venus rules it, the house Venus sits in shows where the month's pleasures and relationships gather. If Saturn rules it, that house shows where the month asks for effort. This little step adds a second layer to your reading without much extra work. If the ruler sits close to an angle, its message is even louder for that month.",
      ],
      list: {
        title: "Lunar return Ascendant by element",
        items: [
          "Fire rising (Aries, Leo, Sagittarius): a quick, active month",
          "Earth rising (Taurus, Virgo, Capricorn): a steady month for practical steps",
          "Air rising (Gemini, Libra, Aquarius): a social month of talk and ideas",
          "Water rising (Cancer, Scorpio, Pisces): a feeling month that asks for care",
        ],
      },
    },
    {
      id: "lunar-return-timing",
      title: "Lunar return timing through the month",
      paras: [
        "A lunar return chart is strongest in the first days after the return, when its themes tend to appear. Many people notice a shift in mood within a day or two of the exact moment. The influence carries through the month and fades as the next return gets close, usually about four weeks later. The last few days before a return can feel like the end of a chapter, a natural time to rest and reflect.",
        "Inside each lunar month, the transiting Moon passes over every house of the return chart. When it crosses the return Ascendant or Midheaven, the month's themes often flare for a few hours. When it moves through the house of the return Moon, you may feel the month's main mood most clearly. The transiting Moon spends about two to three days in each sign, so these moments are short and easy to plan around.",
        "Your lunar returns also sit inside the year described by your solar return. A lunar return whose Moon lands in the same house as your solar return Sun often brings that year's main theme into focus. Keep an eye out for those months, since they tend to be the ones you remember. Months that land the Moon in an inward house can balance a busy year with a little rest.",
      ],
    },
    {
      id: "using-lunar-returns",
      title: "Practical ways to use lunar returns",
      paras: [
        "Lunar returns make a gentle planning tool. Look at your next few returns and note the Moon's house for each one. If a month puts the Moon in the sixth house, that may be a good time to reset your sleep or your diet. If it falls in the fifth, make room for play and creative projects. A Moon in the eleventh may be the month to reach out to friends you miss.",
        "Lunar returns are also helpful for self care. The Moon describes what makes you feel safe, and the return house shows where that need will show up. Knowing in advance lets you plan rest around busy months and set aside time for people when the month leans toward relationships. Over time you learn which houses drain you and which ones feed you, and you can plan with that in mind.",
        "Try a lunar return journal. On the day of each return, write a few lines about your mood and what is happening. After a year you will have 13 entries to compare, and many people find clear patterns in how each house feels for them. The journal also shows how your mood links to the season, your work and the people around you.",
      ],
      list: {
        title: "Simple lunar return habits",
        items: [
          "Mark each return date on your calendar",
          "Note the Moon's house and Ascendant sign",
          "Write a few lines on the day of the return",
          "Compare months that share a house",
          "Plan rest for months that look busy",
        ],
      },
    },
    {
      id: "lunar-return-mix-ups",
      title: "Common lunar return mix ups",
      paras: [
        "The most common mix up is confusing the lunar return with the New Moon. The New Moon happens when the Moon meets the Sun, and it is the same for everyone on Earth. Your lunar return happens when the Moon reaches its degree in your own birth chart, so it is personal to you. Your return can land at any phase, from New Moon to Full Moon.",
        "Another mix up is using your birth city for every return. The chart should use the place where you are at the exact return moment, since location changes the Ascendant and houses. If you travel a lot, check the city for each return. People also expect the Moon's sign to change from return to return. It stays the same every time, and the houses and angles carry the change.",
      ],
    },
    {
      id: "lunar-return-accuracy",
      title: "Lunar return accuracy and what to explore next",
      paras: [
        "Lunar returns depend closely on your birth time. The Moon moves about half a degree every hour, so an hour of error in your birth time moves your natal Moon by about half a degree. That shifts each lunar return by roughly an hour, which can change the Ascendant sign of the return and the house the Moon falls in. The Ascendant moves about one degree every four minutes, so even a small shift adds up.",
        "If you only know your birth date, the Moon's position at birth could be off by several degrees, and each return could move by many hours. Treat the times and houses as rough in that case. A birth certificate or a hospital record usually gives the exact time, and even knowing the hour helps a great deal. You can also use the dates as a loose guide while you track down your time.",
        "When you have your lunar returns, open your free birth chart to see your natal Moon and its reading. The solar return calculator shows the year your months belong to, and the daily horoscope follows the Moon day by day. Visit the zodiac sign pages to learn more about your Moon sign, or the compatibility page to see how your Moon meets someone else's chart.",
      ],
      list: {
        title: "Where to go after your lunar returns",
        items: [
          "Free birth chart: your natal Moon and its reading",
          "Moon sign calculator: what your Moon needs",
          "Solar return: the year around these months",
          "Daily horoscope: the Moon of the day for you",
          "Compatibility: how your Moon meets a partner's chart",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a lunar return?",
      a: "A lunar return is the moment the Moon comes back to the exact degree it held when you were born. It happens about every 27.3 days, or about 13 times a year. A chart cast for that moment describes your emotional month, from this return to the next, and where your feelings and needs will focus.",
    },
    {
      q: "How often does a lunar return happen?",
      a: "About every 27.3 days, which comes to about 13 returns each year. The exact gap changes by a few hours from month to month, since the Moon moves faster near its closest point to Earth and slower near its farthest point. Our calculator lists your next 13 returns from today.",
    },
    {
      q: "Is the lunar return the same as the New Moon?",
      a: "They are different events. The New Moon happens when the Moon lines up with the Sun, and it is the same for everyone. Your lunar return happens when the Moon reaches its own degree in your birth chart, so it is personal. The two cycles also differ in length: about 27.3 days for the return and about 29.5 days from New Moon to New Moon.",
    },
    {
      q: "What is the most important part of a lunar return chart?",
      a: "The house holding the Moon is usually the clearest signal. It shows where your emotional energy will go during the month. The Ascendant comes next and sets the mood of the month. Planets close to the angles or touching the return Moon add extra detail to the reading.",
    },
    {
      q: "Why is the Moon's sign the same in every lunar return?",
      a: "A lunar return is defined as the Moon getting back to its natal degree, so the Moon's sign and degree always match your birth chart. What changes each month is the rest of the chart. The Ascendant, the houses and the other planets all move, and those changes give each month its own theme.",
    },
    {
      q: "Which city should I use for my lunar return?",
      a: "Use the city where you will be at the exact return moment. Location changes the Ascendant and the houses, so the same return can look different in two places. If you travel often, check the city for each return in the list, since every month can have its own location.",
    },
    {
      q: "Do I need my birth time for a lunar return?",
      a: "Yes, it helps a lot. The Moon moves about half a degree every hour, so a small error in your birth time moves the natal Moon and shifts every return by about the same amount of time. A wrong time can change the return's Ascendant and the house of the Moon.",
    },
    {
      q: "How long does a lunar return chart last?",
      a: "It covers the month from one return to the next, about 27 days. Its themes are usually strongest in the first days after the return and fade as the next return approaches. The next chart then takes over and sets a new tone for the following month.",
    },
    {
      q: "Can a lunar return predict events?",
      a: "A lunar return describes moods and focus more than specific events. It shows which part of life will draw your feelings and how the month is likely to feel. Use it to plan rest, time with people and personal projects, and read it alongside your transits for the bigger picture.",
    },
  ],
};
