import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "friendship-compatibility",
  title: "Friendship Compatibility Calculator: Compare Two Birth Charts",
  description: "Free friendship compatibility from two birth charts. See scores for fun, trust, talk, support and growth, plus every contact between you and your friend.",
  h1: "Friendship compatibility",
  lead: "Compare your birth chart with a friend's to see where your friendship flows and where it grows. Every contact between your charts comes with a reading written for friends.",
  sections: [
    {
      id: "what-is-friendship-compatibility",
      title: "What friendship compatibility means",
      paras: [
        "Friendship compatibility looks at how two birth charts get along as friends. Love astrology tends to focus on attraction and romance. Friendship has needs of its own: shared laughs, honest talks, someone to call on a hard day, and a person who helps you become a better version of yourself. Our tool reads your two charts with those needs in mind, and every reading on the page is written for friends.",
        "Astrology has always looked at relationships of every kind. A friend's planets meet yours in the same way a partner's do, through angles between points in your two charts. Those angles show where you two think alike and where you push each other to grow. Seeing them clearly can explain why some friends feel easy from day one, while others become close slowly over many years.",
        "You can use friendship compatibility with a best friend, a new friend, a roommate or a sibling you count as a friend. It works for any two people at any age, and you can run it for a whole group one pair at a time. The results are a guide for understanding. They work best when you read them together and talk about what fits your real friendship.",
      ],
    },
    {
      id: "how-we-calculate-friendship-compatibility",
      title: "How we calculate friendship compatibility",
      paras: [
        "You enter a birth date, a time and a city for you and for your friend. We turn each local time into Universal Time with the city's time zone history, then find the true positions of the Sun, the Moon and the eight planets from Mercury to Pluto with the astronomy-engine library. These are the same steps behind our full birth chart, so each chart is as accurate as the birth details you give.",
        "Next, the tool compares every planet in your chart with every planet in your friend's chart. This method is called synastry. It looks for the main aspects. In a conjunction two points blend. Sextiles and trines bring ease, while squares and oppositions bring tension and drive. We use orbs a little tighter than in a single chart, so the contacts on your list are the ones that truly stand out.",
        "Each contact gets a weight. The Sun, Moon, Venus and Mars weigh the most, and a close aspect weighs more than a wide one. Each of the five friendship themes draws on the planet pairs that fit it best. Easy contacts and most conjunctions lift a theme, and tense contacts lower it a little. The total moves each theme up or down from a neutral 50, giving a score from 8 to 97.",
      ],
      list: {
        title: "What your friendship compatibility result shows",
        items: [
          "Both birth charts, side by side",
          "A score from 8 to 97 for each of the five themes",
          "Fun, trust, talk, support and growth, each with a reading",
          "Every planet contact between your two charts",
          "The strongest contacts listed first",
          "A friendship reading for every contact",
        ],
      },
    },
    {
      id: "how-to-read-friendship-compatibility",
      title: "How to read your friendship compatibility scores",
      paras: [
        "Read each score as a weather report for one part of your friendship. A score near 50 means the contacts for that theme are few, or that the easy ones and the tense ones balance out. Scores well above 50 point to strong, easy links. Scores below 50 point to contacts that bring friction, which often means the theme asks for more care and gives more growth in return.",
        "The scores are a guide built from weighted contacts. They make no promise about how a friendship will go, since real friendships depend on choices, kindness and time. Two friends with modest scores can share a bond that lasts fifty years. Use the numbers to start a conversation. Ask each other which themes feel true, and which ones surprise you.",
        "After the scores, scroll through the full list of contacts. Each one names a planet from your chart, a planet from your friend's chart, and the aspect between them. The readings explain what that link tends to feel like between friends. Start with the first few, since the list puts the strongest contacts at the top, then read on as far as you like.",
      ],
    },
    {
      id: "friendship-compatibility-fun-and-talk",
      title: "Friendship compatibility themes: fun and talk",
      paras: [
        "The fun score looks at how easily you two enjoy life together. It leans most on Jupiter, the planet of luck and good cheer, meeting the other person's Sun, Moon, Venus, Mars or Mercury. Venus links, such as Venus to Venus or the Sun to Venus, add a shared sense of taste, from the cafes you pick to the music you play on a long drive. A playful Venus to Uranus link adds surprise.",
        "A high fun score often shows up as a friend who makes ordinary errands feel like an outing. A lower fun score can simply mean your fun takes planning. You may enjoy different things, so trading turns works well. One week you pick the plan, and the next week your friend does. Many close friends discover new hobbies this way.",
        "The talk score follows Mercury, the planet of words and ideas. Mercury to Mercury carries the most weight, followed by Mercury meeting the Sun, Moon, Venus, Jupiter, Uranus or Mars. Easy Mercury contacts suggest friends who can talk for hours and finish each other's stories. Tense Mercury contacts suggest friends who debate, tease and sharpen each other's thinking. Both kinds of talk can be a joy when you keep it kind.",
      ],
    },
    {
      id: "friendship-compatibility-trust-support-growth",
      title: "Friendship compatibility themes: trust, support and growth",
      paras: [
        "The trust score rests on the Moon. Moon to Moon carries the most weight, then the Sun to Moon and the Moon to Venus. Saturn contacts with the Sun, Moon, Venus or Mercury also count here, since Saturn is the planet of loyalty over time. An easy Saturn link often feels like a friend who shows up every single time. A tense one can feel strict at first and grow into deep respect.",
        "The support score asks how well you care for each other on hard days. The Sun to Moon link leads, followed by the Moon meeting Venus or Jupiter. Jupiter links with the Sun or Mars add the friend who cheers loudest when you try something new. A high support score suggests you two know how to comfort each other. A lower one suggests you comfort people in different ways, and it helps to ask what works.",
        "The growth score shows how much you change each other for the better. It draws on the Sun meeting Jupiter, Uranus, Saturn or Pluto, along with Jupiter links and a few others. These contacts belong to the friend who talks you into the class, the trip or the career move. Tense growth contacts can be the most useful of all, since a little pressure from someone who loves you can open a door.",
      ],
      list: {
        title: "The five friendship themes",
        items: [
          "Fun: how easily you enjoy life together",
          "Trust: how safe and loyal the friendship feels",
          "Talk: how you share ideas, stories and plans",
          "Support: how you care for each other on hard days",
          "Growth: how you help each other change and stretch",
        ],
      },
    },
    {
      id: "friendship-compatibility-key-contacts",
      title: "Key contacts in friendship compatibility",
      paras: [
        "Your full list may hold dozens of contacts, and a handful usually stand out. Contacts between the personal planets, the Sun, Moon, Mercury, Venus and Mars, describe how the friendship feels from day to day. Contacts with Jupiter and Saturn describe the bigger shape of the bond: how much you lift each other up and how well the friendship holds over the years.",
        "Contacts with Uranus, Neptune and Pluto deserve a gentle note. These planets move so slowly that friends born within a few years of each other often share the same Uranus, Neptune or Pluto sign. A conjunction between two outer planets may tie you to a whole generation of people your age. These links still matter, and they weigh the most when they touch a personal planet, such as your friend's Pluto on your Sun.",
      ],
      list: {
        title: "Contacts to look for first",
        items: [
          "Sun and Moon: you feel at home with each other",
          "Moon and Moon: your moods and comforts line up",
          "Mercury and Mercury: you think and talk in step",
          "Venus and Venus: you share taste and style",
          "Sun or Venus with Jupiter: you bring out the joy in each other",
          "Sun or Moon with Saturn: loyalty that builds over the years",
          "Mars and Jupiter: you push each other toward big plans",
          "Sun with Uranus: you wake each other up to new ideas",
        ],
      },
    },
    {
      id: "using-friendship-compatibility",
      title: "Using friendship compatibility in real life",
      paras: [
        "The best use of friendship compatibility is to turn insight into small habits. If your talk score is high and your support score is lower, you may be great at long chats and less sure how to help in a crisis. Try asking directly: do you want advice, a distraction or just company? If your fun score is high and trust is lower, make room for honest one on one time between the big nights out.",
        "You can also use the results to plan time together. Friends with strong Jupiter links often love trips and big outings. Friends with strong Saturn links often enjoy routines, such as a standing Sunday walk or a monthly dinner. Friends with strong Mercury links may be happiest on a long phone call or in a busy bookshop. Matching the plan to the chart makes each meeting feel easier.",
        "For new friendships, the tool can show you where you already click and where patience will help. For old friendships, it often explains a pattern you have seen for years, such as one of you always planning and the other always saying yes. Naming these patterns with warmth can bring you even closer, and it often turns an old tease into a shared joke you both enjoy.",
      ],
      list: {
        title: "Friendship tips by strongest theme",
        items: [
          "Strong fun: plan new things to try together",
          "Strong trust: share the news you tell few people",
          "Strong talk: start a shared reading list or podcast habit",
          "Strong support: check in during each other's busy weeks",
          "Strong growth: set a goal and cheer each other on",
          "Lower scores: ask what helps, then give it",
        ],
      },
    },
    {
      id: "friendship-compatibility-mix-ups",
      title: "Friendship compatibility mix ups",
      paras: [
        "A common mix up is reading friendship compatibility like a love match. The two use the same chart engine, yet they weigh contacts in different ways. A strong Venus to Mars link counts toward attraction in a love reading, while friendship cares more about Jupiter, Mercury and the Moon. That is why the same two people can see different scores on our love Compatibility page and on this one.",
        "Another mix up is treating a low score as a warning. A score below 50 simply means that theme carries more friction than ease in your charts. Friction can be a gift between friends. It brings honest feedback, fresh ideas and the kind of debate that keeps a friendship lively. Read the tense contacts for their growth side, and use the tips to smooth the rough edges.",
        "People also forget that order matters in the contact list. Your Moon on your friend's Sun describes how your friend's presence feels to you, which can differ from the reverse. And Sun sign compatibility alone is only one small part of the picture. Two friends whose Sun signs seem far apart can share warm Moon and Mercury links that the Sun signs alone would never show.",
      ],
    },
    {
      id: "friendship-compatibility-birth-times",
      title: "Birth time accuracy in friendship compatibility",
      paras: [
        "Most planets move slowly enough that a birth date alone places them well. The Moon is the exception. It moves about 13 degrees a day, so its exact place depends on the time of birth. When a birth time is missing, the chart is set for noon, and the Moon can be off by up to about 7 degrees. Moon contacts near the edge of their orbs may come or go once you add the real time.",
        "Since the Moon feeds the trust and support themes, those two scores are the ones most likely to shift with a time. The fun, talk and growth scores lean less on the Moon and usually hold steady. Mercury moves faster than most planets too, though far slower than the Moon, so its contacts are rarely affected. If you can find either birth time, add it for the clearest result.",
      ],
      list: {
        title: "Getting the best result",
        items: [
          "Use the time on the birth certificate when you have it",
          "Ask your friend's family about the hour of birth",
          "Pick the city of birth, even if the family lived elsewhere",
          "Compare results with and without a time to see what changes",
        ],
      },
    },
    {
      id: "what-to-explore-after-friendship-compatibility",
      title: "What to explore after friendship compatibility",
      paras: [
        "Friendship compatibility is one way to look at two charts. The Big Three Compatibility tool gives a quick view of your Sun, Moon and rising signs side by side, which is a fun way to start with a new friend. The Synastry Chart draws both charts on one double wheel and shows where your friend's planets land in your houses, which adds detail to every contact on this page.",
        "If you are curious about Sun signs, the sign pair pages read every pair in depth, such as Gemini and Aquarius compatibility or Taurus and Scorpio compatibility. The zodiac sign pages describe each sign on its own, which helps you understand your friend's style. For coworkers, the Work Compatibility tool uses the same engine with themes for decisions, drive and money.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Big Three Compatibility",
          "Synastry Chart with house overlays",
          "Work Compatibility",
          "Full love compatibility for two charts",
          "Sign pair compatibility pages",
          "Zodiac sign pages",
          "All free tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "How does friendship compatibility work in astrology?",
      a: "Friendship compatibility compares every planet in your chart with every planet in your friend's chart and looks for the main aspects between them. Each contact is weighted by the planets involved and how close the aspect is. The contacts then feed five themes, fun, trust, talk, support and growth, each scored from 8 to 97.",
    },
    {
      q: "What does a friendship compatibility score of 50 mean?",
      a: "Fifty is neutral. It means that theme has few strong contacts, or that its easy and tense contacts balance out. Scores above 50 point to ease and natural flow, and scores below 50 point to friction that can bring growth. Every score is a guide built from weighted contacts, and real friendships grow through care and time.",
    },
    {
      q: "Is friendship compatibility different from love compatibility?",
      a: "Yes. Both use the same chart comparison, and friendship weighs the contacts that matter between friends. Jupiter, Mercury and the Moon carry more weight for friends, while Venus and Mars carry more weight for attraction in love. The readings are different too, since each one is written for friends.",
    },
    {
      q: "Which planets matter most for friendship?",
      a: "The Moon matters a great deal for trust and support, Mercury for talk, and Jupiter for fun and growth. The Sun ties into almost every theme. Saturn adds loyalty over time. Contacts between your personal planets and your friend's personal planets usually carry the most weight on your list.",
    },
    {
      q: "Can we be good friends with low scores?",
      a: "Absolutely. Low scores describe friction in the charts, and friction often brings honesty, fresh ideas and growth. Many lifelong friends have tense contacts that taught them how to listen and how to give each other space. Read the readings for practical tips, and focus on the themes where you already shine together.",
    },
    {
      q: "Do I need my friend's birth time?",
      a: "A birth time helps, mostly for the Moon. Without one, the chart is set for noon, and the Moon can be off by up to about 7 degrees. That can change Moon contacts, which feed the trust and support scores. The other themes usually hold steady, so the tool still gives a useful result without times.",
    },
    {
      q: "Why do some contacts appear for both of us?",
      a: "When two people share similar planet positions, the same aspect can appear in both directions, such as your Venus on their Sun and their Venus on your Sun. Each one is a separate contact with its own reading. Seeing both often points to a strong two way link in that part of the friendship.",
    },
    {
      q: "What are generational contacts?",
      a: "Uranus, Neptune and Pluto move very slowly, so friends born close in age often share the same signs for these planets. Contacts between them may tie you to a whole generation of people your age. They matter most when they touch a personal planet, such as Neptune on your friend's Moon.",
    },
    {
      q: "Can I compare a whole group of friends?",
      a: "The tool compares two charts at a time, so you can run it for each pair in your group. Many friend groups find that each pair has its own strongest theme. One pair may be the planners, another the talkers, and another the ones who lift the mood. Together they make a well balanced circle.",
    },
  ],
};
