'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsService, Project } from '@/lib/firebase-services';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { Input, Textarea, FileUpload, Button, MultiSelect } from '@/components/admin/ui/form-components';
import { Briefcase, Plus, Edit, Trash2, ExternalLink, Github, Eye, EyeOff } from 'lucide-react';
import DashboardLayout from '@/components/admin/layout/dashboard-layout';
import ProtectedRoute from '@/components/admin/auth/protected-route';
import { ProjectsSkeleton } from '@/components/admin/ui/skeleton';
import { toast } from 'react-toastify';
import { LinkPreview } from "@dhaiwat10/react-link-preview";

const TECHNOLOGY_OPTIONS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express',
  'Php', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET',
  'HTML', 'CSS', 'Tailwind CSS', 'SASS', 'Bootstrap',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Supabase',
  'AWS', 'Vercel', 'Netlify', 'Docker', 'Kubernetes',
  'Git', 'GitHub', 'GitLab', 'Figma', 'Adobe XD'
];

export default function ProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [] as string[],
    githubUrl: '',
    liveUrl: '',
    isCompleted: true
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCompleted, setShowCompleted] = useState(true);
  
  const queryClient = useQueryClient();

  // Fetch projects data with better caching
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getProjects,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      let imageUrl = data.image;

      if (imageFile) {
        const uploaded = await uploadToCloudinary(imageFile, 'projects');
        imageUrl = uploaded.secure_url;
      }

      return projectsService.createProject({ ...data, image: imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      resetForm();
      toast.success('Project created successfully!');
    },
    onError: (error: any) => {
      console.error('Project creation error:', error);
      toast.error('Failed to create project. Please try again.');
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Project> }) => {
      let imageUrl = data.image;

      if (imageFile) {
        const uploaded = await uploadToCloudinary(imageFile, 'projects');
        imageUrl = uploaded.secure_url;
      }

      return projectsService.updateProject(id, { ...data, image: imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      resetForm();
      toast.success('Project updated successfully!');
    },
    onError: (error: any) => {
      console.error('Project update error:', error);
      toast.error('Failed to update project. Please try again.');
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Project deletion error:', error);
      toast.error('Failed to delete project. Please try again.');
    },
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      isCompleted: true
    });
    setImageFile(null);
    setErrors({});
    setShowForm(false);
    setEditingProject(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      isCompleted: project.isCompleted
    });
    setImageFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setErrors({ general: 'Please fill in all required fields.' });
      return;
    }

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies,
      githubUrl: formData.githubUrl.trim() || undefined,
      liveUrl: formData.liveUrl.trim() || undefined,
      isCompleted: formData.isCompleted
    };

    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: projectData });
    } else {
      createProjectMutation.mutate(projectData);
    }
  };

  const handleDelete = (project: Project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProjectMutation.mutate(project.id);
    }
  };

  const filteredProjects = projects?.filter(project => 
    showCompleted ? project.isCompleted : !project.isCompleted
  ) || [];

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <ProjectsSkeleton />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load projects. Please refresh the page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Briefcase className="mr-3 h-8 w-8 text-blue-600" />
                  Projects Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your portfolio projects and showcase your work
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                icon={Plus}
                className="ml-4"
              >
                Add Project
              </Button>
            </div>
          </div>

          {/* Toggle between completed and todo projects */}
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setShowCompleted(true)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                showCompleted
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Eye className="inline w-4 h-4 mr-2" />
              Completed Projects ({projects?.filter(p => p.isCompleted).length || 0})
            </button>
            <button
              onClick={() => setShowCompleted(false)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                !showCompleted
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <EyeOff className="inline w-4 h-4 mr-2" />
              Projects To Do ({projects?.filter(p => !p.isCompleted).length || 0})
            </button>
          </div>

          {/* Project Form */}
          {showForm && (
            <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              
              {errors.general && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <p className="text-red-600 dark:text-red-400">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Project Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    error={errors.title}
                    required
                  />
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <select
                      value={formData.isCompleted ? 'completed' : 'todo'}
                      onChange={(e) => handleInputChange('isCompleted', e.target.value === 'completed')}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="completed">Completed</option>
                      <option value="todo">To Do</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your project, its features, and technologies used..."
                  error={errors.description}
                  rows={4}
                  required
                />

                <MultiSelect
                  label="Technologies Used"
                  value={formData.technologies}
                  onChange={(value) => handleInputChange('technologies', value)}
                  options={TECHNOLOGY_OPTIONS}
                  error={errors.technologies}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="GitHub URL"
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    placeholder="https://github.com/username/project"
                    error={errors.githubUrl}
                  />
                  
                  <Input
                    label="Live Demo URL"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => handleInputChange('liveUrl', e.target.value)}
                    placeholder="https://your-project.com"
                    error={errors.liveUrl}
                  />
                </div>

                <FileUpload
                  label="Project Image"
                  accept="image/*"
                  onChange={(file) => setImageFile(file)}
                  error={errors.image}
                />

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={createProjectMutation.isPending || updateProjectMutation.isPending}
                    // icon={Save}
                  >
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Projects List */}
          <div className="space-y-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No {showCompleted ? 'completed' : 'todo'} projects
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {showCompleted 
                    ? 'Get started by creating your first completed project.' 
                    : 'Add projects you plan to work on.'
                  }
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => setShowForm(true)}
                    icon={Plus}
                  >
                    Add Project
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                    {project.image && (
                      <div className="h-48 bg-gray-200 dark:bg-gray-700">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        /> 
                       
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.isCompleted
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {project.isCompleted ? 'Completed' : 'To Do'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleEdit(project)}
                            icon={Edit}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(project)}
                            icon={Trash2}
                            loading={deleteProjectMutation.isPending}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}