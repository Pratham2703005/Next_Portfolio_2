import TypeWriter from '@/components/ui/TypeWriter';
// import HorizontalEducationTimeline from '@/components/ui/HorizontalEducationTimeline';
import AchievementsSection from '@/components/sections/AchievementsSection';
import Footer from '@/components/shared/Footer';
import Image from 'next/image';
import React from 'react'
import EducationSection from '@/components/ui/EducationSection';

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section with Integrated About Story */}
      <section className="min-h-[100dvh] flex items-center justify-center relative">
        <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">

            {/* Left Side - Hero Content */}
            <div className="w-full sm:w-3/4 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-6xl md:text-5xl font-extrabold text-white tracking-tight 
                        animate-fade-in-up [text-wrap:balance]">
                Pratham Israni
              </h1>

              {/* Type animation */}
              <div className="h-14 flex items-center justify-center lg:justify-start">
                <TypeWriter data={[
                  "Problem Solver.",
                  2000,
                  "Full-Stack Developer.",
                  2000,
                  "Innovation Builder.",
                  2000,
                  "SIH 2024 Finalist.",
                  2000,
                  "Interactive Experience Creator.",
                  2000,
                ]} />
              </div>

              {/* Value Proposition */}
              <p className="text-xl sm:text-2xl text-white font-medium animate-fade-in-up animation-delay-200">
                Full-Stack Developer specializing in Interactive Web Experiences
              </p>

              {/* About Story */}
              <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed animate-fade-in-up animation-delay-300">
                <p>
                  I&apos;m a <span className="font-semibold text-purple-300">Full-Stack Developer</span> who specializes in creating{" "}
                  <span className="font-semibold text-blue-300">interactive web experiences</span> that users remember.
                  My journey combines the precision of competitive programming with the creativity of user-focused development.
                </p>
                <p>
                  From being a <span className="font-semibold text-green-300">SIH 2024 Finalist</span> (top 48/1200+ teams)
                  to solving 600+ LeetCode problems, I&apos;ve proven my ability to tackle complex challenges under pressure.
                  This algorithmic foundation helps me write efficient, scalable code that performs in real-world applications.
                </p>
                <p>
                  I don&apos;t just build websites—I create solutions that solve real problems. Whether it&apos;s democratizing
                  satellite imagery analysis for ISRO or building engaging platforms that keep users coming back,
                  I focus on <span className="font-semibold text-yellow-300">impact over features</span>.
                </p>
                <p className="text-purple-300 font-medium">
                  Currently seeking full-stack developer roles (Remote/India) to build innovative web experiences that make a difference. 🚀
                </p>
              </div>

              {/* CTAs - on small screens below content */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 animate-fade-in-up animation-delay-400 lg:hidden justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                      text-white px-4 py-1 rounded-lg font-medium transition-all transform hover:scale-105 
                      shadow-lg hover:shadow-xl text-center"
                >
                  Schedule a Call
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 
                      px-4 py-1 rounded-lg font-medium transition-all transform hover:scale-105 text-center"
                >
                  Download Resume
                </a>
              </div>
            </div>

            {/* Right Side - Image + CTAs */}
            <div className="flex w-full sm:w-1/4 flex-col items-center lg:items-end space-y-4">
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-purple-400 overflow-hidden">
                  <Image src="/profile1.jpg" alt="Pratham Israni - Full Stack Developer" fill className="object-cover" priority />
                </div>
              </div>


              <div className="hidden lg:flex flex-col w-full gap-4 pt-4 animate-fade-in-up animation-delay-400">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 
                      text-white inline-flex items-center justify-center px-4 py-2 text-sm leading-tight rounded-md font-medium transition-all transform hover:scale-105 
                      shadow-lg hover:shadow-xl text-center"
                >
                  Schedule a Call
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 
                      inline-flex items-center justify-center px-4 py-2 text-sm leading-tight rounded-md font-medium transition-all transform hover:scale-105 text-center"
                >
                  Download Resume
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Education Timeline */}
      <EducationSection />

      {/* Achievements Section */}
      <AchievementsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home