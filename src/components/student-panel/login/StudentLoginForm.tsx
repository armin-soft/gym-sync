
import React from "react";
import { motion } from "framer-motion";
import { useStudentLogin } from "./hooks/useStudentLogin";
import { StudentLoginHeader } from "./StudentLoginHeader";
import { StudentLoginFormStep } from "./StudentLoginFormStep";
import { StudentCodeVerificationStep } from "./StudentCodeVerificationStep";

interface StudentLoginFormProps {
  onLoginSuccess: (phone: string) => void;
}

export const StudentLoginForm = ({ onLoginSuccess }: StudentLoginFormProps) => {
  const {
    step,
    phone,
    code,
    loading,
    error,
    countdown,
    setPhone,
    setCode,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode
  } = useStudentLogin({ onLoginSuccess });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-3xl blur-xl opacity-20"></div>
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
        
        <StudentLoginHeader 
          step={step} 
          phone={phone} 
          variants={itemVariants} 
        />
        
        {step === "phone" ? (
          <StudentLoginFormStep
            variants={itemVariants}
            phone={phone}
            setPhone={setPhone}
            loading={loading}
            error={error}
            onSubmit={handlePhoneSubmit}
          />
        ) : (
          <StudentCodeVerificationStep
            variants={itemVariants}
            code={code}
            setCode={setCode}
            loading={loading}
            error={error}
            countdown={countdown}
            onSubmit={handleCodeSubmit}
            onChangePhone={handleChangePhone}
            onResendCode={handleResendCode}
          />
        )}

        <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            شماره موبایل خود را که توسط مربی ثبت شده، وارد کنید
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
