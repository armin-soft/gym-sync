
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, ArrowLeft, Shield } from "lucide-react";
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
    
    // Only allow English numbers (0-9)
    let numbersOnly = value.replace(/[^0-9]/g, '');
    
    // Ensure phone starts with 09
    if (numbersOnly && !numbersOnly.startsWith('09')) {
      if (numbersOnly.startsWith('0')) {
        numbersOnly = '09' + numbersOnly.slice(1);
      } else {
        numbersOnly = '09' + numbersOnly;
      }
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
      dir="rtl"
    >
      <motion.div variants={itemVariants}>
        <Label htmlFor="phone" className="text-white/90 font-semibold flex items-center gap-3 mb-4 text-base">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Phone className="h-5 w-5" />
          </div>
          شماره موبایل
        </Label>
        
        <div className="relative group">
          {/* Background glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-all duration-300"></div>
          
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              value={toPersianNumbers(phone)}
              onChange={handlePhoneChange}
              placeholder={toPersianNumbers("09123456789")}
              className="h-14 bg-white/10 border-white/20 text-white text-lg font-medium placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-xl pr-6 pl-6 backdrop-blur-sm transition-all duration-300 text-center"
              dir="ltr"
              required
            />
            
            {/* Input decoration */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <motion.div
                className="w-2 h-2 bg-violet-400 rounded-full"
                animate={{ 
                  scale: phone ? [1, 1.2, 1] : 1,
                  opacity: phone ? [0.6, 1, 0.6] : 0.6
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
        
        {/* Phone validation indicator */}
        {phone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-2"
          >
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-green-300/80 text-sm font-medium">
              شماره معتبر است
            </span>
          </motion.div>
        )}
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          type="submit" 
          className="w-full h-14 bg-gradient-to-l from-violet-500 via-purple-500 to-violet-600 hover:from-violet-600 hover:via-purple-600 hover:to-violet-700 text-white font-bold text-lg rounded-xl backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
          disabled={loading || !phone || phone.length < 11}
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              در حال ارسال کد تأیید...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span>دریافت کد تأیید</span>
              <ArrowLeft className="h-5 w-5" />
            </div>
          )}
        </Button>
        
        {/* Security note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-white/60 text-sm leading-relaxed"
        >
          کد تأیید به شماره وارد شده ارسال خواهد شد
        </motion.p>
      </motion.div>
    </motion.form>
  );
};
