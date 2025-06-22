import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCodeVerificationStepProps {
  variants: any;
  code: string;
  setCode: (code: string) => void;
  loading: boolean;
  error: string;
  countdown: number;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
}

export const StudentCodeVerificationStep = ({
  variants,
  code,
  setCode,
  loading,
  error,
  countdown,
  onSubmit,
  onChangePhone,
  onResendCode
}: StudentCodeVerificationStepProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6" dir="rtl">
      <motion.div variants={variants} className="space-y-2">
        <Label htmlFor="code" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
          کد تأیید
        </Label>
        
        <div className="flex justify-center mb-6" dir="rtl">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
            
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              dir="rtl"
            >
              <InputOTPGroup className="gap-3" dir="rtl">
                {[...Array(6)].map((_, index) => {
                  const currentChar = code[index] || '';
                  const displayChar = currentChar ? toPersianNumbers(currentChar) : '';
                  
                  return (
                    <InputOTPSlot 
                      key={index}
                      index={index}
                      className="w-12 h-12 text-lg font-bold bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl backdrop-blur-sm text-center"
                    >
                      {displayChar}
                    </InputOTPSlot>
                  );
                })}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div 
          variants={variants}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
        >
          <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
        </motion.div>
      )}

      <motion.div variants={variants} className="space-y-3">
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              در حال ورود...
            </div>
          ) : (
            "تأیید و ورود"
          )}
        </Button>

        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onChangePhone}
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            تغییر شماره
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={onResendCode}
            disabled={countdown > 0 || loading}
            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 disabled:opacity-50"
          >
            {countdown > 0 ? (
              `ارسال مجدد ${toPersianNumbers(countdown)}s`
            ) : (
              <>
                <RefreshCw className="h-4 w-4 ml-1" />
                ارسال مجدد کد
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </form>
  );
};
