import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "moon-sign",
  title: "Moon Sign Calculator: Find Your Moon Sign and What It Means",
  description: "Find your Moon sign and degree from your birth date, with the Moon phase at birth, what your Moon needs, how it loves, and where the Moon is today.",
  h1: "Your Moon sign",
  lead: "Your Moon sign describes your feelings, your comfort and what helps you feel at home. Enter your birth date to find it, and add a time and city for the exact degree.",
  sections: [
    {
      id: "what-a-moon-sign-means",
      title: "What a Moon sign means",
      paras: [
        "Your Moon sign is the zodiac sign the Moon was passing through at the moment you were born. In astrology the Moon stands for your inner world: feelings, instincts, memories and the habits that make you feel safe. If the Sun is the self you are building over a lifetime, the Moon is the self you already are at home on a slow evening, the one who knows which blanket is the comfy one and which song helps after a bad day.",
        "The Moon is also linked with childhood, home and the people who cared for you early on. Your Moon sign often describes the kind of care you received or wished for, and the kind of care you now give. It shows how you react before you think, which is why the Moon is so useful for understanding moods. A fire Moon may react with a burst of energy, while an earth Moon may go still and look for something practical to do.",
        "Because the Moon moves so quickly, your Moon sign is one of the most personal parts of your chart. Thousands of people share your Sun sign this month, yet your Moon sign narrows the group sharply. Many people read their Moon sign for the first time and feel truly seen, since it puts words to needs they have felt for years without naming them.",
      ],
    },
    {
      id: "how-we-calculate-your-moon-sign",
      title: "How we calculate your Moon sign",
      paras: [
        "The Moon Sign Calculator needs your birth date, and a birth time and city make it exact. We convert your local birth time to Universal Time using your city's own time zone history, which handles daylight saving and old clock rules. Then we compute the true position of the Moon for that moment with the astronomy-engine library, the same engine behind our full birth chart. The result is your Moon sign along with its degree inside that sign, from 0 to 29.",
        "The degree matters because the Moon moves fast. It covers about 13 degrees a day, so it spends only about two and a half days in each sign and laps the whole zodiac in about 27.3 days. A Moon at 2 degrees of a sign entered it recently, while a Moon at 28 degrees is about to leave. If you were born with the Moon near either edge, a correct time is what keeps your result accurate.",
        "When you leave the time out, we check the whole birth day. If the Moon stayed in one sign from start to finish, your Moon sign is certain anyway. If it changed signs during the day, the calculator shows both possible signs and the time of the change, so you can compare it with anything you know about your birth. The page also shows the Moon's sign today, which helps you notice how the current Moon feels against your own.",
      ],
    },
    {
      id: "how-to-read-your-moon-sign",
      title: "How to read your Moon sign result",
      paras: [
        "Your result is laid out in parts, each answering one simple question about your emotional life. Start with the sign and degree, then read the Moon phase at birth. After that come four short readings: what your Moon needs, what comforts it, how it reacts under stress and how it loves. Read them slowly and test each one against real memories, such as the last time you felt truly relaxed or truly upset.",
        "Pay the most attention to the needs reading. Needs are the heart of the Moon. When they are met, you feel steady and generous, and when they go unmet for a long time, you may feel irritable or empty without knowing why. Many people find that naming a Moon need, such as space, touch, order or adventure, helps them ask for it clearly instead of hoping others will guess.",
      ],
      list: {
        title: "What your Moon sign result shows",
        items: [
          "Your Moon sign and its exact degree",
          "The Moon phase at your birth",
          "What your Moon needs to feel well",
          "What comforts your Moon on a hard day",
          "How your Moon reacts under stress",
          "How your Moon gives and receives love",
          "Both possible signs and the change time, when the day is split",
          "The Moon's sign today",
        ],
      },
    },
    {
      id: "moon-phase-and-your-moon-sign",
      title: "The Moon phase at birth and your Moon sign",
      paras: [
        "The Moon phase at your birth comes from the angle between the Sun and the Moon. At a New Moon the two sit together and the Moon looks dark from Earth. As the Moon pulls ahead, a thin crescent appears, then a half Moon, then a bright, growing Moon, until the Full Moon sits opposite the Sun and shines all night. After that the light shrinks back toward the next New Moon. One full cycle takes about 29.5 days.",
        "Astrologers read the birth phase as the rhythm of your energy. People born in the waxing half, from New to Full, often feel driven to build and grow, like the light itself. People born in the waning half, from Full back to New, often feel drawn to share, sort and pass on what they know. A New Moon birth suggests a fresh, instinctive start, while a Full Moon birth often brings a strong awareness of other people and of balance.",
        "The phase also shows how your Sun and Moon get along. Near the New Moon they share a sign or sit close together, so your will and your feelings pull the same way. Near the Full Moon they face each other from opposite signs, which can feel like a lively conversation inside you. Neither is better. Your phase simply describes the kind of inner teamwork your Sun sign and Moon sign tend to have.",
      ],
    },
    {
      id: "moon-sign-by-sign",
      title: "Moon sign by sign: all twelve signs",
      paras: [
        "Each Moon sign has its own emotional language. The short notes below describe what each Moon tends to need, in our own words. Read the one for your Moon first, then read the Moon signs of the people you live or work with. You may find that many small daily frictions come from two Moons speaking different emotional languages, and that a little translation goes a long way.",
        "Remember that the Moon sign is one part of a bigger picture. The house your Moon sits in shows where in life these needs play out, such as home, work or friendship, and aspects from other planets can soften or sharpen them. Your free birth chart shows all of that. For now, the sign alone is a strong and useful starting point for understanding yourself.",
      ],
      list: {
        title: "The twelve Moon signs",
        items: [
          "Aries Moon: feelings arrive fast and leave fast. Needs action and honesty, then moves on without a grudge.",
          "Taurus Moon: steady and loyal. Needs calm, good food, soft fabrics and a routine that stays the same from week to week.",
          "Gemini Moon: feels by talking. Needs conversation and a friend who will listen while it thinks out loud.",
          "Cancer Moon: deeply caring and protective. Needs a safe home base and people who feel like family.",
          "Leo Moon: warm and generous. Needs to feel special, with sincere praise and plenty of affection given in return.",
          "Virgo Moon: calms down by fixing things. Needs order and the chance to help someone in a practical way.",
          "Libra Moon: seeks harmony. Needs kind words, a pleasant space and a partner who talks problems through fairly.",
          "Scorpio Moon: private and intense. Needs deep trust and time alone to process strong feelings.",
          "Sagittarius Moon: lifted by freedom. Needs open plans and a big idea to look forward to.",
          "Capricorn Moon: steady under pressure. Needs goals, structure and respect for the effort it puts in.",
          "Aquarius Moon: feels best with some distance. Needs friendship and space to be a little different.",
          "Pisces Moon: soft and intuitive. Needs rest, music or water, and time to recover from other people's moods.",
        ],
      },
    },
    {
      id: "moon-sign-in-love",
      title: "Moon sign in love and family",
      paras: [
        "In love, the Moon describes what makes you feel cared for. Your Venus sign shows what attracts you, while your Moon shows what keeps you comfortable once the first spark settles. A partner who meets your Moon needs makes ordinary days feel easy. A partner who misses them may still be lovely, yet you may feel a low hum of unease that is hard to explain. Learning each other's Moon signs gives you words for that feeling.",
        "Moon contacts between two charts are among the warmest links in compatibility. When one person's Moon sits in the same sign as the other's Sun, or both Moons share an element, daily life together tends to flow. When the two Moons are very different, the couple may need to plan around it: one partner might want to talk right away after a fight, while the other needs a few hours alone first. Both styles work well once they are named.",
        "The Moon also plays a big role in family life. Parents and children with similar Moon signs often understand each other without words, and those with very different Moons may need to learn each other's comfort habits on purpose. If you are a parent, your child's Moon sign can be a gentle guide to soothing them, from the food they like to the kind of bedtime that helps them settle.",
      ],
    },
    {
      id: "moon-sign-under-stress",
      title: "Your Moon sign under stress and in self-care",
      paras: [
        "Stress is when the Moon shows itself most clearly. Under pressure, people slip into their Moon sign's oldest habits. An earth Moon may tidy, plan or eat something familiar. A water Moon may withdraw and feel everything at once. An air Moon may talk nonstop or retreat into ideas, and a fire Moon may get busy, loud or restless. Knowing your pattern lets you catch it early and choose a kinder response.",
        "Self-care works best when it suits your Moon. A Gemini Moon may feel better after a long chat than after a silent bath, and a Cancer Moon may prefer cooking at home to a night out. There is no single right way to rest. The stress reading in your result shows how your Moon reacts, and the comfort reading suggests what tends to bring it back to calm.",
      ],
      list: {
        title: "Moon care by element",
        items: [
          "Fire Moons: move your body, then talk it out once the heat has passed.",
          "Earth Moons: return to simple routines and time outdoors.",
          "Air Moons: write it down or call a friend who listens well.",
          "Water Moons: protect your alone time and stay near people who feel safe.",
        ],
      },
    },
    {
      id: "moon-sign-mix-ups-and-the-moon-today",
      title: "Moon sign mix ups and the Moon today",
      paras: [
        "The most common Moon sign mistake is using a birthday alone when the Moon changed signs that day. Lists that give one Moon sign per date can be wrong for anyone born on the other side of the change. Another mix up is confusing your natal Moon sign with the Moon's sign today. Your natal Moon is fixed at birth, while the Moon in the sky changes sign every two or three days for everyone.",
        "People also mix up the Moon sign with the Moon phase. The sign tells you which slice of the zodiac the Moon was in, while the phase tells you how lit the Moon looked from Earth. A Full Moon can happen in any sign, and so can a New Moon. Your result shows both, since they describe different things. The phase is about rhythm, and the sign is about emotional style.",
        "Our page also shows where the Moon is today. When the Moon passes through your own Moon sign, about once a month, many people feel more like themselves and more in touch with their needs. When it passes through the opposite sign, feelings may run higher. Tracking this for a few months is a simple way to see the Moon's rhythm in your own life. For a full daily reading, visit the Today page.",
      ],
    },
    {
      id: "find-your-moon-sign-without-a-birth-time",
      title: "How to find your Moon sign without a birth time",
      paras: [
        "You can find your Moon sign without a birth time on most days. Enter only your birth date, and the calculator checks where the Moon was from the start of the day to its end. If it stayed in one sign the whole time, you have your answer. If it crossed into a new sign, you will see both signs and the time the Moon changed over, which turns a vague question into a simple one about your birth hour.",
        "When your day is split, use what you know. If you were born in the morning and the change happened in the evening, the earlier sign is very likely yours. A family story about being born before breakfast or just after midnight can be enough. If you have no clue at all, read both Moon readings and notice which one describes your private reactions, especially under stress. Most people recognize their Moon quickly.",
      ],
      list: {
        title: "Where to look for your birth time",
        items: [
          "Your birth certificate or long form record",
          "Hospital or clinic records",
          "A baby book or birth announcement",
          "Parents, grandparents or older siblings",
          "Old letters or photos with dates and notes",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-moon-sign",
      title: "What to explore after your Moon sign",
      paras: [
        "Your Moon sign is the emotional center of your chart, and it links to everything else. The Big Three Calculator puts it next to your Sun and rising signs so you can see how your feelings blend with your purpose and your style. The free birth chart shows the house your Moon sits in and the aspects it makes, which add detail to every reading on this page.",
        "If love is on your mind, the Venus and Mars Sign Calculator adds attraction and drive to what your Moon says about comfort, and the Compatibility page compares your Moon with a partner's. The Lunar Return Calculator follows the Moon back to its birth degree each month, with a reading for the month ahead. The zodiac sign page for your Moon sign is also a rich next read.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Big Three Calculator",
          "Free birth chart with houses and aspects",
          "Lunar Return Calculator for each month ahead",
          "Venus and Mars Sign Calculator",
          "Compatibility for two charts",
          "Today, your daily horoscope with the Moon of the day",
          "Zodiac sign pages",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What does my Moon sign say about me?",
      a: "Your Moon sign describes your emotional nature: what you need to feel safe, what comforts you, how you react before you think and how you show care. It often feels more private than your Sun sign, since it speaks to your inner life at home and with the people closest to you. Many people find it explains moods their Sun sign leaves out.",
    },
    {
      q: "Can I find my Moon sign without my birth time?",
      a: "Usually, yes. Enter your birth date and the calculator checks the whole day. If the Moon stayed in one sign, your Moon sign is certain. If it changed signs that day, you will see both options and the time of the change, so any clue about your birth hour can settle it.",
    },
    {
      q: "How often does the Moon change signs?",
      a: "The Moon changes sign about every two and a half days. It moves about 13 degrees a day and travels the full zodiac in about 27.3 days. That speed is why your Moon sign can differ from a friend born on the same date, and why the Moon in the sky today will be in a new sign within a few days.",
    },
    {
      q: "What is the difference between my Moon sign and my Sun sign?",
      a: "Your Sun sign shows your core purpose and the person you are growing into. Your Moon sign shows your feelings, habits and needs. The Sun is like your daytime self at work and out in the world, and the Moon is like your evening self at home. Both are you, and reading them together gives a fuller picture.",
    },
    {
      q: "What does my Moon degree mean?",
      a: "The degree shows how far the Moon had traveled into its sign, from 0 to 29. A low degree means it had just entered the sign, and a high degree means it was close to the next one. The degree matters most when your time is uncertain, since a Moon near the edge of a sign can flip with a small change in time.",
    },
    {
      q: "What does the Moon phase at my birth mean?",
      a: "The phase comes from the angle between the Sun and Moon when you were born. Births in the growing half of the cycle often carry a building, forward energy, and births in the shrinking half often carry a sharing, reflective energy. The phase adds rhythm to your Moon sign reading and shows how your Sun and Moon tend to work as a team.",
    },
    {
      q: "Which Moon signs are most compatible?",
      a: "Moons in the same element often feel easy together, such as two water Moons or two air Moons. Fire and air Moons support each other, and so do earth and water Moons. Very different Moons can still love each other deeply. They simply need to learn each other's comfort habits, and the Compatibility page can show the full picture.",
    },
    {
      q: "Is the Moon sign today the same for everyone?",
      a: "Yes. The Moon's sign today is the sign the Moon is passing through in the sky right now, and it is the same for everyone on Earth at any given moment. Your natal Moon sign is your own and fixed at birth. Comparing the two helps you notice how the current Moon affects your mood from day to day.",
    },
    {
      q: "Does my Moon sign change as I get older?",
      a: "Your birth Moon sign stays the same for life. As you grow, though, you may learn to meet its needs better and express it in healthier ways. Astrologers also follow the progressed Moon, which moves into a new sign about every two and a half years and describes changing emotional seasons over a lifetime.",
    },
  ],
};
