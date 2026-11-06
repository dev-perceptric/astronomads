import type { ToolGuide } from '../types';

export const GUIDE: ToolGuide = {
  slug: "elements",
  title: "Dominant Element Calculator: Your Element and Mode Balance",
  description: "Find your dominant element and mode from your birth chart. See fire, earth, air and water scores, your missing element and your signature sign for free.",
  h1: "Your dominant element",
  lead: "Your birth chart has its own mix of fire, earth, air and water. Enter your birth details to see your element and mode balance and the sign that sums it up.",
  sections: [
    {
      id: "what-a-dominant-element-means",
      title: "What a dominant element means",
      paras: [
        "Astrology sorts the twelve signs into four elements: fire, earth, air and water. Each element is a basic style of energy. Fire is warm and eager, earth is steady and practical, air is curious and social, and water is feeling and intuitive. Your dominant element is the one that shows up most strongly once you add up where your planets and key points sit in your birth chart.",
        "Most people know the element of their Sun sign, yet a chart holds many more points than the Sun. A Gemini Sun is an air sign, but if the Moon, rising sign and several planets sit in earth signs, the chart as a whole leans earth. That person may love ideas like any Gemini while living a calm, hands on life. The element count shows the overall tone of a chart in one simple picture.",
        "Our tool also counts the modes, which describe how a sign uses its energy. Cardinal signs start things, fixed signs keep things going and mutable signs adapt to change. Element and mode together give each sign its character, so the tool combines your leading element and leading mode into a single signature sign. That sign often feels familiar, even when it holds none of your planets.",
      ],
    },
    {
      id: "how-we-calculate-your-dominant-element",
      title: "How we calculate your dominant element",
      paras: [
        "The calculator builds your chart from your birth date, plus a time and city if you have them. We compute the true positions of the Sun, Moon and planets for that moment with the astronomy-engine library, and with a birth time we also find your rising sign. Then we score each point by the element and the mode of the sign it sits in, and add up the totals.",
        "The Sun, the Moon and the Ascendant are the most personal points in a chart, so each scores 2 points. Every other planet, from Mercury out to Pluto, scores 1 point. With a birth time the total comes to 14 points. Without one the Ascendant drops out and the total is 12. Your result shows the totals for each element and each mode as bars, along with a list of which planets sit in each element.",
        "We keep the scoring simple on purpose. Some astrologers add extra points for chart rulers or for planets near the angles, and those systems can shift the totals a little. A clear count with fixed weights is easy to check by hand, and it gives the same answer every time. If two elements score close to each other, read both readings, since your chart likely draws on both styles.",
      ],
      list: {
        title: "How each point scores",
        items: [
          "Sun: 2 points",
          "Moon: 2 points",
          "Ascendant: 2 points, with a birth time",
          "Mercury, Venus and Mars: 1 point each",
          "Jupiter and Saturn: 1 point each",
          "Uranus, Neptune and Pluto: 1 point each",
          "Total: 14 points with a birth time, 12 without",
        ],
      },
    },
    {
      id: "the-four-elements-in-your-chart",
      title: "The four elements as your dominant element",
      paras: [
        "Fire covers Aries, Leo and Sagittarius. A fire dominant chart runs on enthusiasm and courage. These people act fast, inspire others and love a challenge, and they may need to watch for burnout. Earth covers Taurus, Virgo and Capricorn. An earth dominant chart is patient and reliable, good with money, bodies, tools and time. Earth people build things that last, and they may need to practice letting go of control.",
        "Air covers Gemini, Libra and Aquarius. An air dominant chart lives through ideas, words and people. Air people make connections, see many sides of a question and stay curious for life, and they may need reminders to rest the mind. Water covers Cancer, Scorpio and Pisces. A water dominant chart feels deeply and reads moods with ease. Water people offer empathy and loyalty, and they may need firm boundaries to protect their energy.",
        "An element that leads by a wide margin tends to color everything, from your hobbies to your first reaction in a crisis. A more even spread usually means you can switch styles depending on the situation. Neither pattern is better. The point is to know your natural setting so you can lean on it and notice when you need help from another element.",
      ],
      list: {
        title: "Each element in a few words",
        items: [
          "Fire: courage and drive",
          "Earth: patience and practical skill",
          "Air: ideas and connection",
          "Water: feeling and intuition",
        ],
      },
    },
    {
      id: "dominant-element-and-mode",
      title: "Dominant element and mode: cardinal, fixed and mutable",
      paras: [
        "The modes describe what a sign does with its element. Cardinal signs, Aries, Cancer, Libra and Capricorn, begin each season of the year, and they love to start and lead. Fixed signs, Taurus, Leo, Scorpio and Aquarius, fall in the middle of each season, and they hold steady and see things through. Mutable signs, Gemini, Virgo, Sagittarius and Pisces, close each season, and they adapt and get ready for what comes next.",
        "A cardinal dominant chart likes momentum. These people may start many projects and feel restless when life stands still. A fixed dominant chart has staying power and loyalty, though it may resist change longer than it should. A mutable dominant chart is flexible and quick to learn, though it may scatter its energy or find it hard to commit. Your result names your dominant mode with a reading.",
        "Element and mode often tell different stories. An earth dominant chart with a cardinal lead tends to set goals and climb, like Capricorn. The same earth lead paired with a mutable lead tends to refine and improve, like Virgo. Reading the two together explains a lot about how you work and why you tend to start, finish or adjust things the way you do.",
      ],
    },
    {
      id: "missing-or-weak-element",
      title: "A missing or weak element next to your dominant element",
      paras: [
        "Your result points out any element with no points at all, and any element with a low score. A missing element is quite common. With ten bodies and the Ascendant spread across twelve signs, and the slow outer planets often bunched together, many charts leave out one element entirely. It means that style of energy comes less naturally, and you may notice it most in moments that call for it.",
        "People with a missing element often grow strong in it through effort, because it feels like something to learn. Someone with no earth may become very organized on purpose, and someone with no water may become a careful listener. Astrologers also notice that people often seek out friends and partners who carry the element they lack. A fire heavy person with no earth may feel calmer around an earthy partner who brings routines and patience.",
        "Use a weak element as a gentle invitation. If air is low, try writing your thoughts down or talking problems through. If water is low, give yourself time to notice how you feel before acting. If fire is low, schedule something exciting. If earth is low, build one simple routine and keep it for a month. Small habits can bring an element into your life without changing who you are.",
      ],
    },
    {
      id: "your-signature-sign",
      title: "Your signature sign from your dominant element and mode",
      paras: [
        "Each of the twelve signs is a unique pairing of one element and one mode. Fire and cardinal make Aries, earth and fixed make Taurus, and so on around the wheel. Your signature sign is the sign that matches your leading element plus your leading mode. It acts like a summary of your whole chart's tone, and many people find it explains a side of themselves that their Sun sign misses.",
        "Your signature sign may hold none of your planets at all, and that is fine. It shows the flavor your chart carries when you add every point together. A Pisces Sun with a chart full of earth and fixed signs has a Taurus signature, which may explain a love of comfort and physical skill that the dreamy Pisces image leaves out. Read the signature reading in your result along with the zodiac page for that sign.",
      ],
      list: {
        title: "Element and mode pairs",
        items: [
          "Fire and cardinal: Aries",
          "Earth and fixed: Taurus",
          "Air and mutable: Gemini",
          "Water and cardinal: Cancer",
          "Fire and fixed: Leo",
          "Earth and mutable: Virgo",
          "Air and cardinal: Libra",
          "Water and fixed: Scorpio",
          "Fire and mutable: Sagittarius",
          "Earth and cardinal: Capricorn",
          "Air and fixed: Aquarius",
          "Water and mutable: Pisces",
        ],
      },
    },
    {
      id: "active-and-receptive-balance",
      title: "Active and receptive balance beyond your dominant element",
      paras: [
        "Your result also groups the elements into two sides. Fire and air signs are active: they reach outward, speak up and move toward the world. Earth and water signs are receptive: they take in, hold and respond. The balance between the two halves of your chart describes your basic direction of energy, whether you tend to push out or draw in.",
        "An active heavy chart often feels most alive in motion and conversation. These people may need to practice slowing down and listening. A receptive heavy chart often feels most alive in close bonds and careful craft. These people may need to practice speaking up and taking the first step. A balanced chart can do both, though it may switch between the two moods more often than others.",
        "Think of the balance as a breathing rhythm. Active energy is the breath out and receptive energy is the breath in, and you need both to feel well. If your score leans one way, the weaker side is where a small daily habit can make a big difference, such as a short walk for a receptive chart or a few calm minutes of journaling for an active one.",
      ],
    },
    {
      id: "dominant-element-in-love-and-at-work",
      title: "Your dominant element in love and at work",
      paras: [
        "In love, elements describe how you like to connect. Fire wants fun and shared adventure, earth wants loyalty you can see and touch, air wants great conversation and space, and water wants emotional depth and closeness. Partners with the same dominant element often feel instantly at home together. Partners with different elements can balance each other well, as long as each respects the other's style.",
        "Fire and air tend to get along easily, since both are active and love movement. Earth and water also pair well, since both are receptive and like stability and closeness. Fire with earth, or air with water, may need more patience at first. Our Compatibility page compares two full charts and shows how your planets link, which goes deeper than a simple element match.",
        "At work, your dominant element points to the kind of tasks that energize you. Fire charts enjoy leading and launching new things. Earth charts like to build and manage, and they like seeing a result they can touch. Air charts shine in writing, teaching, planning or connecting people. Water charts do well in caring roles and creative work, and anywhere reading people matters.",
      ],
    },
    {
      id: "dominant-element-mix-ups",
      title: "Dominant element mix ups and birth time accuracy",
      paras: [
        "The most common mix up is assuming your Sun's element is your dominant element. The Sun counts for a lot, 2 points out of 12 or 14, yet the rest of the chart can easily outweigh it. Another is reading the outer planets too personally. Uranus, Neptune and Pluto stay in one sign for many years, so everyone born in the same stretch shares their elements. That is why they score just 1 point each.",
        "Birth time matters too. Without a time the Ascendant drops out, which removes 2 points, and on a day when the Moon changed signs its element may be uncertain. With a time and city the count is complete. If you have only a rough time, check whether your rising sign is likely to change across your possible window, using the timeline in our Rising Sign Calculator.",
      ],
      list: {
        title: "Quick points to remember",
        items: [
          "Your Sun element is one part of the count.",
          "A missing element is common.",
          "Outer planets are shared by whole generations.",
          "The signature sign may hold none of your planets.",
          "A birth time adds the Ascendant's 2 points.",
          "Close scores mean you draw on both elements.",
        ],
      },
    },
    {
      id: "what-to-explore-after-your-dominant-element",
      title: "What to explore after your dominant element",
      paras: [
        "Your element balance is a wide angle view of your chart. To zoom in, open your free birth chart and see which planets carry each element and which houses they fall in. The Big Three Calculator shows how your Sun, Moon and rising elements blend, which often explains the strongest themes in your element count. The Chart Ruler Calculator adds the planet that steers the whole mix.",
        "The zodiac sign pages are the best next read for your signature sign and for each sign in your leading element. For relationships, the Compatibility page compares your chart with someone else's. The Today page shows the daily sky, so you can notice how you feel when the Moon passes through your strong or missing element over the course of a month.",
      ],
      list: {
        title: "Next steps on Astronomads",
        items: [
          "Free birth chart",
          "Big Three Calculator",
          "Chart Ruler Calculator",
          "Zodiac sign pages, starting with your signature sign",
          "Compatibility",
          "Today, your daily horoscope",
        ],
      },
    },
  ],
  faq: [
    {
      q: "What is my dominant element in astrology?",
      a: "Your dominant element is the element of fire, earth, air or water that scores highest when you count where your Sun, Moon, Ascendant and planets sit. It describes the overall tone of your chart, which may differ from your Sun sign's element. Our calculator scores each point and shows the full balance as bars.",
    },
    {
      q: "How is the dominant element calculated?",
      a: "We score the Sun, Moon and Ascendant at 2 points each, since they are the most personal points, and every planet from Mercury to Pluto at 1 point. That gives 14 points with a birth time and 12 without one. Each point goes to the element and the mode of the sign it sits in, and the highest total leads.",
    },
    {
      q: "What does it mean to have a missing element?",
      a: "A missing element means none of your counted points sit in its signs. It is common and it is no flaw. It points to a style that comes less naturally, which many people build on purpose through habits or find in friends and partners. The reading in your result suggests simple ways to bring that element into daily life.",
    },
    {
      q: "What is a signature sign?",
      a: "Your signature sign is the one sign that matches your leading element and your leading mode. For example, a chart led by water and fixed signs has a Scorpio signature. It sums up the tone of your whole chart and can feel familiar even when it holds none of your planets. The zodiac page for that sign is a good next read.",
    },
    {
      q: "What are modes in astrology?",
      a: "Modes, also called modalities or qualities, describe how a sign acts. Cardinal signs start things and lead. Fixed signs hold steady and keep going. Mutable signs adapt and prepare for change. Each element has one sign in each mode, which is how the twelve signs come about. Your result shows your mode totals next to your element totals.",
    },
    {
      q: "What do active and receptive mean?",
      a: "Fire and air signs are called active, since they reach outward with action and words. Earth and water signs are called receptive, since they take in, hold and respond. The balance between the two shows your basic direction of energy. Both sides are useful, and a strong lean simply shows your natural setting.",
    },
    {
      q: "Do I need a birth time for this tool?",
      a: "A time makes the count complete. Without one, the Ascendant drops out and the total becomes 12 points, and the Moon may be uncertain on days it changed signs. The element balance is still useful without a time, since most planets stay in one sign for the whole day and give the same score.",
    },
    {
      q: "Can my dominant element differ from my Sun sign element?",
      a: "Yes, and it often does. The Sun is only 2 points of 12 or 14. If your Moon, Ascendant and several planets share another element, that element can easily lead. Many people find this explains why their Sun sign description feels only partly right, and why friends describe them in a different way.",
    },
    {
      q: "Why do Uranus, Neptune and Pluto count for less?",
      a: "They move slowly and stay in one sign for years, so millions of people born in the same stretch of years share them. They still add a layer to your chart, so each scores 1 point like the other planets, while the personal Sun, Moon and Ascendant score 2 points each.",
    },
  ],
};
