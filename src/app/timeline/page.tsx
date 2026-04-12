import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Footer from '@/components/shared/Footer';
import TimelineEntryCard from '@/components/timeline/TimelineEntryCard';
import PageHeading from '@/components/ui/PageHeading';
import { timelineData } from '@/data/timeline-data';

export const metadata = {
  title: 'Timeline | Pratham Israni',
  description: 'My journey, milestones, and achievements',
};

export default function TimelinePage() {
  const data = timelineData.map((entry, index) => ({
    title: entry.title,
    content: <TimelineEntryCard entry={entry} priority={index === 0} />,
  }));

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="px-6 pt-20 relative z-10">
        <PageHeading title="MY JOURNEY" shadowColor="rgba(34, 197, 94, 0.5)" />
      </div>

      {/* Custom Timeline */}
      <div className="relative">
        <Timeline data={data} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
