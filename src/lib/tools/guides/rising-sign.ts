import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "rising-sign",
  title: "Rising Sign Calculator: Find Your Ascendant and What It Means",
  description: "Find your rising sign and exact Ascendant degree from your birth time and city, with your Midheaven, first impression, style and a full birth day timeline.",
  h1: "Your rising sign",
  lead: "Your rising sign, or Ascendant, is the sign that was coming up over the eastern horizon when you were born. Enter your exact birth time and city to find it.",
  sections: [
    {
      id: "what-a-rising-sign-means",
      title: "What a rising sign means",
      paras: [
        "Your rising sign is the zodiac sign that was climbing over the eastern horizon at the exact minute and place of your birth. It is also called the Ascendant, and it marks the start of the first house of your birth chart. As the Earth turns, every sign rises in the east once a day, just as the Sun does each morning, so the rising sign changes much faster than any planet's sign.",
        "In astrology the rising sign describes your outer layer: the way you enter a room, your first reactions to something new and the impression you make before people know you well. It can shape your style, your body language and even the pace of your speech. Many people find that friends who met them recently describe their rising sign almost perfectly, while old friends describe their Sun.",
        "The rising sign also sets up the whole chart. Because it fixes where the houses begin, it decides which areas of life each planet speaks to. Two people born on the same day in the same city a few hours apart share most planet signs, yet their charts can look very different because their rising signs differ. That is why the rising sign is often called the most personal point in astrology.",
      ],
    },
    {
      id: "how-we-calculate-your-rising-sign",
      title: "How we calculate your rising sign",
      paras: [
        "The Rising Sign Calculator works from your birth date and city plus an exact birth time. We look up the city's latitude, longitude and time zone, then convert your local time to Universal Time with the zone's full history, including past daylight saving changes. From that moment and place we work out how the sky was turned above your birth city, and then the exact degree of the zodiac crossing the eastern horizon.",
        "That degree is your Ascendant, and the sign it falls in is your rising sign. We also compute the Midheaven, the degree of the zodiac at the highest point of its path across your sky, which lies toward the south from most of the Northern Hemisphere. Your houses follow the Placidus system, with whole sign houses used near the poles, where Placidus breaks down because parts of the zodiac rise in sudden jumps.",
        "Precision matters here more than anywhere else in the chart. On average the Ascendant moves about one degree every four minutes, and it moves through a whole sign in about two hours. A birth time off by twenty minutes can move your Ascendant by about five degrees. If your Ascendant sits near the start or end of a sign, that is enough to change your rising sign, so the calculator shows the exact degree to let you see how close you are to an edge.",
      ],
    },
    {
      id: "how-to-read-your-rising-sign",
      title: "How to read your rising sign result",
      paras: [
        "Your result opens with your rising sign and its degree, then names its ruling planet. After that come four short readings: your first impression, your personal style, your approach to new things and a growth note for the years ahead. Below them you will find your Midheaven sign and a timeline of the whole birth day in your city, showing when each sign was rising.",
        "Read the first impression section as the version of you that strangers meet. Ask friends whether it fits how you came across when you first met. Then read the approach to new things. The rising sign is the sign of beginnings, so it often describes how you handle a new job, a move or a first date better than any other part of the chart. The growth note points to a quality your rising sign is learning over a lifetime.",
      ],
      list: {
        title: "What your rising sign result shows",
        items: [
          "Your rising sign and exact Ascendant degree",
          "The planet that rules your rising sign",
          "Your first impression on others",
          "Your personal style",
          "How you approach new things",
          "A growth note for your rising sign",
          "Your Midheaven sign",
          "A timeline of every sign rising on your birth day",
        ],
      },
    },
    {
      id: "rising-sign-by-sign",
      title: "Rising sign by sign: all twelve Ascendants",
      paras: [
        "Each rising sign gives a different first impression and a different way of stepping into life. The notes below are short sketches written in our own words. Read your own first, then think of a friend whose rising sign you know and see whether the sketch matches the way they walk into a room. Rising signs are often easier to spot in others than in yourself.",
        "Keep in mind that planets near the Ascendant can color the rising sign strongly. A Leo rising with Saturn close to the Ascendant may look more serious than the sketch suggests, and a Virgo rising with Jupiter there may seem more relaxed and generous. Your free birth chart shows any planet sitting near your Ascendant, so check it before you settle on a reading.",
      ],
      list: {
        title: "The twelve rising signs",
        items: [
          "Aries rising: quick and direct. You tend to walk in first, speak plainly and look younger than your years.",
          "Taurus rising: calm and steady, with a warm, grounded presence. People relax around you, and you take your time with anything new.",
          "Gemini rising: bright and chatty, with lively eyes. You make friends fast and ask good questions.",
          "Cancer rising: gentle and watchful at first, then deeply warm. You notice how people feel before they say a word.",
          "Leo rising: confident and memorable, with an open smile. You bring warmth and a sense of occasion to any room.",
          "Virgo rising: neat and observant. You meet new things by studying them and finding a way to be useful.",
          "Libra rising: polite and graceful, with an eye for beauty. You put people at ease and look for common ground.",
          "Scorpio rising: calm on the surface with a strong gaze. You reveal yourself slowly and read people well.",
          "Sagittarius rising: friendly and curious. You greet new things with humor and a real sense of adventure.",
          "Capricorn rising: composed and capable, often seen as mature. You start things with a plan and grow warmer with time.",
          "Aquarius rising: friendly yet a little cool, with an original style. You meet new people as equals and like to surprise them.",
          "Pisces rising: soft and kind, with a dreamy air. You seem easy to talk to and pick up on the mood around you.",
        ],
      },
    },
    {
      id: "rising-sign-ruler-and-midheaven",
      title: "Your rising sign ruler and the Midheaven",
      paras: [
        "Every rising sign has a ruling planet, and that planet is called your chart ruler. Aries rising is ruled by Mars, Taurus and Libra by Venus, Gemini and Virgo by Mercury, Cancer by the Moon, Leo by the Sun, Sagittarius by Jupiter and Capricorn by Saturn. Scorpio is ruled by Mars with Pluto as its modern co-ruler, Aquarius by Saturn with Uranus, and Pisces by Jupiter with Neptune.",
        "The chart ruler acts like the driver of your rising sign. Its sign and house show where your energy tends to go and what kind of life pulls you forward. A Gemini rising with Mercury in Capricorn may look light and chatty yet aim for serious, practical work. Our Chart Ruler Calculator goes deeper, with that planet's sign, house, retrograde state and aspects, each with its own reading.",
        "The Midheaven is the other main angle in your result. Where the rising sign is about how you begin, the Midheaven is about where you are headed: your public role, your reputation and the work you hope to be known for. The two signs usually differ. The Midheaven often falls around three signs before your rising sign in zodiac order, and the gap grows or shrinks with your latitude and the time of day.",
      ],
    },
    {
      id: "rising-sign-in-love-and-at-work",
      title: "Your rising sign in love and at work",
      paras: [
        "In love, your rising sign shapes first attraction, both how you come across to a possible partner and the kind of first impression you find appealing. The sign opposite your rising sign is called the Descendant, and it begins the seventh house, the house of partners. Astrologers often notice people drawn to partners who carry the qualities of their Descendant. A Libra rising, for example, has an Aries Descendant and often admires bold, direct people.",
        "At work, the rising sign describes your working style and how colleagues first see you. A Capricorn rising may be trusted with responsibility early because they look capable, while a Gemini rising may be the person everyone asks for the latest news. Job interviews, sales calls and first days are rising sign moments. Knowing your rising sign helps you lean into your natural strengths in those settings.",
        "In daily life, the rising sign is also tied to the body and to habits of self-presentation. Some people find their rising sign describes their posture, their clothes or the pace of their walk. Use it as a style guide if you like. A Taurus rising may feel best in soft, good quality fabrics, and an Aries rising in clothes that let them move freely and get out the door fast.",
      ],
    },
    {
      id: "rising-sign-timeline-for-an-unsure-birth-time",
      title: "The rising sign timeline for an unsure birth time",
      paras: [
        "If you only know your birth time roughly, the timeline in your result is the most useful part. It shows the whole birth day in your city, from midnight to midnight, with the times each sign was rising. Find the window of hours that could be right, such as between 2 and 4 in the afternoon, and see which signs fall inside it. If one sign covers the whole window, your rising sign is safe even without an exact time.",
        "If two or more signs fall inside your window, read all of their descriptions and ask people who know you for their honest first impression. You can also look at big life events. Astrologers who work out a lost birth time compare past events with planets crossing the Ascendant and Midheaven to estimate the minute. That takes practice, so use it to narrow the range and hold the result lightly.",
      ],
      list: {
        title: "Clues that help narrow your rising sign",
        items: [
          "A recorded time on a birth certificate",
          "Family memories of the time of day",
          "The rising sign description that strangers confirm",
          "Your timeline window and where the sign changes fall",
          "Major life events that match planets crossing your angles",
        ],
      },
    },
    {
      id: "why-some-rising-signs-rise-faster",
      title: "Why some rising signs rise faster than others",
      paras: [
        "On average a sign takes about two hours to rise, yet the real time varies a lot. The zodiac is tilted against the equator, so at some times of day it lies almost flat along the eastern horizon and a whole sign slips up quickly. At other times it stands up steeply and a sign takes much longer to clear. In the Northern Hemisphere, Pisces, Aries, Aquarius and Taurus rise fast, while Virgo and Libra rise slowly. In the Southern Hemisphere the pattern is reversed.",
        "The effect grows stronger the farther you live from the equator. In a city like London or Edmonton, a fast sign can rise in under an hour, while a slow sign can take well over two and a half hours. Near the equator, rising times are much more even. Near and beyond the polar circles, the rising degree can jump across large stretches of the zodiac, which is why our houses switch to whole sign houses there.",
        "This matters for anyone with an uncertain time. A slow rising sign gives you a wide window, so a rough time is often fine. A fast rising sign can come and go in less than an hour, so even a small error may put you in the next sign. The timeline in your result shows the actual length of every sign's window on your birth day, in your city, so you can see where you stand.",
      ],
    },
    {
      id: "rising-sign-mix-ups",
      title: "Rising sign mix ups",
      paras: [
        "Rising signs carry a few myths. One is that your rising sign always matches your Sun sign. That happens mainly for births close to sunrise, when the Sun itself is on the eastern horizon. Another is that you can find your rising sign from your birthday alone. Every sign rises once a day, so the hour decides it. People also confuse the rising sign with the Moon sign, since both sit next to the Sun in the Big Three.",
        "A last mix up is thinking the rising sign is a mask or a fake self. It is a real part of you, the part that meets the world first. Over time many people grow comfortable with their rising sign, and it becomes a natural, easy way of acting. It describes the doorway, and the rest of your chart describes the rooms behind it, each one adding to the person people come to know.",
      ],
      list: {
        title: "Rising sign facts at a glance",
        items: [
          "Every sign rises once a day.",
          "The rising sign changes about every two hours on average.",
          "Your Ascendant moves about one degree every four minutes.",
          "Sunrise births often have the Sun sign rising.",
          "The sign opposite your rising sign is your Descendant.",
          "The Midheaven is a separate angle near the top of the chart.",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-rising-sign",
      title: "What to explore after your rising sign",
      paras: [
        "Your rising sign opens the door to the rest of your chart. The next step is your chart ruler, the planet that rules your rising sign, which our Chart Ruler Calculator reads in full. Then see how your rising sign sits with your Sun and Moon in the Big Three Calculator, which also makes a share card you can download and send to friends.",
        "Your free birth chart draws all twelve houses from your Ascendant, so you can see where every planet falls in your life. The Today page reads current transits to your chart, and the zodiac sign page for your rising sign gives a fuller portrait of that sign. For love, the Compatibility page compares your planets with a partner's and reads the strongest links.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Chart Ruler Calculator",
          "Big Three Calculator",
          "Free birth chart with Placidus houses",
          "Today, your daily horoscope",
          "Compatibility",
          "Zodiac sign pages",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is a rising sign?",
      a: "Your rising sign, also called the Ascendant, is the zodiac sign that was rising over the eastern horizon at the exact time and place of your birth. It describes your outer manner, your first impression and how you approach new things. It also sets the starting point for the twelve houses in your birth chart.",
    },
    {
      q: "Why do I need an exact birth time for my rising sign?",
      a: "The rising sign changes about every two hours on average, and the Ascendant degree moves about one degree every four minutes. A time that is off by half an hour can shift your Ascendant by several degrees and sometimes into a new sign. The more exact your time, the more you can trust the result.",
    },
    {
      q: "What if I only have a rough birth time?",
      a: "Use your best guess, then look at the timeline in your result. It shows every sign that rose on your birth day in your city and when. If your possible window falls inside one sign, your rising sign is clear. If it crosses a change, read both descriptions and ask friends which one matches their first impression of you.",
    },
    {
      q: "Is my rising sign more important than my Sun sign?",
      a: "Each one has its own job. The Sun describes your core purpose and the person you are growing into, and the rising sign describes your style and how you meet life. Many astrologers treat the rising sign and its ruling planet as just as important as the Sun, since they shape the whole layout of your chart.",
    },
    {
      q: "What is the difference between the Ascendant and the Midheaven?",
      a: "The Ascendant is the degree rising on the eastern horizon, and it relates to self, body and first impressions. The Midheaven is the degree at the highest point of the zodiac's path across your sky, and it relates to career, reputation and public goals. Both are angles of the chart, and your result shows both of them.",
    },
    {
      q: "Why does my rising sign feel more like me than my Sun sign?",
      a: "Your rising sign is the way you act in most everyday situations, especially with new people, so it is often what you notice first in yourself. If several planets sit near your Ascendant, the rising sign can feel even stronger. Over time, many people feel their Sun more clearly as they grow into their goals.",
    },
    {
      q: "Can two people born on the same day have different rising signs?",
      a: "Yes, and it is very common. Every sign rises once a day, so people born a few hours apart on the same day, even in the same city, usually have different rising signs. People born at the same minute in different cities can also have different rising signs, because the eastern horizon depends on where you stand.",
    },
    {
      q: "What is my chart ruler?",
      a: "Your chart ruler is the planet that rules your rising sign. For example, Mars rules Aries rising and Venus rules Taurus rising. For Scorpio, Aquarius and Pisces rising, the traditional rulers are Mars, Saturn and Jupiter, with Pluto, Uranus and Neptune as modern co-rulers. Our Chart Ruler Calculator reads the sign, house and aspects of that planet.",
    },
    {
      q: "Does daylight saving time change my rising sign?",
      a: "It can, if it is handled wrong. A one hour error moves your Ascendant by about fifteen degrees on average, which is often enough for a new sign. That is why we convert your birth time with your city's full time zone history, which knows when clocks moved forward or back in past years. Enter the time as the clock showed it.",
    },
  ],
};
