
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, LogIn, ArrowLeft, RefreshCw } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { useStudentLogin } from "./hooks/useStudentLogin";

interface StudentLoginFormProps {
  onLoginSuccess: (phone: string) => void;
}

export const StudentLoginForm = ({ onLoginSuccess }: StudentLoginFormProps) => {
  const {
    step,
    phone,
    code,
    loading,
    error,
    countdown,
    setPhone,
    setCode,
    handlePhoneSubmit,
    handleCodeSubmit,
    handleChangePhone,
    handleResendCode
  } = useStudentLogin({ onLoginSuccess });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-sky-600 rounded-3xl blur-xl opacity-20"></div>
      <div className="relative backdrop-blur-xl bg-white/10 dark:bg-slate-900/20 border border-white/20 dark:border-slate-700/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
        
        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6" dir="rtl">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                ورود شاگرد
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                شماره موبایل خود را وارد کنید
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                شماره موبایل
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={toPersianNumbers("09123456789")}
                  className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl pr-4 text-right backdrop-blur-sm"
                  dir="ltr"
                  required
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
            
            {error && (
              <motion.div 
                variants={itemVariants}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
              >
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}
            
            <motion.div variants={itemVariants} className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ارسال کد تأیید...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    ورود به پنل شاگرد
                  </div>
                )}
              </Button>
            </motion.div>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-6" dir="rtl">
            <motion.div variants={itemVariants} className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                تأیید کد
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                کد ارسال شده به {toPersianNumbers(phone)} را وارد کنید
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="code" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                کد تأیید
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="کد ۶ رقمی"
                className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-center backdrop-blur-sm text-lg tracking-widest"
                maxLength={6}
                required
              />
            </motion.div>

            {error && (
              <motion.div 
                variants={itemVariants}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
              >
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="space-y-3">
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
                  onClick={handleChangePhone}
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600"
                >
                  <ArrowLeft className="h-4 w-4 ml-1" />
                  تغییر شماره
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleResendCode}
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
        )}

        <motion.div variants={itemVariants} className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            شماره موبایل خود را که توسط مربی ثبت شده، وارد کنید
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
