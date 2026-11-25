export interface NavItem {
  label: string;
  href: string;
}

export interface AppCapability {
  id: string;
  index: string;
  title: string;
  description: string;
  placeholderNote: string;
  screenFocus: string;
  screenshotSrc?: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  imageWebp: string;
  imageFallback: string;
  imageAlt: string;
  objectPosition?: string;
}

export const BRAND = {
  name: 'Chalo Walk Par',
  hindiTagline: 'हर दिन 30 मिनट · Step Towards Health.',
  headline: 'Every Step. A Healthier Tomorrow.',
  supportingMessage: 'Your Community. Your Health. Your Journey.',
  emblemSrc: '/assets/optimized/chalo-emblem.png',
  emblemFallbackSrc: '/assets/aistudio/image_e7b6d1d5.png',
};

export const CONTACT = {
  email: 'chalowalkpar@gmail.com',
  playStore: 'https://play.google.com/store/apps/details?id=com.chalowalkpar.app',
  instagram: 'https://www.instagram.com/chalowalkpar/',
  linkedin: 'https://www.linkedin.com/in/chalo-walk-par-%E2%84%A2%EF%B8%8F-825a24417/',
  careers: 'https://lnkd.in/p/dheKF5KM',
  youtube: 'https://youtube.com/@madhavsingh483',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'App', href: '#app' },
  { label: 'Community', href: '#community' },
  { label: 'Events', href: '#events' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const ASSETS = {
  heroVideo: '/assets/aistudio/People_walking_in_park_5fe965a4_t1.1-8_ba3173bc.mp4',
  heroPoster: '/assets/optimized/video_people_poster.jpg',
  closingVideoWide: '/assets/optimized/pathway_wide.mp4',
  closingVideoPortrait: '/assets/optimized/pathway_portrait.mp4',
  closingPoster: '/assets/optimized/pathway_wide_poster.jpg',
  shoesWebp: '/assets/optimized/shoes.webp',
  shoesPng: '/assets/aistudio/image_40d9cc8c.png',
  seniorCoupleWebp: '/assets/optimized/senior-couple.webp',
  seniorCouplePng: '/assets/aistudio/image_6b4d2c9d.png',
  familyWebp: '/assets/optimized/family.webp',
  familyPng: '/assets/aistudio/image_2191b103.png',
  soloWalkerWebp: '/assets/optimized/solo-walker.webp',
  soloWalkerPng: '/assets/aistudio/image_e7b6d1d5.png',
};

export const BENEFIT_PILLARS = [
  {
    id: 'physical',
    index: '01',
    title: 'Physical Wellbeing',
    description:
      'Regular walking supports cardiovascular fitness, mobility, and everyday physical activity.',
  },
  {
    id: 'mental',
    index: '02',
    title: 'Mental Wellbeing',
    description:
      'Step away from the rush, spend time outdoors, and make room for a clearer mind.',
  },
  {
    id: 'ageing',
    index: '03',
    title: 'Healthy Ageing',
    description:
      'Stay active, maintain mobility, and make movement part of every stage of life.',
  },
];

export const APP_CAPABILITIES: AppCapability[] = [
  {
    id: 'daily-steps',
    index: '01',
    title: 'Daily Steps',
    description: 'See your daily step count and progress towards your goal.',
    placeholderNote: 'Official App Screenshot Placeholder · Daily Steps View',
    screenFocus: 'Daily goal progress ring & today’s step summary',
    screenshotSrc: '/assets/screenshots/activity.png',
  },
  {
    id: 'walk-tracking',
    index: '02',
    title: 'Walk Tracking',
    description: 'Track walking sessions with GPS, distance, and duration.',
    placeholderNote: 'Official App Screenshot Placeholder · Live Walk Tracking',
    screenFocus: 'Active GPS route map, elapsed duration & distance',
    screenshotSrc: '/assets/screenshots/gps-tracking.jpeg',
  },
  {
    id: 'activity-history',
    index: '03',
    title: 'Activity History',
    description: 'Review previous activity and walking sessions.',
    placeholderNote: 'Official App Screenshot Placeholder · Activity History',
    screenFocus: 'Chronological log of completed walks & sessions',
    screenshotSrc: '/assets/screenshots/history.png',
  },
  {
    id: 'weekly-progress',
    index: '04',
    title: 'Weekly Progress',
    description: 'Understand your activity trends over time.',
    placeholderNote: 'Official App Screenshot Placeholder · Weekly Progress',
    screenFocus: 'Multi-day activity trend chart & consistency overview',
    screenshotSrc: '/assets/screenshots/insights.png',
  },
  {
    id: 'leaderboard',
    index: '05',
    title: 'Leaderboard',
    description: 'Compare progress across individuals and groups.',
    placeholderNote: 'Official App Screenshot Placeholder · Leaderboard',
    screenFocus: 'Friendly individual and group walking standings',
    screenshotSrc: '/assets/screenshots/leaderboard.png',
  },
  {
    id: 'community-groups',
    index: '06',
    title: 'Live Chat',
    description: 'Say hi to fellow walkers and swap encouragement in real time.',
    placeholderNote: 'Official App Screenshot Placeholder · Live Chat',
    screenFocus: 'Community-wide live chat with fellow walkers',
    screenshotSrc: '/assets/screenshots/live-chat.png',
  },
];

export const COMMUNITY_HIGHLIGHTS = [
  'Create or join walking groups.',
  'Invite friends and family.',
  'Participate in group challenges.',
  'Follow community leaderboards.',
  'Celebrate collective progress.',
];

export const GENERATION_HIGHLIGHTS = [
  'Start at your own pace.',
  'Make movement a family habit.',
  'Celebrate consistency, not perfection.',
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: '01',
    title: 'Join Chalo Walk Par',
    description: 'Get started and set up your walking profile.',
    imageWebp: ASSETS.soloWalkerWebp,
    imageFallback: ASSETS.soloWalkerPng,
    imageAlt: 'Walker in a Chalo Walk Par t-shirt striding along a tree-lined Indian morning path',
    objectPosition: '70% 25%',
  },
  {
    number: '02',
    title: 'Step Outside',
    description: 'Walk, track your activity, and make movement part of your day.',
    imageWebp: ASSETS.shoesWebp,
    imageFallback: ASSETS.shoesPng,
    imageAlt: 'Close-up of walking shoes stepping onto a golden-hour park trail',
    objectPosition: '50% 60%',
  },
  {
    number: '03',
    title: 'Grow Together',
    description:
      'Follow your progress, participate in challenges, and stay motivated with your community.',
    imageWebp: ASSETS.familyWebp,
    imageFallback: ASSETS.familyPng,
    imageAlt: 'Multigenerational Indian family walking together in Chalo Walk Par jackets',
    objectPosition: '55% 25%',
  },
];

export interface EventClip {
  id: string;
  title: string;
}

export const EVENTS: EventClip[] = [
  { id: 'RIXIHzEwEIc', title: 'Walkathon' },
  { id: 'fx9HA0E0UR8', title: 'Fun Run' },
  { id: 'Fa6y3cgCHNk', title: 'Chalo Walk Par Walkathon' },
  { id: 'BfLisE8KtdQ', title: 'Run to Keep Yourself Healthy' },
];

export const FOUNDER = {
  photoSrc: '/assets/people/dr-madhav.png',
  initial: 'M',
  name: 'Dr. Madhav',
  role: 'Creator & Visionary',
  quote:
    'I built Chalo Walk Par because I believe that the simplest act — walking — can transform lives. As a doctor, I saw patients struggle with lifestyle diseases that a daily walk could prevent. This app is my dream: a community where every step counts, every walker matters, and health becomes a joyful journey we take together.',
  tags: [
    { emoji: '🏥', label: 'Doctor' },
    { emoji: '🚶', label: 'Walker' },
    { emoji: '💡', label: 'Builder' },
  ],
  credentials: {
    title: 'Associate Professor · Cardiothoracic Surgeon',
    institution: 'IGIMS Patna · Full-time',
    duration: 'Dec 2019 - Present · 7 yrs',
    location: 'Patna, Bihar, India',
  },
};
