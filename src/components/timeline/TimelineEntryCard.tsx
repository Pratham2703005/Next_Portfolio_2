import Image from 'next/image';
import { TimelineEntryData } from '@/data/timeline-data';

interface TimelineEntryCardProps {
  entry: TimelineEntryData;
}

export default function TimelineEntryCard({ entry }: TimelineEntryCardProps) {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <p className="mb-4 text-base font-semibold text-neutral-200">
            {entry.subtitle}
          </p>
          <p className="mb-6 text-sm text-neutral-400">
            {entry.description}
          </p>
        </div>
        <div className={`mb-6 relative w-1/2 h-48 rounded-lg overflow-hidden border ${entry.borderColor}`}>
          <Image 
            src={entry.image} 
            alt={entry.imageAlt} 
            fill 
            className={entry.imageAlt === '100 AI Agents' ? 'object-contain' : 'object-cover'} 
          />
        </div>
      </div>
      {entry.details && entry.details.length > 0 && (
        <div className={`mt-4 bg-gradient-to-r ${entry.accentColor} border ${entry.borderColor} rounded-lg p-4 space-y-2`}>
          {entry.details.map((detail, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-neutral-300">
              <span>{detail.icon}</span>
              <span>{detail.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
