
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

export const PhoneInputStep = ({
  phone,
  setPhone,
  loading,
  onSubmit,
  containerVariants,
  itemVariants,
  allowedPhones
}: PhoneInputStepProps) => {
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={allowedPhones && allowedPhones.length > 0 ? toPersianNumbers(allowedPhones[0]) : toPersianNumbers("۰۹۱۲۳۴۵۶۷۸۹")}
            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 rounded-xl pr-4"
            dir="ltr"
            required
          />
        </div>
        {allowedPhones && allowedPhones.length > 0 && (
          <div className="text-white/60 text-sm mt-2">
            {allowedPhones.length === 1 ? (
              <p>فقط شماره {toPersianNumbers(allowedPhones[0])} مجاز است</p>
            ) : (
              <div>
                <p>شماره‌های مجاز:</p>
                <ul className="list-disc list-inside mt-1">
                  {allowedPhones.map((phoneNumber, index) => (
                    <li key={index}>{toPersianNumbers(phoneNumber)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
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
