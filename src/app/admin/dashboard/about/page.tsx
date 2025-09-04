'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutService, AboutMe } from '@/lib/firebase-services';
import { Textarea, Button } from '@/components/admin/ui/form-components';
import { FileText, Save } from 'lucide-react';
import DashboardLayout from '@/components/admin/layout/dashboard-layout';
import ProtectedRoute from '@/components/admin/auth/protected-route';
import { AboutSkeleton } from '@/components/admin/ui/skeleton';
import { toast } from 'react-toastify';

export default function AboutPage() {
  const [biography, setBiography] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const queryClient = useQueryClient();

  // Fetch about data with better caching
  const { data: aboutData, isLoading, error } = useQuery({
    queryKey: ['about'],
    queryFn: aboutService.getAbout,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
  
  // Update about mutation
  const updateAboutMutation = useMutation({
    mutationFn: (biography: string) => aboutService.updateAbout(biography),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
      setErrors({});
      toast.success('About section updated successfully!');
    },
    onError: (error: any) => {
      console.error('About update error:', error);
      setErrors({ general: 'Failed to update about section. Please try again.' });
      toast.error('Failed to update about section. Please try again.');
    },
  });

  // Create about mutation (for first time setup)
  const createAboutMutation = useMutation({
    mutationFn: (biography: string) => aboutService.createAbout(biography),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about'] });
      setErrors({});
      toast.success('About section created successfully!');
    },
    onError: (error: any) => {
      console.error('About creation error:', error);
      setErrors({ general: 'Failed to create about section. Please try again.' });
      toast.error('Failed to create about section. Please try again.');
    },
  });

  // Update form data when about is loaded
  useEffect(() => {
    if (aboutData) {
      setBiography(aboutData.biography || '');
    }
  }, [aboutData]);

  const handleBiographyChange = (value: string) => {
    setBiography(value);
    // Clear error when user starts typing
    if (errors.biography) {
      setErrors(prev => ({ ...prev, biography: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!biography.trim()) {
      setErrors({ biography: 'Please enter your biography.' });
      return;
    }

    if (aboutData) {
      updateAboutMutation.mutate(biography.trim());
    } else {
      createAboutMutation.mutate(biography.trim());
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <AboutSkeleton />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load about section. Please refresh the page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <FileText className="mr-3 h-8 w-8 text-blue-600" />
              About Me Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {aboutData ? 'Update your professional biography and personal story' : 'Create your professional biography and personal story'}
            </p>
          </div>

          {errors.general && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <p className="text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Professional Biography
              </h2>
              
              <Textarea
                label="About Me"
                value={biography}
                onChange={(e) => handleBiographyChange(e.target.value)}
                placeholder="Tell your story... Share your professional journey, skills, passions, and what makes you unique. This will be displayed on your portfolio's about section."
                error={errors.biography}
                rows={12}
                required
              />
              
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>💡 <strong>Tips for writing a great about section:</strong></p>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  <li>Start with a compelling introduction</li>
                  <li>Highlight your key skills and expertise</li>
                  <li>Share your professional journey and achievements</li>
                  <li>Include your passions and what drives you</li>
                  <li>End with your current goals or what you're looking for</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                loading={updateAboutMutation.isPending || createAboutMutation.isPending}
                icon={Save}
              >
                {aboutData ? 'Save Changes' : 'Create About Section'}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}