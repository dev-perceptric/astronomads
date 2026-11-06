import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "transits",
  title: "Transits Calculator: Planet Transits to Your Chart on Any Date",
  description: "Free transits calculator. Pick any date to see the planets crossing your birth chart with readings, plus a monthly ephemeris with stations and lunations.",
  h1: "Transits for Any Date",
  lead: "Pick a day, past or future, and see how the moving sky touches your birth chart. Add your chart for personal transits, or leave it off to read the sky on its own.",
  sections: [
    {
      id: "what-transits-are",
      title: "What transits are",
      paras: [
        "A transit is the moving sky meeting your birth chart. Your chart is a snapshot of where the planets stood at the moment you were born. The real planets kept going after that moment, and they are still going today. When one of them reaches an exact angle to a point in your snapshot, astrologers call that a transit. Jupiter passing over your natal Sun is a transit. Saturn forming a square to your natal Moon is one too.",
        "Think of your birth chart as a fixed map and the transits as weather moving across it. The map shows the shape of the land: your strengths, your needs, the places where you grow. The weather shows what is happening on a given day or season. The same storm feels different on a mountain than in a valley, and the same transit lands differently in each chart. That is why two friends born a year apart can have very different months under one sky.",
        "Transits are the most widely used timing tool in astrology. They are simple to grasp, and they work for any moment in history or the future. A transits calculator does the heavy lifting for you. It finds where every planet was on your chosen date and compares each one with every point in your chart, so your time goes into the meaning.",
      ],
    },
    {
      id: "transits-astronomy",
      title: "The astronomy behind transits",
      paras: [
        "Every planet circles the Sun at its own pace, and from Earth we watch them travel along the ecliptic, the Sun's yearly path through the zodiac signs. The Moon is the fastest mover. It changes sign about every 2.5 days and goes all the way around the zodiac in about 27.3 days. The Sun moves close to one degree a day and spends about a month in each sign. Mercury and Venus stay near the Sun, so over a year they cover the whole zodiac too, with pauses for retrograde.",
        "Farther out, the pace slows. Mars takes close to two years to circle the zodiac. Jupiter needs about 12 years, so it spends roughly a year in each sign. Saturn takes about 29.5 years, around two and a half years per sign. Uranus needs about 84 years and Neptune about 165. Pluto takes about 248 years, and because its orbit is so stretched it lingers anywhere from about 12 to more than 30 years in one sign.",
        "This range of speeds is the key to reading transits. A Moon transit lasts a few hours. A Saturn transit can stretch over months, and an outer planet may come back to the same degree several times as it turns retrograde and direct. Speed tells you how long a transit lasts and, in most cases, how deep it goes. Fast transits touch your mood and your schedule, while slow ones touch the shape of your life.",
      ],
    },
    {
      id: "how-we-calculate-transits",
      title: "How our transits calculator works",
      paras: [
        "You pick a date and a time. The calculator finds the position of each planet at that moment with the astronomy-engine library, the same engine behind our birth charts. Positions are true positions of date, measured along the ecliptic in the tropical zodiac. If you add your birth chart, the calculator then measures the angle between each moving planet and each point in your chart: the ten planets from the Sun to Pluto, plus your Ascendant and Midheaven when your birth time is known.",
        "We look for the five major aspects: the conjunction, sextile, square, trine and opposition. Each transit has an orb, the small gap allowed on either side of exact. We keep transit orbs tight, a few degrees at most for the Moon and closer still for the slow planets, so a transit shows up only while it is near exact and truly active. Wide orbs flood a page with weak contacts. Tight ones keep the list short and useful.",
        "Without a birth chart, the page shows the sky itself for your chosen moment: the sign and degree of every planet and which ones are retrograde. That view is handy when you want to see what a big date in history looked like overhead, or plan around the sky before you have your chart ready. Add your chart at any time to switch to personal transits.",
      ],
      list: {
        title: "What the transits page shows",
        items: [
          "Every planet's sign and degree at your chosen moment",
          "Transits to your natal planets, Ascendant and Midheaven",
          "A reading for each transit to your chart",
          "A monthly ephemeris at 00:00 UTC for each day",
          "Sign changes and stations during that month",
          "The dates of the month's New Moon and Full Moon",
        ],
      },
    },
    {
      id: "reading-your-transits",
      title: "How to read your transits",
      paras: [
        "Each line in your transits list has three parts: the moving planet, the aspect, and the point in your chart. Start with the moving planet. It describes the kind of energy that is arriving. Mars brings drive, while Saturn brings structure and tests. Then look at your natal point. It tells you which part of your life is being touched, such as your sense of self for the Sun or your feelings for the Moon.",
        "The aspect describes how the two meet. Conjunctions merge the two energies and tend to start something new. Trines and sextiles flow with ease and reward effort. Squares create friction that pushes you to act. Oppositions bring a pull between two sides, often through other people. Hard aspects feel stronger, and they also tend to produce the most growth. Soft aspects open doors, though you still need to walk through them.",
        "Give the most weight to slow planets touching personal points. A Saturn or Pluto transit to your Sun, Moon, Ascendant or Midheaven shapes a whole chapter of life. A Moon transit to your Venus colors an afternoon. Our list puts the most important transits first. It weighs the speed of the moving planet, how central the natal point is, how close the aspect is to exact, and whether it is still building.",
      ],
      list: {
        title: "Transit aspects at a glance",
        items: [
          "Conjunction (0°): a merge and a fresh start",
          "Sextile (60°): an opening that rewards a small step",
          "Square (90°): friction that asks for action",
          "Trine (120°): ease and natural support",
          "Opposition (180°): a pull between two sides, often seen in others",
        ],
      },
    },
    {
      id: "transit-planets",
      title: "Each planet as a transit",
      paras: [
        "Every planet has its own flavor as a transit. The fast movers, from the Moon out to Mars, are often called personal transits. They pass quickly and color days or weeks. The slow movers, from Jupiter out to Pluto, mark seasons of life that can last from a few months to a couple of years, and they often arrive with events you remember long after.",
        "Use the list below as a quick guide. When you see a transit on your page, read the planet first, then the aspect, then the natal point, and build the meaning from those parts. Our readings do this for you, and the guide helps you see why each reading says what it does. The natal point matters as much as the moving planet.",
        "A few transits are so well known that they have their own names. The Sun comes back to its birth degree once a year, which is your solar return. The Moon does the same about every 27.3 days, your lunar return. Saturn's return to its birth degree, first around ages 27 to 30, is the most famous transit of all. Each of these has its own calculator on Astronomads, since those moments deserve a full chart of their own.",
      ],
      list: {
        title: "Transit planets and what they bring",
        items: [
          "Moon: moods and needs, for a few hours",
          "Sun: focus and visibility, for a few days",
          "Mercury: talks, plans, messages and short trips",
          "Venus: love and money",
          "Mars: energy, effort and the urge to compete",
          "Jupiter: growth and big hopes, over a few weeks",
          "Saturn: structure, duty, effort and lasting results, over months",
          "Uranus: change and sudden freedom",
          "Neptune: dreams, intuition and a softer focus",
          "Pluto: deep change and renewal, for a year or more",
        ],
      },
    },
    {
      id: "transit-timing",
      title: "Transit timing, stations and retrogrades",
      paras: [
        "A transit has a life cycle. It begins when the moving planet enters the orb, builds while it is applying, peaks at the exact degree, and fades as it separates. Many people feel a transit most while it is applying, in the days or weeks before it turns exact. By the time it is exact, the theme is often already out in the open, and the separating phase is a time to digest what happened.",
        "Retrograde motion stretches this cycle. When a planet seems to move backward from Earth, it can cross the same degree of your chart three times: once moving forward, once in retrograde, and once more after it turns direct. With Saturn, Uranus, Neptune and Pluto this pattern is common, and the passes can spread over most of a year. The first pass tends to raise a topic, the middle one asks you to review it, and the last one settles it.",
        "Stations matter too. A station is the day a planet seems to stand still before it changes direction. A planet that stations on one of your natal points sits on that degree for days or weeks, and the transit can feel stronger than usual. The ephemeris on this page lists every station in the month, so you can spot one that lands close to a degree in your chart.",
      ],
    },
    {
      id: "transits-ephemeris",
      title: "The monthly transits ephemeris",
      paras: [
        "Below the transits, the page shows an ephemeris for the whole month. An ephemeris is a table of planet positions over time, the tool astrologers relied on for centuries before computers. Ours lists every planet's sign and degree at 00:00 UTC on each day of the month you pick. Read across a row to see the whole sky on one day, or down a column to follow one planet through the month.",
        "UTC is the world time standard, very close to Greenwich Mean Time. Using one fixed clock keeps the table the same for everyone on Earth. If you live far from Greenwich, remember that 00:00 UTC may fall on the evening before or later in the morning of that date in your own time zone. Slow planets barely move across those hours, while the Moon can shift several degrees.",
        "The table also marks the month's sign changes, the stations where planets turn retrograde or direct, and the dates of the New Moon and Full Moon. Scan a column to watch a slow planet creep toward one of your natal degrees, or to plan around a Mercury station before you sign a contract or book a trip. Stations stand out because the degrees barely change for several days in a row.",
      ],
      list: {
        title: "How to use the transits ephemeris",
        items: [
          "Find one of your natal degrees and scan a slow planet's column for it",
          "Circle the days a planet changes sign",
          "Note each station, since the planet lingers on that degree",
          "Mark the New Moon for fresh starts and the Full Moon for finishing",
        ],
      },
    },
    {
      id: "using-transits",
      title: "Practical ways to use transits",
      paras: [
        "Transits work well as a planning guide. Check the coming month for supportive contacts, such as Jupiter or Venus trines to your Sun or Midheaven, and use those windows for a launch, an interview or a request you care about. Note the harder contacts, such as Saturn squares, and give yourself extra time and patience for the work they bring. A hard transit is a good time for steady effort and a poor time for shortcuts.",
        "Transits also help you understand the past. Pick the date of a big life event, like a move or a new job, and look at what was crossing your chart. Often the themes line up in ways that make the event easier to accept. This kind of review teaches you how transits feel in your own life, which is worth more than any general description.",
        "Keep a short journal. Write down the main transit of the week and a sentence about how the week went. After a few months you will see which planets you feel most. Some people feel Mars strongly and barely notice Neptune, and others are the reverse. Your own record turns into the most personal transit guide you will ever own.",
      ],
      list: {
        title: "Good questions to ask a transit",
        items: [
          "Which planet is moving, and how long will it stay in orb?",
          "Which part of my chart does it touch?",
          "Is it applying or separating?",
          "Is the moving planet near a station?",
          "When did this planet last touch this point, and what happened then?",
        ],
      },
    },
    {
      id: "transit-mix-ups",
      title: "Common transit mix ups",
      paras: [
        "The most common mix up is reading a sky event as a personal transit. Mercury retrograde happens for everyone, yet it lands on your chart in a personal way only when it touches one of your points or moves through a house that matters to you right now. The sky view on this page shows the general weather. The transits list with your chart shows what hits home.",
        "Another mix up is treating a Sun sign forecast as your full story. Sun sign columns use your Sun sign as a stand in for the whole chart. Real transits use every planet in your chart along with your Ascendant and Midheaven, so they are far more specific to you. Two people with one Sun sign can have opposite months.",
        "People also confuse transits with progressions. Transits are the real planets in the sky on a given date. Secondary progressions are a symbolic timing method where each day after birth stands for one year of life. Both are useful, and they answer different questions. Our progressions calculator covers the second method in full, and many astrologers read the two side by side.",
      ],
    },
    {
      id: "transit-accuracy",
      title: "Transit accuracy and where to go next",
      paras: [
        "Transits to your planets work well even with a rough birth time, since most planets move slowly over a day. The Moon is the exception. It travels about 12 to 15 degrees a day, so an unknown birth time can shift your natal Moon by several degrees. That moves the timing of slow transits to your Moon by weeks or even months.",
        "Transits to your Ascendant and Midheaven need an accurate birth time. These angles move about one degree every four minutes on average, so a time that is half an hour off can move them by around seven degrees. That changes when transits to your angles happen, and it can shift the house a moving planet passes through. If your time is a guess, lean on transits to your planets and treat angle transits as a rough guide.",
        "Once you know your transits, open your free birth chart to see the natal points they touch, each with its own reading. For a short daily view, the daily horoscope turns your strongest transits into a few lines for today. The compatibility page shows how two charts meet, and the zodiac sign pages explain each sign a planet moves through.",
      ],
      list: {
        title: "Where to go after your transits",
        items: [
          "Free birth chart: your natal points with readings",
          "Daily horoscope: today's strongest transits for you",
          "Solar return: your chart for the year ahead",
          "Retrograde checker: every station this year and next",
          "Compatibility: how two charts meet",
          "Zodiac sign pages: the signs the planets move through",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a transit in astrology?",
      a: "A transit is a planet in today's sky making an aspect to a point in your birth chart. Your chart records where the planets were when you were born, and the real planets keep moving. When one of them reaches an exact conjunction, sextile, square, trine or opposition to a natal point, it activates that part of your chart for as long as it stays close.",
    },
    {
      q: "How long does a transit last?",
      a: "It depends on the speed of the moving planet. A Moon transit lasts a few hours, and transits from the Sun, Mercury and Venus last a few days. Mars stays for about a week. Jupiter transits run for a few weeks, Saturn for a few months, and Uranus, Neptune and Pluto can stay in orb for a year or more, often with three passes because of retrograde motion.",
    },
    {
      q: "Which transits matter most?",
      a: "Slow planets touching personal points carry the most weight. Look for Saturn, Uranus, Neptune or Pluto making a close aspect to your Sun, Moon, Ascendant or Midheaven. Jupiter on those points also marks a notable season. Our list ranks transits by the speed of the moving planet, the importance of the natal point and how close the aspect is to exact.",
    },
    {
      q: "Can I check transits for a past or future date?",
      a: "Yes. Pick any date and time, and the calculator finds the planets for that moment. Looking back at big days in your life is one of the best ways to learn how transits feel for you. Looking ahead helps you plan launches, trips and rest around the months that suit them best.",
    },
    {
      q: "Do I need my birth time to see my transits?",
      a: "A birth date is enough for transits to your planets from the Sun to Pluto. Your birth time adds the Ascendant and Midheaven, which are some of the most sensitive points for transits. Without a time, your natal Moon could also be off by several degrees, so treat transits to the Moon as approximate.",
    },
    {
      q: "Why does the ephemeris use 00:00 UTC?",
      a: "UTC is the world time standard, and one fixed clock keeps the table the same for every reader. It is the classic format for printed ephemerides. Depending on your time zone, 00:00 UTC falls on the evening before or during the morning of that date where you live. Slow planets barely move in those hours, while the Moon can shift several degrees.",
    },
    {
      q: "What does it mean when a transit happens three times?",
      a: "A slow planet can cross one of your natal degrees, turn retrograde and cross it again backward, then turn direct and cross it a third time. The three passes can spread over most of a year. Many astrologers read the first pass as the start of a theme, the second as a time to review it, and the third as the point where it settles.",
    },
    {
      q: "Are hard transits bad?",
      a: "Squares and oppositions bring friction, and friction is often what gets you moving. Many people look back on a hard Saturn transit as the season they built something that lasted. Hard transits ask for effort and patience. Soft transits like trines bring ease, and they work best when you use the opening they offer.",
    },
    {
      q: "What orb do you use for transits?",
      a: "We keep orbs tight so the list shows transits that are truly active. The Moon gets the widest orb, a few degrees, and the slow planets from Saturn to Pluto get the closest, a little over one degree. A transit appears on the page only while the moving planet is that close to the exact aspect.",
    },
  ],
};
