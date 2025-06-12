
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "@/hooks/students";
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

  useEffect(() => {
    const studentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    if (studentLoggedIn && loggedInStudentId) {
      const student = students.find(s => s.id.toString() === loggedInStudentId);
      if (student) {
        setLoggedInStudent(student);
        setIsLoggedIn(true);
        
        // Redirect to dashboard if not already there
        if (!studentId) {
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
        } else if (studentId !== student.id.toString()) {
          navigate(`/Students/dashboard/${student.id}`, { replace: true });
        }
      } else {
        handleLogout();
      }
    } else {
      // Show login form
      setIsLoggedIn(false);
    }
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-200/50 shadow-lg max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-violet-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
            ورود به پنل شاگرد
          </h2>
          <p className="text-center text-slate-600 mb-4">
            لطفاً اطلاعات خود را وارد کنید
          </p>
          <div className="text-center">
            <button
              onClick={() => navigate("/Students")}
              className="text-violet-600 hover:text-violet-700 transition-colors"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    );
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
