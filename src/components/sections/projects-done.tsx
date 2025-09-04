"use client"

import { completedProjects, type Project } from '@/data/projects'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink, Eye } from 'lucide-react'

const getCategoryColor = (category: Project['category']) => {
  switch (category) {
    case 'web':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'mobile':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'api':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'tool':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    case 'other':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

export function ProjectsDone() {
  return (
    <section id="projects-done" className="section-padding bg-primary-50 dark:bg-primary-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              A showcase of my completed projects, demonstrating my skills and passion for development
            </p>
            <div className="w-24 h-1 bg-accent-600 mx-auto mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {completedProjects.map((project) => (
              <div key={project.id} className="card group hover:shadow-xl transition-all duration-300">
                {/* Project Image Placeholder */}
                <div className="relative mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg flex items-center justify-center text-white text-6xl font-bold group-hover:scale-105 transition-transform duration-300">
                    {project.title.charAt(0)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-primary-900 dark:text-primary-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-primary-600 dark:text-primary-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-700 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {project.githubUrl && (
                      <Button
                        // asChild
                        variant="outline"
                        className="flex-1"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    
                    {project.demoUrl && (
                      <Button
                        // asChild
                        className="flex-1"
                      >
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="p-8 bg-white dark:bg-primary-900 rounded-2xl shadow-sm border border-primary-200 dark:border-primary-700">
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
                Want to see more?
              </h3>
              <p className="text-primary-600 dark:text-primary-400 mb-6 max-w-2xl mx-auto">
                I'm constantly working on new projects and improving existing ones. 
                Check out my GitHub for the latest updates and contributions.
              </p>
              <Button
                // asChild
                className="btn-primary"
              >
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View All Projects on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
