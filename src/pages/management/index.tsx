
import React, { useState, useEffect } from "react";
import { DashboardContentNew } from "@/components/dashboard/DashboardContent-New";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";

const ManagementPage = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی حرفه‌ای",
    image: ""
  });

  // بارگذاری اطلاعات شاگردان
  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(Array.isArray(parsedStudents) ? parsedStudents : []);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  }, []);

  // بارگذاری پروفایل مربی
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی حرفه‌ای",
          image: profile.image || ""
        });
      }
    } catch (error) {
      console.error('Error loading trainer profile:', error);
    }
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50/30 to-emerald-50/40" dir="rtl">
      <DashboardContentNew 
        stats={stats}
        currentTime={currentTime}
        students={students}
        trainerProfile={trainerProfile}
      />
    </div>
  );
};

export default ManagementPage;
