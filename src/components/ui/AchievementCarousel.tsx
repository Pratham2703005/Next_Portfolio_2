'use client';
import { useState } from "react"
import { motion } from "framer-motion"
import { Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AchievementType1, AchievementType2, AchievementType } from "@/components/sections/AchievementsSection"

export default function AchievementCarousel({ achievements }: { achievements: AchievementType }) {
  const [selectedAchievement, setSelectedAchievement] = useState<number>(0)

  // Type guard to check if achievement is of type AchievementType1
  const isAchievementType1 = (achievement: AchievementType1 | AchievementType2): achievement is AchievementType1 => {
    return (achievement as AchievementType1).link !== undefined
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative">
        {/* Current Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Card className="bg-black/40 backdrop-blur-sm rounded-md md:rounded-xl shadow-2xl overflow-hidden border-gray-800">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row items-center">
                {/* Image */}
                <div className="w-full lg:w-2/5 h-64 lg:h-auto relative overflow-hidden">
                  <motion.img
                    key={selectedAchievement}
                    initial={{ opacity: 0.8, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={achievements[selectedAchievement].image}
                    alt={achievements[selectedAchievement].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5 p-4 sm:p-8">
                  <motion.div
                    key={`content-${selectedAchievement}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h3 className="text-xl md:text-3xl font-bold text-purple-400 mb-4">
                      {achievements[selectedAchievement].title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-lg leading-relaxed mb-6">
                      {achievements[selectedAchievement].description}
                    </p>

                    {/* View Details Button */}
                    {isAchievementType1(achievements[selectedAchievement]) ? (
                      <Button
                        asChild
                        variant="default"
                        className="bg-gradient-to-r w-full from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <a href={(achievements[selectedAchievement] as AchievementType1).link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {(achievements[selectedAchievement] as AchievementType1).linkText}
                        </a>
                      </Button>
                    ): (
                      <div className="flex flex-col sm:flex-row sm:flex-1  gap-3 w-full">
                        {(achievements[selectedAchievement] as AchievementType2).links.map((link, i) => (
                          <Button
                            key={i}
                            asChild
                            variant="default"
                            className="bg-gradient-to-r w-full sm:w-auto from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <Award className="mr-2 h-4 w-4" />
                              {link.text}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Controls */}
        <div className="absolute top-1/4 md:top-1/2 left-4 right-4 flex justify-between items-center transform -translate-y-1/2 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedAchievement((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : achievements.length - 1))
            }
            className="p-3 rounded-full bg-black/60 text-white shadow-lg hover:bg-purple-600 transition-colors duration-300"
            aria-label="Previous achievement"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setSelectedAchievement((prevIndex) => (prevIndex < achievements.length - 1 ? prevIndex + 1 : 0))
            }
            className="p-3 rounded-full bg-black/60 text-white shadow-lg hover:bg-purple-600 transition-colors duration-300"
            aria-label="Next achievement"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-3 mt-8">
        {achievements.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedAchievement(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              selectedAchievement === index ? "bg-purple-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to achievement ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
