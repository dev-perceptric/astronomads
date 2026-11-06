/**
 * Readings for the cycle tools: the Saturn return, secondary progressions and planetary hours.
 * Sign arrays: index 0 is Aries, 11 is Pisces. House arrays: index 0 is the 1st house, 11 is the 12th.
 * Original Astronomads copy.
 */

/** Saturn return by natal Saturn's house: the area of life the return reshapes. */
export const SATURN_RETURN_HOUSE: string[] = [
  "This return centers on you as a person, on your body and the way you meet the world. You may outgrow an old image and want one that fits the adult you have become. It is a good season to set a health routine you can keep for years, like a long walk every Sunday, and to drop roles you took on only to please others. People tend to notice a calmer, more grounded you by the end.",
  "This return reshapes your money and your sense of worth. Saturn asks you to earn in a way that fits your real skills and to spend in line with what you value. Many people start their first true budget during these years, or ask for a fair raise with numbers in hand. The work is steady, and the reward lasts: a firmer floor under your feet and a clear idea of what your time is worth.",
  "This return reshapes how you think and speak. You may commit to a skill like writing or a second language, or learn to say what you mean in fewer words. Ties with siblings and neighbors can grow more grown up too. A useful habit now is to finish the books you start and to write out a plan before you share it. People begin to give your words more weight because you back them up.",
  "This return reshapes home and family, the base you stand on. You might rent or buy the first place that feels truly yours, or take on more care for a parent. Old family patterns become easier to see, and you get to choose which ones to keep. Start small, like fixing the drawer that has stuck for months. Each repair at home tends to steady something inside you as well.",
  "This return reshapes joy and the things you create. Saturn asks you to treat your talents with respect, so a hobby may turn into a real practice with a schedule. Some people make a serious promise in love or welcome a child during these years. Fun can feel weighty for a while, and that is fine. Book one regular slot each week for the creative work that matters most to you, and guard it.",
  "This return reshapes your daily work and your health habits. Saturn looks at how your days really run and asks for routines that hold you up over the long haul. You may set clearer limits on overtime, or finally book the checkup you keep moving. Pick two habits, such as a fixed bedtime and a packed lunch, and keep them for a full season. Small steady changes add up to real strength.",
  "This return reshapes your close partnerships, in love and in business. Saturn tests which bonds can carry real weight, and many people make a firm commitment or end a tie that has run its course. Either way, you learn what a fair deal looks like for you. Before any big promise, talk through money and shared chores in plain terms. Clear agreements now give your relationships a solid frame for years.",
  "This return reshapes shared money and deep trust. Loans, taxes, joint accounts and debts may all ask for attention, so it helps to list what you owe and make a payoff plan. Emotionally, Saturn asks you to share closeness with care and to release control you never needed. A frank talk with a partner about money can feel heavy at first and bring real relief after. You come out of this stronger and lighter.",
  "This return reshapes your beliefs and your path of learning. You may finish a degree or take a trip that changes how you see the world. Saturn asks you to test your ideas against real life and keep the ones that hold up. Choose one teacher or one practice and go deep with it for a year. By the end, your personal philosophy becomes something solid you can lean on in hard moments.",
  "This is the classic career return, since Saturn comes home to the top of your chart. Your public role and your long goals take center stage. Promotions and bigger duties often arrive here, along with an honest look at whether your path still fits. Write down where you want your work to stand in ten years, then pick one step for this year. Effort you make now tends to be noticed by the right people.",
  "This return reshapes your friendships and your hopes for the future. You may notice which groups still feel like home and which ones you have outgrown. Saturn favors fewer, truer friends and goals with real plans behind them. A club or team with a shared purpose can bring lasting ties. Try writing a five year goal on paper, then share it with one friend who will check in with you twice a year.",
  "This return reshapes your inner life and the parts of you that work behind the scenes. Old worries or habits may come up so you can finally set them down. Rest becomes a real need, and time alone helps you sort things out. A steady practice, like a short morning journal or a weekly walk by yourself, gives this season a shape. You finish the return with less weight to carry and a calmer mind.",
];

/** Saturn return by natal Saturn's sign: the lesson and the style of the return. */
export const SATURN_RETURN_SIGN: string[] = [
  "With Saturn in Aries, your return teaches you to lead with patience. You likely have plenty of courage, and now you learn to aim it. Quick starts become planned starts, and flashes of anger turn into steady self respect. A good practice is to wait one full day before launching anything big. The style of this return is direct and active, so moving your body every day helps you handle pressure well.",
  "With Saturn in Taurus, your return teaches you to build real security and to trust your own worth. Money and simple comforts may become the focus. The style is slow and steady, and that suits the lesson. Set up one automatic savings transfer, even a small one, and let it grow untouched for the whole return. You learn that true safety comes from patient habits and from knowing what you value.",
  "With Saturn in Gemini, your return teaches you to focus a busy mind. Ideas may come easily to you, and now you learn to finish them. Speaking with care and checking facts become real strengths. The style is curious and mentally active, so study and writing help a lot during these years. Try choosing one subject and learning it well enough to teach a friend over coffee.",
  "With Saturn in Cancer, your return teaches you to care for others while caring for yourself as well. Family ties and the meaning of home come into focus. The style is emotional and protective, so feelings may run deep for a while. Set kind limits with relatives, such as a regular Sunday call in place of daily check ins. You learn that strong roots and soft feelings can grow side by side.",
  "With Saturn in Leo, your return teaches you to stand in your own light with confidence. You may have held back your gifts or waited for praise before trying. Now you learn to create and lead because it matters to you. The style is warm and heartfelt. Share one piece of your work in public, such as a song at an open mic or a story online, and notice how steady you feel afterward.",
  "With Saturn in Virgo, your return teaches you to keep high standards that still leave room for being human. Work and daily order take focus, and you may want to tidy every part of life at once. The style is careful and practical. Choose the few routines that help most and let the rest relax. You learn that a job done well and on time often serves people better than a perfect one done late.",
  "With Saturn in Libra, your return teaches you to build fair, balanced partnerships. Saturn works especially well in this sign, so the lessons often arrive with clarity. You may look hard at who gives and who takes in your close ties. The style is thoughtful and diplomatic. Practice saying what you need in one calm sentence before a talk gets heated. You learn that fairness includes being fair to yourself.",
  "With Saturn in Scorpio, your return teaches you to trust with open eyes. Questions of control and loyalty may rise to the surface. The style is intense and private, and you may prefer to sort things out alone first. Choose one trusted person and talk with them honestly, perhaps on a long drive where the mood feels safe. You learn that real strength includes letting others in, and you come through with deep resilience.",
  "With Saturn in Sagittarius, your return teaches you to turn big beliefs into real commitments. You may love freedom and new horizons, and now you learn to choose a direction and stay with it. The style is hopeful and searching, often tied to study or travel. Pick one long goal, like a degree or a new language, and set a yearly check in on your birthday. Your wisdom becomes something others can count on.",
  "With Saturn in Capricorn, its own sign, your return tends to feel clear and purposeful. Ambition and long plans move to the front. You may already take your goals seriously, so the lesson is to build wisely and also make time for rest. The style is steady and organized. Sketch your next five years in broad strokes, then add one fun plan to each month. Hard work pays off especially well here.",
  "With Saturn in Aquarius, a sign it rules in the older tradition, your return teaches you to belong while staying fully yourself. Groups and big ideas take focus. The style is independent and forward looking. You may find a community that shares your values, or help shape one from scratch. Commit to one cause or circle for a full year. You learn that your unusual views do real good when you share them steadily.",
  "With Saturn in Pisces, your return teaches you to give shape to your dreams and gentle limits to your kindness. You may feel things deeply and soak up other people's moods. The style is soft and intuitive, so rest and creative time matter a great deal. A simple daily anchor, like the same evening walk, can steady you. You learn that firm boundaries help your compassion last much longer.",
];

/** Each return stage: first (about age 29), second (about 58), third (about 88). */
export const SATURN_RETURN_STAGE: { first: string; second: string; third: string } = {
  first:
    "Your first Saturn return arrives somewhere between ages 27 and 30, and it often feels like the true start of adult life. Choices you made earlier about work or love get a closer look, and you keep the ones that feel honestly yours. Some people change course, while others commit more fully to the path they already chose. Both are healthy. Give yourself time to decide, and talk with someone older who has been through it. The effort you put in now builds a base for the next thirty years.",
  second:
    "Your second Saturn return comes around ages 56 to 60 and brings a chance to review your life with more wisdom. You may rethink your work and plan where your energy goes next. Many people find this return freeing, because they care less about proving themselves. It is a good time to mentor someone younger and to put your health first, for example with a strength routine you enjoy. Think about what you want the coming decades to hold, and build toward it with the patience you have earned.",
  third:
    "Your third Saturn return arrives around ages 85 to 89, and reaching it is an achievement in itself. This return often turns toward legacy and the people you love. You may want to pass on family stories and recipes, or put your affairs in calm order so everyone feels at ease. Saturn here supports simple routines and steady comfort. Spend time on what brings you peace, and let others help you as you once helped them. Your long view of life is a gift to everyone around you.",
};

/** Where you are in the cycle: approaching (Saturn has entered your natal Saturn sign), exact (within a degree), after (leaving the sign), between (most of the 29 years). */
export const SATURN_NOW: { approaching: string; exact: string; after: string; between: string } = {
  approaching:
    "Saturn has entered the sign it held when you were born, so your return season has begun. This is a time to get ready. Look at where your life feels solid and where it feels shaky, and start small repairs now. You may sense more responsibility or a wish to get serious about a goal, and that is normal. Use these months to gather facts and talk things through with people you trust. The exact pass comes later, and early work makes it much smoother.",
  exact:
    "Saturn is within a degree of its place in your birth chart, which is the peak of your return. Because Saturn sometimes moves backward in the sky, this exact touch can happen once or three times over several months. Choices made now tend to last. Keep your focus on one or two priorities and give them steady effort each week. Rest well and lean on people who care about you. The pressure may feel strong, and so does your ability to meet it.",
  after:
    "Saturn is moving on from your natal Saturn sign, and the return is winding down. Look back at what changed, such as a new role or a firmer sense of who you are. You may feel lighter now that the heavy lifting is done. This is a good time to settle into the structures you built and to enjoy them. Keep the healthy habits you started, since they will carry you well through the years ahead. Take a moment to thank yourself for the work.",
  between:
    "Saturn is far from its birth place in your chart, so you are in the long middle of the cycle. This stretch covers most of the 29 years between returns, and it is where steady growth happens. Use this time to build skills and relationships at your own pace. Pick one long goal and give it a little attention each month, like a savings plan or a craft you practice on weekends. When your next return comes, you will meet it with a strong base already in place.",
};

/** The eight progressed lunation phases, in order New, Crescent, First Quarter, Gibbous, Full, Disseminating, Last Quarter, Balsamic. */
export const PROG_MOON_PHASE: { name: string; text: string }[] = [
  {
    name: 'New',
    text: "A new progressed lunation begins a fresh cycle of about thirty years. Life may feel unclear at first, like planting a seed in the dark. You sense that something is starting, even when you can see only a small part of it. Follow your instincts and try new things without any pressure to explain them yet. Keep a notebook of ideas and small signs that catch your eye. Over the next three or four years, the shape of this new chapter will slowly come into view.",
  },
  {
    name: 'Crescent',
    text: "In the crescent phase, the new chapter begins to push forward, and old habits may tug you back. You might feel torn between the comfort of the past and the pull of something fresh. That tension is a sign of growth. Take steady steps toward what is new, even small ones like a class or a move across town. Clear out a few things from the last cycle that weigh you down. Your confidence grows each time you choose the future over the familiar.",
  },
  {
    name: 'First Quarter',
    text: "The first quarter phase is a time for action and bold choices. The plans that started a few years ago now need real effort to take shape. You may face obstacles that test how much you want this new direction, and it helps to meet them head on. This is a strong time to build and commit, whether that means a new business or a new home. Make decisions with the energy you have, and fix the details as you go. What you set up now forms the frame of the whole cycle.",
  },
  {
    name: 'Gibbous',
    text: "In the gibbous phase, you refine what you have built. Things are well underway, and the focus turns to making them better. You may take a course or ask a mentor for honest feedback on the work that matters most. It can feel like a long stretch of effort before the payoff, so patience helps. Adjust one thing at a time and track your progress in a simple list. This careful polishing prepares you for the clear results that arrive with the next phase.",
  },
  {
    name: 'Full',
    text: "The full phase brings the cycle into clear light. What you started about fifteen years earlier now shows its results, and you can see what worked. Relationships often take center stage, and other people may reflect back who you have become. This can be a season of recognition and honest insight. Some goals reach their peak, while others reveal that they need to change. Celebrate what has grown, perhaps with a gathering of the people who helped, and stay open to what you learn about yourself.",
  },
  {
    name: 'Disseminating',
    text: "In the disseminating phase, you share what you have learned. The results of the cycle are in, and now you pass them along. You may teach, mentor, write or speak about your experience. People often seek your advice during these years, sometimes more than you expect. It is a good time to give back to your community and to spread ideas you care about. Your knowledge feels more useful when it reaches others, so look for one way each month to share a skill.",
  },
  {
    name: 'Last Quarter',
    text: "The last quarter phase brings a turning point in how you see the whole cycle. You may outgrow roles or habits that once felt right, and that is a healthy sign. Change often begins inside, as a shift in values, before it shows in your outer life. Let go of the old with kindness, like giving away clothes you no longer wear or stepping back from a committee. Make room for the next chapter, even before you know what it will hold.",
  },
  {
    name: 'Balsamic',
    text: "The balsamic phase is the last part of the cycle, a time of rest and release before a fresh beginning. You may feel more inward and drawn to reflection. Old stories come together and finish. It helps to slow down and spend time alone, maybe with long walks or an early bedtime. Hints of the future may show up in dreams or sudden ideas, so jot them down. Hold off on forcing big launches. In a few years a new cycle begins, and the rest you take now gives it a strong start.",
  },
];

/** The progressed Moon in each sign: the emotional chapter of about two and a half years. */
export const PROG_MOON_SIGN: string[] = [
  "With your progressed Moon in Aries, the next two and a half years bring fresh emotional energy. You may want to start something new and feel restless with the old. Your feelings come fast and direct, so speak up when something matters. This is a good time to take a first step you have been putting off, like signing up for a race. Watch for a quick temper and give it a healthy outlet, such as a morning run.",
  "With your progressed Moon in Taurus, you seek comfort and steady ground for about two and a half years. Your mood settles when life feels secure. You may focus on savings and simple pleasures, like a good loaf of bread or a small garden. Slow down and enjoy what you already have. This is a good chapter to build lasting habits and to rest your nerves after busier years.",
  "With your progressed Moon in Gemini, your mind feels busy and curious for the next two and a half years. You want to talk and learn. Short trips and new books can lift your mood fast. Your feelings may change often, so writing them down helps you see the pattern. This is a good time to take a class or catch up with siblings and old classmates. Stay open to new ideas and new friends.",
  "With your progressed Moon in Cancer, home and family come to the center of your heart for about two and a half years. You may want to nest and spend more evenings with loved ones. Feelings run deep, and you might feel more tender than usual. Make your space cozy and safe, even with something as simple as new curtains. This is a good time to heal old family ties. Let others care for you too.",
  "With your progressed Moon in Leo, you want to shine and express yourself for the next two and a half years. Joy and creative work feed your heart. You may enjoy being seen and appreciated, so share your talents openly. Romance and fun may play a bigger role than before. Try a creative hobby, such as painting or acting in a local play. Let yourself feel proud of what you make.",
  "With your progressed Moon in Virgo, you feel calmer when life is in order, for about two and a half years. Health and daily routines may take focus, and helping others brings real satisfaction. It is a good time to clean out a closet or start an exercise plan you can track. Watch for worry or being too hard on yourself. Small, steady improvements feel deeply rewarding in this chapter.",
  "With your progressed Moon in Libra, relationships and balance shape your mood for the next two and a half years. You may want a partner, or closer bonds with the friends you already have. Harmony feels important, and you may go out of your way to smooth over conflict. Practice sharing decisions, like taking turns picking the weekend plan. Enjoy art and beauty, and make sure your own needs count too.",
  "With your progressed Moon in Scorpio, feelings run deep and strong for about two and a half years. You may want honest, close ties and real change. Old emotions can rise up so you can heal them at last. This is a good time for deep talks or for working with a counselor. Trust grows slowly in this chapter, so let it build at its own pace. You come out of it with more strength and self knowledge.",
  "With your progressed Moon in Sagittarius, your heart longs for freedom and adventure for the next two and a half years. You may want to travel or explore new ideas about life. Optimism rises, and you look for meaning in what you do. Plan a trip or sign up for a course on a subject that excites you. Keep an eye on your limits so your plans stay realistic. This chapter widens your view.",
  "With your progressed Moon in Capricorn, you feel steadier when you work toward a clear goal, for about two and a half years. Career and long plans may take focus, and you might feel more serious than usual. Set one big goal and break it into monthly steps. Remember to rest and to share your feelings with someone you trust, even when you would rather keep going. The structure you build now supports your future.",
  "With your progressed Moon in Aquarius, you want independence and new ideas for the next two and a half years. Friends and causes may become more important. You might feel a bit detached at times, which can give you a useful clear view of old problems. It is a good time to join a club or try something unusual, like a coding class or a stargazing group. New friendships can bring fresh hope.",
  "With your progressed Moon in Pisces, your feelings turn soft and dreamy for about two and a half years. You may feel more intuitive and caring. Music and time alone can help you recharge. Watch for taking on other people's moods, and set gentle limits when you need them. This is a good time for creative work or a spiritual practice, even ten minutes a day. Trust your inner voice as it grows clearer.",
];

/** The progressed Sun in each sign: the long chapter of about thirty years. */
export const PROG_SUN_SIGN: string[] = [
  "With your progressed Sun in Aries, a chapter of about thirty years begins with courage and fresh starts. You may feel more willing to lead and to take smart risks. Your sense of self grows bolder and more direct. This is a good era to begin projects that are truly yours, like a small business or a solo trip. Practice patience so your energy lasts the whole journey. You grow by acting on your ideas.",
  "With your progressed Sun in Taurus, the next three decades bring a focus on stability and worth. You want to build something solid, whether a home or a lasting skill. Your pace may slow, and the simple rewards of life feel richer. This is a good era to grow your savings through patient effort, a little each month. Stay open to change when it helps you. You grow by valuing what truly matters.",
  "With your progressed Sun in Gemini, a long chapter of about thirty years opens your mind to learning and connection. You become more curious and flexible. Writing and sharing ideas take focus, and you may find yourself working with words in some way. This is a good era to stay social and keep exploring, perhaps through a podcast or a local talk series. Choose a few interests to go deep with. You grow by learning all your life.",
  "With your progressed Sun in Cancer, the coming three decades center on home and care. Your sense of self becomes softer and more protective. You may build a family, or turn your place into a warm spot where friends love to gather. Emotional security matters more than it did before. This is a good era to nurture roots, like learning the family recipes. Look after yourself as well as others. You grow by giving and receiving love.",
  "With your progressed Sun in Leo, a chapter of about thirty years brings confidence and creative light. You want to express yourself and be seen for who you are. Play and leadership take focus. You may step into roles where you can shine, such as coaching a team or performing on a stage. This is a good era to follow your heart. Stay generous with praise for others. You grow by letting your warmth show.",
  "With your progressed Sun in Virgo, the next three decades turn you toward skill and service. You want to be useful and to do things well. You may refine your work or care more about daily habits like meal planning and sleep. This is a good era to master a craft and to help others in practical ways. Be kind to yourself when things fall short of perfect. You grow by improving step by step.",
  "With your progressed Sun in Libra, a long chapter of about thirty years centers on partnership and balance. Relationships take a bigger place in your sense of self. You may seek fairness and beauty in daily life, from a shared budget to a tidy living room. This is a good era to build strong ties and to work well with others. Keep your own voice in the mix. You grow by learning to share and to choose with care.",
  "With your progressed Sun in Scorpio, the coming three decades bring depth and change. You want to understand what lies beneath the surface. Trust and intimacy take focus. You may go through powerful changes that reshape who you are, such as a new field of work or a deep personal healing. This is a good era to build inner strength. Be honest with yourself and with others. You grow by facing what is real.",
  "With your progressed Sun in Sagittarius, a chapter of about thirty years opens wide horizons. You want freedom and meaning. Travel and study take focus, and you may explore new places or beliefs and share what you learn. This is a good era to aim high and stay hopeful, maybe by living abroad for a season. Keep your plans grounded in real steps. You grow by searching and finding your own truth.",
  "With your progressed Sun in Capricorn, the next three decades center on ambition and long range goals. You want to build something lasting and earn respect. Responsibility grows, and you may take on leadership at work or in your town. This is a good era to plan carefully and work steadily, one milestone a year. Make time for rest and for those you love. You grow by achieving what you set out to do.",
  "With your progressed Sun in Aquarius, a long chapter of about thirty years brings independence and new thinking. You want to be yourself and help shape the future. Friends and causes take focus. You may break from tradition or work on fresh ideas, like a project that uses new technology for a good cause. This is a good era to join with others who share your hopes. You grow by following your own path.",
  "With your progressed Sun in Pisces, the coming three decades turn you toward imagination and compassion. You may feel more sensitive and connected to others. Art and spiritual life take focus. This is a good era to follow your dreams and to help people in need, for example by volunteering a few hours a month. Set gentle limits to protect your energy, and trust your intuition. You grow by opening your heart.",
];

export type HourPlanet = 'sun' | 'moon' | 'mercury' | 'venus' | 'mars' | 'jupiter' | 'saturn';

/** Each planet as the ruler of a weekday and of a planetary hour, with 5 things its hour suits and 3 to hold off on. */
export const HOUR_MEANING: Record<HourPlanet, { day: string; hour: string; goodFor: string[]; holdOff: string[] }> = {
  sun: {
    day: "Sunday belongs to the Sun, and its English name still carries that link. A Sun day suits rest that fills you back up and time with people who make you feel like yourself. Use it to look at the week ahead and pick the one thing you most want to shine at. A walk in daylight is a simple way to honor it.",
    hour: "A Sun hour brings a bright, confident energy. It favors anything where you want to be seen at your best, such as a pitch or a first meeting with someone important. Ask for what you want plainly and stand behind your work. Use it to lead, or to make a choice that reflects who you are.",
    goodFor: ["Asking for a raise", "Job interviews", "Meeting with your boss", "Creative work you sign", "Starting a personal goal"],
    holdOff: ["Ego battles", "Showing off", "Taking a back seat"],
  },
  moon: {
    day: "Monday takes its name from the Moon. A Moon day suits home and family, and the small chores that keep life running. It is a good day to stock the fridge or call someone you love. Feelings may sit closer to the surface, so give yourself a soft start and drink some extra water.",
    hour: "A Moon hour is gentle and caring. It favors anything that touches daily life or the public, since the Moon rules what is shared and familiar. Emotions flow more easily, so it is a fine time for a heart to heart talk. Plans may shift quickly in this hour, so keep them flexible and light.",
    goodFor: ["Cooking a family meal", "Caring for children", "Home chores", "Heart to heart talks", "Short errands nearby"],
    holdOff: ["Signing long contracts", "Big final decisions", "Tough negotiations"],
  },
  mercury: {
    day: "Wednesday belongs to Mercury, which shows clearly in the French mercredi and the Spanish miércoles. A Mercury day suits messages and paperwork. Clear your inbox and plan the rest of the week before lunch. Your mind runs sharp, so learn something small just for fun.",
    hour: "A Mercury hour is quick and clever. It favors writing and the trading of ideas. Send the email you have been drafting, or make the phone call that needs a clear head. Buying and selling small things also goes well. Keep your words precise, since this hour moves fast and details matter.",
    goodFor: ["Sending important emails", "Writing and editing", "Studying for a test", "Short trips", "Phone calls"],
    holdOff: ["Sharing gossip", "Signing without reading", "Rushing big purchases"],
  },
  venus: {
    day: "Friday belongs to Venus, as the French vendredi and the Spanish viernes show. A Venus day suits love and friendship. It is a natural day for a date or a small treat for yourself. Spend some time making your home or your outfit look the way you like, and enjoy good food slowly.",
    hour: "A Venus hour is soft and pleasant. It favors anything where you want warmth and goodwill, from a first date to patching up a quarrel. Art and music flow well, and people are more open to kind words. Use it to make peace, or to buy something beautiful you will enjoy for years.",
    goodFor: ["Dates and romance", "Buying gifts", "Making up after a fight", "Art and music", "Beauty appointments"],
    holdOff: ["Harsh feedback", "Heavy physical labor", "Splurging on luxuries"],
  },
  mars: {
    day: "Tuesday belongs to Mars, as the French mardi and the Spanish martes show. A Mars day suits effort and bold moves. It is a good day for a hard workout or a tough task you have put off for weeks. Energy runs high, so give it a clear target and keep your temper in check.",
    hour: "A Mars hour is hot and driven. It favors action and friendly competition. Use it to start physical work or to face a challenge head on. The energy is strong, so channel it into effort you can see. Tempers can flare in this hour, so pause for a breath before you answer a sharp remark.",
    goodFor: ["Hard workouts", "Repairs and building", "Facing a tough task", "Competitive games", "Standing up for yourself"],
    holdOff: ["Starting arguments", "Driving in a rush", "Delicate peace talks"],
  },
  jupiter: {
    day: "Thursday is named for Thor, the Norse god matched with Jupiter, and the French jeudi keeps Jupiter's own name. A Jupiter day suits growth and generosity. It is a good day to plan a trip or sign up for a class. Think big, and treat a friend to lunch while you share your plans.",
    hour: "A Jupiter hour is open and lucky in feel. It favors growth and goodwill. Use it to ask a favor or to reach out to a mentor you admire. Legal matters and travel plans also tend to go well. Generosity comes back to you in this hour, so give freely and expect good things.",
    goodFor: ["Asking for favors", "Planning travel", "Legal matters", "Starting a course", "Giving to charity"],
    holdOff: ["Promising too much", "Eating too much", "Skipping small details"],
  },
  saturn: {
    day: "Saturday is named for Saturn, and the English name still shows it clearly. A Saturn day suits planning and putting things in order. It is a good day to clean out the garage or go over your budget with a cup of tea. Patience pays off, and small efforts add up to real results.",
    hour: "A Saturn hour is slow and serious. It favors careful, long term work, such as budgets and contracts. Use it to set limits or to tackle a task that needs deep focus. Things done now tend to last. It suits fun and quick wins less, so save those for a brighter hour later in the day.",
    goodFor: ["Making a budget", "Signing lasting agreements", "Setting boundaries", "Deep focus work", "Clearing old clutter"],
    holdOff: ["Throwing big parties", "Quick fixes", "Starting a romance"],
  },
};
