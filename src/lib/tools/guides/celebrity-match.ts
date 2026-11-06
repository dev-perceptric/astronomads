import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "celebrity-match",
  title: "Celebrity Match: Which Famous Person Is Your Best Match?",
  description: "Compare your birth chart with nearly 4,000 famous people. See your top celebrity matches, filter by field, and meet chart twins who share your Sun and Moon.",
  h1: "Your celebrity match",
  lead: "Compare your chart with nearly 4,000 famous people born since 1700 and see whose planets meet yours most warmly. Filter by field and meet your chart twins.",
  sections: [
    {
      id: "what-is-the-celebrity-match",
      title: "What the celebrity match does",
      paras: [
        "The celebrity match compares your birth chart with the charts of 3,936 famous people and shows the ones whose planets meet yours most warmly. It uses the same love compatibility engine as our Compatibility page, so each match rests on real contacts between two charts. You might find that your Venus sits right on a famous singer's Sun, or that your Moon and a great inventor's Moon share a sign.",
        "Think of it as a playful way into synastry, the art of comparing two charts. Famous people are a fun mirror because you already know a little about them. When your chart lines up with someone you admire, the contacts between you give you a story to explore. You may also spot names you have never heard of, and those can be the best surprises of all.",
        "The celebrity match is made for fun and curiosity. It makes no claim that you would get along with any of these people in real life. Each famous chart uses noon on the birth day, since most birth times are unknown, and the houses are left out. The sections below explain exactly what that means for your results, so you can enjoy them with clear eyes.",
      ],
    },
    {
      id: "how-we-calculate-your-celebrity-match",
      title: "How we calculate your celebrity match",
      paras: [
        "First we build your chart from your birth date, time and city. We turn your local time into Universal Time using your city's own time zone history, then compute true planet positions with the astronomy-engine library, the same engine behind our free birth chart. Next we build a chart for each famous person at noon on their birth day, from the Sun out to Pluto.",
        "Then we run the love compatibility engine between your chart and each famous chart, using planets only. The engine looks at every pair of planets across the two charts and finds conjunctions, sextiles, squares, trines and oppositions. Each contact adds weight to the match. Close contacts between the Sun, Moon, Venus and Mars count the most, since they touch daily life and attraction most directly.",
        "Finally we sort every famous person by their match with you and show the top of the list. A filter lets you narrow the list to one field, such as Music or Science. Separately, we look for your chart twins: famous people who share both your Sun sign and your Moon sign. All of this runs in a moment, so you can try a friend's birth details right after your own.",
      ],
      list: {
        title: "Steps behind your celebrity match",
        items: [
          "Your full chart from your birth date, time and city",
          "A noon chart for each of 3,936 famous people",
          "Every planet contact between your chart and theirs",
          "A match from the love compatibility engine, planets only",
          "Your top matches, with a filter by field",
          "Your chart twins with the same Sun and Moon signs",
        ],
      },
    },
    {
      id: "celebrity-match-noon-charts",
      title: "Why celebrity match charts use noon",
      paras: [
        "Most famous people have no published birth time, and the times that do exist often come from sources we have no license to use. So every famous chart in the celebrity match is cast for noon on the birth day. Noon sits in the middle of the day, which keeps the error as small as it can be when the real time is unknown. For slow planets this works very well.",
        "The Moon is the planet most affected. It moves about 13 degrees a day, so a noon chart can place a famous Moon up to about 7 degrees away from its true spot. Sometimes that moves the Moon into the next sign. The Sun moves only about a degree a day, so it stays very close, though a person born on the day the Sun changed signs may show either sign.",
        "Without a birth time there are also no houses and no Ascendant, so we leave them out. Your matches rest on planets alone. That makes every result a sketch, honest about what it knows. If a famous Moon contact matters to you, keep in mind that it could be a few degrees off, and treat the Sun to Pluto contacts as the firmer part of the match.",
      ],
      list: {
        title: "What noon charts mean for your results",
        items: [
          "The famous Sun is within about half a degree",
          "The famous Moon can be off by up to about 7 degrees",
          "A famous Moon near a sign edge may sit in the next sign",
          "Houses and the Ascendant are left out",
          "Mercury to Pluto stay close to their true degrees",
        ],
      },
    },
    {
      id: "how-to-read-your-celebrity-match",
      title: "How to read your celebrity match results",
      paras: [
        "Your results start with your top matches, the famous people whose planets meet yours most warmly. Each one shows their name and field, along with the key contacts between your charts. Read the contacts first. A match built on your Moon and their Venus feels different from one built on your Mars and their Sun, even if the two sit side by side in the list.",
        "Use the field filter to see your best match in each area of fame. Your top actor and your top scientist may tell you very different things about yourself. Then scroll to your chart twins. These famous people share your Sun and Moon signs, so they share the same basic mix of purpose and feeling. They can feel like long lost cousins in the sky.",
        "When a match surprises you, ask what the two of you have in common. Look up their story and notice the parts that echo your own life. The contacts between your charts point to the themes, while their life shows one way those themes can play out. That is where the celebrity match becomes more than a list and turns into a good conversation.",
      ],
    },
    {
      id: "celebrity-match-by-field",
      title: "Celebrity match by field of fame",
      paras: [
        "Every famous person in the celebrity match belongs to one field, and you can filter your results by any of them. The fields follow the work each person is best known for. Filtering is a fun way to see a side of your chart. Someone with a strong match in Science may enjoy careful thinking, while a strong match in Music may hint at a love of rhythm and feeling. These are playful hints and nothing more.",
        "To keep the celebrity match light and kind, some groups are left out on purpose. Politicians, soldiers, royalty and religious figures are skipped, and so is anyone filed under crime or extremism. The idea is that every match should be someone you can enjoy reading about. The eight fields that remain still cover a wide range of human talent from 1700 to today.",
      ],
      list: {
        title: "The fields in the celebrity match",
        items: [
          "Film and TV: actors, directors and screen makers",
          "Music: singers, composers and players",
          "Sports: athletes from many games",
          "Writers: novelists, poets and thinkers on the page",
          "Science: researchers and discoverers",
          "Builders: inventors, engineers, business people, architects, explorers, astronauts and chefs",
          "Art and fashion: painters, designers and makers",
          "Activists: people who worked for causes and rights",
        ],
      },
    },
    {
      id: "celebrity-match-chart-twins",
      title: "Chart twins in the celebrity match",
      paras: [
        "A chart twin is a famous person who shares both your Sun sign and your Moon sign. The Sun shows your core purpose and the Moon shows your emotional needs, so sharing both means sharing the same basic recipe. You and a chart twin may still look very different on the outside, since the rest of the chart adds its own flavor, yet the base notes match.",
        "There are 144 Sun and Moon pairs, so most people find a good group of chart twins in the list. Because famous Moons use noon, a twin whose Moon sits near the edge of a sign may be a near twin. Read their story as a mirror. Notice how they used the same Sun and Moon mix in their work, and how their path might suggest one of your own.",
      ],
    },
    {
      id: "celebrity-match-uses",
      title: "Fun and practical uses for the celebrity match",
      paras: [
        "The simplest use is pure fun. Share your top match with friends and compare lists. A group can learn a lot of astrology this way, since each person brings a different chart and a different set of famous names. You may also find a role model. A writer or inventor who matches you strongly can be a good person to read about when you feel stuck.",
        "The celebrity match is also a gentle way to learn synastry. Open the contacts for a top match and read what each one means. Then open the Synastry Chart with a real partner or friend and look for the same kinds of links. Practice with famous charts builds your eye, so the real comparisons that matter to you feel easier to read.",
      ],
      list: {
        title: "Ways to enjoy your celebrity match",
        items: [
          "Compare top matches with friends",
          "Find your best match in each field",
          "Read the life story of a chart twin",
          "Use famous contacts to learn synastry",
          "Try the birth details of a partner or friend",
        ],
      },
    },
    {
      id: "celebrity-match-mix-ups",
      title: "Common celebrity match mix ups",
      paras: [
        "The biggest mix up is reading a top match as a promise. The celebrity match compares charts for fun and learning, and it says nothing about how you would get along with that person in real life. Another mix up is expecting houses or rising signs. Famous charts use noon, so the houses and Ascendant are left out and the match rests on planets alone.",
        "People also forget the effect of age. Uranus, Neptune and Pluto move very slowly, so famous people born close to your own year share many of your slow planet contacts. Those links belong to a whole generation. If many of your matches were born near your birth year, that is part of the reason. Read the personal planet contacts for the more personal story.",
        "A last mix up is assuming every famous Moon is exact. Noon charts can move the Moon by up to about 7 degrees, so a Moon contact in your results may be a little off. The list stays useful, since most of each match comes from planets that move slowly enough to be close at noon. If a Moon link feels central to a match, hold that one link a little more loosely than the rest of the list.",
      ],
    },
    {
      id: "celebrity-match-birth-time",
      title: "Your birth time and the celebrity match",
      paras: [
        "Your own birth time helps the celebrity match in one main way: it sets your Moon exactly. The Moon moves about 13 degrees a day, so a missing time can move your Moon by up to about 7 degrees. That can change which Moon contacts appear and, near a sign edge, even your Moon sign, which changes your chart twins. A birth certificate or hospital record is the best source.",
        "Your Sun, Mercury, Venus and Mars move slowly enough that a missing time makes little difference to them. Since the match uses planets only, your houses and Ascendant play no part in the scoring. If you have no time at all, try noon and read the results with the same kind eye you use for the famous charts. You are on an even footing with them then.",
      ],
    },
    {
      id: "what-to-explore-after-your-celebrity-match",
      title: "What to explore after your celebrity match",
      paras: [
        "The celebrity match is a starting point. The Compatibility page at /compatibility compares your chart with a real partner, friend or family member, with five theme scores and every contact explained. The Synastry Chart draws both charts as a double wheel with house overlays, which the celebrity match leaves out. Both tools give a fuller answer when you know both birth times.",
        "The sign pair pages read two Sun signs in depth, such as Leo and Aquarius at /compatibility/leo-and-aquarius, which is a nice way to compare your sign with a top match's sign. The zodiac sign pages at /zodiac explain your Sun and Moon signs in detail. Every free calculator lives at /tools. Our famous people come from the Pantheon 2025 list, shared under the CC BY-SA 4.0 license.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Compatibility for two full charts at /compatibility",
          "Synastry Chart with house overlays",
          "Sign pair pages such as /compatibility/leo-and-aquarius",
          "Zodiac sign pages at /zodiac",
          "Every free calculator at /tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "How does the celebrity match work?",
      a: "We build your chart and a noon chart for each of 3,936 famous people, then compare them with our love compatibility engine using planets only. Every contact between your planets and theirs adds to the match. You see your top matches, a filter by field, and your chart twins who share your Sun and Moon signs.",
    },
    {
      q: "Where do the famous people come from?",
      a: "They come from the Pantheon 2025 list, a public dataset of famous people shared under the CC BY-SA 4.0 license. We use people born in 1700 or later with a full birth date. Politicians, soldiers, royalty, religious figures and anyone filed under crime or extremism are left out on purpose, so matches stay fun.",
    },
    {
      q: "Why do the famous charts use noon?",
      a: "Most famous people have no published birth time. Noon sits in the middle of the day, which keeps the error as small as possible. The Sun and slower planets stay close to their true places. The Moon can be off by up to about 7 degrees, and houses and the Ascendant are left out.",
    },
    {
      q: "What is a chart twin?",
      a: "A chart twin is a famous person who shares both your Sun sign and your Moon sign. You share the same basic mix of purpose and feeling, even if the rest of your charts differ. Since famous Moons use noon, a twin with a Moon near a sign edge may be a near twin.",
    },
    {
      q: "Does a high celebrity match mean we would get along?",
      a: "The celebrity match is for fun and learning. It shows how your planets meet theirs, and it makes no claim about real life. A strong match points to themes you share, which can make their story fun to read. For a real relationship, use the Compatibility page with full birth details for both people.",
    },
    {
      q: "Why are so many of my matches close to my age?",
      a: "Uranus, Neptune and Pluto move very slowly, so people born within a few years of you share many slow planet contacts with you. Those contacts belong to a whole generation and can lift the match for people near your age. Read the Sun, Moon, Venus and Mars contacts for the more personal story.",
    },
    {
      q: "Which fields can I filter by?",
      a: "You can filter by Film and TV, Music, Sports, Writers, Science, Builders, Art and fashion, and Activists. Builders covers inventors, engineers, business people, architects, explorers, astronauts and chefs. Each famous person belongs to the field they are best known for, and your top match in each field can tell a different story.",
    },
    {
      q: "Do I need my birth time for the celebrity match?",
      a: "It helps. Your birth time sets your Moon exactly, which shapes your Moon contacts and your chart twins. Your other planets move slowly enough that a missing time changes little. The match uses planets only, so your houses and Ascendant play no part in the scoring either way.",
    },
    {
      q: "Why is a famous person I expected missing?",
      a: "The list covers people born in 1700 or later with a full birth date in the Pantheon 2025 data. Some famous names have no full date, and some fall in groups we leave out on purpose, such as politicians and royalty. The rest of the list still offers thousands of matches across eight fields.",
    },
  ],
};
