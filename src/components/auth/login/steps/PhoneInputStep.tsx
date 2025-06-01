
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowRight } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface PhoneInputStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  containerVariants: any;
  itemVariants: any;
  allowedPhones?: string[];
}

// Convert Persian numbers to English for processing
const convertPersianToEnglish = (value: string): string => {
  if (!value) return '';
  return value.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
};

export const PhoneInputStep = ({
  phone,
  setPhone,
  loading,
  onSubmit,
  containerVariants,
  itemVariants,
  allowedPhones
}: PhoneInputStepProps) => {
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Convert Persian numbers to English for storage
    const englishValue = convertPersianToEnglish(value);
    
    // Only allow numbers and ensure it starts with 09
    let numbersOnly = englishValue.replace(/[^0-9]/g, '');
    
    // Ensure phone starts with 09
    if (numbersOnly && !numbersOnly.startsWith('09')) {
      numbersOnly = '09' + numbersOnly.slice(2);
    }
    
    // Limit to 11 digits
    if (numbersOnly.length > 11) {
      numbersOnly = numbersOnly.slice(0, 11);
    }
    
    setPhone(numbersOnly);
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="phone" className="text-white/90 font-medium flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Phone className="h-4 w-4" />
          </div>
          شماره موبایل
        </Label>
        <div className="relative">
          <Input
            id="phone"
            type="tel"
            value={toPersianNumbers(phone)}
            onChange={handlePhoneChange}
            placeholder={toPersianNumbers("۰۹۱۲۳۴۵۶۷۸۹")}
            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-xl pr-4"
            dir="rtl"
            required
          />
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          type="submit" 
          className="w-full h-12 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-200"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              در حال ارسال کد...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              دریافت کد تأیید
            </div>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};
