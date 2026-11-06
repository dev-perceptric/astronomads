import type { Harmony } from './angleAspects';

/**
 * A planet in today's sky in aspect to a point in your birth chart, for the slow planets.
 * Outer key: transiting body; inner key: natal point (sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, asc, mc).
 * Original Astronomads copy.
 */
export const TRANSIT_SLOW: Record<'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto', Record<string, Record<Harmony, string>>> = {
  jupiter: {
    sun: {
      blend: "Jupiter crossing your Sun brings a few months of bigger confidence and more chances to be seen. Say yes to one opportunity that stretches you, and give it your full attention before adding the next.",
      ease: "These weeks carry a warm, generous mood, and people seem glad to help you along. Use the lift to start something you have been meaning to try, such as a class, a trip or a new project.",
      tension: "This stretch can puff up your plans until they outgrow your hours. Pick the two goals that matter most this season and let the rest wait for a calmer month.",
    },
    moon: {
      blend: "Home and family feel fuller this season, with room for more warmth and maybe more people around the table. Host a simple meal or give your living space one small upgrade that makes it feel kinder.",
      ease: "Your feelings run steady and hopeful these weeks, which makes it easier to ask for comfort and to offer it. Reach out to a relative or old friend you miss and plan a real visit.",
      tension: "Big feelings may spill over during these weeks, and comfort habits can grow larger than you intend. When a mood swells, name it out loud to someone you trust before acting on it.",
    },
    mercury: {
      blend: "Ideas arrive fast these weeks, and learning feels like play. Keep a notebook close, sign up for that course, and write down every plan so the good ones survive the rush.",
      ease: "Conversations go well this season, and the right words tend to find you. It is a strong time to pitch an idea, write a long message you have been putting off, or study something new.",
      tension: "Your mind may say yes to more than your calendar can hold during these weeks. Before you promise a deadline, check the details twice and add a little extra time for surprises.",
    },
    venus: {
      blend: "Affection and good company come easily for a few weeks, and life feels a little sweeter. Plan something lovely with a partner or friends, and let yourself enjoy it fully.",
      ease: "Kindness flows both ways this season, which helps friendships deepen and new ones begin. Say yes to an invitation you might usually skip, since a fresh face may turn into a good friend.",
      tension: "Pleasures grow tempting these weeks, and it is easy to overdo treats, plans or shopping. Choose one special thing to enjoy fully and keep the rest simple so the joy lasts.",
    },
    mars: {
      blend: "A surge of drive marks these weeks, and bold moves feel natural. Aim that energy at one clear goal, such as a training plan or a big project, and set a finish line you can reach.",
      ease: "Effort moves more smoothly this season, and you may find extra courage for things that once felt too big. Start the task you keep circling, and let early wins carry you forward.",
      tension: "Restless energy can push you to take on too much or rush ahead these weeks. Pace yourself with short breaks and a written plan, so your enthusiasm keeps going all season.",
    },
    jupiter: {
      blend: "Every twelve years Jupiter returns to where it was at your birth, and this season opens a fresh chapter of growth. Write down what you hope to learn or explore over the next dozen years.",
      ease: "Your sense of hope gets a helpful boost these weeks, and your beliefs feel easier to live by. Share what you know with someone younger, or take a step toward a place you have wanted to visit.",
      tension: "This period may test the plans and beliefs you set a few years ago. Look honestly at what has grown too big or too loose, and trim it so your hopes stay realistic.",
    },
    saturn: {
      blend: "Hard work and good timing meet this season, so a long effort may finally start to show results. Pick one serious goal and give it steady hours each week while the support is strong.",
      ease: "Patience and optimism work together these weeks, which helps you build something that lasts. Use the time to set up a routine or a simple system that makes the coming months easier.",
      tension: "Your wish to expand may rub against your duties and limits during these weeks. Look for the slow, sensible version of your big idea, since small steady steps will hold up better.",
    },
    uranus: {
      blend: "For a few weeks, a small dose of luck may come through something unexpected. Stay open to a surprise invitation or a sudden idea, and try at least one thing outside your usual routine.",
      ease: "This mild, short contact can add a spark of freedom and curiosity to ordinary days. Use it to try a new tool, hobby or route home, and notice what feels refreshing.",
      tension: "A restless mood may show up in the background these weeks, making routines feel a bit tight. Change one small habit on purpose so the urge for something new has a healthy outlet.",
    },
    neptune: {
      blend: "A soft, hopeful mood may color these weeks, with more interest in dreams, music or time alone. Give your imagination a little space each day, perhaps through drawing, journaling or a long walk.",
      ease: "Kindness and imagination come a little easier during this brief contact, which suits creative play and caring acts. Volunteer for an hour, write a poem, or simply listen well to a friend who needs it.",
      tension: "These weeks may bring a mild pull toward wishful thinking or plans that look better than they are. Check the facts on any offer that seems too good, and keep your feet on solid ground.",
    },
    pluto: {
      blend: "A gentle background push toward deeper goals may surface these weeks, shared in some form by many people your age. If something feels ready to grow stronger, give it a little more focus and see where it leads.",
      ease: "This mild contact can bring a few weeks of steady inner strength and a clearer sense of what matters. Use it to tackle one project that needs focus and staying power.",
      tension: "Small power struggles or an urge to control outcomes may appear in the background these weeks. Choose your battles with care, and let the minor ones pass without a fight.",
    },
    asc: {
      blend: "Jupiter on your Ascendant brings a season when you feel larger than life and people notice you more. Start something new, refresh how you present yourself, and say yes to meeting people.",
      ease: "You come across as open and friendly these weeks, and first meetings tend to go well. It is a fine time for an interview, a first date or joining a new group.",
      tension: "Your style may feel a bit too much this season, with big gestures or promises that are hard to keep. Let your actions match your words, and keep first impressions simple and sincere.",
    },
    mc: {
      blend: "Jupiter at the top of your chart marks a season of visibility and growth in your working life. Put your best work forward, ask for the role you want, and let people know your goals.",
      ease: "Career matters flow more smoothly these weeks, and helpful people may appear at the right time. Reach out to a mentor or contact and share an idea you believe in.",
      tension: "Ambition may run ahead of what your current role can hold during this period. Talk openly with the people above you before you overcommit, and grow in steps you can sustain.",
    },
  },
  saturn: {
    sun: {
      blend: "Saturn meeting your Sun brings a serious, shaping season that asks you to take yourself and your goals to heart. Choose one long aim, build a weekly routine around it, and rest well along the way.",
      ease: "Steady effort counts for a lot these months, and you may feel more grounded and grown up. It is a good stretch to commit to a long plan, since your discipline has extra staying power.",
      tension: "These months can feel heavy, as if life keeps asking you to prove yourself. Lower the load where you can, keep promises small and clear, and count each finished task as real progress.",
    },
    moon: {
      blend: "Feelings may run deeper and more serious during these months, with family duties asking for your time. Build a calm daily rhythm, and lean on one or two people who make you feel safe.",
      ease: "This season helps you settle your home life and give your feelings a sturdy base. Sort out a living space, a family plan or a routine that brings you lasting comfort.",
      tension: "Home and heart can feel stretched these months, and you may sense less support than you need. Speak up clearly about what would help, and set aside a regular hour that belongs only to you.",
    },
    mercury: {
      blend: "Your thinking turns careful and serious this season, which suits study, planning and detailed work. Tackle the paperwork or skill you have been avoiding, one small piece each day.",
      ease: "Clear, patient thinking is your strength these months, and long tasks feel more manageable than usual. Use it to finish a course, write something long, or build a plan with real steps and dates.",
      tension: "Communication may feel slow or blocked this season, with delays and more questions than answers. Write things down, confirm plans in writing, and give yourself time to think before big replies.",
    },
    venus: {
      blend: "Relationships turn serious these months, and you may sort out which bonds are built to last. Show care through reliable acts, like keeping plans and following through on small promises.",
      ease: "Love and friendship gain a steady, grown up quality this season. It is a good time to make a commitment, renew a promise, or put real effort into the people who stay.",
      tension: "Affection may feel tested or distant during these months, and loneliness can visit. Be honest about what you need, and put your energy into the relationships that give back.",
    },
    mars: {
      blend: "Saturn on your Mars asks for patience with your drive during these months. Slow, steady effort works better than force, so break big tasks into small daily steps and keep going.",
      ease: "Disciplined effort brings real results this season, and you can keep going longer than usual. Take on a demanding project or training plan and track your progress each week.",
      tension: "Frustration may build these months when effort meets delays or rules. Channel it into careful, planned work, and give your body regular movement to release the pressure.",
    },
    jupiter: {
      blend: "Hope meets reality this season, and your big plans ask for a practical shape. Keep the dream, and write out how much time and energy it will truly need each week.",
      ease: "Growth comes through patience these months, and wise choices made now can serve you for years. Pick one area to build slowly, such as a skill, a friendship or a long project.",
      tension: "Your hopes may feel limited by duty or slow progress during this period. Scale your plan to fit the hours you have, and keep faith that steady work still moves you forward.",
    },
    saturn: {
      blend: "This is a Saturn return, a season that comes about once every thirty years and asks you to grow up and take stock. Decide which responsibilities you truly choose, and build your life around them with care.",
      ease: "These months bring a calm check on the structures you have built, and many of them hold up well. Use the steady mood to strengthen a routine or plan that already works.",
      tension: "This season tests the life you have built so far, much like an inspection of a house. Repair what is shaky, release what has run its course, and give real progress the time it takes.",
    },
    uranus: {
      blend: "In the background these months, freedom and duty may ask to work together, as they do for many people your age. Look for one way to bring a fresh idea into a steady routine.",
      ease: "This slow, shared contact can help you turn a new idea into something practical. Give an experiment a clear structure and a timeline, and see how it holds up.",
      tension: "A mild tug between staying put and breaking free may run through this season. Make small, planned changes rather than sudden leaps, so you keep what still works.",
    },
    neptune: {
      blend: "A gentle call to give your dreams some shape may run beneath these months, a theme many people your age share. Choose one creative or caring hope and give it a simple, regular practice.",
      ease: "This season can help you bring calm order to a creative or spiritual habit. A short daily practice, kept steady, may come to mean more to you than you expect.",
      tension: "In the background, reality may press on an old hope or ideal these months. Keep the part of the dream that still feels true, and let the rest go with kindness.",
    },
    pluto: {
      blend: "A slow, serious mood may settle on your deeper goals this season, in a way shared by many people your age. Pick one long held aim and give it patient, consistent effort.",
      ease: "This background contact supports steady, lasting change over these months. Choose one habit you want gone or one strength you want to build, and keep at it week after week.",
      tension: "A mild pressure to let go of something outworn may run through this season. Accept the slow pace of real change, and focus on what you can shape today.",
    },
    asc: {
      blend: "Saturn on your Ascendant starts a season with a more serious, mature presence. Take good care of your daily routines and your body, and let people see your reliable side.",
      ease: "You come across as steady and capable these months, and others trust you with more. Use that trust to start something long term, like a new routine or a shared project.",
      tension: "These months may bring a heavier feeling in how you meet the world, with more self doubt in new settings. Keep a simple routine that steadies you, and give yourself credit for showing up.",
    },
    mc: {
      blend: "Saturn at your Midheaven marks a season when your career asks for full commitment and your efforts become very visible. Take on responsibility with care, since the work you do now shapes your reputation for years.",
      ease: "Your hard work earns respect these months, and steady progress at work is within reach. Ask for clear goals, meet them, and keep a record of what you achieve.",
      tension: "Work may feel demanding this season, with pressure from bosses, deadlines or your own high standards. Focus on doing a few things well, and talk to someone you trust when the load grows too heavy.",
    },
  },
  uranus: {
    sun: {
      blend: "Uranus crossing your Sun brings a year of change, when you may want more freedom to be yourself. Let yourself try new things, and make big changes in steps you can manage.",
      ease: "This year brings a lively, refreshing energy that makes change feel exciting. Use it to update your look, start an unusual hobby, or follow an idea that feels truly yours.",
      tension: "Sudden changes or a restless feeling may shake up your sense of self this year. Stay flexible, give surprises a day before you react, and keep a few steady routines as anchors.",
    },
    moon: {
      blend: "Home and feelings may go through surprising shifts this year, such as a move or a change in family life. Make room for change, and keep one small comfort ritual that steadies you.",
      ease: "This year brings fresh air to your home and emotional life. Rearrange a room, try a new family tradition, or give yourself permission to feel things in a new way.",
      tension: "Moods may swing and home plans may change suddenly this year. Build in extra space for surprises, and talk openly with the people you live with about what each of you needs.",
    },
    mercury: {
      blend: "Your mind may light up with new ideas this year, some of them sudden and brilliant. Keep a notebook ready, and test your best ideas by sharing them with someone curious.",
      ease: "Learning feels exciting this year, and you may pick up new skills quickly. Try a subject or tool that feels unusual for you, such as coding, a language or a new kind of writing.",
      tension: "Thoughts may race and plans may change on short notice this year. Double check messages before you send them, and leave space in your schedule for last minute shifts.",
    },
    venus: {
      blend: "Love and friendship may surprise you this year, with new people or a changed taste in what you enjoy. Stay curious about the unexpected, and give new connections time to show their true shape.",
      ease: "This year brings fresh, playful energy to your relationships and your style. Try a new kind of date, outing or creative hobby, and let a little spontaneity in.",
      tension: "Relationships may feel unsettled or restless this year, as your need for space grows. Talk honestly about freedom and closeness, and look for a balance that gives both people room to breathe.",
    },
    mars: {
      blend: "A jolt of energy may arrive this year, bringing sudden urges to act and change things. Pour it into a bold project or a new sport, and move with care when you feel rushed.",
      ease: "Your drive feels fresh and inventive this year, which helps you try new ways of getting things done. Use it to break an old habit or start a challenge you once thought was beyond you.",
      tension: "Impatience can flare this year, and actions may come faster than your plans. Slow down around tools, traffic and heated talks, and give strong urges a short pause before you act.",
    },
    jupiter: {
      blend: "This year may bring sudden openings, new beliefs or surprising chances to grow. Stay open to an unexpected path, and do some research before you commit to it.",
      ease: "Fresh opportunities and new ideas may show up this year, often through friends or groups. Say yes to the ones that excite you, and keep an eye on the details as you go.",
      tension: "Restless hopes may tempt you toward big leaps this year. Keep the spirit of adventure, and test a new plan in a small way before you go all in.",
    },
    saturn: {
      blend: "This year may shake up your routines and long held structures, pushing you to rethink how you live and work. Keep the parts that still serve you, and rebuild the rest with fresh ideas.",
      ease: "This year helps you blend old habits with new methods in a smooth way. Update a system or routine that feels dated, and notice how much lighter daily life can feel.",
      tension: "Rules and freedom may clash this year, and some old structures may feel too tight. Make changes thoughtfully, keep important duties covered, and give big decisions time to settle.",
    },
    uranus: {
      blend: "Around age 84, Uranus returns to its place at your birth, a rare milestone shared with everyone born near your year. Use the year to celebrate the ways you have stayed true to yourself.",
      ease: "This background contact, shared with others your age, can bring a mild wish for something new this year. Let it nudge you toward one fresh habit or interest.",
      tension: "Many people your age feel this one together, often as a restless urge to change course. Take stock calmly, and choose one meaningful change instead of upending everything.",
    },
    neptune: {
      blend: "This slow, shared contact reaches many people your age at once, often as a fresh interest in dreams or ideals. Try one new way to express your imagination this year.",
      ease: "In the background this year, new ideas may refresh your creative or spiritual side. Give an unusual practice, book or art form a try and see if it speaks to you.",
      tension: "A mild, shared restlessness about old ideals may run through this year. Let new views in slowly, and keep what still feels meaningful to you.",
    },
    pluto: {
      blend: "This generational contact may stir a background wish for deep change this year. Notice where you feel ready for something new, and take one clear step in that direction.",
      ease: "In the background, this year can support practical changes that make your life feel more your own. Try a fresh approach to an old problem and see what shifts.",
      tension: "A mild, shared pressure for change may hum beneath this year for many people your age. Let small changes happen at their own pace, and avoid forcing big ones.",
    },
    asc: {
      blend: "Uranus on your Ascendant brings a year of reinvention, when you may change your look, your habits or the way you meet the world. Experiment freely, and let people meet the newer version of you.",
      ease: "You come across as fresh and original this year, and new people find you interesting. It is a lively time to try a new style or join an unusual group.",
      tension: "Your usual way of showing up may feel too small this year, and sudden changes in daily life may follow. Keep some steady habits, and make bold changes one at a time.",
    },
    mc: {
      blend: "Uranus at the top of your chart can bring a year of surprises in career and public life. Stay alert to sudden openings, and keep your skills fresh so you are ready to move.",
      ease: "This year favors new directions at work, often through technology, groups or fresh ideas. Pitch an inventive idea or learn a skill that could open a different path.",
      tension: "Career plans may shift without warning this year, with changes at work or a strong urge to go your own way. Plan your next steps carefully, and keep a backup option in mind.",
    },
  },
  neptune: {
    sun: {
      blend: "Neptune on your Sun brings a dreamy year or two when your sense of self may soften and shift. Give time to art, rest and kindness, and check practical details twice.",
      ease: "This long season adds imagination and compassion to who you are. Use it for creative work, helping others, or exploring a spiritual practice that feels gentle and real.",
      tension: "Your direction may feel foggy over this year or two, and energy may come and go. Keep clear goals on paper, ask trusted friends for honest views, and be patient with yourself.",
    },
    moon: {
      blend: "Feelings may grow more sensitive and dreamy over this long season, and you may pick up the moods of others easily. Protect your rest, and choose a calm place at home where you can recharge.",
      ease: "Your emotional life gains a soft, caring tone this year, and empathy comes easily. Spend time near water, music or art, and offer gentle support to someone close.",
      tension: "Over this year or two, home life or feelings may seem unclear or hard to read. Talk things through instead of guessing, and keep simple boundaries that protect your energy.",
    },
    mercury: {
      blend: "Your thinking turns poetic and intuitive over this long season, which helps with creative writing and music. For forms, dates and plans, read slowly and ask questions until things are clear.",
      ease: "Imagination and words work together this year, making it a lovely time to write, draw or tell stories. Keep a journal of dreams and ideas, since some may grow into real projects.",
      tension: "Mixed messages and forgetfulness may show up during this period. Write down plans, confirm details with others, and give important choices a second look in daylight.",
    },
    venus: {
      blend: "Romance and beauty take on a dreamy glow over this year or two, and love may feel almost magical. Enjoy it, and also take time to see people as they truly are.",
      ease: "A gentle, artistic mood fills this long season, making it a sweet time for creativity and kindness in love. Try painting, music or design, and show care in small, thoughtful ways.",
      tension: "Love may feel confusing or let you down at times during this period, as hopes run ahead of facts. Go slowly with new attachments, and trust actions more than promises.",
    },
    mars: {
      blend: "Your drive may feel softer and less certain over this long season, while inspiration grows. Aim your effort at creative or caring work, and set gentle goals that keep you moving.",
      ease: "This year lets you put energy into causes and creative projects that matter to you. Volunteer, dance, swim or make art, and let the flow guide your effort.",
      tension: "Motivation may slip or scatter during this period, and it can be hard to know what you want. Break goals into tiny steps, and rest when you need to without guilt.",
    },
    jupiter: {
      blend: "Faith, hope and imagination may grow over this year or two, along with a wish to help. Give your idealism a practical outlet, such as a cause, a class or a creative project.",
      ease: "This long, gentle contact supports kindness, spiritual interest and generous dreams. Read, travel or study something that widens your heart, and share what inspires you.",
      tension: "Big hopes may blur into wishful thinking during this period. Check the facts on any plan that promises a lot, and keep one foot firmly on the ground.",
    },
    saturn: {
      blend: "Old structures and rules may feel softer or less clear over this long season. Let go of rigid habits that no longer fit, and keep the core duties that still hold your life together.",
      ease: "This year can help you give practical shape to a dream or a caring goal. Build a simple routine around a creative or spiritual practice, and keep it steady.",
      tension: "Plans may lose their shape and duties may feel heavier or unclear during this period. Keep lists, ask for clear expectations, and lean on people you trust for a second view.",
    },
    uranus: {
      blend: "This slow, generational contact may bring a background interest in new ideals. Let a fresh idea about how people can live together inspire one small act this year.",
      ease: "In the background, imagination and originality can support each other this year, for you and many people your age. Try a creative experiment, such as digital art or new music.",
      tension: "A soft, shared haze around your wish for freedom may linger in the background this year. Keep your plans for change grounded in facts and simple steps.",
    },
    neptune: {
      blend: "This is a slow background theme that you share with everyone born near your year. Let it remind you to spend a little time with music, art or reflection.",
      ease: "Many people your age feel this gentle contact at once, often as a softer, more spiritual mood. Give some time to a calm practice that renews your sense of meaning.",
      tension: "Around midlife, many people feel this one together as a fog around old dreams. Gently review which hopes still fit you, and let the rest fade with grace.",
    },
    pluto: {
      blend: "This generational contact works far in the background. You might notice a deeper interest in meaning and renewal, and a small daily reflection can help you explore it.",
      ease: "This long, shared background contact may support slow inner renewal. Notice what you are ready to release, and give your dreams room to grow in its place.",
      tension: "A mild, shared unease about change may linger in the background this year. Stay grounded with simple routines, and let deeper shifts unfold slowly.",
    },
    asc: {
      blend: "Neptune on your Ascendant brings a year or two when you seem softer, more mysterious and more sensitive to your surroundings. Choose gentle settings, and state your needs clearly so others read you correctly.",
      ease: "Over this long season you come across as kind, artistic and easy to talk to. Use that warmth to make new friends or share creative work with a wider circle.",
      tension: "People may see what they want to see in you during this period, and you may feel less sure of your image. Be clear and direct about who you are and what you want.",
    },
    mc: {
      blend: "Neptune at your Midheaven can bring a year or two of searching for work with meaning and heart. Explore creative or caring paths, and keep practical plans in place while you look.",
      ease: "Your public image gains a gentle, inspiring glow over this long season. It is a good time for creative or helping work, and for sharing a vision you care about.",
      tension: "Career goals may seem hazy or shifting during this period. Ask for clear roles in writing, steer clear of vague promises, and take time to name what success means to you.",
    },
  },
  pluto: {
    sun: {
      blend: "Pluto meeting your Sun brings a deep, slow change over the next year or two, reshaping how you see yourself. Let go of roles that feel too small, and build your strength from the inside out.",
      ease: "This long season brings steady inner power and a clear sense of purpose. Use it to make a lasting change, such as a new path, habit or goal you commit to fully.",
      tension: "Over this year or two, you may face pressure that pushes you to change who you are. Meet it with honesty and patience, and seek support from people who see your strengths.",
    },
    moon: {
      blend: "Deep feelings may rise over this long season, and family patterns may come to the surface. Give your emotions space, and talk with a trusted friend or counselor as they unfold.",
      ease: "This period helps you work through old feelings and build a stronger emotional base. Clear out what you no longer need at home, and keep what truly comforts you.",
      tension: "Emotional intensity may run high during this year or two, with changes at home or in family ties. Be gentle with yourself, and share your feelings with someone who listens well.",
    },
    mercury: {
      blend: "Your thinking turns deep and searching over this long season, and you may want to get to the bottom of things. Study, research and honest talks suit you well right now.",
      ease: "This year sharpens your focus and helps you see beneath the surface. Use it for research, deep reading or a hard conversation you have been putting off.",
      tension: "Thoughts may turn intense or fixed during this period, and conversations can carry extra weight. Listen fully before you reply, and let go of needing to win every point.",
    },
    venus: {
      blend: "Love and friendship may deepen or change in big ways over the next year or two. Let relationships grow more honest, and release any bond that keeps you feeling small.",
      ease: "This long contact brings depth and loyalty to your closest ties. Share something real with someone you trust, and let your bond grow stronger through honesty.",
      tension: "Strong feelings such as jealousy or longing may surface during this period. Talk about them openly, and focus on trust and fairness in your relationships.",
    },
    mars: {
      blend: "A powerful drive may build over this long season, pushing you toward big goals. Aim that force at one clear purpose, and pair your intensity with patience.",
      ease: "This year gives your effort real staying power and courage. Take on a demanding challenge, and let steady work carry you through to the end.",
      tension: "Power struggles or bursts of anger may appear during this period. Step back before conflicts grow, and channel strong energy into hard physical work or a project you care about.",
    },
    jupiter: {
      blend: "Your beliefs and goals may change deeply over this year or two, opening a new view of what is possible. Explore new ideas with an open mind, and grow at a pace you can handle.",
      ease: "This long season can bring meaningful growth and a wider reach for your ideas. Use it to teach, lead or study something that reshapes how you see the world.",
      tension: "Big ambitions may push you toward too much during this period, or clash with the views of others. Stay humble, check your motives, and choose growth that feels fair to everyone.",
    },
    saturn: {
      blend: "Long held structures in your life may break down and rebuild over this long season. Face the changes patiently, and lay new foundations that reflect who you are today.",
      ease: "This year helps you make lasting changes to your work, habits or long term goals. Commit to a plan that takes time, and trust your own staying power.",
      tension: "Pressure on your duties and plans may build over this year or two. Let outdated rules fall away, and rebuild slowly, one solid step at a time.",
    },
    uranus: {
      blend: "This generational contact may stir a faint background urge to change, shared with many people your age. Notice it, and let one small, meaningful change take root this year.",
      ease: "In the background, steady strength can support your wish for freedom this year. Use it to make a practical change you have long wanted to try.",
      tension: "Many people your age may feel a shared tension between control and freedom this year. Keep calm, adapt slowly, and avoid sudden drastic moves.",
    },
    neptune: {
      blend: "This is a slow, shared background theme that many people your age feel together. A little time for reflection, art or spiritual practice can help you notice it.",
      ease: "Whole generations carry this long, soft contact for years, so it works as a gentle shared backdrop. Use it to deepen a creative or spiritual habit at your own pace.",
      tension: "A mild, shared sense of letting go of old ideals may linger this year. Hold on to the hopes that still feel true, and release the rest gently.",
    },
    pluto: {
      blend: "Pluto takes about 248 years to return to its birth place, so this contact stays a background idea. Let it remind you of the deep roots you share with everyone born near your year.",
      ease: "This slow, shared contact may bring a background sense of growing inner strength. Use it to keep building habits that make you more resilient.",
      tension: "Many people feel this one in midlife as a shared push to face what matters most. Take stock calmly, and let one deep change unfold at its own pace.",
    },
    asc: {
      blend: "Pluto on your Ascendant brings a year or two of deep personal change, and others may sense a new intensity in you. Let your appearance and habits evolve, and move forward with calm strength.",
      ease: "Over this long season you come across as more confident and magnetic. Use that presence to lead, start fresh, or set firm boundaries with ease.",
      tension: "Others may react strongly to you during this period, and you may feel pressure to change how you appear. Stay true to yourself, and choose changes that feel right from the inside.",
    },
    mc: {
      blend: "Pluto at your Midheaven can bring a year or two of deep change in your career and public role. Step into more responsibility with care, and let go of roles you have outgrown.",
      ease: "Your work and reputation gain depth and power over this long season. Use it to lead, take on meaningful projects, or reshape your career with a clear vision.",
      tension: "Career pressure or power struggles at work may surface during this period. Stay focused on your goals, act with integrity, and seek allies who share your values.",
    },
  },
};
