"use client";

import TypeWriter from "@/components/ui/TypeWriter";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// ─── Floating geometric shapes ─────────────────────────────────────────────────
const shapes = [
  // Donut / onion ring
  { id: "ring1", x: "0%",  y: "10%", size: 48, opacity: 0.55, delay: "0s",   dur: "6s",  rotate: 0,
    svg: <><circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="14" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/></> },
  // Cube wireframe
  { id: "cube", x: "90%", y: "8%",  size: 42, opacity: 0.45, delay: "1s",   dur: "7s",  rotate: 15,
    svg: <><polygon points="16,2 28,9 28,23 16,30 4,23 4,9" fill="none" stroke="currentColor" strokeWidth="1.8"/><line x1="16" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2"/><line x1="28" y1="9" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2"/><line x1="4"  y1="9" x2="16" y2="16" stroke="currentColor" strokeWidth="1.2"/></> },
  // Spring / coil
  { id: "spring", x: "90%", y: "75%", size: 84, opacity: 0.35, delay: "0.5s", dur: "5s",  rotate: 19,
    svg: <path d="M4 2 Q10 6 4 10 Q10 14 4 18 Q10 22 4 26 Q10 30 4 34" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/> },
  // Spiral
  { id: "spiral", x: "0%",  y: "60%", size: 30, opacity: 0.4, delay: "2s",   dur: "8s",  rotate: 0,
    svg: <path d="M15 15 m0,-10 a10,10 0 1,1 -0.1,0 m0,4 a6,6 0 1,1 -0.1,0 m0,4 a2,2 0 1,1 -0.1,0" fill="none" stroke="currentColor" strokeWidth="1.8"/> },
  // Plus / cross
  { id: "plus1", x: "90%", y: "82%", size: 32, opacity: 0.36, delay: "1.5s", dur: "6.5s", rotate: 45,
    svg: <><line x1="11" y1="2"  x2="11" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="2"  y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></> },
  // Triangle
  { id: "tri",  x: "12%", y: "92%", size: 36, opacity: 0.45, delay: "3s",   dur: "7.5s", rotate: 0,
    svg: <polygon points="13,2 24,22 2,22" fill="none" stroke="currentColor" strokeWidth="2"/> },
  // Diamond
  { id: "dia",  x: "50%", y: "-4%",  size: 32, opacity: 0.5, delay: "0.8s", dur: "5.5s", rotate: 0,
    svg: <polygon points="11,1 21,11 11,21 1,11" fill="none" stroke="currentColor" strokeWidth="2"/> },
  // Small ring accent
  { id: "ring2", x: "42%", y: "98%", size: 26, opacity: 0.35, delay: "2.5s", dur: "6s", rotate: 0,
    svg: <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="2"/> },
];

// ─── Component ─────────────────────────────────────────────────────────────────
type Projectile = {
  key: number;
  shape: typeof shapes[number];
  size: number;
  opacity: number;
  rotate: number;
  spin: number;
  duration: number;
  startX: number;
  startY: number;
  dx: number;
  dy: number;
};

function makeProjectile(key: number, cx: number, cy: number): Projectile {
  const angle = rand(0, Math.PI * 2);
  const maxDist = Math.hypot(window.innerWidth, window.innerHeight) + 120;
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  return {
    key,
    shape,
    size: rand(26, 58),
    opacity: rand(0.3, 0.6),
    rotate: rand(0, 360),
    spin: rand(-540, 540),
    duration: rand(5.5, 8.5),
    startX: cx,
    startY: cy,
    dx: Math.cos(angle) * maxDist,
    dy: Math.sin(angle) * maxDist,
  };
}

export default function Home() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [projs, setProjs] = useState<Projectile[]>([]);
  const keyRef = useRef(0);

  const spawn = () => {
    const el = imageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    keyRef.current += 1;
    const next = makeProjectile(keyRef.current, rect.left + rect.width / 2, rect.top + rect.height / 2);
    setProjs((prev) => [...prev, next]);
  };

  const despawn = (key: number) => {
    setProjs((prev) => prev.filter((p) => p.key !== key));
    spawn();
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = setTimeout(spawn, 300);
    const t2 = setTimeout(spawn, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatY {
          0%,100% { transform: translateY(0px) rotate(var(--r,0deg)); }
          50%      { transform: translateY(-10px) rotate(var(--r,0deg)); }
        }
        @keyframes floatYR {
          0%,100% { transform: translateY(0px) rotate(var(--r,0deg)); }
          50%      { transform: translateY(8px) rotate(calc(var(--r,0deg) + 8deg)); }
        }
        .shape { animation: floatY var(--dur,6s) ease-in-out var(--delay,0s) infinite; }
        .shape:nth-child(even) { animation-name: floatYR; }

        @keyframes projectile {
          0%   { transform: translate(0,0) rotate(var(--r0,0deg)); opacity: 0; }
          10%  { opacity: var(--op, 0.5); }
          90%  { opacity: var(--op, 0.5); }
          100% { transform: translate(var(--dx,0), var(--dy,0)) rotate(var(--r1,0deg)); opacity: 0; }
        }
        .projectile { animation: projectile var(--pd,4s) linear forwards; will-change: transform, opacity; }

        /* social bounce */
        @keyframes bounce_s {
          40%  { transform: scale(1.35); }
          60%  { transform: scale(0.85); }
          80%  { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .social-btn { transition: background 0.22s, background-color 0.22s; border-radius: 50px; }
        .social-btn:hover { animation: bounce_s 0.4s linear forwards; }
        .s-ig:hover   { background: linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888) !important; }
        .s-gh:hover   { background-color: #242c34 !important; }
        .s-x:hover    { background-color: #000000 !important; }
        .s-li:hover   { background-color: #0a66c2 !important; }
        .s-npm:hover  { background-color: #cb3837 !important; }
      `}</style>

      <div className="w-full min-h-screen flex flex-col relative" style={{ zIndex: 10 }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="flex-1 flex items-center min-h-[100dvh]">
          <div className="w-full max-w-7xl mx-auto px-6 py-10 md:px-18">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">

              {/* ── Left: text content ─────────────────────────────────── */}
              <div className="flex-1 flex flex-col gap-7 text-center lg:text-left items-center lg:items-start">
                {/* Name */}
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-none"
                  style={{ fontFamily: "var(--font-syne), sans-serif", letterSpacing: "-0.02em" }}
                >
                  Pratham<br />
                  <span style={{ color: "#a78bfa" }}>Israni</span>
                </h1>

                {/* TypeWriter */}
                <div
                  className="h-8 flex items-center text-base sm:text-lg"
                  style={{ fontFamily: "var(--font-space-mono), monospace" }}
                >
                  <TypeWriter data={[
                    "SIH 2024 Finalist.",    2000,
                    "Full-Stack Developer.", 2000,
                    "npm Package Author.",   2000,
                    "Problem Solver.",       2000,
                    "Open Source Builder.",  2000,
                  ]} />
                </div>
                {/* Social links */}
                <div
                  className="flex items-center gap-1 mt-2 p-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {[
                    { cls: "s-li",  label: "LinkedIn",  href: "https://www.linkedin.com/in/pratham-kumar-a6b672275/", vb: "0 0 448 512", icon: <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" fill="#fff"/> },
                    { cls: "s-x",   label: "X",         href: "https://x.com/Pratham85477378",                        vb: "0 0 512 512", icon: <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z" fill="#fff"/> },
                    { cls: "s-ig",  label: "Instagram", href: "https://www.instagram.com/me_pratham_hoon/",           vb: "0 0 16 16",   icon: <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="white"/> },
                    { cls: "s-gh",  label: "GitHub",    href: "https://github.com/Pratham2703005",                    vb: "0 0 496 512", icon: <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z" fill="#fff"/> },
                    { cls: "s-npm", label: "npm",       href: "https://www.npmjs.com/~pratham-israni",                vb: "0 0 780 250", icon: <path d="M240 250H0V0h240v210h60V0h60v250h-60V40h-60v210zM480 0v250h240V40H540v170h-60V0h-60zM600 40v130h60V40h-60z" fill="#fff"/> },
                  ].map(({ cls, label, href, vb, icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-btn ${cls} relative flex items-center justify-center w-11 h-11 cursor-pointer`}
                      style={{ color: "whitesmoke" }}
                    >
                      <svg viewBox={vb} width="18" height="18" fill="currentColor">{icon}</svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Right: image + floating shapes ─────────────────────── */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div ref={imageRef} className="relative h-64 w-60 md:h-[500px] md:w-[400px]">

                  {/* Floating shapes */}
                  {shapes.map((s) => (
                    <div
                      key={s.id}
                      className="shape absolute pointer-events-none text-purple-400"
                      style={{
                        left: s.x, top: s.y,
                        width: s.size, height: s.size,
                        opacity: s.opacity,
                        "--r": `${s.rotate}deg`,
                        "--dur": s.dur,
                        "--delay": s.delay,
                      } as React.CSSProperties}
                    >
                      <svg viewBox={`0 0 ${s.id === "spring" ? "14 36" : "28 28"}`} width={s.size} height={s.size} fill="none" stroke="currentColor">
                        {s.svg}
                      </svg>
                    </div>
                  ))}

                  {/* Glow behind image */}
                  <div
                    className="absolute inset-8 rounded-full"
                    style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)", filter: "blur(20px)" }}
                  />

                  {/* Image */}
                  <div
                    className="absolute inset-0 m-10 rounded-3xl overflow-hidden"
                    style={{
                      border: "2px solid rgba(139,92,246,0.5)",
                      boxShadow: "0 0 0 1px rgba(139,92,246,0.2), 0 20px 60px rgba(124,58,237,0.3)",
                    }}
                  >
                    <Image
                      src="/profile3.jpg"
                      alt="Pratham Israni"
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* subtle glossy sheen */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)" }} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>

      {projs.map((p) => (
        <div
          key={p.key}
          className="projectile fixed pointer-events-none text-purple-400"
          onAnimationEnd={() => despawn(p.key)}
          style={{
            left: p.startX - p.size / 2,
            top: p.startY - p.size / 2,
            width: p.size,
            height: p.size,
            zIndex: 1,
            ["--dx" as string]: `${p.dx}px`,
            ["--dy" as string]: `${p.dy}px`,
            ["--r0" as string]: `${p.rotate}deg`,
            ["--r1" as string]: `${p.rotate + p.spin}deg`,
            ["--op" as string]: `${p.opacity}`,
            ["--pd" as string]: `${p.duration}s`,
          } as React.CSSProperties}
        >
          <svg
            viewBox={`0 0 ${p.shape.id === "spring" ? "14 36" : "28 28"}`}
            width={p.size}
            height={p.size}
            fill="none"
            stroke="currentColor"
            preserveAspectRatio="xMidYMid meet"
          >
            {p.shape.svg}
          </svg>
        </div>
      ))}
    </>
  );
}