
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { StudentDashboardLayout } from "@/components/student-dashboard/StudentDashboardLayout";
import { StudentDashboardHero } from "@/components/student-dashboard/StudentDashboardHero";
import { StudentStatsGrid } from "@/components/student-dashboard/StudentStatsGrid";
import { StudentActivityCards } from "@/components/student-dashboard/StudentActivityCards";
import { StudentQuickActions } from "@/components/student-dashboard/StudentQuickActions";
import { StudentProgressOverview } from "@/components/student-dashboard/StudentProgressOverview";
import { storageManager } from "@/utils/storageManager";

const StudentDashboard = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const studentLoggedIn = storageManager.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = storageManager.getItem("loggedInStudentId");
    
    console.log('Dashboard: studentLoggedIn:', studentLoggedIn);
    console.log('Dashboard: loggedInStudentId:', loggedInStudentId);
    console.log('Dashboard: studentId from params:', studentId);
    
    if (studentLoggedIn && loggedInStudentId) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      if (student) {
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        if (studentId && studentId !== student.id.toString()) {
          navigate(`/Students/dashboard/${student.id}`);
        }
      } else {
        handleLogout();
      }
    } else {
      navigate("/Students");
    }
  }, [students.length, studentId, navigate]);

  const handleLogout = () => {
    storageManager.removeItem("studentLoggedIn");
    storageManager.removeItem("loggedInStudentId");
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  if (!isLoggedIn || !loggedInStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">در حال هدایت به صفحه ورود...</p>
        </div>
      </div>
    );
  }

  return (
    <StudentDashboardLayout student={loggedInStudent} onLogout={handleLogout}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-violet-950/30 dark:to-indigo-950/50">
        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* Hero Section */}
          <StudentDashboardHero student={loggedInStudent} />
          
          {/* Stats Grid */}
          <StudentStatsGrid student={loggedInStudent} />
          
          {/* Activity & Progress Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            <StudentActivityCards student={loggedInStudent} />
            <StudentProgressOverview student={loggedInStudent} />
          </div>
          
          {/* Quick Actions */}
          <StudentQuickActions student={loggedInStudent} />
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
