import type { Harmony } from './angleAspects';

/** Two coworkers' or business partners' planets in aspect. Same 55 keys as SYNASTRY. Original Astronomads copy. */
export const WORK_CONTACT: Record<string, Record<Harmony, string>> = {
  "sun-sun": {
    blend: "You and your colleague tend to aim for the same results, so goals line up early and effort flows in one direction. Agree up front on how credit is shared, such as both names on the report, so pride works for the team.",
    ease: "Your work styles sit well side by side, and backing each other in meetings comes naturally. Set one shared target each quarter, and divide it by strength so each of you owns a clear part of the result.",
    tension: "Each of you likes to lead, so projects can turn into a subtle contest for the final say. Draw clear lines of ownership at the start, with one decision maker per area, and write them into the project plan.",
  },
  "sun-moon": {
    blend: "One of you sets the direction and the other senses how the team feels, a pairing that can make a workplace feel steady. Hold a short weekly check in where one of you covers goals and the other covers morale.",
    ease: "Goals and team mood support each other here, so working together tends to feel calm. When one of you brings a new plan, the other often knows how to present it so the rest of the team warms to it.",
    tension: "One of you pushes for results while the other notices stress and fatigue first. Before a big push, ask how the workload feels, and build in a lighter week afterward to keep both of you fresh.",
  },
  "sun-mercury": {
    blend: "One of you puts the other's vision into clear words, so pitches and plans come together fast. Let the writer draft the message and the visionary check that it says what matters, and your proposals will land.",
    ease: "Ideas move well between you and your colleague, and meetings tend to end with a clear plan. Brainstorm out loud for ten minutes at the start of a project, and write the best points down while they are fresh.",
    tension: "Feedback from one of you can feel personal to the other, even when it is only about the work. Frame comments around the task, like a note that a section needs data, and mention what is working before you name the fix.",
  },
  "sun-venus": {
    blend: "One of you genuinely likes the other's way of working, which makes this partnership pleasant to sustain. Say thanks in specific terms, like naming a slide that worked well, since praise lands with real weight here.",
    ease: "Goodwill comes easily, and you two make client meetings feel warm and welcoming. Pair up for events or pitches where charm matters, and let each of you play the role that suits you best on the day.",
    tension: "Recognition may matter more to one of you than the other realizes, and missed thanks can build into resentment. Agree on how you credit each other in front of others, and make a habit of naming each other's wins in team meetings.",
  },
  "sun-mars": {
    blend: "One partner's drive fuels the other's confidence, so you two can move fast on tough targets. Point that energy at a hard deadline or a strong competitor, and keep the rivalry outside the team.",
    ease: "Each of you makes the other bolder at work, so tough calls get made on time. Take on a stretch goal together, like a big launch, and split the work by who moves fastest on each part.",
    tension: "Two strong wills meet here, and debates can become contests over who is right. Settle on a tie breaker before you start, such as letting the task owner decide, and step away for ten minutes when voices rise.",
  },
  "sun-jupiter": {
    blend: "One of you helps the other think bigger and believe in the plan, and generosity flows in both directions. Map out an ambitious goal together, then attach dates and owners so the vision turns into real work.",
    ease: "Working together makes each of you more hopeful about the job, and good ideas arrive in pairs. Sign up for the same training or take on a new market as a duo, so growth becomes something you share.",
    tension: "You two may hype each other into overpromising, from timelines to budgets. Keep the energy, and name one of you as the reality check who reviews every commitment before it goes to the client.",
  },
  "sun-saturn": {
    blend: "This contact gives your working bond real weight, and one of you is often the calm center the other relies on. Long projects suit you two, so build a plan with milestones and review it together each month.",
    ease: "Respect and reliability come naturally, and one of you helps the other turn ambition into a workable plan. Ask your colleague to stress test your ideas before they go up the chain, and expect careful, useful notes.",
    tension: "Rules and checks from one of you may feel like a leash to the other, while the checker feels stuck being the one who holds the line. Agree on which risks are fine to take, and thank each other for both caution and drive.",
  },
  "sun-uranus": {
    blend: "One of you brings fresh, unusual ideas that wake up the other's way of working. Give that spark a regular home, like a monthly hour for new ideas, and keep core tasks on a steady track.",
    ease: "You two encourage each other to try original solutions, and work together rarely feels stale. Test one new tool or method each quarter, and keep only the ones that save you both real time.",
    tension: "One of you may want change faster than the other can absorb, so plans can shift without warning. Agree on a simple rule for changes, like a day's notice and a short written note, so surprises stay manageable.",
  },
  "sun-neptune": {
    blend: "One of you sees big potential in the other, and the partnership can feel inspired and creative. Enjoy the vision, and back it with clear briefs, so both of you know what success looks like on paper.",
    ease: "Kindness and imagination flow here, and you two may work well on creative or caring projects. Lean into design or service work together, and set clear checkpoints along the way to keep things moving.",
    tension: "Hopes and facts can blur, and one of you may read more or less into the other's promises than was meant. Write down every agreement with dates and owners, and confirm it by email after each key meeting.",
  },
  "sun-pluto": {
    blend: "There is intensity in this working bond, and one of you may be deeply impressed by the other's ambition. Keep it healthy by being open about who holds authority on each part of the job and by deciding big matters jointly.",
    ease: "You two can help each other make big, lasting changes, and trust deepens through hard projects. Take on a turnaround or a rebuild together, and talk honestly about what each of you wants from it.",
    tension: "Control can become the hidden topic of every meeting, with one of you steering and the other resisting. Put roles in writing, review them when tension rises, and give each person a few decisions that are theirs alone.",
  },
  "moon-moon": {
    blend: "You two read people and workplace mood in much the same way, so you often sense trouble in a meeting at the same moment. Use that in client work, and trust each other's gut when something feels off.",
    ease: "Your emotional rhythms fit well, which makes long days together easier. When one of you is stretched thin, the other usually notices first, so feel free to offer to take over a task for a day.",
    tension: "You may need different things under pressure, such as talking it through for one and heads down focus for the other. Learn each other's stress style early, and plan crunch weeks with both needs in mind.",
  },
  "moon-mercury": {
    blend: "One of you can put the other's instincts into words, so hunches turn into clear plans. After a client call, compare notes right away, and let the more verbal partner write up what you both sensed.",
    ease: "Feelings and facts blend well between you two, and you can talk about touchy team issues with tact. Handle sensitive emails or reviews together, since your mix of warmth and clarity helps them land.",
    tension: "One of you may answer concerns with data while the other wants the worry heard first. When your colleague raises a problem, ask whether they want a fix or a sounding board, and respond to match.",
  },
  "moon-venus": {
    blend: "One colleague's warmth matches the other's need for a friendly workplace, so this partnership feels kind. Small gestures, like bringing coffee on a rough morning, go a long way between you two.",
    ease: "This contact brings goodwill and an easy sense of being valued at work. Use it with clients and new hires, since you two can make people feel welcome without much effort at all.",
    tension: "You two may show appreciation in different ways, so one of you can feel overlooked. Ask what kind of recognition matters to your colleague, like public credit or a private word, and offer exactly that.",
  },
  "moon-mars": {
    blend: "Instinct and drive collide here, so reactions at work can come quickly and run hot. When a meeting gets heated, pause and restate the shared goal, since sharp words carry extra force in this pairing.",
    ease: "Nerve from one of you and tact from the other make a fine team for hard calls. Handle a tough conversation together, like a client complaint, with one of you leading and the other reading the room.",
    tension: "One of you may feel pushed by the other's bluntness, while the other feels slowed by moods. Hold tough talks at a planned time, ideally early in the day, when both of you are fresh and calm.",
  },
  "moon-jupiter": {
    blend: "Confidence grows when you two work together, and that lift spreads to the people around you. Celebrate team wins as a pair, and use your shared warmth to help new hires feel part of the group.",
    ease: "Comfort and good cheer come easily, and you two keep each other's spirits up during long projects. Plan small rewards for milestones, like a team lunch, so effort always feels noticed.",
    tension: "You two may go easy on each other or promise more help than your schedules allow. Keep the kindness, and check your calendars before either of you offers to take on extra work.",
  },
  "moon-saturn": {
    blend: "This contact can feel very steady at work, with one of you offering structure and the other offering care. It makes a good base for managing a team, so share that role on purpose.",
    ease: "Trust and loyalty build over time here, often through small promises kept at work. A short weekly one on one can give this partnership deep roots and far fewer surprises.",
    tension: "Firm feedback from one of you can land as coldness when the other needs encouragement, and morale can dip. Ask clearly for support when you need it, and open any critique with a kind line first.",
  },
  "moon-uranus": {
    blend: "Moods and ideas can shift fast between you, with one of you springing surprises and the other reacting. Keep schedules flexible, and hold a short daily sync so both of you stay steady through the changes.",
    ease: "You let each other work in your own ways, and that independence keeps the partnership fresh. Remote days and flexible hours tend to suit this contact, as long as you keep a few shared touch points each week.",
    tension: "Regular contact matters to one of you, while the other does best working solo, so the rhythm can wobble. Agree on response times and meeting days, and protect focus time on both sides.",
  },
  "moon-neptune": {
    blend: "Empathy runs strong here, and one of you may feel more understood at work than ever before. Back that up with clear notes after meetings, so your assumptions about each other stay accurate.",
    ease: "Gentleness and creativity flow between you two, and you may shine in caring or artistic work. Put your shared sensitivity to use in customer care or design reviews, where it counts most.",
    tension: "Feelings can blur, and one of you may take on the other's stress without realizing it. Ask direct questions about workload and mood, and share your own status just as clearly.",
  },
  "moon-pluto": {
    blend: "Strong instincts link you two, and one of you may pick up on the other's concerns before they say a word. Treat that insight with care, and keep confidential matters strictly between you.",
    ease: "Hard projects tend to strengthen this working bond, and you can trust each other when the stakes rise. When work gets tough, stay in the room together and talk through the real risks openly.",
    tension: "Intense feelings can bring suspicion or a need for control at work. When you feel unsure, ask a direct question calmly, and let your colleague answer before you draw conclusions.",
  },
  "mercury-mercury": {
    blend: "You two think in a similar pattern, so meetings move fast and drafts need few rounds of edits. Co write proposals or reports together, since your shared style speeds up every document.",
    ease: "Your thinking styles get along well, and each of you quickly sees where the other is heading. Planning sessions tend to run smoothly, so take the lead on scoping new projects as a pair and sharing the plan with the team.",
    tension: "Your working minds run on different settings, with one zoomed in on details and the other zoomed out on strategy. Restate key points in your own words before you move on, and send a short summary after each meeting.",
  },
  "mercury-venus": {
    blend: "One of you has a gift for phrasing things in the way the other likes best, and tact comes naturally. Team up on client emails and pitches, where diplomacy and charm both help close the deal.",
    ease: "Talking feels pleasant between you two, and disagreements stay civil. Use that ease to run smooth meetings, with one of you keeping time and the other keeping the mood friendly.",
    tension: "One of you may be blunt while the other prefers softer words, which can cause small friction. Add a kind opening before tough feedback, and your colleague will take in the point more easily.",
  },
  "mercury-mars": {
    blend: "Your exchanges are quick and lively, and a suggestion from one of you often lands on the other's to do list within the hour. Healthy debate helps your work, so keep it on the problem and pause the moment it turns personal.",
    ease: "Ideas from one of you and follow through from the other make tasks move fast. Draft a short task list together every Monday, and enjoy checking items off as a team by Friday.",
    tension: "A quick question can turn into a sharp debate between you, and both of you may dig in on being right. Lower the tempo, and agree out loud that the best result for the project counts for more than winning the point.",
  },
  "mercury-jupiter": {
    blend: "One of you broadens the other's view, so your talks drift toward strategy and big opportunities. Use that for planning days, and keep a shared file of the best ideas for later review.",
    ease: "Learning flows naturally here, and you two enjoy sharing knowledge and stories. Take a course or attend a conference together, and swap what each of you learned over lunch afterward.",
    tension: "Detail from one side and big picture talk from the other can leave you each hearing a different plan. Write down agreements with dates and numbers, so both of you can point to the same page.",
  },
  "mercury-saturn": {
    blend: "Thoughtful, careful talk suits this partnership, and one of you helps the other slow down and check the facts. Make a habit of reviewing key documents together before they go out to clients.",
    ease: "Fresh thinking from one of you meets sound judgment from the other, a pairing that makes plans hold up well. Lean on each other for second opinions on budgets and timelines before anything is signed.",
    tension: "Comments from one of you may sound harsh, and the other may feel brushed aside. Begin with what works in a proposal, then name what needs fixing, and the review will stay productive for you both.",
  },
  "mercury-uranus": {
    blend: "Your discussions often spark new angles, and one of you keeps surprising the other with original ideas. Keep a shared board of bold ideas, and test one of them each month on a small scale.",
    ease: "You two often find fresh routes around old problems, and clever fixes come quickly. When a project stalls, book a short brainstorm together, and you may find a shortcut before the hour is up.",
    tension: "Fast changes of direction from one of you can leave the other feeling scattered. Confirm decisions in writing, and agree to flag any big change at least a day ahead so the work can adjust.",
  },
  "mercury-neptune": {
    blend: "Language and imagination mix here, and one of you may lift the other's creative thinking. Team up on branding or design briefs, where a shared sense of vision makes the work stronger.",
    ease: "You two can talk about ideas and values with ease, and kindness shapes your feedback. Use that in creative reviews, where a gentle touch helps good work grow into great work.",
    tension: "Instructions can get blurry between you, and each of you may fill gaps with what you hoped was meant. Confirm important plans by email, and use exact words for deadlines and deliverables.",
  },
  "mercury-pluto": {
    blend: "Your discussions tend to dig deep, and one of you can uncover what the other has been holding back. Use that skill for research and tough problem solving, and respect anything shared in confidence.",
    ease: "You two can tackle serious topics with courage and focus, and real insight often follows. A long, honest planning session can leave both of you clear on the hard choices ahead.",
    tension: "Questions from one of you may feel like an interrogation to the other, even when the aim is good work. Ask before probing sensitive areas, and give each other time to think before answering.",
  },
  "venus-venus": {
    blend: "You two share similar tastes in style and presentation, so slide decks and workspaces come together easily. Let this partnership shape the look of client materials or the office, and trust each other's eye on final drafts.",
    ease: "Your values around work and comfort fit well, and you enjoy similar ways of working. Agree on a shared workspace setup or meeting style, and enjoy how naturally it suits you both.",
    tension: "You may value different things at work, such as polish for one and speed for the other. Take turns setting the standard on projects, and each of you will see your values reflected in the results.",
  },
  "venus-mars": {
    blend: "One person's charm meets the other's drive, which makes a strong pairing for sales and pitches. Let one of you warm up the room and the other close the deal, and switch roles now and then.",
    ease: "Warmth from one of you and drive from the other make client work feel lively and productive. Pair up on outreach or events, where a friendly manner and a firm push both help win the business.",
    tension: "One of you may push hard while the other wants a softer approach, so tone can clash in meetings. Talk about style before big meetings, and agree when to press and when to ease off.",
  },
  "venus-jupiter": {
    blend: "Optimism fills this working bond, and one of you makes the other glad to be on the team. Mark wins together, from a signed contract to a solved problem, since shared good cheer boosts the whole group.",
    ease: "Generosity and good humor come easily here, making even long projects feel lighter. Plan the occasional team outing or client dinner together, and enjoy how well the two of you play host.",
    tension: "You two may overspend or overcommit together, from big dinners to extra perks for clients. Enjoy the generosity, and agree on clear budget limits before you plan any event or offer.",
  },
  "venus-saturn": {
    blend: "This working bond feels stable, and one of you gives the other a sense that the partnership will last. Show appreciation often, with thanks in person and in writing, so the dependable side stays warm.",
    ease: "Respect grows steadily here, and loyalty becomes a real strength of this partnership. Keep small promises, like replying on time and showing up prepared, and trust will build year by year.",
    tension: "Praise may come easily to one of you and rarely from the other, and that gap can wear on morale. Say plainly what kind of feedback helps you do your best, and thank each other for every effort made.",
  },
  "venus-uranus": {
    blend: "The other's ideas strike one of you as refreshingly different, and this partnership can take off quickly. Feed it with new projects every so often, and let each of you keep your own working style.",
    ease: "You two enjoy a relaxed, flexible way of working that values freedom. Try unusual methods, like walking meetings or short design sprints, to keep things lively for both of you.",
    tension: "One of you may want flexibility while the other wants steady commitment. Talk openly about what reliability means to each of you, and agree on a few fixed promises you both keep.",
  },
  "venus-neptune": {
    blend: "An idealistic, creative mood fills this working bond, and one of you may see great promise in the other. Enjoy the vision, and get to know each other's practical habits too so the work stays grounded.",
    ease: "Creative instincts and a caring streak run through this contact, and you may share a sense of mission. Look for projects with a human side, like community work, and let your shared values guide the effort.",
    tension: "One of you may see the other through rose tinted glasses and feel let down by everyday flaws. Keep expectations realistic, and write down roles so both of you know what to expect.",
  },
  "venus-pluto": {
    blend: "This partnership can feel intense and magnetic, with one of you strongly drawn to the other's skill. Keep it healthy by sharing credit and by respecting each other's other working ties.",
    ease: "This partnership can build deep loyalty and reshape how each of you works for the better. Talk about what you truly value in your careers, and design your joint projects around those values.",
    tension: "Strong feelings can bring rivalry or a wish to control the other's choices at work. Talk openly when you feel sidelined, and ask your colleague about their reasons directly so guesses never fill the gap.",
  },
  "mars-mars": {
    blend: "You and your colleague share the same pace and push, so you can power through hard deadlines together. Aim that shared fire at one big goal at a time, and enjoy the momentum it builds.",
    ease: "Your work pace and your appetite for effort match well, so urgent jobs get done with energy to spare. Take on a sprint together, and split tasks so each of you can move at full speed without waiting on the other.",
    tension: "Both of you push hard, so a small disagreement about method can turn into a standoff. Before busy weeks, agree that either of you may call a short pause when the room heats up, and return to the issue with one proposal each.",
  },
  "mars-jupiter": {
    blend: "Drive and optimism combine here, and one of you boosts the other's courage. Big goals suit this partnership, so pick a bold target, like a new market, and go after it together.",
    ease: "Ambition grows when you work side by side, and the partnership feels full of momentum. Set a yearly target together, and check progress each quarter so the energy stays high and the plan stays honest.",
    tension: "Together you may sign up for more than any team can deliver, from risky bets to tight deadlines. Keep the drive, and add a pause before any big commitment so you can check the numbers.",
  },
  "mars-saturn": {
    blend: "Speed from one of you meets care from the other, and this mix can turn into steady output or a long stall. Name who sets the pace on each project at kickoff, and lean on both strengths on purpose.",
    ease: "Effort and patience work well here, so long, demanding projects tend to reach the finish line. When one of you faces a tough target, the other makes a steady coach who keeps the plan on course.",
    tension: "Checks from one of you can feel like a roadblock, while urgency from the other feels like pressure. Map the timeline before work starts, and agree on a pace you can both keep for the whole project.",
  },
  "mars-uranus": {
    blend: "Energy can spike here, and plans between you two may change on short notice. Use that speed for quick wins and experiments, and keep backup plans ready for the sudden turns.",
    ease: "Bold methods appeal to you both, and the partnership feels lively. Pick one new approach per project, like a fresh tool, and test it together on a small task before rolling it out to the team.",
    tension: "Quick reactions can collide here, leading to sharp words or sudden changes of course. Take a breath before you reply when you feel stirred up, and revisit the topic once you both cool down.",
  },
  "mars-neptune": {
    blend: "Drive meets vision here, and one of you may be moved by the other's sense of mission. Channel that into a purpose led project with clear goals and a firm deadline so the energy has a target.",
    ease: "Shared values give your work gentle energy, and kindness shapes how you go about it. Volunteer as a team or lead a good cause at work, and enjoy pulling in the same direction for something that matters.",
    tension: "Fuzzy plans from one of you may frustrate the other, while the more driven partner can seem pushy. Turn every goal into a short written brief, and speak up early when motivation dips on either side.",
  },
  "mars-pluto": {
    blend: "Force and focus combine here, and your joint push can move a whole team. Point that strength at the hardest problem on the table, like a turnaround or a major bid, and keep it aimed at the goal.",
    ease: "You push each other toward brave career moves, and the partnership lends both of you backbone. Pick a goal that feels slightly out of reach, and back each other through it until it is done.",
    tension: "Struggles over who controls the work can surface here, and debates may get intense. Keep disputes about the task itself, call a short recess when things get heated, and remind each other that success for the project is the shared aim.",
  },
  "jupiter-jupiter": {
    blend: "You share similar views on growth and opportunity, so big plans feel natural to make together. Build a long term vision for your team, and enjoy how easily the two of you agree on it.",
    ease: "Your outlooks on opportunity fit well, and doors seem to open when you team up. Share leads and contacts freely, and watch how much both of you gain from the open exchange.",
    tension: "You may hold different views on risk or growth, which can spark debate in planning. Treat those talks as useful, and look for a plan that blends both of your views.",
  },
  "jupiter-saturn": {
    blend: "Big vision from one of you and careful checks from the other give your plans both reach and footing. Review major proposals together, with one of you arguing the upside and the other testing the risks.",
    ease: "Vision and patience work well here, and you can build something lasting. Start a long project together, like a new service line, and grow it steadily over the coming years.",
    tension: "Risk tolerance may differ a lot between you, with one partner keen to expand and the other keen to protect. Set a clear risk limit before you commit funds or time, and respect where each of you draws the line.",
  },
  "jupiter-uranus": {
    blend: "Big ideas and sudden openings fill this partnership, and new chances can appear out of nowhere. Say yes to some bold moves, and keep a short list of rules for which ones to chase.",
    ease: "You encourage each other to grow in new directions, and the partnership stays fresh. Explore a new market or technology together, and share what each of you discovers along the way.",
    tension: "New opportunities can pull you two in many directions, and focus may scatter across too many bets. Choose one big bet per quarter, and park the rest on a shared list you review at the next planning day.",
  },
  "jupiter-neptune": {
    blend: "Idealism and generosity flow here, and you may share a big, hopeful view of what your work can do. Start a mission led project together, and make sure it has clear, practical steps.",
    ease: "Hope comes easily in this working bond, and you two keep each other's spirits up on long projects. Use that in creative or service work, where a clear vision helps most, and share credit freely.",
    tension: "Big dreams can drift from the facts here, and plans may grow vague. Write down shared goals with clear first steps and budgets, so ideas turn into results you can measure.",
  },
  "jupiter-pluto": {
    blend: "This contact can give your partnership real weight and purpose. Aim your joint ambition at something big, like a major deal, and agree to tell each other the truth about the numbers along the way.",
    ease: "Each of you can help the other make bold, lasting career changes, and big moves feel safer as a pair. Talk through the goals that matter most to your careers, and offer support through the hard stretches.",
    tension: "Large ambitions can collide here, and one of you may try to direct the other's career moves. Honor the goals each of you has set, and rotate who leads joint projects so both of you have a real say.",
  },
  "saturn-saturn": {
    blend: "Coworkers close in age often share this contact, and it gives you a similar view of duty and deadlines. Lean on each other through the same career stages, like promotions or first leadership roles.",
    ease: "Your work ethics fit well, and each of you finishes what you start. Hit deadlines and milestones side by side, and this partnership can last through many projects and several job titles.",
    tension: "Standards and timing may differ between you, so one of you may see the other as rigid or lax. Agree on what done looks like for each task, and give credit for different ways of getting the work finished.",
  },
  "saturn-uranus": {
    blend: "Structure from one of you and fresh thinking from the other can make a team that is both solid and inventive. Let one of you build the process and the other look for ways to improve it each quarter.",
    ease: "Proven methods and new tools mix well here, so updates tend to stick. Roll out one change at a time, and let the steadier partner shape how it fits the existing system and the people who use it.",
    tension: "One partner may want to protect current systems while the other wants a full overhaul. List what stays fixed and where change is welcome, and the friction over each new idea will ease.",
  },
  "saturn-neptune": {
    blend: "Structure and vision meet here, and one of you can give the other's loose ideas a firm shape. Run creative projects in clear stages, with a sign off at each one before moving ahead.",
    ease: "You can blend imagination and patience, and this partnership can turn ideals into steady progress. Set a shared goal with milestones, and stick with it through the slow months when results take time.",
    tension: "Loose ideas from one of you may frustrate the other, who prefers firm specs, and those specs may feel rigid in return. Agree on scope in writing, and meet in the middle on the promises you make to clients.",
  },
  "saturn-pluto": {
    blend: "This contact brings endurance and focus to your partnership, especially in hard times. When a project gets tough, you two can be a steady, serious team that sees it through.",
    ease: "You can work through tough stretches with courage and patience side by side. Talk about your long term goals, and give each other practical help when the workload gets heavy or a deadline moves.",
    tension: "Heavy expectations can build between you, and one of you may feel the weight of the other's demands. Be clear about workload limits, and split responsibility so the whole load never lands on one desk.",
  },
  "uranus-uranus": {
    blend: "This contact is shared by nearly everyone in your age group, so if you two are close in age, you likely warm to the same new tools and methods. That common taste in change makes it easy to agree on upgrades.",
    ease: "This contact usually signals an age gap, and the two of you see workplace change from compatible angles. Trade tips from your own era, like a keyboard shortcut or an old school filing trick, and both of you will work smarter.",
    tension: "Expect an age gap with this contact, and your generations may pick up new tools at different paces. Pair the newer tool with the proven habit, and let each of you teach the other one thing.",
  },
  "uranus-neptune": {
    blend: "For colleagues close in age, this contact belongs to a whole generation and stays in the background. You may share similar hopes for how work and technology can improve daily life.",
    ease: "This is mostly generational, and it suggests you two see social and tech change in similar ways. Talk about the trends you both care about, and use them to shape shared projects.",
    tension: "Common to people born in the same years, this contact adds a small gap in how you weigh innovation against ideals. Hear your colleague out when their picture of the future of your field differs from yours.",
  },
  "uranus-pluto": {
    blend: "For coworkers close in age, this generational contact means you have lived through the same big industry shifts. Compare notes on how those changes shaped your careers, and build on that common ground.",
    ease: "This contact is common across your generation, and you two likely judge big swings in your industry the same way. Expect quick agreement when a company needs to change course, and use it to move first.",
    tension: "Mostly generational, this contact adds a mild restless note to your work together. Leave room for each of you to champion different changes, and lend support to your colleague's efforts where it makes sense.",
  },
  "neptune-neptune": {
    blend: "If you two are close in age, you share this with your whole generation, and your ideals about work often match. Talk about why each of you chose your field, and you may find the same hopes underneath.",
    ease: "A big age gap often comes with this contact, and still your generations hold ideals that sit well together. Share what first drew each of you to this line of work, and use it to shape a shared mission.",
    tension: "Behind this contact there is usually a wide age gap, and each generation may see the purpose of work differently. Ask what meaningful work looks like to your colleague, and look for a goal that honors both answers.",
  },
  "neptune-pluto": {
    blend: "For coworkers close in age, this contact is shared across a generation and adds a deep undertone. You may both care about work that carries real meaning beyond the paycheck.",
    ease: "This contact belongs to most people born in your years, and it gives you a similar sense of how industries evolve. It can show up as easy agreement on long term values and the kind of company you want to build.",
    tension: "Shared by a generation, this contact adds small differences in how you see deep change in your field. Treat your colleague's view with respect, and look for the common values under the different words.",
  },
  "pluto-pluto": {
    blend: "Coworkers close in age share this with their whole generation, so you face the same big shifts in your field at the same career stage. That shared experience can make you natural allies.",
    ease: "A large age gap usually comes with this contact, and your generations handle deep change in compatible ways. Ask how your colleague got through past industry shakeups, and share your own lessons.",
    tension: "This contact points to a wide age gap, and your generations have weathered workplace upheaval in very different ways. Ask about your colleague's experience of past shakeups before offering your view, and middle ground will come faster.",
  },
};

export type WorkTheme = 'decisions' | 'communication' | 'reliability' | 'drive' | 'money';

/** What each work score means, low, middle and high. */
export const WORK_THEME: Record<WorkTheme, { title: string; low: string; mid: string; high: string }> = {
  decisions: {
    title: "Decisions",
    low: "You and your colleague may weigh choices in different ways, so decisions can take longer than you would like. Agree on who makes the final call in each area, and set a clear deadline for each choice. Clear rules turn your different views into a real strength.",
    mid: "You two reach decisions fairly well, with a few areas where your styles pull apart. Talk through the tricky ones early and write down what you decide, so your process gets sharper with each project you finish together.",
    high: "Decisions come easily between you and your colleague, and you tend to see the same path forward. Use that speed on big choices, and still pause on high stakes calls to check the facts. Your shared judgment is a real asset to any team.",
  },
  communication: {
    title: "Communication",
    low: "You and your colleague may think and write in different styles, so mix ups can happen. Confirm key points in writing after each meeting, and ask questions before you assume. With a few good habits, your different styles can make your work more thorough.",
    mid: "Communication between you works well most days, and a handful of subjects call for a slower, more careful approach. Use short written summaries for important decisions, and keep casual chat for building rapport. Small habits like these keep the partnership running smoothly.",
    high: "Communication is a real strength for you two, and ideas move back and forth with ease. Use that for brainstorming and client pitches, and lend your clarity to the rest of the team when they need help getting a message right.",
  },
  reliability: {
    title: "Reliability",
    low: "You and your colleague may have different ideas about deadlines and follow through, which can cause friction. Spell out who owns each task and when it is due, and check in briefly each week. Clear expectations help trust grow step by step.",
    mid: "You can count on each other in most situations, with some areas still finding their rhythm. Keep shared task lists up to date, and flag delays the moment you see them. Each kept promise adds to a solid working bond.",
    high: "You and your colleague can rely on each other deeply, and promises tend to be kept on both sides. Protect that by staying honest when plans slip and by sharing the load when one of you is stretched. This kind of trust is rare and valuable.",
  },
  drive: {
    title: "Drive",
    low: "You and your colleague may work at different speeds or feel motivated by different things. Talk about what energizes each of you, and match tasks to those strengths. A clear shared goal can help your efforts pull in the same direction over time.",
    mid: "Your drive lines up well most of the time, with a few stretches where one of you pushes harder than the other. Set shared goals with clear deadlines, and take turns leading the charge on the toughest projects.",
    high: "Energy and ambition run high between you two, and you push each other to do great work. Point that drive at the biggest goals on your list, and build in rest so the pace stays healthy over the long run.",
  },
  money: {
    title: "Money",
    low: "You and your colleague may see budgets and risk quite differently. Agree on spending limits and approval steps before projects start, and review the numbers together each month. Clear rules turn two different money styles into a useful balance.",
    mid: "You two handle money matters fairly well, with a few areas where your views differ. Talk about budgets openly and check major costs together before you commit. Steady habits like these keep surprises small and confidence high.",
    high: "Money matters tend to go smoothly between you two, and you share a similar sense of value and risk. Use that for planning budgets and pricing, and still keep good records so the numbers stay clear for everyone involved.",
  },
};
