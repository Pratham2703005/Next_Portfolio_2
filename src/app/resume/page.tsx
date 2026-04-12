import type { Metadata } from 'next';
import ResumeViewer from './ResumeViewer';

export const metadata: Metadata = {
  title: 'Resume — Pratham Israni | Full-Stack Developer',
  description:
    'View or download the resume of Pratham Israni — Full-Stack Developer, SIH 2024 Finalist (Top 48/1200+), 600+ LeetCode problems solved. React, Next.js, TypeScript, Node.js.',
  keywords: [
    'Pratham Israni resume',
    'Pratham Israni CV',
    'Full-Stack Developer resume',
    'React developer resume',
    'Next.js developer',
    'SIH 2024 Finalist',
    'TypeScript',
    'Node.js',
  ],
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume — Pratham Israni',
    description:
      'Full-Stack Developer · SIH 2024 Finalist · React, Next.js, TypeScript, Node.js.',
    url: '/resume',
    type: 'profile',
    images: [
      {
        url: '/profile3.jpg',
        width: 1200,
        height: 630,
        alt: 'Pratham Israni — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume — Pratham Israni',
    description:
      'Full-Stack Developer · SIH 2024 Finalist · React, Next.js, TypeScript, Node.js.',
    images: ['/profile3.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://pratham-potfolio.vercel.app';

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Resume — Pratham Israni',
  url: `${SITE_URL}/resume`,
  dateModified: new Date().toISOString(),
  mainEntity: {
    '@type': 'Person',
    name: 'Pratham Israni',
    jobTitle: 'Full-Stack Developer',
    description:
      'Full-Stack Developer specializing in interactive web experiences. SIH 2024 Finalist (Top 48/1200+ teams). 600+ LeetCode problems solved.',
    url: SITE_URL,
    image: `${SITE_URL}/profile3.jpg`,
    email: 'mailto:pk2732004@gmail.com',
    sameAs: [
      'https://github.com/Pratham2703003',
      'https://www.linkedin.com/in/pratham-israni-a6b672275/',
      'https://leetcode.com/u/Pratham012/',
    ],
    knowsAbout: [
      'Full-Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'Data Structures and Algorithms',
      'Competitive Programming',
    ],
    award: [
      'Smart India Hackathon 2024 — Top 48 Finalist (out of 1200+ teams)',
      'War of Codes — Gold Medal',
    ],
  },
};

const resumeDocumentJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DigitalDocument',
  name: 'Pratham Israni — Resume',
  description:
    'Resume of Pratham Israni, Full-Stack Developer. Skills, experience, projects, and awards.',
  url: `${SITE_URL}/pratham-israni-resume.pdf`,
  encodingFormat: 'application/pdf',
  inLanguage: 'en',
  author: { '@type': 'Person', name: 'Pratham Israni', url: SITE_URL },
  about: { '@type': 'Person', name: 'Pratham Israni', url: SITE_URL },
};

export default function ResumePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeDocumentJsonLd) }}
      />
      <ResumeViewer />
    </>
  );
}
