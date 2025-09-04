import { QueryClient } from '@tanstack/react-query';
import { profileService, aboutService, projectsService, skillsService } from './firebase-services';

// Prefetch all admin data for better performance
export const prefetchAdminData = async (queryClient: QueryClient) => {
  try {
    // Prefetch all data in parallel
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: profileService.getProfile,
        staleTime: 5 * 60 * 1000, // 5 minutes
      }),
      queryClient.prefetchQuery({
        queryKey: ['about'],
        queryFn: aboutService.getAbout,
        staleTime: 5 * 60 * 1000, // 5 minutes
      }),
      queryClient.prefetchQuery({
        queryKey: ['projects'],
        queryFn: projectsService.getProjects,
        staleTime: 2 * 60 * 1000, // 2 minutes
      }),
      queryClient.prefetchQuery({
        queryKey: ['skills'],
        queryFn: skillsService.getSkills,
        staleTime: 5 * 60 * 1000, // 5 minutes
      }),
    ]);
  } catch (error) {
    console.error('Error prefetching admin data:', error);
  }
};

// Prefetch specific data based on route
export const prefetchRouteData = async (queryClient: QueryClient, route: string) => {
  try {
    switch (route) {
      case 'profile':
        await queryClient.prefetchQuery({
          queryKey: ['profile'],
          queryFn: profileService.getProfile,
          staleTime: 5 * 60 * 1000,
        });
        break;
      case 'about':
        await queryClient.prefetchQuery({
          queryKey: ['about'],
          queryFn: aboutService.getAbout,
          staleTime: 5 * 60 * 1000,
        });
        break;
      case 'projects':
        await queryClient.prefetchQuery({
          queryKey: ['projects'],
          queryFn: projectsService.getProjects,
          staleTime: 2 * 60 * 1000,
        });
        break;
      case 'skills':
        await queryClient.prefetchQuery({
          queryKey: ['skills'],
          queryFn: skillsService.getSkills,
          staleTime: 5 * 60 * 1000,
        });
        break;
    }
  } catch (error) {
    console.error(`Error prefetching ${route} data:`, error);
  }
};
