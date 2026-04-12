"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Shared column geometry — keep beam & dots pixel-aligned.
// Dot container is 32px wide; beam is 2px. Center of both sits at x = 32px.
const COL_DOT_LEFT = 16; // 16 + 32/2 = 32
const COL_BEAM_LEFT = 31; // 31 + 2/2  = 32

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [height, setHeight] = useState(0);
  const [activeDots, setActiveDots] = useState<boolean[]>(
    () => new Array(data.length).fill(false)
  );

  // Keep container height in sync with layout changes (resize, font load, images).
  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  // Activate a dot only when the beam tip's real on-screen Y crosses its real
  // on-screen Y — this is robust to sticky positioning, resizes, and reflows.
  useMotionValueEvent(beamHeight, "change", (latest) => {
    if (!contentRef.current) return;
    const contentTop = contentRef.current.getBoundingClientRect().top;
    const beamTipY = contentTop + latest;

    const active: boolean[] = [];
    for (const dot of dotsRef.current) {
      if (!dot) {
        active.push(false);
        continue;
      }
      const r = dot.getBoundingClientRect();
      const centerY = r.top + r.height / 2;
      active.push(beamTipY >= centerY);
    }
    setActiveDots(active);
  });

  return (
    <div ref={containerRef} className="w-full font-sans md:px-10">
      <div ref={contentRef} className="relative max-w-7xl mx-auto pb-20">
        {/* Track placeholder (reserves space, invisible) */}
        <div
          className="absolute top-0 w-[2px] rounded-full bg-transparent"
          style={{ height, left: COL_BEAM_LEFT }}
        />

        {/* Growing beam */}
        <motion.div
          style={{ height: beamHeight, opacity, left: COL_BEAM_LEFT }}
          className="absolute top-0 w-[2px] rounded-full overflow-visible"
        >
          <div className="w-full h-full bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 rounded-full" />
          <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2">
            <div className="w-[7px] h-[7px] rounded-full bg-blue-300 shadow-[0_0_10px_4px_rgba(147,197,253,0.85)]" />
            <div className="absolute inset-[-5px] rounded-full border border-blue-400/40 animate-ping" />
          </div>
        </motion.div>

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Sticky left column — title stays visible while content scrolls */}
            <div className="sticky top-[20vh] self-start z-40 flex flex-col md:flex-row items-center max-w-xs lg:max-w-sm md:w-full min-h-8">
              {/* Dot wrapper — explicit top/size so position is deterministic */}
              <div
                ref={(el) => {
                  dotsRef.current[index] = el;
                }}
                className="absolute top-0 w-8 h-8 flex items-center justify-center"
                style={{ left: COL_DOT_LEFT }}
              >
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
                  <div
                    className="w-3 h-3 rounded-full transition-all duration-500"
                    style={{
                      background: activeDots[index] ? "#3b82f6" : "#404040",
                      boxShadow: activeDots[index]
                        ? "0 0 8px rgba(59,130,246,0.9)"
                        : "none",
                    }}
                  />
                </div>
              </div>

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
