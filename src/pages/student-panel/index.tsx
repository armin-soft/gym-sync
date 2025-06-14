
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentLogin } from "@/components/student-panel/StudentLogin";
import { useStudents } from "@/hooks/useStudents";
import { Student } from "@/components/students/StudentTypes";
import { useToast } from "@/hooks/use-toast";
import { storageManager } from "@/utils/storageManager";
import StudentDashboard from "./dashboard";

const StudentPanel = () => {
  const { studentId } = useParams<{ studentId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { students } = useStudents();
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = useCallback(() => {
    storageManager.removeItem("studentLoggedIn");
    storageManager.removeItem("loggedInStudentId");
    setIsLoggedIn(false);
    setLoggedInStudent(null);
    navigate("/Students");
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب کاربری خارج شدید",
    });
  }, [navigate, toast]);

  const checkLoginStatus = useCallback(() => {
    console.log('StudentPanel: Checking authentication state...');
    console.log('StudentPanel: Storage available:', storageManager.isAvailable());
    
    const studentLoggedIn = storageManager.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = storageManager.getItem("loggedInStudentId");
    
    console.log('StudentPanel: studentLoggedIn:', studentLoggedIn);
    console.log('StudentPanel: loggedInStudentId:', loggedInStudentId);
    console.log('StudentPanel: students length:', students.length);
    console.log('StudentPanel: available students:', students);
    
    if (studentLoggedIn && loggedInStudentId && students.length > 0) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      console.log('StudentPanel: Found student:', student);
      
      if (student) {
        console.log('StudentPanel: Setting student login state...');
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        // اگر در مسیر داشبورد نیستیم، هدایت کنیم
        if (!studentId || studentId !== student.id.toString()) {
          console.log('StudentPanel: Redirecting to dashboard for student:', student.id);
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
          return;
        }
      } else {
        console.log('StudentPanel: Student not found, logging out...');
        handleLogout();
        return;
      }
    } else {
      console.log('StudentPanel: Not logged in, showing login form');
      setIsLoggedIn(false);
      setLoggedInStudent(null);
    }
    
    setIsLoading(false);
  }, [students, studentId, navigate, handleLogout]);

  useEffect(() => {
    console.log('StudentPanel: useEffect triggered - students.length:', students.length);
    
    if (students.length > 0) {
      console.log('StudentPanel: Students loaded, checking login status');
      checkLoginStatus();
    } else {
      console.log('StudentPanel: Waiting for students to load...');
      // انتظار کوتاه برای بارگذاری شاگردان
      const timer = setTimeout(() => {
        console.log('StudentPanel: Timeout reached, checking again...');
        if (students.length === 0) {
          console.log('StudentPanel: Still no students, stopping loading');
          setIsLoading(false);
        } else {
          console.log('StudentPanel: Students now available, checking login status');
          checkLoginStatus();
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [checkLoginStatus, students.length]);

  const handleLoginSuccess = useCallback((phone: string) => {
    console.log('StudentPanel: Login success callback triggered for phone:', phone);
    
    // پیدا کردن شاگرد بر اساس شماره تلفن
    const student = students.find(s => s.phone === phone);
    
    if (student) {
      console.log('StudentPanel: Setting up student login state for:', student.name);
      
      // به‌روزرسانی state فوری
      setLoggedInStudent(student);
      setIsLoggedIn(true);
      setIsLoading(false);
      
      console.log('StudentPanel: Navigating to dashboard...');
      
      // هدایت فوری به داشبورد
      navigate(`/Students/dashboard/${student.id}`, { replace: true });
      
      toast({
        title: "ورود موفق به پنل شاگرد",
        description: `${student.name} عزیز، خوش آمدید`,
      });
    } else {
      console.error('StudentPanel: Student not found for phone:', phone);
      toast({
        title: "خطا در ورود",
        description: "شماره موبایل یافت نشد",
        variant: "destructive",
      });
    }
  }, [students, navigate, toast]);

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

  console.log('StudentPanel: Current state - isLoggedIn:', isLoggedIn, 'loggedInStudent:', loggedInStudent, 'studentId:', studentId);

  // اگر در مسیر داشبورد هستیم و شاگرد وارد شده
  if (studentId && isLoggedIn && loggedInStudent && studentId === loggedInStudent.id.toString()) {
    console.log('StudentPanel: Rendering dashboard for student:', loggedInStudent.name);
    return <StudentDashboard />;
  }

  // در غیر این صورت نمایش فرم ورود
  console.log('StudentPanel: Rendering login form');
  return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
};

export default StudentPanel;
