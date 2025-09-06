import {
  aboutService,
  myResumes,
  profileService,
} from "@/lib/firebase-services";
import { useQuery } from "@tanstack/react-query";

export function useOwnerProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useFetchProfilePicture() {
  return useQuery({
    queryKey: ["profilePicture"],
    queryFn: profileService.getProfilePicture,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useProjectsService() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: aboutService.getAbout,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useGetResume() {
  return useQuery({
    queryKey: ["myResume"],
    queryFn: myResumes.getResume,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

export function useGetBiography() {
  return useQuery({
    queryKey: ["about"],
    queryFn: aboutService.getAbout,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
