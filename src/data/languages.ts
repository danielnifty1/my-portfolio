export interface Language {
  name: string
  icon: string
  proficiency: number // 0-100
  category: 'frontend' | 'backend' | 'database' | 'other'
  description?: string
}

export const languages: Language[] = [
  {
    name: 'JavaScript',
    icon: '⚡',
    proficiency: 95,
    category: 'frontend',
    description: 'ES6+, Modern JavaScript features'
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    proficiency: 90,
    category: 'frontend',
    description: 'Type safety, Interfaces, Generics'
  },
  {
    name: 'HTML/CSS',
    icon: '🌐',
    proficiency: 85,
    category: 'frontend',
    description: 'Semantic HTML, CSS Grid, Flexbox'
  },
  {
    name: 'Python',
    icon: '🐍',
    proficiency: 75,
    category: 'backend',
    description: 'Data analysis, automation, web scraping'
  },
  {
    name: 'SQL',
    icon: '🗄️',
    proficiency: 80,
    category: 'database',
    description: 'PostgreSQL, MySQL, Database design'
  },
  {
    name: 'Node.js',
    icon: '🟢',
    proficiency: 85,
    category: 'backend',
    description: 'Express.js, REST APIs, Authentication'
  },
  {
    name: 'React',
    icon: '⚛️',
    proficiency: 90,
    category: 'frontend',
    description: 'Hooks, Context, Performance optimization'
  },
  {
    name: 'Next.js',
    icon: '▲',
    proficiency: 85,
    category: 'frontend',
    description: 'App Router, SSR, API routes'
  },
  {
    name: 'Git',
    icon: '📚',
    proficiency: 80,
    category: 'other',
    description: 'Version control, CI/CD workflows'
  },
  {
    name: 'Docker',
    icon: '🐳',
    proficiency: 70,
    category: 'other',
    description: 'Containerization, deployment'
  }
]
