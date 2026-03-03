export type LetterStatus = 'locked' | 'in-progress' | 'live'
export type ProjectHighlight = 'winner' | 'customers'

export type LetterProject = {
  letter: string
  slug: string
  title: string
  status: LetterStatus
  highlights?: ProjectHighlight[]
  liveUrl?: string
  image?: string
  blurb: string
  summary: string
  whatBuilt: string[]
  impact: string
  next: string
}

export const letterProjects: LetterProject[] = [
  {
    letter: 'B',
    slug: 'b',
    title: 'Brain Dump',
    status: 'live',
    highlights: [],
    liveUrl: 'https://one-day-blue.vercel.app/',
    image: '/assets/projects/brain-dump.gif',
    blurb: 'Turn messy thoughts into action',
    summary: 'A lightweight space to quickly capture thoughts and organize raw ideas.',
    whatBuilt: [
      'Fast input flow optimized for idea capture',
      'Simple structure to review and refine notes',
      'Lightweight UI built for low-friction daily use',
    ],
    impact: 'Made it easier to get ideas out quickly before context is lost.',
    next: 'Add tagging and retrieval to turn notes into actionable tasks.',
  },
  {
    letter: 'C',
    slug: 'c',
    title: 'Content Studio',
    status: 'live',
    highlights: ['customers'],
    image: '/assets/projects/content-studio.png',
    blurb: 'Simplify YouTube workflow',
    summary: 'A lightweight studio for drafting and publishing content workflows.',
    whatBuilt: [
      'Creator workflow for script draft, edit, and publish handoff',
      'Reusable content templates to keep publishing consistent',
      'Simple dashboard to track production status across videos',
    ],
    impact: 'Enabled a faster and more consistent YouTube production flow.',
    next: 'Add analytics feedback loops to improve topic and format decisions.',
  },
  {
    letter: 'E',
    slug: 'e',
    title: 'Earn It',
    status: 'live',
    highlights: [],
    image: '/assets/projects/earn-it.png',
    blurb: 'Curb consumerism during triathlon training',
    summary: 'A simple app to tie habits and goals to self-defined rewards.',
    whatBuilt: [
      'Goal and streak tracking flow for daily progress',
      'Reward unlock rules based on completed milestones',
      'Lightweight dashboard for tracking consistency over time',
    ],
    impact: 'Made it easier to stay consistent with habit goals.',
    next: 'Add shared challenges and accountability features.',
  },
  {
    letter: 'F',
    slug: 'f',
    title: 'French Tutor',
    status: 'live',
    highlights: [],
    liveUrl: 'https://github.com/Janecching/french-tutor',
    image: '/assets/projects/french-tutor.gif',
    blurb: 'Get conversational in French faster',
    summary: 'A lightweight French learning assistant focused on practical daily practice.',
    whatBuilt: [
      'Conversational practice flow for short study sessions',
      'Simple feedback loop to improve grammar and phrasing',
      'Quick iteration setup for experimenting with tutoring prompts',
    ],
    impact: 'Made language practice easier to start and sustain consistently.',
    next: 'Add personalized lesson paths and progress tracking.',
  },
  {
    letter: 'D',
    slug: 'd',
    title: 'Discovery Queue',
    status: 'live',
    highlights: [],
    liveUrl: 'https://discoverq-83c0b.web.app/',
    image: '/assets/projects/discovery-queue.png',
    blurb: 'Find the next favorite song',
    summary: 'Music discovery experience with quiz-based preference matching.',
    whatBuilt: [
      'Quiz-driven onboarding for listener preference capture',
      'Recommendation scoring based on user-selected signals',
      'Lightweight results interface optimized for quick iteration',
    ],
    impact: 'Shipped a playful way for users to find new songs quickly.',
    next: 'Improve recommendation quality with richer user listening data.',
  },
  {
    letter: 'G',
    slug: 'g',
    title: 'Green Fridge',
    status: 'live',
    highlights: ['winner'],
    liveUrl: 'https://devpost.com/software/greenfridge',
    image: '/assets/projects/green-fridge.png',
    blurb: 'Track expiry and reduce food waste',
    summary: 'Smart fridge camera + app to track food inventory and reduce waste.',
    whatBuilt: [
      'Fridge image capture and inventory tracking workflow',
      'Companion interface for checking available ingredients',
      'Project demo pipeline for fast hackathon iteration',
    ],
    impact: 'Won PennApps Google Prize and validated the concept with judges.',
    next: 'Improve item recognition reliability and expiry tracking.',
  },
  {
    letter: 'A',
    slug: 'a',
    title: 'AI Interviewer',
    status: 'live',
    highlights: ['winner'],
    liveUrl: 'https://devpost.com/software/x-pxaf5w',
    image: '/assets/projects/ai-interviewer.png',
    blurb: 'Feel confident in interviews',
    summary: 'AI interviewer that generates and scores candidate responses.',
    whatBuilt: [
      'Interview question generation with role-aware prompts',
      'Response scoring flow for first-pass candidate screening',
      'Review interface for structured recruiter feedback',
    ],
    impact: 'Selected as CalHacks Top 10 for practical recruiting use case.',
    next: 'Calibrate scoring rubrics with human-in-the-loop review data.',
  },
  {
    letter: 'H',
    slug: 'h',
    title: 'Homebase',
    status: 'live',
    highlights: ['winner'],
    liveUrl: 'https://devpost.com/software/virtual-campus-1ra9fq',
    image: '/assets/projects/home-base.png',
    blurb: 'Virtual campus for master’s program',
    summary: 'Virtual campus with live chat and focus-room collaboration.',
    whatBuilt: [
      'Virtual campus experience with shared social spaces',
      'Real-time chat for community interactions',
      'Focus room workflow to support structured study sessions',
    ],
    impact: "Won PennHacks People's Choice and improved remote engagement.",
    next: 'Add richer room types and moderation tooling for larger cohorts.',
  },
]

export function formatProjectTitleWithBadges(project: LetterProject) {
  const emojiMap: Record<ProjectHighlight, string> = {
    winner: '🏆',
    customers: '👤',
  }
  const suffix = (project.highlights || []).map((tag) => emojiMap[tag]).join('')
  return suffix ? `${project.title} ${suffix}` : project.title
}
