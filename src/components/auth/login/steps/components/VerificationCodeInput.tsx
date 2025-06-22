
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, Smartphone, Monitor } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VerificationCodeInputProps {
  code: string;
  setCode: (code: string) => void;
  isSMSEnabled: boolean;
  itemVariants: any;
}

export const VerificationCodeInput = ({
  code,
  setCode,
  isSMSEnabled,
  itemVariants
}: VerificationCodeInputProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div variants={itemVariants} className="space-y-6">
      <Label htmlFor="code" className="text-slate-700 dark:text-slate-200 font-bold flex items-center gap-3 text-base">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
          <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        {isSMSEnabled ? 
          "کد تأیید (خودکار از پیامک خوانده می‌شود)" : 
          "کد تأیید را وارد کنید"
        }
      </Label>
      
      <div className="flex justify-center mb-6">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
          
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
            dir="ltr"
          >
            <InputOTPGroup className="gap-3">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot 
                  key={index}
                  index={index}
                  className="w-14 h-14 text-xl font-bold bg-white/40 dark:bg-slate-800/40 border-2 border-purple-200/50 dark:border-purple-700/50 text-slate-800 dark:text-white focus:border-purple-500 focus:ring-purple-500/30 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:border-purple-400 flex items-center justify-center"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </motion.div>
  );
};
