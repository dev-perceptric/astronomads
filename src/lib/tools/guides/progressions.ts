import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "progressions",
  title: "Progressions Calculator: Your Secondary Progressed Chart",
  description: "Free secondary progressions calculator. See your progressed Sun, Moon, planets and angles for any date, your progressed Moon phase and a lifetime timeline.",
  h1: "Secondary Progressions",
  lead: "Your birth chart grows with you. Secondary progressions show how it has unfolded so far, and the progressed Moon tells you which chapter of life you are in right now.",
  sections: [
    {
      id: "what-are-progressions",
      title: "What secondary progressions are",
      paras: [
        "Secondary progressions are a way of moving your birth chart forward in time to match your age. The rule is simple: each day after your birth stands for one year of your life. To see your chart at age 30, astrologers look at where the planets were 30 days after you were born. That chart is called your progressed chart, and it shows how your inner life has developed.",
        "Transits describe what the outside world brings to you. Progressions describe how you are growing on the inside. They move slowly, so they mark long chapters instead of single days. A progressed planet changing sign or a progressed Moon entering a new phase often lines up with a shift in what you want, what you value, or how you see yourself.",
        "Astrologers have used progressions for centuries. They stay popular because they feel personal and they make sense of the slow seasons of a life, the ones that only become clear when you look back. Our calculator lets you see that unfolding for any date you choose, from your first birthday to old age. It works for past dates as well as future ones.",
      ],
    },
    {
      id: "progressions-astronomy",
      title: "The astronomy behind secondary progressions",
      paras: [
        "Progressions use real planet positions, just from a different day. On the day after your birth, the Sun had moved about one degree, the Moon about 12 to 15 degrees, and the slow planets almost nothing. In a progressed chart, those one day movements become one year of change. That is why the progressed Sun moves about one degree a year, and the progressed Moon about one degree a month.",
        "Some numbers follow from that rule. The progressed Sun changes sign about every 30 years, so most people see two or three progressed Sun signs in a lifetime. The progressed Moon spends about 2.5 years in each sign and goes all the way around the zodiac in about 27.3 years. The progressed Moon's cycle around the progressed Sun, from one progressed New Moon to the next, takes about 29.5 years. That long cycle gives your life a rhythm you can track.",
        "The faster personal planets can also change in a lifetime. Mercury, Venus and Mars may move into a new sign by progression, and a planet that was close to a station in the weeks after your birth can turn retrograde or direct by progression. Jupiter and the planets beyond it barely move at all in a few months of real time, so they are left out of this calculator. Over a whole life, they shift by only a few degrees.",
      ],
    },
    {
      id: "how-we-calculate-progressions",
      title: "How our progressions calculator works",
      paras: [
        "You enter your birth details and a target date, which is today unless you pick another. The calculator works out your exact age on that date, in years and fractions of a year, and counts the same number of days forward from your birth moment. It then finds the true positions of the Sun, Moon, Mercury, Venus and Mars at that progressed moment, using the astronomy-engine library. A year of your life equals about one day of real sky, so a month of life equals about two hours.",
        "The progressed angles need their own method. We use solar arc for the Midheaven: your natal Midheaven plus the distance the progressed Sun has moved since birth. The progressed Ascendant is then worked out from that Midheaven at your birth latitude. This keeps the angles moving at a steady pace of about one degree a year, in step with the progressed Sun.",
        "The calculator also finds the progressed Moon phase, the angle between the progressed Moon and the progressed Sun, and the date that phase began. Finally, it builds a lifetime timeline of every progressed Moon sign change and every progressed Sun sign change, so you can see your past chapters and the ones ahead. Each date on the timeline is worked out from the real motion of the Moon and Sun.",
      ],
      list: {
        title: "What your progressions results show",
        items: [
          "Progressed Sun, Moon, Mercury, Venus and Mars signs",
          "Progressed Ascendant and Midheaven",
          "Your progressed Moon phase and the date it began",
          "A lifetime timeline of progressed Moon sign changes",
          "Every progressed Sun sign change",
          "Readings for each progressed placement",
        ],
      },
    },
    {
      id: "reading-progressions",
      title: "How to read your progressed chart",
      paras: [
        "Start with the progressed Moon. It moves fastest, so it gives the clearest picture of your current chapter. Its sign shows the emotional tone of the next two or so years, and what you are craving right now. Next, look at the progressed Sun. Its sign changes rarely, and when it does, it marks a deep shift in identity that unfolds over decades.",
        "Then read the personal planets. A progressed Venus sign shows how your taste in love and beauty has grown. A progressed Mars sign shows how your drive works now. A progressed Mercury sign shows how your thinking has matured. Finally, look at the progressed Ascendant and Midheaven for changes in how you present yourself and where your career is heading. A progressed angle that changes sign often marks a new public role or a new look.",
        "Always read the progressed chart against your birth chart. Your natal placements stay with you for life. Progressions add new colors on top of them. A person born with a Gemini Sun whose Sun has progressed into Cancer still has Gemini curiosity, now with a stronger pull toward home and family. The new layer adds to who you are and leaves your roots in place.",
      ],
      list: {
        title: "What each progressed point describes",
        items: [
          "Progressed Sun: your growing sense of self",
          "Progressed Moon: your current emotional chapter",
          "Progressed Mercury: how your thinking has matured",
          "Progressed Venus: your taste in love and beauty",
          "Progressed Mars: how you act and pursue goals now",
          "Progressed Ascendant: how you present yourself",
          "Progressed Midheaven: your direction in career and public life",
        ],
      },
    },
    {
      id: "progressed-moon",
      title: "The progressed Moon through the signs",
      paras: [
        "The progressed Moon is the star of any progressions reading. It changes sign about every 2.5 years, and many people can feel the shift. A progressed Moon in Aries brings restless energy and a wish to start fresh. In Taurus, it slows down and looks for comfort. In Gemini, it gets curious and social, and so on around the wheel. Each sign brings its own needs, and the progressed Moon asks you to meet them for those few years.",
        "With a birth time, the progressed Moon also moves through the houses of your birth chart, spending a couple of years in each one. That gives you two layers: the sign shows how you feel, and the house shows where those feelings play out. A progressed Moon in your tenth house often brings attention to career, while one in your fourth turns you toward home.",
        "The lifetime timeline in our calculator lists every progressed Moon sign change from birth onward. Looking back over it is one of the most rewarding things you can do with progressions. Many people find that the dates line up with moves, new relationships or changes in what they wanted from life. Looking ahead, the timeline also shows when your next chapter starts, which can help you plan.",
      ],
    },
    {
      id: "progressed-moon-phases",
      title: "The eight progressed Moon phases",
      paras: [
        "The progressed lunation cycle tracks the angle between your progressed Moon and progressed Sun. It works just like the Moon's monthly phases, stretched across about 29.5 years. Each of the eight phases lasts about 3.5 to 4 years. Together they form a long rhythm of planting, growing, harvesting and clearing the ground. Most people live through two or three full rounds of this cycle.",
        "The phase you were born in sets your starting point. Someone born near a Full Moon begins life in the harvest part of the cycle. The calculator shows your current progressed phase and the date it began, so you can see how far into it you are. A new phase often brings a change in mood or direction that is easy to spot in hindsight. People born in a waxing phase tend to keep building, while those born in a waning phase tend to share and refine.",
      ],
      list: {
        title: "Progressed Moon phases",
        items: [
          "New: plant a seed and start a fresh chapter",
          "Crescent: push through early doubts and keep going",
          "First Quarter: act and clear obstacles",
          "Gibbous: refine and improve what you are building",
          "Full: see results and gain clarity in relationships",
          "Disseminating: share what you have learned",
          "Last Quarter: let go of what no longer fits",
          "Balsamic: rest and prepare for a new cycle",
        ],
      },
    },
    {
      id: "progressed-sun",
      title: "Progressed Sun sign changes",
      paras: [
        "The progressed Sun moves about one degree a year. When you were born, your Sun sat somewhere between 0 and 30 degrees of its sign, so your first progressed Sun sign change can come at any age up to about 30. Someone born at 25 degrees of Leo will see their progressed Sun enter Virgo around age 5. Someone born at 2 degrees of Leo will wait about 28 years.",
        "A progressed Sun sign change is a slow and deep shift. You keep your natal Sun sign for life, and you add the qualities of the new sign over time. Many people describe it as growing into a new side of themselves. The change rarely feels sudden. It tends to build for a year or two around the date the progressed Sun enters the new sign.",
      ],
    },
    {
      id: "using-progressions",
      title: "Practical ways to use progressions",
      paras: [
        "Use progressions to understand where you are in your own story. When you feel restless or flat without an obvious reason, check your progressed Moon. A change of sign or phase can explain a shift in mood and help you work with it. Knowing a phase will end in a year or two can also make a hard season feel easier to carry.",
        "Progressions pair well with transits. Transits describe events, and progressions describe how ready you are for them. When a big transit lands at the same time as a progressed Moon change of sign or phase, the period often stands out as a turning point. Many astrologers check both before making a reading. If a hard transit arrives during a Balsamic phase, for example, rest and release usually serve better than a big push.",
        "Use the lifetime timeline as a journal prompt. Write down what was happening in your life at each progressed Moon sign change. Over a few entries, you will start to see how each sign feels for you, which makes the next change easier to plan for. You can do the same with progressed Sun changes and each new phase, building a map of your own life that grows richer every year.",
      ],
      list: {
        title: "Questions to ask your progressions",
        items: [
          "What sign is my progressed Moon in, and when does it change?",
          "Which phase am I in, and when did it start?",
          "Has my progressed Sun changed sign yet?",
          "Did any progressed planet change sign this year?",
          "Which big transits line up with these changes?",
        ],
      },
    },
    {
      id: "progressions-mix-ups",
      title: "Common progressions mix ups",
      paras: [
        "The most common mix up is confusing progressions with transits. Transits are the real planets in today's sky. Progressions are the planets from the days after your birth, read as years of your life. Your progressed Moon and the Moon in today's sky are different points, usually in different signs. If a horoscope says the Moon is in Leo today, that has nothing to do with your progressed Moon.",
        "Another mix up is thinking your Sun sign has changed. Your natal Sun sign stays yours for life. A progressed Sun in a new sign adds a layer on top of it. People also mix up secondary progressions with solar arc directions. Solar arc moves every point by the progressed Sun's distance. We use solar arc only for the progressed Midheaven, and the planets use true secondary positions. That keeps each planet moving at its own real pace.",
      ],
    },
    {
      id: "progressions-accuracy",
      title: "Progressions accuracy and what to explore next",
      paras: [
        "Progressions depend a lot on your birth time. The progressed angles move about one degree a year, and a four minute error in birth time moves your natal angles by about one degree. That means each four minutes of error moves the timing of progressed angle events by about a year. Treat the progressed Ascendant and Midheaven as rough unless your time is exact.",
        "The progressed Moon is also sensitive. An hour of error moves your natal Moon by about half a degree, which shifts each progressed Moon sign change by about two weeks. Without any birth time, the error can be several months. The progressed Sun and planet signs stay reliable from your birth date alone, since they move slowly in a day.",
        "When you have your progressions, open your free birth chart to see the natal placements underneath them. The transits calculator shows what the sky brings to your chart on any date, and the daily horoscope offers a short view of today. The zodiac sign pages explain the signs your progressed planets move through, and the compatibility page shows how two charts meet.",
      ],
      list: {
        title: "Where to go after your progressions",
        items: [
          "Free birth chart: your natal placements with readings",
          "Transits: the real sky crossing your chart",
          "Saturn return: your long Saturn chapters",
          "Solar return: the year ahead from your birthday",
          "Zodiac sign pages: every sign in depth",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What are secondary progressions in astrology?",
      a: "Secondary progressions move your birth chart forward by treating each day after birth as one year of life. To see your chart at age 40, astrologers look at the sky 40 days after you were born. The result shows how your inner life has developed over time, through slow changes in sign, phase and angle.",
    },
    {
      q: "What is the progressed Moon?",
      a: "The progressed Moon is your natal Moon moved forward by the day for a year rule. It moves about one degree a month and changes sign about every 2.5 years. It is the fastest point in a progressed chart, so it is the clearest marker of your current emotional chapter and what you need right now.",
    },
    {
      q: "What progressed Moon phase am I in?",
      a: "Enter your birth details in the calculator above. It measures the angle between your progressed Moon and progressed Sun and shows which of the eight phases you are in, along with the date the phase began. Each phase lasts about 3.5 to 4 years, and the whole cycle takes about 29.5 years.",
    },
    {
      q: "Does my Sun sign change with progressions?",
      a: "Your natal Sun sign stays the same for life. Your progressed Sun moves about one degree a year and enters a new sign about every 30 years. When it does, you add the qualities of that sign on top of your natal Sun, a slow change that many people notice over a year or two.",
    },
    {
      q: "How are progressions different from transits?",
      a: "Transits are the real planets in today's sky making aspects to your birth chart. Progressions are the planets from the days after your birth, each day read as a year. Transits often describe outer events. Progressions describe inner growth and timing, and astrologers like to read the two together.",
    },
    {
      q: "How do you calculate the progressed Ascendant and Midheaven?",
      a: "We move the Midheaven by solar arc: your natal Midheaven plus the distance the progressed Sun has traveled since birth. The progressed Ascendant is then worked out from that Midheaven at your birth latitude. Both angles move at about one degree a year, in step with the progressed Sun.",
    },
    {
      q: "Do I need my birth time for progressions?",
      a: "Your progressed Sun and planet signs are reliable from your birth date alone. The progressed angles need an accurate time, since four minutes of error shifts their timing by about a year. The progressed Moon also benefits from a time, since an hour of error moves its sign changes by about two weeks.",
    },
    {
      q: "How often does the progressed Moon change signs?",
      a: "About every 2.5 years, so it travels through all twelve signs in about 27.3 years. In a life of about 80 years, the progressed Moon goes around the zodiac about three times. The calculator lists every change from birth onward on a lifetime timeline.",
    },
    {
      q: "Can I see progressions for a past or future date?",
      a: "Yes. The calculator uses today by default, and you can pick any other date. Looking back helps you understand past chapters, and looking ahead shows when your progressed Moon will change sign or phase, so you can plan for a new season.",
    },
  ],
};
