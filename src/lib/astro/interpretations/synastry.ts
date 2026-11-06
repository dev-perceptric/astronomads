import type { Harmony } from './angleAspects';

/**
 * One person's planet in aspect to the other person's planet (compatibility). Key `${a}-${b}` with a before
 * or equal to b in body order: 45 distinct pairs + 10 same-planet pairs (sun-sun ... pluto-pluto) = 55 keys.
 * Original Astronomads copy.
 */
export const SYNASTRY: Record<string, Record<Harmony, string>> = {
  "sun-sun": {
    blend: "Your core selves shine in the same direction, so you two often want the same things from life and understand each other's pride. Celebrate each other's wins out loud, and take turns being the one in the spotlight.",
    ease: "Your senses of purpose get along well, which makes it easy for you two to cheer each other on. Pick one shared goal each season, like a trip or a project, and watch how naturally you split the work.",
    tension: "You two shine in different ways, and at times each of you may feel the other wants the lead. Give each person a clear area to run, such as weekend plans for one and holiday plans for the other.",
  },
  "sun-moon": {
    blend: "One of you lights the way while the other feels at home in that light, a classic sign of a close fit. Small daily rituals, like a shared breakfast before work, can become the heart of your bond.",
    ease: "One person's goals and the other's feelings support each other, so being together tends to feel calm and natural. When one of you shares a plan, the other often knows just what kind of help it needs.",
    tension: "What one of you wants to do and what the other needs to feel safe can pull apart at times. Before a big decision, ask how the plan will feel at home, and listen to the answer with care.",
  },
  "sun-mercury": {
    blend: "One of you thinks aloud about the very things the other cares most about, so talks between you feel personal and alive. Long walks with your phones left at home can turn into your best conversations.",
    ease: "Ideas flow easily between you two, and one of you often finds the right words for what the other is trying to say. Plan a weekend together out loud, and you may end up with a clear list in minutes.",
    tension: "One of you may hear the other's comments as a judgment of who they are, even when it was only an idea. Saying that your point is about the plan, and that you still care, can clear the air early.",
  },
  "sun-venus": {
    blend: "One of you finds the other's way of being simply lovely, and that warm approval feels like sunshine to receive. Compliments land well here, so say the kind thing you notice instead of keeping it to yourself.",
    ease: "Affection and admiration flow easily between you two, which makes time together feel sweet and relaxed. A simple afternoon at a favorite cafe can feel like a real treat for both of you.",
    tension: "One of you may want more praise or attention than the other thinks to give, which can leave small hurts. Agree on a few clear ways to show love, like a note or a call, so both of you feel valued.",
  },
  "sun-mars": {
    blend: "One person's drive sparks the other's confidence, so the energy between you runs hot, playful and sometimes competitive. A shared sport or a busy weekend project gives that fire a good place to go.",
    ease: "You two push each other forward in a friendly way, and one of you often gives the other the nerve to act. Set a bold goal together, like a long hike, and you will likely enjoy the effort.",
    tension: "Strong wills meet here, so small disagreements can flare into contests over who is right. When tempers rise, take a short break and come back with one clear request each.",
  },
  "sun-jupiter": {
    blend: "One of you helps the other feel bigger, braver and more hopeful, and generosity flows naturally between you. Dream out loud together about the years ahead, since this contact loves a big idea.",
    ease: "Good humor and trust come easily between you two, and you tend to bring out each other's best. Learning something new side by side, like a language or a craft, can help your bond grow.",
    tension: "You two may egg each other on to overdo things, from late nights to big promises. Enjoy the shared optimism, and keep one of you in charge of checking the plan against the calendar.",
  },
  "sun-saturn": {
    blend: "This contact gives your bond weight and staying power, with one of you acting as a steady anchor for the other. Building something slowly together, like a garden or a home routine, fits this pair well.",
    ease: "Loyalty and respect come naturally here, and one of you often helps the other turn hopes into real plans. Weekly check ins about shared goals can feel reassuring rather than dull for you two.",
    tension: "One of you may feel held back by the other's rules or worries, while the other feels the need to keep things on track. Praise each other's effort often so duty leaves plenty of room for warmth.",
  },
  "sun-uranus": {
    blend: "One of you wakes the other up to new ideas, so the bond feels exciting and a little unpredictable. Leave room for surprise, such as a last minute day trip, and give each other plenty of freedom.",
    ease: "You two encourage each other to be original, and the relationship rarely feels stale. Try something neither of you has done before each month, from a new food to a new hobby.",
    tension: "Excitement and restlessness mix here, and one of you may crave change faster than the other can enjoy it. Talk openly about how much space each person needs, and agree on a few steady habits you both keep.",
  },
  "sun-neptune": {
    blend: "One of you sees the other through a soft, dreamy light, which can feel romantic and deeply inspiring. Enjoy the magic, and also take time to learn each other's everyday habits and plain truths.",
    ease: "Kindness and imagination flow between you two, and you may share a love of music, art or calm evenings in. Watching a film together and talking about how it made you feel can bring you closer.",
    tension: "Hopes and reality can blur here, and one of you may see the other as more or less than they truly are. Clear, gentle talk about plans and expectations keeps the dream grounded in real life.",
  },
  "sun-pluto": {
    blend: "This contact brings intensity, and one of you may feel strongly drawn in by the other's strength. Keep the bond healthy by sharing power, making choices together and respecting each other's privacy.",
    ease: "You two can help each other grow in real, lasting ways, and trust tends to deepen over time. Talking honestly about a fear or a hope can bring you closer than hours of small talk.",
    tension: "Power can become a theme here, with one of you wanting control and the other pushing back. Name it kindly when it shows up, and let each person keep a few choices fully their own.",
  },
  "moon-moon": {
    blend: "Your feelings and comfort needs are very alike, so you two often sense each other's moods without a word. Building a cozy home routine together, like soup on Sunday nights, can feel natural for both of you.",
    ease: "Your emotional rhythms fit together well, which makes caring for each other feel easy. When one of you has a hard day, the other usually knows whether to offer a hug or some space.",
    tension: "You two may need different things to feel safe, such as talking for one and alone time for the other. Learning each other's comfort style early saves you both from many small hurts.",
  },
  "moon-mercury": {
    blend: "One of you talks about feelings in a way the other can easily follow, so heart and mind meet here. Late night chats over tea can become a favorite way for you two to stay close.",
    ease: "Words and feelings blend smoothly between you two, and one of you helps the other name what they feel. Short notes left on the counter can keep that gentle flow going through busy weeks.",
    tension: "One of you may answer feelings with facts, while the other simply wants to be heard. Before giving advice, ask whether the other person wants solutions or just a listening ear.",
  },
  "moon-venus": {
    blend: "Tenderness comes easily here, with one person's affection matching the other's need for comfort. Cooking a favorite meal for each other or making a soft, welcoming corner at home suits you two well.",
    ease: "This is one of the sweetest contacts, bringing warmth, gentleness and an easy sense of being cared for. Small gestures, like a spare blanket on a cold night, mean a great deal between you.",
    tension: "Your ways of showing care may differ, so one of you can feel loving while the other feels overlooked. Ask what makes each person feel cherished, and try to offer it in that exact form.",
  },
  "moon-mars": {
    blend: "Feelings and desire meet head on here, which can bring strong attraction and quick reactions. When emotions run high, slow down and speak gently, since words land hard between you two.",
    ease: "One of you gives the other courage, and the other softens that drive with care, so you make a good team. Tackling a home project together, like painting a room, can be fun and satisfying.",
    tension: "One of you may feel rushed or bruised by the other's directness, while the other feels slowed down by moods. A simple rule, like saving big talks for when you are both rested and fed, can help a lot.",
  },
  "moon-jupiter": {
    blend: "One of you makes the other feel safe, accepted and hopeful, and generosity flows warmly between you. Big shared meals, laughter and an open door for friends tend to make this bond glow.",
    ease: "Comfort and good cheer come easily here, and you two lift each other's spirits on low days. Planning small treats together, like a picnic or a weekend away, keeps the warmth strong.",
    tension: "You two may spoil each other, or one may promise more comfort than daily life allows. Enjoy the kindness while keeping simple routines in place, such as a shared plan for chores.",
  },
  "moon-saturn": {
    blend: "This contact can feel deeply steady, with one of you offering a sense of protection and the other offering tenderness. Make room for softness, too, so the bond feels warm as well as safe.",
    ease: "Loyalty and emotional steadiness grow over time between you two, and trust builds through small, kept promises. Regular rituals, like a weekly call or a Friday dinner, can give your bond deep roots.",
    tension: "One of you may seem cool or strict when the other wants comfort, which can leave feelings hurt. Say clearly when you need warmth, and answer kindly when the other person asks for it.",
  },
  "moon-uranus": {
    blend: "Emotions can feel electric here, with one of you bringing surprise and the other feeling stirred by it. Keep plenty of freedom in the bond, and check in often so both of you feel secure.",
    ease: "You two give each other room to feel and be different, which keeps the bond fresh and friendly. A spontaneous outing when one of you feels low can lift both your moods.",
    tension: "One of you may want closeness while the other wants space, so the rhythm can feel uneven. Agree on a few fixed times together and a few fixed times apart, and the push and pull eases.",
  },
  "moon-neptune": {
    blend: "A deep, almost wordless sympathy forms here, and one of you may feel truly understood by the other. Protect that softness with clear words, so kind guesses stay in line with what each person really feels.",
    ease: "Gentleness and imagination flow between you two, and comfort often comes through music, water or shared dreams. A slow evening by a lake or with a favorite album can feel restful for you both.",
    tension: "Feelings can get blurry here, and one of you may pick up the other's moods without knowing whose they are. Simple check ins, like asking how the day really went, keep things clear and kind.",
  },
  "moon-pluto": {
    blend: "Strong emotions bond you two, and one of you may feel the other sees straight into their heart. Treat that closeness with care by keeping secrets safe and giving each other private space.",
    ease: "Trust can run very deep between you, and hard times may bring you two closer than easy ones. Sharing an honest worry, and simply staying with it together, builds lasting closeness.",
    tension: "Intense feelings can stir up jealousy or a wish to hold on too tightly. When one of you feels unsure, say it in calm words, and let the other reassure you instead of guessing.",
  },
  "mercury-mercury": {
    blend: "Your minds work in a similar way, so you two often finish each other's sentences and laugh at the same jokes. Puzzles, quizzes or long talks about a shared interest can be pure fun here.",
    ease: "Ideas move smoothly between you two, and you tend to grasp each other's point quickly. Planning trips, menus or projects together usually goes well, since your thinking runs along friendly lines.",
    tension: "You two think and speak in different styles, so one may want details while the other wants the big picture. Repeat back what you heard before replying, and many mix ups simply fade away.",
  },
  "mercury-venus": {
    blend: "Sweet words come easily here, and one of you enjoys hearing just what the other loves to say. Leave a kind message or a funny voice note during the day to keep the charm alive.",
    ease: "Talking feels pleasant and light between you two, and even disagreements tend to stay friendly. Sharing books, songs and shows gives you an endless supply of easy topics for slow evenings.",
    tension: "One of you may speak plainly while the other hopes for softer words, which can lead to small hurts. Add a warm phrase before a hard point, and you will find you are heard more clearly.",
  },
  "mercury-mars": {
    blend: "Talks between you two are lively and quick, with one person's ideas sparking the other into action. Debates can be fun, so keep them playful and step back when one of you starts to feel attacked.",
    ease: "One of you brings ideas and the other brings the push to act, so plans get done fast. Write a to do list together on a Saturday morning and enjoy ticking items off side by side.",
    tension: "Words can get sharp here, and a simple chat may turn into an argument over who is right. Lower the pace, choose softer words, and agree that understanding matters more than winning.",
  },
  "mercury-jupiter": {
    blend: "One of you widens the other's thinking, so your conversations often roam into big ideas and future plans. Talking about a dream place to visit can fill a whole evening with good cheer.",
    ease: "Learning and laughter flow naturally between you two, and you enjoy each other's stories. Taking a class together or swapping favorite books on lazy weekends can keep your minds close.",
    tension: "One of you may focus on details while the other speaks in big, hopeful sweeps, which leads to mixed signals. Write down important plans with dates, so both of you know exactly what was agreed.",
  },
  "mercury-saturn": {
    blend: "Serious, careful talk suits you two, and one of you helps the other think things through with patience. Making a plan on paper together can feel calming and useful for you both.",
    ease: "One of you brings ideas and the other brings sound judgment, which makes you good partners for planning. Trust each other's input on big choices, since this contact favors clear and steady thinking.",
    tension: "One of you may find the other's words too cold or critical, while the other feels unheard. Start with what you like about an idea before naming what worries you, and the talk stays warmer.",
  },
  "mercury-uranus": {
    blend: "Your conversations can be full of sparks, with one of you surprising the other with fresh ideas. Keep a shared list of odd ideas and wild plans on the fridge, and try one now and then.",
    ease: "Clever ideas pass easily between you two, and you often think of new ways to solve old problems. Brainstorming over coffee on a slow morning can lead to surprising, fun plans.",
    tension: "One of you may jump topics or change plans fast, leaving the other feeling scattered. Confirm key details in writing, and agree to give a little warning before big changes.",
  },
  "mercury-neptune": {
    blend: "Words and dreams mix here, and one of you may stir the other's imagination in gentle ways. Write a story or a song together, or keep a shared list of dreams, and enjoy the creative spark.",
    ease: "You two can talk about feelings, art and hopes with ease, and kindness colors your words. Reading poems aloud or watching a beautiful film together can lead to your best talks.",
    tension: "Messages can get fuzzy here, and one of you may hear what they hoped to hear. Repeat back important plans, and say clearly what you mean, so small mix ups stay small.",
  },
  "mercury-pluto": {
    blend: "Talks between you two tend to go deep, and one of you may draw out the other's hidden thoughts. Respect what is shared in trust, and enjoy the honesty this contact makes possible.",
    ease: "You two can talk about serious topics with courage and care, and real insight often comes from it. A long, honest talk about a hard choice can leave both of you feeling stronger.",
    tension: "Words can carry heavy weight here, and one of you may feel pressured or probed by the other's questions. Ask before digging into a touchy subject, and allow each other some private thoughts.",
  },
  "venus-venus": {
    blend: "You two share very similar tastes in love, beauty and fun, so dates often feel easy to plan. Decorating a room together or picking out a gift for a friend can be a real joy.",
    ease: "Your ideas of romance and pleasure fit together well, and you enjoy many of the same small comforts. Swap favorite songs or places, and you will likely love each other's picks.",
    tension: "You two may show love and enjoy life in different ways, such as calm nights in for one and big outings for the other. Take turns choosing the date, and both of you will feel seen.",
  },
  "venus-mars": {
    blend: "This is a classic spark of attraction, with one person's desire meeting the other's charm head on. Keep the romance alive with playful flirting, surprise dates and plenty of real attention.",
    ease: "Attraction and affection flow easily between you two, and closeness feels natural and fun. Dancing, cooking or any shared activity with some energy tends to bring out your chemistry.",
    tension: "Strong attraction can come with friction, as one of you pursues while the other wants things gentler. Talk openly about pace and wishes, and the spark can stay exciting without stinging.",
  },
  "venus-jupiter": {
    blend: "Generosity and joy fill this contact, and one of you makes the other feel lucky and adored. Celebrate often, from birthdays to small wins at work, because shared happiness grows here.",
    ease: "Kindness, fun and good humor come easily between you two, making time together feel like a treat. Plan outings that feel a little special, like a concert or a new restaurant across town.",
    tension: "You two may spoil each other or overdo the treats, from rich dinners to extra plans. Enjoy the warmth while agreeing on a few simple limits that keep both of you comfortable.",
  },
  "venus-saturn": {
    blend: "Love here feels serious and loyal, and one of you may offer the other a sense of lasting commitment. Show warmth often, with hugs and kind words, so the steady side of the bond always feels tender.",
    ease: "Affection grows slowly and surely between you two, and loyalty becomes one of your strengths. Keep small promises, like a weekly date, and trust tends to grow year by year.",
    tension: "One of you may hold back affection while the other longs for more open warmth. Speak about needs early and plainly, and thank each other for every effort to meet in the middle.",
  },
  "venus-uranus": {
    blend: "Attraction can strike fast here, with one of you finding the other thrillingly different. Keep the bond fresh with new places and ideas, and give each other room to stay yourselves.",
    ease: "You two enjoy a friendly, playful kind of love that values freedom as well as closeness. Try unusual dates, like a night market or a science museum, to keep the fun going.",
    tension: "Excitement and instability can mix here, as one of you wants freedom while the other wants a steady sign of love. Clear talk about what commitment means to each of you helps a lot.",
  },
  "venus-neptune": {
    blend: "A dreamy, romantic feeling fills this contact, and one of you may see the other as truly special. Enjoy the romance, and also learn each other's ordinary habits so the love feels real.",
    ease: "Gentle affection and shared imagination flow between you two, often through music, art or nature. A slow sunset walk or a favorite song can feel like a love letter here.",
    tension: "Romance can mix with fog here, and one of you may hope for more than the other can give. Keep talking honestly about what you each want, so dreams and real life stay close.",
  },
  "venus-pluto": {
    blend: "Attraction runs deep and strong here, and one of you may feel almost magnetically drawn to the other. Keep that passion healthy with trust, honesty and plenty of respect for each other's space.",
    ease: "Love can feel deep and meaningful between you two, and caring for each other may change you both for the better. Sharing your real hopes and fears builds a strong, lasting bond.",
    tension: "Strong feelings can turn into jealousy or a wish to hold on too tightly. When worry shows up, name it gently and ask for reassurance instead of testing each other.",
  },
  "mars-mars": {
    blend: "You two share a similar drive, so you often want to act on the same things at the same time. Train for an event together or tackle a big chore side by side, and the energy flows.",
    ease: "Your ways of taking action fit well, which makes you strong teammates on shared goals. Set a challenge, like a hike or a home project, and enjoy how well you work together.",
    tension: "You two act with different timing and styles, so friction can show up quickly. When anger rises, take a short walk apart and come back with a calm plan for the next step.",
  },
  "mars-jupiter": {
    blend: "One person's drive meets the other's big hopes, so you two can feel unstoppable together. Pick a bold shared goal, like a trip abroad or a new skill, and go for it as a team.",
    ease: "You two encourage each other's courage, and plans tend to move forward with good cheer. Sports, travel or any active adventure can bring out the best in your bond.",
    tension: "You two may push each other to take on too much at once, from projects to plans. Enjoy the excitement, and agree to finish one thing before starting the next.",
  },
  "mars-saturn": {
    blend: "Drive meets discipline here, and one of you may slow or steady the other's pace. Used well, this contact helps you two build serious plans, as long as patience stays on both sides.",
    ease: "One of you brings the energy and the other brings the plan, so you make a hardworking team. Long projects, like fixing up a room, suit this steady and capable pairing.",
    tension: "One of you may feel blocked or criticized by the other, while the other feels pushed too fast. Agree on a pace before you start a task, and praise effort along the way.",
  },
  "mars-uranus": {
    blend: "Energy runs high and fast here, and you two may spark each other into bold or unusual action. Channel it into new adventures, like a dance class or a rock climbing gym, so excitement stays fun.",
    ease: "You two inspire each other to try fresh things, and life together rarely feels dull. Say yes to a spontaneous idea now and then, and enjoy the shared thrill.",
    tension: "Sudden moods and quick tempers can flare here, with one of you acting before the other is ready. Build in a pause before big moves, and give each other room to cool off.",
  },
  "mars-neptune": {
    blend: "Desire and dreams blend here, so attraction can feel soft and mysterious at once. Creative or gentle activities, like swimming or painting together on a slow afternoon, suit this mix well.",
    ease: "One of you brings drive and the other brings imagination, so together you can chase a shared ideal. Working on a cause or a creative project can bring real meaning to your time.",
    tension: "Motives can get murky here, and one of you may feel confused by the other's mixed signals. Say plainly what you want and when, so the energy between you stays clear.",
  },
  "mars-pluto": {
    blend: "Intense energy builds here, and attraction can feel strong and powerful between you two. Pour that force into shared goals or physical activities, and keep respect at the center.",
    ease: "You two can push each other to grow stronger and braver, with real staying power. A tough shared goal, like a long bike ride or a big build, can become a proud memory.",
    tension: "Power struggles can show up quickly here, and arguments may feel heavier than the topic deserves. Agree on fair ground rules for disagreements, like no name calling and a set time out.",
  },
  "jupiter-jupiter": {
    blend: "You two share similar beliefs and hopes, so your sense of what makes a good life lines up well. Plan a dream trip or talk about your ideals, and enjoy how much you agree.",
    ease: "Your outlooks support each other, and you tend to share a kind, hopeful view of the future. Exploring new places, ideas or traditions together keeps your bond growing.",
    tension: "Your beliefs or ways of growing may differ, and each of you may find the other's view too narrow or too loose. Stay curious about each other's ideas, and you can both learn a lot.",
  },
  "jupiter-saturn": {
    blend: "Hope meets caution here, with one of you dreaming big while the other keeps the plan real. Together you can build something lasting if you respect both the vision and the steps.",
    ease: "Growth and structure balance well between you two, which helps long term plans hold together. Set a five year dream as a pair and break it into small steps you both can follow.",
    tension: "One of you may want to expand while the other wants to hold back, which can cause friction over plans. Meet in the middle by trying a small step first, then growing from there.",
  },
  "jupiter-uranus": {
    blend: "Excitement and big ideas fill this contact, and you two may encourage each other to try bold new things. Keep a shared list of adventures and tick one off whenever you can.",
    ease: "You two give each other freedom to grow, and fresh chances seem to show up when you are together. Say yes to a surprise invitation now and then, and see where it leads.",
    tension: "Restless plans can pile up here, and one of you may change direction before the other is ready. Talk through big shifts together, so both of you feel part of the choice.",
  },
  "jupiter-neptune": {
    blend: "Shared ideals and gentle faith bloom here, and you two may feel inspired by the same dreams. Volunteering, making art or spending calm time in nature together can feed this bond well.",
    ease: "Kindness, hope and imagination flow between you two, giving the bond a soft, generous feel. A shared hobby that helps others, like a community garden, can bring you closer.",
    tension: "Big dreams can drift away from daily life here, with one of you hoping for more than plans can hold. Keep your shared goals concrete, and celebrate each small, real step.",
  },
  "jupiter-pluto": {
    blend: "Ambition and depth meet here, and you two may push each other toward big, meaningful change. Pick one goal that truly matters to both of you, and give it your full effort.",
    ease: "You two can help each other grow in confident, powerful ways, and trust builds through shared aims. Backing each other's big plans can make the bond strong and lasting.",
    tension: "One of you may push hard for growth while the other feels pressured or overpowered. Share decisions fairly, and check in often about who is carrying the weight.",
  },
  "saturn-saturn": {
    blend: "You two share a similar sense of duty and timing, so you often agree on how to handle serious matters. Building steady routines together, like a weekly planning hour, comes naturally.",
    ease: "Your ways of handling responsibility fit well, which helps you two face hard times as a team. Talking through long term plans can feel calm and reassuring for you both.",
    tension: "You two may handle rules, worries and duties in different ways, which can feel heavy at times. Share the load clearly, and remember to make room for fun as well as work.",
  },
  "saturn-uranus": {
    blend: "Tradition meets change here, with one of you wanting stability and the other wanting freedom. Together you can find a smart middle way if each of you respects the other's need.",
    ease: "One of you brings structure and the other brings fresh ideas, a useful mix for building something new. Try planning an unusual project with clear steps, and enjoy the balance.",
    tension: "One of you may feel held back while the other feels shaken up, so tension can rise over change. Agree on what stays steady and what can shift, and both of you will feel safer.",
  },
  "saturn-neptune": {
    blend: "Dreams meet reality here, and one of you may help the other give shape to their hopes. Turning a shared vision into small, practical steps can be very satisfying for you two.",
    ease: "One of you brings imagination and the other brings structure, so together you can make dreams more solid. A creative project with a clear deadline suits this pairing well.",
    tension: "One of you may find the other too strict, while the other finds the first too vague. Respect both sides, and set gentle, clear plans that still leave space for dreaming.",
  },
  "saturn-pluto": {
    blend: "This contact brings serious weight, and you two may face big challenges with real grit side by side. Be patient with each other, and value the strength you build over time.",
    ease: "You two can build lasting things together, with deep resolve and steady effort. Long term goals, like making a home that feels truly yours, suit this patient and powerful pairing.",
    tension: "Control and caution can clash here, with one of you pressing hard while the other holds firm. Speak openly about fears and goals, and look for ways to share control.",
  },
  "uranus-uranus": {
    blend: "Close in age, you two share this with much of your generation, so you tend to want the same kinds of change and freedom. Swapping stories about the songs and gadgets you grew up with is an easy way to connect.",
    ease: "This contact points to an age gap, with your two generations seeing change in friendly ways. Showing each other new music or tools from your own era can be a fun way to connect.",
    tension: "This contact usually marks an age gap, and your generations may want change at different speeds. Stay curious about how each of you grew up, and you will find more common ground than you expect.",
  },
  "uranus-neptune": {
    blend: "For two people close in age, this contact is shared by a whole generation and adds only a soft background note. You may find you both dream of a freer, kinder world and enjoy similar ideals.",
    ease: "Shared by many people born in the same years, this contact lends a gentle note of common ideals. Talking about the causes and art that moved you growing up can bring a sense of kinship.",
    tension: "Common across your generation when you two are close in age, this contact adds small differences in how you balance change and dreams. Listen kindly when your hopes for the future differ.",
  },
  "uranus-pluto": {
    blend: "When you two are close in age, many people your age share this contact, so it mostly reflects the era you grew up in. You may both feel strongly about the big changes of your time.",
    ease: "Shared across your generation, this contact suggests you two see big social changes in a similar light. Talking about the events that shaped your youth can show how much you agree.",
    tension: "This is mostly a generational contact, shared by many people born in the same years, and it adds a mild undercurrent of restlessness. Give each other room to push for the changes you each care about.",
  },
  "neptune-neptune": {
    blend: "Close in age, you two share this with your whole generation, so your dreams and ideals tend to look alike. Swapping the films and songs that moved you when you were young can feel like coming home.",
    ease: "This contact often marks a big age gap, yet your generations' dreams and ideals sit in friendly harmony. Sharing the stories and art that inspired each of you can be a lovely bridge.",
    tension: "This contact usually marks a wide age gap, and your generations may dream about different things. Stay curious about what inspires each of you, and you will find shared hopes underneath.",
  },
  "neptune-pluto": {
    blend: "For two people close in age, this contact is shared by many in your generation and adds a soft, deep background note. You may both feel drawn to big questions about meaning and change.",
    ease: "Common across your generation, this contact lends a gentle sense of shared vision about how the world can change. It can show up as easy talk about the values you both grew up with.",
    tension: "Rare between people close in age, this contact can point to an age gap and different ideas about where the world is heading. Respect each other's views, and focus on what you hope for together.",
  },
  "pluto-pluto": {
    blend: "Close in age, you two share this with your whole generation, so you feel the same big pressures and changes of your time. It adds a modest sense of being in the same boat.",
    ease: "This contact often marks a large age gap, and your generations tend to see deep change in friendly ways. Sharing what each of you learned from hard times can build respect.",
    tension: "This contact marks a wide age gap, and your generations may face big change in very different ways. Patience and curiosity about each other's history help you meet in the middle.",
  },
};

export type Theme = 'attraction' | 'emotional' | 'communication' | 'commitment' | 'growth';

/** What each compatibility score means, for a low, middle and high score. */
export const THEME_TEXT: Record<Theme, { title: string; low: string; mid: string; high: string }> = {
  attraction: {
    title: "Attraction",
    low: "The spark between your charts is softer, so attraction may grow slowly through time spent together. Shared laughter, new places and small acts of care can build a warm pull over weeks and months.",
    mid: "There is a real spark between your charts, with some contacts that pull you close and some that ask for effort. Keep surprising each other with small gestures, and the attraction can keep growing.",
    high: "Your charts show a strong spark, with planets that draw you two toward each other with ease. Enjoy the chemistry, and give it lasting roots by also building trust and friendship.",
  },
  emotional: {
    title: "Emotional bond",
    low: "Your emotional styles differ, so feeling understood may take some patience and practice. Ask each other often what helps on a hard day, and you can build a bond that feels safe for both of you.",
    mid: "You two share a fair amount of emotional understanding, with some easy moments and some that need care. Regular check ins about how each of you feels can make the bond steadier over time.",
    high: "Your charts show deep emotional ease, so you two often sense each other's moods and needs. Keep caring for that closeness with small daily rituals, like a goodnight chat before sleep.",
  },
  communication: {
    title: "Communication",
    low: "You two think and talk in different ways, which can lead to mix ups now and then. Slowing down, repeating back what you heard and asking kind questions can turn talk into a real strength.",
    mid: "Conversation between you two flows fairly well, with a few topics that need extra care. Notice which subjects spark friction and approach them gently, and your talks will keep getting easier.",
    high: "Your charts show easy communication, so ideas and jokes pass between you two with little effort. Keep feeding that link with long talks, shared books and plenty of good listening.",
  },
  commitment: {
    title: "Commitment",
    low: "Your charts show fewer built in ties for long term steadiness, so commitment grows through the choices you make together. Clear promises, kept day by day, can give your bond strong roots.",
    mid: "There is a good base for loyalty between you two, along with a few areas that need steady effort. Talking openly about your plans for the future helps both of you feel secure.",
    high: "Your charts show strong staying power, with contacts that support loyalty and trust over time. Keep honoring that gift by keeping your promises and planning your future together.",
  },
  growth: {
    title: "Growth together",
    low: "Your charts show fewer easy paths for growing together, so shared progress may take some steady effort. Pick one new thing to learn or try as a pair, and build from each small success.",
    mid: "You two have some good chances to help each other grow, along with a few spots that ask for patience. Cheering each other on in personal goals can widen what you both see as possible.",
    high: "Your charts show strong support for growing together, so you two tend to bring out each other's best. Set shared dreams and keep encouraging each other, and your bond can keep expanding.",
  },
};
