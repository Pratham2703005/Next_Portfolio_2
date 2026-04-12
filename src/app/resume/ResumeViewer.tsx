'use client';

import { useEffect, useRef, useState } from 'react';
import PageHeading from '@/components/ui/PageHeading';

const RESUME_URL = '/pratham-israni-resume.pdf';
const RESUME_FILE = 'pratham-israni-resume.pdf';

const ResumeViewer = () => {
  const hasDownloaded = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    try {
      const pref = localStorage.getItem('resume-download');
      if (pref == null && !hasDownloaded.current) {
        hasDownloaded.current = true;
        localStorage.setItem('resume-download', '1');
        const link = document.createElement('a');
        link.href = RESUME_URL;
        link.download = RESUME_FILE;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch {
      /* localStorage unavailable — skip silently */
    }
  }, []);

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = RESUME_FILE;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-white pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <PageHeading title="MY RESUME" />

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 mb-4">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5" />
            </svg>
            Open in new tab
          </a>
        </div>

        {/* Viewer */}
        <div
          className="relative w-full rounded-xl overflow-hidden"
          style={{
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 20px 60px rgba(124,58,237,0.18)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          {isMobile ? (
            <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-14">
              <div
                className="flex items-center justify-center w-16 h-16 rounded-full"
                style={{ background: 'rgba(167,139,250,0.15)' }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <path d="M14 2v6h6M9 13h6M9 17h4" />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold">PDF preview isn&apos;t available on mobile</p>
                <p className="text-sm text-white/60 mt-1">
                  Download the resume or open it in a new tab to view it.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={triggerDownload}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#a78bfa)' }}
                >
                  Download
                </button>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  Open
                </a>
              </div>
            </div>
          ) : (
            <div className="relative w-full" style={{ aspectRatio: '1 / 1.294' }}>
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 rounded-full border-2 border-purple-400/30 border-t-purple-400 animate-spin"
                    aria-label="Loading resume"
                  />
                </div>
              )}
              <iframe
                src={`${RESUME_URL}#view=FitH`}
                title="Resume: Pratham Israni"
                className="absolute inset-0 w-full h-full"
                onLoad={() => setLoaded(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
