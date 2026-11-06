import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "solar-return",
  title: "Solar Return Calculator: Your Birthday Chart for the Year",
  description: "Free solar return calculator. Find the moment the Sun returns to its birth degree, see your birthday chart and read its Ascendant, Sun house and Moon sign.",
  h1: "Solar Return Calculator",
  lead: "Every year the Sun comes back to the exact spot it held when you were born. The chart for that moment is your solar return, a map of the year from one birthday to the next.",
  sections: [
    {
      id: "what-is-a-solar-return",
      title: "What a solar return is",
      paras: [
        "A solar return is the moment each year when the Sun reaches the exact degree and minute it held at your birth. It happens once a year, on your birthday or within about a day of it. Astrologers cast a full chart for that moment, and the result is called the solar return chart. It reads like a forecast for the year that runs from this birthday to the next, written in the same language as your birth chart.",
        "Your birth chart describes who you are for a lifetime. The solar return chart describes the theme of one year inside that lifetime. It has its own Ascendant, its own houses and its own aspects, and those change every year even though the Sun always lands on the same degree. One year the Sun may sit in the house of career, and the next year in the house of home.",
        "Many people already feel that a birthday works like a personal new year. The solar return gives that feeling a precise moment. Some like to spend it doing something meaningful, like writing down hopes for the year or simply resting, since the start of any cycle tends to color what follows. Knowing the exact minute lets you mark it on purpose.",
      ],
    },
    {
      id: "solar-return-astronomy",
      title: "The astronomy behind the solar return",
      paras: [
        "From Earth, the Sun seems to travel once around the zodiac each year, moving close to one degree a day. When it gets back to its birth position, one full circle is complete. That trip takes one tropical year, about 365.24 days, which is a little longer than the 365 days of a common calendar year. Our calendar uses leap days to keep up with that small difference.",
        "That extra quarter of a day explains why your solar return moment drifts. Each year the return comes roughly six hours later on the clock than the year before. Then a leap day pulls the calendar back into line, and the drift starts again. Over a lifetime, your return moment can land on the day before your birthday, on the day itself, or on the day after. Time zones add one more twist, since the same instant can carry two dates in two cities.",
        "The return moment is the same instant everywhere on Earth. What changes with your location is the local clock time and the sky overhead. Someone in Tokyo and someone in London share the same return instant, yet they see a different sign rising on the eastern horizon at that instant. That is why a solar return chart needs a place as well as a time.",
      ],
    },
    {
      id: "how-we-calculate-solar-return",
      title: "How we calculate your solar return",
      paras: [
        "You enter your birth details, the year you want, and the city where you will spend your birthday. A birth time is recommended. The calculator first finds the exact position of your natal Sun, using true positions of date from the astronomy-engine library. Then it searches the days around your birthday in the chosen year and narrows in on the precise moment the Sun matches that natal degree.",
        "Once it has the moment, the calculator shows it in the local time of your birthday city, with daylight saving taken into account. It then casts a full chart for that instant at that place: the planets in their signs and degrees, the Ascendant and Midheaven, and Placidus houses, with whole sign houses used near the poles where Placidus breaks down.",
        "Your result reads three key parts of that chart: the sign on the solar return Ascendant, the house the Sun falls in, and the sign of the solar return Moon. Together they give you the tone of the year, the main area of focus, and the emotional weather. You can also study the full chart for every other planet and aspect, and compare it with last year's return to see what has shifted.",
      ],
    },
    {
      id: "reading-a-solar-return",
      title: "How to read a solar return chart",
      paras: [
        "Start with the Ascendant. In a solar return it describes the style of the year and how you meet it, a bit like the outfit the year asks you to wear. Next, find the house holding the Sun. That house shows where your energy and attention will go, and where the year's main story plays out. It is often the part of life that asks the most of you. Then look at the Moon's sign for the emotional tone and what will help you feel settled.",
        "After those three, look for any planet very close to the four angles: the Ascendant, the Descendant, the Midheaven and the IC. A planet sitting on an angle tends to shout, and its theme often shows up clearly in the year. Also notice which houses are crowded with planets, since busy houses point to busy parts of life. An empty house is fine too. It simply means that area runs on its usual settings this year.",
        "Always read the solar return alongside your birth chart. A solar return Sun in the tenth house means more to someone whose birth chart already leans toward career. The return chart adds a layer on top of who you are, and your natal chart decides how that layer feels. A theme that echoes your birth chart tends to come through loud and clear.",
      ],
      list: {
        title: "Solar return reading order",
        items: [
          "The Ascendant sign, for the style of the year",
          "The Sun's house, for the main area of focus",
          "The Moon's sign, for your emotional needs",
          "Planets near the angles, for the loudest themes",
          "Crowded houses, for the busiest parts of life",
        ],
      },
    },
    {
      id: "solar-return-ascendant",
      title: "Solar return Ascendant by sign",
      paras: [
        "The solar return Ascendant changes almost every year, and it is one of the clearest signals in the chart. It sets the mood of how you approach the year, the energy others notice in you, and the kind of situations that seem to find you. Because the Ascendant depends on the exact time and place of the return, it is also the part of the chart most affected by where you spend your birthday.",
        "Read the list below as a starting point. Our calculator gives you a fuller reading for your sign, and the ruling planet of that sign adds more detail. If Mars rules your solar return Ascendant, for example, the house Mars sits in shows where the year's drive goes. A Venus ruled Ascendant points you to the house of Venus instead, where the year's pleasures and relationships gather.",
      ],
      list: {
        title: "Solar return Ascendant signs",
        items: [
          "Aries rising: a bold year of fresh starts",
          "Taurus rising: a steady year for comfort and savings",
          "Gemini rising: a busy year of learning, talk and short trips",
          "Cancer rising: home and family at the center",
          "Leo rising: a year to be seen and to create",
          "Virgo rising: routines, health and useful skills",
          "Libra rising: partners and fair agreements",
          "Scorpio rising: depth, focus and private change",
          "Sagittarius rising: travel, study and a wider view",
          "Capricorn rising: goals and well earned status",
          "Aquarius rising: friends, ideas and new freedom",
          "Pisces rising: a softer year for rest and art",
        ],
      },
    },
    {
      id: "solar-return-sun-house",
      title: "Solar return Sun by house",
      paras: [
        "The Sun always sits on the same degree in every solar return, so its sign never changes. Its house, however, changes from year to year. The house shows the stage where the year's main story happens. Many astrologers treat the solar return Sun's house as the single most useful line in the whole chart. If you read nothing else, read this.",
        "Some houses feel public and busy, like the tenth and the seventh. Others feel inward, like the twelfth and the fourth. Neither kind is better. An inward year can be the one that sets up a big outward year later, and a public year often needs the rest that follows it. Over a run of years, the Sun tends to move through the houses in a loose rhythm, so you can look back and see the pattern.",
      ],
      list: {
        title: "Solar return Sun in each house",
        items: [
          "1st house: a year about you and a fresh image",
          "2nd house: money and what you value",
          "3rd house: learning, writing and your neighborhood",
          "4th house: home and roots",
          "5th house: romance, play, children and creative work",
          "6th house: daily work and health",
          "7th house: partnerships and close ties",
          "8th house: shared money, trust and deep change",
          "9th house: travel and big beliefs",
          "10th house: career and public goals",
          "11th house: friends, groups and hopes",
          "12th house: rest, reflection and private renewal",
        ],
      },
    },
    {
      id: "solar-return-moon-and-timing",
      title: "The solar return Moon and the timing of the year",
      paras: [
        "The Moon moves fast, about 12 to 15 degrees a day, so its sign in your solar return changes every year in a pattern that feels random. It describes what you will need emotionally in the year ahead and how you will look after yourself. A fire Moon wants action and fun. A water Moon wants closeness and safety. An earth Moon wants practical comfort, and an air Moon wants talk and space to think.",
        "A solar return chart covers the year from one birthday to the next. Many astrologers notice its themes starting to show a few weeks before the birthday, as if the new year arrives early. The influence then fades slowly as the next return comes near. Transits during the year can trigger the solar return chart, so watch for slow planets crossing its angles. Those crossings often mark the months when the year's theme feels strongest.",
        "Some people also look at the Moon's phase in the solar return, since it repeats in a cycle of about 19 years. A solar return with a Full Moon feeling may bring something to a peak, while a New Moon feeling suits fresh starts. These are gentle hints to weigh alongside the rest of the chart, so give them less weight than the Sun's house or the Ascendant.",
      ],
    },
    {
      id: "solar-return-location",
      title: "Solar return location and birthday travel",
      paras: [
        "The city you pick matters. The return instant is fixed, yet the sky overhead depends on where you stand. Moving a few hundred miles can shift the Ascendant by several degrees, and crossing a continent can change it to a new sign entirely. That moves every house cusp, so the Sun and the other planets can land in different houses. The same return moment read in two cities gives two different charts.",
        "What travel leaves alone is just as important. The planets keep their signs and their aspects to each other no matter where you go. A Saturn square in your solar return stays a Saturn square in every city on Earth. Location changes the stage the year plays on, while the cast of planets stays the same. The Moon's sign holds steady too, wherever you spend the day.",
        "Some people choose a birthday trip to place a helpful planet on an angle or move the Sun into a house they want to grow. If you try this, compare a few cities in the calculator first. The usual practice is to use the place where you will be at the exact return moment, which may be a hotel far from home. Keep your hopes realistic, since a trip shifts the emphasis of a year while your birth chart stays the same.",
      ],
    },
    {
      id: "solar-return-mix-ups",
      title: "Common solar return mix ups",
      paras: [
        "The most common mix up is using your birth city out of habit. Unless you will spend your birthday there, the chart should use the place where you will actually be at the return moment. Another is casting the chart for midnight or noon on your birthday. The return happens at a precise minute, and only that minute gives the right Ascendant.",
        "People also mix up the solar return Ascendant with their natal rising sign. Your natal rising sign is yours for life. The solar return Ascendant belongs to one year only. Finally, some read the solar return chart on its own, as if it replaced the birth chart. It works best as a layer that sits on top of your natal chart and speaks to one year at a time.",
      ],
    },
    {
      id: "solar-return-accuracy",
      title: "Solar return accuracy and what to explore next",
      paras: [
        "Your birth time matters more here than you might expect. The solar return depends on the exact degree and minute of your natal Sun, and the Sun moves about one minute of arc every 24 minutes. A birth time that is a few hours off shifts your natal Sun by a few arc minutes, which moves the return moment by a few hours. In that time the Ascendant can move through two or more signs.",
        "If you only know your birth date, the calculator still finds the day of your return and the signs of the planets, and the Moon sign often holds. Treat the Ascendant and houses as uncertain. A birth certificate or a hospital record is the best place to find the exact time, and even a time to the nearest half hour helps a great deal.",
        "When you have your solar return, open your free birth chart to compare the two. The daily horoscope follows the transits that set off this year's chart, and the lunar return calculator breaks the year into monthly charts. For relationships in the year ahead, try the compatibility page, and the zodiac sign pages explain the sign on your return Ascendant.",
      ],
      list: {
        title: "Where to go after your solar return",
        items: [
          "Free birth chart: the natal chart beneath your return",
          "Lunar return: a chart for each month of the year",
          "Transits: what the sky does to your chart on any date",
          "Daily horoscope: today's sky for you",
          "Zodiac sign pages: your return Ascendant sign in depth",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a solar return chart?",
      a: "It is a chart cast for the moment the Sun comes back to the exact degree and minute it held at your birth. That happens once a year, close to your birthday. Astrologers read the chart as a guide to the year ahead, from this birthday to the next, using its Ascendant, its houses and its aspects.",
    },
    {
      q: "Why is my solar return on a different day than my birthday?",
      a: "A tropical year lasts about 365.24 days, so the return moment drifts about six hours later each year until a leap day pulls it back. Time zones also play a part. Depending on the year and the city, your return can fall on the day before your birthday, the day itself, or the day after.",
    },
    {
      q: "Which city should I use for my solar return?",
      a: "Use the place where you will be at the exact return moment. If you are at home, use your home city. If you are traveling over your birthday, use the city you will be in at that minute. Your birth city only applies when you will spend your birthday there.",
    },
    {
      q: "Does traveling for my birthday change my solar return?",
      a: "It changes the Ascendant, the Midheaven and the house cusps, so planets can fall into different houses. The planets keep their signs and their aspects to each other wherever you go. Some people plan a birthday trip to put a helpful planet on an angle, and the calculator lets you compare cities before you decide.",
    },
    {
      q: "What is the most important part of a solar return chart?",
      a: "Many astrologers start with the house that holds the Sun, since it shows where the year's main story plays out. The solar return Ascendant sets the style of the year, and the Moon's sign shows your emotional needs. Planets close to the angles also carry extra weight in the year ahead.",
    },
    {
      q: "Do I need my birth time for a solar return?",
      a: "A birth time is strongly recommended. Without it, the exact degree of your natal Sun is uncertain by a few arc minutes, which moves the return moment by a few hours. That can change the Ascendant and houses completely. The date and the planet signs will still be reliable.",
    },
    {
      q: "When does a solar return start to work?",
      a: "Officially, the chart covers the year from one return moment to the next. Many people notice its themes a few weeks before the birthday, as the year turns over. The chart then stays active for the whole year, and slow transits to its angles can bring its themes to the surface.",
    },
    {
      q: "Can I look at past or future solar returns?",
      a: "Yes. Pick any year and the calculator finds the return moment for it. Looking at past returns is a great way to learn how the chart works in your life. Looking ahead helps you plan a birthday trip or prepare for the themes of the next year.",
    },
    {
      q: "Is a solar return the same as a birthday horoscope?",
      a: "A general birthday horoscope uses your Sun sign alone. A solar return chart uses the exact moment and place of your return, so it is unique to you. It includes every planet, the Ascendant and all twelve houses, which gives a much more personal picture of the year.",
    },
  ],
};
