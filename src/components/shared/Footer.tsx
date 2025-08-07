import { Github, Linkedin, Mail, Code, Download } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-gray-800 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Pratham Israni</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full-Stack Developer specializing in Interactive Web Experiences. 
              SIH 2024 Finalist building innovative solutions with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/projects" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Projects
              </Link>
              <Link href="/blog" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Contact Me
              </Link>
              <Link href="/messages" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">
                Messages
              </Link>
              <a 
                href="/resume.pdf" 
                download 
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="https://github.com/Pratham2703005"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/pratham-israni-a6b672275/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href="https://leetcode.com/u/Pratham012/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Code className="h-5 w-5" />
                <span>LeetCode</span>
              </a>
              
              <a 
                href="mailto:pk2732004@gmail.com?subject=Let's discuss opportunities&body=Hi Pratham, I'd like to discuss potential opportunities with you."
                className="flex items-center gap-3 text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Pratham Israni. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Built with ❤️ using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}