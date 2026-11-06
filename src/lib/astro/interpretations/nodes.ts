import type { BodyKey } from '../constants';
import type { PointInfo } from './points';

type NodeKey = 'nnode' | 'snode';

/** What the North Node and South Node stand for. Original Astronomads copy. */
export const NODE_INFO: Record<NodeKey, PointInfo> = {
  nnode: {
    role: "Where you are growing",
    keywords: ["growth", "direction", "new skills", "stretch"],
    text: "The North Node points toward the kind of life that asks you to grow. Its sign and house show skills that feel awkward at first and then turn out to be deeply rewarding. Leaning toward it, a little at a time, tends to bring a sense of purpose and fresh energy.",
  },
  snode: {
    role: "What comes naturally",
    keywords: ["talent", "habit", "comfort", "instinct"],
    text: "The South Node shows the talents you seem to arrive with and the habits you fall back on without thinking. These gifts are real and worth using. Trouble starts only when they become a hiding place, so treat the South Node as a base to stand on while you reach toward its partner, the North Node.",
  },
};

/** Each node in each sign. Index 0 is Aries, 11 is Pisces. */
export const NODE_IN_SIGN: Record<NodeKey, string[]> = {
  nnode: [
    "Growth for you comes from acting on your own wishes before checking whether everyone else agrees. Try ordering the meal you really want at a group dinner, or signing up for the race alone, and notice how good it feels to lead with your own choice.",
    "Life keeps inviting you to slow down and build something calm and lasting with your own two hands. A small daily pleasure, like tending a pot of herbs on the windowsill or baking bread on Saturday mornings, teaches you that steady comfort is something you are allowed to keep.",
    "Curiosity is your growing edge, so asking questions will serve you better than having the final answer. Next time a friend shares a view you disagree with, ask how they came to it and simply listen, since that open conversation is where you stretch the most.",
    "This placement asks you to let your soft side show and to make a real home for your feelings. Calling a parent just to talk, or cooking for someone who had a rough day, can feel like a bigger win than any work goal ticked off your list.",
    "Stepping into the light and sharing what you make is the stretch your chart points toward. Posting the song you recorded, or telling a story at a party without waiting to be asked, helps you trust that your own voice is worth hearing.",
    "Real growth arrives through small daily tasks done with care and a clear plan. Setting out tomorrow's clothes at night or keeping a short to-do list on the fridge may sound simple, yet those habits ground your big dreams in the real world.",
    "Partnership is your classroom, and you grow by making room for another person's needs alongside your own. Before deciding a weekend plan by yourself, ask the people you share it with what they would enjoy, and let the answer shape what you do.",
    "Your path leads toward deep trust and the courage to let go of what you have outgrown. Sharing a fear with a close friend, or clearing out a closet of old things you held onto for comfort, can leave you feeling lighter and more alive.",
    "Big questions about meaning and belief call you forward, past the comfort of facts and small talk. Taking a trip somewhere unfamiliar or reading a book on a philosophy far from your own can open your mind in ways that daily chatter rarely does.",
    "Your chart asks you to take charge of your own goals and to grow into a person others can count on. Choosing one long project, like learning a trade or training for a hike months away, and sticking with it builds a confidence that lasts.",
    "Friendship and shared causes are where you expand, beyond the wish to stand out on your own. Joining a neighborhood clean-up or a club built around a common hope shows you how much brighter your ideas become when many people carry them together.",
    "Trust and imagination pull you onward, asking you to loosen your grip on doing everything perfectly. A slow afternoon spent painting or simply watching the clouds, with no plan to improve anything, can teach you more about peace than any well-made schedule.",
  ],
  snode: [
    "Acting alone and fast comes easily to you, and your courage is a real gift in a crisis. The pattern to watch is deciding everything by yourself, like booking the whole holiday before asking your partner, when the growth lies in planning side by side.",
    "Steadiness and a love of simple comforts are your natural strengths. Sometimes that turns into holding on too long, like keeping a box of old letters you never open, and letting go of one familiar thing can make room for something deeper.",
    "Quick talk and a head full of facts come to you with little effort, and people enjoy your easy wit. When you notice yourself collecting more trivia than meaning, pause and ask what you truly believe, since your growth lives in the bigger picture.",
    "Caring for others and keeping a cozy home are instincts you were born with. The comfort zone is staying close to the nest, so taking on a public role, like leading a project at work, helps you trust your own strength out in the world.",
    "Warmth and a flair for being noticed come naturally, and you know how to light up a room. That talent can tip into needing the spotlight, so try cheering hard for a friend's success at the next gathering and feel how good shared joy can be.",
    "Spotting what needs fixing is second nature to you, and few people catch details the way you do. The easy habit is worrying over every small flaw, so leave one corner of the house messy this week and give that energy to rest or daydreaming instead.",
    "Keeping the peace and reading what others want are skills you seem to have always had. The trap is waiting for approval, so the next time you have an idea at work, say it first and let your own voice set the tone.",
    "Intensity and a sharp sense for hidden motives are familiar to you, and you handle hard moments with surprising calm. Drama can become a habit, though, so build in simple pleasures, like a long bath or a walk in the park, that let life feel easy for a while.",
    "Strong opinions and a restless love of adventure feel like home to you. You can lean on grand answers too much, so practice asking a coworker a plain question and truly hearing the reply, since curiosity about small details is where you grow.",
    "Responsibility sits easily on your shoulders, and you often became the reliable one early in life. Your comfort zone is staying in control, so letting yourself cry at a sad film or asking for a hug when you need one is a brave stretch.",
    "Thinking in big ideas and blending into a group are talents you seem to bring from the start. The easy habit is hiding behind the crowd, so share something personal, like a poem or a dance at a wedding, and let people see you as yourself.",
    "Sensing the mood of a room and drifting into daydreams are gifts you were born with. Escaping into fantasy can become a habit, so a simple daily routine, like a set bedtime and a short morning list, helps your kind heart do real good.",
  ],
};

/** Each node in each house. Index 0 is the 1st house, 11 is the 12th. */
export const NODE_IN_HOUSE: Record<NodeKey, string[]> = {
  nnode: [
    "Your growth lies in knowing who you are on your own, apart from the people you love. Try spending a Saturday doing only what you feel like, from the breakfast you pick to the music you play, and see what you learn about yourself.",
    "This house placement asks you to find your own worth and to trust what you can make with your skills. Learning to fix a bike or grow your own tomatoes gives you a steady pride that leaning on others for support never quite matches.",
    "Everyday learning is where you stretch, through chats with neighbors and the little lessons of your own street. Taking a short class at the library or texting a sibling about something you read can feel small, yet it grows your mind in the direction you need.",
    "Home and family form the ground your chart wants you to tend, even while the world calls you to be busy. Saying no to a late meeting so you can eat dinner with the people you live with is the kind of choice that feeds your growth.",
    "Play and self-expression are your growing edge, and you shine when you create something that is plainly yours. Picking up a guitar for the pleasure of it, or planning a silly outing with friends, helps you step out from the safety of the group.",
    "Practical daily work and a steady routine help you grow, giving shape to a mind that loves to drift. Showing up at the same time each morning to walk the dog or help a coworker solve a real problem makes your inner life feel more settled.",
    "Close partnerships are where you learn the most, and your chart nudges you to share the steering wheel. Planning a trip with a friend where they choose half the stops can teach you more about yourself than another solo adventure ever could.",
    "Deep bonds are the stretch here, along with letting people in close enough to change you. Accepting help when you move house, or telling a partner a worry you usually keep inside, softens your habit of handling everything on your own.",
    "Wider horizons call to you, whether through travel or through study of what life might mean. Signing up for a course on a subject far from your daily world, or visiting a city where the language is new, helps you grow past local chatter.",
    "A public role and a goal of your own are what your chart pushes you toward, even if home feels safer. Applying for the job that would put you in charge of a team is the kind of bold step that builds the person you are becoming.",
    "Community and shared hopes help you grow, moving you past the wish to be the star of every show. Volunteering at a local event, or helping a friend's dream come true without taking credit, teaches you how satisfying it is to belong to something larger.",
    "Time alone and a sense of something larger call you inward, past the busy list of tasks you usually rely on. A still hour with a journal or a slow walk with no destination helps you hear the softer voice inside, which guides you better than any checklist.",
  ],
  snode: [
    "Standing on your own and making quick choices for yourself feel natural, and people see you as strong and independent. That can turn into doing everything solo, so try asking a friend to help paint the living room and enjoy what grows when you work as a pair.",
    "You have a gift for building comfort and holding on to what you own, which gives you a strong sense of security. The habit to watch is gripping too tightly, and lending something you treasure, like your best camera for a friend's trip, opens the door to deeper trust.",
    "Easy chatter and a quick grasp of local news are your home ground. Since busy small talk can fill every hour, set aside an evening for a big book or a lecture on a deep subject, which feeds the bigger thinking your chart is asking for.",
    "Home is your safe harbor, and you know how to make any room feel warm and lived in. The pull to stay inside that harbor can be strong, so saying yes to a project that puts your name in front of others helps you build a life beyond the front door.",
    "Creative flair and a sense of fun are part of your natural makeup, and you can light up any party. When the need for attention grows strong, try working on a group project where the credit is shared, and notice how good it feels to be one of many.",
    "Being useful and keeping a tidy routine feel like solid ground for you. Since staying busy can become a way to avoid your own feelings, leave a gap in the calendar each week to sit with tea and let your mind wander freely.",
    "Teamwork is your comfort zone, and you often know what a partner wants before they say a word. Try deciding something small entirely on your own, like a haircut or a weekend plan, and trust that your own taste is reason enough.",
    "Handling deep feelings and shared burdens is familiar ground for you, and you stay calm when life gets intense. Since crisis can start to feel like home, build simple pleasures of your own, like a favorite chair and a slow cup of coffee, that give you calm without any drama.",
    "Big beliefs and far-off adventures feel like familiar territory, and you can talk about meaning for hours. The comfort zone is staying up in the clouds of theory, so chatting with the neighbor over the fence or helping a sibling with homework brings your wisdom back down to earth.",
    "Public duty and a strong work ethic are habits you seem to carry with you, and others trust you to lead. Since work can swallow every hour, protect one night a week for family dinner or for fixing up your own space at home.",
    "Groups and friendly causes are an easy place for you to belong, and you fit into almost any circle. Hiding inside the crowd can become a habit, so pick up a creative hobby that is all yours, like singing or sketching, and share the result proudly.",
    "Retreating into your inner world feels natural, and you have a deep well of compassion for people who struggle. When dreaming starts to replace doing, a simple plan like a weekly to-do list and a set time to start work brings your gentle gifts into the daily world.",
  ],
};

/** A planet conjunct (sitting on) the North or South Node. */
export const NODE_CONTACT: Record<BodyKey, Record<NodeKey, string>> = {
  sun: {
    nnode: "With the Sun on your North Node, becoming fully yourself is the main task of your life, and confidence grows as you step forward. Taking the lead role in a school play or a work project, even when you feel shy, tends to make you feel more alive than staying behind the scenes.",
    snode: "The Sun on the South Node gives you a strong natural presence that others notice right away. Because shining feels so easy, it helps to step back now and then, like letting a friend tell the big story at dinner while you enjoy listening.",
  },
  moon: {
    nnode: "Your feelings are a guide forward when the Moon sits on the North Node, and learning to trust them is central to your growth. Pausing before a big choice to ask how you really feel, then honoring that answer, often leads you somewhere better than logic alone could.",
    snode: "Caring for others and sensing moods come to you as easily as breathing with the Moon on the South Node. The habit to watch is retreating into old comforts, like the same takeout and the same couch, whenever life asks you to try something new.",
  },
  mercury: {
    nnode: "Mercury on the North Node makes learning and speaking up part of your growth, so your words matter more than you might think. Writing a short post about something you care about, or asking the question everyone else in the meeting is afraid to ask, moves your life forward.",
    snode: "A quick mind and a way with words are gifts you seem to have had forever when Mercury rests on the South Node. Since clever talk is so easy, practice listening with your whole attention, like letting a friend finish a long story before you add your view.",
  },
  venus: {
    nnode: "Venus on the North Node asks you to grow through love and beauty, letting yourself enjoy what makes life sweet. Putting fresh flowers on your table, or telling someone you care for them without waiting for the right moment, is real progress for you.",
    snode: "Charm and an eye for beauty come to you without effort, with Venus resting on your South Node. People may love you easily, and the stretch is learning to stand firm when a friend asks for a favor that leaves you drained.",
  },
  mars: {
    nnode: "Courage and action push you forward when Mars is on your North Node, so learning to go after what you want is key. Starting a new sport, or speaking up when someone cuts in line, builds a strength that grows each time you choose to act.",
    snode: "Drive and fighting spirit are built into you with Mars on the South Node, and you rarely back away from a challenge. Because pushing hard is your default, try letting a small disagreement go, like a debate about the best route home, and see how much energy you save.",
  },
  jupiter: {
    nnode: "Jupiter on the North Node fills your path ahead with chances to widen your view and to share your hope with others. Saying yes to an invitation abroad or teaching a skill you love to a beginner tends to open more doors than you expect.",
    snode: "Optimism and a generous spirit feel like old friends to you with Jupiter on the South Node. The easy habit is promising more than you can manage, so when a friend asks for help moving, offer one afternoon you can truly give.",
  },
  saturn: {
    nnode: "Saturn on the North Node makes patience and steady effort the core of your growth, and your rewards come slowly but surely. Sticking with a hard class until the end, or keeping a promise even when it becomes tiring, builds a deep self-respect over the years.",
    snode: "Discipline and a sense of duty are familiar tools for you with Saturn on the South Node, and you often act older than your age. Since being responsible is so natural, allow yourself an unplanned day off now and then, like a lazy Sunday with no chores at all.",
  },
  uranus: {
    nnode: "With Uranus on the North Node, your growth asks you to break from the expected and follow your own unusual path. Choosing a career or a way of living that surprises your family can feel risky, yet it often brings the freedom you need.",
    snode: "Originality is your default setting with Uranus on the South Node, and sudden change rarely shocks you. Rebelling out of habit can become its own rut, so the next time a rule annoys you, ask whether following it might actually serve your goal.",
  },
  neptune: {
    nnode: "Neptune on the North Node invites you to grow through imagination and compassion, trusting what you sense beyond plain facts. Making music or volunteering at a local shelter can bring a kind of meaning that a busy schedule rarely gives.",
    snode: "Dreamy and deeply kind, you pick up the feelings of others with ease when Neptune sits on the South Node. Drifting away from hard facts can become a habit, so keep a simple calendar and check it each morning to stay grounded in the day ahead.",
  },
  pluto: {
    nnode: "Pluto on the North Node asks you to face deep change and to grow stronger through it. Ending a habit that holds you back, or speaking a hard truth to someone you love, can feel scary at first and then leave you feeling powerful.",
    snode: "Intensity and a strong will feel familiar to you with Pluto on the South Node, and you have weathered more than people guess. Since control can become a habit, try letting a coworker lead the next project and trust that things can turn out well without your firm hand.",
  },
};

/** The North or South Node conjunct the Ascendant or the Midheaven. */
export const NODE_ANGLE: Record<NodeKey, Record<'asc' | 'mc', string>> = {
  nnode: {
    asc: "The North Node on your Ascendant asks you to put yourself forward and let the world see the real you. Introducing yourself first at a party, or wearing the bold outfit you love, helps you grow into the person you are becoming.",
    mc: "With the North Node on your Midheaven, your growth is tied to your public role and the work you are known for. Taking a step toward a goal people can see, like applying for a promotion or launching a project of your own, moves your whole life forward.",
  },
  snode: {
    asc: "The South Node on the Ascendant gives you a familiar way of meeting the world, and people often feel they already know you. Since that easy self-image can feel like a shell, spend time with a close friend where their needs come first, and notice how much you grow.",
    mc: "When the South Node sits on your Midheaven, public duties and career skills feel easy and well practiced. Turning down an extra weekend shift to cook with your family or fix up your own room helps you build roots that work alone can never give.",
  },
};
