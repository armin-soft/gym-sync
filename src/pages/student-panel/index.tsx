
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

  // تابع بررسی وضعیت ورود بدون dependency های مشکل‌ساز
  const checkLoginStatus = useCallback(() => {
    console.log('StudentPanel: Checking authentication state...');
    
    const studentLoggedIn = storageManager.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = storageManager.getItem("loggedInStudentId");
    
    console.log('StudentPanel: studentLoggedIn:', studentLoggedIn);
    console.log('StudentPanel: loggedInStudentId:', loggedInStudentId);
    console.log('StudentPanel: students length:', students.length);
    
    if (studentLoggedIn && loggedInStudentId && students.length > 0) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      console.log('StudentPanel: Found student:', student);
      
      if (student) {
        console.log('StudentPanel: Setting student login state...');
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        if (!studentId || studentId !== student.id.toString()) {
          console.log('StudentPanel: Redirecting to dashboard for student:', student.id);
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
        }
      } else {
        console.log('StudentPanel: Student not found, logging out...');
        handleLogout();
      }
    } else {
      console.log('StudentPanel: Not logged in or no students available');
      setIsLoggedIn(false);
      setLoggedInStudent(null);
    }
  }, [students, studentId, navigate, handleLogout]);

  // useEffect ساده‌تر برای جلوگیری از infinite loop
  useEffect(() => {
    if (students.length > 0) {
      console.log('StudentPanel: Students loaded, checking login status');
      checkLoginStatus();
    }
  }, [students.length]); // فقط وقتی تعداد شاگردان تغییر کند

  const handleLoginSuccess = useCallback((phone: string) => {
    console.log('StudentPanel: Login success callback triggered for phone:', phone);
    
    const student = students.find(s => s.phone === phone);
    
    if (student) {
      console.log('StudentPanel: Setting up student login state for:', student.name);
      
      setLoggedInStudent(student);
      setIsLoggedIn(true);
      
      console.log('StudentPanel: Navigating to dashboard...');
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
