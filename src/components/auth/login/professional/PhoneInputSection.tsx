
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowLeft } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";
import { ProfessionalErrorMessage } from "./ProfessionalErrorMessage";

interface PhoneInputSectionProps {
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  variants: any;
  allowedPhone: string;
}

export const PhoneInputSection = ({
  phone,
  setPhone,
  loading,
  error,
  onSubmit,
  variants,
  allowedPhone
}: PhoneInputSectionProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // فقط اعداد انگلیسی مجاز
    const numbersOnly = value.replace(/[^0-9]/g, '');
    
    // محدود کردن به 11 رقم
    if (numbersOnly.length <= 11) {
      setPhone(numbersOnly);
    }
  };

  const isValidPhone = phone === allowedPhone;

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <ProfessionalErrorMessage error={error} />
      
      <motion.div variants={variants} className="space-y-4">
        <Label htmlFor="phone" className="text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2">
          <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          شماره موبایل
        </Label>
        
        <div className="relative">
          <Input
            id="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={toPersianNumbers(phone)}
            onChange={handlePhoneChange}
            placeholder={toPersianNumbers("09123456789")}
            className="h-12 text-center text-lg font-medium"
            dir="ltr"
            required
          />
        </div>
      </motion.div>
      
      <motion.div variants={variants}>
        <Button 
          type="submit" 
          className="w-full h-12 bg-gradient-to-l from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium text-base rounded-lg"
          disabled={loading || !isValidPhone}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>در حال ارسال...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>دریافت کد تأیید</span>
              <ArrowLeft className="h-4 w-4" />
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};
