
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfessionalLoginBackground } from "./professional/ProfessionalLoginBackground";
import { ProfessionalLoginHeader } from "./professional/ProfessionalLoginHeader";
import { PhoneInputSection } from "./professional/PhoneInputSection";
import { CodeVerificationSection } from "./professional/CodeVerificationSection";
import { AccountLockedSection } from "./professional/AccountLockedSection";
import { useProfessionalLogin } from "./professional/hooks/useProfessionalLogin";

interface LoginFormMainProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormMainProps) => {
  const {
    step,
    phone,
    setPhone,
    code,
    setCode,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    countdown,
    gymName,
    allowedPhone,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode
  } = useProfessionalLogin({ onLoginSuccess });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.6
      }
    }
  };

  if (locked) {
    return (
      <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950/30">
        <ProfessionalLoginBackground variant="locked" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-md"
          >
            <AccountLockedSection 
              timeLeft={timeLeft}
              lockExpiry={lockExpiry}
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950/30">
      <ProfessionalLoginBackground variant="normal" />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-md"
        >
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl shadow-2xl p-8 sm:p-10"
          >
            <ProfessionalLoginHeader gymName={gymName} variants={itemVariants} />
            
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
                    <PhoneInputSection
                      phone={phone}
                      setPhone={setPhone}
                      loading={loading}
                      error={error}
                      onSubmit={handlePhoneSubmit}
                      variants={itemVariants}
                      allowedPhone={allowedPhone}
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
                    <CodeVerificationSection
                      code={code}
                      setCode={setCode}
                      phone={phone}
                      countdown={countdown}
                      loading={loading}
                      error={error}
                      onSubmit={handleCodeSubmit}
                      onChangePhone={handleChangePhone}
                      onResendCode={handleResendCode}
                      variants={itemVariants}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
