
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import StudentDashboard from "./dashboard";

const StudentPanel = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('StudentPanel: Checking authentication state...');
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    console.log('studentLoggedIn:', studentLoggedIn);
    console.log('loggedInStudentId:', loggedInStudentId);
    
    if (studentLoggedIn && loggedInStudentId) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      console.log('Found student:', student);
      
      if (student) {
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        // هدایت به داشبورد اگر در مسیر اصلی هستیم
        if (!studentId) {
          console.log('Redirecting to dashboard for student:', student.id);
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
        } else if (studentId !== student.id.toString()) {
          console.log('Student ID mismatch, redirecting...');
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
        }
      } else {
        console.log('Student not found, logging out...');
        handleLogout();
      }
    } else {
      console.log('Not logged in, showing login form');
      setIsLoggedIn(false);
    }
    
    setIsLoading(false);
  }, [students, studentId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("loggedInStudentId");
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <StudentLogin />;
  }

  if (!loggedInStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return <StudentDashboard />;
};

export default StudentPanel;
