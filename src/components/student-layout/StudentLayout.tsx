
import React, { useState, useEffect } from "react";
import { ModernSidebar } from "@/components/modern-sidebar/ModernSidebar";
import { cn } from "@/lib/utils";
import { studentSidebarItems } from "./data/studentSidebarItems";
import { useStudentProfileData } from "./hooks/useStudentProfileData";
import { useStudentStatsData } from "./hooks/useStudentStatsData";
import { handleStudentLogout } from "./utils/studentAuthUtils";

interface StudentLayoutProps {
  children: React.ReactNode;
}

export const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { studentProfile, loadProfile } = useStudentProfileData();
  const { stats, loadStats } = useStudentStatsData();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load data only once on mount - no automatic refresh
  useEffect(() => {
    loadProfile();
    loadStats();
  }, [loadProfile, loadStats]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-sky-50/20 to-emerald-50/40 dark:from-slate-950 dark:via-emerald-950/20 dark:to-sky-950/30" dir="rtl">
      {/* Student Sidebar */}
      <ModernSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        items={studentSidebarItems}
        profile={studentProfile}
        stats={stats}
        onLogout={handleStudentLogout}
      />
      
      {/* Main Content */}
      <main className="w-full min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
