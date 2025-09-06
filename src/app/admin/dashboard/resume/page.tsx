"use client";

import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/admin/ui/form-components";
import { Code, Plus, FileArchive, Link2 } from "lucide-react";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";
import ProtectedRoute from "@/components/admin/auth/protected-route";
import { SkillsSkeleton } from "@/components/admin/ui/skeleton";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useGetResume } from "@/hooks/useOwnerProfile";
import { myResumes } from "@/lib/firebase-services";
import Link from "next/link";

export default function ResumePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [UploadedResume, setUploadedResume] = useState<string | null>(null);

//   const [imgPdf, setPdfSrc] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fetchedResume, setfetchedResume] = useState({
    fileName:"",
    fileUrl:''
  });


  // Fetch skills data with better caching
  const { data: resume, isLoading, error } = useGetResume();
console.log("resume name ", resume?.fileName)


    useEffect(() => {
      if (typeof window !== "undefined") {
      if (resume) {
      localStorage.setItem("fetchResumePicture", JSON.stringify(resume));

            setfetchedResume({
              fileName:resume.fileName,
            fileUrl:resume.resume});
       
      }
    }
  
    }, [resume]); // runs again when these change
  




  
  const downloadResume = () => {
    // Replace with actual resume download link
    const link = document.createElement("a");
    link.href = `${resume?.resume}`;
    link.download = "resume.pdf";
    link.click();
  };
  // Called when a file is chosen
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const pdfFile = event.target.files?.[0];
      let pdfUrl = "";

      if (pdfFile) {
        const uploaded = await uploadToCloudinary(pdfFile, "resume");
        pdfUrl = uploaded.secure_url;
        const pdfName = uploaded.original_filename;
        // if(uploaded.)
        if (uploaded) {
          try {
            toast.info("updating Resume");
            const storedResume = await myResumes.updateResume(pdfUrl, pdfName);
      if (typeof window !== "undefined") {

            localStorage.setItem("fetchResumePicture", JSON.stringify(storedResume));
      }
            // console.log("storedResume",storedResume)
            setfetchedResume({
              fileName:storedResume.fileName,
              fileUrl:storedResume.resume
            });
            // setUploadedResume(storepic.fileName)
            toast.success("Resume updated successfully");

            // console.log("ok last ",storepic?.url)
          } catch (error) {
            console.log(error);

            toast.error("failed to upload");
          }
        }
      }
    } catch (error) {
      toast.error("failed to upload");
    }
  };

    useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResume = localStorage.getItem("fetchResumePicture");
      const myResume = storedResume ? JSON.parse(storedResume) : null;
    //   console.log("resume", myResume);
      setfetchedResume(myResume);
    }
  }, []);



  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <SkillsSkeleton />
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
          <p className="text-red-600 dark:text-red-400">
            Failed to load skills. Please refresh the page.
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
                  <FileArchive className="mr-3 h-8 w-8 text-blue-600" />
                  Resume Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Manage your Resume
                </p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                icon={Plus}
                className="ml-4"
              >
                Update Resume
              </Button>
            </div>
          </div>

          {/* Skill Form */}
          {showForm && (
            <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                  <p className="text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className=""
                    onChange={handleFileChange}
                  />
                </div>
              </form>
            </div>
          )}

          {/* Skills List */}
          <div className="space-y-8">
            {!resume?.id ? (
              <div className="text-center py-12">
                <Code className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No Resume added yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  start by uploading your resume.
                </p>
                <div className="mt-6">
                  <Button onClick={() => setShowForm(true)} icon={Plus}>
                    Add Resume
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    
                       <Link
                      href={fetchedResume.fileUrl?fetchedResume?.fileUrl:''}
                      target="_blank"
                      className="flex gap-2 overflow-hidden w-40"
                    >
                      <Link2 className="text-blue-700" />
                      {fetchedResume.fileName?fetchedResume?.fileName:""}
                    </Link>
                  
                   
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
