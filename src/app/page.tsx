"use client"
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Languages } from "@/components/sections/languages";
import { ProjectsDone } from "@/components/sections/projects-done";
import { ProjectsToDo } from "@/components/sections/projects-todo";
import { Contact } from "@/components/sections/contact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { prefetchAdminData } from "@/lib/data-prefetch";

export default function Home() {
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
  useEffect(() => {
    // Prefetch all admin data when user is authenticated
    prefetchAdminData(queryClient);
  }, []);
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Hero />
        <About />
        <Skills />
        <Languages />
        <ProjectsDone />
        <ProjectsToDo />
        <Contact />
      </QueryClientProvider>
    </div>
  );
}
