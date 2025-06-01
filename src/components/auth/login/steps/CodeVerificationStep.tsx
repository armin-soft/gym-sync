
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, LogIn, RefreshCw, Edit3 } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { CountdownTimer } from "../components/CountdownTimer";

interface CodeVerificationStepProps {
  code: string;
  setCode: (code: string) => void;
  phone: string;
  countdown: number;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
  containerVariants: any;
  itemVariants: any;
}

export const CodeVerificationStep = ({
  code,
  setCode,
  phone,
  countdown,
  loading,
  onSubmit,
  onChangePhone,
  onResendCode,
  containerVariants,
  itemVariants
}: CodeVerificationStepProps) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="code" className="text-white/90 font-semibold flex items-center gap-3 mb-6 text-base">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Shield className="h-5 w-5" />
          </div>
          کد تأیید
        </Label>
        
        {/* OTP Input with enhanced styling */}
        <div className="flex justify-center mb-6" dir="ltr">
          <div className="relative group">
            {/* Background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
            
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              dir="ltr"
            >
              <InputOTPGroup className="gap-3" dir="ltr">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot 
                    key={index}
                    index={index}
                    className="w-14 h-14 text-xl font-bold bg-white/10 border-2 border-white/20 text-white focus:border-violet-400 focus:ring-violet-400/30 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/40"
                    style={{ direction: 'ltr', textAlign: 'center' }}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        {/* Phone display and countdown */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-white/80 text-base font-medium">
              کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
            </p>
          </motion.div>
          
          <CountdownTimer countdown={countdown} />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4">
        {/* Main submit button */}
        <Button 
          type="submit" 
          className="w-full h-14 bg-gradient-to-l from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold text-lg rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || code.length !== 6}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              در حال تأیید...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span>ورود به پنل</span>
              <LogIn className="h-5 w-5" />
            </div>
          )}
        </Button>
        
        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            type="button" 
            variant="ghost"
            onClick={onChangePhone}
            className="h-12 text-white/80 hover:text-white hover:bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              <span className="text-sm">تغییر شماره</span>
            </div>
          </Button>
          
          {countdown === 0 ? (
            <Button 
              type="button" 
              variant="ghost"
              onClick={onResendCode}
              className="h-12 text-white/80 hover:text-white hover:bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">ارسال مجدد</span>
              </div>
            </Button>
          ) : (
            <Button 
              type="button" 
              variant="ghost"
              disabled
              className="h-12 text-white/40 cursor-not-allowed border border-white/10 rounded-xl backdrop-blur-sm"
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
