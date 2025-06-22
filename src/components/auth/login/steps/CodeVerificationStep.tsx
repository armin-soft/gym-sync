
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Shield, LogIn, RefreshCw, Edit3, Clock, MessageSquare, Smartphone, Monitor } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useSMSCodeReader } from "@/hooks/useSMSCodeReader";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const isMobile = useIsMobile();
  
  // Auto-read SMS codes only on mobile/tablet
  const { cleanup, isSMSEnabled } = useSMSCodeReader({
    onCodeReceived: (receivedCode) => {
      console.log('Auto-filling verification code on mobile/tablet:', receivedCode);
      setCode(receivedCode);
    },
    enabled: code.length === 0 && !loading
  });

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6 && !loading) {
      const timer = setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
        onSubmit(fakeEvent);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [code, loading, onSubmit]);

  // Cleanup SMS listener when component unmounts
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
              <InputOTPGroup className="gap-3" dir="ltr">
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
                <Clock className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </motion.div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
                ارسال مجدد کد تا {toPersianNumbers(Math.floor(countdown / 60))}:{toPersianNumbers((countdown % 60).toString().padStart(2, '0'))} دیگر
              </p>
            </motion.div>
          )}

          {/* SMS Auto-read indicator - only show on mobile/tablet */}
          {isSMSEnabled && code.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Smartphone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                در انتظار دریافت پیامک برای خواندن خودکار کد...
              </p>
            </motion.div>
          )}

          {/* Desktop indicator */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Monitor className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                لطفاً کد تأیید را بصورت دستی وارد کنید
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4">
        <Button 
          type="submit" 
          className="w-full h-16 bg-gradient-to-l from-purple-600 via-violet-600 to-purple-700 hover:from-purple-700 hover:via-violet-700 hover:to-purple-800 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
