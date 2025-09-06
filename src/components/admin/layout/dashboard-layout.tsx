"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import {
  User,
  FileText,
  Briefcase,
  Code,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  Home,
  FileArchive,
} from "lucide-react";
import { useTheme } from "next-themes";

// import router from "next/router";
import { useRouter } from 'next/navigation';
import { profileService } from "@/lib/firebase-services";
import { useQuery } from "@tanstack/react-query";


interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sidebarItems: SidebarItem[] = [
  { name: "Profile", href: "/admin/dashboard", icon: User },
  { name: "About Me", href: "/admin/dashboard/about", icon: FileText },
  { name: "Projects", href: "/admin/dashboard/projects", icon: Briefcase },
  { name: "Skills", href: "/admin/dashboard/skills", icon: Code },
  { name: "Resume", href: "/admin/dashboard/resume", icon: FileArchive },

];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const storedProfile = localStorage.getItem("userProfile");

// Parse string back to object
const myProfile = storedProfile ? JSON.parse(storedProfile) : null;

// Display only firstName
// console.log("this",myProfile?.firstName); // 👉 outputs the firstName





  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
        firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: ''
  })
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  // console.log("context user ",user)

//     const  { data: userprofile, isLoading, error } = useQuery({
//     queryKey: ['profile'],
//     queryFn: profileService.getProfile,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     gcTime: 10 * 60 * 1000, // 10 minutes
//     retry: 2,
//   });

// if (userprofile) {
//   setUserProfile({
//     firstName: userprofile.firstName,
//     lastName: userprofile.lastName,
//     email: userprofile.email,
//     phone: userprofile.phone ?? '',
//     role: userprofile.role,
//   });
// }
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={toggleSidebar}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`pt-[50px] mt-[60px]
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid items-center space-y-2 pt-10 pb-20">
            <div className="flex">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                Admin Panel 
              </span>
            </div>
            <div className="pl-5 max-auto items-center ">
              <div className="flex mx-auto items-center gap-3">
                <span className="bg-green-800 h-2 w-2 rounded-full"></span>
              <h4>{myProfile?.userName}</h4>
              </div>
                <p className="text-[10px] text-center pl-5 text-gray-600">
              {user?.email}
            </p>
              
            </div>
          
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
          
            <X className="h-24 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-6">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
             <div className="flex items-center max-auto">
             
              <button
                onClick={logout}
                className="flex gap-2 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
                Logout

              </button>
            </div>
          </div>
        </nav>

      </div>

      {/* Main content */}

      <div className=" w-full">
        {/* Topbar */}
        <main className="p-6 mt-24">{children}</main>

   

        {/* Page content */}
      </div>
    </div>
  );
}
