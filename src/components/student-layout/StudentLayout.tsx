
import React, { useState, useEffect } from "react";
import { StudentModernSidebar } from "./StudentModernSidebar";
import { StudentHeader } from "./StudentHeader";
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

  useEffect(() => {
    loadProfile();
    loadStats();
    
    const handleStorageChange = () => {
      loadProfile();
      loadStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentDataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentDataUpdated', handleStorageChange);
    };
  }, [loadProfile, loadStats]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-sky-50/20 to-emerald-50/40 dark:from-slate-950 dark:via-emerald-950/20 dark:to-sky-950/30" dir="rtl">
      {/* Student Header */}
      <StudentHeader onSidebarToggle={handleSidebarToggle} />
      
      {/* Student Sidebar */}
      <StudentModernSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        items={studentSidebarItems}
        profile={studentProfile}
        stats={stats}
        onLogout={handleStudentLogout}
      />
      
      {/* Main Content */}
      <main 
        className={cn(
          "transition-all duration-300 ease-in-out pt-16",
          isMobile ? "pr-0" : sidebarOpen ? "pr-80" : "pr-0"
        )}
      >
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
