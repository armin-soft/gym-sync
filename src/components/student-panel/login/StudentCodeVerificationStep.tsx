
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowRight, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentCodeVerificationStepProps {
  variants: any;
  code: string;
  setCode: (code: string) => void;
  phone: string;
  countdown: number;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChangePhone: () => void;
  onResendCode: () => void;
}

export const StudentCodeVerificationStep = ({
  variants,
  code,
  setCode,
  phone,
  countdown,
  loading,
  error,
  onSubmit,
  onChangePhone,
  onResendCode
}: StudentCodeVerificationStepProps) => {
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${toPersianNumbers(mins.toString().padStart(2, '0'))}:${toPersianNumbers(secs.toString().padStart(2, '0'))}`;
  };

  return (
    <motion.div variants={variants} className="relative mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-3xl blur-xl opacity-20"></div>
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <form onSubmit={onSubmit} className="space-y-6" dir="rtl">
          {/* Phone Display */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              کد تأیید برای شماره
            </p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400" dir="ltr">
              {phone}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              ارسال شد
            </p>
          </div>

          {/* Code Input */}
          <motion.div variants={variants} className="space-y-2">
            <Label htmlFor="code" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              کد تأیید ({toPersianNumbers("6")} رقم)
            </Label>
            <div className="relative">
              <Input
                id="code"
                type="tel"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={toPersianNumbers("987654")}
                className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-center text-lg font-mono tracking-widest backdrop-blur-sm"
                dir="ltr"
                maxLength={6}
                required
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2 text-right"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={variants} className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
              disabled={loading || code.length !== 6}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  در حال ورود...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  ورود به پنل شاگرد
                </div>
              )}
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onChangePhone}
                className="flex-1 h-10 bg-white/20 border-white/30 hover:bg-white/30 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                <ArrowRight className="h-4 w-4 ml-1" />
                تغییر شماره
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onResendCode}
                disabled={countdown > 0}
                className="flex-1 h-10 bg-white/20 border-white/30 hover:bg-white/30 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50"
              >
                <RefreshCw className="h-4 w-4 ml-1" />
                {countdown > 0 ? formatCountdown(countdown) : "ارسال مجدد"}
              </Button>
            </div>
          </motion.div>
        </form>

        {/* Footer */}
        <motion.div variants={variants} className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            کد تأیید پیش‌فرض: {toPersianNumbers("987654")}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
