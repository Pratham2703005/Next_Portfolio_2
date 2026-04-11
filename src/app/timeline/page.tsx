import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Footer from '@/components/shared/Footer';
import TimelineEntryCard from '@/components/timeline/TimelineEntryCard';
import { timelineData } from '@/data/timeline-data';

export const metadata = {
  title: 'Timeline | Pratham Israni',
  description: 'My journey, milestones, and achievements',
};

export default function TimelinePage() {
  const data = timelineData.map((entry) => ({
    title: entry.title,
    content: <TimelineEntryCard entry={entry} />,
  }));

  return (
    <div className="w-full">
      {/* Custom Timeline */}
      <div className="relative">
        <Timeline data={data} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
