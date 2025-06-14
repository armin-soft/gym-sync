
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useStudents } from "@/hooks/useStudents";
import { StudentLoginBackground } from "./login/StudentLoginBackground";
import { StudentLoginHeader } from "./login/StudentLoginHeader";
import { StudentLoginStats } from "./login/StudentLoginStats";
import { StudentLoginFormStep } from "./login/StudentLoginFormStep";
import { StudentCodeVerificationStep } from "./login/StudentCodeVerificationStep";
import { useStudentLogin } from "./login/hooks/useStudentLogin";
import { ANIMATION_VARIANTS } from "@/components/auth/login/constants";
import { storageManager } from "@/utils/storageManager";

interface StudentLoginProps {
  onLoginSuccess?: (phone: string) => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { students } = useStudents();

  const handleLoginSuccess = (phone: string) => {
    console.log('StudentLogin: Login success callback triggered for phone:', phone);
    
    // پیدا کردن شاگرد بر اساس شماره تلفن
    const student = students.find(s => s.phone === phone);
    
    if (student) {
      console.log('StudentLogin: Found student:', student);
      
      // ذخیره مجدد برای اطمینان
      storageManager.setItem("studentLoggedIn", "true");
      storageManager.setItem("loggedInStudentId", student.id.toString());
      
      console.log('StudentLogin: Storage confirmed - checking...');
      console.log('StudentLogin: studentLoggedIn:', storageManager.getItem("studentLoggedIn"));
      console.log('StudentLogin: loggedInStudentId:', storageManager.getItem("loggedInStudentId"));
      
      // نمایش پیام موفقیت
      toast({
        title: "ورود موفق به پنل شاگرد",
        description: `${student.name} عزیز، خوش آمدید`,
      });
      
      // فراخوانی callback والد
      if (onLoginSuccess) {
        console.log('StudentLogin: Calling parent callback');
        onLoginSuccess(phone);
      } else {
        // fallback navigation اگر callback موجود نباشد
        console.log('StudentLogin: No callback, navigating directly');
        navigate(`/Students/dashboard/${student.id}`, { replace: true });
      }
      
    } else {
      console.error('StudentLogin: Student not found for phone:', phone);
      toast({
        title: "خطا در ورود به پنل شاگرد",
        description: "شماره موبایل یافت نشد",
        variant: "destructive",
      });
    }
  };

  const {
    step,
    phone,
    code,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    countdown,
    setPhone,
    setCode,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode
  } = useStudentLogin({ onLoginSuccess: handleLoginSuccess });

  // اضافه کردن console log برای debugging
  console.log('StudentLogin: Current state - students count:', students.length);

  if (locked) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/20 to-purple-50/30 dark:from-slate-900 dark:via-violet-950/20 dark:to-purple-950/30">
        <StudentLoginBackground />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.container}
            className="w-full max-w-md"
          >
            <motion.div variants={ANIMATION_VARIANTS.item} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
                <h2 className="text-xl font-bold text-red-600 mb-4">حساب قفل شده</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  حساب کاربری شما به دلیل تلاش‌های ناموفق زیاد قفل شده است.
                </p>
                {timeLeft && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    زمان باقی‌مانده: {timeLeft}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/20 to-purple-50/30 dark:from-slate-900 dark:via-violet-950/20 dark:to-purple-950/30">
      <StudentLoginBackground />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.container}
          className="w-full max-w-md"
        >
          <motion.div 
            variants={ANIMATION_VARIANTS.item}
            className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl shadow-2xl p-8 sm:p-10"
          >
            <StudentLoginHeader variants={ANIMATION_VARIANTS.item} />
            
            <div className="mt-8" dir="rtl">
              <AnimatePresence mode="wait">
                {step === "phone" ? (
                  <motion.div
                    key="phone"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <StudentLoginFormStep 
                      variants={ANIMATION_VARIANTS.item} 
                      phone={phone}
                      setPhone={setPhone}
                      loading={loading}
                      error={error}
                      onSubmit={handlePhoneSubmit}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <StudentCodeVerificationStep
                      variants={ANIMATION_VARIANTS.item}
                      code={code}
                      setCode={setCode}
                      phone={phone}
                      countdown={countdown}
                      loading={loading}
                      error={error}
                      onSubmit={handleCodeSubmit}
                      onChangePhone={handleChangePhone}
                      onResendCode={handleResendCode}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <StudentLoginStats variants={ANIMATION_VARIANTS.item} />
        </motion.div>
      </div>
    </div>
  );
};
