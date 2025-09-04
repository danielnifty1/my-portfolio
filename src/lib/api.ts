import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper: wait for Firebase auth to load user
const waitForUser = () =>
  new Promise((resolve) => {
    const auth = getAuth();
    if (auth.currentUser) return resolve(auth.currentUser);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    try {
      const auth = getAuth();
      const user: any = await waitForUser();

      if (user) {
        const idToken = await user.getIdToken();
        config.headers.Authorization = `Bearer ${idToken}`;
      }
    } catch (e) {
      console.warn("⚠️ No Firebase user session:", e);
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export interface Profile {
  id: string;
  firstName: string;

  lastName: string;
  phone?: string;
  email: string;
  role:''
}

export interface AboutMe {
  id: string;
  biography: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isCompleted: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-100
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillData {
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
}

export const profileAPI = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/admin/profile');
    // console.log("the data",response.data)
    return response.data.data;
  },
  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await api.put('/profile', data);
    return response.data;
  },
};



export const loginAPI = {
  getProfile: async (): Promise<Profile> => {
    const response = await api.get('/auth/login');
    console.log(response.data)
    return response.data;
  },
};

export const aboutAPI = {
  getAbout: async (): Promise<AboutMe> => {
    const response = await api.get('/about');
    return response.data;
  },
  updateAbout: async (data: { biography: string }): Promise<AboutMe> => {
    const response = await api.put('/about', data);
    return response.data;
  },
};

export const projectsAPI = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  createProject: async (data: CreateProjectData): Promise<Project> => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  updateProject: async (id: string, data: Partial<CreateProjectData>): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

export const skillsAPI = {
  getSkills: async (): Promise<Skill[]> => {
    const response = await api.get('/skills');
    return response.data;
  },
  createSkill: async (data: CreateSkillData): Promise<Skill> => {
    const response = await api.post('/skills', data);
    return response.data;
  },
  updateSkill: async (id: string, data: Partial<CreateSkillData>): Promise<Skill> => {
    const response = await api.put(`/skills/${id}`, data);
    return response.data;
  },
  deleteSkill: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`);
  },
};

export default api;
