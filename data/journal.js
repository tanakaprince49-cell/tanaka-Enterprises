/**
 * The Journal.
 *
 * The previous version of this page shipped three placeholder posts with
 * Unsplash stock images, "Spring 2025" dates and "Coming Soon" labels for
 * articles that never existed. These are real notes tied to real work.
 */


export const POSTS = [
  {
    slug: 'building-from-harare',
    title: 'Building from Harare is not a limitation',
    excerpt:
      'Being far from San Francisco changes the cost of a meeting and almost nothing else. What it actually buys you is time to think — and less noise to copy.',
    category: 'Philosophy',
    date: '2026-10-28',
    displayDate: '28 October 2026',
    readTime: '6 min',
    featured: true,
    body: [
      'People ask the question politely and it still lands the same way: what is it like building technology in Zimbabwe? The subtext is usually that it must be hard, or slower, or that the real work happens somewhere else.',
      'The honest answer is that distance removes almost nothing you need. You can get a domain, an API key and a Play Store listing from Harare in an afternoon. What distance removes is proximity — the accidental meeting, the investor who takes a coffee because you are in the same city.',
      'That is a real cost. It is also a filter. When nobody is inviting you to the room, you cannot get distracted by being seen in it. You spend the year building instead of networking about building.',
      'The second thing distance buys is that you are not copying. Most product decisions in a dense ecosystem are made by looking sideways at what everyone else shipped last week. From Harare, you have to decide what to build from first principles, because there is no ambient consensus to lean on.',
      'So LINKUP was designed around a problem that exists everywhere but is acute here: talent is not scarce, access is. Founders do not lack ambition, they lack a way to find the person who completes them. That is a network problem, not a capital problem, which means software can actually help.',
      'I am not going to pretend geography does not matter. It matters for fundraising and it matters for press. But it matters less than shipping something people use, and shipping does not need a zip code.',
    ],
  },
  {
    slug: 'what-stops-me-shipping',
    title: 'What actually stops me shipping',
    excerpt:
      'Not skill, not time, not money. It is the gap between a working prototype and the twelve unglamorous things a product needs before a stranger can trust it.',
    category: 'Engineering',
    date: '2026-10-12',
    displayDate: '12 October 2026',
    readTime: '5 min',
    body: [
      'A prototype takes a weekend. The distance between a prototype and something a stranger can rely on is where most projects die — and it is never one big missing feature. It is twelve small ones.',
      'Password reset that actually sends an email. An empty state that explains what to do. A loading state so the app does not look frozen on a 3G connection. Error messages that tell you what happened. A privacy policy, because without it you cannot ship to a store.',
      'None of it is interesting. All of it is the difference between a demo and a product. I have started keeping a file called "finish line" and refusing to add features while anything in it is open.',
      'The other blocker is polish paralysis. You can rewrite the same screen five times. The rule I now use: if a real person has not complained about it, it is not broken, it is just not done to my taste. Taste is not a reason to delay.',
      'Shipping is a skill. It is not the same skill as building, and it is the one nobody teaches.',
    ],
  },
  {
    slug: 'no-engagement-metrics',
    title: 'We do not measure engagement',
    excerpt:
      'Time-in-app is a business metric masquerading as a health metric. If someone finds what they need and closes the app in ninety seconds, that is the product working.',
    category: 'Product',
    date: '2026-09-19',
    displayDate: '19 September 2026',
    readTime: '7 min',
    body: [
      'Most consumer software is optimised for a number that is not in the user\'s interest. Time in app, sessions per day, notification open rate. None of these measure whether the person got what they came for — they measure whether the product was able to keep them.',
      'That is not a neutral design choice, it is an extractive one. If the business model pays you for attention, your roadmap will drift towards taking more of it, and you will call that growth.',
      'LINKUP is a matchmaking product. Success is a match that turns into something. The correct moment for a user to leave is once they have found their person. If they are back on the app next week, we may have failed twice.',
      'This makes the metrics harder to put on a slide. Instead of retention curves I care about: how long until a new user sends their first message, how many introductions turn into conversations, how many people stop needing us. That last one is a target, not a leak.',
      'It also constrains the design. No streaks. No red badges for things that are not urgent. No "someone viewed your profile" unless there is something to act on. Each of those is a small theft of attention dressed as engagement.',
      'The longer I build, the more I think the only sustainable advantage in software is being trusted. You cannot buy that back once you have spent it on notifications.',
    ],
  },
  {
    slug: 'what-a16z-question-means',
    title: 'What the "a16z door" question actually asks',
    excerpt:
      'A reporter asked whether a 15-year-old from Zimbabwe can knock on a top Silicon Valley door. The interesting part is not my answer, it is what the question reveals.',
    category: 'Business',
    date: '2026-08-30',
    displayDate: '30 August 2026',
    readTime: '4 min',
    body: [
      'When the Wetindey Tech cover ran, the question was framed as a provocation: is a young founder from Harare even allowed to knock on a16z\'s door?',
      'I understand why it reads that way. But the premise is slightly wrong. Nobody is refused at the door for being young or being far away. The door is simply not on your street, and nobody tells you which street it is on.',
      'That is an information asymmetry, not a wall. It is solved by distribution: coverage, warm introductions, a product people can see working. Which is exactly what building in public is for.',
      'The reason I answer this question seriously rather than brushing it off is that the framing matters to other builders. If we tell a generation that the room is closed, some believe it and stop walking towards it.',
      'The room is not closed. There is a queue, there is a cost, and the queue is not sorted by talent. Best thing you can do is give yourself something to be found for.',
    ],
  },
];

export const POSTS_BY_DATE = [...POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default POSTS;
