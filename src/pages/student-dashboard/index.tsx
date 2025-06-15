
import React, { useState, useEffect } from "react";
import { StudentDashboardContentNew } from "./components/StudentDashboardContent-New";
import { StudentDashboardLayoutNew } from "./components/layout/StudentDashboardLayout-New";
import { useStudentDashboardStats } from "./hooks/useStudentDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";

interface StudentDashboardProps {
  onSidebarToggle?: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSidebarToggle }) => {
  const stats = useStudentDashboardStats();
  const currentTime = useCurrentTime();
  const [studentProfile, setStudentProfile] = useState({
    name: "شاگرد عزیز",
    image: ""
  });

  // بارگذاری پروفایل شاگرد
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('studentAuthData');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setStudentProfile({
          name: profile.name || "شاگرد عزیز",
          image: profile.image || ""
        });
      }
    } catch (error) {
      console.error('Error loading student profile:', error);
    }
  }, []);

  return (
    <div className="min-h-screen w-full" dir="rtl">
      <StudentDashboardLayoutNew>
        <StudentDashboardContentNew 
          stats={stats}
          currentTime={currentTime}
          studentProfile={studentProfile}
        />
      </StudentDashboardLayoutNew>
    </div>
  );
};

export default StudentDashboard;
