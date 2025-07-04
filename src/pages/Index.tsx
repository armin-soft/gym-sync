
import { useState, useEffect } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardLayoutNew } from "@/components/dashboard/layout/DashboardLayout-New";
import { DashboardContentNew } from "@/components/dashboard/DashboardContent-New";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"مربی حرفه‌ای","image":""}');

  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        const parsedStudents = JSON.parse(savedStudents);
        if (Array.isArray(parsedStudents)) {
          setStudents(parsedStudents);
        } else {
          console.error('Parsed students is not an array:', parsedStudents);
          setStudents([]);
        }
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  }, []);

  return (
    <PageContainer fullWidth noPadding>
      <DashboardLayoutNew>
        <DashboardContentNew 
          stats={stats}
          currentTime={currentTime}
          students={students}
          trainerProfile={trainerProfile}
        />
      </DashboardLayoutNew>
    </PageContainer>
  );
};

export default Index;
