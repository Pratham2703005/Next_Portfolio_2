import SectionHeading from "./SectionHeading";
import ClientBubbles from "./ClientBubbles";
import SkillCard from './SkillCard';

export default function SkillsSection() {
  const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "Next.js",
      "React.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Zustand",

    ],
  },
  {
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Prisma",
      "Cloudinary",

    ],
  },
  {
    title: "Auth & Validation",
    skills: ["Zod", "NextAuth", "OAuth", "JWT", "Clerk", "EmailJS",],
  },
  {
    title: "AI & APIs",
    skills: ["OpenAI", "Mistral", "DeepSeek", "Gemini", "HuggingFace"],
  },
  {
    title: "Editors & Dev Tools",
    skills: ["Cursor", "Kiro", "Kilo", "TRAE", "Zencoder", "VS Code"],
  },
  {
    title: "Tools",
    skills: ["Postman", "Figma", "Git", "GitHub", "Vercel", "Render"],
  },
];


  return (
    <section id="skills" className="min-h-screen py-20 relative">
      {/* Floating particles - client component */}
      <ClientBubbles />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading>Technical Skills</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} title={category.title} skills={category.skills} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
