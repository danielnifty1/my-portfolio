"use client"

import { languages, type Language } from '@/data/languages'

const getCategoryColor = (category: Language['category']) => {
  switch (category) {
    case 'frontend':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    case 'backend':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'database':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
    case 'other':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

const getProficiencyColor = (proficiency: number) => {
  if (proficiency >= 90) return 'bg-green-500'
  if (proficiency >= 80) return 'bg-blue-500'
  if (proficiency >= 70) return 'bg-yellow-500'
  if (proficiency >= 60) return 'bg-orange-500'
  return 'bg-red-500'
}

export function Languages() {
  const frontendLanguages = languages.filter(lang => lang.category === 'frontend')
  const backendLanguages = languages.filter(lang => lang.category === 'backend')
  const databaseLanguages = languages.filter(lang => lang.category === 'database')
  const otherLanguages = languages.filter(lang => lang.category === 'other')
  

  const renderLanguageCard = (language: Language) => (
    <div key={language.name} className="card p-6 hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{language.icon}</span>
          <div>
            <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
              {language.name}
            </h4>
            <Badge className={getCategoryColor(language.category)}>
              {language.category.charAt(0).toUpperCase() + language.category.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      {language.description && (
        <p className="text-primary-600 dark:text-primary-400 text-sm mb-4">
          {language.description}
        </p>
      )}
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-primary-600 dark:text-primary-400">Proficiency</span>
          <span className="font-medium text-primary-900 dark:text-primary-100">
            {language.proficiency}%
          </span>
        </div>
        <div className="w-full bg-primary-200 dark:bg-primary-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProficiencyColor(language.proficiency)}`}
            style={{ width: `${language.proficiency}%` }}
          ></div>
        </div>
      </div>
    </div>
  )

  return (
    <section id="languages" className="section-padding bg-white dark:bg-primary-900">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              Programming Languages
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
              My technical toolkit and proficiency levels across different programming domains
            </p>
            <div className="w-24 h-1 bg-accent-600 mx-auto mt-6"></div>
          </div>

          {/* Frontend Languages */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-6 text-center">
              Frontend Development
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendLanguages.map(renderLanguageCard)}
            </div>
          </div>

          {/* Backend Languages */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-6 text-center">
              Backend Development
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendLanguages.map(renderLanguageCard)}
            </div>
          </div>

          {/* Database & Other Languages */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-6 text-center">
                Database & Data
              </h3>
              <div className="grid gap-6">
                {databaseLanguages.map(renderLanguageCard)}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100 mb-6 text-center">
                Tools & Others
              </h3>
              <div className="grid gap-6">
                {otherLanguages.map(renderLanguageCard)}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-16 p-6 bg-primary-50 dark:bg-primary-800 rounded-xl border border-primary-200 dark:border-primary-700">
            <h4 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-4 text-center">
              Proficiency Levels
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-primary-600 dark:text-primary-400">90-100% Expert</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-primary-600 dark:text-primary-400">80-89% Advanced</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-primary-600 dark:text-primary-400">70-79% Intermediate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-primary-600 dark:text-primary-400">60-69% Learning</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-primary-600 dark:text-primary-400">Below 60% Beginner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Simple Badge component for this section
function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
