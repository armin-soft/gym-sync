
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentLoginForm } from "./login/StudentLoginForm";
import { StudentLoginBackground } from "./login/StudentLoginBackground";
import { StudentLoginStats } from "./login/StudentLoginStats";
import { motion } from "framer-motion";

interface StudentLoginProps {
  onLoginSuccess: (phone: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  // بررسی وضعیت ورود شاگرد در لود اولیه
  useEffect(() => {
    const isStudentLoggedIn = localStorage.getItem("studentLoggedIn") === "true";
    const loggedInStudentId = localStorage.getItem("loggedInStudentId");
    
    console.log('StudentLogin: Checking login status on mount');
    console.log('StudentLogin: isStudentLoggedIn:', isStudentLoggedIn);
    console.log('StudentLogin: loggedInStudentId:', loggedInStudentId);
    
    if (isStudentLoggedIn && loggedInStudentId) {
      console.log('StudentLogin: Student already logged in, redirecting to dashboard');
      navigate("/Student");
    }
  }, [navigate]);

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentLogin: Login successful for phone:', phone);
    console.log('StudentLogin: Calling navigate to /Student');
    
    // انتقال فوری به داشبورد شاگرد
    navigate("/Student");
    
    // فراخوانی callback والد
    onLoginSuccess(phone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-emerald-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-sky-950/30 relative overflow-hidden" dir="rtl">
      <StudentLoginBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <StudentLoginForm onLoginSuccess={handleLoginSuccess} />
          </motion.div>

          {/* Left Side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <StudentLoginStats />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
