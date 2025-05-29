
import React from "react";
import { AccountLockedView } from "./AccountLockedView";
import { LoginFormView } from "./LoginFormView";
import { useLoginForm } from "./hooks/useLoginForm";

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
    <div className="w-full max-w-md opacity-0 scale-95 animate-[fade-in_0.5s_ease-out_forwards,scale-in_0.5s_ease-out_forwards]">
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
          <p className="text-xs text-center text-muted-foreground w-full opacity-0 translate-y-2 animate-[fade-in_0.5s_ease-out_0.7s_forwards]">
            برای ورود از اطلاعات ثبت شده در بخش پروفایل مربی استفاده کنید
          </p>
        </div>
      </div>
    </div>
  );
};
