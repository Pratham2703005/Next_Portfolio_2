"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const dotsRef      = useRef<(HTMLDivElement | null)[]>([]);

  // rowsRef — each top-level row div is a DIRECT child of contentRef (position:relative)
  // so row.offsetTop gives the correct Y offset relative to contentRef. No sticky/absolute confusion.
  const rowsRef      = useRef<(HTMLDivElement | null)[]>([]);
  const dotPositions = useRef<number[]>([]);

  const [height, setHeight]         = useState(0);
  const [activeDots, setActiveDots] = useState<boolean[]>(
    new Array(data.length).fill(false)
  );

  // Measure total height of the content container
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.getBoundingClientRect().height);
    }
  }, []);

  // Measure each row's offsetTop (reliable — rows are direct children of contentRef).
  // +16 nudges the trigger point to the dot center rather than the row top edge.
  useEffect(() => {
    if (!contentRef.current) return;
    dotPositions.current = rowsRef.current.map((row) => {
      if (!row) return 0;
      return row.offsetTop + 16;
    });
  }, [height, data.length]);

  // Scroll offset ["start center", "end center"]:
  //   progress 0 → top of container at viewport center
  //   progress 1 → bottom of container at viewport center
  // Beam tip tracks the viewport midpoint as you scroll through.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacity    = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  // Activate dots the moment the beam tip passes their measured Y position
  useMotionValueEvent(beamHeight, "change", (latest) => {
    setActiveDots(dotPositions.current.map((pos) => latest >= pos));
  });

  return (
    <div ref={containerRef} className="w-full font-sans md:px-10">
      <div ref={contentRef} className="relative max-w-7xl mx-auto pb-20">

        {/* Track line — transparent so only the growing beam is visible */}
        <div
          className="absolute left-8 top-0 w-[2px] rounded-full bg-transparent"
          style={{ height }}
        />

        {/* Growing beam — absolute inside contentRef, grows from top down */}
        <motion.div
          style={{ height: beamHeight, opacity }}
          className="absolute left-8 top-0 w-[2px] rounded-full overflow-visible"
        >
          {/* Gradient trail */}
          <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full" />

          {/* Glowing tip — always at the bottom edge of the beam */}
          <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2">
            <div className="w-[7px] h-[7px] rounded-full bg-blue-300 shadow-[0_0_10px_4px_rgba(147,197,253,0.85)]" />
            <div className="absolute inset-[-5px] rounded-full border border-blue-400/40 animate-ping" />
          </div>
        </motion.div>

        {/* Timeline rows */}
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => { rowsRef.current[index] = el; }}   // ← measures from here
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Sticky left column */}
            <div className="sticky top-40 self-start z-40 flex flex-col md:flex-row items-center max-w-xs lg:max-w-sm md:w-full">

              {/* Dot */}
              <div
                ref={(el) => { dotsRef.current[index] = el; }}
                className="absolute left-[14px] flex items-center justify-center"
              >
                {/* Outer ring */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    background: activeDots[index]
                      ? "rgba(59,130,246,0.15)"
                      : "rgba(20,20,20,0.85)",
                    boxShadow: activeDots[index]
                      ? "0 0 0 2px rgba(59,130,246,0.45), 0 0 16px rgba(59,130,246,0.3)"
                      : "0 0 0 1px rgba(64,64,64,0.6)",
                  }}
                >
                  {/* Inner dot — or checkmark when fully passed */}
                  {activeDots[index + 1] ? (
                    <svg
                      className="w-3.5 h-3.5 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <div
                      className="w-3 h-3 rounded-full transition-all duration-500"
                      style={{
                        background: activeDots[index] ? "#3b82f6" : "#404040",
                        boxShadow: activeDots[index]
                          ? "0 0 8px rgba(59,130,246,0.9)"
                          : "none",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-colors duration-500"
                style={{ color: activeDots[index] ? "#93c5fd" : "#525252" }}
              >
                {item.title}
              </h3>
            </div>

            {/* Content */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className="md:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-500"
                style={{ color: activeDots[index] ? "#93c5fd" : "#525252" }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};