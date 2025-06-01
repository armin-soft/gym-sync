
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, LogIn } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { CountdownTimer } from "../components/CountdownTimer";
import { ResendCodeButtons } from "../components/ResendCodeButtons";

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
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="code" className="text-white/90 font-medium flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="h-4 w-4" />
          </div>
          کد تأیید
        </Label>
        
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
        
        <div className="text-center space-y-2">
          <p className="text-white/60 text-sm">
            کد تأیید به شماره {toPersianNumbers(phone)} ارسال شد
          </p>
          
          <CountdownTimer countdown={countdown} />
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
        
        <ResendCodeButtons
          countdown={countdown}
          onChangePhone={onChangePhone}
          onResendCode={onResendCode}
        />
      </motion.div>
    </motion.form>
  );
};
