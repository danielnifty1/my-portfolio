"use client"

import { Button } from '@/components/ui/button'
import { Download, ExternalLink } from 'lucide-react'
import Image from "next/image";


export function About() {
  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'resume.pdf'
    link.click()
  }

  return (
    <section id="about" className="section-padding bg-white dark:bg-primary-900">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-accent-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                 <Image src="/images/profile.jpg" alt="Profile" width={320} height={320} className="rounded-2xl" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">
                Hello! I'm Your Name
              </h3>
              
              <div className="space-y-4 text-primary-600 dark:text-primary-300 leading-relaxed">
                <p>
                  I'm a passionate Full-Stack Developer with over 5 years of experience in creating 
                  innovative web applications and digital solutions. My journey in tech started with 
                  curiosity and has evolved into a deep passion for building things that matter.
                </p>
                
                <p>
                  I specialize in modern web technologies like React, Next.js, and Node.js, 
                  with a strong foundation in TypeScript and cloud services. I believe in writing 
                  clean, maintainable code and creating intuitive user experiences.
                </p>
                
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or sharing knowledge with the developer community. I'm always 
                  excited to learn new things and take on challenging projects.
                </p>
              </div>

              {/* Key Points */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">5+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">50+ Projects Completed</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">Full-Stack Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">UI/UX Design</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button onClick={downloadResume} className="btn-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
