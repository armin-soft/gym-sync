
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

  const checkLoginStatus = () => {
    console.log('StudentPanel: Checking authentication state...');
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    console.log('studentLoggedIn:', studentLoggedIn);
    console.log('loggedInStudentId:', loggedInStudentId);
    console.log('students:', students);
    
    if (studentLoggedIn && loggedInStudentId && students.length > 0) {
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
      setLoggedInStudent(null);
    }
    
    setIsLoading(false);
  };

  // بررسی اولیه وضعیت ورود
  useEffect(() => {
    if (students.length > 0) {
      checkLoginStatus();
    } else {
      setIsLoading(false);
    }
  }, [students, studentId, navigate]);

  // Listen to localStorage changes and custom events
  useEffect(() => {
    const handleStorageChange = () => {
      console.log('Storage changed, rechecking login status...');
      checkLoginStatus();
    };

    const handleLoginSuccess = () => {
      console.log('Login success event received, rechecking...');
      // کمی تاخیر برای اطمینان از ذخیره localStorage
      setTimeout(() => {
        checkLoginStatus();
      }, 100);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('studentLoginSuccess', handleLoginSuccess);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('studentLoginSuccess', handleLoginSuccess);
    };
  }, [students]);

  const handleLoginSuccess = (phone: string) => {
    console.log('Login success callback triggered for phone:', phone);
    
    // پیدا کردن شاگرد بر اساس شماره تلفن
    const student = students.find(s => s.phone === phone);
    
    if (student) {
      console.log('Setting up student login state for:', student.name);
      
      // ذخیره در localStorage
      localStorage.setItem("studentLoggedIn", "true");
      localStorage.setItem("loggedInStudentId", student.id.toString());
      
      // به‌روزرسانی state فوری
      setLoggedInStudent(student);
      setIsLoggedIn(true);
      
      console.log('Navigating to dashboard...');
      
      // هدایت فوری بدون تاخیر
      navigate(`/Students/dashboard/${student.id}`, { replace: true });
      
      // ارسال event برای سایر component‌ها
      window.dispatchEvent(new Event('studentLoginSuccess'));
      
      toast({
        title: "ورود موفق به پنل شاگرد",
        description: `${student.name} عزیز، خوش آمدید`,
      });
    } else {
      console.error('Student not found for phone:', phone);
      toast({
        title: "خطا در ورود",
        description: "شماره موبایل یافت نشد",
        variant: "destructive",
      });
    }
  };

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

  console.log('Current state - isLoggedIn:', isLoggedIn, 'loggedInStudent:', loggedInStudent, 'studentId:', studentId);

  // اگر در مسیر داشبورد هستیم و شاگرد وارد شده
  if (studentId && isLoggedIn && loggedInStudent) {
    return <StudentDashboard />;
  }

  // اگر شاگرد وارد شده ولی در مسیر اصلی است، هدایت به داشبورد
  if (isLoggedIn && loggedInStudent && !studentId) {
    navigate(`/Students/dashboard/${loggedInStudent.id}`, { replace: true });
    return null;
  }

  // در غیر این صورت نمایش فرم ورود
  return <StudentLogin onLoginSuccess={handleLoginSuccess} />;
};

export default StudentPanel;
