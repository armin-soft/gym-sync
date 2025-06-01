
import React from "react";
import { motion } from "framer-motion";
import { MobileLoginForm } from "./MobileLoginForm";
import { ModernLoginBackground } from "./ModernLoginBackground";
import { AccountLockedView } from "./AccountLockedView";

interface LoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  // Check if account is locked
  const lockExpiry = localStorage.getItem("loginLockExpiry");
  const isLocked = lockExpiry && new Date(lockExpiry) > new Date();
  const [timeLeft, setTimeLeft] = React.useState("");

  if (isLocked) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <ModernLoginBackground />
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 25
            }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl">
              {/* Glass morphism container */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-orange-500/5 to-yellow-500/10 rounded-3xl"></div>
              
              <AccountLockedView 
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                lockExpiry={new Date(lockExpiry)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <ModernLoginBackground />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
          className="w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl">
            {/* Glass morphism container */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-3xl"></div>
            
            <div className="relative z-10 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center mb-8"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  
                  {/* Animated ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-violet-400/50 rounded-2xl"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-l from-white via-purple-100 to-white bg-clip-text text-transparent">
                  ورود به پنل مدیریت
                </h1>
                <p className="text-white/70 text-lg">
                  لطفاً شماره موبایل خود را وارد کنید
                </p>
                
                {/* Decorative line */}
                <motion.div
                  className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: 128 }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </motion.div>

              <MobileLoginForm onLoginSuccess={onLoginSuccess} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
