export interface Skill {
  name: string
  category: 'technical' | 'soft'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  description?: string
}

export const skills: Skill[] = [
  // Technical Skills
  { name: 'JavaScript/TypeScript', category: 'technical', level: 'expert', description: 'Modern ES6+, React ecosystem' },
  { name: 'React', category: 'technical', level: 'expert', description: 'Hooks, Context, Performance optimization' },
  { name: 'Next.js', category: 'technical', level: 'advanced', description: 'App Router, SSR, API routes' },
  { name: 'Node.js', category: 'technical', level: 'advanced', description: 'Express, REST APIs, Authentication' },
  { name: 'Php', category: 'technical', level: 'intermediate', description: 'Server-side scripting,Data analysis, automation, web scraping,RESTful APIs' },
  { name: 'SQL', category: 'technical', level: 'intermediate', description: 'PostgreSQL, MySQL, Database design' },
  { name: 'Git', category: 'technical', level: 'advanced', description: 'Version control, CI/CD workflows' },
  { name: 'Docker', category: 'technical', level: 'intermediate', description: 'Containerization, deployment' },
  
  // Soft Skills
  { name: 'Problem Solving', category: 'soft', level: 'expert', description: 'Analytical thinking, debugging' },
  { name: 'Communication', category: 'soft', level: 'advanced', description: 'Technical writing, team collaboration' },
  { name: 'Project Management', category: 'soft', level: 'intermediate', description: 'Agile methodologies, task prioritization' },
  { name: 'Mentoring', category: 'soft', level: 'intermediate', description: 'Code reviews, knowledge sharing' },
  { name: 'Adaptability', category: 'soft', level: 'advanced', description: 'Learning new technologies quickly' },
  { name: 'Attention to Detail', category: 'soft', level: 'expert', description: 'Quality assurance, edge case handling' },
]
