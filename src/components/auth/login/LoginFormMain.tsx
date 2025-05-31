
import React from "react";
import { motion } from "framer-motion";
import { AccountLockedView } from "./AccountLockedView";
import { LoginFormView } from "./LoginFormView";
import { useLoginForm } from "./hooks/useLoginForm";
import { ModernLoginBackground } from "./ModernLoginBackground";

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
    <div className="relative min-h-screen w-full overflow-hidden">
      <ModernLoginBackground />
      
      {/* Main Login Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="w-full max-w-md"
        >
          {/* Glassmorphic Login Card */}
          <div className="relative overflow-hidden">
            {/* Card Background with Glassmorphism */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl"></div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
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
            </div>

            {/* Bottom Info */}
            <div className="relative z-10 px-6 pb-6">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-xs text-center text-white/70"
              >
                برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
