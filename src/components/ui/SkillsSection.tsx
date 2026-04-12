"use client";

import Image from "next/image";
import PageHeading from "./PageHeading";

const SKILL_ICONS: Record<string, string> = {
  JavaScript: "/skills/js.svg",
  TypeScript: "/skills/TypeScript.svg",
  "C++": "/skills/cpp.svg",
  Python: "/skills/python.svg",
  "React.js": "/skills/React.svg",
  "Next.js": "/skills/next.svg",
  HTML5: "/skills/html.svg",
  CSS3: "/skills/css.svg",
  "Tailwind CSS": "/skills/tail.svg",
  "Redux Toolkit": "/skills/redux.svg",
  Zustand: "/skills/zustand.svg",
  "Node.js": "/skills/Node.js.svg",
  "Express.js": "/skills/express.svg",
  FastAPI: "/skills/FastAPI.svg",
  "RESTful APIs": "/skills/restAPI.svg",
  "Socket.io": "/skills/socketio.svg",
  OAuth: "/skills/oauth.svg",
  NextAuth: "/skills/nextauth.svg",
  SQL: "/skills/sql.svg",
  MongoDB: "/skills/mongo.svg",
  "Prisma ORM": "/skills/prisma3.svg",
  Supabase: "/skills/supabase.svg",
  Redis: "/skills/redis.svg",
  "Google Earth Engine": "/skills/gee.svg",
  OpenAI: "/skills/openai-light.svg",
  TensorFlow: "/skills/tensorflow.svg",
  Git: "/skills/git.svg",
  GitHub: "/skills/github.svg",
  "Cursor AI": "/skills/cursor.svg",
  Doppler: "/skills/doppler.svg",
  Cloudinary: "/skills/cloudinary.svg",
  "Ubuntu Linux": "/skills/ubuntu.svg",
  Zod: "/skills/zod.svg",
  Clerk: "/skills/clerk.svg",
  "Google ML Kit": "/skills/ml.svg",
  PostgreSQL: "/skills/postgresql.svg",
  ShadCN: "/skills/shadcn.svg",
  Claude: "/skills/claude.svg",
  Firebase: "/skills/firebase.svg",
};

const skillCategories = [
  {
    title: "Frontend",
    color: "#a855f7",
    skills: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",
      "ShadCN",
      "Zod",
    ],
  },
  {
    title: "Languages",
    color: "#00f5ff",
    skills: ["JavaScript", "TypeScript", "C++", "Python", "SQL"],
  },
  {
    title: "Backend",
    color: "#22c55e",
    skills: [
      "Node.js",
      "Clerk",
      "Express.js",
      "FastAPI",
      "RESTful APIs",
      "Socket.io",
      "NextAuth",
    ],
  },
  {
    title: "Databases",
    color: "#f97316",
    skills: ["MongoDB", "Prisma ORM", "Supabase", "Redis", "PostgreSQL", "Firebase"],
  },
  {
    title: "Experimental Tools",
    color: "#ec4899",
    skills: ["Google Earth Engine", "Google ML Kit", "OpenAI", "TensorFlow", "Claude"],
  },
  {
    title: "Dev Tools",
    color: "#eab308",
    skills: [
      "Git",
      "GitHub",
      "Cursor AI",
      "Doppler",
      "Cloudinary",
      "Ubuntu Linux",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="fixed top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "#a855f7", filter: "blur(80px)", opacity: 0.12 }}
      />
      <div
        className="fixed bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "#00f5ff", filter: "blur(80px)", opacity: 0.09 }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Title */}
        <PageHeading title="TECHNICAL SKILLS" shadowColor="rgba(168,85,247,0.5)" />

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="flex flex-col gap-3">
              {/* Category label */}
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                  style={{
                    background: cat.color,
                    boxShadow: `0 0 8px ${cat.color}, 0 0 16px ${cat.color}`,
                  }}
                />
                <span
                  className="text-[0.65rem] font-bold tracking-[0.22em] uppercase"
                  style={{
                    color: cat.color,
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {cat.title}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(to right, ${cat.color}35, transparent)`,
                  }}
                />
              </div>

              {/* Skills row */}
              <ul className="flex flex-wrap gap-3 p-1">
                {cat.skills.map((skill) => (
                  <SkillItem key={skill} skill={skill} color={cat.color} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');

        .iso-item { position: relative; cursor: pointer; }

        /* icon box */
        .iso-icon {
          position: relative; z-index: 2;
          width: 58px; height: 58px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }

        /* shadow layers */
        .iso-layer {
          position: absolute; inset: 0;
          width: 58px; height: 58px;
          border-radius: 14px;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1;
        }

        /* tooltip */
        .iso-label {
          position: absolute;
          bottom: -20px; left: 0;
          opacity: 0;
          white-space: nowrap;
          pointer-events: none;
          z-index: 999;
          border-radius: 6px;
          padding: 4px 9px;
          font-family: 'Space Mono', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          transition: opacity 0.3s ease, transform 0.3s ease;
          backdrop-filter: blur(10px);
        }

        /* hover: lift icon */
        .iso-item:hover .iso-icon {
          transform: translate(12px, -12px);
        }

        /* hover: reveal tooltip */
        .iso-item:hover .iso-label {
          opacity: 1;
          transform: translate(22px, 0px) skew(-4deg);
        }

        /* hover: reveal layers */
        .iso-item:hover .iso-layer:nth-child(1) { opacity: 0.20; }
        .iso-item:hover .iso-layer:nth-child(2) { opacity: 0.45; transform: translate(4px, -4px); }
        .iso-item:hover .iso-layer:nth-child(3) { opacity: 0.75; transform: translate(8px, -8px); }
      `}</style>
    </section>
  );
}

function SkillItem({ skill, color }: { skill: string; color: string }) {
  return (
    <li className="iso-item">
      {/* Isometric shadow layers */}
      <div
        className="iso-layer"
        style={{ background: `${color}16`, border: `1px solid ${color}35` }}
      />
      <div
        className="iso-layer"
        style={{ background: `${color}16`, border: `1px solid ${color}35` }}
      />
      <div
        className="iso-layer"
        style={{ background: `${color}16`, border: `1px solid ${color}35` }}
      />

      {/* Icon */}
      <div
        className="iso-icon"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${color}30`,
          boxShadow: `inset 0 0 20px rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.3)`,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = `${color}18`;
          el.style.borderColor = `${color}75`;
          el.style.boxShadow = `inset 0 0 20px rgba(255,255,255,0.15), 0 0 22px ${color}40`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = "rgba(255,255,255,0.04)";
          el.style.borderColor = `${color}30`;
          el.style.boxShadow = `inset 0 0 20px rgba(255,255,255,0.08), 0 4px 14px rgba(0,0,0,0.3)`;
        }}
      >
        <Image
          src={SKILL_ICONS[skill] ?? "/skills/default.svg"}
          alt={skill}
          className="w-8 h-8 object-contain"
          style={{ filter: `drop-shadow(0 0 5px ${color}55)` }}
          height={200}
          width={200}
        />
      </div>

      {/* Tooltip */}
      <div
        className="iso-label"
        style={{
          background: `${color}22`,
          border: `1px solid ${color}50`,
          boxShadow: `inset 0 0 10px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.25)`,
        }}
      >
        {skill}
      </div>
    </li>
  );
}
