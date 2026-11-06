import type { Article } from '../types';

export const ARTICLE: Article = {
  slug: 'house-systems',
  title: 'House Systems Explained: Placidus, Whole Sign, Koch and More',
  description: 'How astrologers divide the sky into twelve houses, the history and geometry of ten house systems, why they disagree, and how to compare them in your own chart.',
  kicker: 'Learn · Chart structure',
  h1: 'House systems',
  lead: 'The twelve houses are the most debated part of astrology. Every system agrees on the signs and the planets, and every system draws the houses differently. Here is why, system by system, with the geometry, the history and a tool to compare them on your own chart.',
  minutes: 24,
  sections: [
    {
      id: 'what-houses-do',
      title: 'What a house system does',
      paras: [
        "The zodiac tells you what kind of energy a planet carries. The houses tell you where in life it shows up: the self, money, siblings, home, children, work, partners and so on, around to the twelfth house of what is hidden. Signs come from the Sun's yearly path and are the same for everyone born on a given day. Houses come from the Earth's daily turn and depend on the exact time and place of birth. That is what makes them personal, and also what makes them hard to draw.",
        "The difficulty is geometric. The sky is a sphere, and the planets are spread along the ecliptic, the Sun's path, which is tilted about 23.4 degrees to the Earth's equator. The horizon of a given birthplace is tilted again, by an amount that depends on latitude. To make twelve houses, an astrologer has to cut the sphere into twelve sectors and then find where each cut crosses the ecliptic. There are many reasonable ways to cut a sphere, and each gives different crossing points. A house system is one rule for making those cuts.",
        "Every system starts from the same frame. Three quantities fix it: the right ascension of the Midheaven (the sidereal time of birth, expressed as an angle and often shortened to RAMC), the obliquity of the ecliptic, and the latitude of the birthplace. From these come the Ascendant, where the ecliptic meets the eastern horizon, and the Midheaven, where it meets the upper meridian. Almost every system puts the Ascendant on the first cusp. The systems split over everything in between.",
      ],
      figure: 'circles',
      aside: {
        title: 'Cusp',
        text: 'The cusp of a house is its starting line, given as a degree of the zodiac. A planet belongs to a house when it sits between that house’s cusp and the next one, counting in zodiac order.',
      },
    },
    {
      id: 'three-families',
      title: 'Three families of house systems',
      paras: [
        "House systems fall into three broad families, according to what they divide. The first family divides the ecliptic itself. Whole sign houses take the signs as the houses. Equal houses count 30 degree steps from the Ascendant. Porphyry houses divide each quarter of the ecliptic, between the angles, into thirds. These systems are easy to compute by hand and never fail at any latitude.",
        "The second family divides a great circle in space and projects the divisions onto the ecliptic. Campanus divides the prime vertical, the circle through the east point, the zenith and the west point. Regiomontanus divides the celestial equator. Morinus and the Meridian system also divide the equator, projecting it in other ways. These are often called space-based systems.",
        "The third family divides time. The sky turns once a day, and every degree of the zodiac spends part of that day above the horizon and part below. Time-based systems split those arcs of time into thirds. Alcabitius uses the arc of the rising degree. Placidus uses the arc of each degree on its own. Koch uses the arc of the Midheaven degree as seen from the birthplace. Because time-based systems follow the actual motion of the planets, their supporters see them as the most natural.",
      ],
      list: {
        title: 'The families at a glance',
        items: [
          'Divide the ecliptic: Whole sign, Equal, Porphyry',
          'Divide space: Campanus (prime vertical), Regiomontanus (equator), Morinus, Meridian',
          'Divide time: Alcabitius (the Ascendant’s arc), Placidus (each degree’s arc), Koch (the Midheaven’s arc)',
        ],
      },
    },
    {
      id: 'whole-sign',
      title: 'Whole sign houses: the oldest system',
      paras: [
        "In whole sign houses, the entire sign that contains the Ascendant is the 1st house, the next sign is the 2nd, and so on. If you have 18 degrees of Virgo rising, all of Virgo is your 1st house, all of Libra your 2nd, and every planet in Libra sits in your 2nd house. The cusps are always at 0 degrees of a sign.",
        "This is the oldest house system on record. The earliest Greek horoscopes and the main Hellenistic authors, such as Dorotheus of Sidon and Vettius Valens in the first and second centuries, count houses this way, and the same rule has been the standard in Indian astrology for two thousand years. In the West it faded during the Middle Ages and returned in the 1990s, when translation projects brought Hellenistic texts back into print. Robert Hand's short study Whole Sign Houses: The Oldest House System (2000) did much to spread it among modern astrologers.",
        "Whole sign houses keep the signs and the houses in step, which makes rulerships easy to read: the ruler of the 7th sign is always the ruler of the 7th house. The price is that the Midheaven floats. It usually lands in the 9th, 10th or 11th house, and Hellenistic astrologers read it as a separate sensitive point. At high latitudes it can stray even further.",
      ],
    },
    {
      id: 'equal',
      title: 'Equal houses',
      paras: [
        "Equal houses start at the exact degree of the Ascendant and add 30 degrees for each house. With 18 degrees of Virgo rising, the 2nd house begins at 18 degrees of Libra, the 3rd at 18 degrees of Scorpio, and so on around. Every house is exactly one sign wide.",
        "Ptolemy, writing in the second century, describes thirty degree places beginning five degrees above the rising degree in his discussion of the length of life, and historians often read this as an early form of equal houses. The system was popularized again in twentieth century Britain, notably by Margaret Hone, whose Modern Text-Book of Astrology (1951) taught it to a generation of students.",
        "Like whole sign houses, equal houses work at every latitude and leave the Midheaven free to fall in the 9th, 10th or 11th house. They suit astrologers who see the Ascendant as the single anchor of the chart and the Midheaven as a point with its own meaning.",
      ],
    },
    {
      id: 'porphyry',
      title: 'Porphyry houses',
      paras: [
        "Porphyry houses are the simplest of the quadrant systems. The four angles fix the cusps of the 1st, 4th, 7th and 10th houses. The arc of the ecliptic between each pair of angles is then split into three equal parts. If the Midheaven is at 10 degrees and the Ascendant at 100 degrees, the arc of 90 degrees gives the 11th cusp at 40 and the 12th at 70.",
        "The method takes its name from the philosopher Porphyry of Tyre, who described it in his third century introduction to Ptolemy's Tetrabiblos, although an earlier description appears in Vettius Valens. It was the most common quadrant method of late antiquity. Its appeal is clarity: it respects all four angles and treats each quadrant fairly, and it never breaks down at high latitudes, even when the quadrants become very unequal.",
      ],
    },
    {
      id: 'alcabitius',
      title: 'Alcabitius houses',
      paras: [
        "Alcabitius is the first of the time-based systems. It looks at the degree of the Ascendant and measures its arc of time above the horizon, from rising to culminating, and its arc below. Each arc is divided into thirds, measured along the celestial equator, and the divisions are carried onto the ecliptic. The result follows the real turning of the sky more closely than Porphyry while staying simple to compute.",
        "The system is named after al-Qabisi, known in Latin as Alcabitius, a tenth century astronomer whose Introduction to Astrology became one of the most copied textbooks of medieval Europe. The method itself is older, and appears in earlier Greek and Arabic sources. It was the standard house system of the Latin Middle Ages until printed tables made Regiomontanus the favorite in the sixteenth century.",
      ],
    },
    {
      id: 'campanus',
      title: 'Campanus houses',
      paras: [
        "Campanus houses divide the prime vertical, the great circle that runs from the east point of the horizon, up through the zenith overhead, to the west point. That circle is cut into twelve parts of 30 degrees each, and great circles through the north and south points of the horizon carry each division onto the ecliptic.",
        "The system is linked with Campanus of Novara, a thirteenth century mathematician and chaplain to popes, though historians have found it described earlier in Arabic works. Because it divides the space around the observer, from horizon to horizon through the zenith, some astrologers prize it as the most faithful picture of the local sky. At high latitudes its houses become very unequal, and some can stretch across most of a sign or more.",
      ],
    },
    {
      id: 'regiomontanus',
      title: 'Regiomontanus houses',
      paras: [
        "Regiomontanus houses divide the celestial equator, starting from the Midheaven's right ascension, into twelve steps of 30 degrees. Great circles through the north and south points of the horizon carry each step onto the ecliptic. The method is a close cousin of Campanus: both use the same projecting circles and differ only in which great circle they divide.",
        "It is named after Johannes Müller of Königsberg, called Regiomontanus (1436 to 1476), whose Tabulae directionum, finished in 1467 and printed in 1490, gave astrologers ready tables for it. Historians trace the method itself to earlier astronomers in al-Andalus. Thanks to those printed tables it became the leading system of Renaissance and early modern Europe. William Lilly used it in Christian Astrology (1647), and horary astrologers who follow Lilly still use it today.",
      ],
    },
    {
      id: 'placidus',
      title: 'Placidus houses',
      paras: [
        "Placidus houses divide time, degree by degree. Every degree of the zodiac has its own arc above the horizon, from the moment it rises to the moment it culminates, and its own arc below. The cusp of the 11th house is the degree that has completed one third of its arc from the Midheaven toward rising; the cusp of the 12th, two thirds. The same rule below the horizon gives the 2nd and 3rd cusps. Because each degree's arc depends on its own position, the cusps have to be found by successive approximation, which made Placidus hard to compute before printed tables and computers.",
        "The system takes its name from Placidus de Titis (1603 to 1668), an Italian Benedictine monk and mathematician who set it out in his Primum Mobile (1657) as part of a broader method of timing events, which he believed followed Ptolemy. It became the most widely used system in the English-speaking world in the nineteenth century, largely because the cheap and popular tables of houses printed with Raphael's ephemeris were Placidus tables. Most astrology software still opens with Placidus by default.",
        "Placidus has one famous weakness. Near and beyond the polar circles, some degrees of the zodiac never rise or never set on certain days. Those degrees have no arc to divide, and the system has no answer. Charts for births in northern Scandinavia, Alaska or the far south need another system at such times. Astronomads uses Placidus as its main system and switches to whole sign houses when Placidus has no answer.",
      ],
    },
    {
      id: 'koch',
      title: 'Koch houses',
      paras: [
        "Koch houses also divide time, using a single arc for all the intermediate cusps: the arc of the Midheaven degree, as seen from the birthplace. Its time from rising to culmination is divided into thirds, and each third is turned into a rising degree. Supporters call it the birthplace system, because it ties every cusp to the horizon of the place of birth.",
        "It was developed by the German astrologer Walter Koch (1895 to 1970) and published in tables of houses in 1971, shortly after his death. It spread quickly in Germany and among psychological astrologers in the English-speaking world in the 1970s and 1980s. Like Placidus, it fails near the poles at some times of day, since the Midheaven degree itself may never rise.",
      ],
    },
    {
      id: 'morinus-and-meridian',
      title: 'Morinus and Meridian houses',
      paras: [
        "Two further systems divide the equator into twelve equal parts starting from the Midheaven's right ascension and ignore the horizon altogether. The Meridian system, also called axial rotation, carries each part to the ecliptic along the hour circles that run through the celestial poles. The Morinus system carries each part along circles through the poles of the ecliptic instead. In both, the first cusp lands near the Ascendant but rarely on it, and in Morinus the tenth cusp also differs slightly from the Midheaven.",
        "Morinus houses are named after Jean-Baptiste Morin (1583 to 1656), the French mathematician and royal astrologer whose Astrologia Gallica appeared after his death in 1661. Both systems give houses of nearly equal size at every latitude, which appeals to astrologers working with births in the far north. Their critics reply that a house system which leaves out the local horizon has lost the main reason houses differ from signs.",
      ],
    },
    {
      id: 'why-they-disagree',
      title: 'Why the systems disagree, and where',
      paras: [
        "At the equator, most quadrant systems give very similar cusps, because the horizon stands upright and the different ways of cutting the sphere nearly coincide. Move toward the poles and the horizon tilts more and more against the ecliptic. Some signs rise very quickly and others very slowly, and the quadrants between the angles become unequal. Each system shares out that inequality in its own way, so the intermediate cusps drift apart.",
        "The table below shows how much. It gives the size of each Placidus house, in degrees of the zodiac, for the same moment with 0 degrees of Aries on the Midheaven, at the equator, at 40 degrees north (Madrid, New York or Beijing) and at 60 degrees north (Oslo, Helsinki or Anchorage). At the equator the houses stay within a couple of degrees of 30. At 60 degrees north some houses shrink below 13 degrees while others swell past 50.",
        "Unequal houses produce interceptions. When a house is wider than a sign, a whole sign can sit inside it without touching either cusp; that sign is said to be intercepted, and the opposite sign is intercepted in the opposite house. Meanwhile, narrow houses can share a sign, so the same sign appears on two cusps in a row. Interceptions are common in quadrant systems at high latitudes and never happen in equal or whole sign houses.",
      ],
      figure: 'house-sizes',
    },
    {
      id: 'compare-your-chart',
      title: 'Compare the systems on your own chart',
      paras: [
        "The fastest way to understand the systems is to watch them work on a real chart. The tool below computes all ten systems for your birth time and place and shows each cusp and the house of every planet. Planets that change house between systems are highlighted. Most of the time the differences are small and fall on the planets near a cusp; at high latitudes they can be dramatic.",
        "Every calculation is checked in our tests against Swiss Ephemeris, the standard library in professional astrology software, to within 0.05 degrees at four places from the equator to 60 degrees north.",
      ],
      figure: 'house-compare',
    },
    {
      id: 'choosing',
      title: 'Choosing a house system',
      paras: [
        "No experiment has settled which house system is right, and astrologers who use each of them report charts that work. A practical approach is to choose a system for a reason you can state, use it consistently, and look closely whenever a key planet sits within a few degrees of a cusp, since that planet may belong to either house.",
        "Some reasons are historical: whole sign houses for those who work with Hellenistic methods, Regiomontanus for horary astrology in the style of Lilly, Placidus for those trained in the modern English tradition. Some are practical: equal or whole sign houses for births at high latitudes, where quadrant systems strain. Some are philosophical: a time-based system if you think houses should follow the daily motion of the planets, a space-based one if you think they should map the sky around the observer.",
        "A middle path, followed by many astrologers, is to read the chart with whole sign houses for topics and rulerships, and to treat the four angles and the quadrant cusps as additional sensitive points. A planet close to the Midheaven is prominent in every system, whatever house it is assigned to.",
      ],
      list: {
        title: 'Good habits with any system',
        items: [
          'Check the birth time source: the Ascendant moves about one degree every four minutes',
          'Watch planets within three degrees of a cusp; they speak for both houses',
          'Count hemispheres and quadrants from the angles, which every system shares',
          'For births beyond about 60° latitude, compare a quadrant system with whole sign houses',
          'Keep one system for a client’s chart and its forecasts, so the results stay comparable',
        ],
      },
    },
  ],
  faq: [
    {
      q: 'Which house system is the most accurate?',
      a: 'No study has shown one system to be more accurate than the others. Each is a different, coherent way of dividing the sky. Placidus is the most common in modern Western astrology, whole sign houses are the oldest and the standard in Indian astrology, and Koch and Regiomontanus have strong followings. Choose one for a reason and use it consistently.',
    },
    {
      q: 'Which house system does Astronomads use?',
      a: 'Our birth charts use Placidus houses. Near and beyond the polar circles, where Placidus has no answer at some times of day, we switch to whole sign houses and say so on the chart. The comparison tool in this article shows all ten systems for your own chart.',
    },
    {
      q: 'Why did my planet change house when I changed systems?',
      a: 'The systems agree on the Ascendant and differ on the other cusps. A planet a few degrees from a cusp can fall on either side depending on the system. Such a planet carries the meaning of both houses, with extra weight on the one it sits in under your chosen system.',
    },
    {
      q: 'What is an intercepted sign?',
      a: 'In a quadrant system, a house can be wider than 30 degrees and hold a whole sign without either cusp falling in it. That sign is intercepted. The opposite sign is intercepted in the opposite house. Interceptions are common for births far from the equator and never occur in equal or whole sign houses.',
    },
    {
      q: 'Why does Placidus fail near the poles?',
      a: 'Placidus divides each degree’s arc of time above and below the horizon. Beyond about 66 degrees of latitude, some degrees of the zodiac never rise or never set on certain days, so they have no arc to divide and the method has no answer. Koch has the same limit. The ecliptic-based systems work everywhere.',
    },
    {
      q: 'Is the Midheaven always the cusp of the 10th house?',
      a: 'In the quadrant systems, such as Placidus, Koch, Regiomontanus, Campanus, Porphyry and Alcabitius, it is. In equal and whole sign houses, the Midheaven floats and usually falls in the 9th, 10th or 11th house. Many astrologers using those systems read the Midheaven as a separate sensitive point.',
    },
    {
      q: 'Do house systems change my signs or aspects?',
      a: 'No house system changes the sign of any planet or the aspects between planets. Those come from the planets’ positions in the zodiac. House systems only change the house cusps, and so which house each planet occupies.',
    },
    {
      q: 'Which house system is best for horary astrology?',
      a: 'Many horary astrologers use Regiomontanus, the system William Lilly used in Christian Astrology (1647), because their techniques were developed with it. Others use whole sign houses following the older Hellenistic and medieval sources. Consistency with the methods you study matters more than the system itself.',
    },
  ],
  sources: [
    'Claudius Ptolemy, Tetrabiblos, 2nd century CE, translated by F. E. Robbins (Loeb Classical Library, 1940).',
    'Vettius Valens, Anthology, 2nd century CE.',
    'Porphyry of Tyre, Introduction to the Tetrabiblos, 3rd century CE.',
    'Johannes Regiomontanus, Tabulae directionum (completed 1467, printed 1490).',
    'Placidus de Titis, Primum Mobile (1657).',
    'William Lilly, Christian Astrology (1647).',
    'Jean-Baptiste Morin, Astrologia Gallica (1661).',
    'Margaret E. Hone, The Modern Text-Book of Astrology (1951).',
    'Walter Koch and Elisabeth Schaeck, Häusertabellen des Geburtsortes (1971).',
    'J. D. North, Horoscopes and History (Warburg Institute, 1986), the standard history of house division.',
    'James Herschel Holden, A History of Horoscopic Astrology (1996).',
    'Robert Hand, Whole Sign Houses: The Oldest House System (2000).',
    'Astrodienst, Swiss Ephemeris documentation, house systems chapter, used here to check every calculation.',
  ],
};
