
import { useState, useEffect } from "react";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { useBrandTheme } from "@/hooks/use-brand-theme";
import { Student } from "@/components/students/StudentTypes";
import { PageContainer } from "@/components/ui/page-container";
import { DashboardLayout } from "@/components/dashboard/layout/DashboardLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Index = () => {
  const stats = useDashboardStats();
  const currentTime = useCurrentTime();
  const [students, setStudents] = useState<Student[]>([]);
  const { getGradientClass } = useBrandTheme();
  
  const trainerProfile = JSON.parse(localStorage.getItem('trainerProfile') || '{"name":"","image":"/placeholder.svg"}');

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
      <div className={`min-h-screen ${getGradientClass('accent')} bg-opacity-5`}>
        <DashboardLayout>
          <DashboardContent 
            stats={stats}
            currentTime={currentTime}
            students={students}
            trainerProfile={trainerProfile}
          />
        </DashboardLayout>
      </div>
    </PageContainer>
  );
};

export default Index;
