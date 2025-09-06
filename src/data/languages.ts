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
    proficiency: 100,
    category: 'frontend',
    description: 'ES6+, Modern JavaScript features'
  },
  {
    name: 'TypeScript',
    icon: '🔷',
    proficiency: 100,
    category: 'frontend',
    description: 'Type safety, Interfaces, Generics'
  },
  {
    name: 'HTML/CSS',
    icon: '🌐',
    proficiency: 100,
    category: 'frontend',
    description: 'Semantic HTML, CSS Grid, Flexbox'
  },
  {
  name: 'Vue.js',
  icon: '🖖',
  proficiency: 90,
  category: 'frontend',
  description: 'Reactive data binding, component-based architecture, Composition API'
},
  {
    name: 'Php',
    icon: '🐘',
    proficiency: 90,
    category: 'backend',
    description: 'Server-side scripting,Data analysis, automation, web scraping,RESTful APIs'
  },
  {
    name: 'SQL',
    icon: '🗄️',
    proficiency: 100,
    category: 'database',
    description: 'PostgreSQL, MySQL, Database design'
  },
    {
    name: 'No-SQL',
    icon: '🗄️',
    proficiency: 100,
    category: 'database',
    description: 'Mongoose,Database design'
  },
  {
    name: 'Node.js',
    icon: '🟢',
    proficiency: 100,
    category: 'backend',
    description: 'nest.js, REST APIs, Authentication,Graphql,scalable app, Micro Services,real-time applications,WebSockets'
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
    proficiency: 90,
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
