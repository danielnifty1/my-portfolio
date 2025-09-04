"use client";

import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService, Profile } from "@/lib/firebase-services";
import {
  Input,
  Button,
  FileUpload,
} from "@/components/admin/ui/form-components";
import { User, Save } from "lucide-react";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";
import ProtectedRoute from "@/components/admin/auth/protected-route";
import { ProfileSkeleton } from "@/components/admin/ui/skeleton";
import { PerformanceMonitor } from "@/components/admin/ui/performance-monitor";
import { toast } from "react-toastify";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    userName: "",
  });
  const [myProfile, setMyProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    userName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  // Fetch profile data with better caching
  const {
    data: userprofile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // Fetch profile picture data with better caching

  const { data: profilePicture } = useQuery({
    queryKey: ["profilePicture"],
    queryFn: profileService.getProfilePicture,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });

  // if (profilePicture) {
  //   localStorage.setItem("profilePicture", profilePicture?.url);
  // }

  // localStorage.setItem("userProfile", JSON.stringify(myProfile));


  useEffect(() => {
    if (profilePicture) {
      localStorage.setItem("profilePicture", profilePicture.url);
    }

    localStorage.setItem("userProfile", JSON.stringify(myProfile));
  }, [profilePicture, myProfile]); // runs again when these change






  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<Profile>) => profileService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setErrors({});
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      console.error("Profile update error:", error);
      setErrors({ general: "Failed to update profile. Please try again." });
      toast.error("Failed to update profile. Please try again.");
    },
  });

  // Create profile mutation (for first time setup)
  const createProfileMutation = useMutation({
    mutationFn: (data: Omit<Profile, "id" | "createdAt" | "updatedAt">) =>
      profileService.createProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setErrors({});
      toast.success("Profile created successfully!");
    },
    onError: (error: any) => {
      console.error("Profile creation error:", error);
      setErrors({ general: "Failed to create profile. Please try again." });
      toast.error("Failed to create profile. Please try again.");
    },
  });

  // Called when edit icon is clicked
  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  // Called when a file is chosen
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    let imageUrl = "";

    if (file) {
      toast.info("Uploading");

      const uploaded = await uploadToCloudinary(file, "ProfilePicture");
      imageUrl = uploaded.secure_url;
      if (uploaded) {
        try {
          toast.info("updating Profile");
          const storepic = await profileService.createProfilePicture(imageUrl);
          localStorage.setItem("profilePicture", storepic?.url);

          setImgSrc(storepic.url);
          toast.success("Profile picture updated successfully");

          // console.log("ok last ",storepic?.url)
        } catch (error) {
          toast.error("failed to upload");
        }

        //  const userDocRef = doc(db, "profiles", user.uid);
        // await updateDoc(userDocRef, { profilePhoto: imageUrl });
      }
    }
  };

  // Update form data when profile is loaded
  useEffect(() => {
    if (userprofile) {
      setFormData({
        firstName: userprofile.firstName || "",
        lastName: userprofile.lastName || "",
        email: userprofile.email || "",
        phone: userprofile.phone || "",
        role: userprofile.role || "",
        userName: userprofile.userName || "",
      });

      setMyProfile({
        firstName: userprofile.firstName || "",
        lastName: userprofile.lastName || "",
        email: userprofile.email || "",
        phone: userprofile.phone || "",
        role: userprofile.role || "",
        userName: userprofile.userName || "",
      });
    }
  }, [userprofile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim()
    ) {
      setErrors({ general: "Please fill in all required fields." });
      return;
    }

    const updateData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      role: formData.role.trim() || "Admin",
      userName: formData.userName.trim(),
    };

    if (userprofile) {
      updateProfileMutation.mutate(updateData);
    } else {
      createProfileMutation.mutate(updateData);
    }
  };

  // const Profilepic = localStorage.getItem("profilePicture");
  //  const [imgSrc, setImgSrc] = useState(Profilepic);

   useEffect(() => {
    if (profilePicture && profilePicture.url) {
      localStorage.setItem("profilePicture", profilePicture.url);
      setImgSrc(profilePicture.url);
    }
  }, [profilePicture]);

  useEffect(() => {
    if (myProfile) {
      localStorage.setItem("userProfile", JSON.stringify(myProfile));
    }
  }, [myProfile]);

  // Load saved picture into state on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPic = localStorage.getItem("profilePicture");
      if (savedPic) {
        setImgSrc(savedPic);
      }
    }
  }, []);

 

  // console.log("new Profilepiczz ",Profilepic)
  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <ProfileSkeleton />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load profile. Please refresh the page.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PerformanceMonitor
          queryKey="profile"
          isLoading={isLoading}
          error={error}
        />
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <User className="mr-3 h-8 w-8 text-blue-600" />
              Profile Management <span className="fa fa-spin spinner"></span>
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {userprofile
                ? "Update your personal information and profile details"
                : "Set up your profile information"}
            </p>
          </div>
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 p-1 mb-8">
            <Image
              loading="lazy"
              id="pic"
              src={imgSrc ? imgSrc : ""}
              alt="Profile picture"
              width={144}
              height={144}
              className="rounded-full w-full h-full object-cover"
            />

            {/* Edit button */}
            <button
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 hover:opacity-100 transition"
              onClick={handleEditClick}
            >
              <span className="fa fa-spin spinner"></span> ✎
            </button>
          </div>

          <form className="">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </form>

          {errors.general && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
              <p className="text-red-600 dark:text-red-400">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter your first name"
                  error={errors.firstName}
                  required
                />

                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter your last name"
                  error={errors.lastName}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  error={errors.email}
                  required
                />

                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  error={errors.phone}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Input
                  label="Role"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  placeholder="e.g., Full-Stack Developer, Software Engineer"
                  error={errors.role}
                />
                <Input
                  label="User Name"
                  value={formData.userName}
                  onChange={(e) =>
                    handleInputChange("userName", e.target.value)
                  }
                  placeholder="Enter your UserName"
                  error={errors.userName}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                loading={
                  updateProfileMutation.isPending ||
                  createProfileMutation.isPending
                }
                icon={Save}
              >
                {userprofile ? "Save Changes" : "Create Profile"}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
