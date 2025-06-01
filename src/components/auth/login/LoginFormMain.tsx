
import React from "react";
import { motion } from "framer-motion";
import { MobileLoginForm } from "./MobileLoginForm";
import { ModernLoginBackground } from "./ModernLoginBackground";

interface LoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
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
            <div className="relative z-10 p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold text-white mb-2">ورود به پنل مدیریت</h1>
                <p className="text-white/70">لطفاً شماره موبایل خود را وارد کنید</p>
              </motion.div>

              <MobileLoginForm onLoginSuccess={onLoginSuccess} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
