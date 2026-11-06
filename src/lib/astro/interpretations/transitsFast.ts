import type { Harmony } from './angleAspects';

/**
 * A planet in today's sky in aspect to a point in your birth chart (daily horoscope), for the fast planets.
 * Outer key: transiting body; inner key: natal point (sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, asc, mc).
 * Original Astronomads copy.
 */
export const TRANSIT_FAST: Record<'sun' | 'moon' | 'mercury' | 'venus' | 'mars', Record<string, Record<Harmony, string>>> = {
  sun: {
    sun: {
      blend: "Today the Sun returns to the place it held when you were born, opening your personal new year. Write down one hope for the months ahead and take a small first step on it.",
      ease: "Your energy runs steady today, and people respond well when you simply act like yourself. Use these next days to finish a task that shows what you do best.",
      tension: "Your plans may bump into someone else's today, and you could feel pulled between what you want and what is expected. Pick the one goal that matters most and let smaller ones wait.",
    },
    moon: {
      blend: "The Sun lights up your emotional side today, so your feelings sit close to the surface and ask for attention. Give yourself an hour at home or with someone who knows you well.",
      ease: "Head and heart agree today, which makes it easier to decide what you want and feel good about it. These next days suit a family plan or a cozy evening with people you love.",
      tension: "What you want and what you need may tug in different directions today. If you feel restless at home, a short walk or a talk with a friend can help you sort it out.",
    },
    mercury: {
      blend: "Ideas come clearly today, and you can say what you mean with ease. Use these next days to send the message, make the call or write the plan you have been putting off.",
      ease: "Conversations flow well today, and people seem ready to hear your point of view. It is a good moment to ask a question at work or share a plan with a friend.",
      tension: "Your thoughts may run ahead of the facts today, and a small mix up could slow things down. Read messages twice before you reply and keep your schedule simple these next days.",
    },
    venus: {
      blend: "Warmth and charm come easily today, and others notice your kind side. Spend these next days on someone you care about, or on something beautiful that makes your home feel good.",
      ease: "A soft, friendly mood helps with dates, visits and small favors today. Say yes to an invitation or reach out to a friend you have missed.",
      tension: "You may want more comfort or attention than others can give right away. Enjoy a small treat today, and keep plans with friends light so everyone feels relaxed.",
    },
    mars: {
      blend: "Your drive gets a strong boost today, and you feel ready to push ahead on something hard. Point that energy at one clear task so it turns into progress instead of impatience.",
      ease: "You have the energy to start today and the confidence to keep going. These next days suit exercise, a bold request or a project that needs a firm push.",
      tension: "Tempers can run hot today, yours included, and small delays may feel bigger than they are. Before you react, step away for ten minutes and come back with a calmer plan.",
    },
    jupiter: {
      blend: "A hopeful, generous mood arrives, and chances to grow may seem larger than usual today. Say yes to something that stretches you, and keep your promises to a size you can keep.",
      ease: "Good will surrounds you today, and people seem glad to help or teach. Use these next days to learn something new, plan a trip or ask a mentor for advice.",
      tension: "Taking on everything at once may feel tempting right now. Pick one big hope and give it real time, and watch for overspending or overcommitting these next days.",
    },
    saturn: {
      blend: "Focus and patience are what this day asks for, and your work may feel heavier than usual. Tackle the task you trust least, since steady effort now builds something that lasts.",
      ease: "Today supports careful plans and serious talks with people who count on you. Use these next days to set a schedule, fix a routine or take one solid step toward a long goal.",
      tension: "Rules and limits may feel tight, and someone in charge could test your patience today. Do what is required with care, and save bigger changes for a calmer week.",
    },
    uranus: {
      blend: "A strong urge to break your routine shows up today. Follow one new idea, and give people around you a heads up before you change shared plans.",
      ease: "Bright ideas and small surprises make life feel lighter for a day or two. Try a new route, a new tool or a new way of doing an old chore.",
      tension: "Today you may feel restless, and sudden changes in plans can catch you off guard. Leave some room in your schedule so you can adjust without stress.",
    },
    neptune: {
      blend: "Your imagination runs strong today, and you may feel more sensitive to the moods around you. Use it for music, art or kindness, and leave big decisions for clearer days.",
      ease: "A gentle, dreamy feeling suits creative work and caring for others these next days. Make time for a film, a sketch or a long talk about hopes.",
      tension: "Today things may seem foggy, and promises could sound better than they turn out. Check details twice, and give yourself extra rest if your energy feels low.",
    },
    pluto: {
      blend: "Intense focus comes with this day, and you may feel ready to face something you usually avoid. Use that strength to clear out an old habit or finish an honest conversation.",
      ease: "Extra depth and staying power help with a hard task today. Research, a deep clean of a cluttered room or a heartfelt talk all go well these next days.",
      tension: "Someone may push for control, or you may feel a strong need to win. Ask yourself what you truly want from the situation today before you dig in.",
    },
    asc: {
      blend: "The spotlight finds you today, and people notice how you look and what you say. Wear something that makes you feel good and introduce yourself to someone new.",
      ease: "You come across as warm and sure of yourself, which helps first meetings go well. Use these next days to start a fresh habit or put yourself forward.",
      tension: "Today others may see you differently than you see yourself, and a partner could ask for more of your time. Listen first, then share your side in a calm, clear voice.",
    },
    mc: {
      blend: "Your work and reputation come into view today, and the right people may notice your effort. Share a result, update your profile or speak up in a meeting.",
      ease: "A steady boost reaches your public life, and your goals feel within reach. Spend these next days on one career step, such as a pitch, an application or a talk with your manager.",
      tension: "Home and work may compete for your time, and you could feel stretched between them today. Set one clear limit on each side so neither one takes over the whole day.",
    },
  },
  moon: {
    sun: {
      blend: "For a few hours today your feelings and your goals line up, giving you a calm, centered mood. Use this window to start a small personal task you care about.",
      ease: "For a few hours today, you feel at ease with yourself and with the people around you. It is a good window for a friendly call or a simple act of self care.",
      tension: "Today a passing mood may clash with your plans, and you could feel a little out of sorts. Give it a few hours before you make a choice you might want to undo.",
    },
    moon: {
      blend: "Your needs feel loud and clear for a few hours as the Moon returns to its place in your birth chart. Cook something you love or spend the evening somewhere that feels like home.",
      ease: "Your mood settles nicely today, and simple comforts feel extra sweet. This evening suits a warm meal, a favorite show or a long talk with family.",
      tension: "Today your feelings may swing more than usual for a few hours. Keep the evening simple and wait until tomorrow to answer anything that stirs you up.",
    },
    mercury: {
      blend: "Thoughts and feelings mix for a few hours, so you may want to talk things through. Write in a journal or call a friend this evening to sort out what is on your mind.",
      ease: "Words come with warmth today, and a kind message can mean a lot to someone. Send a quick note of thanks or catch up with a relative this evening.",
      tension: "Feelings may color your words today, and a casual remark could land harder than you mean. Pause before you send any message written in a strong mood.",
    },
    venus: {
      blend: "A soft, affectionate mood fills a few hours, and small pleasures feel extra good. Treat yourself to something lovely or spend the evening with someone dear.",
      ease: "Company feels like a joy today, thanks to an easy, friendly mood. This evening suits a date, a shared meal or a little time making your space pretty.",
      tension: "You may crave comfort or reassurance for a few hours, and small slights could sting. Ask for what you need in a gentle way, and keep treats to a sensible size.",
    },
    mars: {
      blend: "Feelings run hot for a few hours, and you may react fast. Put that energy into a brisk walk or a quick chore instead of a quarrel.",
      ease: "You have the drive to act on what you feel, and that helps you get things done. Use the next few hours to tackle a task you have been dreading.",
      tension: "Irritation can rise quickly today, and a small comment could spark an argument. If you feel your temper climb this evening, take a break before you respond.",
    },
    jupiter: {
      blend: "A cheerful, generous mood lifts the next few hours. Share good news, cook for friends or plan something fun, and keep your spending within reason.",
      ease: "Today brings a hopeful feeling and easy kindness from others. This evening is a nice time to make plans, laugh with friends or read something that inspires you.",
      tension: "You may want more of everything for a few hours, from treats to promises. Enjoy yourself, and keep your plans to a size you can manage tomorrow.",
    },
    saturn: {
      blend: "Your mood turns serious for a few hours, and you may feel more alone with your duties. Do one careful task today, then give yourself a calm evening.",
      ease: "Feelings steady today, and it is easier to handle chores and plans with calm. Use the next few hours to sort bills, tidy a room or keep a promise.",
      tension: "Today you may feel low or a bit lonely for a few hours. Reach out to someone steady, and keep in mind that a Moon mood like this passes by tomorrow.",
    },
    uranus: {
      blend: "Your mood may change suddenly today, and you could crave something new for a few hours. Follow a small urge, like a new song or a different walk, and keep big choices for later.",
      ease: "A playful, curious feeling arrives, maybe with a fun surprise. This evening suits a spontaneous call, a new recipe or a quick change to your space.",
      tension: "Plans could shift without warning today, and you may feel jumpy. Leave a little extra time between tasks and keep a backup plan ready for this evening.",
    },
    neptune: {
      blend: "Every mood in the room reaches you today, and you feel extra tender and open for a few hours. Spend the evening with music, a good story or someone gentle.",
      ease: "A soft, dreamy mood helps you feel kind and creative today. Use the evening to draw, write, listen to music or simply rest with a warm drink.",
      tension: "Today feelings may be hard to read, yours and other people's alike. Wait until you feel clear before you agree to anything, and keep some time just for you.",
    },
    pluto: {
      blend: "Strong feelings rise for a few hours, and you may see something you usually keep hidden. Write it down today or share it with someone you trust.",
      ease: "Emotional depth and courage are on your side today, which helps with an honest talk. Use this evening to clear out a drawer, a worry or an old grudge.",
      tension: "Jealousy or a need for control may flare up for a few hours. Notice the feeling, name it to yourself and let it cool before you act.",
    },
    asc: {
      blend: "Your feelings show on your face today, and people can tell your mood at a glance. Dress for comfort and spend a few hours somewhere that feels friendly.",
      ease: "Today you come across as warm and easy to talk to. This evening is a good time for meeting new people or making a first move on a fresh idea.",
      tension: "A partner or friend may need more care than usual today, and moods can bounce between you. Listen closely this evening and ask what would help.",
    },
    mc: {
      blend: "Today your feelings and your work meet for a few hours, and people on the job may sense your mood. Show care to a colleague, and keep personal worries for after hours.",
      ease: "People at work respond to your warmth today, and the mood on the job feels friendly. Use the next few hours to ask for help or offer support on a team task.",
      tension: "Home needs may pull at you today while work asks for attention. Handle the most urgent thing first, then make time for family this evening.",
    },
  },
  mercury: {
    sun: {
      blend: "Your mind and your sense of self work as a team today, and you speak with confidence. Use these next days to pitch an idea or tell your own story.",
      ease: "Thinking feels clear today, and you can explain your goals in simple words. Write a plan, sign up for a class or start a conversation you have been saving.",
      tension: "You may talk more than you listen today, or doubt your own ideas. Slow down, ask one more question and check that your facts hold up.",
    },
    moon: {
      blend: "Thoughts turn toward home and feelings, and you may want to talk about what matters. Call a family member today or write down what has been on your heart.",
      ease: "Words and feelings flow together today, so kind talks go well. These next days suit a heartfelt message, a shared memory or planning something at home.",
      tension: "Emotions may cloud your thinking, and you could read too much into a short message. Ask for a clear answer these next days before you assume the worst.",
    },
    mercury: {
      blend: "With Mercury back at its place in your birth chart, your mind feels sharp and busy. Start a new notebook, pick up a book or organize your notes these next days.",
      ease: "Ideas click together easily today, and learning feels fun. Use these next days to study, write or catch up on emails you have let pile up.",
      tension: "Your thoughts may scatter today, and it is easy to miss a detail. Make a short list, double check dates and keep each conversation on one topic.",
    },
    venus: {
      blend: "Kind words come easily today, and compliments land well. Use these next days to write a love note, smooth over a small disagreement or talk about art and style.",
      ease: "Pleasant talk and easy agreement help with friends and partners these next days. Plan a date, settle a shared decision or tell someone what you like about them.",
      tension: "Saying what people want to hear may feel easier than saying what you mean. Stay kind and honest, and keep shopping lists short these next days.",
    },
    mars: {
      blend: "Your mind moves fast today, and you speak with force. Use these next days to make a strong case or solve a tricky problem, and keep your tone friendly.",
      ease: "Quick thinking turns into action without delay today. These next days suit debates, deadlines and fixing things that need a firm decision.",
      tension: "Words can turn sharp, and a debate might heat up fast. Take a breath before you hit send today, and drive with extra care if you feel rushed.",
    },
    jupiter: {
      blend: "Big ideas arrive today, and you may see the larger picture with fresh eyes. Read, teach or plan a trip these next days, and write down the best ideas before they fade.",
      ease: "Good news, helpful talks and a hopeful outlook mark these next days. Ask questions, apply for something you want or share what you know with others.",
      tension: "You may promise more than you can deliver, or skip the fine print. Check the details and keep your plans realistic these next days.",
    },
    saturn: {
      blend: "Your thinking turns serious and careful today, which suits hard mental work. Use these next days to review a plan, edit a draft or have a frank talk.",
      ease: "Clear, practical thinking comes easily today. These next days suit budgets, paperwork, schedules and any task that rewards patience and order.",
      tension: "Finding the right words may feel slow today, and doubts could creep in. Keep going one step at a time, and ask for feedback from someone you trust.",
    },
    uranus: {
      blend: "Flashes of insight arrive out of nowhere today, and your mind races with fresh ideas. Keep a notepad close these next days so you catch the best ones.",
      ease: "Clever solutions and lively talks with people who think differently come your way. Try a new app, a new topic or a new way of solving an old problem today.",
      tension: "Today your thoughts may jump around, and news could arrive suddenly. Take a moment before you reply, and back up your files these next days.",
    },
    neptune: {
      blend: "Your thoughts drift toward dreams, stories and feelings today. These next days suit poetry, music or a creative project, while detailed paperwork can wait.",
      ease: "Your imagination and your words work well together today. Write, sketch or tell a story, and listen closely to the hunches that come up.",
      tension: "Messages may be vague today, and it is easy to misunderstand or be misled. Get important details in writing and ask again when something feels unclear.",
    },
    pluto: {
      blend: "Your mind goes deep, and you want to get to the bottom of things. Use these next days for research, a frank talk or finding a missing piece of information.",
      ease: "Your words carry weight today, and you can persuade with calm focus. It is a good time to dig into a mystery, study a hard subject or ask a direct question.",
      tension: "Today talks may turn into a battle of wills, or you may feel pushed to share more than you want. Choose your words with care and share only what feels right.",
    },
    asc: {
      blend: "You come across as quick and curious, and conversations start easily. Use these next days to introduce yourself, ask questions or begin a short course.",
      ease: "Expressing yourself feels easy today, and first impressions go well. Send that friendly email, make a quick plan or chat with a neighbor.",
      tension: "Talks with a partner or close friend may get busy or tangled today. Repeat back what you heard before you answer, so you both stay on the same page.",
    },
    mc: {
      blend: "Your ideas and your work life meet, and people may ask for your view. Share a proposal, update your boss or post about your work these next days.",
      ease: "Clear talk helps your career today, and meetings go smoothly. These next days suit interviews, presentations and emails that move a project forward.",
      tension: "Messages at work may get crossed, or calls from home could break your focus. Keep notes from every meeting today and confirm plans in writing.",
    },
  },
  venus: {
    sun: {
      blend: "Venus brings charm and warmth to who you are today, and people enjoy your company. These next days suit a date, a new haircut or time with friends.",
      ease: "An easy, pleasant mood helps you feel liked and relaxed. Spend a little time today on what makes you happy, like music, a meal or a walk in a pretty place.",
      tension: "Today you may want to please everyone or treat yourself more than you planned. Enjoy one nice thing and keep your budget and your plans in balance.",
    },
    moon: {
      blend: "You feel loved and cozy, and home seems extra welcoming. Use these next days to cook for someone, buy fresh flowers or share a long hug.",
      ease: "Kindness flows easily between you and the people closest to you. Plan a family meal, a gentle evening in or a thoughtful gift these next days.",
      tension: "Today you may feel a little needy or easily hurt by small things. Tell someone what would comfort you, and enjoy treats in moderation.",
    },
    mercury: {
      blend: "Your words come out gracefully today, and people enjoy talking with you. These next days suit love letters, thank you notes and friendly negotiations.",
      ease: "Light, pleasant talk helps you connect and smooth things over. Reach out today to someone you have drifted from or praise a coworker's good work.",
      tension: "A hard topic may tempt you to sugarcoat or change the subject. Say the kind thing and the true thing together today, in plain words.",
    },
    venus: {
      blend: "Venus returns to its place in your birth chart, renewing your sense of what you love and value. Treat yourself to something beautiful today and spend time with people who make you feel good.",
      ease: "Harmony fills friendships and love these next days, and social plans tend to go well. Say yes to a gathering, wear a favorite outfit or redecorate a corner.",
      tension: "Your wants and your relationships may feel out of step. Look at what you truly value these next days before you spend or commit.",
    },
    mars: {
      blend: "Attraction and desire run high, and romance or creative passion feels strong. Use these next days for a date, a dance class or a bold artistic project.",
      ease: "Warmth and drive work together today, making it easy to go after what you love. Ask someone out, start a creative project or plan an active outing with a partner.",
      tension: "Today desire and patience may clash, and small tensions in love can flare. Talk openly about what you want and find a playful way to release extra energy.",
    },
    jupiter: {
      blend: "Generosity, fun and good company make life feel a little sweeter today. Celebrate with friends these next days, and keep an eye on spending.",
      ease: "Your social life feels generous, and people treat you kindly. Plan a gathering today, give a small gift or make time for art and beauty.",
      tension: "Overindulging or saying yes to too many invitations is easy right now. Pick the plans that truly lift you and let the rest go without guilt.",
    },
    saturn: {
      blend: "Love and duty meet, and you may think seriously about a relationship. Show care through a small, steady act today, like keeping a promise or helping with a chore.",
      ease: "Today brings calm, grown up feelings that suit long term plans with someone you trust. These next days are good for a frank talk about shared goals.",
      tension: "Affection may feel distant, or you may sense a gap with someone close. Reach out with patience these next days, and give the relationship time instead of pressure.",
    },
    uranus: {
      blend: "A spark of excitement lights up love or friendship, and you may meet someone unusual. Try something new together these next days, like a fresh place or a surprise plan.",
      ease: "A playful, open mood makes social life fun and full of surprises these next days. Say yes to a last minute invitation or change up your style.",
      tension: "Today you may crave freedom in a relationship, or feelings could shift suddenly. Give each other a little space and talk about what feels good right now.",
    },
    neptune: {
      blend: "Romance and imagination swirl together today, and everything looks a little softer. Enjoy music, art or a sweet evening, and keep your feet on the ground with new people.",
      ease: "You feel gentle, caring and inspired by beauty. These next days suit creative work, small acts of kindness or a dreamy date.",
      tension: "Today you may see someone through rose colored glasses, or feel let down when they fall short. Look at what people do, and wait a few days before big promises.",
    },
    pluto: {
      blend: "Feelings in love run deep, and a bond may grow more intense. Have an honest talk about what you each want these next days.",
      ease: "Depth and loyalty fill your relationships, and closeness feels real. Use these next days to share something personal or mend an old hurt.",
      tension: "Jealousy or a power struggle could slip into love or friendship today. Notice the feeling, speak plainly and give the other person room to answer.",
    },
    asc: {
      blend: "You look and feel your best, and people respond to your warmth. These next days suit a new look, a social event or meeting someone new.",
      ease: "Grace and charm color how you come across today, so first meetings go well. Wear something you love and say hello to a new face.",
      tension: "A partner may want more attention, or you may feel unsure of your appeal. Offer a small kindness today and enjoy the people who already value you.",
    },
    mc: {
      blend: "Your charm shines in public, and people at work see your best side. These next days suit networking, a friendly pitch or a creative work project.",
      ease: "Good relations at work help your goals move forward today. Thank a coworker, join a team event or ask for a favor you need.",
      tension: "Today pleasure and duty may compete, or a work relationship could feel awkward. Stay polite and fair, and keep personal and professional matters separate.",
    },
  },
  mars: {
    sun: {
      blend: "Your energy surges this week, and you feel ready to take charge. Use these next few days to start something bold, and pace yourself so the fire lasts.",
      ease: "Courage and confidence come easily for a few days, and you can push your goals forward. Take on a challenge, start a new exercise routine or speak up for what you want.",
      tension: "This week you may feel pushy or easily provoked, and others may push back. Pick your battles and burn off extra energy with a long walk or hard work.",
    },
    moon: {
      blend: "These next few days your feelings run strong, and you may react quickly at home. Channel the heat into cleaning, cooking or a home project.",
      ease: "You act on your feelings with confidence and protect the people you love. Use the energy this week to fix something at home or stand up for a friend.",
      tension: "Moods can flare over the next few days, and family tension may rise. Take a pause before a heated talk and give yourself space to cool off.",
    },
    mercury: {
      blend: "Your mind runs fast this week and your words come out strong. Use these next few days to debate, write quickly or clear a backlog of messages.",
      ease: "Thinking and acting happen in one smooth motion. These next few days suit tough decisions, quick fixes and getting your point across with confidence.",
      tension: "This week arguments can start over small things, and words may sting. Read your messages aloud before you send them and keep your tone steady.",
    },
    venus: {
      blend: "Passion and desire run high, and attraction feels strong. Use these next few days for romance, a creative push or a bold move toward something you love.",
      ease: "You go after what you want in love and pleasure with charm this week. Plan an active date or put energy into an art or music project.",
      tension: "Desire and impatience may cause friction in love or friendship for a few days. Speak up kindly about what you need and skip the urge to test each other.",
    },
    mars: {
      blend: "Mars returns to its place in your birth chart this week, starting a new two year cycle of drive and ambition. Choose one goal to chase and take a strong first step in these next few days.",
      ease: "Your energy flows well this week, and effort pays off. Use these next few days for sports, hard work or a project you have wanted to push forward.",
      tension: "This week you may feel blocked or frustrated, and your temper could run short. Find a safe outlet, like a hard workout, and focus on one task at a time.",
    },
    jupiter: {
      blend: "Your energy meets big plans, and you feel ready to go for it. Use these next few days to launch something, and check that the plan fits your time.",
      ease: "Bold action and good timing support each other for a few days. Apply for something, start a trip or take on a project that helps you grow.",
      tension: "This week you may take on too much or act with more speed than care. Set a clear limit before you start, and leave room to rest.",
    },
    saturn: {
      blend: "Drive meets limits this week, and progress may feel slow but solid. Use these next few days for hard, careful work that builds something lasting.",
      ease: "Patience and effort work together well over the next few days. Tackle a long task, build a habit or fix something that needs steady hands.",
      tension: "This week you may feel stuck, as if pushing against a wall. Work within the rules, break big tasks into small steps and save your strength.",
    },
    uranus: {
      blend: "Sudden bursts of energy push you to break free from routine. Try something daring these next few days, and take extra care with tools and travel.",
      ease: "This week you act on new ideas quickly and with confidence. Use these next few days to try a new sport, change a setup or start a fresh project.",
      tension: "You may feel jumpy and impulsive for a few days, and sudden clashes can flare. Slow down with tools and on the road, and keep your cool when plans change.",
    },
    neptune: {
      blend: "Your drive may feel softer this week, and your energy could go toward ideals or creative work. Use these next few days to help a cause or make art.",
      ease: "Acting on your dreams and feelings comes gracefully. These next few days suit dance, swimming, volunteering or any project that inspires you.",
      tension: "This week your energy may feel low or scattered, and motives can be unclear. Rest when you need to and check facts before you take action.",
    },
    pluto: {
      blend: "A powerful drive rises, and you feel ready to make a big change. Use these next few days to finish a hard job or clear out what holds you back.",
      ease: "Your willpower is strong and focused this week. Take on a demanding task, train hard or make a lasting change to a habit.",
      tension: "Power struggles may appear over the next few days, and anger can run deep. Walk away from fights that lead nowhere and put your force into a worthy project.",
    },
    asc: {
      blend: "You come across as bold and energetic this week, and people notice your drive. Use these next few days to start something new or get moving outdoors.",
      ease: "This week your confidence shows, and you can take the lead with ease. Start a fitness habit, pitch an idea or make a first move.",
      tension: "A partner or rival may challenge you this week, and tempers can rise. Stay firm but fair, and look for a way to work together.",
    },
    mc: {
      blend: "Ambition takes over, and you push hard at work. Use these next few days to go after a goal, and pick your words carefully with bosses.",
      ease: "Your effort at work gets noticed this week, and you can make real progress. Go after a promotion, finish a big task or lead a project.",
      tension: "This week work and home may both demand your energy, and clashes with people in charge can flare. Choose the most important fight and handle the rest calmly.",
    },
  },
};
