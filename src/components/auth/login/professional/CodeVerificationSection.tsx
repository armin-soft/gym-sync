
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, LogIn, RefreshCw, Edit3, Clock } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ProfessionalErrorMessage } from "./ProfessionalErrorMessage";

interface CodeVerificationSectionProps {
  code: string;
  setCode: (code: string) => void;
  phone: string;
  countdown: number;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
  variants: any;
}

export const CodeVerificationSection = ({
  code,
  setCode,
  phone,
  countdown,
  loading,
  error,
  onSubmit,
  onChangePhone,
  onResendCode,
  variants
}: CodeVerificationSectionProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <ProfessionalErrorMessage error={error} />
      
      <motion.div variants={variants} className="space-y-6">
        <Label htmlFor="code" className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-3 text-base">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-sky-500/20">
            <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          کد تأیید
        </Label>
        
        {/* ورودی کد OTP */}
        <div className="flex justify-center mb-6" dir="ltr">
          <div className="relative group">
            {/* تأثیر درخشش پس‌زمینه */}
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
            
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              dir="ltr"
            >
              <InputOTPGroup className="gap-3" dir="ltr">
                {[...Array(6)].map((_, index) => {
                  const currentChar = code[index] || '';
                  const displayChar = currentChar ? toPersianNumbers(currentChar) : '';
                  
                  return (
                    <InputOTPSlot 
                      key={index}
                      index={index}
                      className="w-14 h-14 text-xl font-bold bg-white/40 dark:bg-slate-800/40 border-2 border-sky-200/50 dark:border-sky-700/50 text-slate-800 dark:text-white focus:border-sky-500 focus:ring-sky-500/30 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-sky-400 flex items-center justify-center"
                    >
                      {displayChar}
                    </InputOTPSlot>
                  );
                })}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        {/* نمایش شماره و شمارش معکوس */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-slate-700 dark:text-slate-200 text-base font-semibold">
              کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
            </p>
          </motion.div>
          
          {countdown > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </motion.div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                ارسال مجدد کد تا {toPersianNumbers(Math.floor(countdown / 60))}:{toPersianNumbers((countdown % 60).toString().padStart(2, '0'))} دیگر
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={variants} className="space-y-4">
        {/* دکمه ورود اصلی */}
        <Button 
          type="submit" 
          className="w-full h-16 bg-gradient-to-l from-sky-600 via-emerald-600 to-sky-700 hover:from-sky-700 hover:via-emerald-700 hover:to-sky-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>در حال تأیید و ورود...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span>ورود به سیستم</span>
              <LogIn className="h-5 w-5" />
            </div>
          )}
        </Button>
        
        {/* دکمه‌های عملیات */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            type="button" 
            variant="ghost"
            onClick={onChangePhone}
            className="h-12 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/40 border border-slate-300/50 dark:border-slate-600/50 rounded-xl backdrop-blur-sm transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              <span className="text-sm font-semibold">تغییر شماره</span>
            </div>
          </Button>
          
          {countdown === 0 ? (
            <Button 
              type="button" 
              variant="ghost"
              onClick={onResendCode}
              className="h-12 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-slate-800/40 border border-slate-300/50 dark:border-slate-600/50 rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm font-semibold">ارسال مجدد</span>
              </div>
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="ghost"
              disabled
              className="h-12 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200/50 dark:border-slate-700/50 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">ارسال مجدد</span>
              </div>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.form>
  );
};
