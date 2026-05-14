export type TimelineEntryData = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  details?: {
    icon: string;
    text: string;
  }[];
  accentColor: string;
  borderColor: string;
  bgColor?: string;
};

export const timelineData: TimelineEntryData[] = [
  {
    title: 'Early 2026',
    subtitle: 'Published npm Package — robot-toast',
    description:
      'Designed and published robot-toast, a zero-dependency, framework-agnostic toast notification library with full TypeScript support, SSR safety, and 16 built-in animated variants. Shipped as dual ESM/CJS builds with a dedicated demo site. Taking a library from API design to public release is a different discipline than building apps — this was intentional practice in open-source ownership.',
    image: '/project/robotToast.png',
    imageAlt: 'robot-toast npm package',
    accentColor: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    bgColor: 'bg-orange-500/10',
  },
  {
    title: 'Late 2025 — Present',
    subtitle: 'Full-Stack Developer Intern — DataVinci Analytics',
    description:
      'Working as a Full-Stack Developer Intern at DataVinci Analytics, a data analytics agency. Contributing to client-facing web applications, working within production codebases, and operating under real delivery timelines — a fundamentally different environment from personal projects.',
    image: '/img/dv.png',
    imageAlt: 'DataVinci Analytics Agency',
    accentColor: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'border-indigo-500/30',
  },
  {
    title: 'Mid 2025',
    subtitle: 'Freelance Full-Stack Developer — AgraEcom',
    description:
      'Built a full-stack B2B e-commerce platform for a local wholesale business over 2 months — real client, real requirements, real constraints. Handled everything from system design and implementation to deployment and post-launch iteration. The platform received 100+ orders in its first month of operation.',
    image: '/project/agraEcom.png',
    imageAlt: 'AgraEcom project',
    accentColor: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    title: 'Late 2024',
    subtitle: 'Smart India Hackathon 2024 — Top 48 Finalist',
    description:
      'Reached the national finals of Smart India Hackathon 2024, placing in the top 48 of 1200+ competing teams. Led frontend development of PrithView — a satellite imagery analysis platform built for ISRO — covering semantic segmentation, ROI selection, and automated feature detection for urban planning use cases. Competing at this level under time pressure, against the best student teams in the country, was a turning point.',
    image: '/img/sih.jpg',
    imageAlt: 'SIH 2024 Finalist',
    accentColor: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    title: 'Mid 2023',
    subtitle: 'War of Codes — Gold Medal',
    description:
      'Won the Gold Medal at War of Codes, the competitive programming event at my college\'s annual technical fest. First significant competitive programming result — confirmed that the hours spent on DSA and algorithmic problem-solving were translating into performance under pressure.',
    image: '/img/codewars.jpg',
    imageAlt: 'War of Codes Gold Medal',
    accentColor: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
  },
  {
    title: '2022',
    subtitle: 'Class XII — PCM',
    description:
      'Completed Class XII in the PCM stream with 85%. The mathematical foundation built here — particularly in calculus and discrete math — has been directly relevant to algorithms, system design, and everything that followed.',
    image: '/img/school.jpg',
    imageAlt: 'Class XII',
    accentColor: 'from-blue-500/20 to-purple-500/20',
    borderColor: 'border-blue-500/30',
  },
];