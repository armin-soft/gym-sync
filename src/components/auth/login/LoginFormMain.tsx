
import React from "react";
import { motion } from "framer-motion";
import { AccountLockedView } from "./AccountLockedView";
import { LoginFormView } from "./LoginFormView";
import { useLoginForm } from "./hooks/useLoginForm";
import { AnimatedBackground } from "./AnimatedBackground";

interface LoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    locked,
    lockExpiry,
    timeLeft,
    setTimeLeft,
    gymName,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    handleLogin
  } = useLoginForm({ onLoginSuccess });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="w-full max-w-md"
    >
      <div className="relative overflow-hidden border-none bg-white/90 backdrop-blur-xl shadow-2xl rounded-lg">
        {/* گرادیان پس‌زمینه */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-primary/5 to-violet-500/10 z-0 rounded-lg"></div>
        
        {locked ? (
          <AccountLockedView 
            timeLeft={timeLeft} 
            setTimeLeft={setTimeLeft} 
            lockExpiry={lockExpiry} 
          />
        ) : (
          <LoginFormView 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            loading={loading}
            error={error}
            handleLogin={handleLogin}
            gymName={gymName}
          />
        )}

        <div className="relative z-10 pt-0 pb-6 flex items-center p-6">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-xs text-center text-muted-foreground w-full"
          >
            برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
          </motion.p>
        </div>

        <AnimatedBackground />
      </div>
    </motion.div>
  );
};
