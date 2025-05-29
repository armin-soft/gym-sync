
import React from "react";
import { PageContainer } from "@/components/ui/page-container";
import { LoginForm } from "./LoginFormWrapper";

interface LoginContainerProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const LoginContainer = ({ onLoginSuccess }: LoginContainerProps) => {
  return (
    <PageContainer fullScreen fullHeight withBackground>
      {/* افکت‌های فوق مدرن پس‌زمینه */}
      <AnimatedBackground />

      {/* محتوای اصلی فرم ورود */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="px-4 w-full max-w-md">
          <LoginForm onLoginSuccess={onLoginSuccess} />
        </div>
      </div>
    </PageContainer>
  );
};

// کامپوننت افکت های پس‌زمینه ساده‌شده بدون framer-motion
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* گرادیان پس‌زمینه */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-primary/15 to-violet-600/20"></div>
      
      {/* حباب‌های شناور ساده */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/20 animate-pulse"
          style={{
            width: `${Math.random() * 400 + 100}px`,
            height: `${Math.random() * 400 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(60px)',
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};
