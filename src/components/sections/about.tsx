"use client";

import { Button } from "@/components/ui/button";
import {
  useGetBiography,
  useFetchProfilePicture,
  useGetResume,
  useOwnerProfile,
} from "@/hooks/useOwnerProfile";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";

export function About() {
  const { data: profilePicture } = useFetchProfilePicture();
  const { data: ownerprofile, isLoading, error } = useOwnerProfile();

  // Fetch skills data with better caching
  const { data: resume } = useGetResume();
  const { data: bio } = useGetBiography();

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `${resume?.resume}`;
    link.download = `${resume?.fileName}`;
    link.click();
  };

  //   const downloadPDF = (url: string, fileName: string) => {
  //     console.log(url,fileName)
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <section
      id="about"
      className="section-padding bg-white dark:bg-primary-900"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-accent-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                  <Image
                    src="/images/avatar.png"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="rounded-2xl"
                  />
                </div>
                <div className="hidden md:flex absolute -bottom-4 -right-4 w-24 h-24 bg-primary-100 dark:bg-primary-800 rounded-full items-center justify-center shadow-lg">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              {
                ownerprofile&&(
                   <h3 className="text-2xl font-semibold text-primary-900 dark:text-primary-100">
                Hello! I'm {ownerprofile?.firstName+" "+ownerprofile?.firstName}
              </h3>
                )
              }
             

              <div className="space-y-4 text-primary-600 dark:text-primary-300 leading-relaxed">
                <p style={{ whiteSpace: "pre-line" }}>{bio?.biography}</p>
              </div>

              {/* Key Points */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">
                    5+ Years Experience
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">
                    10+ Projects Completed
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">
                    Full-Stack Development
                  </span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-200 font-medium">
                    UI/UX Design
                  </span>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  onClick={downloadResume}
                  // onClick={() => downloadPDF(`${resume?.resume}`, `${resume?.fileName}`)}

                  className="btn-primary"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
                {/* <Button variant="outline" className="btn-secondary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
