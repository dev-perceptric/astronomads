import type { Element, Mode } from '../constants';
import type { Harmony } from './angleAspects';

/**
 * Two planets in aspect in one birth chart. Key `${a}-${b}`, a before b in body order (45 pairs).
 * blend = conjunction, ease = sextile or trine, tension = square or opposition.
 * Original Astronomads copy.
 */
export const NATAL_ASPECT: Record<string, Record<Harmony, string>> = {
  'sun-moon': {
    blend: "Your will and your feelings point the same way, so what you want and what you need often line up in one clear push. You may feel best when you put your whole heart into one goal at a time.",
    ease: "Your sense of purpose and your emotional needs cooperate, which gives you a steady inner calm that others can feel. When a choice feels right in your gut and also makes sense to your head, you can usually trust it.",
    tension: "Your head may want one thing while your heart asks for another, and that pull keeps you asking what really matters. Before a big decision, write down what you want and what you need, then look for the option that honors both.",
  },
  'sun-mercury': {
    blend: "Your thoughts and your sense of self are closely tied, so you speak with conviction and put a lot of yourself into your ideas. Ask a friend for honest feedback now and then, since your own views can be hard to see from outside.",
    ease: "Your mind serves your purpose well, helping you explain who you are and what you want in plain, easy words. Keeping a small notebook of ideas can help you turn passing thoughts into plans that fit your goals.",
    tension: "Your thinking can race in a different direction from your deeper aims, so you might talk yourself into plans that feel off later. Pause after a quick idea and ask whether it serves the bigger picture you care about.",
  },
  'sun-venus': {
    blend: "Your core self and your love of beauty sit side by side, giving you a warm, friendly glow that draws people in. A small habit like flowers on the table or music while you cook can lift your mood more than you expect.",
    ease: "Your sense of self and your taste get along well, so you tend to enjoy life and make others feel welcome. Sharing what you love, whether a recipe or a song, is one of the easiest ways for you to connect.",
    tension: "Your wish to be liked can rub against your wish to be fully yourself, and you may soften your views to keep things pleasant. Practice stating one honest preference each day, even about something small like where to eat.",
  },
  'sun-mars': {
    blend: "Your will and your drive fuse into a strong, direct force, and you usually prefer action to waiting. A hands-on project or a long walk gives that energy a good outlet, so it feels like fuel instead of restlessness.",
    ease: "Your purpose and your energy work as a team, so you can push toward goals with confidence and good timing. When you feel stuck, picking one small task and finishing it quickly tends to restart your momentum.",
    tension: "Your drive can run ahead of your sense of direction, which may show up as impatience or quick flashes of temper. Counting to ten before you answer a challenge lets you choose a response you will be glad about later.",
  },
  'sun-jupiter': {
    blend: "Your sense of self merges with a big, hopeful outlook, and you often see possibilities where others see limits. Pair that generous spirit with a simple plan, so each large idea finds a clear first step.",
    ease: "Your purpose and your optimism support each other, which helps you grow through learning, travel and good company. Saying yes to a class or a new friendship often opens more doors for you than careful waiting.",
    tension: "Your hopes can stretch larger than your time or energy, so you may promise more than one week can hold. Before taking on a new commitment, check your calendar and keep a little room for rest.",
  },
  'sun-saturn': {
    blend: "Your sense of self is tied closely to duty and hard work, so you may feel older than your years and take life seriously. Celebrating small wins along the way helps you see how much you have already built.",
    ease: "Your will and your discipline work in step, giving you patience and a talent for long, steady effort. Breaking a big goal into monthly checkpoints suits you and lets you watch real progress add up.",
    tension: "Your wish to shine can meet an inner critic that says you have to earn every bit of praise. When that voice gets loud, list three things you handled well this week and let them count.",
  },
  'sun-uranus': {
    blend: "Your core self carries a streak of independence, and you feel most alive when you can do things your own way. Leaving some room in your week for surprise plans or new experiments keeps you from feeling boxed in.",
    ease: "Your sense of purpose welcomes change, so fresh ideas and new methods tend to come to you easily. You may be the one at work who suggests a smarter tool, and people often take your lead.",
    tension: "Your need for freedom can clash with the roles you are asked to play, leading to sudden urges to break away. When you feel restless, try changing one routine on purpose before you change everything at once.",
  },
  'sun-neptune': {
    blend: "Your identity blends with a dreamy, imaginative side, and you may feel deeply moved by music, art or other people's stories. Give that sensitivity a creative outlet, and protect your energy with clear plans on busy days.",
    ease: "Your sense of self is open to inspiration, giving you kindness and a strong feel for what others are going through. Creative hobbies like painting, writing or music can become a real source of meaning for you.",
    tension: "Your sense of direction can blur at times, and you may wonder who you are when others expect different things. Writing down your own goals, in your own words, helps you stay clear when the picture gets foggy.",
  },
  'sun-pluto': {
    blend: "Your core self holds great intensity, and you tend to go all in on whatever matters to you. That depth makes you a strong ally in hard times, so choose your causes with care and give them your full heart.",
    ease: "Your will and your inner strength work together, letting you rebuild and grow after setbacks with real staying power. When something ends, you often find a new start inside it sooner than others expect.",
    tension: "Your drive to stay in charge can stir up power struggles with bosses, family or partners. When a conflict heats up, ask what you truly need from the situation, and let go of the parts that are only about winning.",
  },
  'moon-mercury': {
    blend: "Your feelings and your thoughts flow as one, so you often talk through emotions to understand them. A trusted friend or a journal can be your best tool on a hard day, since putting things into words helps you settle.",
    ease: "Your heart and mind communicate smoothly, which helps you speak about feelings with ease and warmth. People may come to you for advice because you listen well and find the right gentle words.",
    tension: "Your mood can color your thinking, and your thinking can stir up your mood, so the two may chase each other in circles. When you feel overwhelmed, a short walk before a talk can help you sort fact from feeling.",
  },
  'moon-venus': {
    blend: "Your emotional needs and your love of comfort are closely linked, giving you a soft, caring nature. A cozy home, good food and kind company recharge you, so make room for them after stressful days.",
    ease: "Your feelings and affections move in harmony, which helps you give and receive care with grace. Friends often feel welcome in your space, and a simple dinner you host can mean a lot to them.",
    tension: "Your need for security and your wish for pleasure can tug in different directions, especially in close bonds. Notice when you reach for a treat to soothe a mood, and ask whether a talk with someone would help more.",
  },
  'moon-mars': {
    blend: "Your feelings rise quickly and turn into action, so you respond to life with passion and honesty. Giving strong emotions a physical outlet, like cleaning a room or going for a run, helps you cool down fast.",
    ease: "Your instincts and your drive back each other up, giving you the courage to protect the people you care about. You often know what to do in a crisis, and others feel safer with you nearby.",
    tension: "Your emotions can flare into frustration when you feel crowded or pushed. Taking a few minutes alone before you answer a tense message gives you time to say what you really mean.",
  },
  'moon-jupiter': {
    blend: "Your emotional world is generous and hopeful, and you tend to lift the mood of any room you enter. Sharing that warmth comes easily to you, so remember to save some of the same kindness for yourself.",
    ease: "Your feelings carry a natural faith that things will work out, which helps you bounce back after a hard week. Time in open spaces, or with a big group of friends, refills your emotional tank.",
    tension: "Your feelings can swell past their real size, so small worries may grow big or comforts may turn into excess. When you notice you are overdoing something, aim for enough instead of more.",
  },
  'moon-saturn': {
    blend: "Your emotions are tied to a strong sense of duty, and you may have learned early to look after yourself. Letting trusted people care for you now and then is a skill worth building, one small request at a time.",
    ease: "Your feelings are steady and grounded, giving you a calm presence that others lean on when life gets rocky. Simple routines, like a regular bedtime or a weekly call with family, help you feel secure.",
    tension: "Your need for comfort can meet an inner voice that asks you to be strong and keep feelings private. Choose one safe person and practice sharing a small worry with them before it grows heavy.",
  },
  'moon-uranus': {
    blend: "Your feelings change quickly and can surprise even you, and you need plenty of emotional freedom. Friends who give you space and accept your shifts in mood will feel like the best kind of home.",
    ease: "Your emotional life welcomes the new, so you adjust well to moves, changes and unusual people. A spontaneous day trip or a fresh hobby can reset your mood faster than any routine.",
    tension: "Your need for closeness and your need for space can switch back and forth without warning. Telling the people near you when you need a little distance helps them see it is about your rhythm and nothing they did.",
  },
  'moon-neptune': {
    blend: "Your emotions are deep and open, and you can pick up on the moods of others as if they were your own. Calm time alone, near water or with soft music, helps you sort out which feelings truly belong to you.",
    ease: "Your feelings carry a gentle, imaginative quality, giving you great compassion and a rich inner life. Dreams and daydreams may hold useful clues about how you feel, so keep a notebook by your bed.",
    tension: "Your emotional boundaries can blur, so you may take on other people's problems or see them through a rosy lens. Check in with yourself before saying yes to helping, and make sure your own needs are covered too.",
  },
  'moon-pluto': {
    blend: "Your feelings run very deep, and you form bonds that are intense, loyal and lasting. Trusting slowly is natural for you, so let closeness build over time instead of forcing yourself to open up fast.",
    ease: "Your emotions have real strength and depth, which helps you face hard feelings and come out wiser. Friends often bring you their heaviest stories, because you can listen to them without flinching.",
    tension: "Your strong feelings can turn into a need for control when you feel unsafe or unsure of someone. Naming the fear underneath, even only to yourself, can soften its grip and make room for trust.",
  },
  'mercury-venus': {
    blend: "Your words and your sense of beauty work as one, giving you a pleasant way of speaking and a good ear for language. Writing a kind note or choosing the right gift comes easily, so use that talent to keep friendships warm.",
    ease: "Your mind and your heart cooperate, so you can talk about feelings and values with tact and charm. In a tense meeting, you are often the one who finds the words that bring people back together.",
    tension: "Your wish to keep things pleasant can soften your words until your real point gets lost. When something matters to you, say it clearly first, then add the kind framing afterward.",
  },
  'mercury-mars': {
    blend: "Your mind works fast and your words carry force, so you think quickly and speak your mind. Debates and puzzles give you energy, and a softer tone helps others take in your sharp ideas.",
    ease: "Your thinking and your drive move together, giving you a quick, decisive mind that turns ideas into action. Making a fast list and tackling the first item right away is a method that suits you well.",
    tension: "Your thoughts can come out as arguments, and you may jump into disagreements before hearing the whole story. Asking one more question before you reply often turns a clash into a useful talk.",
  },
  'mercury-jupiter': {
    blend: "Your mind loves big ideas, and you enjoy learning, teaching and talking about meaning. Keep a list of the topics that excite you, then pick one to study in depth so your curiosity finds a home.",
    ease: "Your thinking is broad and hopeful, helping you see the big picture and explain it in a way that inspires others. Classes, books and long talks with people from other places feed your mind well.",
    tension: "Your mind can grab more ideas than you can finish, and details may slip past in the rush. Before you share a plan, read it once more and check the dates, names and numbers.",
  },
  'mercury-saturn': {
    blend: "Your mind is careful and serious, and you prefer to think things through before you speak. People often trust your words because you choose them well, so let yourself share your views more often.",
    ease: "Your thinking is organized and patient, making you good at study, planning and any task that needs focus. A clear checklist and a calm desk help you do your best work.",
    tension: "Your thoughts can lean toward doubt, and you may judge your own ideas too harshly before anyone hears them. Try sharing a rough draft with someone you trust, since feedback often shows your ideas are stronger than you think.",
  },
  'mercury-uranus': {
    blend: "Your mind is quick, original and full of sudden insights that seem to come out of thin air. Keep a notes app ready, because your best ideas may arrive in the shower or halfway through a walk.",
    ease: "Your thinking welcomes new tools and fresh views, so you learn fast and enjoy solving problems in clever ways. Friends may ask you for help with tech or tricky puzzles, and you usually enjoy it.",
    tension: "Your mind can jump from one idea to the next so fast that others struggle to follow. Slowing down to explain your steps helps people see the brilliance in your leaps.",
  },
  'mercury-neptune': {
    blend: "Your mind is imaginative and intuitive, and you often think in images, music or feelings more than in lists. Stories, poems and art are natural ways for you to share what you know.",
    ease: "Your thoughts flow with creativity and empathy, helping you find gentle words for hard topics. Writing, design or any work that mixes ideas with imagination can feel like play to you.",
    tension: "Your mind can drift or fill in gaps with guesses, which may lead to mix ups or missed details. Writing down plans and confirming times by message helps keep your days running smoothly.",
  },
  'mercury-pluto': {
    blend: "Your mind digs deep, and you want to know what lies beneath the surface of any story. Research, mysteries and honest talks suit you, and gentle timing helps when you share hard truths.",
    ease: "Your thinking is sharp and focused, giving you a talent for getting to the heart of a problem. People may come to you when they need a clear, honest view of something complicated.",
    tension: "Your words can carry more force than you intend, and you may hold onto a point long after a talk ends. When you notice you are pressing hard, ask whether the goal is understanding or winning.",
  },
  'venus-mars': {
    blend: "Your love nature and your desire nature are fused, so attraction tends to be strong and direct for you. You often know quickly what and whom you want, and honest flirting comes easily.",
    ease: "Your affection and your drive work in harmony, helping you pursue what you love with warmth and confidence. Creative projects with a clear goal, like building or decorating, can bring you real joy.",
    tension: "Your wish for harmony and your wish for action can pull against each other, which brings sparks into close relationships. Talking openly about what each person wants helps that spark stay exciting instead of tense.",
  },
  'venus-jupiter': {
    blend: "Your love of pleasure meets a generous spirit, giving you warmth, charm and a gift for enjoying life. You may love to treat others, so set gentle limits that keep your giving joyful.",
    ease: "Your affections are open and kind, and people often feel lucky to be in your company. Hosting gatherings, sharing good food or planning a fun outing are easy ways for you to spread good cheer.",
    tension: "Your appetite for comfort can grow larger than you need, leading to too many treats, plans or promises. Choosing one special pleasure instead of many can make each one feel more satisfying.",
  },
  'venus-saturn': {
    blend: "Your heart is loyal and serious, and you take your time before you trust someone with your affection. Love that grows slowly can last a long time for you, so value friendships that have stood the test of time.",
    ease: "Your affections are steady and committed, giving you the patience to build relationships that last. Small, reliable gestures, like a weekly call, often mean more to you than grand romantic moments.",
    tension: "Your need for love can meet fears of rejection, making you hold back even when you care. Taking one small risk, like telling a friend how much they mean to you, can ease that old worry.",
  },
  'venus-uranus': {
    blend: "Your love nature craves excitement and freedom, and you are drawn to people and styles that stand out. Relationships that leave space for each person to grow tend to suit you best.",
    ease: "Your taste is fresh and original, and you enjoy friendships and romance that feel lively and open. Trying a new art form or meeting people outside your usual circle keeps your heart engaged.",
    tension: "Your wish for closeness and your wish for freedom can collide, making relationships feel stop and start. Agreeing on some shared time and some solo time with a partner helps you feel both connected and free.",
  },
  'venus-neptune': {
    blend: "Your love nature is romantic and idealistic, and you can see the beauty in people and art that others overlook. Music, film and creative work may move you deeply, so keep them close in daily life.",
    ease: "Your affections are gentle and compassionate, giving you a natural gift for kindness and artistic feeling. Volunteering, or making something by hand for someone you love, can be a meaningful way to share your heart.",
    tension: "Your dreams of perfect love can blur how you see real people, so early crushes may feel larger than life. Give new relationships time to show their everyday side before you make big plans together.",
  },
  'venus-pluto': {
    blend: "Your love nature is intense and magnetic, and you rarely do anything halfway when you care for someone. Deep loyalty is your gift, so choose partners and friends who meet you with the same depth.",
    ease: "Your affections have depth and staying power, helping you build bonds that grow stronger through hard times. Honest talks about feelings tend to bring you closer to the people you love.",
    tension: "Your strong attachments can stir up jealousy or a fear of losing someone you love. When that feeling rises, talk about it calmly instead of testing the other person, and trust has room to grow.",
  },
  'mars-jupiter': {
    blend: "Your drive and your optimism unite, giving you big energy and a love of bold adventures. You may do best with goals that feel large and exciting, as long as you rest between pushes.",
    ease: "Your energy and your confidence support each other, helping you take action at the right time and in good spirits. Sports, outdoor trips or team projects tend to bring out your best.",
    tension: "Your energy can push you to take on too much or act before thinking, which may wear you out. Pick one big goal for each season, and say no to extra projects that pull you off course.",
  },
  'mars-saturn': {
    blend: "Your drive meets discipline, giving you the power to work hard and steadily for a long time. You may find that slow, careful effort brings your best results, so set long goals and track them.",
    ease: "Your energy is controlled and practical, which makes you good at tasks that need strength and patience. Building something by hand or training a skill over many months suits you well.",
    tension: "Your drive can feel blocked or delayed, and you may swing between pushing too hard and holding back. Short, regular sessions of effort work better for you than rare bursts of all or nothing.",
  },
  'mars-uranus': {
    blend: "Your drive comes in sudden bursts, and you act fast when an idea excites you. Activities with variety, like trying a new sport each season, keep that restless energy happy.",
    ease: "Your energy is inventive and brave, letting you jump on new chances and fix problems in clever ways. You may enjoy work that keeps changing, since routine tasks can bore you quickly.",
    tension: "Your energy can spike without warning, leading to rushed choices or flashes of impatience. Building in a short pause before acting on a sudden urge helps you keep the good ideas and skip the rash ones.",
  },
  'mars-neptune': {
    blend: "Your drive blends with imagination, so you act best when you feel inspired by a dream or a cause. Dance, swimming or creative work can be a great channel for your energy.",
    ease: "Your energy flows toward helping others and creative goals, giving you a gentle kind of strength. Working for a cause you believe in can keep you motivated far longer than any deadline.",
    tension: "Your energy can scatter or fade when goals feel unclear, and you may struggle to know what you want. Setting one small, concrete aim for each day helps turn foggy wishes into real steps.",
  },
  'mars-pluto': {
    blend: "Your drive is intense and powerful, and you can push through obstacles with remarkable will. Choose your battles carefully, since your strength works best when it serves something you truly care about.",
    ease: "Your energy has great depth and staying power, helping you work through tough tasks without giving up. You may be the person others call in a crisis, because you stay focused under pressure.",
    tension: "Your drive can turn into power struggles or bursts of anger when you feel controlled. Demanding projects or hard physical work give that force a place to go, so it stays out of your arguments.",
  },
  'jupiter-saturn': {
    blend: "Your hopes and your sense of duty meet in one place, giving you the ability to plan big and build carefully. Long projects that grow step by step, like a degree or a garden, suit you well.",
    ease: "Your optimism and your caution balance each other, helping you take smart chances at the right time. Before a big move, you naturally check the risks, which lets you grow with confidence.",
    tension: "Your urge to expand and your urge to hold back can trade places, so you may swing between big plans and doubt. Choosing a middle path, with a stretch goal and a safe backup, can calm that back and forth.",
  },
  'jupiter-uranus': {
    blend: "Your hopes are tied to freedom and new ideas, and you may feel lucky when you try something unusual. Sudden chances can lead you to exciting places, so stay open to unexpected invitations.",
    ease: "Your optimism works well with change, helping you spot fresh openings and adapt with a smile. Travel, new tech or a surprising class can broaden your world in ways you enjoy.",
    tension: "Your hunger for freedom and growth can make you restless, chasing the next big thing before the last one is done. Finishing one project before starting another helps your bold ideas take real shape.",
  },
  'jupiter-neptune': {
    blend: "Your hopes and your dreams merge, giving you a big heart and a strong pull toward faith, art or service. Let your ideals guide you, and pair them with practical steps so they can come true.",
    ease: "Your optimism is gentle and inspired, helping you see the good in people and find meaning in everyday life. Giving time to a cause you care about can bring you deep and lasting joy.",
    tension: "Your ideals can drift past what is realistic, and you may trust too easily or expect too much. Before you commit to a big plan, ask a grounded friend to look it over with you.",
  },
  'jupiter-pluto': {
    blend: "Your hopes carry great intensity, and you may dream of making a real and lasting impact. Big ambitions suit you, so focus that power on goals that help others as well as yourself.",
    ease: "Your sense of growth has depth and staying power, letting you build influence slowly and wisely. Research, leadership or any work that changes things for the better can bring out your best.",
    tension: "Your ambitions can grow so large that they turn into a struggle for control. Check in with the people around you along the way, since shared goals tend to grow stronger than solo ones.",
  },
  'saturn-uranus': {
    blend: "Your sense of structure and your love of change live side by side, so you may follow rules and break them in the same week. Using your discipline to build new ways of doing things can be a real strength.",
    ease: "Your patience and your inventiveness work together, helping you bring fresh ideas into solid, lasting form. You might be the one who updates an old system so that it works better for everyone.",
    tension: "Your need for safety and your need for freedom can pull hard against each other, especially during big life changes. Keep one stable anchor, like a daily routine, while you experiment in other areas.",
  },
  'saturn-neptune': {
    blend: "Your sense of reality and your dreams sit close together, and you may feel called to give shape to an ideal. Art, care work or careful planning around a vision can become a lifelong project for you.",
    ease: "Your practical side and your imagination support each other, helping you turn dreams into real results. Writing a step by step plan for a creative goal can make it feel possible and calm.",
    tension: "Your dreams and the demands of daily life can seem far apart, and you may feel stuck between them. Giving a little time each week to an inspired project helps both sides of you feel heard.",
  },
  'saturn-pluto': {
    blend: "Your sense of duty fuses with deep inner strength, and you may carry a serious, determined approach to life. You can endure a lot, so make sure you also make room for rest and play.",
    ease: "Your discipline and your power work as a team, letting you rebuild and reform with patience. Long efforts that need persistence, like restoring an old house or leading a big change at work, suit you well.",
    tension: "Your need for control and your sense of duty can press hard against each other, making some years feel heavy. Breaking big burdens into small, shared tasks helps you carry them with less strain.",
  },
  'uranus-neptune': {
    blend: "You belong to a generation that blends new technology with big dreams, and you carry that mix in how you picture the future. Your own way of living it might be a creative project that joins digital tools with heart.",
    ease: "Your generation shares an easy link between invention and imagination, and in you it may show as a gift for seeing new possibilities. Following a hunch about a fresh idea can lead you somewhere meaningful.",
    tension: "Your generation grew up between old dreams and fast change, and you may feel that tug as you decide what to believe. Taking time to test new ideas against your own values helps you find your footing.",
  },
  'uranus-pluto': {
    blend: "You were born in a time of deep change shared by your whole generation, and you may feel a personal urge to remake the world around you. Small reforms in your own life and community are a good place to start.",
    ease: "Your generation carries a link between change and renewal, and in you it may show as a calm comfort with big shifts. When life turns over, you can often find the opening that others miss.",
    tension: "Your generation came of age amid sharp clashes between old power and new ideas, and you may feel that friction inside. Channeling that energy into a cause you care about turns restlessness into progress.",
  },
  'neptune-pluto': {
    blend: "You share with your generation a deep pull toward new beliefs and ideals, and you may feel it as a personal search for meaning. Exploring big questions through reading, art or faith can give your life a strong center.",
    ease: "Your generation carries a long, gentle link between dreams and deep change, and in you it may show as trust in renewal. You may find that hard endings often lead you toward a more meaningful path.",
    tension: "Your generation lives with a strain between old ideals and deep change, and you may feel that pull as you shape your beliefs. Talking with people of other ages about what they believe can help you find your own clear view.",
  },
};

/** When this element dominates the chart. For the birth chart report's balance page. */
export const ELEMENT_STRONG: Record<Element, string> = {
  fire: "With fire leading your chart, you run on enthusiasm, courage and the urge to start things. You light up rooms and inspire people to act, often before anyone else is ready. Pacing yourself matters, so build in rest and let others carry some of the work once you have sparked it.",
  earth: "With earth leading your chart, you are practical, patient and drawn to what you can see and touch. People rely on you to turn ideas into results and to keep things running smoothly. Leave some space for play and change, since a little surprise can refresh even the best routine.",
  air: "With air leading your chart, you live through ideas, talk and connection with many kinds of people. You notice patterns quickly and enjoy sharing what you learn with friends. Turning thoughts into action is your growth point, so pick one idea each week and take a real step toward it.",
  water: "With water leading your chart, you feel deeply and sense what others need almost at once. Your empathy makes you a caring friend and a source of comfort for the people around you. Protecting your own energy matters, so take time alone to sort your feelings after busy or emotional days.",
};

/** When this element is missing or very weak. For the birth chart report's balance page. */
export const ELEMENT_LOW: Record<Element, string> = {
  fire: "With little fire in your chart, you may find it harder to get going or to feel bold on your own. You likely prefer careful steps over sudden leaps, which can serve you well. When you need a spark, spend time with lively friends or start with one small brave act to warm up your confidence.",
  earth: "With little earth in your chart, practical matters like schedules, chores and paperwork may feel less natural to you. Your mind and heart often reach for big ideas first, which brings fresh views to any group. Simple tools such as a calendar, a checklist or a regular bedtime can give your days a steady base.",
  air: "With little air in your chart, you may lean more on feeling or doing than on talking things through. Your responses tend to be direct and heartfelt, which people trust. When a problem feels tangled, write it down or explain it to a friend, since putting it into words can help you see it from a new angle.",
  water: "With little water in your chart, emotions may feel puzzling at times, both your own and other people's. You often handle hard moments with a clear head, which can be a gift in a crisis. Making space for feelings, through music, a journal or an honest talk, helps you stay close to the people you love.",
};

/** When this mode dominates the chart. For the birth chart report's balance page. */
export const MODE_STRONG: Record<Mode, string> = {
  cardinal: "With cardinal signs leading your chart, you are a starter who likes to take the first step and set things in motion. You often see what needs to happen and act before others have made up their minds. Finishing can take more effort, so team up with steady people who enjoy seeing a plan through to the end.",
  fixed: "With fixed signs leading your chart, you are steady, loyal and determined once you commit. You can keep going long after others give up, which makes you someone people count on. Change may feel uncomfortable at first, so try small adjustments now and then to keep your strength from hardening into stubbornness.",
  mutable: "With mutable signs leading your chart, you are flexible, curious and quick to adapt when plans change. You see many sides of a situation and can help people find common ground. Staying with one path can be your challenge, so set a few firm priorities to give your many interests a clear direction.",
};
