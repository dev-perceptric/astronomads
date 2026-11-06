/**
 * Readings for the retrograde checker, the solar return and the lunar return tools.
 * Sign arrays: index 0 is Aries, 11 is Pisces. House arrays: index 0 is the 1st house, 11 is the 12th.
 * Original Astronomads copy.
 */

export type RetroPlanet = 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';

/** Each planet's retrograde: what the planet rules, what the retrograde period is like, being born with it retrograde, and 4 practical tips. */
export const RETRO: Record<RetroPlanet, { about: string; now: string; natal: string; tips: string[] }> = {
  mercury: {
    about: "Mercury is the planet of thinking and talking. It rules how you learn and how you speak, along with the short trips that fill a normal week. It also looks after messages, plans on paper and the gadgets that carry your words. Mercury rules Gemini and Virgo, so it links quick curiosity with careful attention to detail. When Mercury works well in your life, you notice more and explain things with ease.",
    now: "Mercury turns retrograde three or four times a year for about three weeks. Seen from Earth, it seems to slide backward through the zodiac, which makes this a good season for going over old ground. Messages may cross and deliveries may run late. An old friend could also send a text out of the blue. Use the time to edit and repair. Read things twice before you sign, and give yourself extra minutes for travel. Plans made now often get a second draft later, and that is fine.",
    natal: "Born with Mercury retrograde, you tend to think things through on your own before you speak. Your mind circles back, checks the details and finds the angle others miss. You may have learned in your own order, picking up hard ideas early and simple ones later. Give yourself time to reply in writing when you can. Your second thought is often your best one, so trust the pause.",
    tips: [
      "Back up your phone and laptop a few days before the station.",
      "Read every contract twice and ask one clear question before you sign.",
      "Leave ten extra minutes for travel and double check meeting times.",
      "Use these weeks to finish old drafts and answer emails you set aside.",
    ],
  },
  venus: {
    about: "Venus is the planet of love and of what you value. It shapes your taste in people and in the things you keep around you, and it shows how you give and receive affection. Venus also has a say in money, since what you spend on reveals what you treasure. It rules Taurus and Libra, linking simple comfort with fairness and grace. A strong Venus helps you make any room feel more welcoming.",
    now: "Venus turns retrograde about every 18 to 19 months and stays that way for roughly six weeks, about 40 to 43 days. During this stretch the heart likes to look back. Old flames may come to mind, and you might wonder what you truly want from love and from your money. It is a fine season to rethink a budget or pick up a hobby you used to enjoy. Many people prefer to wait on a dramatic makeover or a costly luxury until Venus moves forward again.",
    natal: "With Venus retrograde at birth, you tend to build your own private sense of beauty and love. Your tastes may differ a little from what is popular, and you often warm up to people slowly. Real closeness matters more to you than fast romance. Over time you learn what you value by looking back at what lasted. Trust your own style, since it often ages better than any trend.",
    tips: [
      "Review your budget and cancel one subscription you no longer enjoy.",
      "Hold off on big changes to your looks, like a bold haircut, until Venus goes direct.",
      "Reach out to an old friend whose company you miss.",
      "Wear or use something you already own and love instead of buying new.",
    ],
  },
  mars: {
    about: "Mars is the planet of drive and courage. It shows how you go after what you want and how you deal with anger when it rises. Mars rules Aries, and in traditional astrology it also rules Scorpio, so it joins quick action with deep staying power. Your energy for sport and hard work answers to Mars as well. A healthy Mars helps you start things and stand up for yourself.",
    now: "Mars turns retrograde about every 25 to 26 months and stays that way for roughly nine to eleven weeks, the longest stretch of the three closest planets. Drive can feel muffled, and projects that once moved fast may stall or need a fresh plan. This is a good time to repair your tools and rebuild your strength at a gentle pace. Old frustrations can rise again, so give anger a safe outlet like a brisk walk. Fresh battles can usually wait until Mars turns forward.",
    natal: "Born with Mars retrograde, you often hold your energy inside before you act. Others may think you are calm while you are really planning your next move. You tend to work best on your own schedule, building strength in private before you show it. Anger may surface slowly, so learn to name it early. When you finally move, you usually move with real purpose.",
    tips: [
      "Finish projects you already started before you launch anything brand new.",
      "Choose steady exercise like walking or swimming over sudden intense training.",
      "Count to ten and take a breath when old arguments flare up again.",
      "Service the car or fix your tools while the pace is slower.",
    ],
  },
  jupiter: {
    about: "Jupiter is the planet of growth and faith in the future. It rules higher learning and long journeys, along with the beliefs that give your life meaning. In traditional astrology it rules Sagittarius and Pisces, joining the urge to explore with a deep sense of trust. Jupiter shows where luck tends to find you and where you feel generous. Where Jupiter sits in your chart, you are often willing to take a hopeful chance.",
    now: "Jupiter turns retrograde once a year for about four months. Outer growth may slow down while inner growth picks up speed. You might rethink a belief or return to a course you set aside, and a plan you once rushed past may suddenly look wise. It is a helpful time to study and reflect before your next leap. Luck still shows up, often through second chances or people you already know. Look inward for the answers you used to seek far away.",
    natal: "With Jupiter retrograde at birth, your sense of meaning grows from the inside. You may question the beliefs you were raised with and arrive at your own wiser view in time. Good fortune often comes to you through patience and second chances. You tend to be generous in thoughtful, personal ways, and your faith in life usually deepens as you get older.",
    tips: [
      "Return to a book or course you once set aside.",
      "Write down what you truly believe about success and happiness this year.",
      "Hold off on overspending or overpromising while you sort out your bigger plans.",
      "Thank a mentor or teacher who helped you grow.",
    ],
  },
  saturn: {
    about: "Saturn is the planet of time and structure. It shows where you take on duty and where your goals need years of patient work. Saturn rules Capricorn and, in the traditional view, Aquarius, so it links ambition with careful planning for the group. Saturn can feel strict, yet its gifts last. What you build under Saturn tends to stand for a very long time.",
    now: "Saturn turns retrograde once a year for about four and a half months. Pressure from outside eases a bit, and you get room to check the foundations of your life. It is a good season to review your commitments and fix weak spots in your plans. Old duties may return so you can finish them properly this time. Think of it as a calm inspection of your house. Your work during these months usually pays off once Saturn turns direct.",
    natal: "Born with Saturn retrograde, you may have felt older than your age as a child, or set your own rules early. You tend to judge yourself by inner standards that can be tougher than anyone else's. Over time you grow into a wise and steady authority, often for yourself first. Be kind to the part of you that wants everything perfect. Your patience is a real strength.",
    tips: [
      "Review your long term goals and drop one that no longer fits.",
      "Fix a weak spot in your routine, like sleep or a messy budget.",
      "Finish an old task you keep pushing to next month.",
      "Praise yourself for steady effort, even when results arrive slowly.",
    ],
  },
  uranus: {
    about: "Uranus is the planet of change and sudden insight. It rules inventions and the urge to break old patterns. Uranus is the modern ruler of Aquarius and moves slowly, about seven years in each sign, so it shapes whole generations as well as personal turning points. In your own chart, Uranus shows where you need room to be different and where surprises tend to wake you up.",
    now: "Uranus turns retrograde once a year for about five months. Since it moves so slowly, the shift is felt more as an inner change than an outside shock. Ideas about freedom grow in private before they show up in daily life. You might rethink a habit that feels too tight or explore a new interest at your own pace. Small experiments work well now. When Uranus turns direct, those private ideas often find a real outlet in the world.",
    natal: "With Uranus retrograde at birth, your need for freedom tends to live inside you. You may look ordinary from the outside while your mind runs with original ideas. Change often comes to you as a slow inner shift instead of a sudden break. Trust your unusual views, and share them when you feel ready. Many people born this way grow bolder as they age.",
    tips: [
      "Try one small change in your routine each week and notice how it feels.",
      "Write down odd ideas before they fade, even if they seem wild.",
      "Give yourself room to rethink a choice you made in a hurry.",
      "Learn a new tool or skill at your own pace.",
    ],
  },
  neptune: {
    about: "Neptune is the planet of dreams and imagination. It rules art, music, faith and the feeling of being part of something larger. Neptune is the modern ruler of Pisces and spends about fourteen years in each sign. In your chart it shows where you are most sensitive and where you can lose track of what is real. A healthy Neptune brings compassion and creative vision.",
    now: "Neptune turns retrograde once a year for about five months. The fog of daily life may lift a little, and you might see a situation more clearly than before. Old hopes come back for a gentle review. It is a good time to check whether a dream still inspires you or simply pulls you away from what matters. Creative work and time near water can feel especially rich now. Let your intuition speak, then test it against plain facts.",
    natal: "Born with Neptune retrograde, you may sense the hidden side of things from a young age. Your imagination works inward, rich with images and feelings you share with only a few people. You may need more time to sort dreams from facts, and that care makes your vision stronger. Music or journaling can help you give your inner world a shape others can see.",
    tips: [
      "Check facts twice before you trust a promise that sounds too good.",
      "Spend time near water or with music to reset your mood.",
      "Keep a dream journal by your bed for a few weeks.",
      "Ask whether an old hope still lights you up, or let it go.",
    ],
  },
  pluto: {
    about: "Pluto is the planet of deep change and personal power. It rules what lies below the surface, like hidden fears and the slow rebirth that follows an ending. Pluto is the modern ruler of Scorpio, and its slow path through the signs marks whole generations. In your chart, Pluto shows where you face your strongest feelings and where you find the power to start over.",
    now: "Pluto turns retrograde once a year for about five months. This is a time for looking inward at power and control. You may notice old patterns in how you handle trust or shared money. Letting go of something that has run its course can feel freeing now. The process is slow and steady, more like cleaning out a basement than knocking down a wall. Honest talks with someone you trust can help you sort through what you find.",
    natal: "With Pluto retrograde at birth, your power tends to grow in private. You may think deeply about life and change from a young age, studying what makes people tick. Big shifts often happen inside you long before others see them. Trust your strength, and let yourself lean on people you trust during hard times. Your gift is the ability to rebuild from within.",
    tips: [
      "Clear out one closet or drawer that holds old memories.",
      "Notice where you try to control things and practice letting one go.",
      "Talk with a trusted friend or counselor about a pattern you want to change.",
      "Review shared money, like joint accounts or debts, with calm and care.",
    ],
  },
};

/** The solar return chart's rising sign: the tone of the year ahead. */
export const SOLAR_RETURN_ASC: string[] = [
  "A year with Aries rising feels fast and fresh. You may start new projects on impulse and feel more willing to speak up for yourself. People notice your energy and may look to you to lead. Pace yourself, since burnout can sneak in when every week feels urgent. A good plan is to choose one bold goal in your first month and give it real effort, with regular exercise to burn off extra drive.",
  "With Taurus rising, the year has a slower and steadier rhythm. Comfort and money come into focus, and you may want to build something that lasts. It is a good year to grow your savings or plant a garden. Change may feel slow, yet each step you take holds firm. Treat yourself to good food and plenty of rest, since your body sets the pace this year.",
  "A Gemini rising year is busy and full of conversation. You may take a class or start a side project tied to writing. Short trips and new contacts keep your calendar packed. Your mind races with ideas, so keep a list and pick the ones that matter most. Watch for spreading yourself thin. A daily walk without your phone can clear your head between plans.",
  "With Cancer rising, home and family set the tone of your year. You may move house or spend more time with relatives. Feelings run close to the surface, so give yourself a safe space to rest and recharge. Caring for others comes easily, and it helps to care for yourself just as kindly. Cooking at home or keeping a simple journal can steady your mood through the seasons.",
  "A Leo rising year asks you to step forward and be seen. Creative projects and romance get more of your attention, and you may feel more confident sharing your talents. It is a good year to show your art or lead a team. Generosity draws people to you. Keep your heart open to praise and to honest feedback, since both help you shine brighter.",
  "With Virgo rising, the year has a practical, improving tone. Health and daily routines come up for review. You may finally fix the small things that wore you down, like a messy schedule or poor sleep. Building skills pays off now. Keep an eye on worry, since you may notice every flaw. A weekly checklist can turn that sharp eye into steady progress you can measure.",
  "A Libra rising year centers on partners and balance. Close relationships, both personal and professional, take up more of your time and thought. You may make a new partnership official or rethink one that feels uneven. Beauty matters more too, so a fresh look or a calmer home can lift you. Practice saying what you want clearly, since keeping the peace at any cost can wear you out.",
  "With Scorpio rising, the year runs deep. You may face strong feelings and big choices about trust. Something that has run its course could end, making room for real renewal. Privacy feels important, and you might share your plans with only a few people. Research and honest self study both suit this year. Your focus is intense, so aim it at one goal that truly matters to you.",
  "A Sagittarius rising year feels open and adventurous. Travel and study may call to you, and you could rethink your beliefs along the way. Say yes to chances that stretch your world, like a trip abroad or a class on a subject you love. Your honesty and humor draw people in. Watch for promising more than you can deliver in your excitement.",
  "With Capricorn rising, the year has a serious, goal driven tone. Career and long term plans come first, and you may take on more responsibility at work or at home. Progress can be slow, yet the results tend to last for years. Set clear yearly goals and break them into monthly steps. Make room for rest too, since a year of hard work runs better with real breaks built in.",
  "An Aquarius rising year brings change and new connections. You may join a new group or rethink who you want to be. Friends and community play a bigger role than usual, and surprises can shake up your plans in helpful ways. It is a good year to follow an original idea, even an odd one. Keep some freedom in your schedule so you can say yes when something exciting turns up.",
  "With Pisces rising, the year feels softer and more intuitive. Art and spiritual life may call to you, and your feelings for others run deep. It is a good year for creative work or for helping people in need. Boundaries matter, since you may absorb other people's moods. Get plenty of sleep and trust your gut, then check the facts before any big decision.",
];

/** The Sun's house in the solar return chart: where the year's focus goes. */
export const SOLAR_RETURN_SUN_HOUSE: string[] = [
  "With the Sun in the 1st house of your solar return, this year is about you. Your goals and your image take center stage. You may change your look or start a personal project you have wanted for a while. People notice you more, so it is a fine year to step up. Take care of your body as you push forward, and let your own needs count.",
  "The Sun in the 2nd house points the year toward money and self worth. You may focus on earning more or rethinking how you spend. A new skill could lead to new income. This is also a year to look at what you truly value. Track your spending for one month and see what it tells you about your real priorities.",
  "With the Sun in the 3rd house, the year's focus moves to learning and talking. You may take a short course or spend more time with siblings and neighbors. Short trips and busy days fill your calendar. Your words carry weight this year, so speak with care and share your ideas. A newsletter or a weekly call with family can be a great outlet.",
  "The Sun in the 4th house brings the year's focus home. You may move or spend more time with family. Old memories and roots may matter more, and a parent could need your attention. It is a good year to build a solid base for what comes next. Make your living space feel like a real retreat, even with small changes like new lighting or a comfy chair.",
  "With the Sun in the 5th house, joy and creativity lead the year. Romance and hobbies may light you up, and you may feel playful again. It is a great year to start a creative project or take up a sport you love. Let yourself have fun without needing it to be useful. If you have kids, special time with them can become a highlight of the year.",
  "The Sun in the 6th house puts the focus on work and health. Daily routines come up for review, and small changes can make a big difference. You may take on new tasks or finally tackle a health habit. Being useful feels rewarding this year. Watch for overwork, and build a short daily break into your schedule. A pet may also bring you comfort and structure.",
  "With the Sun in the 7th house, partners take center stage. A marriage or a business deal may shape the year. You learn about yourself through the people closest to you, and teamwork goes well when roles are clear. If a relationship needs work, this is a good time for honest talks. Notice how much you give and take, and aim for a fair balance on both sides.",
  "The Sun in the 8th house turns the year toward deep change. Shared money and trust come into focus. You may sort out a loan or joint finances with a partner. Emotions run deeper, and you might let go of an old fear. This is a good year for therapy or any work that digs below the surface. Treat each ending as a fresh start in disguise.",
  "With the Sun in the 9th house, the year opens your horizons. Travel and higher learning may call to you. You might plan a trip abroad or start a degree. Big questions about meaning feel alive. Share what you learn by teaching or writing, since passing it on helps it sink in. Stay open to people whose views differ from yours, as they can teach you the most.",
  "The Sun in the 10th house puts your career and public image in focus. You may step into a leadership role or earn more notice at work. Your efforts are more visible this year, so give your best. Set a clear career goal and share it with a mentor. Balance ambition with time for home, since success feels better with support behind you.",
  "With the Sun in the 11th house, friends and groups shape the year. You may join a club or make new friends who share your hopes. Teamwork brings good results, and networking can open doors. It is a fine year to dream about your future and set a few long range goals. Say yes to group events, even if you usually prefer to stay home.",
  "The Sun in the 12th house makes this a year for rest and reflection. You may spend more time alone or heal from the past. Life can feel slower on the outside while much changes within. Journaling and long walks help you recharge. Helping others in modest ways, like volunteering, can feel rewarding. Use the year to close old chapters before a fresh start next birthday.",
];

/** The Moon's sign in the solar return chart: the emotional weather of the year. */
export const SOLAR_RETURN_MOON_SIGN: string[] = [
  "With the Moon in Aries this year, your feelings move fast and come out quickly. You may feel braver about saying what you need. Moods can flare and fade within an hour. Physical activity is your best emotional reset, so keep a gym bag ready. Pause before reacting to small upsets, and this year can fill you with fresh emotional courage.",
  "A Taurus Moon in your solar return brings calmer emotional weather. You crave comfort and steady routines, and simple pleasures soothe you most. Good meals and time outdoors help you feel safe. Change may feel unsettling, so bring it in slowly. This is a year to build emotional security that lasts, one cozy habit at a time.",
  "The Moon in Gemini makes this a chatty, curious year for your feelings. You process emotions by talking or writing them out, and your moods can shift quickly with the news. Keep a journal or a trusted friend close when things feel tangled. Light reading and short trips can lift your spirits. Watch for overthinking late at night, and set your phone aside before bed.",
  "With the Moon in Cancer, your feelings run deep and close to home this year. Family ties and old memories stir strong emotions. You may want to nest and care for others. Protect your energy by giving most of your time to people who give back. A cozy space at home becomes your refuge. Let yourself cry when you need to, since it clears the air.",
  "A Leo Moon brings warm and expressive emotional weather this year. You want to feel seen and appreciated, and you may need more praise than usual. Creative play and romance lift your heart. Share your feelings openly, since honesty brings people closer. On low days, do something fun just for you, like dancing in the kitchen or dressing up for no reason at all.",
  "With the Moon in Virgo, you handle feelings by fixing and organizing. A clean desk or a finished task can calm you more than a long talk. You may worry more than usual about health or small details. Gentle routines help, like a morning walk or a set bedtime. Remember to be as kind to yourself as you are helpful to others.",
  "A Libra Moon makes harmony your main emotional need this year. You feel best when your relationships run smoothly and your home looks pleasant. Conflict can unsettle you, and you may try to smooth it over too fast. Practice saying what bothers you in a calm way. Beautiful music and time with a partner can soothe your mood on hard days.",
  "With the Moon in Scorpio, emotions run strong and private this year. You may feel things intensely and need time alone to process them. Trust becomes a big theme, and you will want depth over small talk. Old wounds may surface so they can heal. Therapy or a deep talk with one trusted friend can help you let go of what weighs on you.",
  "A Sagittarius Moon brings hopeful, restless emotional weather. You need room to roam, through travel or new ideas. Humor helps you through hard moments, and a change of scene can reset your mood. Feeling hemmed in may make you edgy, so plan regular escapes. Even a day trip or a new hiking trail can lift your spirits this year.",
  "With the Moon in Capricorn, you may keep your feelings tidy and private this year. Work and duty can become your way of coping, and you feel safest when you have a plan. Allow yourself to rest without earning it first. A trusted mentor or an older relative may offer steady support. Small rewards for hard work help balance the serious mood.",
  "An Aquarius Moon makes your emotional life more independent this year. You may need more space than usual and feel close to friends or groups who share your values. Feelings might pass through your head before they reach your heart. Try new ways to unwind, like an online class or a group hobby. Let yourself be different, and give others the same freedom.",
  "With the Moon in Pisces, your feelings are soft and sensitive this year. You may pick up other people's moods without meaning to. Your intuition feels strong, and dreams may carry messages worth noting. Creative work and time near water help you recharge. Set gentle boundaries so your kindness stays a gift. A short daily rest with music can restore you when the world feels loud.",
];

/** The Moon's house in a lunar return chart: where feelings and needs gather this month. */
export const LUNAR_RETURN_MOON_HOUSE: string[] = [
  "With the Moon in the 1st house of your lunar return, your feelings show on the surface this month. People can read your mood quickly. You may want to change your look or focus on self care. Listen to your body, and rest when it asks. Small acts for yourself, like a new haircut or an early night, can lift your mood.",
  "The Moon in the 2nd house brings money and comfort into your emotional focus this month. You may feel calm when your bills are paid and uneasy when they pile up. Treat yourself to simple pleasures that cost little. It is a good month to sort your budget or sell things you no longer use. Your sense of worth runs deeper than any account balance.",
  "With the Moon in the 3rd house, your feelings move through conversation this month. Calls with siblings or neighbors fill your days. You may feel restless and need to talk things out. Writing in a journal helps you sort your thoughts, and short trips around town can refresh you. Be gentle in what you say, since your words land harder now.",
  "The Moon in the 4th house makes home your emotional center this month. You may want to stay in and spend time with family. Old memories may come back, especially around parents or childhood. A small home project, like clearing a shelf, can make you feel settled. Give yourself extra rest, since you are more sensitive than usual.",
  "With the Moon in the 5th house, your heart wants fun this month. Romance and play bring you joy, and you may feel more creative than usual. Plan a date night or try a new craft. Time with children or a pet can be especially sweet. Let yourself enjoy things for their own sake, without needing them to be useful.",
  "The Moon in the 6th house brings your feelings into your daily work and health this month. A tidy routine helps you feel calm. You may notice how stress affects your body, so watch your sleep and meals. Helping coworkers can feel rewarding, though you should guard your time. A simple habit, like a short walk after lunch, can steady your month.",
  "With the Moon in the 7th house, your feelings center on partners this month. You may crave closeness and want to share more with someone you love. Business partners and close friends matter too. Moods can rise and fall with how others treat you. Talk openly and ask for what you need. Kind words go a long way now.",
  "The Moon in the 8th house makes this an intense month for your feelings. Trust and shared money may stir strong emotions. You might want to dig deep into a problem or let go of something old. Privacy feels important. Honest talks with a partner can bring you closer. A long bath or a calm evening can help you release what you no longer need.",
  "With the Moon in the 9th house, your heart wants adventure this month. You may feel restless at home and long for travel or new ideas. Studying or talking with someone from a different background can lift you. Plan a day trip if a long one is out of reach. Your beliefs may shift a little, and that can feel exciting.",
  "The Moon in the 10th house puts your feelings on display at work this month. Career events may stir your emotions, and you may care a lot about how bosses see you. Others notice your mood more than usual. Stay calm in public and save venting for trusted friends. A small win at work can boost your confidence for weeks.",
  "With the Moon in the 11th house, friends and groups shape your mood this month. You may feel happiest among people who share your interests. It is a good month to reconnect with old friends or join a club. Your hopes for the future feel strong. Write down one wish and take a small step toward it before the month ends.",
  "The Moon in the 12th house makes this a month for rest and reflection. You may feel tired or more sensitive than usual and want time alone. Dreams can be vivid, so keep a notebook by the bed. Gentle routines like meditation or long baths help you recharge. Let this be a pause before your next lunar return brings fresh energy.",
];

/** The lunar return chart's rising sign: the mood of the month. */
export const LUNAR_RETURN_ASC: string[] = [
  "An Aries Ascendant in your lunar return gives the month a quick, bold mood. You may feel ready to start something and have little patience for delays. Energy runs high, so use it for exercise or a task you have been avoiding. Watch for snapping at people when you feel rushed. A morning run or a brisk walk can set a good tone for each day.",
  "With Taurus rising, the month settles into a calm, steady mood. You may want comfort and slow evenings. It is a good time to tend your budget or your garden. Change may feel unwelcome, so ease into new plans. Treat yourself to small pleasures, like fresh bread or a long soak, and let the month move at its own pace.",
  "A Gemini Ascendant brings a lively, talkative mood to the month. Your phone may buzz more and your schedule may fill quickly. Curiosity runs high, so it is a good time to learn something new. Your attention can scatter, so keep a simple to do list. Chats with neighbors or siblings may bring useful news.",
  "With Cancer rising, the month takes on a tender, homey mood. You may feel more sensitive and want to stay close to loved ones. Caring for others feels natural, so give yourself the same care you give them. Memories may surface, and it helps to let them pass gently. A calm evening at home with a favorite meal can reset your feelings when the days get busy.",
  "A Leo Ascendant gives the month a bright, confident mood. You may want to be noticed and feel ready to share your ideas or talents. Fun and creative play call to you. It is a good month to plan a party or show your work. Stay generous with praise for others too, and the spotlight will feel even warmer.",
  "With Virgo rising, the month feels practical and busy. You may want to organize your space and look after your health. Small improvements bring big satisfaction. Watch for being too hard on yourself over small mistakes. A short, clear list each morning helps you feel in control without overdoing it.",
  "A Libra Ascendant brings a gentle, social mood to the month. You may focus on partners and want things to feel fair and pleasant. It is a good time for date nights or patching up a disagreement. Beauty lifts your spirits, so bring flowers home or rearrange a room. Speak up kindly when something feels off balance.",
  "With Scorpio rising, the month carries a deep, private mood. You may feel more intense and pay closer attention to what others leave unsaid. Trust matters a lot right now. It is a good month to solve a stubborn problem or end a habit that drains you. Keep your plans close until they are ready to share.",
  "A Sagittarius Ascendant gives the month a hopeful, restless mood. You may want to break routine or learn about a new subject. Laughter comes easily, and your outlook feels bigger. Watch for taking on too much in a rush of excitement. A weekend outing or a new book can feed your hunger for adventure.",
  "With Capricorn rising, the month takes on a serious, focused mood. You may feel driven to get work done and meet your goals. Responsibility weighs more, and so does pride in a job well done. It is a good month to plan ahead and set clear priorities. Make room for rest, since steady effort works better with breaks.",
  "An Aquarius Ascendant brings an independent, curious mood to the month. You may want more space and less routine. Friends and group projects draw you in. Fresh ideas spark easily, so jot them down. It is a good time to try something different, like a new app or a new route to work. Give yourself freedom, and give it to others as well.",
  "With Pisces rising, the month feels soft and dreamy. You may be more sensitive to other people's moods and need extra rest. Music and time near water help you recharge. Your intuition is strong, so pay attention to your gut feelings. Keep your boundaries clear, and double check important details before you commit.",
];
