
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, LogIn } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentLoginFormStepProps {
  variants: any;
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export const StudentLoginFormStep = ({
  variants,
  phone,
  setPhone,
  loading,
  error,
  onSubmit
}: StudentLoginFormStepProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // تبدیل اعداد فارسی به انگلیسی
    const convertedValue = value.replace(/[۰-۹]/g, (d) => {
      return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString();
    });
    
    // فقط اعداد انگلیسی مجاز
    const numbersOnly = convertedValue.replace(/[^0-9]/g, '');
    
    // محدود کردن به 11 رقم
    if (numbersOnly.length <= 11) {
      setPhone(numbersOnly);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" dir="rtl">
      <motion.div variants={variants} className="space-y-2">
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
            inputMode="numeric"
            value={toPersianNumbers(phone)}
            onChange={handlePhoneChange}
            placeholder={toPersianNumbers("09123456789")}
            className="h-12 bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl pr-4 text-right backdrop-blur-sm"
            dir="rtl"
            required
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
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
      
      <motion.div variants={variants} className="pt-4">
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
  );
};
