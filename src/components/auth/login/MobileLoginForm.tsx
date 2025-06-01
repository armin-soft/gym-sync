
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, Shield, LogIn, ArrowRight } from "lucide-react";
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
      setLoading(false);
    }, 1000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <Label htmlFor="code" className="text-white/90 font-medium flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4" />
          </div>
          کد تأیید
        </Label>
        <div className="relative">
          <Input
            id="code"
            type="text"
            value={toPersianNumbers(code)}
            onChange={(e) => setCode(e.target.value)}
            placeholder={toPersianNumbers("۰۱۲۳۴۵")}
            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-xl pr-4 text-center text-lg tracking-widest"
            dir="ltr"
            maxLength={6}
            required
          />
        </div>
        <p className="text-white/60 text-sm mt-2 text-center">
          کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-3">
        <Button 
          type="submit" 
          className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
          disabled={loading}
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
        
        <Button 
          type="button" 
          variant="ghost"
          onClick={() => setStep("phone")}
          className="w-full text-white/70 hover:text-white hover:bg-white/10"
        >
          تغییر شماره موبایل
        </Button>
      </motion.div>
    </motion.form>
  );
};
