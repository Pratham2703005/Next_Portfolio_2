'use client';

import { useEffect, useRef } from 'react';
import PageHeading from '@/components/ui/PageHeading';

const ResumeViewer = () => {
  const hasDownloaded = useRef(false);

  useEffect(() => {
    const resumeDownloadPref = localStorage.getItem('resume-download');
    if (resumeDownloadPref == null && !hasDownloaded.current) {
      hasDownloaded.current = true;
      localStorage.setItem('resume-download', '1');
      const link = document.createElement('a');
      link.href = '/pratham-israni-resume.pdf';
      link.download = 'pratham-israni-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen text-white pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeading title="MY RESUME" />

        <div className="bg-transparent rounded-lg overflow-hidden shadow-2xl">
          <div className="w-full min-h-screen">
            <embed
              src="/pratham-israni-resume.pdf"
              title="Resume: Pratham Israni"
              type="application/pdf"
              width="100%"
              height="1130"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
