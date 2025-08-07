import { Award, BookOpen } from "lucide-react"
import SectionHeading from "./SectionHeading"
import TimelineEvent from "./TimelineEvent"

export default function EducationSection() {
  const timelineEvents = [
    {
      year: "2022 - Present",
      title: "Bachelor's in Computer Science",
      institution: "FET Agra College",
      description:
        "Currently pursuing my degree with a focus on gaining deep knowledge of computer science principles, algorithms, and software development.",
      achievement: "Current CGPA: 7.4",
      icon: <BookOpen className="h-6 w-6 text-purple-300" />,
    },
    {
      year: "2022",
      title: "12th Grade (PCM)",
      institution: "Central Board of Secondary Education(CBSE)",
      description: "Completed senior secondary education with PCM stream",
      achievement: "Score: 89.3%",
      icon: <Award className="h-6 w-6 text-purple-300" />,
    },
    {
      year: "2020",
      title: "10th Grade",
      institution: "Central Board of Secondary Education(CBSE)",
      description: "Developed a passion for technology and programming during this time",
      achievement: "Score: 72.3%",
      icon: <BookOpen className="h-6 w-6 text-purple-300" />,
    },
  ]

  return (
    <section id="education" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <SectionHeading>Education Timeline</SectionHeading>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-blue-500 transform md:translate-x-[-2px]"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
