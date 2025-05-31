
import React, { useState, useEffect } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";

const ManagementPage = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const [trainerProfile, setTrainerProfile] = useState({
    name: "مربی",
    image: ""
  });

  // Load students data
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

  // Load trainer profile
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('trainerProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setTrainerProfile({
          name: profile.name || "مربی",
          image: profile.image || ""
        });
      }
    } catch (error) {
      console.error('Error loading trainer profile:', error);
    }
  }, []);

  return (
    <PageContainer fullWidth noPadding>
      <DashboardLayout>
        <DashboardContent 
          stats={stats}
          currentTime={currentTime}
          students={students}
          trainerProfile={trainerProfile}
        />
      </DashboardLayout>
    </PageContainer>
  );
};

export default ManagementPage;
