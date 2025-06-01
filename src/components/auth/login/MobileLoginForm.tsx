
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Phone, Shield, LogIn, ArrowRight, Timer, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ModernErrorMessage } from "./ModernErrorMessage";

interface MobileLoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

export const MobileLoginForm = ({ onLoginSuccess }: MobileLoginFormProps) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!phone.trim()) {
      setError("لطفاً شماره موبایل خود را وارد کنید");
      setLoading(false);
      return;
    }

    // Simulate sending SMS
    setTimeout(() => {
      setStep("code");
      setCountdown(120); // 2 minutes countdown
      setLoading(false);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;
    
    setLoading(true);
    setError("");

    if (code !== "012345") {
      setError("کد وارد شده اشتباه است");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess(false);
      setLoading(false);
    }, 800);
  };

  const handleResendCode = () => {
    setCountdown(120);
    setCode("");
    setError("");
    
    // Start countdown again
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${toPersianNumbers(minutes.toString().padStart(2, '0'))}:${toPersianNumbers(remainingSeconds.toString().padStart(2, '0'))}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  if (step === "phone") {
    return (
      <motion.form
        onSubmit={handlePhoneSubmit}
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ModernErrorMessage error={error} />
        
        <motion.div variants={itemVariants}>
          <Label htmlFor="phone" className="text-white/90 font-medium flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </div>
            شماره موبایل
          </Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              value={toPersianNumbers(phone)}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={toPersianNumbers("۰۹۱۲۳۴۵۶۷۸۹")}
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-xl pr-4"
              dir="ltr"
              required
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            type="submit" 
            className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                در حال ارسال کد...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                دریافت کد تأیید
              </div>
            )}
          </Button>
        </motion.div>
      </motion.form>
    );
  }

  return (
    <motion.form
      onSubmit={handleCodeSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ModernErrorMessage error={error} />
      
      <motion.div variants={itemVariants}>
        <Label htmlFor="code" className="text-white/90 font-medium flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4" />
          </div>
          کد تأیید
        </Label>
        
        {/* Modern OTP Input with RTL direction and Persian digits */}
        <div className="flex justify-center mb-4" dir="rtl">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
            dir="rtl"
          >
            <InputOTPGroup className="gap-2">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot 
                  key={index}
                  index={index}
                  className="w-12 h-12 text-lg font-bold bg-white/10 border-white/20 text-white focus:border-white/40 focus:ring-white/20 rounded-xl backdrop-blur-sm persian-numbers"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {/* Phone number and countdown */}
        <div className="text-center space-y-2">
          <p className="text-white/60 text-sm">
            کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
          </p>
          
          {countdown > 0 && (
            <motion.div 
              className="flex items-center justify-center gap-2 text-white/70 text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Timer className="h-4 w-4" />
              <span>زمان باقی‌مانده: {formatTime(countdown)}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-3">
        <Button 
          type="submit" 
          className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              در حال تأیید...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              ورود به پنل
            </div>
          )}
        </Button>
        
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="ghost"
            onClick={() => setStep("phone")}
            className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
          >
            تغییر شماره
          </Button>
          
          {countdown === 0 ? (
            <Button 
              type="button" 
              variant="ghost"
              onClick={handleResendCode}
              className="flex-1 text-white/70 hover:text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4 ml-1" />
              ارسال مجدد
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="ghost"
              disabled
              className="flex-1 text-white/40 cursor-not-allowed"
            >
              <RefreshCw className="h-4 w-4 ml-1" />
              ارسال مجدد
            </Button>
          )}
        </div>
      </motion.div>
    </motion.form>
  );
};
