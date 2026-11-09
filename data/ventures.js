/**
 * What Tanaka Enterprises actually has.
 *
 * Status values are honest on purpose: a product that is not live says so.
 * The previous version of this site pointed every call to action at
 * nestly-eight.vercel.app, which returns 404 — "Start Tracking Today" led to a
 * dead page. Nothing here links anywhere that does not resolve.
 */



export const VENTURES = [
  {
    id: 'linkup',
    name: 'LINKUP',
    tagline: 'Find the people who build like you do.',
    description:
      'An AI-powered co-founder and collaborator matchmaking platform. Linky, the conversational assistant, reads what you are actually building and introduces the developer, designer or operator who completes it. Built in Harare, used globally.',
    status: 'live',
    statusLabel: 'Live',
    year: '2024 —',
    role: 'Founder & CEO',
    platform: 'Android · Web',
    href: 'https://linkupbuild.com/',
    hrefLabel: 'linkupbuild.com',
    playStore: 'https://play.google.com/store/apps/details?id=com.tana.linkup',
    accent: '#38bdf8',
    glyph: 'link',
    facts: [
      { label: 'Users', value: 'Beta cohort' },
      { label: 'Stack', value: 'React · Node · TypeScript' },
      { label: 'Distribution', value: 'Google Play · Web' },
    ],
  },
  {
    id: 'tanaka-enterprises',
    name: 'Tanaka Enterprises',
    tagline: 'The holding company.',
    description:
      'This company. A small studio that builds and holds software products to the same standard: no engagement bait, no dark patterns, no data sold. Every product under this roof has to justify the time it asks for.',
    status: 'live',
    statusLabel: 'Active',
    year: '2024 —',
    role: 'Founder',
    platform: 'Harare, Zimbabwe',
    accent: '#8b5cf6',
    glyph: 'enterprise',
    facts: [
      { label: 'Model', value: 'Holding company' },
      { label: 'Products', value: '1 live, 1 in development' },
      { label: 'Based', value: 'Harare, Zimbabwe' },
    ],
  },
  {
    id: 'tanakagaadzikwa',
    name: 'tanakagaadzikwa.com',
    tagline: 'The public record.',
    description:
      'My personal site: biography, long-form writing, press kit and photography. It is the canonical page for who I am, and the place journalists are sent first.',
    status: 'live',
    statusLabel: 'Live',
    year: '2025 —',
    role: 'Author & publisher',
    platform: 'Web',
    href: 'https://www.tanakagaadzikwa.com/',
    hrefLabel: 'tanakagaadzikwa.com',
    accent: '#fbbf24',
    glyph: 'pen',
    facts: [
      { label: 'Type', value: 'Personal site' },
      { label: 'Includes', value: 'Bio · Journal · Press kit' },
    ],
  },
  {
    id: 'nestly',
    name: 'Nestly',
    tagline: 'Pregnancy tracking, without the noise.',
    description:
      'A pregnancy tracker for weight, sleep, hydration and symptoms that does not turn a medical journey into a growth loop. The build is paused while LINKUP takes priority — there is no live app to send you to yet, and I would rather say that than link you to a dead page.',
    status: 'in-development',
    statusLabel: 'Paused',
    year: '2025',
    role: 'Designer & engineer',
    platform: 'Web',
    accent: '#f472b6',
    glyph: 'heart',
    facts: [
      { label: 'Status', value: 'Build paused' },
      { label: 'Reason', value: 'LINKUP prioritised' },
      { label: 'Access', value: 'No live app yet' },
    ],
  },
];

export const LIVE_VENTURES = VENTURES.filter((v) => v.status === 'live');

export default VENTURES;
