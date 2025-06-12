
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from "@/components/ui/page-container";
import { StudentLoginBackground } from "./login/StudentLoginBackground";
import { StudentLoginHeader } from "./login/StudentLoginHeader";
import { StudentLoginStats } from "./login/StudentLoginStats";
import { StudentLoginFormStep } from "./login/StudentLoginFormStep";
import { StudentCodeVerificationStep } from "./login/StudentCodeVerificationStep";
import { useStudentLogin } from "./login/hooks/useStudentLogin";

export const StudentLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLoginSuccess = async (phone: string) => {
    try {
      // Find student by phone
      const student = students.find(s => s.phone === phone);
      
      if (student) {
        // Store student login info
        localStorage.setItem("studentLoggedIn", "true");
        localStorage.setItem("loggedInStudentId", student.id.toString());
        
        toast({
          title: "ورود موفق به پنل شاگرد",
          description: `${student.name} عزیز، خوش آمدید`,
        });
        
        // Navigate to student dashboard
        navigate(`/Students/dashboard/${student.id}`);
      } else {
        toast({
          title: "خطا در ورود به پنل شاگرد",
          description: "شماره موبایل یافت نشد",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Student login error:", error);
      toast({
        title: "خطا",
        description: "مشکلی در ورود به پنل شاگرد پیش آمده است",
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
    handleResendCode,
    students
  } = useStudentLogin({ onLoginSuccess: handleLoginSuccess });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  if (locked) {
    return (
      <PageContainer fullScreen fullHeight withBackground>
        <StudentLoginBackground />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md"
          >
            <motion.div variants={itemVariants} className="relative">
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
      </PageContainer>
    );
  }

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <StudentLoginBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md"
        >
          <StudentLoginHeader variants={itemVariants} />
          
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
                  variants={itemVariants} 
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
                  variants={itemVariants}
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
          
          <StudentLoginStats variants={itemVariants} />
        </motion.div>
      </div>
    </PageContainer>
  );
};
