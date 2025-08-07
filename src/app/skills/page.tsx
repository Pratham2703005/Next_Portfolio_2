import type { Metadata } from "next"
import SkillsSection from "@/components/ui/SkillsSection"
import ScrollProgressBar from "@/components/ui/ScrollProgressBar"
import Footer from "@/components/shared/Footer"

export const metadata: Metadata = {
  title: "Skills - Pratham Israni | Full-Stack Developer Technologies",
  description: "Explore Pratham Israni's technical skills and expertise in Full-Stack Development, including React, Next.js, Node.js, TypeScript, and modern web technologies. Frontend, backend, databases, and development tools.",
  keywords: "Pratham Israni Skills, Full-Stack Developer Skills, React, Next.js, TypeScript, JavaScript, Node.js, MongoDB, Web Development Technologies",
  openGraph: {
    title: "Skills - Pratham Israni | Full-Stack Developer Technologies",
    description: "Explore Pratham Israni's technical skills and expertise in modern web development technologies and tools.",
    type: "website",
  },
};

export default function SkillsPage() {
  return (
    <div className="relative text-white overflow-x-hidden min-h-screen">
      {/* Progress bar */}
      <ScrollProgressBar />

      {/* Skills Section */}
      <div className="pt-20">
        <SkillsSection />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}