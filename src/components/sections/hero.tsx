"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { ChevronDown, Download, Mail } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/lib/firebase-services";
import { PerformanceMonitor } from "../admin/ui/performance-monitor";
import ProtectedRoute from "../admin/auth/protected-route";
import DashboardLayout from "../admin/layout/dashboard-layout";
import { OwnerSkeleton, ProfileSkeleton } from "../admin/ui/skeleton";
import {
  useGetBiography,
  useFetchProfilePicture,
  useGetResume,
  useOwnerProfile,
} from "@/hooks/useOwnerProfile";
export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };



  // Fetch profile data with better caching
  const { data: ownerprofile, isLoading, error } = useOwnerProfile();
  // Fetch profile picture data with better caching
  const { data: profilePicture } = useFetchProfilePicture();
  //  Fetch about Data with better caching
  const { data: aboutData } = useGetBiography();

  // Fetch skills data with better caching
  const { data: resume } = useGetResume();
  // const { data: bio } = biography();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `${resume?.resume}`;
    link.download = `${resume?.fileName}`;
    link.click();
  };
  if (isLoading) {
    return <OwnerSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
        <p className="text-red-600 dark:text-red-400">
          Failed to load profile. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <>
      <PerformanceMonitor
        queryKey="profile"
        isLoading={isLoading}
        error={error}
      />

      <section
        id="home"
        className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50 to-accent-50 dark:from-primary-900 dark:via-primary-800 dark:to-primary-900"
      >
        <div className="container-custom text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Image Placeholder */}
            <div className="mt-[100px] mx-auto w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-4xl font-bold mb-8">
              <Image
                src={profilePicture?.url ? profilePicture?.url : ""}
                className="rounded-2xl"
                alt="Profile"
                width={128}
                height={128}
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-2xl font-bold text-primary-900 dark:text-primary-100">
                {ownerprofile?.firstName + " " + ownerprofile?.lastName}
              </h1>
              <p className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto leading-relaxed">
                Full-Stack Developer
              </p>
              <p className="text-lg text-primary-500 dark:text-primary-300 max-w-3xl mx-auto leading-relaxed">
                {aboutData?.intro}
              </p>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button
                onClick={scrollToContact}
                className="btn-primary text-lg px-8 py-4"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              <Button
                onClick={downloadResume}
                variant="outline"
                className="btn-secondary text-lg px-8 py-4"
              >
                <Download className="w-5 h-5 mr-2" />
                <a href={resume?.resume} download>
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-16">
              <button
                onClick={() => {
                  const element = document.querySelector("#about");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-primary-500 dark:text-primary-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200 animate-bounce"
              >
                <ChevronDown className="w-8 h-8 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
