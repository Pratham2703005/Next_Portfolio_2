import TypeWriter from '@/components/ui/TypeWriter';
import Footer from '@/components/shared/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

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
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium animate-fade-in-up animation-delay-200">
                Full-Stack Developer specializing in Interactive Web Experiences
              </p>

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
                <Link
                  href="/resume"
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900
                      px-4 py-1 rounded-lg font-medium transition-all transform hover:scale-105 text-center"
                >
                  View Resume
                </Link>
              </div>
            </div>

            {/* Right Side - Image + CTAs */}
            <div className="flex w-full sm:w-1/4 flex-col items-center lg:items-end space-y-4">
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md opacity-50 animate-pulse" />
                <div className="relative w-full h-full rounded-full border-4 border-purple-400 overflow-hidden">
                  <Image src="/profile3.jpg" alt="Pratham Israni - Full Stack Developer" fill className="object-cover" priority />
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
                <Link
                  href="/resume"
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900
                      inline-flex items-center justify-center px-4 py-2 text-sm leading-tight rounded-md font-medium transition-all transform hover:scale-105 text-center"
                >
                  View Resume
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home