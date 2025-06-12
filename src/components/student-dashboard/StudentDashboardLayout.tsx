
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, Bell, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppIcon } from "@/components/ui/app-icon";
import { StudentDashboardSidebar } from "./StudentDashboardSidebar";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Student } from "@/components/students/StudentTypes";

interface StudentDashboardLayoutProps {
  children: React.ReactNode;
  student: Student;
  onLogout: () => void;
}

export const StudentDashboardLayout: React.FC<StudentDashboardLayoutProps> = ({
  children,
  student,
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const deviceInfo = useDeviceInfo();

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen]);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-violet-950/30 dark:to-indigo-950/50" dir="rtl">
      {/* Sidebar */}
      <StudentDashboardSidebar 
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        student={student}
        onLogout={onLogout}
      />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-violet-200/50 dark:border-violet-800/50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Right side */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSidebarToggle}
                className="p-2 hover:bg-violet-100 dark:hover:bg-violet-900/20 rounded-xl"
              >
                <Menu className="h-6 w-6 text-violet-700 dark:text-violet-300" />
              </Button>
              
              <div className="flex items-center gap-3">
                <AppIcon size="sm" animated />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                    پنل شخصی شاگرد
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    داشبورد پیشرفته مدیریت برنامه
                  </p>
                </div>
              </div>
            </div>

            {/* Left side */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <p className="text-sm text-slate-600 dark:text-slate-400">خوش آمدید</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{student.name}</p>
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-violet-200 dark:ring-violet-800">
                    <img 
                      src={student.image || "/Assets/Image/Place-Holder.svg"} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};
