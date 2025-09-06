"use client";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  setDoc,
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp,
  getDocFromCache 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// Types
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  userName:string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
// Resume
export interface MyResume {
  id: string;
  resume: string;
  fileName:string;
  updatedAt: Timestamp;
}
export interface AboutMe {
  id: string;
  biography: string;
  intro:string;
  updatedAt: Timestamp;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  isCompleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-100
  icon?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProfilePicture{
  id: string;

  url:string;
   createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Profile Services
export const profileService = {
  async getProfile(): Promise<Profile | null> {
    try {
     
      const profileRef = doc(db, 'profile', 'main');
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        return { id: profileSnap.id, ...profileSnap.data() } as Profile;
      }
      return null;
    } catch (error) {
      // Fallback to cache when offline
      try {
        const profileRef = doc(db, 'profile', 'main');
        const cachedSnap = await getDocFromCache(profileRef);
        if (cachedSnap.exists()) {
          return { id: cachedSnap.id, ...cachedSnap.data() } as Profile;
        }
      } catch (_) {}
      console.error('Error getting profile details:', error);
      throw error;
    }
  },







  async updateProfile(data: Partial<Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Profile> {
    try {
      const profileRef = doc(db, 'profile', 'main');
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      // Use setDoc with merge to create if missing and update otherwise
      await setDoc(profileRef, updateData, { merge: true });
      
      const updatedProfile = await this.getProfile();
      if (!updatedProfile) {
        throw new Error('Profile not found after update');
      }
      
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },


  async getProfilePicture():Promise<ProfilePicture | null> {

    try {
         const profilePic = doc(db, 'profilePicture','main');
      const profilePicSnap = await getDoc(profilePic);
        if (profilePicSnap.exists()) {
        return { id: profilePicSnap.id, ...profilePicSnap.data() } as ProfilePicture;
      }
    return null
      
    } catch (error) {
             try {
        const profilePicRef = doc(db, 'profilePicture','main');
        const cachedPicSnap = await getDocFromCache(profilePicRef);
        if (cachedPicSnap.exists()) {
          return { id: cachedPicSnap.id, ...cachedPicSnap.data() } as ProfilePicture;
        }
      } catch (_) {}
      console.error('Error getting profile details:', error);
      throw error;
    }
    },

 
  

  async createProfilePicture(url:string){

    try {
        const userDocRef = doc(db, 'profilePicture','main');
        const displayPhoto={
          url,
             createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

        }
      // await updateDoc(userDocRef, { profilePhoto: url });

        // Create or overwrite the profile document
      await setDoc(userDocRef, displayPhoto);
      
      const newProfilePic = await this.getProfilePicture();

      
      if (!newProfilePic) {
        console.log('Profile not found after creation')
        throw new Error('Profile not found after creation');
      }
        console.log('Profile pic',newProfilePic)
      
      return newProfilePic;
      
    } catch (error) {
        throw new Error('Profile Picture  created');
     
    }


  },

  async createProfile(data: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<Profile> {
    try {
      const profileRef = doc(db, 'profile', 'main');
      const profileData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      // Create or overwrite the profile document
      await setDoc(profileRef, profileData);
      
      const newProfile = await this.getProfile();
      if (!newProfile) {
        throw new Error('Profile not found after creation');
      }
      
      return newProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }
};

// About Me Services
export const aboutService = {
  async getAbout(): Promise<AboutMe | null> {
    try {
      const aboutRef = doc(db, 'about', 'main');
      const aboutSnap = await getDoc(aboutRef);
      
      if (aboutSnap.exists()) {
        return { id: aboutSnap.id, ...aboutSnap.data() } as AboutMe;
      }
      return null;
    } catch (error) {
      // Fallback to cache when offline
      try {
        const aboutRef = doc(db, 'about', 'main');
        const cachedSnap = await getDocFromCache(aboutRef);
        if (cachedSnap.exists()) {
          return { id: cachedSnap.id, ...cachedSnap.data() } as AboutMe;
        }
      } catch (_) {}
      console.error('Error getting about:', error);
      throw error;
    }
  },

  async updateAbout(biography: string,intro:string): Promise<AboutMe> {
    try {
      const aboutRef = doc(db, 'about', 'main');
      const updateData = {
        biography,
        intro,
        updatedAt: serverTimestamp(),
      };
      
      // Merge to create if missing
      await setDoc(aboutRef, updateData, { merge: true });
      
      const updatedAbout = await this.getAbout();
      if (!updatedAbout) {
        throw new Error('About not found after update');
      }
      
      return updatedAbout;
    } catch (error) {
      console.error('Error updating about:', error);
      throw error;
    }
  },

  async createAbout(biography: string,intro:string): Promise<AboutMe> {
    try {
      const aboutRef = doc(db, 'about', 'main');
      const aboutData = {
        biography,
        intro,
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(aboutRef, aboutData);
      
      const newAbout = await this.getAbout();
      if (!newAbout) {
        throw new Error('About not found after creation');
      }
      
      return newAbout;
    } catch (error) {
      console.error('Error creating about:', error);
      throw error;
    }
  }
};

// Projects Services
export const projectsService = {
  async getProjects(): Promise<Project[]> {
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
    } catch (error) {
      console.error('Error getting projects:', error);
      throw error;
    }
  },

  async createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    try {
      const projectsRef = collection(db, 'projects');
      const projectData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(projectsRef, projectData);
      
      const newProject = await this.getProject(docRef.id);
      if (!newProject) {
        throw new Error('Project not found after creation');
      }
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async getProject(id: string): Promise<Project | null> {
    try {
      const projectRef = doc(db, 'projects', id);
      const projectSnap = await getDoc(projectRef);
      
      if (projectSnap.exists()) {
        return { id: projectSnap.id, ...projectSnap.data() } as Project;
      }
      return null;
    } catch (error) {
      console.error('Error getting project:', error);
      throw error;
    }
  },

  async updateProject(id: string, data: Partial<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Project> {
    try {
      const projectRef = doc(db, 'projects', id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(projectRef, updateData);
      
      const updatedProject = await this.getProject(id);
      if (!updatedProject) {
        throw new Error('Project not found after update');
      }
      
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      const projectRef = doc(db, 'projects', id);
      await deleteDoc(projectRef);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }
};

// Skills Services
export const skillsService = {
  async getSkills(): Promise<Skill[]> {
    try {
      const skillsRef = collection(db, 'skills');
      const q = query(skillsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Skill[];
    } catch (error) {
      console.error('Error getting skills:', error);
      throw error;
    }
  },

  async createSkill(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> {
    try {
      const skillsRef = collection(db, 'skills');
      const skillData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(skillsRef, skillData);
      
      const newSkill = await this.getSkill(docRef.id);
      if (!newSkill) {
        throw new Error('Skill not found after creation');
      }
      
      return newSkill;
    } catch (error) {
      console.error('Error creating skill:', error);
      throw error;
    }
  },

  async getSkill(id: string): Promise<Skill | null> {
    try {
      const skillRef = doc(db, 'skills', id);
      const skillSnap = await getDoc(skillRef);
      
      if (skillSnap.exists()) {
        return { id: skillSnap.id, ...skillSnap.data() } as Skill;
      }
      return null;
    } catch (error) {
      console.error('Error getting skill:', error);
      throw error;
    }
  },

  async updateSkill(id: string, data: Partial<Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Skill> {
    try {
      const skillRef = doc(db, 'skills', id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp(),
      };
      
      await updateDoc(skillRef, updateData);
      
      const updatedSkill = await this.getSkill(id);
      if (!updatedSkill) {
        throw new Error('Skill not found after update');
      }
      
      return updatedSkill;
    } catch (error) {
      console.error('Error updating skill:', error);
      throw error;
    }
  },

  async deleteSkill(id: string): Promise<void> {
    try {
      const skillRef = doc(db, 'skills', id);
      await deleteDoc(skillRef);
    } catch (error) {
      console.error('Error deleting skill:', error);
      throw error;
    }
  }
};

// Storage Services
export const storageService = {
  async uploadImage(file: File, path: string): Promise<string> {
    try {
      // Include contentType metadata to avoid preflight issues
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type || 'application/octet-stream',
      });
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async deleteImage(url: string): Promise<void> {
    try {
      const imageRef = ref(storage, url);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Resume
export const myResumes={
// get Resume

async getResume(): Promise<MyResume | null> {
    try {
      const resumeRef = doc(db, 'myResume', 'main');
      const resumeSnap = await getDoc(resumeRef);
      
      if (resumeSnap.exists()) {
        return { id: resumeSnap.id, ...resumeSnap.data() } as MyResume;
      }
      return null;
    } catch (error) {
      // Fallback to cache when offline
      try {
        const resumeRef = doc(db, 'myResume', 'main');
        const cachedSnap = await getDocFromCache(resumeRef);
        if (cachedSnap.exists()) {
          return { id: cachedSnap.id, ...cachedSnap.data() } as MyResume;
        }
      } catch (_) {}
      console.error('Error getting Resume:', error);
      throw error;
    }
  },

  // update or create resume
   async updateResume(resume: string,fileName:string): Promise<MyResume> {
    try {
      const myResume = doc(db, 'myResume', 'main');
      const updateData = {
        resume,
        fileName,
        updatedAt: serverTimestamp(),
      };
      
      // Merge to create if missing
      await setDoc(myResume, updateData, { merge: true });
      
      const updatedResume = await this.getResume();
      if (!updatedResume) {
        throw new Error('About not found after update');
      }
      
      return updatedResume;
    } catch (error) {
      console.error('Error updating about:', error);
      throw error;
    }
  },

}
