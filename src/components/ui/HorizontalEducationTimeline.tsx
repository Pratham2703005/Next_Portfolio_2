import { GraduationCap, Award, BookOpen, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface EducationPhase {
  title: string;
  institute: string;
  year: string;
  highlights: string[];
  icon: React.ReactNode;
  color: string;
}

export default function WaterfallEducationTimeline() {
  const educationPhases: EducationPhase[] = [
    {
      title: "Class 10th - CBSE",
      institute: "St. Queen Mary's Public School",
      year: "2018 – 2020",
      highlights: ["Score: 72.3%", "Foundation in Sciences"],
      icon: <BookOpen className="h-5 w-5" />,
      color: "blue"
    },
    {
      title: "Class 12th - CBSE (PCM)",
      institute: "St. Queen Mary's Public School", 
      year: "2020 – 2022",
      highlights: ["Score: 85%", "PCM with Computer Science"],
      icon: <Award className="h-5 w-5" />,
      color: "purple"
    },
    {
      title: "B.Tech Computer Science",
      institute: "FET Agra College",
      year: "2022 – Present",
      highlights: ["CGPA: 7.325", "Algorithms & Software Dev Focus"],
      icon: <GraduationCap className="h-5 w-5" />,
      color: "green"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "from-blue-500/10 to-blue-600/5",
        border: "border-blue-500/20 hover:border-blue-400/40",
        icon: "bg-blue-500/20 text-blue-300",
        accent: "text-blue-400",
        dot: "bg-blue-500"
      },
      purple: {
        bg: "from-purple-500/10 to-purple-600/5", 
        border: "border-purple-500/20 hover:border-purple-400/40",
        icon: "bg-purple-500/20 text-purple-300",
        accent: "text-purple-400",
        dot: "bg-purple-500"
      },
      green: {
        bg: "from-green-500/10 to-green-600/5",
        border: "border-green-500/20 hover:border-green-400/40", 
        icon: "bg-green-500/20 text-green-300",
        accent: "text-green-400",
        dot: "bg-green-500"
      }
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
            Education Timeline
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A structured progression through academic milestones - Waterfall style
          </p>
        </div>

        {/* Waterfall Timeline */}
        <div className="relative">
          {/* Central Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 opacity-60 animate-pulse"></div>
          </div>

          {/* Mobile Progress Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 md:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-400 to-green-400 opacity-60 animate-pulse"></div>
          </div>

          {/* Education Phases */}
          <div className="space-y-12 md:space-y-16">
            {educationPhases.map((phase, index) => {
              const colorClasses = getColorClasses(phase.color)
              const isLeft = index % 2 === 0
              
              return (
                <div key={index} className="relative group">
                  
                  {/* Desktop Layout - Alternating */}
                  <div className="hidden md:block">
                    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                      
                      {/* Phase Card */}
                      <Card className={`w-80 bg-gradient-to-br ${colorClasses.bg} backdrop-blur-sm border-2 ${colorClasses.border} transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl ${isLeft ? 'mr-12' : 'ml-12'}`}>
                        <CardContent className="p-6">
                          
                          {/* Phase Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-full ${colorClasses.icon} transition-all duration-300 group-hover:scale-110`}>
                              {phase.icon}
                            </div>
                            <div className={`${colorClasses.accent} font-mono text-sm font-medium bg-gray-800/50 px-3 py-1 rounded-full`}>
                              {phase.year}
                            </div>
                          </div>

                          {/* Phase Title */}
                          <h3 className="text-white font-bold text-xl mb-2 group-hover:text-gray-100">
                            {phase.title}
                          </h3>

                          {/* Institute */}
                          <p className={`${colorClasses.accent} font-semibold mb-4 text-sm`}>
                            {phase.institute}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-2">
                            {phase.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${colorClasses.dot}`}></div>
                                <span className="text-gray-300 text-sm">{highlight}</span>
                              </div>
                            ))}
                          </div>

                          {/* Phase Number */}
                          <div className={`absolute ${isLeft ? '-right-4' : '-left-4'} top-1/2 transform -translate-y-1/2 w-8 h-8 ${colorClasses.dot} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                            {index + 1}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Flow Arrow */}
                    {index < educationPhases.length - 1 && (
                      <div className="flex justify-center mt-8">
                        <div className="flex flex-col items-center">
                          <ChevronDown className="h-6 w-6 text-gray-500 animate-bounce opacity-70" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Layout - Vertical Stack */}
                  <div className="md:hidden">
                    <div className="flex items-start space-x-4 relative">
                      
                      {/* Mobile Timeline Dot */}
                      <div className={`w-6 h-6 ${colorClasses.dot} rounded-full flex items-center justify-center text-white font-bold text-xs mt-4 relative z-10 shadow-lg`}>
                        {index + 1}
                      </div>

                      {/* Mobile Phase Card */}
                      <Card className={`flex-1 bg-gradient-to-br ${colorClasses.bg} backdrop-blur-sm border-2 ${colorClasses.border} transition-all duration-300 hover:scale-102`}>
                        <CardContent className="p-5">
                          
                          {/* Mobile Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-full ${colorClasses.icon}`}>
                              {phase.icon}
                            </div>
                            <div className={`${colorClasses.accent} font-mono text-xs font-medium bg-gray-800/50 px-2 py-1 rounded-full`}>
                              {phase.year}
                            </div>
                          </div>

                          {/* Mobile Content */}
                          <h3 className="text-white font-bold text-lg mb-1">
                            {phase.title}
                          </h3>
                          
                          <p className={`${colorClasses.accent} font-medium mb-3 text-sm`}>
                            {phase.institute}
                          </p>

                          {/* Mobile Highlights */}
                          <div className="space-y-1">
                            {phase.highlights.map((highlight, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.dot}`}></div>
                                <span className="text-gray-300 text-xs">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Mobile Flow Arrow */}
                    {index < educationPhases.length - 1 && (
                      <div className="flex justify-start ml-3 my-4">
                        <ChevronDown className="h-5 w-5 text-gray-500 animate-bounce opacity-70" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Waterfall Completion */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3">
            <GraduationCap className="h-5 w-5 text-green-400" />
            <span className="text-green-300 font-semibold">Education Journey Complete</span>
          </div>
        </div>
      </div>
    </div>
  )
}