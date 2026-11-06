import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "parent-child",
  title: "Parent and Child Compatibility: Compare Your Birth Charts",
  description: "Free parent and child compatibility from two birth charts. Scores for warmth, understanding, structure, freedom and growth, plus your child's Moon and Sun.",
  h1: "Parent and child compatibility",
  lead: "Compare your birth chart with your child's to see how you connect, where you differ and what helps your child feel safe. Every reading is written for family life.",
  sections: [
    {
      id: "what-is-parent-and-child-compatibility",
      title: "What parent and child compatibility means",
      paras: [
        "Parent and child compatibility compares a parent's birth chart with a child's to show how the two of you connect. Every child arrives with a nature of their own. Some children are bold from the first day, while others are watchful and seem to feel everything in the room. Astrology offers a gentle language for those differences, so you can meet your child where they are.",
        "The bond between a parent and a child is unlike any other. It holds deep love along with daily tasks, such as bedtimes, homework, meals and big talks in the car. Our tool reads both charts with family life in mind. It looks at how warmth flows between you, how well you understand each other, how you handle rules and freedom, and how you help each other grow.",
        "This tool works for any family bond across generations. Parents use it with babies and teenagers, and adult children use it to understand a mother or father later in life. Step parents, grandparents, foster parents and guardians can use it as well. The readings are written with care for both people, since each one brings gifts to the relationship and each one has something to learn from the other.",
      ],
    },
    {
      id: "how-we-calculate-parent-and-child-compatibility",
      title: "How we calculate parent and child compatibility",
      paras: [
        "You enter a birth date, a time and a city for the parent and for the child. We turn each local time into Universal Time with the city's time zone history, then find the true positions of the Sun, the Moon and the eight planets from Mercury to Pluto with the astronomy-engine library. These are the same steps behind our full birth chart, so both charts are as accurate as the details you give.",
        "Next, the tool compares every planet in the parent's chart with every planet in the child's chart, a method called synastry. It looks for conjunctions, where two points blend, sextiles and trines, which bring ease, and squares and oppositions, which bring tension and growth. Orbs are a little tighter than in a single chart. Each contact is weighted by the planets involved and how close the aspect is.",
        "The five family themes each draw on the planet pairs that fit them best. The weighted contacts move each theme up or down from a neutral 50, to a score from 8 to 97. In the structure theme, a Saturn conjunction counts as steady and supportive. Last, the tool reads your child's Moon sign, for what your child needs and what comforts them, and your child's Sun sign, for the person they are growing into.",
      ],
      list: {
        title: "What your parent and child compatibility result shows",
        items: [
          "Both birth charts, side by side",
          "Scores from 8 to 97 for warmth, understanding, structure, freedom and growth",
          "A reading for each family theme",
          "Your child's Moon sign: what they need and what comforts them",
          "Your child's Sun sign and what it says about their nature",
          "Every planet contact between your charts, strongest first",
          "A family reading for every contact",
        ],
      },
    },
    {
      id: "how-to-read-parent-and-child-compatibility",
      title: "How to read your parent and child compatibility result",
      paras: [
        "Start with your child's Moon and Sun readings. They describe your child as a person in their own right, before any comparison with you. Many parents find the Moon reading most useful at first, since it speaks to comfort, sleep, food and the things that help on a hard day. Read it slowly and test it against what you already see at home.",
        "Then look at the five theme scores. A score near 50 means that theme has few strong contacts, or a balance of easy and tense ones. Scores well above 50 suggest that part of family life flows naturally. Scores below 50 suggest you two approach that theme from different angles, which simply means it deserves a little extra thought. Every score is a guide built from weighted contacts.",
        "After the scores comes the full list of contacts, with the strongest first. Each one names a planet in the parent's chart, a planet in the child's chart and the aspect between them. The readings explain how that link tends to show up between a parent and a child. Read the top few closely, since they usually describe the heart of your bond.",
      ],
    },
    {
      id: "parent-and-child-compatibility-themes",
      title: "The five parent and child compatibility themes",
      paras: [
        "Warmth rests on the Sun to Moon link, with Moon to Moon and Moon to Venus close behind. Sun to Venus, Moon to Jupiter and Venus to Venus add to it. A high warmth score suggests affection that flows with little effort, such as a child who settles fast in your arms. Understanding draws on Mercury meeting the other person's Moon, Mercury or Sun, along with Moon to Moon and Sun to Sun. It shows how easily you read each other's words and moods.",
        "Structure rests on Saturn, the planet of rules and routines. Moon to Saturn carries the most weight, then Sun to Saturn, with Saturn meeting Mercury, Mars, Venus or Saturn adding more. Easy links here point to routines that feel natural to both of you. Tense links point to a child who tests the rules, or a parent who feels the weight of them, and both can learn to meet in the middle.",
        "Freedom looks at Uranus and Jupiter meeting the Sun, Moon, Mars and Mercury. A high freedom score suggests a parent who gives room to explore and a child who uses it well. Growth draws on Jupiter meeting the Sun, Moon or Mercury, plus the Sun to Pluto and Jupiter to Saturn. It shows how you each help the other become more fully yourselves, which in a family runs in both directions.",
      ],
      list: {
        title: "The five family themes",
        items: [
          "Warmth: how affection and comfort flow between you",
          "Understanding: how easily you read each other's words and moods",
          "Structure: how routines, rules and limits feel to both of you",
          "Freedom: how much room your child has to explore",
          "Growth: how you help each other become more yourselves",
        ],
      },
    },
    {
      id: "child-moon-sign-in-parent-and-child-compatibility",
      title: "Your child's Moon sign in parent and child compatibility",
      paras: [
        "Your child's Moon sign may be the most practical part of the whole result. The Moon describes emotional needs and the kind of comfort that works. A baby with a Taurus Moon may calm down with a warm bath and a familiar blanket, while a baby with a Gemini Moon may settle when you talk or sing. Knowing the Moon sign can save a lot of guesswork on long nights.",
        "As children grow, the Moon shows how they process big feelings. Some need to move their bodies, some need to talk, some need a quiet corner and some need a hug that lasts a long time. Your own Moon sign may comfort people in a different way, and that is normal. The tool shows both Moons, so you can see where your comfort styles match and where you may need to adjust.",
      ],
      list: {
        title: "What each Moon sign child tends to need",
        items: [
          "Aries Moon: room to burn off energy, then a fast, honest hug",
          "Taurus Moon: the same bedtime, favorite foods and soft things to hold",
          "Gemini Moon: someone to chat with and a story at the end of the day",
          "Cancer Moon: closeness, family time and a home that feels safe",
          "Leo Moon: praise for real effort and plenty of shared play",
          "Virgo Moon: a clear plan for the day and small jobs to help with",
          "Libra Moon: calm voices, fair rules and a pleasant room",
          "Scorpio Moon: privacy, trust and time to open up at their own pace",
          "Sagittarius Moon: outdoor time, new places and answers to big questions",
          "Capricorn Moon: steady routines and respect for their growing skills",
          "Aquarius Moon: room to be different and friends who share their interests",
          "Pisces Moon: gentle music, quiet rest and time to daydream",
        ],
      },
    },
    {
      id: "child-sun-sign-in-parent-and-child-compatibility",
      title: "Your child's Sun sign in parent and child compatibility",
      paras: [
        "Your child's Sun sign describes the person they are growing into. Where the Moon is about comfort, the Sun is about purpose, confidence and the things that make your child light up. A young Leo may love the stage, a young Capricorn may love building something step by step, a young Pisces may love stories and make believe, and a young Gemini may ask a hundred questions before lunch. These are seeds, and they bloom over many years.",
        "The Sun sign also hints at how your child likes to be encouraged. Fire Sun children often respond to a challenge. Earth Sun children often respond to clear goals and real results. Air Sun children often respond to ideas and conversation, and water Sun children often respond to feeling understood. Matching your words of support to your child's Sun can make your encouragement land more deeply.",
        "When your Sun signs differ, you may each shine in different ways. A parent with an earth Sun and a child with an air Sun may see the world differently, one focused on what is practical and one on what is possible. Both views are valuable, and children often grow most when a parent celebrates the gifts that differ from their own.",
      ],
      list: {
        title: "Encouraging your child by Sun element",
        items: [
          "Fire Sun child: offer a challenge and cheer the courage it takes",
          "Earth Sun child: set a clear goal and praise steady effort",
          "Air Sun child: ask what they think and listen to the answer",
          "Water Sun child: name their feelings and show you understand",
        ],
      },
    },
    {
      id: "using-parent-and-child-compatibility",
      title: "Using parent and child compatibility at home",
      paras: [
        "The best way to use parent and child compatibility is in small, daily ways. If your understanding score is lower, try speaking in your child's style. A child with strong Mercury links to your Saturn may need fewer words and clearer steps. A child whose Moon meets your Mercury with ease may love long talks at bedtime. Little shifts like these often ease many daily frictions.",
        "If structure is a lower theme, keep rules few and clear, and explain the reason behind each one. If freedom is lower, look for safe ways to give your child more choice, such as picking between two outfits or two weekend plans. If warmth is high, celebrate it with rituals you both love. Each theme points to something simple you can try this week.",
        "For adult children, the result can explain patterns from childhood with fresh kindness. A tense Moon to Saturn contact, for example, may describe a parent who showed love through rules and a child who wanted more softness. Seeing the pattern in the charts often makes it easier to talk about, and to forgive, on both sides. Many adult children share the result with a parent as a gentle way to start that talk.",
      ],
      list: {
        title: "Family tips by theme",
        items: [
          "Warmth: build a small daily ritual, such as a bedtime song",
          "Understanding: ask how your child would explain the problem",
          "Structure: keep a few clear rules and explain each one",
          "Freedom: offer choices inside safe limits",
          "Growth: learn something new together",
          "Any theme: notice and name what your child does well",
        ],
      },
    },
    {
      id: "parent-and-child-compatibility-mix-ups",
      title: "Parent and child compatibility mix ups",
      paras: [
        "One mix up is treating the result as a verdict on the relationship. A lower score simply points to a theme where you and your child see things from different sides. Many loving families have tense contacts that teach both people patience, humor and new ways to care. The readings always show the growth side of each contact, along with simple tips.",
        "Another mix up involves the slow planets. A parent and child are usually born decades apart, so their Uranus, Neptune and Pluto often sit in different signs, and contacts among them describe the gap between two generations. Saturn has its own pattern. A parent born about 29 years before the child often has Saturn near the child's Saturn, while a parent about 14 or 15 years older may have it opposite. These links reflect the age gap as much as the people.",
        "People also forget that a chart describes potential. Your child will grow, make choices and surprise you, and so will you. Sun sign compatibility alone is also a small slice of the picture, since the Moon, Mercury and Saturn often say more about daily family life. Read the full result and revisit it as your child grows, since different contacts stand out at different ages.",
      ],
    },
    {
      id: "parent-and-child-compatibility-birth-times",
      title: "Birth time accuracy in parent and child compatibility",
      paras: [
        "Birth times matter most for the Moon, which moves about 13 degrees a day. Without a time, the chart is set for noon, and the Moon can be off by up to about 7 degrees. On a day when the Moon changed signs, your child's Moon sign could even be the one before or after. Most hospitals record the exact time of birth, so many parents can find it on a birth record.",
        "The Moon touches every family theme, most of all warmth and understanding, and it also shapes your child's Moon reading. A correct time helps most there. Contacts among the slower planets, such as Saturn, Jupiter and Uranus, usually hold steady with or without a time. If you are unsure about your own birth time, you can still run the tool and read the child's side first.",
      ],
      list: {
        title: "Where to find a child's birth time",
        items: [
          "The hospital or birth center record",
          "The birth certificate or long form record",
          "A baby book, photo or birth announcement",
          "Notes from the midwife or doctor",
          "Your own memory, checked with a partner or relative",
        ],
      },
    },
    {
      id: "what-to-explore-after-parent-and-child-compatibility",
      title: "What to explore after parent and child compatibility",
      paras: [
        "Parent and child compatibility is a warm place to start, and there is more to learn about your child's chart. The free birth chart shows every planet by sign and house, with readings for each one. The Moon Sign Calculator explains your child's Moon in more depth, including the Moon phase at birth. The Big Three Calculator adds the rising sign to the Sun and Moon.",
        "For sibling bonds, the Friendship Compatibility tool works well, since brothers and sisters often relate like close friends. The zodiac sign pages describe each Sun sign in depth, and the sign pair pages, such as Cancer and Leo compatibility or Aries and Capricorn compatibility, read two Sun signs together. Each one adds another layer to your understanding of family life.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Free birth chart for your child",
          "Moon Sign Calculator",
          "Big Three Calculator",
          "Friendship Compatibility for siblings",
          "Sign pair compatibility pages",
          "Zodiac sign pages",
          "All free tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is parent and child compatibility in astrology?",
      a: "Parent and child compatibility compares a parent's birth chart with a child's. It looks at every contact between their planets and scores five family themes: warmth, understanding, structure, freedom and growth. It also reads the child's Moon sign, for comfort and needs, and the child's Sun sign, for the person they are becoming.",
    },
    {
      q: "Why does my child's Moon sign matter so much?",
      a: "The Moon describes emotional needs and what brings comfort. For a child, that covers sleep, food, soothing and how they handle big feelings. Knowing your child's Moon sign can help you choose the kind of comfort that works best for them, which may differ from what works for you.",
    },
    {
      q: "What if my child and I have low scores?",
      a: "A lower score shows a theme where you and your child see things from different sides. That is common and healthy in families. Tense contacts often teach patience and new ways to love. The readings and tips on the page show simple steps you can take to bring more ease to each theme.",
    },
    {
      q: "Can I use this tool with an adult child or my own parent?",
      a: "Yes. The tool works for any parent and child at any age. Adult children often use it to understand a parent's style, and it can bring new kindness to old patterns. Step parents, grandparents and guardians can use it too, since the readings fit any caring family bond.",
    },
    {
      q: "Do I need exact birth times?",
      a: "A birth time helps most for the Moon. Without one, the chart is set for noon, and the Moon can be off by up to about 7 degrees, which may even change the Moon sign on some days. Hospitals usually record the time, so check your child's birth record if you can.",
    },
    {
      q: "Why do my child and I share a Saturn sign?",
      a: "Saturn takes about 29.5 years to circle the zodiac. If you were born about 29 years before your child, Saturn may sit in the same sign in both charts. That link often brings a shared seriousness about goals and duty, and it partly reflects your age gap as well as your personal bond.",
    },
    {
      q: "Does parent and child compatibility change as my child grows?",
      a: "The birth charts stay the same, yet different contacts tend to stand out at different ages. Warmth and Moon contacts often matter most in the early years. Structure and freedom often take center stage in the teen years. Growth contacts may feel strongest once your child is an adult.",
    },
    {
      q: "Can I compare my two children with each other?",
      a: "This tool is made for a parent and a child. For two siblings, the Friendship Compatibility tool works well, since brothers and sisters often relate like close friends. It scores fun, trust, talk, support and growth, which suit sibling life nicely. You can also run this tool once for each child to see your bond with each one.",
    },
    {
      q: "Is it okay if my child's chart is very different from mine?",
      a: "Yes, and it is very common. Children often bring qualities a parent has less of, such as more fire, more patience or more curiosity. A different chart gives your family a wider range of gifts. Learning your child's style helps you support it, and your child learns from yours in return.",
    },
  ],
};
