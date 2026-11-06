import type { Harmony } from './angleAspects';

/** A parent's and a child's planets in aspect. Same 55 keys as SYNASTRY. Spoken to the parent. Original Astronomads copy. */
export const FAMILY_CONTACT: Record<string, Record<Harmony, string>> = {
  "sun-sun": {
    blend: "You and your child share the same core spark, so you often recognize yourself in the way your child lights up. Make a habit of naming one thing you each did well today at dinner, and let your child go first so their pride gets room.",
    ease: "Your sense of purpose and your child's sit comfortably together, which makes it natural to cheer each other on. Choose a small family project each season, such as painting a room or planting seeds, and give your child a real job with real choices.",
    tension: "You and your child shine in different directions, and at times each of you may want to be the one in charge. Give your child one area that is fully theirs to run, like choosing the weekend breakfast, and stay out of it with a smile.",
  },
  "sun-moon": {
    blend: "One of you sets the tone and the other feels it right away, so your moods and your child's travel together. A steady bedtime ritual, like the same song or a short chat about the best part of the day, gives both of you a calm place to land.",
    ease: "Your child's feelings and your own goals tend to support each other, so home life often runs with a gentle rhythm. When your child is upset, sit beside them first and offer your plan for fixing things only after the tears have slowed.",
    tension: "What one of you wants to do and what the other needs to feel safe can pull apart, especially on busy days. Before a big change, such as a move or a new school, walk your child through it slowly and ask how it feels to them.",
  },
  "sun-mercury": {
    blend: "One of you talks easily about the very things the other cares about most, so your chats with your child can feel lively and close. Car rides make a good time for this, since side by side talk often feels easier for a child than face to face.",
    ease: "Ideas pass easily between you and your child, and one of you often finds the words the other is reaching for. During homework time, ask your child to explain the lesson back to you, and enjoy how quickly the pieces click for both of you.",
    tension: "One of you may hear the other's comments as a judgment, even when the words were only meant as advice. When you correct your child, start with what they did right, then keep the fix to one clear sentence about the task.",
  },
  "sun-venus": {
    blend: "You and your child find real delight in each other, and simple affection flows between you with ease. Say the kind thing you notice out loud, such as how carefully your child set the table, because praise lands softly in this bond.",
    ease: "Warmth and admiration come easily here, which makes ordinary time together feel sweet. A regular outing for just the two of you, like a Saturday stop at the library or a bakery, can become a treasured habit that lasts for years.",
    tension: "One of you may want more praise or attention than the other thinks to give, and small hurts can build up. Ask your child how they like to be shown love, whether that means a hug or a few kind words, and use their answer often.",
  },
  "sun-mars": {
    blend: "Energy runs high between you and your child, and play can turn competitive fast. Give that fire a healthy outlet, such as a weekly game of catch or a race to finish chores, and let your child set the rules now and then.",
    ease: "You and your child push each other forward in a friendly way, and one of you often gives the other the courage to try. Set a bold shared goal, like learning to ride a bike or training for a family fun run, and celebrate each step.",
    tension: "Two strong wills meet here, so small disputes can flare into contests about who is right. During a meltdown, kneel down to your child's level and speak softly. Save the talk about what happened for later, once you both feel settled.",
  },
  "sun-jupiter": {
    blend: "One of you helps the other feel braver and more hopeful, and generosity flows freely between you. Keep a family dream jar where you and your child drop wishes for the future, then read them aloud together at the end of each year.",
    ease: "Good humor and trust come naturally to you and your child, and you tend to bring out each other's best side. Learning something new together, like a few words of a new language before a trip, can deepen the bond in a joyful way.",
    tension: "You and your child may cheer each other into doing too much, from late nights to big promises that are hard to keep. Enjoy the shared hope, and keep a simple family calendar where your child can see what fits in each week.",
  },
  "sun-saturn": {
    blend: "This contact gives your bond weight and staying power, with one of you acting as a steady anchor for the other. Children feel safe with clear routines, so keep a predictable morning order and praise your child each time they handle a step alone.",
    ease: "Respect and loyalty grow easily here, and one of you often helps the other turn wishes into real plans. When your child wants something big, like a new bike, help them make a saving chart and mark their progress together each week.",
    tension: "One of you may feel held back by the other's rules or worries, while the other feels responsible for keeping things on track. Explain the reason behind each house rule in plain words, and loosen one rule as your child shows they are ready.",
  },
  "sun-uranus": {
    blend: "You and your child come from different generations, and this contact can make one of you feel like the other speaks a new language. Ask your child to teach you their favorite game or app, and treat their world with honest curiosity.",
    ease: "One of you brings fresh ideas and the other enjoys them, so the gap between your generations feels more exciting than strange. Let your child plan one surprise family outing each month, and go along with their choice with an open mind.",
    tension: "Your child may crave change and independence faster than feels comfortable for you, and part of this is the natural gap between generations. When a teen wants space, agree on a few clear check in times and give real freedom in between.",
  },
  "sun-neptune": {
    blend: "One of you sees the other through a soft, dreamy light, and your generations may picture the world in very different ways. Share stories at bedtime and invite your child to add their own endings, which lets imagination meet you halfway.",
    ease: "Kindness and imagination flow easily here, and the gap in your ages can feel gentle and full of wonder. Listen to music your child loves and share one song from your own youth, then talk about what each one makes you feel.",
    tension: "Hopes and reality can blur between you, and your generations may hold different dreams about what a good life looks like. When your child makes a promise, help them picture the actual steps, and keep your own expectations clear and kind.",
  },
  "sun-pluto": {
    blend: "This bond runs deep, and one of you may have a strong, lasting effect on how the other grows. Your generations meet here with real intensity. Give your child private spaces of their own, like a drawer or a journal, and respect them fully.",
    ease: "You and your child can help each other through hard seasons, and trust can grow very strong over time. When your child faces a big change, like a new school, share a story of a time you grew through something difficult yourself.",
    tension: "Power struggles can surface here, and part of the strain comes from the gap between your generations. When a standoff begins, offer your child two acceptable choices and let them pick, so both of you keep your dignity.",
  },
  "moon-moon": {
    blend: "You and your child feel things in a very similar way, so you often sense each other's mood before a word is spoken. Keep a cozy comfort ritual for rough days, like warm cocoa and a blanket on the couch, that either of you can ask for.",
    ease: "Your emotional rhythms fit together well, and home tends to feel safe for both of you. A short check in at bedtime, where each of you shares one high point and one low point, keeps that ease strong as your child grows.",
    tension: "You and your child need different things to feel safe, so comfort that works for one of you may miss the mark for the other. After a meltdown, once everyone is calm, ask your child what would help most next time and write it down together.",
  },
  "moon-mercury": {
    blend: "Feelings and words blend easily here, so your child can often tell you what is wrong once they feel heard. Try a feelings chart on the fridge for a young child, or a shared notes app for a teen who finds talking hard.",
    ease: "One of you helps the other put feelings into words, and conversations at home tend to feel gentle. When homework stress rises, pause to ask how your child feels about the task before you talk about the answers.",
    tension: "One of you may lead with logic while the other leads with feelings, and talks can leave someone feeling misunderstood. Start hard chats by naming the feeling you see, such as 'You seem frustrated,' and then wait for your child to fill in the rest.",
  },
  "moon-venus": {
    blend: "Tenderness comes naturally between you and your child, and small acts of care mean a great deal to both of you. Leave a short note in a lunch box or on a pillow now and then, since these little gestures stay with your child.",
    ease: "Comfort and affection flow easily here, and simple pleasures at home can feel like gifts. Cook a favorite meal together on a lazy Sunday, and let your child choose the music while you work side by side.",
    tension: "One of you may show love through comfort while the other shows it through treats or praise, and signals can get crossed. Notice how your child reaches out to you, and answer in that same way, even when it differs from your own habit.",
  },
  "moon-mars": {
    blend: "Strong feelings and quick reactions meet here, so emotions in your home can rise fast and fade just as fast. Build a calm down corner with soft pillows and a timer, and use it yourself too, so your child sees that it is for everyone.",
    ease: "One of you helps the other turn feelings into action, which can make you a great team when something needs doing. When your child feels restless or upset, go for a brisk walk together before you try to talk it through.",
    tension: "One of you may react sharply while the other feels hurt easily, and small sparks can sting. When voices rise, use a pause word your family chose ahead of time and take five minutes apart. Come back together with a hug before you talk.",
  },
  "moon-jupiter": {
    blend: "One of you lifts the other's spirits with ease, and your home can feel generous and full of good cheer. Celebrate small wins, like a finished puzzle or a brave first day, with a family tradition such as a special dessert.",
    ease: "Comfort and hope travel well between you and your child, and you tend to forgive each other quickly. After a hard day, share one thing you are each grateful for at bedtime, which helps both of you fall asleep on a hopeful note.",
    tension: "One of you may try to fix sad feelings with treats or big promises, while the other simply wants to be heard. When your child is upset, offer a hug and a listening ear first, and save the cheering up for a little later.",
  },
  "moon-saturn": {
    blend: "This contact brings a sense of duty to your bond, and one of you may feel responsible for the other's feelings. Show your child that rest matters as much as effort, perhaps with a slow Sunday morning where the family has nowhere to be.",
    ease: "Steady care flows easily here, and your child can lean on you as a reliable source of comfort. Keep bedtime at the same hour most nights, with a short story or a back rub, and your child will likely settle faster and sleep more soundly.",
    tension: "One of you may hold feelings back while the other wants more warmth, and the home can feel a little cool at times. Make affection part of the routine, such as a hug at the door each morning, so love feels as dependable as the rules.",
  },
  "moon-uranus": {
    blend: "Moods can shift suddenly between you and your child, and the gap between your generations adds a spark of the unexpected. Keep a flexible plan for weekends, with one free afternoon your child can fill with something fresh.",
    ease: "One of you gives the other room to feel things in an original way, and this generation gap tends to feel lively. Encourage your child to express feelings through art or music, and display their work proudly at home.",
    tension: "Your child may need more freedom with feelings than your generation was given, and sudden mood swings can surprise you both. When a teen pulls away, keep the door open with a simple text like 'Here if you need me,' and let them come back in their own time.",
  },
  "moon-neptune": {
    blend: "You and your child share a soft, intuitive bond, and your different generations may meet in a world of dreams and stories. Read together at bedtime long after your child can read alone, since this shared calm time feeds both of you.",
    ease: "Gentleness flows between you, and the gap between your generations can feel tender. Your child may pick up on your moods without a word, so speak kindly about your own feelings and show them that sadness passes.",
    tension: "Feelings can blur between you, and one of you may absorb the other's worries without knowing it. Your generations may also handle emotions differently. Help your child name their own feelings each evening, so they learn where yours end and theirs begin.",
  },
  "moon-pluto": {
    blend: "Emotions run deep between you and your child, and your bond can feel powerful across the generations. Give your child safe ways to let big feelings out, such as a punching pillow or a journal, and stay calm and close while they do.",
    ease: "You and your child can help each other heal after hard times, and trust tends to grow strong. When your child shares a secret or a fear, thank them for telling you, and keep it private unless their safety depends on sharing it.",
    tension: "Strong feelings and a wish for control can clash here, and part of it is the pull between your generations. When your child keeps things to themselves, avoid prying, and offer regular easy time together, like cooking, where talk can surface on its own.",
  },
  "mercury-mercury": {
    blend: "You and your child think alike, and conversations can bounce along with shared jokes and quick ideas. Start a family word game at dinner, like naming an animal for each letter of the alphabet, and let your child invent new rules for it.",
    ease: "Your minds work well together, so explaining and learning feel natural between you. During homework time, sit nearby with your own reading, and be ready to talk through a tricky question whenever your child asks.",
    tension: "You and your child think and speak at different speeds, which can lead to impatience on both sides. Give your child extra time to finish their sentences, and ask them to repeat back any instructions so you both know the plan.",
  },
  "mercury-venus": {
    blend: "Kind words flow easily here, and one of you has a gift for saying sweet things the other loves to hear. Write a short note of praise for your child each week, and invite them to write one back to you whenever they like.",
    ease: "Talking feels pleasant and easy, and you and your child enjoy sharing ideas about books or songs. Visit a museum or a craft fair together, and take turns pointing out the one thing you each liked most on the way home.",
    tension: "One of you may speak plainly while the other hears it as harsh, so tone matters a lot in this bond. When you give your child feedback, use a warm voice and add one sincere compliment, then ask how your words felt to them.",
  },
  "mercury-mars": {
    blend: "Quick minds and quick tempers meet here, and debates between you and your child can get lively. Turn that energy into fun with a family trivia night or a friendly debate on a silly topic, like the best pizza topping.",
    ease: "One of you sharpens the other's thinking, and you work well as a team on practical tasks. Give your child a real problem to solve, such as planning the route for a day trip, and let them lead while you assist.",
    tension: "Words can come out sharp here, and arguments may heat up faster than either of you expects. Agree on a family rule that anyone can call a short break during an argument, and use it yourself first to show how it works.",
  },
  "mercury-jupiter": {
    blend: "Curiosity runs high between you and your child, and you may love asking big questions together. Keep a list of the things your child wonders about, then look up the answers side by side on a slow weekend afternoon.",
    ease: "Learning feels joyful between you, and one of you often widens the other's view of the world. Pick a topic your child loves, like space or dinosaurs, and plan a library trip around it with books for both of you.",
    tension: "One of you may focus on the big picture while the other needs details, so plans and promises can get fuzzy. Before a school project, help your child break the task into small steps and write them on a list they can tick off.",
  },
  "mercury-saturn": {
    blend: "Careful thought marks your talks, and one of you often helps the other sort their ideas into order. Set up a tidy homework spot with a clear schedule, and let your child decorate it so the space feels like their own.",
    ease: "Clear thinking and patience come easily here, and you make a strong team for planning and study. Teach your child a simple way to plan a week, like a paper planner, and review it together every Sunday evening.",
    tension: "One of you may feel criticized or slowed down by the other's careful approach. When helping with homework, praise the effort you see, and let small mistakes slide so your child stays willing to try again tomorrow.",
  },
  "mercury-uranus": {
    blend: "Bright, unusual ideas spark between you and your child, and the gap between your generations shows up in how you each think. Let your child show you a new tool or trick they learned, and share an old skill of your own in return.",
    ease: "Your minds stretch each other in exciting ways, and the generation gap feels like a source of fresh ideas. Try a science kit or a building project together, and let your child test their wildest theories along the way.",
    tension: "Your child's ideas may seem to change fast, and their way of thinking reflects a different generation from yours. When you disagree about screens or new trends, ask questions first, then set limits together with clear reasons.",
  },
  "mercury-neptune": {
    blend: "Imagination colors your conversations, and your generations may meet through songs or make believe. Invent a bedtime story together that continues each night, with your child choosing what happens next to the hero.",
    ease: "One of you helps the other give words to dreams, and the gap in generations feels soft and creative. Keep a shared sketchbook where you both add drawings and thoughts, and look through it together on rainy days.",
    tension: "Messages can get lost between you, and your generations may use words in different ways. Keep instructions short and ask your child to repeat them back. When something seems misunderstood, check in gently and clear it up without blame.",
  },
  "mercury-pluto": {
    blend: "Deep and searching talks happen here, and your generations can explore serious topics with real honesty. When your child asks a hard question about life, answer truthfully at their level and let them know any question is welcome.",
    ease: "You and your child can get to the heart of things together, and trust grows through honest talk. Set aside regular one on one time, such as a walk after dinner, where your child knows they can share anything.",
    tension: "Talks can feel intense here, and one of you may feel pushed to reveal more than they wish. Your generations may also handle privacy differently. Give your teen room to share at their own pace, and keep their private messages private unless safety is at stake.",
  },
  "venus-venus": {
    blend: "You and your child enjoy many of the same simple pleasures, from favorite foods to favorite songs. Plan a cozy evening around a shared love, like baking cookies or watching a beloved movie, and make it a family tradition.",
    ease: "Affection and good taste flow easily between you, and you often agree on what makes a day lovely. Let your child help decorate their room or plan a small family party, and enjoy how naturally your styles fit together.",
    tension: "You and your child may have very different tastes, from clothes to music, and that can cause small clashes. Let your child make their own style choices where it is safe, and treat their taste with real interest and respect.",
  },
  "venus-mars": {
    blend: "Warmth and energy meet here, so playtime between you and your child can be lively and loving. Dance together in the kitchen while dinner cooks, or start a silly tradition like a pillow fight on Friday nights.",
    ease: "One of you brings gentleness and the other brings energy, and together you balance each other well. Pair a calm activity with an active one, such as a bike ride followed by a picnic, so both of you get what you enjoy.",
    tension: "One of you may want peace while the other wants action, so moods can clash at times. When your child is full of energy before bed, give them ten minutes of active play first, then shift to a soft, slow wind down.",
  },
  "venus-jupiter": {
    blend: "Generosity and joy flow freely here, and you and your child love to treat each other. Celebrate birthdays and milestones with heartfelt touches, like a handmade card, which can mean even more to both of you than a store bought gift.",
    ease: "Kindness and good humor come easily, and your home can feel warm and welcoming to everyone who visits. Invite your child to plan a small act of kindness each month, like baking for a neighbor, and do it together.",
    tension: "You and your child may spoil each other or overspend on treats, since both of you enjoy giving. Agree on a simple budget for special outings, and let your child help choose how to use it wisely.",
  },
  "venus-saturn": {
    blend: "Love here is steady and loyal, and one of you may show care through duty and reliability. Tell your child plainly that you love them, along with all the practical help, so the warmth feels clear in words too.",
    ease: "Affection grows slowly and lasts, and you and your child build a trusting bond over time. Keep a simple tradition year after year, like a first day of school photo, and look back at the pictures together as your child grows.",
    tension: "One of you may feel the other is too strict or reserved with affection, and that can sting. Balance rules with warmth by adding a little fun to routines, like a favorite song while you clean up after dinner.",
  },
  "venus-uranus": {
    blend: "Your child may love things that seem unusual to you, and this reflects the gap between your generations. Ask your child to share a favorite new song or style, and enjoy the surprise of seeing the world through their eyes.",
    ease: "Fresh tastes and an open heart meet here, and the generation gap feels playful. Try a new food or activity together each month, letting your child choose, and celebrate the adventure whether you love it or laugh about it.",
    tension: "Your child's style or friendships may surprise you, and part of this is simply the gap between your generations. When your teen wants to try a new look, set safe limits and leave the rest up to them, so they feel trusted.",
  },
  "venus-neptune": {
    blend: "Tender, dreamy affection flows between you and your child, and your generations may share a love of art or music. Make something beautiful together, like a painting or a playlist, and give it a special place in your home.",
    ease: "Gentle kindness runs through this bond, and the gap between your generations feels warm. Read stories that touch the heart, or volunteer together at an animal shelter, and talk afterward about how caring for others feels.",
    tension: "One of you may see the other as an ideal, and real life can bring small letdowns. Your generations may also dream in different ways. Accept your child as they are today, and praise the real efforts you see from them each week.",
  },
  "venus-pluto": {
    blend: "Love runs deep here, and your bond can feel strong and lasting across the generations. Show your child that love stays steady even after mistakes, with a simple phrase like 'I love you even when you're upset,' said often.",
    ease: "Deep loyalty grows easily between you and your child, and you tend to stand by each other through hard times. Mark big moments, like a recovery from illness or a tough school year, with a special dinner for just the family.",
    tension: "Strong feelings and a wish to hold on tight can create tension, partly from the gap between your generations. Let your child form their own friendships as they grow, and share your worries in calm, honest talks.",
  },
  "mars-mars": {
    blend: "You and your child share a similar drive, so you both like to act fast and may butt heads when you want different things. Channel the energy into an active game you play together, and let your child set the pace now and then.",
    ease: "Your energies work well together, and you make a strong team for active projects. Take on a family challenge, like a hike to a waterfall or building a treehouse, and give your child a key role in getting it done.",
    tension: "Two forceful energies meet here, so conflicts can flare when you both want your way. During a meltdown, step back and breathe before you respond, and later talk with your child about better ways to show anger.",
  },
  "mars-jupiter": {
    blend: "Bold energy and big hopes combine here, and you and your child can inspire each other to try new things. Sign up together for a beginner class, like rock climbing or swimming, and cheer each other through each new level.",
    ease: "Confidence grows easily between you, and you encourage each other's courage. Let your child plan a family adventure, such as a camping weekend, and back their choices with your support and practical help.",
    tension: "You and your child may push each other to take on too much at once, and enthusiasm can run ahead of energy. Help your child pick one main after school activity each term, and leave time for rest and free play.",
  },
  "mars-saturn": {
    blend: "Drive meets discipline here, and one of you may set limits on the other's energy. Give your child chores with a clear start and finish, like feeding the pet, and recognize their effort each time, even on days when it takes longer.",
    ease: "Effort and patience combine well, and you work together steadily on long tasks. Help your child learn a skill that takes practice, like an instrument, and keep a shared chart of their progress on the wall.",
    tension: "One of you may feel blocked or frustrated by the other's rules or pace, and power struggles can follow. Explain the reasons behind limits in calm words, and give your child chances to earn more freedom as they show responsibility.",
  },
  "mars-uranus": {
    blend: "Energy and independence spark together, and the gap between your generations can feel electric. Let your child try safe, adventurous activities, like a trampoline park or a skateboard lesson, and enjoy their fearless streak.",
    ease: "One of you inspires the other to take bold, original action, and this generation gap feels exciting. Encourage your child to start a small project of their own, like a backyard garden, and support it with tools and time.",
    tension: "Your child may push for independence faster than feels safe to you, and part of this comes from your different generations. When a teen wants more freedom, agree on clear rules for safety, then step back and trust them within those limits.",
  },
  "mars-neptune": {
    blend: "Energy and imagination mix here, and your generations may meet through creative play or performance. Put on a backyard play or make a short family film together, and let your child be the director from start to finish.",
    ease: "One of you helps the other turn dreams into action, and the generation gap feels gentle. Encourage your child's creative goals, like learning to draw or dance, and attend their shows with real excitement.",
    tension: "Energy can scatter here, and one of you may feel unsure about what the other really wants. Your generations may also chase goals in different ways. Set simple expectations for chores, and check in kindly when things slide.",
  },
  "mars-pluto": {
    blend: "Strong wills and deep drive meet here, and your bond can feel intense across the generations. Give your child big, safe challenges, like building a model or training for a race, where their strength can shine.",
    ease: "You and your child can push each other to grow stronger, and determination runs high in this bond. When your child faces a tough goal, like a hard test, share a story of your own persistence and help them make a plan.",
    tension: "Power struggles can arise easily, and part of the strain comes from the gap between your generations. When conflict starts, take a break before anyone says hurtful words, and later solve the problem together with calm voices.",
  },
  "jupiter-jupiter": {
    blend: "You and your child share similar hopes and beliefs, and your outlooks on life may line up well. Talk about the values that matter in your family, and let your child add their own ideas to a family motto you hang on the wall.",
    ease: "Your hopes support each other, and you both enjoy growth and new experiences. Plan a yearly family trip, even a short one close to home, and let your child research one fun stop along the way.",
    tension: "You and your child may have different ideas about what makes life meaningful, and that can spark debates. Listen to your child's views with curiosity, and share your own beliefs through stories from your own life.",
  },
  "jupiter-saturn": {
    blend: "Hope and caution meet here, and one of you may balance the other's big dreams with practical sense. When your child dreams up a plan, help them write down the first steps and set a simple timeline they can follow.",
    ease: "Optimism and patience work well together, and you can help each other reach long term goals. Start a savings goal with your child, perhaps for a special toy or trip, and celebrate together when they reach it.",
    tension: "One of you may feel the other is too cautious or too carefree, and plans can stall. Agree on one bold goal and one steady habit each season, so both of your styles get room in family life.",
  },
  "jupiter-uranus": {
    blend: "Big ideas and new experiences light up this bond, and the gap between your generations feels like an adventure. Explore a place neither of you has visited, like a new town or a science museum, and let your child pick the first stop.",
    ease: "One of you opens the other's mind to fresh ways of thinking, and the generation gap becomes a source of growth. Try a new hobby together, like coding or stargazing, and share what each of you learns over dinner.",
    tension: "Your child may seek freedom and new paths that seem far from your own, which reflects your different generations. When your teen chases a new interest, ask about it with curiosity and help them think through the risks.",
  },
  "jupiter-neptune": {
    blend: "Faith and imagination blend here, and your generations may share a love of stories and big dreams. Read inspiring books together or talk about heroes you both admire, and encourage your child to dream freely.",
    ease: "Hope and compassion flow easily, and the gap between your generations feels warm. Volunteer together for a cause your child cares about, and talk on the way home about how giving makes you both feel.",
    tension: "Dreams can grow large here, and one of you may expect more than real life can deliver. Your generations may hope for different things. Help your child turn a big wish into a small first step they can take this week.",
  },
  "jupiter-pluto": {
    blend: "Big hopes and deep drive combine here, and the bond between your generations can feel powerful. Support your child's passion for a subject or skill, and help them find a mentor or class that takes it further.",
    ease: "You and your child can help each other grow in strong, lasting ways, and the years between you add depth. When your child faces a setback, remind them of past times they bounced back, and help them plan their next move.",
    tension: "Ambition and control can clash here, and part of it comes from the gap between your generations. Let your child set their own goals in areas they care about, and offer support while they stay in charge of the plan.",
  },
  "saturn-saturn": {
    blend: "You and your child share a similar sense of duty, so you may both like routines and clear rules. Hold a short weekly family meeting where everyone, your child included, helps set the plans for the days ahead.",
    ease: "Your approaches to responsibility fit together, and home life can run with steady order. Give your child jobs that suit their age, like packing their own school bag, and trust them to do it well.",
    tension: "You and your child may handle rules and pressure in different ways, and both of you can feel weighed down at times. Lighten the load with a regular fun night, and remind your child that mistakes are part of growing up.",
  },
  "saturn-uranus": {
    blend: "Tradition and change meet here, and the gap between your generations can feel sharp at times. Explain the reasons behind family traditions, and invite your child to add a new one of their own that feels fresh to them.",
    ease: "One of you brings structure while the other brings new ideas, and the generation gap can turn into balance. Let your child suggest a new way to handle a routine, like how to share chores, and try it for a week.",
    tension: "Your child may push against rules that feel old fashioned to them, and part of this is simply the gap between your generations. Review house rules together each year, and change the ones that fit an age your child has outgrown.",
  },
  "saturn-neptune": {
    blend: "Structure and dreams meet here, and your generations may see duty and imagination in different lights. Help your child fit creative time into their week, like a set hour for drawing or music, so their dreams have a home.",
    ease: "One of you helps the other give shape to hopes, and the gap between your generations feels supportive. Help your child turn a creative idea into a finished piece, like a short story they can print and share with family.",
    tension: "One of you may feel the other is too strict or too dreamy, and the generation gap can blur expectations. Write family rules down in clear words, and stay patient when your child needs gentle reminders.",
  },
  "saturn-pluto": {
    blend: "Strength and endurance meet here, and the bond across your generations can feel serious and deep. Show your child how to face hard things with calm, and share family stories of resilience at the dinner table.",
    ease: "You and your child can build lasting strength together, and the generation gap becomes a source of wisdom. Teach your child a skill passed down in your family, like a recipe or a craft, and let them make it their own.",
    tension: "Control and pressure can build up here, and part of it comes from your different generations. Give your child real choices in daily life, and keep rules few and fair, so the pressure stays light for both of you.",
  },
  "uranus-uranus": {
    blend: "You and your child belong to different generations, each with its own ideas about freedom and change, and each of you may push against limits in your own way. Share what you pushed against at their age, and listen closely to their side.",
    ease: "Your generations seek freedom in ways that fit well together, so you can respect each other's need to be original. Encourage your child's unique style, and let them teach you about the trends and tools of their time.",
    tension: "The gap between your generations shows clearly in how you each think about freedom and change. Talk openly about the world your child is growing up in, and accept that some of their choices will look new to you.",
  },
  "uranus-neptune": {
    blend: "Your generations carry different dreams and ideas about change, and this contact links them in a gentle way. Talk with your child about how the world has changed since you were young, and share your hopes for their future.",
    ease: "One generation's fresh ideas meet the other's dreams in a friendly way, which can make the gap between you feel small. Try a creative project that mixes old and new, like making a digital scrapbook of family photos together.",
    tension: "Your generations may hold very different hopes about how the world should change, and that can lead to puzzled looks on both sides. Listen to your child's ideas about the future with respect, and share your own as stories.",
  },
  "uranus-pluto": {
    blend: "Your generations each carry a strong push toward change, and this contact links that drive across the years. Talk with your teen about big world events and how each of you sees them, and let them share their view fully.",
    ease: "Change and renewal flow between your generations, and you can help each other adapt. When your family goes through a big shift, like a move, invite your child to help plan how to make the new place feel like home.",
    tension: "Your generations may face change in very different ways, and this contact can stir strong reactions. When your child pushes for something new, ask about their reasons, and look for a small step you both can accept.",
  },
  "neptune-neptune": {
    blend: "You and your child come from different generations, each with its own dreams and ideals, and that gap is a normal part of family life. Share the songs or films that shaped your youth, and ask your child about the ones shaping theirs.",
    ease: "Your generations dream in ways that fit together gently, and imagination can bridge the years between you. Create a family tradition around stories, like a monthly movie night where you and your child take turns picking the film.",
    tension: "Your generations may hold different ideals and hopes, and this can make it hard to see each other clearly at times. Ask your child about their dreams with curiosity, and share yours without expecting the two to match.",
  },
  "neptune-pluto": {
    blend: "Deep dreams and strong drive link your generations, and this contact runs through the background of your bond. Talk about your family's history together, and let your child ask anything they wonder about the people who came before.",
    ease: "Your generations share a gentle link between dreams and growth, and the years between you can feel like a gift. Make a family time capsule with letters to the future, and open it together in a few years.",
    tension: "Your generations may see change and ideals in very different lights, so big topics can feel heavy between you. When you disagree, listen first and share your view calmly, so the bond stays strong whatever the outcome.",
  },
  "pluto-pluto": {
    blend: "You and your child belong to different generations, each shaped by its own deep changes in the world. Share stories of the challenges your generation faced, and listen to your child's view of the world they are growing up in.",
    ease: "The paths of change in your two generations fit together, and you can learn a great deal from each other. Start a habit of talking about one big world event each month at dinner, and give your child's thoughts real weight.",
    tension: "Your generations meet very different pressures, which can make each other's choices hard to understand at first. Approach your child's world with respect, and offer your own experiences as guides they are free to use.",
  },
};

export type FamilyTheme = 'warmth' | 'understanding' | 'structure' | 'freedom' | 'growth';

/** What each parent and child score means, low, middle and high. */
export const FAMILY_THEME: Record<FamilyTheme, { title: string; low: string; mid: string; high: string }> = {
  warmth: {
    title: "Warmth",
    low: "Affection may take a little more effort between you and your child, since your natural ways of showing love differ. Small, steady gestures help a lot here, like a hug at the door or a note in a lunch box. Warmth you build on purpose can grow very strong over the years.",
    mid: "Warmth flows between you and your child in a steady, ordinary way, with some easy days and some that take more care. Learn the ways your child likes to receive love, and keep a few simple rituals that both of you can count on.",
    high: "Affection comes easily between you and your child, and home can feel like a soft place to land for both of you. Enjoy that closeness, and keep making time for it as your child grows, since older children still need warm moments with a parent.",
  },
  understanding: {
    title: "Understanding",
    low: "You and your child think and feel in quite different ways, so it can take extra patience to see each other's point of view. Ask open questions and repeat back what you heard before you reply. Over time, this difference can teach both of you a great deal.",
    mid: "You and your child understand each other well on some topics and less well on others. Notice which subjects flow easily and which ones lead to mix ups, and use the easy ones as a bridge when harder talks come up.",
    high: "You and your child tend to understand each other with little effort, and conversations often feel natural. Use this gift to talk about the big things too, like worries and hopes, so your child knows they can always come to you.",
  },
  structure: {
    title: "Structure",
    low: "Rules and routines may be a sticking point between you and your child, since your styles of order differ. Keep the house rules few and clear, and explain the reason behind each one. Your child will likely respond best to structure they helped shape.",
    mid: "Routines work fairly well between you and your child, with some areas running smoothly and others needing a fresh look. Review family rules now and then as your child grows, and adjust the ones that suited an earlier age.",
    high: "Structure comes naturally to this bond, and routines tend to give both of you a steady sense of safety. Keep the rhythm, and remember to leave room for play and surprise so the order feels supportive and light.",
  },
  freedom: {
    title: "Freedom",
    low: "You and your child may see independence differently, so questions of space and trust can need careful talks. Agree on clear check ins, and widen your child's freedom in small, steady steps as they show they are ready. Patience on both sides helps this area grow.",
    mid: "Freedom and closeness balance fairly well between you and your child, with some give and take. Talk openly when your child asks for more space, and look for a middle path that keeps them safe while it helps them grow.",
    high: "You and your child give each other room easily, and trust around independence tends to come naturally. Keep that trust strong by staying curious about your child's world, and by sharing your own plans with them too.",
  },
  growth: {
    title: "Growth",
    low: "Growth between you and your child may come through challenges more than ease, and that can be a real strength. Hard moments give you both chances to practice patience and forgiveness. Celebrate each small step forward, and remember that progress in a family often takes time.",
    mid: "You and your child help each other grow in steady, ordinary ways, with some lessons that come easily and some that take effort. Try a new challenge together now and then, like a class or a project, and talk about what each of you learned.",
    high: "You and your child bring out each other's best, and growth tends to feel natural and encouraging. Use that energy to set shared goals, like learning a skill together, and take time to look back at how far you have both come.",
  },
};
