import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "retrogrades",
  title: "Retrograde Checker: Which Planets Are Retrograde Right Now",
  description: "See which planets are retrograde right now or on any date, with every station and shadow date for this year and next, and the retrogrades in your own chart.",
  h1: "Retrogrades now",
  lead: "Check which planets are retrograde today or on any date you pick, and see every station and shadow period for this year and next. No birth data needed.",
  sections: [
    {
      id: "what-a-retrograde-planet-means",
      title: "What a retrograde planet means",
      paras: [
        "A planet is retrograde when it seems to move backward through the zodiac as seen from Earth. Most of the time the planets drift forward from sign to sign, in the order Aries, Taurus, Gemini and onward. Every so often one of them slows down, appears to stop and then slides back over degrees it has already crossed. After a while it stops again and returns to forward motion, which astrologers call direct.",
        "In astrology a retrograde period is a time to review the areas that planet rules. Mercury rules talk and travel, so its retrograde is a classic season for double checking messages and revisiting old ideas. Venus rules love and money, so its retrograde invites a fresh look at values and relationships. Mars rules energy and action, and its retrograde asks you to rethink how and where you push.",
        "Retrogrades are a normal part of the sky. For most of the year at least one planet is retrograde, and often several are, since the slow outer planets spend months of each year moving backward. The goal of a retrograde checker is simply to know what is happening so you can plan with it, the way you might check the weather before a trip.",
      ],
    },
    {
      id: "why-planets-look-retrograde",
      title: "Why planets look retrograde from Earth",
      paras: [
        "Planets never truly reverse. Retrograde motion is an effect of watching from a moving Earth. Think of passing a slower car on the highway. As you pull ahead, the other car seems to slide backward against the trees behind it, even though both cars are moving forward. The same thing happens when Earth, on its faster inner track, catches up with and passes an outer planet such as Mars, Jupiter or Saturn.",
        "For the outer planets, retrograde motion happens around opposition, when Earth sits between the planet and the Sun. That is also when the planet is closest to Earth and brightest in the night sky, rising around sunset and shining all night. A Mars retrograde is a great time to look up, since Mars can glow a strong orange red for weeks on end.",
        "Mercury and Venus orbit inside Earth's path, so their retrogrades work a little differently. They appear to move backward when they swing around the near side of the Sun and pass between the Sun and Earth. Near that moment they are lost in the Sun's glare, then reappear on the other side of it, moving from the evening sky into the morning sky.",
      ],
    },
    {
      id: "how-our-retrograde-checker-works",
      title: "How our Retrograde Checker works",
      paras: [
        "The Retrograde Checker needs no birth data. Open it and it shows which planets are retrograde right now. Pick any date, past or future, and it shows which planets were or will be retrograde then. Below that it lists every station, both retrograde and direct, for this year and next, with the date and the zodiac degree of each one, plus the start of each pre-shadow and the end of each post-shadow.",
        "Every position comes from the astronomy-engine library, which computes true positions of date. A station is the moment a planet's motion along the zodiac changes direction, so we follow each planet's motion until it turns and pin down the date and degree of the turn. The shadow dates come from the degrees of those stations, as described in the next section.",
        "If you like, add a birth chart. The checker then shows which planets were retrograde when you were born and which houses of your chart the current retrogrades pass through. That turns a general sky report into a personal one, since a Mercury retrograde through your second house feels very different from one through your seventh. Leave it out whenever you only want the sky.",
      ],
      list: {
        title: "What the Retrograde Checker shows",
        items: [
          "Planets retrograde right now",
          "Planets retrograde on any date you pick",
          "Every retrograde and direct station for this year and next",
          "The date and degree of each station",
          "Pre-shadow start and post-shadow end dates",
          "Retrograde planets in your birth chart, optional",
          "Houses the current retrogrades pass through, optional",
        ],
      },
    },
    {
      id: "retrograde-stations-and-shadows",
      title: "Retrograde stations and shadow periods",
      paras: [
        "A station is the day a planet seems to stand still before changing direction. There are two in every retrograde cycle. The retrograde station is when the planet stops and starts to move backward. The direct station is when it stops again and starts to move forward. Planets move very slowly for days around a station, so astrologers often treat station days as the most intense part of the cycle.",
        "The shadow is the stretch of the zodiac a retrograde covers. Picture the planet backing up from a high degree to a low degree. The pre-shadow begins when the planet first reaches that low degree, weeks before it turns retrograde, so it is crossing ground it will soon revisit. The post-shadow lasts from the direct station until the planet passes the high degree where it turned retrograde, finally leaving the retrograde zone behind.",
        "Many people find the shadow periods useful for planning. Themes that show up in the pre-shadow often return during the retrograde for a second look, and they tend to resolve in the post-shadow. Our checker lists the pre-shadow start and post-shadow end for each retrograde, so you can see the full arc along with the retrograde weeks themselves, and plan the whole stretch in one view.",
      ],
      list: {
        title: "The four dates of a retrograde cycle",
        items: [
          "Pre-shadow start: the planet first reaches the degree where it will later turn direct.",
          "Retrograde station: the planet stops and turns backward.",
          "Direct station: the planet stops and turns forward again.",
          "Post-shadow end: the planet passes the degree where it turned retrograde.",
        ],
      },
    },
    {
      id: "each-planets-retrograde-cycle",
      title: "Each planet's retrograde cycle",
      paras: [
        "Each planet has its own retrograde rhythm, set by its distance from the Sun and its speed. Mercury, the fastest, turns retrograde most often. The slow outer planets turn retrograde once a year and stay retrograde for months. The Sun and the Moon never go retrograde, since the Sun's yearly path through the zodiac comes from Earth's own orbit and the Moon circles Earth itself.",
        "The length of a retrograde also tells you how personal it feels. Retrogrades of the personal planets, from Mercury out to Mars, are short and rare enough to feel like events. Jupiter through Pluto spend so much of every year retrograde that their effect is slower and more like a background tide. Our checker lists every station for all of them so you can see both kinds at once.",
      ],
      list: {
        title: "Retrograde rhythms by planet",
        items: [
          "Mercury: 3, sometimes 4, times a year, for about 3 weeks",
          "Venus: every 18 to 19 months, for about 40 to 43 days",
          "Mars: every 25 to 26 months, for about 9 to 11 weeks",
          "Jupiter: once a year, for about 4 months",
          "Saturn: once a year, for about 4 to 5 months",
          "Uranus, Neptune and Pluto: once a year, for about 5 months",
          "Sun and Moon: never retrograde",
        ],
      },
    },
    {
      id: "mercury-retrograde-and-daily-life",
      title: "Mercury retrograde and daily life",
      paras: [
        "Mercury retrograde is the most famous retrograde by far. Mercury rules thinking, speaking, writing, short trips and devices, so its backward weeks are linked with crossed wires, delays and second thoughts. Many people treat it as a handy review period that comes around three or four times a year. It is a great time to finish drafts, fix old problems and reconnect with people from the past.",
        "A simple approach works well. Before the station, back up files and confirm big plans. During the retrograde, read messages twice, leave extra time for travel, review contracts with care and keep a backup plan ready. After the direct station, give things a few days to settle before launching something brand new, and use the post-shadow to put the lessons of the retrograde into action.",
      ],
      list: {
        title: "Practical Mercury retrograde habits",
        items: [
          "Back up your phone and computer before the station.",
          "Confirm times, addresses and bookings.",
          "Read important messages twice before sending.",
          "Give travel plans extra room.",
          "Finish old projects before starting new ones.",
          "Reach out to people you have lost touch with.",
          "Save big launches for after the post-shadow when you can.",
        ],
      },
    },
    {
      id: "retrograde-planets-in-your-birth-chart",
      title: "Retrograde planets in your birth chart",
      paras: [
        "If you add a birth chart, the checker shows which planets were retrograde when you were born. Natal retrogrades are very common. The outer planets are retrograde for months each year, so many people have at least one of them retrograde. A personal planet retrograde at birth, such as Mercury, Venus or Mars, is less common and often feels more noticeable in daily life.",
        "Astrologers read a natal retrograde as energy that turns inward. A retrograde Mercury at birth often shows a reflective thinker who processes ideas privately before sharing them. A retrograde Venus may show someone who defines love and value on their own terms. A retrograde Mars may show drive that works best with a plan and a slow build. The planet still works fully, simply in its own way.",
        "Natal retrogrades can also shift in meaning across a lifetime. When a planet that was retrograde at your birth later turns direct by secondary progression, many astrologers see a turning point in that planet's themes. You can explore progressions with our Secondary Progressions Calculator, which shows the progressed signs of your personal planets for any date you choose, from childhood to today.",
      ],
    },
    {
      id: "retrograde-transits-through-your-houses",
      title: "Retrograde transits through your houses",
      paras: [
        "With a birth chart added, the checker also shows which houses of your chart the current retrogrades pass through. Houses are the twelve areas of life in a chart, from self and money to partners and career. A retrograde planet moving through a house invites you to review the topics of that house, in the style of that planet. The review tends to feel most active near the stations.",
        "For example, Mercury retrograde through your fourth house may bring family conversations that need a second look or home repairs that take longer than planned. Venus retrograde through your seventh house can bring old loves back into view or a fresh look at what you want from a partner. Saturn retrograde through your tenth house may slow career goals so you can strengthen their foundations.",
        "Houses depend on your birth time, so add an exact time and city for this part of the checker. The more accurate your time, the more you can trust which house each retrograde falls in, especially when a planet sits near a house cusp. For a full daily view of every transit to your chart, visit the Today page or the Transits tool.",
      ],
    },
    {
      id: "retrograde-mix-ups-and-myths",
      title: "Retrograde mix ups and myths",
      paras: [
        "Retrogrades attract a lot of fear online, and much of it is overblown. A retrograde never stops a planet from working, and it is no reason to put your whole life on hold. Contracts get signed and people fall in love during retrogrades all the time. The most useful view is practical: know when one is coming, slow down where it matters and use the time to review.",
        "Another common mix up is confusing the retrograde dates with the shadow dates. The retrograde runs from the retrograde station to the direct station. The shadow adds the weeks before and after. Some people also think every body in the sky can go retrograde, including the Sun and Moon, yet those two always move forward from Earth's view. Our checker keeps these dates clear and separate.",
      ],
      list: {
        title: "Retrograde facts at a glance",
        items: [
          "Planets only appear to move backward.",
          "The Sun and Moon never go retrograde.",
          "Outer planets turn retrograde once a year.",
          "A station is when a planet seems to stand still.",
          "Shadow periods come before and after each retrograde.",
          "Outer planets shine brightest during their retrogrades.",
        ],
      },
    },
    {
      id: "what-to-explore-after-checking-retrogrades",
      title: "What to explore after checking retrogrades",
      paras: [
        "Retrogrades make the most sense alongside your own chart. Your free birth chart shows every planet's sign and house, so you can see where a retrograde planet sits in your own life. The Today page reads the current sky against your chart every day, and the Transits tool lets you check any date along with a monthly table of positions and stations.",
        "The Chart Ruler Calculator shows whether your chart ruler was retrograde at birth, a key detail for reading your chart. The Venus and Mars Sign Calculator notes a retrograde Venus or Mars at birth. During a Venus retrograde, the Compatibility page can help you look at a relationship with fresh eyes, and the zodiac sign pages describe the signs each retrograde moves through.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Free birth chart",
          "Today, your daily horoscope",
          "Transits for Any Date",
          "Chart Ruler Calculator",
          "Venus and Mars Sign Calculator",
          "Compatibility",
          "Zodiac sign pages",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What does retrograde mean in astrology?",
      a: "A planet is retrograde when it seems to move backward through the zodiac as seen from Earth. It is an optical effect of Earth's own motion. In astrology a retrograde is a time to review and revisit the themes that planet rules, such as communication for Mercury or love and money for Venus.",
    },
    {
      q: "Which planets are retrograde right now?",
      a: "The Retrograde Checker at the top of this page shows the planets retrograde right now, worked out from true positions for today. You can also pick any other date to check. Because the outer planets spend about five months of each year retrograde, at least one planet is often retrograde at any given time.",
    },
    {
      q: "How often does Mercury go retrograde?",
      a: "Mercury turns retrograde three times in most years and occasionally four, and each retrograde lasts about three weeks. Counting the shadow periods before and after, each cycle covers close to two months. Our checker lists every Mercury station for this year and next with dates and degrees.",
    },
    {
      q: "What is a planetary station?",
      a: "A station is the day a planet seems to stand still before changing direction. The retrograde station starts the backward motion and the direct station ends it. Around a station the planet moves so slowly that its position barely changes for several days, which is why astrologers often see station days as strong.",
    },
    {
      q: "What is the retrograde shadow?",
      a: "The shadow is the stretch of the zodiac a retrograde covers. The pre-shadow starts when the planet first reaches the degree where it will later turn direct. The post-shadow ends when it passes the degree where it turned retrograde. Together they frame the retrograde, and the checker shows both dates.",
    },
    {
      q: "Can the Sun or Moon go retrograde?",
      a: "No. The Sun's yearly path through the zodiac comes from Earth's own orbit, so it always moves forward. The Moon circles Earth directly, so it also always moves forward through the signs. Only the planets, from Mercury out to Pluto, show retrograde motion in the sky.",
    },
    {
      q: "What does it mean to have a retrograde planet in my birth chart?",
      a: "It means that planet seemed to move backward when you were born. Astrologers read it as energy that turns inward first, often leading to deep thought, independent methods or a slow build in that planet's area. Natal retrogrades are common, especially among the slow outer planets.",
    },
    {
      q: "Should I avoid signing contracts during Mercury retrograde?",
      a: "You can still sign them. Many people take extra care during these weeks: they read every line, confirm details and ask questions. If the date is flexible, some prefer to wait until Mercury is direct and past its post-shadow. Life keeps moving, so careful review is the practical path.",
    },
    {
      q: "Do I need my birth chart to use the Retrograde Checker?",
      a: "No birth data is needed to see current retrogrades, retrogrades on any date or the station list. Adding a birth chart is optional. It shows which planets were retrograde when you were born and which houses of your chart the current retrogrades pass through. Houses need a birth time.",
    },
  ],
};
