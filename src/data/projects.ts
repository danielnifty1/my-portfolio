export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  status: 'completed' | 'planned'
  category: 'web' | 'mobile' | 'api' | 'tool' | 'other'
  priority?: 'low' | 'medium' | 'high'
}

export const completedProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT'],
    image: '/projects/ecommerce.jpg',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    status: 'completed',
    category: 'web'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration, and progress tracking.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
    image: '/projects/task-manager.jpg',
    githubUrl: 'https://github.com/yourusername/task-manager',
    demoUrl: 'https://task-manager-demo.vercel.app',
    status: 'completed',
    category: 'web'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather conditions and forecasts using multiple weather APIs.',
    techStack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    image: '/projects/weather.jpg',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    demoUrl: 'https://weather-demo.vercel.app',
    status: 'completed',
    category: 'web'
  },
  {
    id: '4',
    title: 'REST API Service',
    description: 'A comprehensive REST API service with authentication, rate limiting, and comprehensive documentation.',
    techStack: ['Node.js', 'Express', 'JWT', 'Redis', 'Swagger', 'Jest'],
    image: '/projects/api.jpg',
    githubUrl: 'https://github.com/yourusername/rest-api-service',
    demoUrl: 'https://api-docs.vercel.app',
    status: 'completed',
    category: 'api'
  }
]

export const plannedProjects: Project[] = [
  {
    id: '5',
    title: 'AI Chat Application',
    description: 'A conversational AI application with natural language processing and machine learning capabilities.',
    techStack: ['Next.js', 'Php', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'Redis'],
    status: 'planned',
    category: 'web',
    priority: 'high'
  },
  {
    id: '6',
    title: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile application for tracking workouts, nutrition, and health metrics.',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'HealthKit', 'Google Fit API'],
    status: 'planned',
    category: 'mobile',
    priority: 'medium'
  },
  {
    id: '7',
    title: 'Blockchain Portfolio Tracker',
    description: 'A decentralized application for tracking cryptocurrency portfolios with real-time price updates.',
    techStack: ['React', 'Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'MetaMask'],
    status: 'planned',
    category: 'web',
    priority: 'medium'
  },
  {
    id: '8',
    title: 'Data Visualization Tool',
    description: 'An interactive data visualization platform for creating charts, graphs, and dashboards.',
    techStack: ['Vue.js', 'D3.js', 'Php', 'Pandas', 'FastAPI', 'PostgreSQL'],
    status: 'planned',
    category: 'tool',
    priority: 'low'
  }
]
