"use client"

import { skills, type Skill } from '@/data/skills'
import { Badge } from '@/components/ui/badge'

const getLevelColor = (level: Skill['level']) => {
  switch (level) {
    case 'beginner':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'intermediate':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'advanced':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'expert':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getLevelIcon = (level: Skill['level']) => {
  switch (level) {
    case 'beginner':
      return '🌱'
    case 'intermediate':
      return '📚'
    case 'advanced':
      return '🚀'
    case 'expert':
      return '🏆'
    default:
      return '📖'
  }
}

export function Skills() {
  const technicalSkills = skills.filter(skill => skill.category === 'technical')
  const softSkills = skills.filter(skill => skill.category === 'soft')

  return (
    <section id="skills" className="section-padding bg-primary-50 dark:bg-primary-800">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              Skills & Expertise
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical capabilities and professional competencies
            </p>
            <div className="w-24 h-1 bg-accent-600 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
                  Technical Skills
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Programming languages, frameworks, and development tools
                </p>
              </div>
              
              <div className="grid gap-4">
                {technicalSkills.map((skill) => (
                  <div key={skill.name} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                        {skill.name}
                      </h4>
                      <Badge className={getLevelColor(skill.level)}>
                        <span className="mr-1">{getLevelIcon(skill.level)}</span>
                        {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      </Badge>
                    </div>
                    {skill.description && (
                      <p className="text-primary-600 dark:text-primary-400 text-sm">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
                  Professional Skills
                </h3>
                <p className="text-primary-600 dark:text-primary-400">
                  Interpersonal abilities and professional competencies
                </p>
              </div>
              
              <div className="grid gap-4">
                {softSkills.map((skill) => (
                  <div key={skill.name} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                        {skill.name}
                      </h4>
                      <Badge className={getLevelColor(skill.level)}>
                        <span className="mr-1">{getLevelIcon(skill.level)}</span>
                        {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      </Badge>
                    </div>
                    {skill.description && (
                      <p className="text-primary-600 dark:text-primary-400 text-sm">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16 p-8 bg-white dark:bg-primary-900 rounded-2xl shadow-sm border border-primary-200 dark:border-primary-700">
            <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-4">
              Always Learning
            </h3>
            <p className="text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying up-to-date with the latest technologies. 
              Currently exploring AI/ML, cloud architecture, Rust Programming Language and advanced React patterns.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
