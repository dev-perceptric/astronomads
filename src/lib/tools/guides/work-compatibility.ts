import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "work-compatibility",
  title: "Work Compatibility Calculator: Coworkers and Business Partners",
  description: "Free work compatibility from two birth charts. Scores for decisions, communication, reliability, drive and money, with every contact read for work.",
  h1: "Work compatibility",
  lead: "Compare your birth chart with a coworker's or business partner's and see how you two decide, talk and build together. Every contact between your charts is read for work.",
  sections: [
    {
      id: "what-is-work-compatibility",
      title: "What work compatibility means",
      paras: [
        "Work compatibility looks at how two people fit as a team. A good working bond needs different things from a friendship or a romance. You need to make decisions together, explain ideas clearly, keep promises, share energy for the hard parts and handle money with care. Our tool reads two birth charts with those needs in mind and writes every reading for the workplace.",
        "Astrology sees every relationship as a meeting of two charts. Your coworker's planets form angles with yours, and those angles describe where you two work in step and where you see a task from different sides. Both are useful. A team with only easy links may agree too fast, while a team with some friction often catches mistakes early and comes up with bolder ideas.",
        "Work compatibility suits many pairs: cofounders, a manager and a team member, two people sharing a project, a freelancer and a client, or family members who run a business together. It is a tool for understanding each other. Use it to talk about working styles, and keep real decisions about hiring or roles grounded in skills, results and fair process.",
      ],
    },
    {
      id: "how-we-calculate-work-compatibility",
      title: "How we calculate work compatibility",
      paras: [
        "Each of you enters a birth date, a time and a city. We turn each local time into Universal Time with the city's time zone history, so daylight saving and old clock changes are handled. Then we find the true positions of the Sun, the Moon and the eight planets from Mercury to Pluto with the astronomy-engine library. Each chart is built the same way as our full birth chart.",
        "Next, the tool compares every planet in your chart with every planet in the other chart, a method called synastry. It looks for conjunctions, where two points blend, and for sextiles and trines, which bring ease. It also looks for squares and oppositions, which bring tension and push. Orbs are a little tighter than in a single chart, so each contact on the list is a clear one.",
        "Every contact gets a weight from the planets involved and how close the aspect is. The Sun, Moon, Venus and Mars weigh the most. Each work theme draws on its own set of planet pairs, and the weighted contacts move each theme up or down from a neutral 50, to a score between 8 and 97. In the drive theme, tense contacts add a little push, since pressure can fuel hard work.",
      ],
      list: {
        title: "What your work compatibility result shows",
        items: [
          "Both birth charts, side by side",
          "Scores from 8 to 97 for decisions and communication",
          "Scores for reliability, drive and money",
          "A reading for each of the five themes",
          "Every planet contact between your charts, strongest first",
          "A work reading for every contact",
        ],
      },
    },
    {
      id: "how-to-read-work-compatibility",
      title: "How to read your work compatibility scores",
      paras: [
        "Think of each score as a picture of one part of your working life together. A score near 50 means that theme has few strong contacts, or that the easy and tense ones balance out. A score well above 50 points to natural flow, where you may barely need to discuss how to work. A score below 50 points to friction, which is often where the most useful habits and rules get built.",
        "The scores are a guide made from weighted contacts. They describe tendencies, and real teams grow through skill, trust and shared wins. A pair with a lower communication score can become excellent at it by agreeing on clear ways to share updates. A pair with a high drive score may need to watch for burnout. Every number points to something you can act on.",
        "After the scores comes the list of contacts, with the strongest at the top. Each one names a planet from each chart and the aspect between them, followed by a reading for work. The first five to ten contacts usually describe the heart of the working bond. Read them together, and mark the ones that match what you already see in your meetings, emails and projects.",
      ],
    },
    {
      id: "work-compatibility-decisions-and-communication",
      title: "Work compatibility themes: decisions and communication",
      paras: [
        "The decisions score looks at how you two make choices together. It draws on Sun to Sun and Sun to Mars, which show how your wills meet, and on Saturn meeting the Sun or Mars, which shows how plans get tested. Mars to Mars, Mercury to Mars and Sun to Jupiter add speed and confidence. Easy contacts here suggest quick agreement, and tense ones suggest strong opinions that need a clear process.",
        "If your decisions score is lower, decide in advance who has the final word on which kinds of choices. One person can own the budget and the other the schedule, for example. Clear lanes turn a clash of wills into a clean split of roles, and many strong teams work exactly this way. A short written plan after each big meeting also helps.",
        "The communication score follows Mercury. Mercury to Mercury carries the most weight, then Mercury meeting the Sun, Saturn, Jupiter, Mars, Moon or Venus. Easy Mercury links point to coworkers who explain things in a way the other person grasps right away. Tense Mercury links point to different styles, such as one person who thinks out loud and one who prefers to write. Naming the style is half the fix.",
      ],
    },
    {
      id: "work-compatibility-reliability-drive-money",
      title: "Work compatibility themes: reliability, drive and money",
      paras: [
        "The reliability score rests on Saturn, the planet of duty and time. Sun to Saturn carries the most weight, followed by Saturn meeting the Moon, Mercury, Mars, Jupiter, Venus or Saturn itself. Here a Saturn conjunction counts as steady and helpful. A high reliability score suggests two people who trust each other's promises. A lower one suggests you will benefit from shared deadlines and simple check ins.",
        "The drive score asks how you two fuel each other's effort. It looks at Sun to Mars, Mars to Mars and Mars to Jupiter, plus Mars or the Sun meeting Pluto and Mars meeting Uranus. Tense contacts still add a little energy here, since a healthy push can spark hard work. A strong drive score suits launches and big deadlines. Plan rest too, so the pace stays healthy.",
        "The money score looks at how you handle resources together. It draws on Venus meeting Jupiter or Saturn, Jupiter to Saturn, Venus to Venus and a few others. Jupiter tends to spend and grow, and Saturn tends to save and plan. A pair with both kinds of links often makes a balanced team, as long as you agree on a budget early.",
      ],
      list: {
        title: "The five work themes",
        items: [
          "Decisions: how you make choices and settle disagreements",
          "Communication: how you share ideas, updates and feedback",
          "Reliability: how well you keep promises and deadlines",
          "Drive: how you fuel each other's energy and effort",
          "Money: how you plan, spend and save together",
        ],
      },
    },
    {
      id: "work-compatibility-key-contacts",
      title: "Key contacts in work compatibility",
      paras: [
        "Your contact list may be long, so start with the links that matter most for work. Contacts with Mercury describe daily communication. Contacts with Saturn describe structure and follow through. Contacts with Mars describe effort and pace, and contacts with Jupiter describe vision and opportunity. When one of these planets touches the other person's Sun, the effect is usually strong and easy to spot.",
        "Contacts between Uranus, Neptune and Pluto in both charts are often shared by people born a few years apart, since those planets move so slowly. Two coworkers of similar age may share the same outer planet signs, which ties them to a whole generation. These links matter most when they touch a personal planet, such as one person's Uranus on the other's Mercury, which often sparks fresh ideas.",
      ],
      list: {
        title: "Work contacts to look for first",
        items: [
          "Mercury and Mercury: you think and explain in step",
          "Sun and Saturn: one sets the goal, one builds the plan",
          "Mars and Mars: matched pace and energy",
          "Sun and Mars: one leads, one acts",
          "Mars and Jupiter: big plans with the push to reach them",
          "Venus and Saturn: careful, lasting choices about money",
          "Venus and Jupiter: generous ideas for growth",
          "Mercury and Uranus: fresh ideas and quick solutions",
        ],
      },
    },
    {
      id: "using-work-compatibility",
      title: "Using work compatibility on a team",
      paras: [
        "The most helpful way to use work compatibility is to talk about it openly. Share the results with your coworker and pick one theme to work on together. If communication is your lowest score, try a short daily summary or a weekly call with a set agenda. If reliability is low, write down who owns each task and when it is due. Small, steady habits make a big difference.",
        "Business partners can use the results to divide roles. The person whose Saturn is most active in the contacts may enjoy planning and checking details. The person whose Jupiter or Mars is most active may enjoy sales, pitching and new projects. A manager can use the readings to understand how a team member likes to receive feedback, from short and direct to warm and detailed.",
        "Keep the results in their place. Astrology can open a kind conversation about working styles, and it works best that way. Hiring, pay and promotion should always rest on skills, results and fair process. Used with care, work compatibility can help two people understand each other faster and enjoy their shared work more. It also gives new teams a light, friendly topic for their first planning session.",
      ],
      list: {
        title: "Team tips by lowest theme",
        items: [
          "Decisions: agree who owns which kind of choice",
          "Communication: set one channel and one time for updates",
          "Reliability: write tasks down with owners and dates",
          "Drive: plan sprints with real breaks between them",
          "Money: agree on a budget before you start spending",
          "Any theme: review what works once a month",
        ],
      },
    },
    {
      id: "work-compatibility-mix-ups",
      title: "Work compatibility mix ups",
      paras: [
        "One mix up is reading work compatibility like a love match. The same two charts give different scores in each mode because the themes draw on different planet pairs. Venus to Mars matters a lot for attraction, while work leans on Mercury, Saturn and Mars. So two coworkers with a modest love reading may have a strong work reading, and the other way around.",
        "Another mix up is seeing a low score as a reason to avoid working together. Friction often makes a team better. Two people with tense Mercury links tend to question each other's ideas, which can lead to stronger plans. Two people with tense Saturn links may push each other to meet higher standards. The readings show the growth side of every tense contact.",
        "Last, people sometimes read only the Sun signs. Sun sign compatibility is one small part of the picture. Two coworkers with Suns in a square can still share strong Mercury and Saturn links that make them a fine team. The full contact list on this page gives a much clearer view than the Sun signs alone, since it covers every planet you each bring to the job.",
      ],
    },
    {
      id: "work-compatibility-birth-times",
      title: "Birth time accuracy in work compatibility",
      paras: [
        "Most of the planets used in work compatibility move slowly enough that a birth date places them well. The Moon moves fastest, about 13 degrees a day. Without a birth time, the chart is set for noon, and the Moon can be off by up to about 7 degrees. That may add or remove a Moon contact, which most often touches the reliability and communication themes.",
        "The themes that lean on Mercury, Venus, Mars, Jupiter and Saturn usually hold steady with or without a time. So you can run the tool with a coworker even when neither of you knows your birth hour. If one of you does know it, add it. Exact times give the clearest result, and you can compare the two versions to see what changes.",
      ],
      list: {
        title: "Getting the best result",
        items: [
          "Use the time on a birth certificate when you have it",
          "Choose the actual city of birth for each person",
          "Leave the time empty if you only have a guess",
          "Focus on Mercury, Saturn and Mars contacts when times are unknown",
        ],
      },
    },
    {
      id: "what-to-explore-after-work-compatibility",
      title: "What to explore after work compatibility",
      paras: [
        "Work compatibility is one of several ways to compare two charts on Astronomads. The Big Three Compatibility tool shows how your Sun, Moon and rising signs meet, which is a quick way to learn a new coworker's style. The Friendship Compatibility tool uses the same engine with themes for fun, trust and support, which suits colleagues who have also become friends.",
        "For a deeper look at your own working style, the free birth chart shows where your Mercury, Mars and Saturn sit by sign and house. The zodiac sign pages describe each Sun sign at work and in daily life. The sign pair pages, such as Virgo and Capricorn compatibility or Aries and Libra compatibility, read two Sun signs together in depth.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Big Three Compatibility",
          "Friendship Compatibility",
          "Free birth chart with houses and aspects",
          "Full compatibility for two charts",
          "Sign pair compatibility pages",
          "Zodiac sign pages",
          "All free tools",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is work compatibility in astrology?",
      a: "Work compatibility compares two birth charts to see how two people fit as a team. It looks at every contact between their planets and scores five work themes: decisions, communication, reliability, drive and money. Each contact also comes with a reading written for the workplace, so you can see how you two decide, talk and build together.",
    },
    {
      q: "Which planets matter most for work compatibility?",
      a: "Mercury shapes communication, Saturn shapes reliability, and Mars shapes drive. Jupiter adds vision and growth, and Venus links with Jupiter and Saturn shape money choices. The Sun ties into decisions and drive, since it shows each person's will and goals. Contacts that touch these planets usually carry the most weight.",
    },
    {
      q: "Can I use work compatibility to hire someone?",
      a: "We suggest you keep hiring, pay and promotion grounded in skills, results and fair process. Work compatibility is best as a friendly tool for understanding how two people like to work. Many teams share their results to start honest conversations about communication and deadlines, which can make a good team even better.",
    },
    {
      q: "What does a low work compatibility score mean?",
      a: "A low score means that theme carries more tense contacts than easy ones. Tension at work often brings useful debate, high standards and fresh ideas. It also means the theme benefits from clear habits, such as shared deadlines or a set time for updates. Read the tips under each theme to turn friction into strength.",
    },
    {
      q: "Is work compatibility good for business partners?",
      a: "Yes. Cofounders and business partners often find the money, decisions and reliability themes especially useful. The results can help you split roles, such as one person planning and one person selling, and agree on how to make big choices. Many partners revisit their results whenever their roles change or the business grows.",
    },
    {
      q: "Why are my work scores different from my love scores with the same person?",
      a: "Each mode draws on different planet pairs. Love compatibility gives Venus and Mars a big role in attraction, while work compatibility leans on Mercury, Saturn, Mars and Jupiter. The same contacts are read in a new way for each kind of bond, so the scores and readings change from one mode to the other.",
    },
    {
      q: "Do we need birth times for work compatibility?",
      a: "Birth times help, mostly for the Moon. Without a time, the chart is set for noon and the Moon can be off by up to about 7 degrees. The themes that rest on Mercury, Venus, Mars, Jupiter and Saturn usually hold steady, so the tool still gives a useful result with dates alone.",
    },
    {
      q: "How does the drive theme treat tense contacts?",
      a: "In the drive theme, tense contacts give the score a small lift. A square between two people's Mars, for example, can feel like friendly pressure that pushes both of you to work harder. That push is useful for launches and deadlines, as long as you plan rest along the way.",
    },
    {
      q: "Can I compare myself with my manager?",
      a: "Yes. Many people use work compatibility to understand a manager's style, such as how they give feedback or make decisions. You can learn a lot from the communication and reliability themes. Share what you find in a light, curious way, and use it to ask how your manager prefers to receive updates.",
    },
  ],
};
