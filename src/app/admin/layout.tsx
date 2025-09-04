'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/contexts/auth-context';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { prefetchAdminData } from '@/lib/data-prefetch';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
  },
});

// Component to handle data prefetching
function DataPrefetcher() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Prefetch all admin data when user is authenticated
      prefetchAdminData(queryClient);
    }
  }, [isAuthenticated, isLoading]);

  return null;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DataPrefetcher />
          {children}
          <ToastContainer />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
