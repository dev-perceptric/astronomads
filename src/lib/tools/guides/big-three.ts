import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "big-three",
  title: "Big Three Calculator: Find Your Sun, Moon and Rising Signs",
  description: "Enter your birth date, time and city to find your Sun, Moon and Rising signs in seconds, with a free reading for each and a share card you can download.",
  h1: "Your Big Three",
  lead: "Your Sun, Moon and Rising signs are the three pillars of your birth chart. Enter your birth details to find all of them, with a reading for each one.",
  sections: [
    {
      id: "what-the-big-three-means",
      title: "What the Big Three means in astrology",
      paras: [
        "Your Big Three are the placements most astrologers look at first: the Sun sign, the Moon sign and the rising sign. Together they give a fast and surprisingly rich sketch of a person. The Sun describes your core purpose and the kind of life that makes you feel most like yourself. The Moon describes your emotional needs, your moods and what you reach for when you feel tired or upset. The rising sign, also called the Ascendant, describes how you meet the world and how the world tends to meet you.",
        "Most people know only their Sun sign, because it is the one tied to your birthday and printed in every horoscope column. That single sign leaves a lot out. Two people born on the same day can feel very different, and the Moon and rising sign often explain why. A Leo with a Cancer Moon and Virgo rising carries the same bright heart as any Leo, yet shows it through care for others and a tidy, helpful manner. The Big Three gives you that fuller picture in one glance.",
      ],
    },
    {
      id: "how-we-calculate-your-big-three",
      title: "How we calculate your Big Three",
      paras: [
        "Our Big Three Calculator starts with your birth date, time and city. We find the city's time zone and convert your local birth time to Universal Time with the full history of that zone, so past daylight saving rules and old offsets come out right. That step matters more than most people expect, because one wrong hour can move your rising sign by a whole sign.",
        "Next we work out where the Sun and Moon truly were at that moment using the astronomy-engine library, which computes real positions of date. Your Sun sign comes from the Sun's place along the zodiac, and your Moon sign comes from the Moon's place. The Sun moves about one degree a day, so its sign rarely depends on the hour. The Moon moves about 13 degrees a day and changes sign about every two and a half days, so its sign can hinge on the exact time.",
        "Your rising sign is the zodiac sign coming up over the eastern horizon at your birth place at your birth time. To find it we use the city's latitude and longitude along with the exact moment of birth. The rising sign moves fast, about one sign every two hours on average, so it is the part of the Big Three that needs the most accurate time. Your result then shows a reading for each sign, a line on how your Sun and Moon elements blend, and a share card image you can download.",
      ],
    },
    {
      id: "how-to-read-your-big-three",
      title: "How to read your Big Three result",
      paras: [
        "Start with the Sun. Read it as the story of what you are here to grow into, the qualities that light you up when life is going well. Then read the Moon as the story of what you need to feel okay. Many people find the Moon reading feels the most personal of all, because it speaks to private moods that a Sun sign horoscope tends to miss. Last, read the rising sign as your style and your first step into any new room or new chapter.",
        "After that, look at how the signs relate. When they share an element, such as a Sun, Moon and rising all in water signs, the personality feels strong and consistent, almost like one note played loudly. When they sit in different elements, you may feel like a blend of several people, and others may see different sides of you depending on the setting. Both patterns are normal. The goal is to see how the pieces work together in your daily life, so you can lean on each one at the right moment.",
      ],
    },
    {
      id: "the-twelve-signs-in-your-big-three",
      title: "The twelve signs in your Big Three",
      paras: [
        "Each sign takes on a slightly different job depending on where it sits in your Big Three. As a Sun sign it shapes your purpose. As a Moon sign it shapes your feelings and your comfort. As a rising sign it shapes your manner, your first moves and, to some degree, your look. The short guide below gives each sign in all of these roles, in our own words, so you can read your own mix and the mix of the people you love.",
        "Read the item for each of your signs, then notice the words that repeat. If your Sun item and your Moon item both talk about care, that theme is likely central for you. If they pull in opposite ways, such as freedom in one and security in the other, you have found one of the main balancing acts of your life. Neither result is better. Each one simply points to where your energy flows easily and where it takes a little effort.",
      ],
      list: {
        title: "Each sign as Sun, Moon and rising",
        items: [
          "Aries: as a Sun, a drive to start and lead. As a Moon, quick feelings that flare and clear fast. Rising, a direct, sporty manner and a habit of walking in first.",
          "Taurus: as a Sun, a steady builder who values comfort and loyalty. As a Moon, a need for calm and familiar routines. Rising, a relaxed, grounded presence that puts people at ease.",
          "Gemini: as a Sun, a curious mind that wants to learn and share. As a Moon, feelings worked out by talking them through. Rising, a quick smile and plenty of questions.",
          "Cancer: as a Sun, a protector who builds a home wherever it goes. As a Moon, deep feelings and a strong need to belong. Rising, a gentle, watchful first impression that warms up over time.",
          "Leo: as a Sun, a warm heart that wants to create and be seen. As a Moon, a need for loyal affection and real praise. Rising, a bright, confident entrance and a memorable look.",
          "Virgo: as a Sun, a helper who improves whatever it touches. As a Moon, comfort found in order and small daily rituals. Rising, a neat, thoughtful manner and a sharp eye for detail.",
          "Libra: as a Sun, a seeker of fairness and good partnership. As a Moon, a need for peace and kind words at home. Rising, a graceful, polite style and an easy charm.",
          "Scorpio: as a Sun, intense focus and a wish for deep bonds. As a Moon, private feelings held with great loyalty. Rising, a steady gaze and a strong, magnetic presence.",
          "Sagittarius: as a Sun, an explorer chasing meaning and freedom. As a Moon, moods lifted by travel, humor, open space and big plans. Rising, a friendly, open manner and an easy laugh.",
          "Capricorn: as a Sun, a patient climber with long goals. As a Moon, feelings kept steady through structure and duty. Rising, a serious, capable look that grows warmer once trust is built.",
          "Aquarius: as a Sun, an original thinker who cares about the group. As a Moon, a need for space and honest friendship. Rising, a cool, friendly style with a touch of the unexpected.",
          "Pisces: as a Sun, a dreamer with deep empathy and imagination. As a Moon, feelings that soak up the mood of every room. Rising, a soft, open face and a gentle, flowing manner.",
        ],
      },
    },
    {
      id: "how-the-elements-blend-in-your-big-three",
      title: "How the elements blend in your Big Three",
      paras: [
        "Every sign belongs to one of four elements. Fire signs are Aries, Leo and Sagittarius. Earth signs are Taurus, Virgo and Capricorn. Air signs are Gemini, Libra and Aquarius. Water signs are Cancer, Scorpio and Pisces. Fire brings energy and courage, earth brings patience and practical skill, air brings ideas and conversation, and water brings feeling and intuition. Your result includes a line on how the element of your Sun blends with the element of your Moon, since that pairing often describes how your goals and your feelings get along.",
        "A Sun and Moon in the same element tend to agree. What you want and what you need point the same way, which can make choices feel simple. Fire with air and earth with water are natural partners too, since one feeds the other, the way air feeds a flame and water helps a seed grow. Fire with water or air with earth asks for more give and take. These mixes can feel like an inner tug of war at first, yet many people with them become wise at holding two views at once.",
        "The rising sign adds another layer. A water Sun and Moon with a fire rising may come across as bold and quick, while the inner life stays soft and deep. People who meet you for the first time see the rising sign's element first. Friends who know you well see the Sun, and the people closest to you see the Moon. If others often misread you, the element gap between your rising sign and your Moon is a good place to look for the reason.",
      ],
    },
    {
      id: "your-big-three-in-love",
      title: "Your Big Three in love and friendship",
      paras: [
        "In relationships each part of the Big Three plays its own role. The rising sign shapes attraction at first sight and the way you flirt or hold back. The Sun shows what you want to share with a partner, the goals and adventures that keep you excited together. The Moon shows what you need in order to feel safe and loved. Many long relationships rest on the Moon, because daily life together is mostly made of moods, routines and small kindnesses.",
        "A simple exercise helps. Compare your Moon sign with a partner's Moon sign and talk about what comforts each of you. A Taurus Moon may want a calm dinner at home after a hard day, while a Gemini Moon may want to call a friend and talk it out. Both are valid ways to recover. Knowing the difference turns a possible argument into a plan, and it works just as well with close friends, roommates and family members who share your home.",
      ],
    },
    {
      id: "using-your-big-three-at-work-and-in-daily-life",
      title: "Using your Big Three at work and in daily life",
      paras: [
        "At work, the Sun often shows the kind of role that feels meaningful, the rising sign shows your working style and how colleagues see you, and the Moon shows the conditions you need to do your best. A Capricorn Sun may aim for responsibility and long projects. If that Capricorn has a Sagittarius Moon, it will still need some freedom and variety each week, or the job may start to feel heavy. Reading all of your Big Three gives a more honest picture than the Sun alone.",
        "In daily life, your Moon sign is the best guide to self-care. Use it when you plan rest, choose how to spend a weekend, or notice a low mood creeping in. Your rising sign is a helpful guide to fresh starts, such as a new job, a move or the first day at a new school, because it describes how you naturally step into the unknown. Your Sun is the guide for long goals, the things you want to look back on with pride years from now.",
      ],
      list: {
        title: "Simple ways to use your Big Three",
        items: [
          "Plan rest around what your Moon sign enjoys.",
          "Dress and present yourself in a way that suits your rising sign.",
          "Choose long goals that match your Sun sign's purpose.",
          "Notice which sign leads when you feel stressed.",
          "Share your Big Three card with friends and compare notes.",
        ],
      },
    },
    {
      id: "common-big-three-mix-ups",
      title: "Common Big Three mix ups",
      paras: [
        "The Big Three is popular online, which means a few myths travel with it. The most common one is that the rising sign is the same as the Sun sign. It only matches when you were born around sunrise, since the Sun itself sits on the eastern horizon at that hour. Another is that a Moon sign can always be found from the birthday alone. The Moon moves so fast that two people born on the same date a few hours apart can have different Moon signs.",
        "People also mix up the rising sign with the Midheaven, the highest point of the chart, or with the first house in general. The rising sign is the exact sign on the eastern horizon, and it begins the first house. Others assume a cusp birthday means being half of two signs. In practice the Sun was in one sign at the moment you were born, and an exact time and place settle which one it was. The Sun sign dates also shift by about a day from year to year.",
      ],
    },
    {
      id: "big-three-accuracy-and-birth-time",
      title: "Big Three accuracy and your birth time",
      paras: [
        "Your Sun sign is almost always certain from the date alone, except on the day the Sun changes signs. Your Moon sign is certain from the date on more than half of all days. Your rising sign always needs a time. The Ascendant moves about one degree every four minutes on average, so even a fifteen minute error can shift it by several degrees, and near the edge of a sign that is enough to change the sign itself.",
        "If you leave the time blank, the calculator shows your Sun and Moon only, and it warns you when the Moon changed signs during your birth day. In that case it is worth reading both Moon signs and noticing which one feels like home. Your birth certificate, a hospital record, a baby book or a parent's memory can all help narrow down the hour. A recorded time is the best source, since memories often round to the nearest hour or half hour.",
        "Some signs rise faster than others. In the Northern Hemisphere, Pisces, Aries, Aquarius and Taurus rise quickly, while Virgo and Libra take much longer to clear the horizon. In the Southern Hemisphere the pattern is reversed. That means a rough birth time is more forgiving for some rising signs than for others. If you are unsure, our Rising Sign Calculator shows a timeline of the whole birth day, so you can see which signs were rising across the hours you think are possible.",
      ],
    },
    {
      id: "what-to-explore-after-your-big-three",
      title: "What to explore after your Big Three",
      paras: [
        "The Big Three is a doorway into the rest of your chart. Your free birth chart on Astronomads draws every planet, house and aspect, and lets you tap any point to read what it means for you. From there you can look at your Venus and Mars signs for love and drive, your chart ruler for the planet that steers your whole chart, and your dominant element for the overall tone of your personality.",
        "For day to day guidance, the Today page reads the current sky against your own chart. The zodiac sign pages go deep on each of the twelve signs, from their myths to their strengths, and make a great next read for each sign in your Big Three. To compare with someone special, the Compatibility page reads two charts together and shows where you click.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Free birth chart with every planet and house",
          "Moon Sign Calculator for a deeper look at your feelings",
          "Rising Sign Calculator with a full birth day timeline",
          "Venus and Mars Sign Calculator for love and drive",
          "Dominant Element and Mode for your overall balance",
          "Today, your daily horoscope",
          "Compatibility for two charts side by side",
          "Zodiac sign pages for each of your signs",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is my Big Three in astrology?",
      a: "Your Big Three are your Sun sign, Moon sign and rising sign. The Sun describes your core self and purpose, the Moon describes your emotions and needs, and the rising sign describes your outer style and first impression. Together they give a much fuller sketch of you than the Sun sign alone, and they are the usual starting point for reading a birth chart.",
    },
    {
      q: "Do I need my birth time to find my Big Three?",
      a: "You need it for the rising sign, since that sign changes about every two hours. Without a time you still get your Sun and Moon signs. The Sun is clear from the date except on a cusp day, and the Moon is clear unless it changed signs during your birth day. When it did, the calculator warns you so you can read both options.",
    },
    {
      q: "Which of the Big Three is the most important?",
      a: "Each one matters in its own area. The Sun is often the strongest theme across a whole life, the Moon tends to rule private and family life, and the rising sign shapes first impressions and how you start things. Many astrologers also give extra weight to the planet that rules your rising sign, known as the chart ruler, which you can find with our Chart Ruler Calculator.",
    },
    {
      q: "Why does my Big Three feel different from my Sun sign horoscope?",
      a: "Sun sign horoscopes speak to everyone born in a month long stretch, so they leave out the Moon and rising sign. If your Moon or rising sits in a very different sign from your Sun, you may relate more to those signs in daily life. That is normal, and it is the main reason the Big Three has become so popular with people who want a more personal reading.",
    },
    {
      q: "Can my Sun, Moon and rising all be the same sign?",
      a: "Yes. A triple sign happens when you were born near sunrise on a day when the Moon was in the same sign as the Sun, which happens around a New Moon. It is uncommon, and people with this pattern often feel like a very clear, strong example of that sign, with its gifts and its blind spots both easy to see.",
    },
    {
      q: "Is the rising sign the same as the Ascendant?",
      a: "Yes, the two names mean the same point. The Ascendant is the exact degree of the zodiac rising over the eastern horizon at your birth, and the rising sign is the sign that degree falls in. The Rising Sign Calculator shows the exact degree along with your Midheaven.",
    },
    {
      q: "What is the share card in the Big Three Calculator?",
      a: "After you calculate your Big Three, the page builds a share card image with your Sun, Moon and rising signs on it. You can download it and post it, send it to friends or keep it as a small keepsake. Comparing cards with friends is a fun way to start talking about how your charts differ and where they overlap.",
    },
    {
      q: "What if I only know my birth time roughly?",
      a: "Enter your best guess and then check the Rising Sign Calculator, which shows every sign that rose during your birth day in your city. If your whole possible window sits inside one sign, your rising sign is safe. If the window crosses a change, read both signs and see which description fits how other people tend to see you.",
    },
  ],
};
